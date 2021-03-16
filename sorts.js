(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sorts = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function*(arr) {
  let len = arr.length
  let swapped = true
  while (swapped) {
    swapped = false
    for (let i = 1; i < len; i++) {
      if (arr[i - 1] > arr[i]) {
        arr.swap(i - 1, i)
        swapped = true
      }
      yield arr
    }
    len--
  }
}

},{}],2:[function(require,module,exports){
module.exports = function*(arr) {
  let i = 1
  let len = arr.length
  while (i < len) {
    let j = i
    while (j >= 0 && arr[j - 1] > arr[j]) {
      yield arr.swap(j, j - 1)
      j--
    }
    i++
  }
}

},{}],3:[function(require,module,exports){
module.exports = function*(arr) {
  let i, j
  let len = arr.length
  for (i = 0; i < len; i++) {
    let jmin = i
    for (j = i + 1; j < len; j++) {
      if (arr[j] < arr[jmin]) jmin = j
      yield arr
    }
    if (jmin !== i) {
      yield arr.swap(i, jmin)
    }
  }
}

},{}],4:[function(require,module,exports){
require('./utils/swap')
require('./utils/randomize')
const Bubble = require('./algos/bubble')
const Selection = require('./algos/selection')
const Insertion = require('./algos/insertion')
module.exports = {
        Bubble,
        Selection,
        Insertion
    }
},{"./algos/bubble":1,"./algos/insertion":2,"./algos/selection":3,"./utils/randomize":5,"./utils/swap":6}],5:[function(require,module,exports){
Array.prototype.randomize = function (numswaps) {
  len = this.length
  numswaps = numswaps ?? len
  while (numswaps > 0) {
    let a = Math.floor(Math.random() * len)
    let b = Math.floor(Math.random() * len)
    this.swap(a, b)
    numswaps--
  }
  return this
}

},{}],6:[function(require,module,exports){
Array.prototype.swap = function (a, b) {
	let temp = this[a]
	this[a] = this[b]
	this[b] = temp
	return this
}

},{}]},{},[4])(4)
});
