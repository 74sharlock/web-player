import {_audio} from '../1.0/config';

export const type = (everything) => ({}).toString.call(everything).replace(/\[object\s(.*)\]/, '$1').toLowerCase();

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
  type[`is${typeString}`] = (n) => type(n) === typeString.toLowerCase();
});

export const _compile = function (node, data) {
  let childNodes = node.childNodes;

  [].slice.call(childNodes).forEach((childNode) => {

    if(childNode.nodeType === 3) {
      _replaceFields.call(this, childNode, data);
    }

    if(childNode.nodeType === 1){
      _compileElement.call(this, childNode, data);
    }

    if (childNode.childNodes && childNode.childNodes.length) {
      _compile.call(this, childNode, data);
    }

  });
};

const _compileElement = function (node ,data) {
  let attrs = node.attributes;

  attrs && [].slice.call(attrs).forEach( (attr) => {

    let attrName = attr.name;

    switch (true){
      case (attrName.indexOf('@') === 0):
        _compileEvent.call(this, attr, node);
        break;
      case (attrName.indexOf(':') === 0):
        let willCompileAttrName = attrName.substr(1);

        let methods = {
          default(){
            _compileAttr.call(this, attr, node, data);
          },
          style(){
            _compileStyle.call(this, attr, node, data);
          },
          class(){
            _compileClass.call(this, attr, node, data);
          }
        };

        let methodKey = methods[willCompileAttrName] ? willCompileAttrName : 'default';

        methods[methodKey].call(this);

        break;
      case (attrName === 'loop-btn'):
        _handleLoopBtn.call(this, attr, node);
        break;
      case (attrName === 'progress'):
        _handleProgress.call(this, attr, node);
        break;
      case (attrName === 'cover'):
        _handleCover.call(this, attr, node);
        break;
      case (attrName === 'flash-btn'):
        _handleFlashBtn.call(this, attr, node);
        break;
      case (attrName === 'analyzer'):
        _handleAnalyzer.call(this, attr, node, this.openAnalyzer);
        break;
    }
  });
};

export const _handleAnalyzer = function (attr, node, openAnalyzer) {

  let classList = node.classList;

  let method = openAnalyzer ? 'add' : 'remove';

  classList[method]('show');

  if(openAnalyzer){
    _createAnalyzer.call(this, node);
    node.addEventListener('transitionend', _analyzerPanelHandler.bind(this), false);
  }

  node.removeAttribute(attr.name);
};

const _analyzerPanelHandler = function (event) {
  let node = event.target, classList = node.classList;

  let method = !this.openAnalyzer ? 'add' : 'remove';

  classList[method]('hidden');

  if(!this.openAnalyzer){
    node.removeEventListener('transitionend', _analyzerPanelHandler.bind(this), false);
  }
};

const _handleFlashBtn = function (attr, node) {

  node.addEventListener('click', () => {
    let method = !this.openAnalyzer ? 'add' : 'remove';
    node.classList[method]('active');
    this.openAnalyzer = !this.openAnalyzer;
  }, false);

  node.removeAttribute(attr.name);
};

const _handleCover = function (attr, node) {
  let span = node.querySelector('span');
  span.classList.add('stop');
  span.classList.add('cover-spin');

  if(!this.paused){
    span.classList.remove('stop');
  }

  node.removeAttribute(attr.name);
};

const _handleLoopBtn = function (attr, node) {

  let titles = {
    'default': '默认模式',
    'list': '列表循环',
    'single': '单曲循环',
    'random': '随机模式'
  };

  node.className = 'loop-btn model-' + this.loopModel;
  node.title = titles[this.loopModel];

  node.addEventListener('click', () => {
    let model = this.toggleLoopModel();
    node.className = 'loop-btn model-' + model;
    node.title = titles[model];
  });

  node.removeAttribute(attr.name);
};

const _handleProgress = function (attr, node) {
  node.innerHTML = `
<div class="timer">${_timeFormat(this.timer)}</div>
<div class="line">
  <div class="back-line"></div>
  <div class="cache-line"></div>
  <div class="front-line"></div>
  <span class="progress-btn"></span>
</div>
<div class="time-range">${_timeFormat(this.duration)}</div>`;
};

const _compileAttr = function (attr, node, data) {

  let attrName = attr.name.substr(1), field = attr.value;

  new Function('node', 'data', `
    typeof data.${field} !== 'undefined' && node.setAttribute('${attrName}', data.${field});
  `)(node, data);

  node.removeAttribute(attr.name);
};

const _compileStyle = function (attr, node, data) {

  new Function('node', 'source', '$root', `
    if("${attr.value}".indexOf('$root.') > -1){
      Object.keys(styles).forEach(function(key){
        node.style[key] = styles[key];
      });
    } else {
      with(source){
        let styles = ${attr.value};
        Object.keys(styles).forEach(function(key){
          node.style[key] = styles[key];
        });
      }
    }
  `)(node, data, this);

  node.removeAttribute(attr.name);
};

const _compileClass = function (attr, node, data) {

  new Function('node', 'source', '$root', 'type', `
    if("${attr.value}".indexOf('$root.') > -1){
      let classList = ${attr.value};
      switch(true){
        case (type.isObject(classList)):
        case (type.isArray(classList)):
          Object.keys(classList).forEach(function(key){
            let result = classList[key];
            result && node.classList.add(key);
          });
          break;
        case (type.isString(classList)):
          classList.split(/\s+/g).forEach(function(name){
            node.classList.add(name);
          });
          break;
      }
    } else {
      with(source){
        let classList = ${attr.value};
        switch(true){
          case (type.isObject(classList)):
          case (type.isArray(classList)):
            Object.keys(classList).forEach(function(key){
              let result = classList[key];
              result && node.classList.add(key);
            });
            break;
          case (type.isString(classList)):
            classList.split(/\s+/g).forEach(function(name){
              node.classList.add(name);
            });
            break;
        }
      }
    }
  `)(node, data, this, type);

  node.removeAttribute(attr.name);
};

