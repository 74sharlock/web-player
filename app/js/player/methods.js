import {
  _audio,
  _loopModels,
  _createAnalyzer,
  _resetCover
} from './pravite';

import {_timeFormat} from './util'

import {
  _iterator
} from './util';

export default {
  playPrev(){
    this.curIndex = this.curIndex === 0 ? this.list.length - 1 : this.curIndex - 1;
    this.play();
    _resetCover.call(this);
  },
  playNext(){
    this.curIndex = this.list[this.curIndex + 1] ? this.curIndex + 1 : 0;
    this.play();
    _resetCover.call(this);
  },
  togglePlay(){
    this.paused = !this.paused;
  },
  play(){
    this.$nextTick(function () {
      this.paused = false;
      _audio.play();
    });
  },
  pause(){
    this.$nextTick(function () {
      this.paused = true;
      _audio.pause();
    });
  },
  playByIndex(index){
    this.curIndex = index;
    this.play();
    _resetCover.call(this);
  },
  tabLoopModel(){
    let index = _loopModels.indexOf(this.loopModel);
    this.loopModel = _iterator(_loopModels, true, index).next().value;
  },
  setPlayTime(time){
    _audio.currentTime = time;
    this.currentTime = _timeFormat(_audio.currentTime);

    this.$el.querySelector('.front-line').classList.add('no-transition');

    this.progress = (_audio.currentTime / _audio.duration) * 100 + '%';

    this.$nextTick(function () {
      this.$el.querySelector('.front-line').classList.remove('no-transition');
    });
  },
  playFromHere(event){
    let x = event.offsetX,
      line = this.$el.querySelector('.line'),
      width = parseInt(getComputedStyle(line).width, 10);
    this.setPlayTime(_audio.duration * x / width);
  },
  toggleAnalyzer(){
    this.showAnalyzer = !this.showAnalyzer;

    if(!this.analyzerReady){
      this.analyzerReady = true;
      _createAnalyzer(this.$el.querySelector(this.analyzerContainerName));
    }
  }
}
