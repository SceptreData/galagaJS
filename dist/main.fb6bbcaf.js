// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/draw.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCanvas = clearCanvas;
exports.buildStars = buildStars;
exports.updateStarField = updateStarField;
exports.Draw = void 0;
var BG_COLOR = '#333333';
var NUM_STARS = 20;

function clearCanvas(canvas, ctx) {
  var width = canvas.width,
      height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  setStroke(ctx, '#111111', 0);
  setFill(ctx, BG_COLOR);
  rect(ctx, 0, 0, width, height);
}

function buildStars(width, height) {
  var starField = [];

  for (var i = 0; i < NUM_STARS; i++) {
    var star = {
      x: Math.floor(Math.random() * (width - 1)),
      y: Math.floor(Math.random() * (height - 1)),
      vy: Math.ceil(Math.random() * 5)
    };
    starField.push(star);
  }

  return starField;
}

function updateStarField(canvas, stars) {
  var ctx = canvas.getContext('2d');
  stars.forEach(function (star) {
    star.y = (star.y + star.vy + canvas.height) % canvas.height;
    setFill(ctx, '#eee');
    circle(ctx, star.x, star.y, 3);
  });
}

function setStroke(ctx, color) {
  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
}

function setFill(ctx, color) {
  ctx.fillStyle = color;
}

function rect(ctx, x, y, width, height) {
  var fill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  ctx.beginPath();
  ctx.rect(x, y, width, height);

  if (fill) {
    ctx.fill();
  }

  ctx.stroke();
}

function circle(ctx, x, y, radius) {
  var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);

  if (fill) {
    ctx.fill();
  }

  ctx.stroke();
  ctx.closePath;
}

function image(ctx, src, x, y, w, h) {
  ctx.drawImage(src, x, y, w, h);
}

function triangle(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
  ctx.fill();
}

var Draw = {
  setStroke: setStroke,
  setFill: setFill,
  rect: rect,
  circle: circle,
  clearCanvas: clearCanvas,
  image: image,
  triangle: triangle
};
exports.Draw = Draw;
},{}],"js/entity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = Entity;

var _draw = require("./draw.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Entity(canvas, ctx, attrs) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.type = '';
  this.timeCreated = Date.now();
  this.width = 50;
  this.height = 50;
  this.position = [canvas.width / 2, canvas.height / 2];

  if (attrs) {
    Object.assign(this, attrs);
  }
}

Entity.prototype.render = function () {
  var boundRect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  var _this$position = _slicedToArray(this.position, 2),
      x = _this$position[0],
      y = _this$position[1];

  if (boundRect || this.type === 'projectile') {
    _draw.Draw.setStroke(this.ctx, '#eee');

    _draw.Draw.rect(this.ctx, x, y, this.width, this.height, false);
  }

  if (this.image) {
    _draw.Draw.image(this.image, x, y, this.width, this.height);
  }

  if (this.type === 'hero') {
    _draw.Draw.setStroke(this.ctx, '#eee');

    _draw.Draw.triangle(this.ctx, x, y, this.width, this.height);
  } else if (this.type === 'enemy') {// drawEnemyImage
  } else if (this.type === 'projectile') {
    _draw.Draw.setStroke(this.ctx, 'tomato');

    _draw.Draw.setFill(this.ctx, 'tomato');

    _draw.Draw.circle(this.ctx, this.x, this.y, 10);

    _draw.Draw.rect(this.ctx, x, y, this.width, this.height, true);
  }
};

Entity.prototype.update = function () {
  if (this.velocity) {
    var _this$position2 = _slicedToArray(this.position, 2),
        x = _this$position2[0],
        y = _this$position2[1];

    var _this$velocity = _slicedToArray(this.velocity, 2),
        vx = _this$velocity[0],
        vy = _this$velocity[1];

    if (this.type === 'projectile') {} // Clamp speeds here.


    x += vx;
    y += vy; // Make sure our ship cant go out of bounds

    if (this.screenLocked) {
      if (x + this.width >= this.canvas.width) {
        x = this.canvas.width - this.width - 1;
      }

      if (x <= 0) x = 1;

      if (y + this.height >= this.canvas.height) {
        y = this.canvas.height - this.height;
      }

      if (y <= 0) y = 1;
    }

    this.position = [x, y];
    this.velocity = [vx, vy];
  }
};

