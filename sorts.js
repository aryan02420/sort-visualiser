(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sorts = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function*(arr) {
  arr = arr.slice();
  let len = arr.length;
  let swapped = true;
  let i;
  while (swapped) {
    swapped = false;
    for (i = 1; i < len; i++) {
      yield {
        array: arr.slice(),
        i: i,
        j: i-1,
        k: [len]
      }
      if (arr[i - 1] > arr[i]) {
        arr.swap(i - 1, i);
        yield {
          array: arr.slice(),
          i: i,
          j: i-1,
          k: [len]
        }
        swapped = true;
      }
    }
    len--;
  }
}

},{}],2:[function(require,module,exports){
module.exports = function*(arr) {
  arr = arr.slice();
  let len = arr.length;
  let startindex = 0;
  let endindex = len - 1;
  let i;
  while (startindex < endindex) {
    newstartindex = endindex;
    newendindex = startindex;
    for (i = startindex; i <= endindex; i++) {
      yield {
        array: arr.slice(),
        i: i,
        j: i+1,
        k: [startindex, endindex]
      }
      if (arr[i] > arr[i+1]) {
        arr.swap(i, i+1);
        newendindex = i;
        yield {
          array: arr.slice(),
          i: i,
          j: i+1,
          k: [startindex, endindex]
        }
      }
    }
    endindex = newendindex - 1;
    for (i = endindex; i >= startindex; i--) {
      yield {
        array: arr.slice(),
        i: i,
        j: i+1,
        k: [startindex, endindex]
      }
      if (arr[i] > arr[i+1]) {
        arr.swap(i, i+1);
        newstartindex = i;
        yield {
          array: arr.slice(),
          i: i,
          j: i+1,
          k: [startindex, endindex]
        }
      }
    }
    startindex = newstartindex + 1
  }
}

},{}],3:[function(require,module,exports){
module.exports = function*(arr) {
  arr = arr.slice();
  let len = arr.length;
  let sorted = false;
  let shrink = 1.3;
  let gap = len;
  while (!sorted) {
    gap = Math.floor(gap/shrink);
    if (gap <= 1) {
      sorted = true;
      gap = 1;
    }
    for (i = 0; i < len-gap; i++) {
      let j = i + gap;
      yield {
        array: arr.slice(),
        i: i,
        j: j,
        k: [gap, len-gap]
      }
      if (arr[i] > arr[j]) {
        arr.swap(i, j);
        yield {
          array: arr.slice(),
          i: i,
          j: j,
          k: [gap, len-gap]
        }
        sorted = false;
      }
    }
  }
}

},{}],4:[function(require,module,exports){
module.exports = function*(arr) {
  arr = arr.slice();
  let i, j;
  let len = arr.length;
  for (i = 1; i < len; i++) {

    for (j = i; j >= 0; j--) {

      if (arr[j - 1] > arr[j]) {
        yield {
          array: arr.slice(),
          i: j-1,
          j: j,
          k: [i]
        }
        arr.swap(j, j - 1);
        yield {
          array: arr.slice(),
          i: j-1,
          j: j,
          k: [i]
        }
      } else {
        yield {
          array: arr.slice(),
          i: j-1,
          j: j,
          k: [i]
        }
        break;
      }

    }

  }
}

},{}],5:[function(require,module,exports){
const quicksort = function*(arr, lo, hi) {
  lo = lo ?? 0;
  hi = hi ?? arr.length;
  if (lo < hi) {
      let p;

          let pivot = arr[hi];
          let i = lo;
          for (let j = lo; j < hi; j++) {
            if (arr[j] < pivot) {
              yield {array: arr.slice(), i: i, j: j, k: [hi]};
              arr.swap(i, j);
              yield {array: arr.slice(), i: i, j: j, k: [hi]};
              i++;
            }
          }
          yield {array: arr.slice(), i: i, j: hi, k: [hi]};
          arr.swap(i, hi);
          yield {array: arr.slice(), i: i, j: hi, k: [hi]};
          p = i;

      yield* quicksort(arr, lo, p-1);
      yield* quicksort(arr, p+1, hi);
      }
  yield {array: arr.slice(), i: lo, j: hi, k: [hi]};
}

module.exports = function*(arr) {
  arr = arr.slice();
  yield* quicksort(arr, 0, arr.length-1);
};

},{}],6:[function(require,module,exports){
module.exports = function*(arr) {
  arr = arr.slice();
  let i, j;
  let len = arr.length;
  for (i = 0; i < len; i++) {
    let jmin = i;
    for (j = i + 1; j < len; j++) {
      if (arr[j] < arr[jmin]) jmin = j;
      yield {
        array: arr.slice(),
        i: i,
        j: j,
        k: [jmin]
      }
    }
    if (jmin !== i) {
      yield {
        array: arr.slice(),
        i: i,
        j: jmin,
        k: [jmin]
      }
      arr.swap(i, jmin);
      yield {
        array: arr.slice(),
        i: i,
        j: jmin,
        k: [jmin]
      }
    }
  }
}

},{}],7:[function(require,module,exports){
require('./utils/swap')
require('./utils/randomize')
const Bubble = require('./algos/bubble')
const Selection = require('./algos/selection')
const Insertion = require('./algos/insertion')
const Quick = require('./algos/quick')
const Cocktail = require('./algos/cocktail')
const Comb = require('./algos/comb')
module.exports = {
        Bubble,
        Selection,
        Insertion,
        Quick,
        Cocktail,
        Comb
    }

},{"./algos/bubble":1,"./algos/cocktail":2,"./algos/comb":3,"./algos/insertion":4,"./algos/quick":5,"./algos/selection":6,"./utils/randomize":8,"./utils/swap":9}],8:[function(require,module,exports){
Array.prototype.randomize = function (numswaps) {
  len = this.length
  numswaps = numswaps ?? len*3
  while (numswaps > 0) {
    let a = Math.floor(Math.random() * len)
    let b = Math.floor(Math.random() * len)
    this.swap(a, b)
    numswaps--
  }
  return this
}

},{}],9:[function(require,module,exports){
Array.prototype.swap = function (a, b) {
	let temp = this[a]
	this[a] = this[b]
	this[b] = temp
	return this
}

},{}]},{},[7])(7)
});
