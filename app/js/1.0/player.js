import PlayCore from './core';
import observe from './observer';
import subscriber from './subscriber';
import {_compile, _clearDom, deepCopy, type} from '../common/util';

export default class Player extends PlayCore {

  constructor (node, config){

    super();

    this.$el = typeof node === "string" ?
      document.querySelector(node) :
      ( (node && node.nodeName) ? node : null );

    config = Object.assign({
      autoPlay: true,
      loopModel: 'list',
      data: [],
      template: '',
      defaultIndex: 0,
      created(){},
      updated(){}
    }, config);

    if(!config.template) {
      config.template = this.$el ? this.$el.innerHTML : '';
    }

    this.loopModel = config.loopModel;

    this.completed = false;

    ['created', 'updated', 'autoPlay', '$template'].forEach( (name) => {
      Object.defineProperty(this, name, {
        get(){
          let key = name.indexOf('$') == 0 ? name.substr(1) : name;
          return config[key];
        }
      });
    });

    observe(this, (newValue, oldValue, key) => {
      subscriber[key] && subscriber[key].call(this, newValue, oldValue);
    });

    this.importMusic(deepCopy(config.data));

    this.$el && (this.setIndex(config.defaultIndex));

    this.autoPlay === true && this.play();

    this.getTimeRange(this.playList[config.defaultIndex].src);
  }

  createDom (index) {

    if(this.playList[index]){

      _clearDom(this.$el);

      let container = document.createElement('div');
      container.className = 'player-container';

      container.innerHTML = this.$template;

      _compile.call(this, container, this.playList[index]);

      this.$el.appendChild(container);

      !this.completed ? this.created() : this.updated();

      !this.completed && (this.completed = true);

    }

  }
}

window.Player = Player;