Entity.prototype.setVerticalSpeed = function (v) {
  this.velocity[1] = v;
};

Entity.prototype.setHorizontalSpeed = function (v) {
  this.velocity[0] = v;
};

Entity.prototype.takeDamage = function (dmg) {
  if (this.hp) {
    this.hp = this.hp - dmg;
  }

  if (this.hp <= 0) {
    this.isDead = true;
  }
};

Entity.prototype.collidesWith = function (other) {
  var _this$position3 = _slicedToArray(this.position, 2),
      x = _this$position3[0],
      y = _this$position3[1];

  var _other$position = _slicedToArray(other.position, 2),
      otherX = _other$position[0],
      otherY = _other$position[1];

  return x < oxerX + other.width && x + this.width > otherX && y < otherY + other.height && y + this.height > otherY;
};
},{"./draw.js":"js/draw.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _draw = require("./draw.js");

var _entity = require("./entity");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var canvas = document.querySelector('#gameCanvas');
var ctx = canvas.getContext('2d');
var FPS = 1000 / 60;
var lastTime = new Date().getTime(),
    curTime = 0,
    delta = 0;
var entities = [];
var starField = (0, _draw.buildStars)(canvas.width, canvas.height);
var hero = new _entity.Entity(canvas, ctx, {
  position: [canvas.width / 2, canvas.height / 2 + 150],
  velocity: [0, 0],
  screenLocked: true,
  type: 'hero'
});
entities.push(hero);
registerInputEvents();

function gameLoop() {
  // Fancy browser animation magic
  window.requestAnimationFrame(gameLoop);
  curTime = new Date().getTime();
  delta = curTime - lastTime;

  if (delta > FPS) {
    (0, _draw.clearCanvas)(canvas, ctx);
    update();
    render();
  }
}

gameLoop();

function update() {
  (0, _draw.updateStarField)(canvas, starField); // hero.update();

  entities.forEach(function (e) {
    return e.update();
  }); // Clear the bodies

  entities = entities.filter(function (e) {
    return !e.isDead;
  });
}

function render() {
  // hero.render(false);
  entities.forEach(function (e) {
    return e.render(false);
  });
}

function registerInputEvents() {
  document.addEventListener('keydown', function (e) {
    if (e.key == 'w' || e.key == 'ArrowUp') {
      hero.setVerticalSpeed(-5);
    } else if (e.key == 's' || e.key == 'ArrowDown') {
      hero.setVerticalSpeed(5);
    } else if (e.key == 'd' || e.key == 'ArrowRight') {
      hero.setHorizontalSpeed(5);
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
      hero.setHorizontalSpeed(-5);
    } else if (e.key == ' ') {
      fireProjectile(hero, [0, -5]);
    }
  });
  document.addEventListener('keyup', function (e) {
    var k = e.key;

    if (k == 'w' || k == 'ArrowUp' || k == 's' || k == 'ArrowDown') {
      hero.setVerticalSpeed(0);
    } else if (k == 'd' || e.key == 'ArrowRight' || k == 'a' || k == 'ArrowLeft') {
      hero.setHorizontalSpeed(0);
    }
  });
}

function fireProjectile(ent, vel) {
  var _ent$position = _slicedToArray(ent.position, 2),
      x0 = _ent$position[0],
      y0 = _ent$position[1];

  var originX = x0 + ent.width / 2;
  var originY = y0 + ent.height / 2;
  var p = new _entity.Entity(canvas, ctx, {
    position: [originX, originY],
    width: 3,
    height: 3,
    velocity: vel,
    type: 'projectile'
  });
  entities.push(p);
}
},{"./draw.js":"js/draw.js","./entity":"js/entity.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56198" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map