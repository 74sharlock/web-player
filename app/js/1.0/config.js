export const isDev = process.env.NODE_ENV === 'development';

export const _audio = new Audio();

export const _audioContext = new AudioContext();

export const _loopModels = ['list', 'single', 'random'];

export const _timer = null;

export const _analyser = null;

export const _titles = {
  'default': '默认模式',
  'list': '列表循环',
  'single': '单曲循环',
  'random': '随机模式'
};
