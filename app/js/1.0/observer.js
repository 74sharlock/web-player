import map from './map';
import {type} from '../common/util'

export const defineReactive = function (data, key, value, cb) {
  observe(value);

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      return map[key] ? map[key]() : value;
    },
    set(newValue){
      if(newValue !== value){
        cb(newValue, value, key, data);
        value = newValue;
        observe(newValue);
      }
    }
  });
};

export const observe = function (obj, cb, filters, reverse) {

  if(typeof obj !== 'object') {
    return ;
  }

  Object.keys(obj).forEach((key) => {

    if(type.isArray(filters) ) {

      let condition = reverse === true ? filters.indexOf(key) > -1 : filters.indexOf(key) < 0;

      condition && defineReactive(obj, key, obj[key], cb);

    } else {
      defineReactive(obj, key, obj[key], cb);
    }

  })
};

export default observe;
