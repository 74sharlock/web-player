import {isDev, _audio, _loopModels} from './config';
import {_random, _iterator, _progressTimer} from '../common/util';

export default class PlayerCore {
  constructor(){
    this.currentTime = isNaN(_audio.currentTime) ? 0 : _audio.currentTime;
    this.duration = isNaN(_audio.duration) ? 0 : _audio.duration;
    this.loopModel = 'list';
    this.playIndex = -1;
    this.playList = localStorage.getItem('myMusics') ? JSON.parse(localStorage.getItem('myMusics')) : [];
    this.paused = true;
    this.progress = 0;
    this.timer = 0;
    this.progressTimer = '';

    this.openAnalyzer = false;
    this.audioContext = '';
    this.analyser = '';
    this.audioNode = '';

    _audio.oncanplay = ()=> {
      this.duration = _audio.duration;
    };

    _audio.onplay = () => {
      _progressTimer.call(this);
    };

    _audio.onended =  () => {

      this.progressTimer && clearInterval(this.progressTimer);
      this.timer = 0;

      return ({
        default(){
          this.paused = false;
        },
        random(){
          let nextIndex = _random(0, this.playList.length - 1);
          this.playIndex = nextIndex;
          this.play(nextIndex);
        },
        list(){
          let nextIndex = this.playList[this.playIndex + 1] ? this.playIndex + 1 : 0;
          this.play(nextIndex);
        },
        single(){
          this.play(this.playIndex);
        }
      })[this.loopModel].call(this);
    };
  }

  getTimeRange(src){
    _audio.src = src;
  }

  myMusics (){
    isDev && console.table(this.playList);
  }

  importMusic (list){
    this.playList = list;
    isDev && console.table(this.playList);
  }

  saveMyMusics (){
    let data = JSON.stringify(this.playList);
    localStorage.setItem('myMusics', data);
  }

  togglePlay (){

    if(!_audio.src){

      _audio.src = this.playList[this.playIndex].src;
      _audio.play();
      this.paused = false;

    } else {

      if(this.paused){
        _audio.play();
        this.paused = false;

      } else {
        _audio.pause();
        this.paused = true;

      }
    }

  }

  add (src){
    let type = typeof src, item = {};

    switch(type){
      case 'object':
        item.src = src.src;
        item.name = src.name;
        break;
      case 'string':
        item.src = src;
        break;
      default:
        src = '';
        break;
    }

    if(src !== ''){
      this.playList.push(item);
    }
  }

  del (index){
    if(typeof index === 'number' && this.playList[index]){
      this.playList.splice(index, 1);
      this.myMusics();
    }
  }

  rename(index, name){
    if(typeof index === 'number' && this.playList[index]){
      this.playList[index].name = '' + name;
      this.myMusics();
    }
  }

  play (src){
    let type = typeof src;
    switch(type){
      case 'number':
        if(this.playList[src]){
          this.setIndex(src);
          src = this.playList[src].src;
        } else {
          src = '';
        }
        break;
      case 'string':
        if(_audio.src !== src){
          this.playList.push({src});
          this.setIndex(this.playList.length - 1);
        } else {
          src = '';
        }
        break;
      default:
        src = '';
        break;
    }

    if(src !== ''){
      try {
        _audio.src = src;
        this.myMusics();
        _audio.src && _audio.play();
      } catch (e) {
        isDev && console.log(e);
      }
    }
  }

  setVolume (num){
    _audio.volume = num;
  }

  setPlayTime(time){
    this.currentTime = time;
    _audio.currentTime = time;

    let line = this.$el.querySelector('.front-line');
    line.classList.add('no-transition');
    setTimeout(function () {
      line.classList.remove('no-transition');
    }, 1100);
    _progressTimer.call(this);
  }

  playNext(){
    this.paused = false;
    let nextIndex = this.playList[this.playIndex + 1] ? this.playIndex + 1 : 0;
    this.play(nextIndex);
  }

  playPrev(){
    this.paused = false;
    let prevIndex = this.playIndex === 0 ? this.playList.length - 1 : this.playIndex - 1;
    this.play(prevIndex);
  }

  setIndex(index){
    this.playIndex = index;
  }

  loop (model) {
    _loopModels.indexOf(model) > -1 && (this.loopModel = model);
  }

  toggleLoopModel(){
    let index = _loopModels.indexOf(this.loopModel);
    let nextModel = _iterator(_loopModels, true, index);
    let model = nextModel.next().value;
    this.loopModel = model;
    return model;
  }
}
