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
/* harmony import */ var alertifyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alertifyjs */ "./node_modules/alertifyjs/build/alertify.js");
/* harmony import */ var alertifyjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alertifyjs__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Video = /*#__PURE__*/function () {
  /** @type {DOMStringMap} */

  /** @type {HTMLElement|null} */

  /** @type {boolean} */

  /** @type {HTMLElement|null} */

  /** @type {HTMLElement|null} */

  /**
   * @param {Element} wrapperElement
   */
  function Video(wrapperElement) {
    _classCallCheck(this, Video);

    _defineProperty(this, "configuration", void 0);

    _defineProperty(this, "previewImageElement", void 0);

    _defineProperty(this, "privacyNotice", void 0);

    _defineProperty(this, "videoContainerElement", void 0);

    _defineProperty(this, "wrapperElement", void 0);

    this.wrapperElement = wrapperElement;
    this.configuration = this.wrapperElement.dataset;
    this.privacyNotice = 'privacyNotice' in this.configuration;
    this.previewImageElement = this.wrapperElement.querySelector('.video-wrapper .video-thumbnail');
    this.videoContainerElement = this.wrapperElement.querySelector('.video-wrapper .video-container');
    this.legacyPrivacyCheck();
    this.applyPrivacySetting();
  }

  _createClass(Video, [{
    key: "applyPrivacySetting",
    value: function applyPrivacySetting() {
      // always show video if privacy is not activated
      if (!this.privacyNotice) {
        this.showVideo();
        return;
      } // show video for local video files


      if (this.videoContainerElement) {
        var htmlVideoElement = this.videoContainerElement.querySelector(':scope > video');

        if (htmlVideoElement) {
          this.showVideo();
          return;
        }
      } // show video if allows before by user


      if (localStorage.getItem(Video.privacyKey)) {
        this.showVideo();
      }

      this.privacyDialog();
    }
  }, {
    key: "privacyDialog",
    value: function privacyDialog() {
      var _this = this;

      var dialog = alertifyjs__WEBPACK_IMPORTED_MODULE_0___default.a.confirm().set({
        labels: this.privacyDialogLabels(),
        onshow: function onshow() {
          document.dispatchEvent(new CustomEvent('huh.video.alertify.onshow', {
            bubbles: true,
            cancelable: true,
            detail: {
              elements: dialog.elements
            }
          }));
        },
        defaultFocusOff: true,
        onfocus: function onfocus() {
          document.dispatchEvent(new CustomEvent('huh.video.alertify.onfocus', {
            bubbles: true,
            cancelable: true,
            detail: {
              elements: dialog.elements
            }
          }));
        }
      });
      var dialogTemplate = null;

      if ('privacyModalContent' in this.configuration) {
        dialogTemplate = this.configuration.privacyModalContent;
      } else if (this.previewImageElement && 'privacyHtml' in this.previewImageElement.dataset) {
        dialogTemplate = this.previewImageElement.dataset.privacyHtml.replace(/\\"/g, '"');
      } else {
        return;
      }

      var element = this.previewImageElement;

      if (!this.previewImageElement) {
        element = this.wrapperElement;
      }

      alertifyjs__WEBPACK_IMPORTED_MODULE_0___default.a.confirm('&nbsp;', dialogTemplate, function () {
        if (dialog.elements.content.querySelector('[name=' + Video.storeDecisionFieldName + ']').checked) {
          localStorage.setItem(Video.privacyKey, true);
        }

        element.dispatchEvent(new CustomEvent('huh.video.privacy.accept', {
          bubbles: true,
          cancelable: true,
          detail: {
            elements: dialog.elements
          }
        }));

        _this.showVideo();
      }, function () {
        element.dispatchEvent(new CustomEvent('huh.video.privacy.cancel', {
          bubbles: true,
          cancelable: true,
          detail: {
            elements: dialog.elements
          }
        }));
      });
    }
  }, {
    key: "privacyDialogLabels",
    value: function privacyDialogLabels() {
      var labels = {
        'ok': 'Ok',
        'cancel': 'Cancel'
      };

      if ('btnLabelOk' in this.wrapperElement.dataset) {
        labels.ok = this.wrapperElement.dataset.btnLabelOk;
      } else {
        if (this.previewImageElement && 'btnPrivacyOk' in this.previewImageElement.dataset) {
          labels.ok = this.previewImageElement.dataset.btnPrivacyOk;
        }
      }

      if ('btnLabelOk' in this.wrapperElement.dataset) {
        labels.cancel = this.wrapperElement.dataset.btnLabelCancel;
      } else {
        if (this.previewImageElement && 'btnPrivacyCancel' in this.previewImageElement.dataset) {
          labels.cancel = this.previewImageElement.dataset.btnPrivacyCancel;
        }
      }

      return labels;
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

        if (iframes.length > 0) {
          iframes.forEach(function (iframe) {
            iframe.src = iframe.dataset.src;
          });
        } else {
          var videoElements = this.videoContainerElement.querySelectorAll(':scope > video');

          if (videoElements.length < 1) {
            return false;
          }
        }
      }

      this.videoContainerElement.classList.remove('video-hidden');

      if (this.previewImageElement) {
        this.previewImageElement.style = 'display:none;';
      }

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

_defineProperty(Video, "privacyKey", 'huh_video_privacy');

_defineProperty(Video, "storeDecisionFieldName", 'video-save-privacy');



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2FycmF5LXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2RvbS11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9ldmVudC11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9nZW5lcmFsLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy92aWRlby5qcyJdLCJuYW1lcyI6WyJBcnJheVV0aWwiLCJ2YWx1ZSIsImFycmF5IiwiaSIsImxlbmd0aCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzcGxpY2UiLCJEb21VdGlsIiwiZWxlbWVudCIsIm5vdHJpbSIsInJlc3VsdCIsImNsb25lTm9kZSIsIkFycmF5IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGwiLCJjaGlsZHJlbiIsImNoaWxkIiwicmVtb3ZlIiwiaW5uZXJUZXh0IiwidHJpbSIsIm9mZnNldCIsImRlbGF5IiwiZm9yY2UiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsUG9zaXRpb24iLCJ0b3AiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNldFRpbWVvdXQiLCJlbGVtZW50SW5WaWV3cG9ydCIsImlzU21vb3RoU2Nyb2xsU3VwcG9ydGVkIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNjcm9sbFRvIiwiZWwiLCJvZmZzZXRUb3AiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRQYXJlbnQiLCJpbm5lckhlaWdodCIsInBhZ2VYT2Zmc2V0IiwiaW5uZXJXaWR0aCIsIm5vZGUiLCJwYXJlbnRzIiwidW5zaGlmdCIsInBhcmVudE5vZGUiLCJFdmVudFV0aWwiLCJldmVudE5hbWUiLCJzZWxlY3RvciIsImNhbGxiYWNrIiwic2NvcGUiLCJkaXNhYmxlQnViYmxpbmciLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIkdlbmVyYWxVdGlsIiwiaXNUcnV0aHkiLCJ0YXJnZXQiLCJnZXRBbGxQYXJlbnROb2RlcyIsImlzQXJyYXkiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXRlbSIsInJldmVyc2UiLCJtYXRjaGVzIiwidHlwZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJFdmVudCIsImV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJmdW5jIiwiYXBwbHkiLCJzbGljZSIsImFyZ3VtZW50cyIsImFyZ3MiLCJzdWNjZXNzSW5kZXgiLCJhcmd1bWVudCIsInJlbWFpbmluZ0FyZ3MiLCJ3cmFwcGVyRWxlbWVudHMiLCJWaWRlbyIsIndyYXBwZXJFbGVtZW50IiwiY29uZmlndXJhdGlvbiIsImRhdGFzZXQiLCJwcml2YWN5Tm90aWNlIiwicHJldmlld0ltYWdlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2aWRlb0NvbnRhaW5lckVsZW1lbnQiLCJsZWdhY3lQcml2YWN5Q2hlY2siLCJhcHBseVByaXZhY3lTZXR0aW5nIiwic2hvd1ZpZGVvIiwiaHRtbFZpZGVvRWxlbWVudCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwcml2YWN5S2V5IiwicHJpdmFjeURpYWxvZyIsImRpYWxvZyIsImFsZXJ0aWZ5IiwiY29uZmlybSIsInNldCIsImxhYmVscyIsInByaXZhY3lEaWFsb2dMYWJlbHMiLCJvbnNob3ciLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJlbGVtZW50cyIsImRlZmF1bHRGb2N1c09mZiIsIm9uZm9jdXMiLCJkaWFsb2dUZW1wbGF0ZSIsInByaXZhY3lNb2RhbENvbnRlbnQiLCJwcml2YWN5SHRtbCIsInJlcGxhY2UiLCJjb250ZW50Iiwic3RvcmVEZWNpc2lvbkZpZWxkTmFtZSIsImNoZWNrZWQiLCJzZXRJdGVtIiwib2siLCJidG5MYWJlbE9rIiwiYnRuUHJpdmFjeU9rIiwiY2FuY2VsIiwiYnRuTGFiZWxDYW5jZWwiLCJidG5Qcml2YWN5Q2FuY2VsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInZpZGVvV3JhcHBlciIsImFwcGVuZENoaWxkIiwiaW5uZXJIVE1MIiwiZWxlbWVudERlc2NyaXB0aW9uIiwicGFyc2UiLCJ2aWRlb0VsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZSIsImlmcmFtZXMiLCJpZnJhbWUiLCJzcmMiLCJ2aWRlb0VsZW1lbnRzIiwiY29uc29sZSIsIndhcm4iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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XHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiY29udGFvLXZpZGVvLWJ1bmRsZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1bmRsZXMvaGVpbXJpY2hoYW5ub3R2aWRlby9hc3NldHMvXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qc1wiLFwiYWxlcnRpZnlcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJjbGFzcyBBcnJheVV0aWwge1xuICAgIHN0YXRpYyByZW1vdmVGcm9tQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgPT0gSlNPTi5zdHJpbmdpZnkoYXJyYXlbaV0pKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFycmF5VXRpbCIsImltcG9ydCBBcnJheVV0aWwgZnJvbSAnLi9hcnJheS11dGlsJztcblxuY2xhc3MgRG9tVXRpbCB7XG4gICAgc3RhdGljIGdldFRleHRXaXRob3V0Q2hpbGRyZW4oZWxlbWVudCwgbm90cmltKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBlbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHJlc3VsdC5jaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygbm90cmltICE9PSAndW5kZWZpbmVkJyAmJiBub3RyaW0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuaW5uZXJUZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNjcm9sbFRvKGVsZW1lbnQsIG9mZnNldCA9IDAsIGRlbGF5ID0gMCwgZm9yY2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IChyZWN0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIG9mZnNldCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRJblZpZXdwb3J0KGVsZW1lbnQpIHx8IGZvcmNlID09PSB0cnVlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBpc1Ntb290aFNjcm9sbFN1cHBvcnRlZCA9ICdzY3JvbGxCZWhhdmlvcicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuICAgICAgICAgICAgICAgIGlmIChpc1Ntb290aFNjcm9sbFN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAndG9wJzogc2Nyb2xsUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmVoYXZpb3InOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlbGVtZW50SW5WaWV3cG9ydChlbCkge1xuICAgICAgICBsZXQgdG9wID0gZWwub2Zmc2V0VG9wO1xuICAgICAgICBsZXQgbGVmdCA9IGVsLm9mZnNldExlZnQ7XG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIHdoaWxlIChlbC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgdG9wICs9IGVsLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGxlZnQgKz0gZWwub2Zmc2V0TGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0b3AgPCAod2luZG93LnBhZ2VZT2Zmc2V0ICsgd2luZG93LmlubmVySGVpZ2h0KSAmJlxuICAgICAgICAgICAgbGVmdCA8ICh3aW5kb3cucGFnZVhPZmZzZXQgKyB3aW5kb3cuaW5uZXJXaWR0aCkgJiZcbiAgICAgICAgICAgICh0b3AgKyBoZWlnaHQpID4gd2luZG93LnBhZ2VZT2Zmc2V0ICYmXG4gICAgICAgICAgICAobGVmdCArIHdpZHRoKSA+IHdpbmRvdy5wYWdlWE9mZnNldFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRBbGxQYXJlbnROb2Rlcyhub2RlKSB7XG4gICAgICAgIHZhciBwYXJlbnRzID0gW107XG5cbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIHBhcmVudHMudW5zaGlmdChub2RlKTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnRzW2ldID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHBhcmVudHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudHM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb21VdGlsXG4iLCJpbXBvcnQgRG9tVXRpbCBmcm9tICcuL2RvbS11dGlsJztcbmltcG9ydCBHZW5lcmFsVXRpbCBmcm9tICcuL2dlbmVyYWwtdXRpbCdcblxuY2xhc3MgRXZlbnRVdGlsIHtcbiAgICBzdGF0aWMgYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBzZWxlY3RvciwgY2FsbGJhY2ssIHNjb3BlLCBkaXNhYmxlQnViYmxpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzY29wZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHNjb3BlID0gZG9jdW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50cztcblxuICAgICAgICAgICAgaWYgKEdlbmVyYWxVdGlsLmlzVHJ1dGh5KGRpc2FibGVCdWJibGluZykpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzID0gW2UudGFyZ2V0XTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cyA9IERvbVV0aWwuZ2V0QWxsUGFyZW50Tm9kZXMoZS50YXJnZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3IgaW5zdGFuY2Ugd2luZG93IGxvYWQvcmVzaXplIGV2ZW50XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFyZW50cykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaXRlbSwgZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJlbnRzLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0sIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRXZlbnRPYmplY3QodHlwZSwgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UsIGNvbXBvc2VkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoRXZlbnQpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV2ZW50KHR5cGUsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiBidWJibGVzLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGNhbmNlbGFibGUsXG4gICAgICAgICAgICAgICAgY29tcG9zZWQ6IGNvbXBvc2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50VXRpbFxuIiwiY2xhc3MgR2VuZXJhbFV0aWwge1xuICAgIHN0YXRpYyBpc1RydXRoeSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FsbChmdW5jKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biBhIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5IGZvciBhIGdpdmVuIHNldCBvZiBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBkb0xvZ2ljKGFyZ3VtZW50LCByZW1haW5pbmdBcmd1bWVudHMsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIGRvIHlvdXIgbG9naWMgd2l0aCBhcmd1bWVudFxuICAgICAqICAgICB1dGlsc0J1bmRsZS51dGlsLnJ1blJlY3Vyc2l2ZUZ1bmN0aW9uKGRvTG9naWMsIHJlbWFpbmluZ0FyZ3VtZW50cywgY2FsbGJhY2spO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHV0aWxzQnVuZGxlLnV0aWwucnVuUmVjdXJzaXZlRnVuY3Rpb24oZG9Mb2dpYywgWzEsIDIsIDMsIDRdLCAoKSA9PiB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyBhZnRlciBhbGwgaXMgZG9uZVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBzdWNjZXNzSW5kZXhcbiAgICAgKi9cbiAgICBzdGF0aWMgcnVuUmVjdXJzaXZlRnVuY3Rpb24oZnVuYywgYXJncywgY2FsbGJhY2ssIHN1Y2Nlc3NJbmRleCkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBpZiAoR2VuZXJhbFV0aWwuaXNUcnV0aHkoY2FsbGJhY2spICYmIEFycmF5LmlzQXJyYXkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgR2VuZXJhbFV0aWwuY2FsbChjYWxsYmFja1tzdWNjZXNzSW5kZXhdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgR2VuZXJhbFV0aWwuY2FsbChjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3NbMF0sXG4gICAgICAgICAgICByZW1haW5pbmdBcmdzID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XG5cbiAgICAgICAgZnVuYyhhcmd1bWVudCwgcmVtYWluaW5nQXJncywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhbFV0aWxcbiIsImltcG9ydCBWaWRlbyBmcm9tICcuL3ZpZGVvJ1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcbiAgICBsZXQgd3JhcHBlckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlbycpO1xuICAgIHdyYXBwZXJFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiBuZXcgVmlkZW8oZWxlbWVudCkpO1xufSk7XG5cbmltcG9ydCBFdmVudFV0aWwgZnJvbSAnQGh1bmRoL2NvbnRhby11dGlscy1idW5kbGUvanMvZXZlbnQtdXRpbCc7XG5pbXBvcnQgYWxlcnRpZnkgZnJvbSAnYWxlcnRpZnlqcyc7XG5cbi8vIGNvbnN0IHZpZGVvVGh1bWJuYWlsU2VsZWN0b3IgPSAnLmh1aF92aWRlbyA+IC52aWRlby13cmFwcGVyID4gLnZpZGVvLXRodW1ibmFpbCc7XG4vLyBjb25zdCBodG1sVmlkZW9TZWxlY3RvciA9ICcuaHVoX3ZpZGVvID4gLnZpZGVvLXdyYXBwZXIgPiAudmlkZW8tY29udGFpbmVyJztcbi8vIGNvbnN0IGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5ID0gJ2h1aF92aWRlb19wcml2YWN5Jztcbi8vIGNvbnN0IHByaXZhY3lBdXRvRmllbGROYW1lID0gJ3ZpZGVvLXNhdmUtcHJpdmFjeSc7XG4vL1xuLy8gY2xhc3MgVmlkZW9CdW5kbGUge1xuLy8gICAgIHN0YXRpYyBvblJlYWR5KCkge1xuLy9cbi8vICAgICAgICAgLy8gYXV0b3BsYXkgdmlkZW9zXG4vLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmlkZW9UaHVtYm5haWxTZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4vLyAgICAgICAgICAgICBpZiAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXknKSkge1xuLy8gICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyhpdGVtKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGh0bWxWaWRlb1NlbGVjdG9yKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4vLyAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8oaXRlbSk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50XG4vLyAgICAgICAgIEV2ZW50VXRpbC5hZGREeW5hbWljRXZlbnRMaXN0ZW5lcignY2xpY2snLCB2aWRlb1RodW1ibmFpbFNlbGVjdG9yLCBmdW5jdGlvbih0YXJnZXQpIHtcbi8vICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyh0YXJnZXQpO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudFxuLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaHVoX3ZpZGVvLnZpZGVvLWxpbmsnKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbi8vICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuLy8gICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRQcml2YWN5KGV2ZW50LnRhcmdldCk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICBWaWRlb0J1bmRsZS5pbml0VG9nZ2xlVmlkZW8oKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0UHJpdmFjeShlbGVtZW50KSB7XG4vLyAgICAgICAgIGlmICgncHJpdmFjeScgaW4gZWxlbWVudC5kYXRhc2V0KSB7XG4vLyAgICAgICAgICAgICBpZiAobnVsbCAhPT0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXkpKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gYWxlcnRpZnkuY29uZmlybSgpLnNldCh7XG4vLyAgICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIG9rOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1vaycpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSA6ICdPSycsXG4vLyAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgIT09IG51bGwgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1jYW5jZWwnKSA6ICdDYW5jZWwnXG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBvbnNob3c6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmFsZXJ0aWZ5Lm9uc2hvdycsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBkZWZhdWx0Rm9jdXNPZmY6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgb25mb2N1czogZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uYWxlcnRpZnkub25mb2N1cycsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgYWxlcnRpZnkuY29uZmlybSgnJm5ic3A7Jyxcbi8vICAgICAgICAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcml2YWN5LWh0bWwnKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJyksXG4vLyAgICAgICAgICAgICAgICAgKCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoZGlhbG9nLmVsZW1lbnRzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignW25hbWU9JyArIHByaXZhY3lBdXRvRmllbGROYW1lICsgJ10nKS5jaGVja2VkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSwgdHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLnByaXZhY3kuYWNjZXB0Jywge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gbG9jYXRpb24uaHJlZiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLnByaXZhY3kuY2FuY2VsJywge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgc3RhdGljIGluaXRWaWRlbyhlbGVtZW50KSB7XG4vLyAgICAgICAgIGxldCBjb250YWluZXIgPSBlbGVtZW50LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnZpZGVvLWNvbnRhaW5lcicpLFxuLy8gICAgICAgICAgICAgaWZyYW1lcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKSxcbi8vICAgICAgICAgICAgIGh0bWxWaWRlbyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuLy9cbi8vICAgICAgICAgaWYgKGlmcmFtZXMgJiYgKGlmcmFtZXMubGVuZ3RoID4gMCkpIHtcbi8vICAgICAgICAgICAgIGlmcmFtZXMuZm9yRWFjaChpZnJhbWUgPT4ge1xuLy8gICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRJZnJhbWVWaWRlbyhlbGVtZW50LCBpZnJhbWUpO1xuLy8gICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLnNob3dWaWRlbyhlbGVtZW50LCBpZnJhbWUpO1xuLy8gICAgICAgICAgICAgfSlcbi8vXG4vLyAgICAgICAgIH0gZWxzZSBpZiAoaHRtbFZpZGVvKSB7XG4vLyAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0SHRtbFZpZGVvKGVsZW1lbnQsIGh0bWxWaWRlbyk7XG4vLyAgICAgICAgICAgICBWaWRlb0J1bmRsZS5zaG93VmlkZW8oZWxlbWVudCwgaHRtbFZpZGVvKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgc3RhdGljIHNob3dWaWRlbyhlbGVtZW50LCB2aWRlbykge1xuLy8gICAgICAgICBsZXQgY29udGFpbmVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tY29udGFpbmVyJyk7XG4vL1xuLy8gICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4vLyAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmlkZW8taGlkZGVuJyk7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuLy8gICAgICAgICB2aWRlby5jbGFzc0xpc3QuYWRkKCdpbml0aWFsaXplJyk7XG4vL1xuLy8gICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luaXRpYWxpemUnKTtcbi8vICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd2aWRlby1oaWRkZW4nKTtcbi8vXG4vLyAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ2luaXRpYWxpemUnKTtcbi8vICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LnJlbW92ZSgndmlkZW8taGlkZGVuJyk7XG4vL1xuLy8gICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndmlkZW9Jbml0aWFsaXplZCcsIHtkZXRhaWw6IHZpZGVvLCBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlfSkpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgc3RhdGljIGluaXRJZnJhbWVWaWRlbyhlbGVtZW50LCBpZnJhbWUpIHtcbi8vICAgICAgICAgLy8gc3RvcCBwbGF5aW5nIHZpZGVvIG9uIGNsb3NpbmcgYW55IG1vZGFsIHdpbmRvd1xuLy8gICAgICAgICBFdmVudFV0aWwuYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoJ2NsaWNrJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsIGZ1bmN0aW9uKHRhcmdldCkge1xuLy8gICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgLy8gc3RvcCBwbGF5aW5nIHZpZGVvIG9uIGNsb3NpbmcgYW55IGJvb3RzdHJhcCBtb2RhbFxuLy8gICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihlKSB7XG4vLyAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBpZnJhbWUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAvLyBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBpZnJhbWUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbi8vXG4vLyAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcml2YWN5JykpIHtcbi8vXG4vLyAgICAgICAgICAgICBpZiAobnVsbCAhPT0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXkpKSB7XG4vLyAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vLyAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuc2hvd1ZpZGVvKGVsZW1lbnQsIGlmcmFtZSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBsZXQgZGlhbG9nID0gYWxlcnRpZnkuY29uZmlybSgpLnNldCh7XG4vLyAgICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIG9rOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1vaycpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSA6ICdPSycsXG4vLyAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgIT09IG51bGwgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1jYW5jZWwnKSA6ICdDYW5jZWwnXG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBvbnNob3c6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmV2ZW50LmFsZXJ0aWZ5Lm9uc2hvdycsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBkZWZhdWx0Rm9jdXNPZmY6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgb25mb2N1czogZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uZXZlbnQuYWxlcnRpZnkub25mb2N1cycsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgYWxlcnRpZnkuY29uZmlybSgnJm5ic3A7Jyxcbi8vICAgICAgICAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcml2YWN5LWh0bWwnKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJyksXG4vLyAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChkaWFsb2cuZWxlbWVudHMuY29udGVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT0nICsgcHJpdmFjeUF1dG9GaWVsZE5hbWUgKyAnXScpLmNoZWNrZWQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5LCB0cnVlKTtcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5zaG93VmlkZW8oZWxlbWVudCwgaWZyYW1lKTtcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgc3RhdGljIGluaXRIdG1sVmlkZW8oZWxlbWVudCwgdmlkZW8pIHtcbi8vICAgICAgICAgbGV0IHdyYXBwZXIgPSBlbGVtZW50LmNsb3Nlc3QoJy52aWRlby13cmFwcGVyJyk7XG4vLyAgICAgICAgIGxldCBidXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5wbGF5LWJ1dHRvbicpO1xuLy8gICAgICAgICBpZiAoYnV0dG9uKSB7XG4vLyAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4vLyAgICAgICAgICAgICAgICAgaWYgKCF2aWRlby5oYXNBdHRyaWJ1dGUoXCJjb250cm9sc1wiKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLCBcImNvbnRyb2xzXCIpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuLy8gICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIGUgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgfVxuLy9cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0VG9nZ2xlVmlkZW8oKSB7XG4vL1xuLy8gICAgICAgICBsZXQgdmlkZW9Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlX2h1aF92aWRlbyAuaHVoX3ZpZGVvJyk7XG4vLyAgICAgICAgIGNvbnN0IGluaXRTdGF0ZXMgPSBbdHJ1ZSwgdHJ1ZV07XG4vL1xuLy8gICAgICAgICB2aWRlb0NvbnRhaW5lcnMgJiYgdmlkZW9Db250YWluZXJzLmZvckVhY2goY3RuID0+IHtcbi8vXG4vLyAgICAgICAgICAgICBsZXQgdG9nZ2xlQnV0dG9ucyA9IGN0bi5xdWVyeVNlbGVjdG9yQWxsKCcuaHVoX3ZpZGVvIC52aWRlby10b2dnbGUtY3RuIGJ1dHRvbicpO1xuLy8gICAgICAgICAgICAgbGV0IGxpdmVSZWdpb24gPSBjdG4ucXVlcnlTZWxlY3RvcignI3ZpZGVvVG9nZ2xlTGl2ZVJlZ2lvbk91dHB1dCcpO1xuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IHRvZ2dsZVZpZGVvID0gKGluZGV4LCB3aXRoTGl2ZVJlZ2lvbiA9IGZhbHNlKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgbGV0IHN0YXRlcyA9IGluaXRTdGF0ZXMuc2xpY2UoMCk7XG4vLyAgICAgICAgICAgICAgICAgc3RhdGVzW2luZGV4XSA9IGZhbHNlO1xuLy9cbi8vICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHN0YXRlcy5mb3JFYWNoKChzdGF0ZSwgaSkgPT4ge1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb0N0biA9IGN0bi5xdWVyeVNlbGVjdG9yKCcjJyArIHRvZ2dsZUJ1dHRvbnNbaV0uZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnYnRuLXZpZGVvLXNob3cnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0N0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggaWZyYW1lXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlmcmFtZSA9IHZpZGVvQ3RuLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlmcmFtZSAhPT0gbnVsbCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBpZnJhbWUuc3JjKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi12aWRlby1zaG93Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9DdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICB9KVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBob3cgdG8gbG9jYWxpemUgdGhpc1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiAod2l0aExpdmVSZWdpb24pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlUmVnaW9uLnRleHRDb250ZW50ID0gXCJBdWRpb2Rlc2tyaXB0aW9uIHN0ZWh0IGltIGZvbGdlbmRlbiBWaWRlbyB6dXIgVmVyZsO8Z3VuZ1wiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlUmVnaW9uLnRleHRDb250ZW50ID0gXCJBdWRpb2Rlc2tyaXB0aW9uIHN0ZWh0IGltIGZvbGdlbmRlbiBWaWRlbyBuaWNodCBtZWhyIHp1ciBWZXJmw7xndW5nXCI7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgaWYgKHRvZ2dsZUJ1dHRvbnMubGVuZ3RoID4gMCkge1xuLy8gICAgICAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbnMuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlbCA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVWaWRlbyhpbmRleCwgdHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vXG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlVmlkZW8oMSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pXG4vL1xuLy9cbi8vICAgICB9XG4vLyB9XG4vL1xuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWZ0ZXJVbmxvY2tQcm90ZWN0ZWRDb2RlJywgKGUpID0+IHtcbi8vICAgICAvLyBwcml2YWN5IGNlbnRlciAtPiBza2lwIHRoZSBwcmV2aWV3IGltYWdlIG9uIGZpcnN0IHVubG9jaywgaS5lLiwgaWYgdGhlIHVubG9ja2luZyBoYXMgYmVlbiBkb25lIGJ5IGEgY2xpY2tcbi8vICAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZGVudGlmaWVyPVwiJyArIGUuZGV0YWlsLmlkZW50aWZpZXIgKyAnXCJdIC5odWhfdmlkZW8nKTtcbi8vICAgICBpZiAodmlkZW8gIT09IG51bGwpIHtcbi8vICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFZpZGVvKHZpZGVvKTtcbi8vICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFRvZ2dsZVZpZGVvKCk7XG4vL1xuLy8gICAgICAgICBpZihlLmRldGFpbC51bmxvY2tCeUNsaWNrKSB7XG4vLyAgICAgICAgICAgICBsZXQgdG9nZ2xlID0gdmlkZW8ucXVlcnlTZWxlY3RvcignLnZpZGVvLXRvZ2dsZS1jdG4gYnV0dG9uJyk7XG4vLyAgICAgICAgICAgICBpZih0b2dnbGUpIHtcbi8vICAgICAgICAgICAgICAgICB0b2dnbGUuZm9jdXMoKTtcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgdmlkZW8ucXVlcnlTZWxlY3RvcignW3RhYmluZGV4PVwiMFwiXScpLmZvY3VzKCk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgfVxuLy8gfSk7XG4vL1xuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFZpZGVvQnVuZGxlLm9uUmVhZHkpO1xuLy9cbi8vIGV4cG9ydCBkZWZhdWx0IFZpZGVvQnVuZGxlO1xuIiwiaW1wb3J0IGFsZXJ0aWZ5IGZyb20gJ2FsZXJ0aWZ5anMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlbyB7XG4gICAgc3RhdGljIHByaXZhY3lLZXkgPSAnaHVoX3ZpZGVvX3ByaXZhY3knO1xuICAgIHN0YXRpYyBzdG9yZURlY2lzaW9uRmllbGROYW1lID0gJ3ZpZGVvLXNhdmUtcHJpdmFjeSc7XG5cbiAgICAvKiogQHR5cGUge0RPTVN0cmluZ01hcH0gKi9cbiAgICBjb25maWd1cmF0aW9uO1xuICAgIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR8bnVsbH0gKi9cbiAgICBwcmV2aWV3SW1hZ2VFbGVtZW50O1xuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICBwcml2YWN5Tm90aWNlO1xuICAgIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR8bnVsbH0gKi9cbiAgICB2aWRlb0NvbnRhaW5lckVsZW1lbnQ7XG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudHxudWxsfSAqL1xuICAgIHdyYXBwZXJFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB3cmFwcGVyRWxlbWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdyYXBwZXJFbGVtZW50KSB7XG4gICAgICAgIHRoaXMud3JhcHBlckVsZW1lbnQgPSB3cmFwcGVyRWxlbWVudDtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0XG4gICAgICAgIHRoaXMucHJpdmFjeU5vdGljZSA9ICgncHJpdmFjeU5vdGljZScgaW4gdGhpcy5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50ID0gdGhpcy53cmFwcGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlciAudmlkZW8tdGh1bWJuYWlsJyk7XG4gICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50ID0gdGhpcy53cmFwcGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlciAudmlkZW8tY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMubGVnYWN5UHJpdmFjeUNoZWNrKCk7XG5cbiAgICAgICAgdGhpcy5hcHBseVByaXZhY3lTZXR0aW5nKCk7XG4gICAgfVxuXG4gICAgYXBwbHlQcml2YWN5U2V0dGluZygpIHtcbiAgICAgICAgLy8gYWx3YXlzIHNob3cgdmlkZW8gaWYgcHJpdmFjeSBpcyBub3QgYWN0aXZhdGVkXG4gICAgICAgIGlmICghdGhpcy5wcml2YWN5Tm90aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dWaWRlbygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hvdyB2aWRlbyBmb3IgbG9jYWwgdmlkZW8gZmlsZXNcbiAgICAgICAgaWYgKHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgaHRtbFZpZGVvRWxlbWVudCA9IHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHZpZGVvJyk7XG4gICAgICAgICAgICBpZiAoaHRtbFZpZGVvRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hvdyB2aWRlbyBpZiBhbGxvd3MgYmVmb3JlIGJ5IHVzZXJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFZpZGVvLnByaXZhY3lLZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dWaWRlbygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcml2YWN5RGlhbG9nKCk7XG4gICAgfVxuXG4gICAgcHJpdmFjeURpYWxvZygpIHtcbiAgICAgICAgbGV0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuICAgICAgICAgICAgbGFiZWxzOiB0aGlzLnByaXZhY3lEaWFsb2dMYWJlbHMoKSxcbiAgICAgICAgICAgIG9uc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbnNob3cnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHRGb2N1c09mZjogdHJ1ZSxcbiAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uYWxlcnRpZnkub25mb2N1cycsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBkaWFsb2dUZW1wbGF0ZSA9IG51bGw7XG4gICAgICAgIGlmICgncHJpdmFjeU1vZGFsQ29udGVudCcgaW4gdGhpcy5jb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICBkaWFsb2dUZW1wbGF0ZSA9IHRoaXMuY29uZmlndXJhdGlvbi5wcml2YWN5TW9kYWxDb250ZW50O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldmlld0ltYWdlRWxlbWVudCAmJiAncHJpdmFjeUh0bWwnIGluIHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICBkaWFsb2dUZW1wbGF0ZSA9IHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5kYXRhc2V0LnByaXZhY3lIdG1sLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQ7XG4gICAgICAgIGlmICghdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy53cmFwcGVyRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4gICAgICAgICAgICBkaWFsb2dUZW1wbGF0ZSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlhbG9nLmVsZW1lbnRzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignW25hbWU9JyArIFZpZGVvLnN0b3JlRGVjaXNpb25GaWVsZE5hbWUgKyAnXScpLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oVmlkZW8ucHJpdmFjeUtleSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5wcml2YWN5LmFjY2VwdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8oKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5wcml2YWN5LmNhbmNlbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmFjeURpYWxvZ0xhYmVscygpIHtcbiAgICAgICAgbGV0IGxhYmVscyA9IHtcbiAgICAgICAgICAgICdvayc6ICdPaycsXG4gICAgICAgICAgICAnY2FuY2VsJzogJ0NhbmNlbCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoJ2J0bkxhYmVsT2snIGluIHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgbGFiZWxzLm9rID0gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0LmJ0bkxhYmVsT2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50ICYmICdidG5Qcml2YWN5T2snIGluIHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLm9rID0gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQuYnRuUHJpdmFjeU9rO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdidG5MYWJlbE9rJyBpbiB0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgIGxhYmVscy5jYW5jZWwgPSB0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXQuYnRuTGFiZWxDYW5jZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50ICYmICdidG5Qcml2YWN5Q2FuY2VsJyBpbiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIGxhYmVscy5jYW5jZWwgPSB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldC5idG5Qcml2YWN5Q2FuY2VsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNob3dWaWRlbygpIHtcbiAgICAgICAgaWYgKCdlbGVtZW50JyBpbiB0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoWyd2aWRlby1jb250YWluZXInXSk7XG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvV3JhcHBlciA9IHRoaXMud3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXdyYXBwZXInKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvV3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpZGVvV3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZWxlbWVudERlc2NyaXB0aW9uID0gSlNPTi5wYXJzZSh0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXQuZWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8qKiBAdmFyIHtFbGVtZW50fSB2aWRlb0VsZW1lbnQgKi9cbiAgICAgICAgICAgIGxldCB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnREZXNjcmlwdGlvbi50eXBlKTtcblxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZWxlbWVudERlc2NyaXB0aW9uLmF0dHJpYnV0ZXMpLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh2aWRlb0VsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlmcmFtZXMgPSB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWUnKTtcbiAgICAgICAgICAgIGlmIChpZnJhbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZnJhbWVzLmZvckVhY2goKGlmcmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZnJhbWUuc3JjID0gaWZyYW1lLmRhdGFzZXQuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9FbGVtZW50cyA9IHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IHZpZGVvJyk7XG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvRWxlbWVudHMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlkZW8taGlkZGVuJyk7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5zdHlsZSA9ICdkaXNwbGF5Om5vbmU7JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB0b2RvIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgKi9cbiAgICBsZWdhY3lQcml2YWN5Q2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5wcml2YWN5Tm90aWNlICYmIHRoaXMucHJldmlld0ltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCdwcml2YWN5JyBpbiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmFjeU5vdGljZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiWW91J3JlIHVzaW5nIGFuIG91dGRhdGVkIHZpZGVvIHRlbXBsYXRlcy4gUGxlYXNlIGFkanVzdCB5b3VyIHRlbXBsYXRlIGFjY29yZGluZyB0byB0aGUgZG9jcy4gU2luY2UgdmVyc2lvbiAxLjIuMFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==