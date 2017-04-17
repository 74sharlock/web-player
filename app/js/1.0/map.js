import {_audio} from './config';

export default {
  currentTime(){
    return _audio.currentTime;
  },
  duration(){
    return _audio.duration;
  },
  currentSrc(){
    return _audio.src;
  }
}
