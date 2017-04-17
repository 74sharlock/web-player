import {_titles} from './pravite';

export default {
  song(){
    return this.list[this.curIndex] || {};
  },
  loopModelTitle(){
    return _titles[this.loopModel];
  }
};
