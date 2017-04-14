function noop() {}

function bindEvents(thisArg, events) {
   Object.keys(events).forEach(function (selector) {
        Object.keys(events[selector]).forEach(function (event) {
            var handler = events[selector][event].bind(thisArg);
            if('document' === selector) {
                document.addEventListener(event, handler, false);
            } else if ('window' === selector) {
                window.addEventListener(event, handler, false);
            } else {
                document.querySelectorAll(selector).forEach(function (dom) {
                    dom.addEventListener(event, handler, false);
                });
            }
        });
    }); // all events bound
}

function f(name, params) {
  params = Array.prototype.slice.call(arguments, 1, arguments.length);
  return name + '(' + params.join(', ') + ')';
}

function randomInt(max) { return Math.floor(Math.random() * (max + 1)); }

var IS_CORDOVA = !!window.cordova;

var app = {
  options: {
    debug: false
  },

  // internal
  $main: null,
  color: [0, 0, 0],

  init: function () {
    bindEvents(this, {
      'document': {'deviceready': this.ready},
      'form input': {'change': this.change},
      'main': {'click': this.next}
    });

    if(!IS_CORDOVA) {
      this.options.debug && console.log('NOT cordova');
      bindEvents(this, {'window': {'load': this.ready}});
    }
    return this;
  },

  ready: function () {
    // Store DOM nodes
    this.$main = document.querySelector('main');
    return this.next();
  },

  change: function () {
    this.options.debug && console.log('.change()');
    return this;
  },

  next: function () {
    this.options.debug && console.log('.next()');
    this.color = [randomInt(255), randomInt(255), randomInt(255)];
    return this.render();
  },

  render: function () {
    this.options.debug && console.log('.render()');
    this.$main.style.backgroundColor = 'rgb(' + this.color.join(', ') + ')';
    return this;
  }
};

app.init();
