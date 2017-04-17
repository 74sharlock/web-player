import {_random, _type, _timeFormat} from './util'

let _analyser = null;
let _audioNode = null;

export const _audio = new Audio();

export const _audioContext = new AudioContext();

export const _loopModels = ['list', 'single', 'random'];

export const _timer = null;

export const _titles = {
  'default': '默认模式',
  'list': '列表循环',
  'single': '单曲循环',
  'random': '随机模式'
};

export const _progressTimer = function () {
  _timer && clearInterval(_timer);

  this.progress = (_audio.currentTime / _audio.duration) * 100 + '%';
  this.currentTime = _timeFormat(_audio.currentTime);

  this.progressTimer = setInterval(()=>{
    this.progress = (_audio.currentTime / _audio.duration) * 100 + '%';
    this.currentTime = _timeFormat(_audio.currentTime);
  }, 1000);
};

export const _onCanPlay = function () {
  this.duration = _audio.duration ? _timeFormat(_audio.duration) : '00:00';
};

export const _onEnd = function () {
  this.paused = true;

  this.progress = 0;
  this.currentTime = _timeFormat(0);

  return ({
    default(){
      this.paused = false;
    },
    random(){
      this.curIndex = _random(0, this.list.length - 1);
      this.play();
    },
    list(){
      this.curIndex = this.list[this.curIndex + 1] ? this.curIndex + 1 : 0;
      this.play();
    },
    single(){
      this.play();
    }
  })[this.loopModel].call(this);
};

export const _resetCover = function () {
  this.tabbed = true;
  setTimeout( ()=> {
    this.tabbed = false;
  }, 100);
};

export const _createAnalyzer = function (node, fn) {
  _analyser = _audioContext.createAnalyser();
  _audioNode = _audioContext.createMediaElementSource(_audio);

  let xhr = new XMLHttpRequest();

  xhr.open('GET', _audio.src, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = () => {
    let arrayBuffer = xhr.response;

    _audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      //将音频节点与分析器连接
      _audioNode.connect(_analyser);

      //将分析器与destination连接，这样才能形成到达扬声器的通路
      _analyser.connect(_audioContext.destination);

      //将上一步解码得到的buffer数据赋值给音频节点
      _audioNode.buffer = buffer;

      //音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取
      _drawSpectrum(node);

      _type.isFunction(fn) && fn();
    });
  };

  xhr.send();

};

const _drawSpectrum = function (node) {
  let canvas = document.createElement('canvas');
  node.appendChild(canvas);

  let width = parseInt(getComputedStyle(node).width, 10) - 10;
  let height = parseInt(getComputedStyle(node).height, 10) - 20;

  canvas.width = width;
  canvas.height = height;

  let cwidth = width,
    cheight = height - 2,
    meterWidth = 10, //频谱条宽度
    gap = 5, //频谱条间距
    capHeight = 2,
    capStyle = '#fff',
    meterNum = width / (10 + 2), //频谱条数量
    capYPositionArray = [], //将上一画面各帽头的位置保存到这个数组
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0, cheight);
  gradient.addColorStop(1, '#0f0');
  gradient.addColorStop(0.5, '#ff0');
  gradient.addColorStop(0, '#f00');
  let drawMeter = ()=> {
    let array = new Uint8Array(_analyser.frequencyBinCount);
    _analyser.getByteFrequencyData(array);

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
        ctx.fillRect(i *12,
          cheight-(--capYPositionArray[i]) < 0 ? 0 : (cheight-(--capYPositionArray[i])), meterWidth, capHeight);
        //则使用前一次保存的值来绘制帽头
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
