/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"contao-video-bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bundles/heimrichhannotvideo/assets/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/Resources/assets/js/contao-video-bundle.js","alertify"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@hundh/contao-utils-bundle/js/array-util.js":
/*!******************************************************************!*\
  !*** ./node_modules/@hundh/contao-utils-bundle/js/array-util.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ArrayUtil = /*#__PURE__*/function () {
  function ArrayUtil() {
    _classCallCheck(this, ArrayUtil);
  }

  _createClass(ArrayUtil, null, [{
    key: "removeFromArray",
    value: function removeFromArray(value, array) {
      for (var i = 0; i < array.length; i++) {
        if (JSON.stringify(value) == JSON.stringify(array[i])) {
          array.splice(i, 1);
        }
      }

      return array;
    }
  }]);

  return ArrayUtil;
}();

/* harmony default export */ __webpack_exports__["default"] = (ArrayUtil);

/***/ }),

/***/ "./node_modules/@hundh/contao-utils-bundle/js/dom-util.js":
/*!****************************************************************!*\
  !*** ./node_modules/@hundh/contao-utils-bundle/js/dom-util.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array-util */ "./node_modules/@hundh/contao-utils-bundle/js/array-util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var DomUtil = /*#__PURE__*/function () {
  function DomUtil() {
    _classCallCheck(this, DomUtil);
  }

  _createClass(DomUtil, null, [{
    key: "getTextWithoutChildren",
    value: function getTextWithoutChildren(element, notrim) {
      var result = element.cloneNode(true);
      Array.prototype.forEach.call(result.children, function (child) {
        child.remove();
      });

      if (typeof notrim !== 'undefined' && notrim === true) {
        return result.innerText;
      } else {
        return result.innerText.trim();
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(element) {
      var _this = this;

      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var rect = element.getBoundingClientRect();
      var scrollPosition = rect.top + window.pageYOffset - offset;
      setTimeout(function () {
        if (!_this.elementInViewport(element) || force === true) {
          var isSmoothScrollSupported = ('scrollBehavior' in document.documentElement.style);

          if (isSmoothScrollSupported) {
            window.scrollTo({
              'top': scrollPosition,
              'behavior': 'smooth'
            });
          } else {
            window.scrollTo(0, scrollPosition);
          }
        }
      }, delay);
    }
  }, {
    key: "elementInViewport",
    value: function elementInViewport(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset;
    }
  }, {
    key: "getAllParentNodes",
    value: function getAllParentNodes(node) {
      var parents = [];

      while (node) {
        parents.unshift(node);
        node = node.parentNode;
      }

      for (var i = 0; i < parents.length; i++) {
        if (parents[i] === document) {
          parents.splice(i, 1);
        }
      }

      return parents;
    }
  }]);

  return DomUtil;
}();

/* harmony default export */ __webpack_exports__["default"] = (DomUtil);

/***/ }),

/***/ "./node_modules/@hundh/contao-utils-bundle/js/event-util.js":
/*!******************************************************************!*\
  !*** ./node_modules/@hundh/contao-utils-bundle/js/event-util.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-util */ "./node_modules/@hundh/contao-utils-bundle/js/dom-util.js");
/* harmony import */ var _general_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general-util */ "./node_modules/@hundh/contao-utils-bundle/js/general-util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var EventUtil = /*#__PURE__*/function () {
  function EventUtil() {
    _classCallCheck(this, EventUtil);
  }

  _createClass(EventUtil, null, [{
    key: "addDynamicEventListener",
    value: function addDynamicEventListener(eventName, selector, callback, scope, disableBubbling) {
      if (typeof scope === 'undefined') {
        scope = document;
      }

      scope.addEventListener(eventName, function (e) {
        var parents;

        if (_general_util__WEBPACK_IMPORTED_MODULE_1__["default"].isTruthy(disableBubbling)) {
          parents = [e.target];
        } else if (e.target !== document) {
          parents = _dom_util__WEBPACK_IMPORTED_MODULE_0__["default"].getAllParentNodes(e.target);
        } // for instance window load/resize event


        if (!Array.isArray(parents)) {
          document.querySelectorAll(selector).forEach(function (item) {
            callback(item, e);
          });
          return;
        }

        parents.reverse().forEach(function (item) {
          if (item && item.matches(selector)) {
            callback(item, e);
          }
        });
      });
    }
  }, {
    key: "createEventObject",
    value: function createEventObject(type) {
      var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var composed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (typeof Event === 'function') {
        return new Event(type, {
          bubbles: bubbles,
          cancelable: cancelable,
          composed: composed
        });
      } else {
        var event = document.createEvent('Event');
        event.initEvent(type, bubbles, cancelable);
        return event;
      }
    }
  }]);

  return EventUtil;
}();

/* harmony default export */ __webpack_exports__["default"] = (EventUtil);

/***/ }),

/***/ "./node_modules/@hundh/contao-utils-bundle/js/general-util.js":
/*!********************************************************************!*\
  !*** ./node_modules/@hundh/contao-utils-bundle/js/general-util.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var GeneralUtil = /*#__PURE__*/function () {
  function GeneralUtil() {
    _classCallCheck(this, GeneralUtil);
  }

  _createClass(GeneralUtil, null, [{
    key: "isTruthy",
    value: function isTruthy(value) {
      return typeof value !== 'undefined' && value !== null;
    }
  }, {
    key: "call",
    value: function call(func) {
      if (typeof func === 'function') {
        func.apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
    /**
     * Run a function recursively for a given set of arguments.
     *
     * function doLogic(argument, remainingArguments, callback) {
     *     // do your logic with argument
     *     utilsBundle.util.runRecursiveFunction(doLogic, remainingArguments, callback);
     * }
     *
     * utilsBundle.util.runRecursiveFunction(doLogic, [1, 2, 3, 4], () => {
     *     // do something after all is done
     * });
     *
     * @param func
     * @param args
     * @param callback
     * @param successIndex
     */

  }, {
    key: "runRecursiveFunction",
    value: function runRecursiveFunction(func, args, callback, successIndex) {
      if (args.length < 1) {
        if (GeneralUtil.isTruthy(callback) && Array.isArray(callback)) {
          GeneralUtil.call(callback[successIndex]);
        } else {
          GeneralUtil.call(callback);
        }

        return;
      }

      var argument = args[0],
          remainingArgs = args.slice(1, args.length);
      func(argument, remainingArgs, callback);
    }
  }]);

  return GeneralUtil;
}();

/* harmony default export */ __webpack_exports__["default"] = (GeneralUtil);

/***/ }),

