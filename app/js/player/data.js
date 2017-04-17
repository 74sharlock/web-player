import {_type} from './util';

export default function (options) {
  return {
    list: _type.isArray(options.data) ? options.data : [],
    lastIndex: 0,
    curIndex: -1,
    loopModel: 'list',
    paused: true,
    analyser: null,
    audioNode: null,
    duration: '',
    currentTime: '00:00',
    progress: 0,
    tabbed: false,
    ready: false,
    showAnalyzer: false,
    analyzerReady: false,
    analyzerContainerName: options.analyzerContainerName || 'player-analyzer'
  };
};
