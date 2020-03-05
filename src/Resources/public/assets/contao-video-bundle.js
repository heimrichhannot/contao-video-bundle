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
      });
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
            document.dispatchEvent(new CustomEvent('huh.youtube.event.alertify.onshow', {
              bubbles: true,
              cancelable: true,
              detail: {
                elements: dialog.elements
              }
            }));
          },
          defaultFocusOff: true,
          onfocus: function onfocus() {
            document.dispatchEvent(new CustomEvent('huh.youtube.event.alertify.onfocus', {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2FycmF5LXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2RvbS11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9ldmVudC11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9nZW5lcmFsLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qcyJdLCJuYW1lcyI6WyJ2aWRlb1RodW1ibmFpbFNlbGVjdG9yIiwibG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXkiLCJwcml2YWN5QXV0b0ZpZWxkTmFtZSIsIlZpZGVvQnVuZGxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJnZXRBdHRyaWJ1dGUiLCJpbml0VmlkZW8iLCJFdmVudFV0aWwiLCJhZGREeW5hbWljRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImVsIiwidmlkZW8iLCJwYXJlbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImlmcmFtZSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNob3dWaWRlbyIsImRpYWxvZyIsImFsZXJ0aWZ5IiwiY29uZmlybSIsInNldCIsImxhYmVscyIsIm9rIiwiY2FuY2VsIiwib25zaG93IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJlbGVtZW50cyIsImRlZmF1bHRGb2N1c09mZiIsIm9uZm9jdXMiLCJyZXBsYWNlIiwiY29udGVudCIsImNoZWNrZWQiLCJzZXRJdGVtIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwib25SZWFkeSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FB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RUFBcUMsY0FBckM7QUFDSDtBQUNKOzs7Ozs7QUFFTDFDLFFBQVEsQ0FBQ2UsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDaEIsV0FBVyxDQUFDNEMsT0FBMUQsRSIsImZpbGUiOiJjb250YW8tdmlkZW8tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImNvbnRhby12aWRlby1idW5kbGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idW5kbGVzL2hlaW1yaWNoaGFubm90dmlkZW8vYXNzZXRzL1wiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9SZXNvdXJjZXMvYXNzZXRzL2pzL2NvbnRhby12aWRlby1idW5kbGUuanNcIixcImFsZXJ0aWZ5XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiY2xhc3MgQXJyYXlVdGlsIHtcbiAgICBzdGF0aWMgcmVtb3ZlRnJvbUFycmF5KHZhbHVlLCBhcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsdWUpID09IEpTT04uc3RyaW5naWZ5KGFycmF5W2ldKSkge1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcnJheVV0aWwiLCJpbXBvcnQgQXJyYXlVdGlsIGZyb20gJy4vYXJyYXktdXRpbCc7XG5cbmNsYXNzIERvbVV0aWwge1xuICAgIHN0YXRpYyBnZXRUZXh0V2l0aG91dENoaWxkcmVuKGVsZW1lbnQsIG5vdHJpbSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZWxlbWVudC5jbG9uZSgpO1xuICAgICAgICByZXN1bHQuY2hpbGRyZW4oKS5yZW1vdmUoKTtcblxuICAgICAgICBpZiAodHlwZW9mIG5vdHJpbSAhPT0gJ3VuZGVmaW5lZCcgJiYgbm90cmltID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnRleHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGV4dCgpLnRyaW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzY3JvbGxUbyhlbGVtZW50LCBvZmZzZXQgPSAwLCBkZWxheSA9IDAsIGZvcmNlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAocmVjdC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBvZmZzZXQpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50SW5WaWV3cG9ydChlbGVtZW50KSB8fCBmb3JjZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNTbW9vdGhTY3JvbGxTdXBwb3J0ZWQgPSAnc2Nyb2xsQmVoYXZpb3InIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNTbW9vdGhTY3JvbGxTdXBwb3J0ZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IHNjcm9sbFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JlaGF2aW9yJzogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZWxlbWVudEluVmlld3BvcnQoZWwpIHtcbiAgICAgICAgbGV0IHRvcCA9IGVsLm9mZnNldFRvcDtcbiAgICAgICAgbGV0IGxlZnQgPSBlbC5vZmZzZXRMZWZ0O1xuICAgICAgICBsZXQgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICB3aGlsZSAoZWwub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgIHRvcCArPSBlbC5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZWZ0ICs9IGVsLm9mZnNldExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdG9wIDwgKHdpbmRvdy5wYWdlWU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodCkgJiZcbiAgICAgICAgICAgIGxlZnQgPCAod2luZG93LnBhZ2VYT2Zmc2V0ICsgd2luZG93LmlubmVyV2lkdGgpICYmXG4gICAgICAgICAgICAodG9wICsgaGVpZ2h0KSA+IHdpbmRvdy5wYWdlWU9mZnNldCAmJlxuICAgICAgICAgICAgKGxlZnQgKyB3aWR0aCkgPiB3aW5kb3cucGFnZVhPZmZzZXRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0QWxsUGFyZW50Tm9kZXMobm9kZSkge1xuICAgICAgICB2YXIgcGFyZW50cyA9IFtdO1xuXG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICBwYXJlbnRzLnVuc2hpZnQobm9kZSk7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50c1tpXSA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJlbnRzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tVXRpbCIsImltcG9ydCBEb21VdGlsIGZyb20gJy4vZG9tLXV0aWwnO1xuaW1wb3J0IEdlbmVyYWxVdGlsIGZyb20gJy4vZ2VuZXJhbC11dGlsJ1xuXG5jbGFzcyBFdmVudFV0aWwge1xuICAgIHN0YXRpYyBhZGREeW5hbWljRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaywgc2NvcGUsIGRpc2FibGVCdWJibGluZykge1xuICAgICAgICBpZiAodHlwZW9mIHNjb3BlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc2NvcGUgPSBkb2N1bWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnRzO1xuXG4gICAgICAgICAgICBpZiAoR2VuZXJhbFV0aWwuaXNUcnV0aHkoZGlzYWJsZUJ1YmJsaW5nKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudHMgPSBbZS50YXJnZXRdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzID0gRG9tVXRpbC5nZXRBbGxQYXJlbnROb2RlcyhlLnRhcmdldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZvciBpbnN0YW5jZSB3aW5kb3cgbG9hZC9yZXNpemUgZXZlbnRcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJlbnRzKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpdGVtLCBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcmVudHMucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaXRlbSwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVFdmVudE9iamVjdCh0eXBlLCBidWJibGVzID0gZmFsc2UsIGNhbmNlbGFibGUgPSBmYWxzZSwgY29tcG9zZWQgPSBmYWxzZSkge1xuICAgICAgICBpZiAodHlwZW9mIChFdmVudCkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXZlbnQodHlwZSwge1xuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IGJ1YmJsZXMsXG4gICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogY2FuY2VsYWJsZSxcbiAgICAgICAgICAgICAgICBjb21wb3NlZDogY29tcG9zZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRVdGlsXG4iLCJjbGFzcyBHZW5lcmFsVXRpbCB7XG4gICAgc3RhdGljIGlzVHJ1dGh5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBjYWxsKGZ1bmMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHZW5lcmFsVXRpbCIsImltcG9ydCBFdmVudFV0aWwgZnJvbSAnQGh1bmRoL2NvbnRhby11dGlscy1idW5kbGUvanMvZXZlbnQtdXRpbCdcbmltcG9ydCBhbGVydGlmeSBmcm9tICdhbGVydGlmeWpzJztcblxuY29uc3QgdmlkZW9UaHVtYm5haWxTZWxlY3RvciA9ICcuaHVoX3ZpZGVvID4gLnZpZGVvLXdyYXBwZXIgPiAudmlkZW8tdGh1bWJuYWlsJztcbmNvbnN0IGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5ID0gJ2h1aF92aWRlb19wcml2YWN5JztcbmNvbnN0IHByaXZhY3lBdXRvRmllbGROYW1lID0gJ3ZpZGVvLXNhdmUtcHJpdmFjeSc7XG5cbmNsYXNzIFZpZGVvQnVuZGxlIHtcbiAgICBzdGF0aWMgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gYXV0b3BsYXkgdmlkZW9zXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmlkZW9UaHVtYm5haWxTZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXknKSkge1xuICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyhpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50XG4gICAgICAgIEV2ZW50VXRpbC5hZGREeW5hbWljRXZlbnRMaXN0ZW5lcignY2xpY2snLCB2aWRlb1RodW1ibmFpbFNlbGVjdG9yLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyh0YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdFZpZGVvKGVsKSB7XG4gICAgICAgIGxldCB2aWRlbyA9IGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnZpZGVvLWNvbnRhaW5lcicpLFxuICAgICAgICAgICAgaWZyYW1lID0gdmlkZW8ucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG5cbiAgICAgICAgLy8gc3RvcCBwbGF5aW5nIHZpZGVvIG9uIGNsb3NpbmcgYW55IG1vZGFsIHdpbmRvd1xuICAgICAgICBFdmVudFV0aWwuYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoJ2NsaWNrJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHN0b3AgcGxheWluZyB2aWRlbyBvbiBjbG9zaW5nIGFueSBib290c3RyYXAgbW9kYWxcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeScpKSB7XG4gICAgICAgICAgICBpZiAobnVsbCAhPT0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4gICAgICAgICAgICAgICAgc2hvd1ZpZGVvKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZGlhbG9nID0gYWxlcnRpZnkuY29uZmlybSgpLnNldCh7XG4gICAgICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIG9rOiBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSAhPT0gbnVsbCA/IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1vaycpIDogJ09LJyAsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbDogZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpICE9PSBudWxsID8gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpIDogJ0NhbmNlbCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgueW91dHViZS5ldmVudC5hbGVydGlmeS5vbnNob3cnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnlvdXR1YmUuZXZlbnQuYWxlcnRpZnkub25mb2N1cycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4gICAgICAgICAgICAgICAgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3ktaHRtbCcpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpYWxvZy5lbGVtZW50cy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPScgKyBwcml2YWN5QXV0b0ZpZWxkTmFtZSArICddJykuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hvd1ZpZGVvKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG5cbiAgICAgICAgc2hvd1ZpZGVvKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2hvd1ZpZGVvKCkge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuICAgICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaW5pdGlhbGl6ZScsICd2aWRlby1oaWRkZW4nKTtcbiAgICAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ2luaXRpYWxpemUnLCAndmlkZW8taGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVmlkZW9CdW5kbGUub25SZWFkeSk7Il0sInNvdXJjZVJvb3QiOiIifQ==