/***/ "./src/Resources/assets/js/contao-video-bundle.js":
/*!********************************************************!*\
  !*** ./src/Resources/assets/js/contao-video-bundle.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video */ "./src/Resources/assets/js/video.js");
/* harmony import */ var _hundh_contao_utils_bundle_js_event_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hundh/contao-utils-bundle/js/event-util */ "./node_modules/@hundh/contao-utils-bundle/js/event-util.js");
/* harmony import */ var alertifyjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alertifyjs */ "./node_modules/alertifyjs/build/alertify.js");
/* harmony import */ var alertifyjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alertifyjs__WEBPACK_IMPORTED_MODULE_2__);

document.addEventListener('DOMContentLoaded', function () {
  var wrapperElements = document.querySelectorAll('.huh_video');
  wrapperElements.forEach(function (element) {
    return new _video__WEBPACK_IMPORTED_MODULE_0__["default"](element);
  });
});

 // const videoThumbnailSelector = '.huh_video > .video-wrapper > .video-thumbnail';
// const htmlVideoSelector = '.huh_video > .video-wrapper > .video-container';
// const localeStorageAcceptPrivacyKey = 'huh_video_privacy';
// const privacyAutoFieldName = 'video-save-privacy';
//
// class VideoBundle {
//     static onReady() {
//
//         // autoplay videos
//         document.querySelectorAll(videoThumbnailSelector).forEach(function(item) {
//             if (item.getAttribute('data-autoplay')) {
//                 VideoBundle.initVideo(item);
//             }
//         });
//
//         document.querySelectorAll(htmlVideoSelector).forEach((item) => {
//             VideoBundle.initVideo(item);
//         });
//
//         // handle click event
//         EventUtil.addDynamicEventListener('click', videoThumbnailSelector, function(target) {
//             VideoBundle.initVideo(target);
//         });
//
//         // handle click event
//         document.querySelectorAll('.huh_video.video-link').forEach(function(element) {
//             element.addEventListener('click', function(event) {
//                 event.preventDefault();
//
//                 VideoBundle.initPrivacy(event.target);
//             });
//         });
//
//         VideoBundle.initToggleVideo();
//     }
//
//     static initPrivacy(element) {
//         if ('privacy' in element.dataset) {
//             if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
//                 return true;
//             }
//
//             const dialog = alertify.confirm().set({
//                 labels: {
//                     ok: element.getAttribute('data-btn-privacy-ok') !== null ? element.getAttribute('data-btn-privacy-ok') : 'OK',
//                     cancel: element.getAttribute('data-btn-privacy-cancel') !== null ? element.getAttribute('data-btn-privacy-cancel') : 'Cancel'
//                 },
//                 onshow: function() {
//                     document.dispatchEvent(new CustomEvent('huh.video.alertify.onshow', {
//                         bubbles: true,
//                         cancelable: true,
//                         detail: {
//                             elements: dialog.elements
//                         }
//                     }));
//                 },
//                 defaultFocusOff: true,
//                 onfocus: function() {
//                     document.dispatchEvent(new CustomEvent('huh.video.alertify.onfocus', {
//                         bubbles: true,
//                         cancelable: true,
//                         detail: {
//                             elements: dialog.elements
//                         }
//                     }));
//                 }
//             });
//
//             alertify.confirm('&nbsp;',
//                 element.getAttribute('data-privacy-html').replace(/\\"/g, '"'),
//                 () => {
//                     if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
//                         localStorage.setItem(localeStorageAcceptPrivacyKey, true);
//                     }
//                     element.dispatchEvent(new CustomEvent('huh.video.privacy.accept', {
//                         bubbles: true,
//                         cancelable: true,
//                         detail: {
//                             elements: dialog.elements
//                         }
//                     }));
//                     // location.href = element.getAttribute('href');
//                 },
//                 function() {
//                     element.dispatchEvent(new CustomEvent('huh.video.privacy.cancel', {
//                         bubbles: true,
//                         cancelable: true,
//                         detail: {
//                             elements: dialog.elements
//                         }
//                     }));
//                 });
//         }
//     }
//
//     static initVideo(element) {
//         let container = element.parentNode.querySelector('.video-container'),
//             iframes = container.querySelectorAll('iframe'),
//             htmlVideo = container.querySelector('video');
//
//         if (iframes && (iframes.length > 0)) {
//             iframes.forEach(iframe => {
//                 VideoBundle.initIframeVideo(element, iframe);
//                 VideoBundle.showVideo(element, iframe);
//             })
//
//         } else if (htmlVideo) {
//             VideoBundle.initHtmlVideo(element, htmlVideo);
//             VideoBundle.showVideo(element, htmlVideo);
//         }
//     }
//
//     static showVideo(element, video) {
//         let container = element.querySelector('.video-container');
//
//         if (container) {
//             container.classList.remove('video-hidden');
//         }
//
//         element.classList.add('initialize');
//         video.classList.add('initialize');
//
//         element.classList.remove('initialize');
//         element.classList.remove('video-hidden');
//
//         video.classList.remove('initialize');
//         video.classList.remove('video-hidden');
//
//         document.dispatchEvent(new CustomEvent('videoInitialized', {detail: video, bubbles: true, cancelable: true}));
//     }
//
//     static initIframeVideo(element, iframe) {
//         // stop playing video on closing any modal window
//         EventUtil.addDynamicEventListener('click', '[data-dismiss="modal"]', function(target) {
//             iframe.setAttribute('src', iframe.getAttribute('data-src'));
//         });
//
//         // stop playing video on closing any bootstrap modal
//         document.addEventListener('hidden.bs.modal', function(e) {
//             iframe.setAttribute('src', iframe.getAttribute('data-src'));
//         });
//
//         // iframe.setAttribute('src', iframe.getAttribute('data-src'));
//
//         if (element.getAttribute('data-privacy')) {
//
//             if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
//                 iframe.setAttribute('src', iframe.getAttribute('data-src'));
//                 VideoBundle.showVideo(element, iframe);
//
//                 return false;
//             }
//
//             let dialog = alertify.confirm().set({
//                 labels: {
//                     ok: element.getAttribute('data-btn-privacy-ok') !== null ? element.getAttribute('data-btn-privacy-ok') : 'OK',
//                     cancel: element.getAttribute('data-btn-privacy-cancel') !== null ? element.getAttribute('data-btn-privacy-cancel') : 'Cancel'
//                 },
//                 onshow: function() {
//                     document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onshow', {
//                         bubbles: true,
//                         cancelable: true,
//                         detail: {
//                             elements: dialog.elements
//                         }
//                     }));
//                 },
//                 defaultFocusOff: true,
//                 onfocus: function() {
//                     document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onfocus', {
//                         bubbles: true,
//                         cancelable: true,
//                         detail: {
//                             elements: dialog.elements
//                         }
//                     }));
//                 }
//             });
//
//             alertify.confirm('&nbsp;',
//                 element.getAttribute('data-privacy-html').replace(/\\"/g, '"'),
//                 function() {
//                     if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
//                         localStorage.setItem(localeStorageAcceptPrivacyKey, true);
//                     }
//
//                     iframe.setAttribute('src', iframe.getAttribute('data-src'));
//
//                     VideoBundle.showVideo(element, iframe);
//                 },
//                 function() {
//                 });
//
//             return false;
//         }
//     }
//
//     static initHtmlVideo(element, video) {
//         let wrapper = element.closest('.video-wrapper');
//         let button = wrapper.querySelector('button.play-button');
//         if (button) {
//             button.addEventListener('click', e => {
//                 video.play();
//                 if (!video.hasAttribute("controls")) {
//                     video.setAttribute("controls", "controls");
//                 }
//             });
//
//             video.addEventListener('pause', e => {
//                 button.classList.remove('hidden');
//             });
//
//             video.addEventListener('play', e => {
//                 button.classList.add('hidden');
//             });
//
//         }
//
//     }
//
//     static initToggleVideo() {
//
//         let videoContainers = document.querySelectorAll('.ce_huh_video .huh_video');
//         const initStates = [true, true];
//
//         videoContainers && videoContainers.forEach(ctn => {
//
//             let toggleButtons = ctn.querySelectorAll('.huh_video .video-toggle-ctn button');
//             let liveRegion = ctn.querySelector('#videoToggleLiveRegionOutput');
//
//             const toggleVideo = (index, withLiveRegion = false) => {
//                 let states = initStates.slice(0);
//                 states[index] = false;
//
//                 if (toggleButtons.length > 0) {
//                     states.forEach((state, i) => {
//
//                         let videoCtn = ctn.querySelector('#' + toggleButtons[i].getAttribute('aria-controls'));
//
//                         if (state) {
//                             toggleButtons[i].classList.add('btn-video-show');
//                             videoCtn.style.display = 'none';
//                             // Refresh iframe
//                             let iframe = videoCtn.querySelector('iframe');
//                             if(iframe !== null) {
//                                 iframe.setAttribute('src', iframe.src);
//                             }
//
//                         } else {
//                             toggleButtons[i].classList.remove('btn-video-show');
//                             videoCtn.style.display = 'block';
//                         }
//
//                     })
//
//                     // TODO how to localize this
//                     if (withLiveRegion) {
//                         if (!index) {
//                             liveRegion.textContent = "Audiodeskription steht im folgenden Video zur Verfügung";
//                         } else {
//                             liveRegion.textContent = "Audiodeskription steht im folgenden Video nicht mehr zur Verfügung";
//                         }
//                     }
//                 }
//             }
//
//             if (toggleButtons.length > 0) {
//                 toggleButtons.forEach((btn, index) => {
//                     btn.addEventListener('click', el => {
//                         toggleVideo(index, true);
//                     })
//                 })
//
//                 toggleVideo(1);
//             }
//         })
//
//
//     }
// }
//
// document.addEventListener('afterUnlockProtectedCode', (e) => {
//     // privacy center -> skip the preview image on first unlock, i.e., if the unlocking has been done by a click
//     let video = document.querySelector('[data-identifier="' + e.detail.identifier + '"] .huh_video');
//     if (video !== null) {
//         VideoBundle.initVideo(video);
//         VideoBundle.initToggleVideo();
//
//         if(e.detail.unlockByClick) {
//             let toggle = video.querySelector('.video-toggle-ctn button');
//             if(toggle) {
//                 toggle.focus();
//             } else {
//                 video.querySelector('[tabindex="0"]').focus();
//             }
//         }
//
//     }
// });
//
// document.addEventListener('DOMContentLoaded', VideoBundle.onReady);
//
// export default VideoBundle;

