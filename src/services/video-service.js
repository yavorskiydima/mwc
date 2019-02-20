export class VideoService {
  error = false;
  deviceId = null;
  constructor(refVideo) {
    this.videoElement = refVideo;
  }
  startMediaStream = () => {
    this.stopMediaStream();
    this.error = false;

    const constraints = this.deviceId
      ? { deviceId: { exact: this.deviceId } }
      : true;

    navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then(this.gotStream)
      .catch(this.handleError);
  };
  stopMediaStream = () => {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  };
  setDeviceId = id => {
    this.deviceId = id;
  };
  gotStream = stream => {
    window.stream = stream;
    this.videoElement.srcObject = stream;
    this.videoElement.onloadedmetadata = function() {
      console.log('width is', this.videoWidth);
      console.log('height is', this.videoHeight);
    };

    return navigator.mediaDevices.enumerateDevices();
  };
  getPhoto = () => {
    const mediaStreamTrack = this.videoElement.srcObject.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);

    return imageCapture.takePhoto().then(blob => blob);
  };
  getVideoDevices = () => {
    return navigator.mediaDevices
      .enumerateDevices()
      .then(devices => devices.filter(i => i.kind === 'videoinput'));
  };
  handleError = err => {
    this.error = true;
    console.log('StartMediaStream: ', err);
  };
}
