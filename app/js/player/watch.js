import { _audio, _onCanPlay, _progressTimer, _onEnd} from './pravite';
import {_type} from './util';

export default function (options) {
  return {
    curIndex(){
      _audio.src = this.song.src;
    },
    paused(val){
      if(val){
        _audio.pause();
      } else {
        _audio.play();
      }
    },
    ready(){
      this.curIndex = 0;

      _type.isFunction(options.ready) && options.ready.call(this);

      _audio.oncanplay = ()=>{
        _onCanPlay.call(this);
      };

      _audio.onplay = () => {
        _progressTimer.call(this);
      };

      _audio.onended = ()=>{
        _onEnd.call(this);
      };
    }
  }
};
