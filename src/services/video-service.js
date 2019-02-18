export class VideoService {
  constructor(refVideo) {
    this.videoElement = refVideo;
  }
  startMediaStream = () => {
    this.stopMediaStream();

    navigator.mediaDevices
      .getUserMedia({ video: true })
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
  handleError = err => console.log('StartMediaStream: ', err);
}
