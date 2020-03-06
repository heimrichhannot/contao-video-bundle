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
class ArrayUtil {
    static removeFromArray(value, array) {
        for (var i = 0; i < array.length; i++) {
            if (JSON.stringify(value) == JSON.stringify(array[i])) {
                array.splice(i, 1);
            }
        }
        return array;
    }
}

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


class DomUtil {
    static getTextWithoutChildren(element, notrim) {
        let result = element.clone();
        result.children().remove();

        if (typeof notrim !== 'undefined' && notrim === true) {
            return result.text();
        } else {
            return result.text().trim();
        }
    }

    static scrollTo(element, offset = 0, delay = 0, force = false) {
        let rect = element.getBoundingClientRect();
        let scrollPosition = (rect.top + window.pageYOffset - offset);
        setTimeout(() => {
            if (!this.elementInViewport(element) || force === true)
            {
                var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
                if (isSmoothScrollSupported)
                {
                    window.scrollTo({
                        'top': scrollPosition,
                        'behavior': 'smooth',
                    });
                }
                else {
                    window.scrollTo(0, scrollPosition);
                }
            }
        }, delay);
    }

    static elementInViewport(el) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        let height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    static getAllParentNodes(node) {
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
}

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



class EventUtil {
    static addDynamicEventListener(eventName, selector, callback, scope, disableBubbling) {
        if (typeof scope === 'undefined') {
            scope = document;
        }

        scope.addEventListener(eventName, function(e) {

            let parents;

            if (_general_util__WEBPACK_IMPORTED_MODULE_1__["default"].isTruthy(disableBubbling)) {
                parents = [e.target];
            } else if (e.target !== document) {
                parents = _dom_util__WEBPACK_IMPORTED_MODULE_0__["default"].getAllParentNodes(e.target);
            }

            // for instance window load/resize event
            if (!Array.isArray(parents)) {
                document.querySelectorAll(selector).forEach(function(item) {
                    callback(item, e);
                });
                return;
            }

            parents.reverse().forEach(function(item) {
                if (item && item.matches(selector)) {
                    callback(item, e);
                }
            });
        });
    }

    static createEventObject(type, bubbles = false, cancelable = false, composed = false) {
        if (typeof (Event) === 'function') {
            return new Event(type, {
                bubbles: bubbles,
                cancelable: cancelable,
                composed: composed
            });
        } else {
            let event = document.createEvent('Event');
            event.initEvent(type, bubbles, cancelable);

            return event;
        }
    }
}

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
class GeneralUtil {
    static isTruthy(value) {
        return typeof value !== 'undefined' && value !== null;
    }

