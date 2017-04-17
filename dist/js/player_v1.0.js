!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._progressTimer=t._iterator=t._random=t._clearDom=t.deepCopy=t._timeFormat=t._handleAnalyzer=t._compile=t.type=void 0;var i=n(1),o=t.type=function(e){return{}.toString.call(e).replace(/\[object\s(.*)\]/,"$1").toLowerCase()};["String","Object","Number","Boolean","Function","Array","Undefined","Null"].forEach(function(e){o["is"+e]=function(t){return o(t)===e.toLowerCase()}});var a=(t._compile=function e(t,n){var i=this,o=t.childNodes;[].slice.call(o).forEach(function(t){3===t.nodeType&&m.call(i,t,n),1===t.nodeType&&a.call(i,t,n),t.childNodes&&t.childNodes.length&&e.call(i,t,n)})},function(e,t){var n=this,i=e.attributes;i&&[].slice.call(i).forEach(function(i){var o=i.name;switch(!0){case 0===o.indexOf("@"):h.call(n,i,e);break;case 0===o.indexOf(":"):var a=o.substr(1),s={default:function(){f.call(this,i,e,t)},style:function(){p.call(this,i,e,t)},class:function(){y.call(this,i,e,t)}};s[s[a]?a:"default"].call(n);break;case"loop-btn"===o:c.call(n,i,e);break;case"progress"===o:d.call(n,i,e);break;case"cover"===o:u.call(n,i,e);break;case"flash-btn"===o:l.call(n,i,e);break;case"analyzer"===o:r.call(n,i,e,n.openAnalyzer)}})}),r=t._handleAnalyzer=function(e,t,n){t.classList[n?"add":"remove"]("show"),n&&(v.call(this,t),t.addEventListener("transitionend",s.bind(this),!1)),t.removeAttribute(e.name)},s=function e(t){var n=t.target;n.classList[this.openAnalyzer?"remove":"add"]("hidden"),this.openAnalyzer||n.removeEventListener("transitionend",e.bind(this),!1)},l=function(e,t){var n=this;t.addEventListener("click",function(){var e=n.openAnalyzer?"remove":"add";t.classList[e]("active"),n.openAnalyzer=!n.openAnalyzer},!1),t.removeAttribute(e.name)},u=function(e,t){var n=t.querySelector("span");n.classList.add("stop"),n.classList.add("cover-spin"),this.paused||n.classList.remove("stop"),t.removeAttribute(e.name)},c=function(e,t){var n=this,i={default:"默认模式",list:"列表循环",single:"单曲循环",random:"随机模式"};t.className="loop-btn model-"+this.loopModel,t.title=i[this.loopModel],t.addEventListener("click",function(){var e=n.toggleLoopModel();t.className="loop-btn model-"+e,t.title=i[e]}),t.removeAttribute(e.name)},d=function(e,t){t.innerHTML='\n<div class="timer">'+_(this.timer)+'</div>\n<div class="line">\n  <div class="back-line"></div>\n  <div class="cache-line"></div>\n  <div class="front-line"></div>\n  <span class="progress-btn"></span>\n</div>\n<div class="time-range">'+_(this.duration)+"</div>"},f=function(e,t,n){var i=e.name.substr(1),o=e.value;new Function("node","data","\n    typeof data."+o+" !== 'undefined' && node.setAttribute('"+i+"', data."+o+");\n  ")(t,n),t.removeAttribute(e.name)},p=function(e,t,n){new Function("node","source","$root",'\n    if("'+e.value+"\".indexOf('$root.') > -1){\n      Object.keys(styles).forEach(function(key){\n        node.style[key] = styles[key];\n      });\n    } else {\n      with(source){\n        let styles = "+e.value+";\n        Object.keys(styles).forEach(function(key){\n          node.style[key] = styles[key];\n        });\n      }\n    }\n  ")(t,n,this),t.removeAttribute(e.name)},y=function(e,t,n){new Function("node","source","$root","type",'\n    if("'+e.value+"\".indexOf('$root.') > -1){\n      let classList = "+e.value+";\n      switch(true){\n        case (type.isObject(classList)):\n        case (type.isArray(classList)):\n          Object.keys(classList).forEach(function(key){\n            let result = classList[key];\n            result && node.classList.add(key);\n          });\n          break;\n        case (type.isString(classList)):\n          classList.split(/s+/g).forEach(function(name){\n            node.classList.add(name);\n          });\n          break;\n      }\n    } else {\n      with(source){\n        let classList = "+e.value+";\n        switch(true){\n          case (type.isObject(classList)):\n          case (type.isArray(classList)):\n            Object.keys(classList).forEach(function(key){\n              let result = classList[key];\n              result && node.classList.add(key);\n            });\n            break;\n          case (type.isString(classList)):\n            classList.split(/s+/g).forEach(function(name){\n              node.classList.add(name);\n            });\n            break;\n        }\n      }\n    }\n  ")(t,n,this,o),t.removeAttribute(e.name)},h=function(e,t){e.value&&o.isFunction(this[e.value])&&t.addEventListener(e.name.substr(1),this[e.value].bind(this),!1),t.removeAttribute(e.name)},m=function(e,t){var n=e.nodeValue;if(n){e.nodeValue=n.replace(/\{\{.*?}}/g,function(e){return e=e.replace(/[{}]+/g,""),new Function("data","$root","\n        let text = '' ;\n        \n        if(\""+e+"\".indexOf('$root.') > -1){\n          text = typeof ("+e+") === 'undefined' ? '' : ("+e+");\n        } else {\n          with(data){\n            text = typeof ("+e+") === 'undefined' ? '' : ("+e+");\n          }\n        }\n        \n        return text;\n      ")(t,this)})}},v=function(e){var t=this;!this.audioContext&&(this.audioContext=new AudioContext),!this.analyser&&(this.analyser=this.audioContext.createAnalyser()),!this.audioNode&&(this.audioNode=this.audioContext.createMediaElementSource(i._audio));var n=new XMLHttpRequest;n.open("GET",i._audio.src,!0),n.responseType="arraybuffer",n.onload=function(){var i=n.response;t.audioContext.decodeAudioData(i,function(n){t.audioNode.connect(t.analyser),t.analyser.connect(t.audioContext.destination),t.audioNode.buffer=n,b.call(t,e)})},n.send()},b=function(e){var t=this,n=document.createElement("canvas");e.appendChild(n),n.width=parseInt(getComputedStyle(e).width,10)-10,n.height=parseInt(getComputedStyle(e).height,10)-20;var i=n.width,o=n.height-2,a=[],r=n.getContext("2d"),s=r.createLinearGradient(0,0,0,o);s.addColorStop(1,"#0f0"),s.addColorStop(.5,"#ff0"),s.addColorStop(0,"#f00");var l=function e(){var n=new Uint8Array(t.analyser.frequencyBinCount);t.analyser.getByteFrequencyData(n);var l=Math.round(n.length/52.5);r.clearRect(0,0,i,o);for(var u=0;u<52.5;u++){var c=n[u*l];a.length<Math.round(52.5)&&a.push(c),r.fillStyle="#fff",c<a[u]?r.fillRect(12*u,o- --a[u]<0?0:o- --a[u],10,2):(r.fillRect(12*u,o-c<0?0:o-c,10,2),a[u]=c),r.fillStyle=s,r.fillRect(12*u,o-c+2<2?2:o-c+2,10,o)}requestAnimationFrame(e)};requestAnimationFrame(l)},_=t._timeFormat=function(e){var t=e/60,n=parseInt(t);n<10&&(n="0"+n);var i=parseInt(e%60);return i<10&&(i="0"+i),n+":"+i};t.deepCopy=function e(t){if(!o.isArray(t)&&!o.isObject(t))return t;var n=o.isArray(t)?[]:{};return Object.keys(t).forEach(function(i){var a=t[i];n[i]=o.isArray(a)||o.isObject(a)?e(a):a}),n},t._clearDom=function(e){var t=e.childNodes;[].slice.call(t).forEach(function(t){e.removeChild(t)})},t._random=function(e,t){return Math.round(Math.random()*Math.abs(e-t)+Math.min(e,t))},t._iterator=function(e,t,n){var i=o.isNumber(n)?n+1:0;return{next:function(){return!0===t&&i===e.length&&(i=0),i<e.length?{value:e[i++],done:!1}:{done:!0}}}},t._progressTimer=function(){var e=this;this.progressTimer&&clearInterval(this.progressTimer),this.progress=i._audio.currentTime/i._audio.duration*100+"%",this.timer=this.currentTime,this.progressTimer=setInterval(function(){e.progress=i._audio.currentTime/i._audio.duration*100+"%",e.timer=e.currentTime},1e3)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isDev=!1,t._audio=new Audio,t._audioContext=new AudioContext,t._loopModels=["list","single","random"],t._timer=null,t._analyser=null,t._titles={default:"默认模式",list:"列表循环",single:"单曲循环",random:"随机模式"}},,,,,function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(1),s=n(0),l=function(){function e(){var t=this;i(this,e),this.currentTime=isNaN(r._audio.currentTime)?0:r._audio.currentTime,this.duration=isNaN(r._audio.duration)?0:r._audio.duration,this.loopModel="list",this.playIndex=-1,this.playList=localStorage.getItem("myMusics")?JSON.parse(localStorage.getItem("myMusics")):[],this.paused=!0,this.progress=0,this.timer=0,this.progressTimer="",this.openAnalyzer=!1,this.audioContext="",this.analyser="",this.audioNode="",r._audio.oncanplay=function(){t.duration=r._audio.duration},r._audio.onplay=function(){s._progressTimer.call(t)},r._audio.onended=function(){return t.progressTimer&&clearInterval(t.progressTimer),t.timer=0,{default:function(){this.paused=!1},random:function(){var e=(0,s._random)(0,this.playList.length-1);this.playIndex=e,this.play(e)},list:function(){var e=this.playList[this.playIndex+1]?this.playIndex+1:0;this.play(e)},single:function(){this.play(this.playIndex)}}[t.loopModel].call(t)}}return a(e,[{key:"getTimeRange",value:function(e){r._audio.src=e}},{key:"myMusics",value:function(){r.isDev&&console.table(this.playList)}},{key:"importMusic",value:function(e){this.playList=e,r.isDev&&console.table(this.playList)}},{key:"saveMyMusics",value:function(){var e=JSON.stringify(this.playList);localStorage.setItem("myMusics",e)}},{key:"togglePlay",value:function(){r._audio.src?this.paused?(r._audio.play(),this.paused=!1):(r._audio.pause(),this.paused=!0):(r._audio.src=this.playList[this.playIndex].src,r._audio.play(),this.paused=!1)}},{key:"add",value:function(e){var t=void 0===e?"undefined":o(e),n={};switch(t){case"object":n.src=e.src,n.name=e.name;break;case"string":n.src=e;break;default:e=""}""!==e&&this.playList.push(n)}},{key:"del",value:function(e){"number"==typeof e&&this.playList[e]&&(this.playList.splice(e,1),this.myMusics())}},{key:"rename",value:function(e,t){"number"==typeof e&&this.playList[e]&&(this.playList[e].name=""+t,this.myMusics())}},{key:"play",value:function(e){switch(void 0===e?"undefined":o(e)){case"number":this.playList[e]?(this.setIndex(e),e=this.playList[e].src):e="";break;case"string":r._audio.src!==e?(this.playList.push({src:e}),this.setIndex(this.playList.length-1)):e="";break;default:e=""}if(""!==e)try{r._audio.src=e,this.myMusics(),r._audio.src&&r._audio.play()}catch(e){r.isDev&&console.log(e)}}},{key:"setVolume",value:function(e){r._audio.volume=e}},{key:"setPlayTime",value:function(e){this.currentTime=e,r._audio.currentTime=e;var t=this.$el.querySelector(".front-line");t.classList.add("no-transition"),setTimeout(function(){t.classList.remove("no-transition")},1100),s._progressTimer.call(this)}},{key:"playNext",value:function(){this.paused=!1;var e=this.playList[this.playIndex+1]?this.playIndex+1:0;this.play(e)}},{key:"playPrev",value:function(){this.paused=!1;var e=0===this.playIndex?this.playList.length-1:this.playIndex-1;this.play(e)}},{key:"setIndex",value:function(e){this.playIndex=e}},{key:"loop",value:function(e){r._loopModels.indexOf(e)>-1&&(this.loopModel=e)}},{key:"toggleLoopModel",value:function(){var e=r._loopModels.indexOf(this.loopModel),t=(0,s._iterator)(r._loopModels,!0,e),n=t.next().value;return this.loopModel=n,n}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.observe=t.defineReactive=void 0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=n(12),a=function(e){return e&&e.__esModule?e:{default:e}}(o),r=n(0),s=t.defineReactive=function(e,t,n,i){l(n),Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get:function(){return a.default[t]?a.default[t]():n},set:function(o){o!==n&&(i(o,n,t,e),n=o,l(o))}})},l=t.observe=function(e,t,n,o){"object"===(void 0===e?"undefined":i(e))&&Object.keys(e).forEach(function(i){if(r.type.isArray(n)){(!0===o?n.indexOf(i)>-1:n.indexOf(i)<0)&&s(e,i,e[i],t)}else s(e,i,e[i],t)})};t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=n(0),a={duration:function(e){this.$el.querySelector(".time-range").innerHTML=""+(0,o._timeFormat)(e)},playIndex:function(e){i.isDev&&console.log("正在准备第"+(e+1)+"首："+this.playList[e].name),this.timer=0,this.progress=0,this.createDom(e)},playList:function(e){i.isDev&&console.table(e)},paused:function(e){var t=this.$el.querySelector(".play-btn"),n=t.classList,i=this.$el.querySelector(".cover"),a=i.querySelector("span");e?(n.remove("icon-pause"),n.add("icon-play"),this.progressTimer&&clearInterval(this.progressTimer),a.classList.add("stop")):(n.remove("icon-play"),n.add("icon-pause"),o._progressTimer.call(this),a.classList.remove("stop"))},progress:function(e){this.$el.querySelector(".front-line").style.width=e},timer:function(e){this.$el.querySelector(".timer").innerHTML=""+(0,o._timeFormat)(e)},openAnalyzer:function(e){o._handleAnalyzer.call(this,{name:"analyzer"},this.$el.querySelector(".player-analyzer"),e)}};t.default=a},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t.default={currentTime:function(){return i._audio.currentTime},duration:function(){return i._audio.duration},currentSrc:function(){return i._audio.src}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),l=n(6),u=i(l),c=n(7),d=i(c),f=n(8),p=i(f),y=n(0),h=function(e){function t(e,n){o(this,t);var i=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.$el="string"==typeof e?document.querySelector(e):e&&e.nodeName?e:null,n=Object.assign({autoPlay:!0,loopModel:"list",data:[],template:"",defaultIndex:0,created:function(){},updated:function(){}},n),n.template||(n.template=i.$el?i.$el.innerHTML:""),i.loopModel=n.loopModel,i.completed=!1,["created","updated","autoPlay","$template"].forEach(function(e){Object.defineProperty(i,e,{get:function(){var t=0==e.indexOf("$")?e.substr(1):e;return n[t]}})}),(0,d.default)(i,function(e,t,n){p.default[n]&&p.default[n].call(i,e,t)}),i.importMusic((0,y.deepCopy)(n.data)),i.$el&&i.setIndex(n.defaultIndex),!0===i.autoPlay&&i.play(),i.getTimeRange(i.playList[n.defaultIndex].src),i}return r(t,e),s(t,[{key:"createDom",value:function(e){if(this.playList[e]){(0,y._clearDom)(this.$el);var t=document.createElement("div");t.className="player-container",t.innerHTML=this.$template,y._compile.call(this,t,this.playList[e]),this.$el.appendChild(t),this.completed?this.updated():this.created(),!this.completed&&(this.completed=!0)}}}]),t}(u.default);t.default=h,window.Player=h}]);