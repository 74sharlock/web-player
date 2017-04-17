import list from './data';

let playNode = document.querySelector('#yiBanWebPlayer');

let player = createWebPlayer({
  el: playNode,
  data: list,
  analyzerContainerName: '.player-analyzer',
  ready(){
    this.$el.classList.remove('hidden');
  }
});

