export const _type = (everything) => ({}).toString.call(everything).replace(/\[object\s(.*)\]/, '$1').toLowerCase();

[
  'String',
  'Object',
  'Number',
  'Boolean',
  'Function',
  'Array',
  'Undefined',
  'Null'
].forEach(function (typeString) {
  _type[`is${typeString}`] = (n) => _type(n) === typeString.toLowerCase();
});

export const _timeFormat = function (time) {

  let minute = time / 60;
  let minutes = parseInt(minute);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let seconds = parseInt(time % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
};

export const deepCopy = function(o) {
  if (!_type.isArray(o) && !_type.isObject(o)) {
    return o;
  }

  let result = _type.isArray(o) ? [] : {};

  Object.keys(o).forEach((key) => {
    let item = o[key];
    result[key] = (_type.isArray(item) || _type.isObject(item)) ? deepCopy(item) : item;
  });

  return result;
};

export const _random = function (m, n) {
  return Math.round( Math.random() * Math.abs(m - n) + Math.min(m, n) );
};

export const _iterator = function (array, loop, index) {
  let nextIndex = _type.isNumber(index) ? (index + 1) : 0 ;
  return {
    next(){
      loop === true && nextIndex === array.length && (nextIndex = 0);
      return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true};
    }
  }
};
