import Vue from 'vue';
import methods from './methods';
import {
  _type,
  _audio,
  _titles,
  _progressTimer,
  _onCanPlay,
  _onEnd
} from './pravite';

const createPlayer = function (options) {

  return new Vue({
    el: options.el,
    data(){
      return {
        list: _type.isArray(options.data) ? options.data : [],
        curIndex: -1,
        loopModel: 'list',
        paused: true,
        analyser: null,
        audioNode: null,
        duration: '',
        currentTime: '00:00',
        progress: 0,
        ready: false,
        showAnalyzer: false,
        analyzerReady: false,
        analyzerContainerName: options.analyzerContainerName || 'player-analyzer'
      };
    },
    computed: {
      song(){
        return this.list[this.curIndex] || {};
      },
      loopModelTitle(){
        return _titles[this.loopModel];
      }
    },
    watch: {
      curIndex(){
        _audio.src = this.song.src;
      },
      paused(val){
        val ? _audio.pause() : _audio.play();
      },
      ready(){
        this.curIndex = 0;

        options.ready.call(this);

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
    },
    methods,
    mounted(){
      this.ready = true;
    }
  });
};

window.createWebPlayer = createPlayer;

export default createPlayer;