    static call(func) {
        if (typeof func === 'function') {
            func.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}

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
/* harmony import */ var _hundh_contao_utils_bundle_js_event_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hundh/contao-utils-bundle/js/event-util */ "./node_modules/@hundh/contao-utils-bundle/js/event-util.js");
/* harmony import */ var alertifyjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alertifyjs */ "./node_modules/alertifyjs/build/alertify.js");
/* harmony import */ var alertifyjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alertifyjs__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var videoThumbnailSelector = '.huh_video > .video-wrapper > .video-thumbnail';
var localeStorageAcceptPrivacyKey = 'huh_video_privacy';
var privacyAutoFieldName = 'video-save-privacy';

var VideoBundle = /*#__PURE__*/function () {
  function VideoBundle() {
    _classCallCheck(this, VideoBundle);
  }

  _createClass(VideoBundle, null, [{
    key: "onReady",
    value: function onReady() {
      // autoplay videos
      document.querySelectorAll(videoThumbnailSelector).forEach(function (item) {
        if (item.getAttribute('data-autoplay')) {
          VideoBundle.initVideo(item);
        }
      }); // handle click event

      _hundh_contao_utils_bundle_js_event_util__WEBPACK_IMPORTED_MODULE_0__["default"].addDynamicEventListener('click', videoThumbnailSelector, function (target) {
        VideoBundle.initVideo(target);
      }); // handle click event

      _hundh_contao_utils_bundle_js_event_util__WEBPACK_IMPORTED_MODULE_0__["default"].addDynamicEventListener('click', videoThumbnailSelector, function (target) {
        VideoBundle.initVideo(target);
      }); // handle click event

      document.querySelectorAll('.huh_video.video-link').forEach(function (element) {
        element.addEventListener('click', function (event) {
          event.preventDefault();
          VideoBundle.initPrivacy(event.target);
        });
      });
    }
  }, {
    key: "initPrivacy",
    value: function initPrivacy(element) {
      if ('privacy' in element.dataset) {
        if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
          return true;
        }

        var dialog = alertifyjs__WEBPACK_IMPORTED_MODULE_1___default.a.confirm().set({
          labels: {
            ok: element.getAttribute('data-btn-privacy-ok') !== null ? element.getAttribute('data-btn-privacy-ok') : 'OK',
            cancel: element.getAttribute('data-btn-privacy-cancel') !== null ? element.getAttribute('data-btn-privacy-cancel') : 'Cancel'
          },
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
        alertifyjs__WEBPACK_IMPORTED_MODULE_1___default.a.confirm('&nbsp;', element.getAttribute('data-privacy-html').replace(/\\"/g, '"'), function () {
          if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
            localStorage.setItem(localeStorageAcceptPrivacyKey, true);
          }

          element.dispatchEvent(new CustomEvent('huh.video.privacy.accept', {
            bubbles: true,
            cancelable: true,
            detail: {
              elements: dialog.elements
            }
          })); // location.href = element.getAttribute('href');
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
    }
  }, {
    key: "initVideo",
    value: function initVideo(el) {
      var video = el.parentNode.querySelector('.video-container'),
          iframe = video.querySelector('iframe'); // stop playing video on closing any modal window

      _hundh_contao_utils_bundle_js_event_util__WEBPACK_IMPORTED_MODULE_0__["default"].addDynamicEventListener('click', '[data-dismiss="modal"]', function (target) {
        iframe.setAttribute('src', iframe.getAttribute('data-src'));
      }); // stop playing video on closing any bootstrap modal

      document.addEventListener('hidden.bs.modal', function (e) {
        iframe.setAttribute('src', iframe.getAttribute('data-src'));
      });

      if (el.getAttribute('data-privacy')) {
        if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
          iframe.setAttribute('src', iframe.getAttribute('data-src'));
          showVideo();
          return false;
        }

        var dialog = alertifyjs__WEBPACK_IMPORTED_MODULE_1___default.a.confirm().set({
          labels: {
            ok: el.getAttribute('data-btn-privacy-ok') !== null ? el.getAttribute('data-btn-privacy-ok') : 'OK',
            cancel: el.getAttribute('data-btn-privacy-cancel') !== null ? el.getAttribute('data-btn-privacy-cancel') : 'Cancel'
          },
          onshow: function onshow() {
            document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onshow', {
              bubbles: true,
              cancelable: true,
              detail: {
                elements: dialog.elements
              }
            }));
          },
          defaultFocusOff: true,
          onfocus: function onfocus() {
            document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onfocus', {
              bubbles: true,
              cancelable: true,
              detail: {
                elements: dialog.elements
              }
            }));
          }
        });
        alertifyjs__WEBPACK_IMPORTED_MODULE_1___default.a.confirm('&nbsp;', el.getAttribute('data-privacy-html').replace(/\\"/g, '"'), function () {
          if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
            localStorage.setItem(localeStorageAcceptPrivacyKey, true);
          }

          iframe.setAttribute('src', iframe.getAttribute('data-src'));
          showVideo();
        }, function () {});
        return false;
      }

      iframe.setAttribute('src', iframe.getAttribute('data-src'));
      showVideo();