/***/ }),

/***/ "./src/Resources/assets/js/video.js":
/*!******************************************!*\
  !*** ./src/Resources/assets/js/video.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Video; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Video = /*#__PURE__*/function () {
  /** @type {Element} */

  /** @type {Element} */

  /**
   * @param {Element} wrapperElement
   */
  function Video(wrapperElement) {
    _classCallCheck(this, Video);

    _defineProperty(this, "wrapperElement", void 0);

    _defineProperty(this, "videoContainerElement", void 0);

    this.wrapperElement = wrapperElement;
    this.privacyNotice = 'privacyNotice' in wrapperElement.dataset;
    this.previewImageElement = this.wrapperElement.querySelector('.video-wrapper .video-thumbnail');
    this.videoContainerElement = this.wrapperElement.querySelector('.video-wrapper .video-container');
    this.legacyPrivacyCheck();
    this.showVideo();
  }

  _createClass(Video, [{
    key: "applyPrivacySetting",
    value: function applyPrivacySetting() {
      if (!this.privacyNotice) {
        this.showVideo();
      }
    }
    /**
     *
     * @returns {boolean}
     */

  }, {
    key: "showVideo",
    value: function showVideo() {
      if ('element' in this.wrapperElement.dataset) {
        if (!this.videoContainerElement) {
          this.videoContainerElement = document.createElement('div');
          this.videoContainerElement.classList.add(['video-container']);
          var videoWrapper = this.wrapperElement.querySelector('.video-wrapper');

          if (!videoWrapper) {
            return false;
          }

          videoWrapper.appendChild(this.videoContainerElement);
        } else {
          this.videoContainerElement.innerHTML = '';
        }

        var elementDescription = JSON.parse(this.wrapperElement.dataset.element);
        /** @var {Element} videoElement */

        var videoElement = document.createElement(elementDescription.type);
        Object.entries(elementDescription.attributes).forEach(function (value) {
          videoElement.setAttribute(value[0], value[1]);
        });
        this.videoContainerElement.appendChild(videoElement);
      } else {
        if (!this.videoContainerElement) {
          return false;
        }

        var iframes = this.videoContainerElement.querySelectorAll('iframe');

        if (iframes.length < 1) {
          return false;
        }

        iframes.forEach(function (iframe) {
          iframe.src = iframe.dataset.src;
        });
      }

      this.videoContainerElement.classList.remove('video-hidden');
      return true;
    }
    /**
     * @todo Remove in next major version
     */

  }, {
    key: "legacyPrivacyCheck",
    value: function legacyPrivacyCheck() {
      if (!this.privacyNotice && this.previewImageElement) {
        if ('privacy' in this.previewImageElement.dataset) {
          this.privacyNotice = true;
          console.warn("You're using an outdated video templates. Please adjust your template according to the docs. Since version 1.2.0");
        }
      }
    }
  }]);

  return Video;
}();



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2FycmF5LXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2RvbS11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9ldmVudC11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9nZW5lcmFsLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy92aWRlby5qcyJdLCJuYW1lcyI6WyJBcnJheVV0aWwiLCJ2YWx1ZSIsImFycmF5IiwiaSIsImxlbmd0aCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzcGxpY2UiLCJEb21VdGlsIiwiZWxlbWVudCIsIm5vdHJpbSIsInJlc3VsdCIsImNsb25lTm9kZSIsIkFycmF5IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGwiLCJjaGlsZHJlbiIsImNoaWxkIiwicmVtb3ZlIiwiaW5uZXJUZXh0IiwidHJpbSIsIm9mZnNldCIsImRlbGF5IiwiZm9yY2UiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsUG9zaXRpb24iLCJ0b3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNldFRpbWVvdXQiLCJlbGVtZW50SW5WaWV3cG9ydCIsImlzU21vb3RoU2Nyb2xsU3VwcG9ydGVkIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNjcm9sbFRvIiwiZWwiLCJvZmZzZXRUb3AiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRQYXJlbnQiLCJpbm5lckhlaWdodCIsInBhZ2VYT2Zmc2V0IiwiaW5uZXJXaWR0aCIsIm5vZGUiLCJwYXJlbnRzIiwidW5zaGlmdCIsInBhcmVudE5vZGUiLCJFdmVudFV0aWwiLCJldmVudE5hbWUiLCJzZWxlY3RvciIsImNhbGxiYWNrIiwic2NvcGUiLCJkaXNhYmxlQnViYmxpbmciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIkdlbmVyYWxVdGlsIiwiaXNUcnV0aHkiLCJ0YXJnZXQiLCJnZXRBbGxQYXJlbnROb2RlcyIsImlzQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXRlbSIsInJldmVyc2UiLCJtYXRjaGVzIiwidHlwZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJFdmVudCIsImV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJmdW5jIiwiYXBwbHkiLCJzbGljZSIsImFyZ3VtZW50cyIsImFyZ3MiLCJzdWNjZXNzSW5kZXgiLCJhcmd1bWVudCIsInJlbWFpbmluZ0FyZ3MiLCJ3cmFwcGVyRWxlbWVudHMiLCJWaWRlbyIsIndyYXBwZXJFbGVtZW50IiwicHJpdmFjeU5vdGljZSIsImRhdGFzZXQiLCJwcmV2aWV3SW1hZ2VFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInZpZGVvQ29udGFpbmVyRWxlbWVudCIsImxlZ2FjeVByaXZhY3lDaGVjayIsInNob3dWaWRlbyIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ2aWRlb1dyYXBwZXIiLCJhcHBlbmRDaGlsZCIsImlubmVySFRNTCIsImVsZW1lbnREZXNjcmlwdGlvbiIsInBhcnNlIiwidmlkZW9FbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGUiLCJpZnJhbWVzIiwiaWZyYW1lIiwic3JjIiwiY29uc29sZSIsIndhcm4iXSwi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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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SUFBSSxhQUFhLEtBQUtBLG1CQUFMLENBQXlCRCxPQUExQyxFQUFtRDtVQUMvQyxLQUFLRCxhQUFMLEdBQXFCLElBQXJCO1VBQ0F1QixPQUFPLENBQUNDLElBQVIsQ0FBYSxrSEFBYjtRQUNIO01BQ0o7SUFDSiIsImZpbGUiOiJjb250YW8tdmlkZW8tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImNvbnRhby12aWRlby1idW5kbGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idW5kbGVzL2hlaW1yaWNoaGFubm90dmlkZW8vYXNzZXRzL1wiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9SZXNvdXJjZXMvYXNzZXRzL2pzL2NvbnRhby12aWRlby1idW5kbGUuanNcIixcImFsZXJ0aWZ5XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiY2xhc3MgQXJyYXlVdGlsIHtcbiAgICBzdGF0aWMgcmVtb3ZlRnJvbUFycmF5KHZhbHVlLCBhcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsdWUpID09IEpTT04uc3RyaW5naWZ5KGFycmF5W2ldKSkge1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcnJheVV0aWwiLCJpbXBvcnQgQXJyYXlVdGlsIGZyb20gJy4vYXJyYXktdXRpbCc7XG5cbmNsYXNzIERvbVV0aWwge1xuICAgIHN0YXRpYyBnZXRUZXh0V2l0aG91dENoaWxkcmVuKGVsZW1lbnQsIG5vdHJpbSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChyZXN1bHQuY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHlwZW9mIG5vdHJpbSAhPT0gJ3VuZGVmaW5lZCcgJiYgbm90cmltID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmlubmVyVGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzY3JvbGxUbyhlbGVtZW50LCBvZmZzZXQgPSAwLCBkZWxheSA9IDAsIGZvcmNlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAocmVjdC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBvZmZzZXQpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50SW5WaWV3cG9ydChlbGVtZW50KSB8fCBmb3JjZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNTbW9vdGhTY3JvbGxTdXBwb3J0ZWQgPSAnc2Nyb2xsQmVoYXZpb3InIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNTbW9vdGhTY3JvbGxTdXBwb3J0ZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IHNjcm9sbFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JlaGF2aW9yJzogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZWxlbWVudEluVmlld3BvcnQoZWwpIHtcbiAgICAgICAgbGV0IHRvcCA9IGVsLm9mZnNldFRvcDtcbiAgICAgICAgbGV0IGxlZnQgPSBlbC5vZmZzZXRMZWZ0O1xuICAgICAgICBsZXQgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB3aGlsZSAoZWwub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgIHRvcCArPSBlbC5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZWZ0ICs9IGVsLm9mZnNldExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdG9wIDwgKHdpbmRvdy5wYWdlWU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodCkgJiZcbiAgICAgICAgICAgIGxlZnQgPCAod2luZG93LnBhZ2VYT2Zmc2V0ICsgd2luZG93LmlubmVyV2lkdGgpICYmXG4gICAgICAgICAgICAodG9wICsgaGVpZ2h0KSA+IHdpbmRvdy5wYWdlWU9mZnNldCAmJlxuICAgICAgICAgICAgKGxlZnQgKyB3aWR0aCkgPiB3aW5kb3cucGFnZVhPZmZzZXRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0QWxsUGFyZW50Tm9kZXMobm9kZSkge1xuICAgICAgICB2YXIgcGFyZW50cyA9IFtdO1xuXG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICBwYXJlbnRzLnVuc2hpZnQobm9kZSk7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50c1tpXSA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJlbnRzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tVXRpbFxuIiwiaW1wb3J0IERvbVV0aWwgZnJvbSAnLi9kb20tdXRpbCc7XG5pbXBvcnQgR2VuZXJhbFV0aWwgZnJvbSAnLi9nZW5lcmFsLXV0aWwnXG5cbmNsYXNzIEV2ZW50VXRpbCB7XG4gICAgc3RhdGljIGFkZER5bmFtaWNFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCBzY29wZSwgZGlzYWJsZUJ1YmJsaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NvcGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBzY29wZSA9IGRvY3VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudHM7XG5cbiAgICAgICAgICAgIGlmIChHZW5lcmFsVXRpbC5pc1RydXRoeShkaXNhYmxlQnViYmxpbmcpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cyA9IFtlLnRhcmdldF07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0ICE9PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHBhcmVudHMgPSBEb21VdGlsLmdldEFsbFBhcmVudE5vZGVzKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZm9yIGluc3RhbmNlIHdpbmRvdyBsb2FkL3Jlc2l6ZSBldmVudFxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcmVudHMpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0sIGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyZW50cy5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpdGVtLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUV2ZW50T2JqZWN0KHR5cGUsIGJ1YmJsZXMgPSBmYWxzZSwgY2FuY2VsYWJsZSA9IGZhbHNlLCBjb21wb3NlZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKEV2ZW50KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFdmVudCh0eXBlLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogYnViYmxlcyxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBjYW5jZWxhYmxlLFxuICAgICAgICAgICAgICAgIGNvbXBvc2VkOiBjb21wb3NlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudFV0aWxcbiIsImNsYXNzIEdlbmVyYWxVdGlsIHtcbiAgICBzdGF0aWMgaXNUcnV0aHkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGw7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhbGwoZnVuYykge1xuICAgICAgICBpZiAodHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW4gYSBmdW5jdGlvbiByZWN1cnNpdmVseSBmb3IgYSBnaXZlbiBzZXQgb2YgYXJndW1lbnRzLlxuICAgICAqXG4gICAgICogZnVuY3Rpb24gZG9Mb2dpYyhhcmd1bWVudCwgcmVtYWluaW5nQXJndW1lbnRzLCBjYWxsYmFjaykge1xuICAgICAqICAgICAvLyBkbyB5b3VyIGxvZ2ljIHdpdGggYXJndW1lbnRcbiAgICAgKiAgICAgdXRpbHNCdW5kbGUudXRpbC5ydW5SZWN1cnNpdmVGdW5jdGlvbihkb0xvZ2ljLCByZW1haW5pbmdBcmd1bWVudHMsIGNhbGxiYWNrKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiB1dGlsc0J1bmRsZS51dGlsLnJ1blJlY3Vyc2l2ZUZ1bmN0aW9uKGRvTG9naWMsIFsxLCAyLCAzLCA0XSwgKCkgPT4ge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmcgYWZ0ZXIgYWxsIGlzIGRvbmVcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gc3VjY2Vzc0luZGV4XG4gICAgICovXG4gICAgc3RhdGljIHJ1blJlY3Vyc2l2ZUZ1bmN0aW9uKGZ1bmMsIGFyZ3MsIGNhbGxiYWNrLCBzdWNjZXNzSW5kZXgpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgaWYgKEdlbmVyYWxVdGlsLmlzVHJ1dGh5KGNhbGxiYWNrKSAmJiBBcnJheS5pc0FycmF5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIEdlbmVyYWxVdGlsLmNhbGwoY2FsbGJhY2tbc3VjY2Vzc0luZGV4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIEdlbmVyYWxVdGlsLmNhbGwoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXJndW1lbnQgPSBhcmdzWzBdLFxuICAgICAgICAgICAgcmVtYWluaW5nQXJncyA9IGFyZ3Muc2xpY2UoMSwgYXJncy5sZW5ndGgpO1xuXG4gICAgICAgIGZ1bmMoYXJndW1lbnQsIHJlbWFpbmluZ0FyZ3MsIGNhbGxiYWNrKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyYWxVdGlsXG4iLCJpbXBvcnQgVmlkZW8gZnJvbSAnLi92aWRlbydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7XG4gICAgbGV0IHdyYXBwZXJFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5odWhfdmlkZW8nKTtcbiAgICB3cmFwcGVyRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4gbmV3IFZpZGVvKGVsZW1lbnQpKTtcbn0pO1xuXG5pbXBvcnQgRXZlbnRVdGlsIGZyb20gJ0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2V2ZW50LXV0aWwnO1xuaW1wb3J0IGFsZXJ0aWZ5IGZyb20gJ2FsZXJ0aWZ5anMnO1xuXG4vLyBjb25zdCB2aWRlb1RodW1ibmFpbFNlbGVjdG9yID0gJy5odWhfdmlkZW8gPiAudmlkZW8td3JhcHBlciA+IC52aWRlby10aHVtYm5haWwnO1xuLy8gY29uc3QgaHRtbFZpZGVvU2VsZWN0b3IgPSAnLmh1aF92aWRlbyA+IC52aWRlby13cmFwcGVyID4gLnZpZGVvLWNvbnRhaW5lcic7XG4vLyBjb25zdCBsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSA9ICdodWhfdmlkZW9fcHJpdmFjeSc7XG4vLyBjb25zdCBwcml2YWN5QXV0b0ZpZWxkTmFtZSA9ICd2aWRlby1zYXZlLXByaXZhY3knO1xuLy9cbi8vIGNsYXNzIFZpZGVvQnVuZGxlIHtcbi8vICAgICBzdGF0aWMgb25SZWFkeSgpIHtcbi8vXG4vLyAgICAgICAgIC8vIGF1dG9wbGF5IHZpZGVvc1xuLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZpZGVvVGh1bWJuYWlsU2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuLy8gICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWF1dG9wbGF5JykpIHtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8oaXRlbSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChodG1sVmlkZW9TZWxlY3RvcikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFZpZGVvKGl0ZW0pO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudFxuLy8gICAgICAgICBFdmVudFV0aWwuYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmlkZW9UaHVtYm5haWxTZWxlY3RvciwgZnVuY3Rpb24odGFyZ2V0KSB7XG4vLyAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8odGFyZ2V0KTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRcbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlby52aWRlby1saW5rJykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4vLyAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbi8vICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuLy9cbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0UHJpdmFjeShldmVudC50YXJnZXQpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFRvZ2dsZVZpZGVvKCk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdFByaXZhY3koZWxlbWVudCkge1xuLy8gICAgICAgICBpZiAoJ3ByaXZhY3knIGluIGVsZW1lbnQuZGF0YXNldCkge1xuLy8gICAgICAgICAgICAgaWYgKG51bGwgIT09IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5KSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGxhYmVsczoge1xuLy8gICAgICAgICAgICAgICAgICAgICBvazogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSAhPT0gbnVsbCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgOiAnT0snLFxuLy8gICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgOiAnQ2FuY2VsJ1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgb25zaG93OiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbnNob3cnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4vLyAgICAgICAgICAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeS1odG1sJykucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLFxuLy8gICAgICAgICAgICAgICAgICgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGRpYWxvZy5lbGVtZW50cy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPScgKyBwcml2YWN5QXV0b0ZpZWxkTmFtZSArICddJykuY2hlY2tlZCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXksIHRydWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5wcml2YWN5LmFjY2VwdCcsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLmhyZWYgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5wcml2YWN5LmNhbmNlbCcsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0VmlkZW8oZWxlbWVudCkge1xuLy8gICAgICAgICBsZXQgY29udGFpbmVyID0gZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1jb250YWluZXInKSxcbi8vICAgICAgICAgICAgIGlmcmFtZXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJyksXG4vLyAgICAgICAgICAgICBodG1sVmlkZW8gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbi8vXG4vLyAgICAgICAgIGlmIChpZnJhbWVzICYmIChpZnJhbWVzLmxlbmd0aCA+IDApKSB7XG4vLyAgICAgICAgICAgICBpZnJhbWVzLmZvckVhY2goaWZyYW1lID0+IHtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0SWZyYW1lVmlkZW8oZWxlbWVudCwgaWZyYW1lKTtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5zaG93VmlkZW8oZWxlbWVudCwgaWZyYW1lKTtcbi8vICAgICAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGh0bWxWaWRlbykge1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdEh0bWxWaWRlbyhlbGVtZW50LCBodG1sVmlkZW8pO1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuc2hvd1ZpZGVvKGVsZW1lbnQsIGh0bWxWaWRlbyk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBzaG93VmlkZW8oZWxlbWVudCwgdmlkZW8pIHtcbi8vICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLWNvbnRhaW5lcicpO1xuLy9cbi8vICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuLy8gICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvLWhpZGRlbicpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luaXRpYWxpemUnKTtcbi8vICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuLy9cbi8vICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbml0aWFsaXplJyk7XG4vLyAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlkZW8taGlkZGVuJyk7XG4vL1xuLy8gICAgICAgICB2aWRlby5jbGFzc0xpc3QucmVtb3ZlKCdpbml0aWFsaXplJyk7XG4vLyAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvLWhpZGRlbicpO1xuLy9cbi8vICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3ZpZGVvSW5pdGlhbGl6ZWQnLCB7ZGV0YWlsOiB2aWRlbywgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZX0pKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0SWZyYW1lVmlkZW8oZWxlbWVudCwgaWZyYW1lKSB7XG4vLyAgICAgICAgIC8vIHN0b3AgcGxheWluZyB2aWRlbyBvbiBjbG9zaW5nIGFueSBtb2RhbCB3aW5kb3dcbi8vICAgICAgICAgRXZlbnRVdGlsLmFkZER5bmFtaWNFdmVudExpc3RlbmVyKCdjbGljaycsICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLCBmdW5jdGlvbih0YXJnZXQpIHtcbi8vICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vIHN0b3AgcGxheWluZyB2aWRlbyBvbiBjbG9zaW5nIGFueSBib290c3RyYXAgbW9kYWxcbi8vICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuLy8gICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgLy8gaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vL1xuLy8gICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeScpKSB7XG4vL1xuLy8gICAgICAgICAgICAgaWYgKG51bGwgIT09IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5KSkge1xuLy8gICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy8gICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLnNob3dWaWRlbyhlbGVtZW50LCBpZnJhbWUpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgbGV0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGxhYmVsczoge1xuLy8gICAgICAgICAgICAgICAgICAgICBvazogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSAhPT0gbnVsbCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgOiAnT0snLFxuLy8gICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgOiAnQ2FuY2VsJ1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgb25zaG93OiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5ldmVudC5hbGVydGlmeS5vbnNob3cnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmV2ZW50LmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4vLyAgICAgICAgICAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeS1odG1sJykucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLFxuLy8gICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoZGlhbG9nLmVsZW1lbnRzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignW25hbWU9JyArIHByaXZhY3lBdXRvRmllbGROYW1lICsgJ10nKS5jaGVja2VkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSwgdHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuc2hvd1ZpZGVvKGVsZW1lbnQsIGlmcmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0SHRtbFZpZGVvKGVsZW1lbnQsIHZpZGVvKSB7XG4vLyAgICAgICAgIGxldCB3cmFwcGVyID0gZWxlbWVudC5jbG9zZXN0KCcudmlkZW8td3JhcHBlcicpO1xuLy8gICAgICAgICBsZXQgYnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheS1idXR0b24nKTtcbi8vICAgICAgICAgaWYgKGJ1dHRvbikge1xuLy8gICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuLy8gICAgICAgICAgICAgICAgIGlmICghdmlkZW8uaGFzQXR0cmlidXRlKFwiY29udHJvbHNcIikpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiY29udHJvbHNcIiwgXCJjb250cm9sc1wiKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGUgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBlID0+IHtcbi8vICAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdFRvZ2dsZVZpZGVvKCkge1xuLy9cbi8vICAgICAgICAgbGV0IHZpZGVvQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZV9odWhfdmlkZW8gLmh1aF92aWRlbycpO1xuLy8gICAgICAgICBjb25zdCBpbml0U3RhdGVzID0gW3RydWUsIHRydWVdO1xuLy9cbi8vICAgICAgICAgdmlkZW9Db250YWluZXJzICYmIHZpZGVvQ29udGFpbmVycy5mb3JFYWNoKGN0biA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgbGV0IHRvZ2dsZUJ1dHRvbnMgPSBjdG4ucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlbyAudmlkZW8tdG9nZ2xlLWN0biBidXR0b24nKTtcbi8vICAgICAgICAgICAgIGxldCBsaXZlUmVnaW9uID0gY3RuLnF1ZXJ5U2VsZWN0b3IoJyN2aWRlb1RvZ2dsZUxpdmVSZWdpb25PdXRwdXQnKTtcbi8vXG4vLyAgICAgICAgICAgICBjb25zdCB0b2dnbGVWaWRlbyA9IChpbmRleCwgd2l0aExpdmVSZWdpb24gPSBmYWxzZSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGxldCBzdGF0ZXMgPSBpbml0U3RhdGVzLnNsaWNlKDApO1xuLy8gICAgICAgICAgICAgICAgIHN0YXRlc1tpbmRleF0gPSBmYWxzZTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUJ1dHRvbnMubGVuZ3RoID4gMCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZm9yRWFjaCgoc3RhdGUsIGkpID0+IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9DdG4gPSBjdG4ucXVlcnlTZWxlY3RvcignIycgKyB0b2dnbGVCdXR0b25zW2ldLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ2J0bi12aWRlby1zaG93Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9DdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIGlmcmFtZVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZnJhbWUgPSB2aWRlb0N0bi5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpZnJhbWUgIT09IG51bGwpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLnNyYyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQnV0dG9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tdmlkZW8tc2hvdycpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvQ3RuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgfSlcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gaG93IHRvIGxvY2FsaXplIHRoaXNcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHdpdGhMaXZlUmVnaW9uKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluZGV4KSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZVJlZ2lvbi50ZXh0Q29udGVudCA9IFwiQXVkaW9kZXNrcmlwdGlvbiBzdGVodCBpbSBmb2xnZW5kZW4gVmlkZW8genVyIFZlcmbDvGd1bmdcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZVJlZ2lvbi50ZXh0Q29udGVudCA9IFwiQXVkaW9kZXNrcmlwdGlvbiBzdGVodCBpbSBmb2xnZW5kZW4gVmlkZW8gbmljaHQgbWVociB6dXIgVmVyZsO8Z3VuZ1wiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGlmICh0b2dnbGVCdXR0b25zLmxlbmd0aCA+IDApIHtcbi8vICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWwgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlVmlkZW8oaW5kZXgsIHRydWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICAgICAgICAgIHRvZ2dsZVZpZGVvKDEpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuLy9cbi8vXG4vLyAgICAgfVxuLy8gfVxuLy9cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FmdGVyVW5sb2NrUHJvdGVjdGVkQ29kZScsIChlKSA9PiB7XG4vLyAgICAgLy8gcHJpdmFjeSBjZW50ZXIgLT4gc2tpcCB0aGUgcHJldmlldyBpbWFnZSBvbiBmaXJzdCB1bmxvY2ssIGkuZS4sIGlmIHRoZSB1bmxvY2tpbmcgaGFzIGJlZW4gZG9uZSBieSBhIGNsaWNrXG4vLyAgICAgbGV0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaWRlbnRpZmllcj1cIicgKyBlLmRldGFpbC5pZGVudGlmaWVyICsgJ1wiXSAuaHVoX3ZpZGVvJyk7XG4vLyAgICAgaWYgKHZpZGVvICE9PSBudWxsKSB7XG4vLyAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyh2aWRlbyk7XG4vLyAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRUb2dnbGVWaWRlbygpO1xuLy9cbi8vICAgICAgICAgaWYoZS5kZXRhaWwudW5sb2NrQnlDbGljaykge1xuLy8gICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby10b2dnbGUtY3RuIGJ1dHRvbicpO1xuLy8gICAgICAgICAgICAgaWYodG9nZ2xlKSB7XG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlLmZvY3VzKCk7XG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJ1t0YWJpbmRleD1cIjBcIl0nKS5mb2N1cygpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vL1xuLy8gICAgIH1cbi8vIH0pO1xuLy9cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBWaWRlb0J1bmRsZS5vblJlYWR5KTtcbi8vXG4vLyBleHBvcnQgZGVmYXVsdCBWaWRlb0J1bmRsZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvIHtcblxuICAgIC8qKiBAdHlwZSB7RWxlbWVudH0gKi9cbiAgICB3cmFwcGVyRWxlbWVudDtcbiAgICAvKiogQHR5cGUge0VsZW1lbnR9ICovXG4gICAgdmlkZW9Db250YWluZXJFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB3cmFwcGVyRWxlbWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdyYXBwZXJFbGVtZW50KSB7XG4gICAgICAgIHRoaXMud3JhcHBlckVsZW1lbnQgPSB3cmFwcGVyRWxlbWVudDtcbiAgICAgICAgdGhpcy5wcml2YWN5Tm90aWNlID0gJ3ByaXZhY3lOb3RpY2UnIGluIHdyYXBwZXJFbGVtZW50LmRhdGFzZXQ7XG4gICAgICAgIHRoaXMucHJldmlld0ltYWdlRWxlbWVudCA9IHRoaXMud3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXdyYXBwZXIgLnZpZGVvLXRodW1ibmFpbCcpO1xuICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCA9IHRoaXMud3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXdyYXBwZXIgLnZpZGVvLWNvbnRhaW5lcicpO1xuXG5cbiAgICAgICAgdGhpcy5sZWdhY3lQcml2YWN5Q2hlY2soKTtcbiAgICAgICAgdGhpcy5zaG93VmlkZW8oKTtcblxuICAgIH1cblxuICAgIGFwcGx5UHJpdmFjeVNldHRpbmcoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnByaXZhY3lOb3RpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNob3dWaWRlbygpXG4gICAge1xuICAgICAgICBpZiAoJ2VsZW1lbnQnIGluIHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChbJ3ZpZGVvLWNvbnRhaW5lciddKTtcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9XcmFwcGVyID0gdGhpcy53cmFwcGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW9XcmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmlkZW9XcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBlbGVtZW50RGVzY3JpcHRpb24gPSBKU09OLnBhcnNlKHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldC5lbGVtZW50KTtcblxuICAgICAgICAgICAgLyoqIEB2YXIge0VsZW1lbnR9IHZpZGVvRWxlbWVudCAqL1xuICAgICAgICAgICAgbGV0IHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudERlc2NyaXB0aW9uLnR5cGUpO1xuXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhlbGVtZW50RGVzY3JpcHRpb24uYXR0cmlidXRlcykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHZpZGVvRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaWZyYW1lcyA9IHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpO1xuICAgICAgICAgICAgaWYgIChpZnJhbWVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmcmFtZXMuZm9yRWFjaCgoaWZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgaWZyYW1lLnNyYyA9IGlmcmFtZS5kYXRhc2V0LnNyYztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlkZW8taGlkZGVuJyk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHRvZG8gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvblxuICAgICAqL1xuICAgIGxlZ2FjeVByaXZhY3lDaGVjaygpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMucHJpdmFjeU5vdGljZSAmJiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICgncHJpdmFjeScgaW4gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhY3lOb3RpY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIllvdSdyZSB1c2luZyBhbiBvdXRkYXRlZCB2aWRlbyB0ZW1wbGF0ZXMuIFBsZWFzZSBhZGp1c3QgeW91ciB0ZW1wbGF0ZSBhY2NvcmRpbmcgdG8gdGhlIGRvY3MuIFNpbmNlIHZlcnNpb24gMS4yLjBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufSJdLCJzb3VyY2VSb290IjoiIn0=