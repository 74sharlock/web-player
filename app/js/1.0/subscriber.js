import { _audio, isDev } from './config'
import {_timeFormat, _progressTimer, _handleAnalyzer} from '../common/util';

const handlers = {
  duration(time){
    let timer = this.$el.querySelector('.time-range');
    timer.innerHTML = `${_timeFormat(time)}`;
  },
  playIndex(index){
    isDev && console.log(`正在准备第${index + 1}首：${this.playList[index].name}`);
    this.timer = 0;
    this.progress = 0;
    this.createDom(index);
  },
  playList(list){
    isDev && console.table(list);
  },
  paused(flag){
    let playBtn = this.$el.querySelector('.play-btn'), classList = playBtn.classList;
    let cover = this.$el.querySelector('.cover'), span = cover.querySelector('span');

    if(flag){
      classList.remove('icon-pause');
      classList.add('icon-play');
      this.progressTimer && clearInterval(this.progressTimer);
      span.classList.add('stop');
    } else {
      classList.remove('icon-play');
      classList.add('icon-pause');
      _progressTimer.call(this);
      span.classList.remove('stop');
    }
  },
  progress(percent){
    let line = this.$el.querySelector('.front-line');
    line.style.width = percent;
  },
  timer(time){
    let timer = this.$el.querySelector('.timer');
    timer.innerHTML = `${_timeFormat(time)}`;
  },
  openAnalyzer(flag){
    _handleAnalyzer.call(this, {name: 'analyzer'}, this.$el.querySelector('.player-analyzer'), flag);
  }
};

export default handlers;
