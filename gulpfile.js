const balm = require('balm');

balm.config = {
  server: {
    open: false
  },
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'css',
      js: 'js',
      img: 'images',
      font: 'fonts'
    }
  },
  styles: {
    ext: 'scss',
    autoprefixer: ['> 1%', 'last 3 versions', 'not ie <= 8']
  },
  scripts: {
    alias: {
      vue: balm.config.production ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
    },
    entry: {
      demo: './app/js/demo',
      player: './app/js/player'
    },
    sourceMap: false
  },
  cache: false
};

balm.go(function (mix) {
  if(balm.config.production){
    mix.copy('./app/music/**', './dist/music');
  }
});
