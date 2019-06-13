#!/ew-promo/anaconda3/bin/ python
import os
import numpy as np
import pandas as pd
import dlib

CHARACTER_DESCRIPTION = 'character_vectors.csv'
VIP_DESCRIPTION = 'vip_vectors.csv'
SHAPE_PREDICTOR_68_FACE_LANDMARKS = 'shape_predictor_68_face_landmarks.dat'
DLIB_FACE_RECOGNITION_RESNET_MODEL_V1 = 'dlib_face_recognition_resnet_model_v1.dat'
STAT = 'stat.txt'
UPLOAD_PHOTO = 'Photos'

class NoFaceDetectedError(Exception):
    pass


class BasePersons(object):
    def __init__(self, keys, vectors):
        self._keys = keys
        self._vectors = vectors

    def _recognize(self, vect):
        from scipy.linalg import norm
        return self._keys[np.argmin(norm(self._vectors - vect, axis=1))], np.min(norm(self._vectors - vect, axis=1))

    def similar(self, vect):
        result, _ = self._recognize(vect)
        return result

    def recognize(self, vect):
        result, distance = self._recognize(vect)
        if distance < 0.6:
            return result
        return


class Characters(BasePersons):
    def __init__(self, vectors_file):
        df = pd.read_csv(vectors_file, sep='\t', header=0)
        self._families = {key: value for key, value in zip(df.iloc[:, 0], df.iloc[:, 1])}
        super().__init__(list(df.iloc[:, 0]), np.array(df.iloc[:, 2:]))

    @property
    def family(self):
        return self._families


class VIPs(BasePersons):
    def __init__(self, vectors_file):
        import pandas as pd
        df = pd.read_csv(vectors_file, sep='\t', header=0)
        self._chars = {key: value for key, value in zip(df.iloc[:, 1], df.iloc[:, 0])}
        super().__init__(list(df.iloc[:, 1]), np.array(df.iloc[:, 2:]))

    @property
    def chars(self):
        return self._chars



class FaceRecognizer(object):
    def __init__(self, shape_predictor_68_face_landmarks, dlib_face_recognition_resnet_model_v1):
        self._shape_predictor = dlib.shape_predictor(shape_predictor_68_face_landmarks)
        self._face_rec = dlib.face_recognition_model_v1(dlib_face_recognition_resnet_model_v1)
        self._detector = dlib.get_frontal_face_detector()

    def transform_image(self, img):
        #rotates = [img, np.rot90(img, 1), np.rot90(img, 2), np.rot90(img, -1)]
        rotates = [img]
        faces = [self._detector(img_rot, 1) for img_rot in rotates]
        faces = list(filter(lambda x: x[0], zip(faces, rotates)))
        if not faces:
            raise NoFaceDetectedError()
        shape = self._shape_predictor(faces[0][1], faces[0][0][0])
        return np.array(self._face_rec.compute_face_descriptor(faces[0][1], shape)), faces[0][0][0]


def recognize(img, recognizer, characters, vips):
    char_desc, face = recognizer.transform_image(img)
    #vip_pers = vips.recognize(char_desc)
    #if vip_pers:
    #    return vips.chars[vip_pers], vip_pers
    return characters.similar(char_desc), face, ''


from collections import Counter


class Statistic:
    def __init__(self, stat_file, characters):
        self._stat_file = stat_file
        self._stat_dct = Counter()
        for family in characters.family.values():
            self._stat_dct[family] = 0
        with open(self._stat_file, "r") as f:
            self._stat_dct.update(Counter(f.read().splitlines()))

    def append(self, row):
        with open(self._stat_file, "a") as f:
            f.write('{0}\n'.format(row))

    def get_statistic(self):
        return self._stat_dct

    def update(self, row):
        self.append(row)
        self._stat_dct.update(Counter([row]))
        return self.get_count()

    def get_count(self):
        return sum(self._stat_dct.values())


characters = Characters(CHARACTER_DESCRIPTION)
vips = VIPs(VIP_DESCRIPTION)
face_recognizer = FaceRecognizer(SHAPE_PREDICTOR_68_FACE_LANDMARKS, DLIB_FACE_RECOGNITION_RESNET_MODEL_V1)
stat = Statistic(STAT, characters)


from flask import Flask, request, jsonify, Response
#from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

#UPLOAD_FOLDER = '/files'
#ALLOWED_EXTENSIONS = {'jpeg', 'jpg'}

app = Flask(__name__)
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app, resources={r"/statistic": {"origins": "*"}, r"/photo/upload": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

import base64


def upload_file(file, count_files):
    tmp_file_name = 'tmp_{0}.jpg'.format(count_files % 10000)
    #filename = secure_filename(tmp_file_name)
    #with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'wb') as f:
    #    f.write(base64.decodebytes(file.encode()))
    filename = tmp_file_name


    with open(os.path.join(UPLOAD_PHOTO, filename), 'wb') as f:
        f.write(base64.decodebytes(file.encode()))
 
    return filename


def response_error(message):
    return jsonify(result='failure', reason=message)


def transform_face(face, max_right, max_bottom):

    left, right, top, bottom = face.left(), face.right(), face.top(), face.bottom()
    left1 = left - (right - left) * 15 // 100 if (right - left) * 15 // 100 < left else 0
    right1 = right + (right - left) * 15 // 100 if right + (right - left) * 15 // 100 < max_right else max_right - 1
    top1 = top - (bottom - top) * 35 // 100 if (bottom - top) * 35 // 100 < top else 0
    bottom1 = bottom + (bottom - top) * 15 // 100 if bottom + (bottom - top) * 15 // 100 < max_bottom else max_bottom - 1
    return dlib.rectangle(left1, top1, right1, bottom1)


@app.route('/photo/upload', methods=['PUT'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def photo_upload():
    import sys
    from scipy import misc
    try:
        img_file = upload_file(request.json['photo'], stat.get_count())
        img = misc.imread(os.path.join(UPLOAD_PHOTO, img_file))
        max_right, max_bottom = img.shape[1], img.shape[0]
        character, face, vip = recognize(img, face_recognizer, characters, vips)
        face = transform_face(face, max_right, max_bottom)
        count_rows = stat.update(characters.family[character])
    except NoFaceDetectedError:
        return response_error('No Face Detected.')
    except OSError as e:
        if str(e).find('Cannot identify image file') >= 0:
            return response_error('Incorrect file format.')
        else:
            return response_error('type_error={0}, info={1}'.format(type(e), str(e)))
    except Exception as e:
        return response_error('type_error={0}, info={1}'.format(type(e), str(e)))

    return jsonify(result='ok', id=count_rows, uniq_key=character, vip=vip,
                   left_angle=[face.left(), face.top()], width=face.right() - face.left(),
                   height=face.bottom() - face.top())



@app.route('/statistic', methods=['GET', 'POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def statistic():
    if request.method == 'POST':
        if request.json['character'] in characters.family:
            try:
                stat.update(characters.family[request.json['character']])
            except Exception as e:
                print(e)
                return response_error(str(e))

        else:
            return response_error('Invalid character uniq_key')
    return jsonify(result='ok', house_stats=stat.get_statistic())
    # rp = {'result': 'ok', 'house_stats': stat.get_statistic()}
    # ret = Response(rp).headers['Access-Control-Allow-Origin'] = '*'
    # return ret


if __name__ == '__main__':
    #app.run()
    #app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))
    app.run(host='127.0.0.1', port=5000)