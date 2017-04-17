import Vue from 'vue';
import data from './data'
import computed from './computed'
import methods from './methods';
import watch from './watch';

const createPlayer = function (options) {

  return new Vue({
    methods,
    computed,
    el: options.el,
    data: data(options),
    watch: watch(options),
    mounted(){
      this.ready = true;
    }
  });

};

window.createWebPlayer = createPlayer;

export default createPlayer;