      function showVideo() {
        el.classList.add('initialize');
        video.classList.add('initialize');
        el.classList.remove('initialize', 'video-hidden');
        video.classList.remove('initialize', 'video-hidden');
      }
    }
  }]);

  return VideoBundle;
}();

document.addEventListener('DOMContentLoaded', VideoBundle.onReady);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2FycmF5LXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2RvbS11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9ldmVudC11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9nZW5lcmFsLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qcyJdLCJuYW1lcyI6WyJ2aWRlb1RodW1ibmFpbFNlbGVjdG9yIiwibG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXkiLCJwcml2YWN5QXV0b0ZpZWxkTmFtZSIsIlZpZGVvQnVuZGxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJnZXRBdHRyaWJ1dGUiLCJpbml0VmlkZW8iLCJFdmVudFV0aWwiLCJhZGREeW5hbWljRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImluaXRQcml2YWN5IiwiZGF0YXNldCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkaWFsb2ciLCJhbGVydGlmeSIsImNvbmZpcm0iLCJzZXQiLCJsYWJlbHMiLCJvayIsImNhbmNlbCIsIm9uc2hvdyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwiZWxlbWVudHMiLCJkZWZhdWx0Rm9jdXNPZmYiLCJvbmZvY3VzIiwicmVwbGFjZSIsImNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2hlY2tlZCIsInNldEl0ZW0iLCJlbCIsInZpZGVvIiwicGFyZW50Tm9kZSIsImlmcmFtZSIsInNldEF0dHJpYnV0ZSIsImUiLCJzaG93VmlkZW8iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJvblJlYWR5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FB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QW9CLFVBQXBCLENBQTNCO0FBRUF3QyxlQUFTOztBQUVULGVBQVNBLFNBQVQsR0FBcUI7QUFDakJOLFVBQUUsQ0FBQ08sU0FBSCxDQUFhQyxHQUFiLENBQWlCLFlBQWpCO0FBQ0FQLGFBQUssQ0FBQ00sU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0IsWUFBcEI7QUFDQVIsVUFBRSxDQUFDTyxTQUFILENBQWFFLE1BQWIsQ0FBb0IsWUFBcEIsRUFBa0MsY0FBbEM7QUFDQVIsYUFBSyxDQUFDTSxTQUFOLENBQWdCRSxNQUFoQixDQUF1QixZQUF2QixFQUFxQyxjQUFyQztBQUNIO0FBQ0o7Ozs7OztBQUVML0MsUUFBUSxDQUFDVSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENYLFdBQVcsQ0FBQ2lELE9BQTFELEUiLCJmaWxlIjoiY29udGFvLXZpZGVvLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJjb250YW8tdmlkZW8tYnVuZGxlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVuZGxlcy9oZWltcmljaGhhbm5vdHZpZGVvL2Fzc2V0cy9cIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy9jb250YW8tdmlkZW8tYnVuZGxlLmpzXCIsXCJhbGVydGlmeVwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImNsYXNzIEFycmF5VXRpbCB7XG4gICAgc3RhdGljIHJlbW92ZUZyb21BcnJheSh2YWx1ZSwgYXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbHVlKSA9PSBKU09OLnN0cmluZ2lmeShhcnJheVtpXSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXJyYXlVdGlsIiwiaW1wb3J0IEFycmF5VXRpbCBmcm9tICcuL2FycmF5LXV0aWwnO1xuXG5jbGFzcyBEb21VdGlsIHtcbiAgICBzdGF0aWMgZ2V0VGV4dFdpdGhvdXRDaGlsZHJlbihlbGVtZW50LCBub3RyaW0pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGVsZW1lbnQuY2xvbmUoKTtcbiAgICAgICAgcmVzdWx0LmNoaWxkcmVuKCkucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBub3RyaW0gIT09ICd1bmRlZmluZWQnICYmIG5vdHJpbSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50ZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRleHQoKS50cmltKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2Nyb2xsVG8oZWxlbWVudCwgb2Zmc2V0ID0gMCwgZGVsYXkgPSAwLCBmb3JjZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gKHJlY3QudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gb2Zmc2V0KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudEluVmlld3BvcnQoZWxlbWVudCkgfHwgZm9yY2UgPT09IHRydWUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGlzU21vb3RoU2Nyb2xsU3VwcG9ydGVkID0gJ3Njcm9sbEJlaGF2aW9yJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG4gICAgICAgICAgICAgICAgaWYgKGlzU21vb3RoU2Nyb2xsU3VwcG9ydGVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiBzY3JvbGxQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICdiZWhhdmlvcic6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVsZW1lbnRJblZpZXdwb3J0KGVsKSB7XG4gICAgICAgIGxldCB0b3AgPSBlbC5vZmZzZXRUb3A7XG4gICAgICAgIGxldCBsZWZ0ID0gZWwub2Zmc2V0TGVmdDtcbiAgICAgICAgbGV0IHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgd2hpbGUgKGVsLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgICAgICB0b3AgKz0gZWwub2Zmc2V0VG9wO1xuICAgICAgICAgICAgbGVmdCArPSBlbC5vZmZzZXRMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRvcCA8ICh3aW5kb3cucGFnZVlPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQpICYmXG4gICAgICAgICAgICBsZWZ0IDwgKHdpbmRvdy5wYWdlWE9mZnNldCArIHdpbmRvdy5pbm5lcldpZHRoKSAmJlxuICAgICAgICAgICAgKHRvcCArIGhlaWdodCkgPiB3aW5kb3cucGFnZVlPZmZzZXQgJiZcbiAgICAgICAgICAgIChsZWZ0ICsgd2lkdGgpID4gd2luZG93LnBhZ2VYT2Zmc2V0XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEFsbFBhcmVudE5vZGVzKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudHMgPSBbXTtcblxuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgcGFyZW50cy51bnNoaWZ0KG5vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHBhcmVudHNbaV0gPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyZW50cztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvbVV0aWwiLCJpbXBvcnQgRG9tVXRpbCBmcm9tICcuL2RvbS11dGlsJztcbmltcG9ydCBHZW5lcmFsVXRpbCBmcm9tICcuL2dlbmVyYWwtdXRpbCdcblxuY2xhc3MgRXZlbnRVdGlsIHtcbiAgICBzdGF0aWMgYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBzZWxlY3RvciwgY2FsbGJhY2ssIHNjb3BlLCBkaXNhYmxlQnViYmxpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzY29wZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHNjb3BlID0gZG9jdW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50cztcblxuICAgICAgICAgICAgaWYgKEdlbmVyYWxVdGlsLmlzVHJ1dGh5KGRpc2FibGVCdWJibGluZykpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzID0gW2UudGFyZ2V0XTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50cyA9IERvbVV0aWwuZ2V0QWxsUGFyZW50Tm9kZXMoZS50YXJnZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3IgaW5zdGFuY2Ugd2luZG93IGxvYWQvcmVzaXplIGV2ZW50XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFyZW50cykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaXRlbSwgZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJlbnRzLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0sIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRXZlbnRPYmplY3QodHlwZSwgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UsIGNvbXBvc2VkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoRXZlbnQpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV2ZW50KHR5cGUsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiBidWJibGVzLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGNhbmNlbGFibGUsXG4gICAgICAgICAgICAgICAgY29tcG9zZWQ6IGNvbXBvc2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50VXRpbFxuIiwiY2xhc3MgR2VuZXJhbFV0aWwge1xuICAgIHN0YXRpYyBpc1RydXRoeSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2FsbChmdW5jKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhbFV0aWwiLCJpbXBvcnQgRXZlbnRVdGlsIGZyb20gJ0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2V2ZW50LXV0aWwnXG5pbXBvcnQgYWxlcnRpZnkgZnJvbSAnYWxlcnRpZnlqcyc7XG5cbmNvbnN0IHZpZGVvVGh1bWJuYWlsU2VsZWN0b3IgPSAnLmh1aF92aWRlbyA+IC52aWRlby13cmFwcGVyID4gLnZpZGVvLXRodW1ibmFpbCc7XG5jb25zdCBsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSA9ICdodWhfdmlkZW9fcHJpdmFjeSc7XG5jb25zdCBwcml2YWN5QXV0b0ZpZWxkTmFtZSA9ICd2aWRlby1zYXZlLXByaXZhY3knO1xuXG5jbGFzcyBWaWRlb0J1bmRsZSB7XG4gICAgc3RhdGljIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIGF1dG9wbGF5IHZpZGVvc1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZpZGVvVGh1bWJuYWlsU2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWF1dG9wbGF5JykpIHtcbiAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudFxuICAgICAgICBFdmVudFV0aWwuYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmlkZW9UaHVtYm5haWxTZWxlY3RvciwgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8odGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudFxuICAgICAgICBFdmVudFV0aWwuYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmlkZW9UaHVtYm5haWxTZWxlY3RvciwgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8odGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlby52aWRlby1saW5rJykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRQcml2YWN5KGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGluaXRQcml2YWN5KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCdwcml2YWN5JyBpbiBlbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gYWxlcnRpZnkuY29uZmlybSgpLnNldCh7XG4gICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIG9rOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1vaycpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSA6ICdPSycgLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgOiAnQ2FuY2VsJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25zaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbnNob3cnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhbGVydGlmeS5jb25maXJtKCcmbmJzcDsnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3ktaHRtbCcpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWFsb2cuZWxlbWVudHMuY29udGVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT0nICsgcHJpdmFjeUF1dG9GaWVsZE5hbWUgKyAnXScpLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8ucHJpdmFjeS5hY2NlcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5ocmVmID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8ucHJpdmFjeS5jYW5jZWwnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGluaXRWaWRlbyhlbCkge1xuICAgICAgICBsZXQgdmlkZW8gPSBlbC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1jb250YWluZXInKSxcbiAgICAgICAgICAgIGlmcmFtZSA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuXG4gICAgICAgIC8vIHN0b3AgcGxheWluZyB2aWRlbyBvbiBjbG9zaW5nIGFueSBtb2RhbCB3aW5kb3dcbiAgICAgICAgRXZlbnRVdGlsLmFkZER5bmFtaWNFdmVudExpc3RlbmVyKCdjbGljaycsICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzdG9wIHBsYXlpbmcgdmlkZW8gb24gY2xvc2luZyBhbnkgYm9vdHN0cmFwIG1vZGFsXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3knKSkge1xuICAgICAgICAgICAgaWYgKG51bGwgIT09IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgICAgICAgICAgICAgIHNob3dWaWRlbygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuICAgICAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgICAgICBvazogZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgIT09IG51bGwgPyBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSA6ICdPSycgLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1jYW5jZWwnKSAhPT0gbnVsbCA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1jYW5jZWwnKSA6ICdDYW5jZWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbnNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmV2ZW50LmFsZXJ0aWZ5Lm9uc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0Rm9jdXNPZmY6IHRydWUsXG4gICAgICAgICAgICAgICAgb25mb2N1czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uZXZlbnQuYWxlcnRpZnkub25mb2N1cycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4gICAgICAgICAgICAgICAgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3ktaHRtbCcpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpYWxvZy5lbGVtZW50cy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPScgKyBwcml2YWN5QXV0b0ZpZWxkTmFtZSArICddJykuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hvd1ZpZGVvKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cbiAgICAgICAgc2hvd1ZpZGVvKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2hvd1ZpZGVvKCkge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuICAgICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaW5pdGlhbGl6ZScsICd2aWRlby1oaWRkZW4nKTtcbiAgICAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ2luaXRpYWxpemUnLCAndmlkZW8taGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVmlkZW9CdW5kbGUub25SZWFkeSk7Il0sInNvdXJjZVJvb3QiOiIifQ==