const _compileEvent = function (attr, node) {

  attr.value &&
  type.isFunction(this[attr.value]) &&
  node.addEventListener(attr.name.substr(1), this[attr.value].bind(this), false);

  node.removeAttribute(attr.name);
};

const _replaceFields = function (textNode, data) {

  let content = textNode.nodeValue;

  if(content){

    let reg = /\{\{.*?}}/g;
    textNode.nodeValue = content.replace(reg, function (field) {
      field = field.replace(/[{}]+/g, '');
      return (new Function ('data', '$root', `
        let text = '' ;
        
        if("${field}".indexOf('$root.') > -1){
          text = typeof (${field}) === 'undefined' ? '' : (${field});
        } else {
          with(data){
            text = typeof (${field}) === 'undefined' ? '' : (${field});
          }
        }
        
        return text;
      `)(data, this));
    });

  }
};

const _createAnalyzer = function (node) {


  !this.audioContext && (this.audioContext = new AudioContext());
  !this.analyser && (this.analyser = this.audioContext.createAnalyser());
  !this.audioNode && (this.audioNode = this.audioContext.createMediaElementSource(_audio));

  let xhr = new XMLHttpRequest();

  xhr.open('GET', _audio.src, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = () => {
    let arrayBuffer = xhr.response;

    this.audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      //将音频节点与分析器连接
      this.audioNode.connect(this.analyser);

      //将分析器与destination连接，这样才能形成到达扬声器的通路
      this.analyser.connect(this.audioContext.destination);

      //将上一步解码得到的buffer数据赋值给音频节点
      this.audioNode.buffer = buffer;

      //音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取
      _drawSpectrum.call(this, node);
    });
  };

  xhr.send();

};

const _drawSpectrum = function (node) {
  let canvas = document.createElement('canvas');
  node.appendChild(canvas);
  canvas.width = parseInt(getComputedStyle(node).width, 10) - 10;
  canvas.height = parseInt(getComputedStyle(node).height, 10) - 20;

  let that = this,
    cwidth = canvas.width,
    cheight = canvas.height - 2,
    meterWidth = 10, //频谱条宽度
    gap = 2, //频谱条间距
    capHeight = 2,
    capStyle = '#fff',
    meterNum = 630 / (10 + 2), //频谱条数量
    capYPositionArray = [], //将上一画面各帽头的位置保存到这个数组
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0, cheight);
  gradient.addColorStop(1, '#0f0');
  gradient.addColorStop(0.5, '#ff0');
  gradient.addColorStop(0, '#f00');
  let drawMeter = ()=> {
    let array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);

    let step = Math.round(array.length / meterNum); //计算采样步长
    ctx.clearRect(0, 0, cwidth, cheight);

    for (let i = 0; i < meterNum; i++) {
      let value = array[i * step]; //获取当前能量值
      if (capYPositionArray.length < Math.round(meterNum)) {
        capYPositionArray.push(value); //初始化保存帽头位置的数组，将第一个画面的数据压入其中
      }
      ctx.fillStyle = capStyle;
      //开始绘制帽头
      if (value < capYPositionArray[i]) { //如果当前值小于之前值
        ctx.fillRect(i *12, cheight-(--capYPositionArray[i]) < 0 ? 0 : (cheight-(--capYPositionArray[i])), meterWidth, capHeight);//则使用前一次保存的值来绘制帽头
      } else {
        ctx.fillRect(i * 12, (cheight - value) < 0 ? 0 : (cheight - value), meterWidth, capHeight); //否则使用当前值直接绘制
        capYPositionArray[i] = value;
      }
      //开始绘制频谱条
      ctx.fillStyle = gradient;
      ctx.fillRect(i * 12, cheight - value + capHeight < 2 ? 2 : (cheight - value + capHeight) , meterWidth, cheight);
    }
    requestAnimationFrame(drawMeter);
  };
  requestAnimationFrame(drawMeter);
};

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
  if (!type.isArray(o) && !type.isObject(o)) {
    return o;
  }

  let result = type.isArray(o) ? [] : {};

  Object.keys(o).forEach((key) => {
    let item = o[key];
    result[key] = (type.isArray(item) || type.isObject(item)) ? deepCopy(item) : item;
  });

  return result;
};

export const _clearDom = function (node) {
  let childNodes = node.childNodes;
  [].slice.call(childNodes).forEach(function (child) {
    node.removeChild(child);
  });
};

export const _random = function (m, n) {
  return Math.round( Math.random() * Math.abs(m - n) + Math.min(m, n) );
};

export const _iterator = function (array, loop, index) {
  let nextIndex = type.isNumber(index) ? (index + 1) : 0 ;
  return {
    next(){
      loop === true && nextIndex === array.length && (nextIndex = 0);
      return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true};
    }
  }
};

export const _progressTimer = function () {
  this.progressTimer && clearInterval(this.progressTimer);

  this.progress = (_audio.currentTime / _audio.duration) * 100 + '%';
  this.timer = this.currentTime;

  this.progressTimer = setInterval(()=>{
    this.progress = (_audio.currentTime / _audio.duration) * 100 + '%';
    this.timer = this.currentTime;
  }, 1000);
};
