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

/***/ "./src/Resources/assets/js/contao-video-bundle.js":
/*!********************************************************!*\
  !*** ./src/Resources/assets/js/contao-video-bundle.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video */ "./src/Resources/assets/js/video.js");

document.addEventListener('DOMContentLoaded', function () {
  var wrapperElements = document.querySelectorAll('.huh_video');
  wrapperElements.forEach(function (element) {
    return new _video__WEBPACK_IMPORTED_MODULE_0__["default"](element);
  }); // fullsize videos

  document.querySelectorAll('.huh_video.video-link').forEach(function (element) {
    new _video__WEBPACK_IMPORTED_MODULE_0__["default"](element, 'link');
  });
}); // import EventUtil from '@hundh/contao-utils-bundle/js/event-util';
// import alertify from 'alertifyjs';
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

  /** @type {string} */

  /**
   * @param {Element} wrapperElement
   * @param {string } type
   */
  function Video(wrapperElement) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'video';

    _classCallCheck(this, Video);

    _defineProperty(this, "configuration", void 0);

    _defineProperty(this, "previewImageElement", void 0);

    _defineProperty(this, "privacyMode", void 0);

    _defineProperty(this, "videoContainerElement", void 0);

    _defineProperty(this, "wrapperElement", void 0);

    _defineProperty(this, "type", void 0);

    this.wrapperElement = wrapperElement;
    this.type = type;
    this.configuration = this.wrapperElement.dataset;
    this.privacyMode = 'privacyMode' in this.configuration;

    if ('link' === type) {
      this.applyPrivacySettingsToLink();
    }

    this.previewImageElement = this.wrapperElement.querySelector('.video-wrapper .video-thumbnail');
    this.videoContainerElement = this.wrapperElement.querySelector('.video-wrapper .video-container');
    this.legacyPrivacyCheck();
    this.applyPrivacySettingsToVideo();
  }

  _createClass(Video, [{
    key: "applyPrivacySettingsToVideo",
    value: function applyPrivacySettingsToVideo() {
      var _this = this;

      // always show video if privacy is not activated
      if (!this.privacyMode) {
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

      if (this.previewImageElement) {
        this.previewImageElement.addEventListener('click', function () {
          return _this.privacyDialog(_this.previewImageElement, function () {
            return _this.showVideo();
          });
        });
      }
    }
  }, {
    key: "applyPrivacySettingsToLink",
    value: function applyPrivacySettingsToLink() {
      var _this2 = this;

      // legacy support
      // @todo Deprecated, remove in next major version
      if (!this.privacyMode) {
        if ('privacy' in this.configuration) {
          this.privacyMode = true;
          console.warn("You're using an outdated video fullsize template. Please adjust your template according to the docs. Since version 1.2.0");
        }
      }

      this.wrapperElement.addEventListener('click', function (event) {
        event.preventDefault();

        if (_this2.privacyMode) {
          _this2.privacyDialog(_this2.wrapperElement, function (element) {
            return window.open(element.getAttribute('href'));
          });
        }
      });
    }
    /**
     * @param {HTMLElement|null} element
     * @param {function} successCallback
     */

  }, {
    key: "privacyDialog",
    value: function privacyDialog(element, successCallback) {
      var dialog = alertifyjs__WEBPACK_IMPORTED_MODULE_0___default.a.confirm().set({
        labels: this.privacyDialogLabels(),
        onshow: function onshow() {
          document.dispatchEvent(new CustomEvent('huh.video.alertify.onshow', {
            bubbles: true,
            cancelable: true,
            detail: {
              elements: dialog.elements
            }
          })); // @todo deprecated, remove in next major version

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
          document.dispatchEvent(new CustomEvent('huh.video.alertify.onfocus', {
            bubbles: true,
            cancelable: true,
            detail: {
              elements: dialog.elements
            }
          })); // @todo deprecated, remove in next major version

          document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onfocus', {
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

      if (!element) {
        element = this.previewImageElement;

        if (!this.previewImageElement) {
          element = this.wrapperElement;
        }
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
        successCallback(element);
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
            document.dispatchEvent(new CustomEvent('videoInitialized', {
              detail: iframe,
              bubbles: true,
              cancelable: true
            }));
          });
        } else {
          var videoElements = this.videoContainerElement.querySelectorAll(':scope > video');

          if (videoElements.length < 1) {
            return false;
          }

          videoElements.forEach(function (element) {
            document.dispatchEvent(new CustomEvent('videoInitialized', {
              detail: element,
              bubbles: true,
              cancelable: true
            }));
          });
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
      if (!this.privacyMode && this.previewImageElement) {
        if ('privacy' in this.previewImageElement.dataset) {
          this.privacyMode = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy92aWRlby5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwcGVyRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJWaWRlbyIsIndyYXBwZXJFbGVtZW50IiwidHlwZSIsImNvbmZpZ3VyYXRpb24iLCJkYXRhc2V0IiwicHJpdmFjeU1vZGUiLCJhcHBseVByaXZhY3lTZXR0aW5nc1RvTGluayIsInByZXZpZXdJbWFnZUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmlkZW9Db250YWluZXJFbGVtZW50IiwibGVnYWN5UHJpdmFjeUNoZWNrIiwiYXBwbHlQcml2YWN5U2V0dGluZ3NUb1ZpZGVvIiwic2hvd1ZpZGVvIiwiaHRtbFZpZGVvRWxlbWVudCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwcml2YWN5S2V5IiwicHJpdmFjeURpYWxvZyIsImNvbnNvbGUiLCJ3YXJuIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsIm9wZW4iLCJnZXRBdHRyaWJ1dGUiLCJzdWNjZXNzQ2FsbGJhY2siLCJkaWFsb2ciLCJhbGVydGlmeSIsImNvbmZpcm0iLCJzZXQiLCJsYWJlbHMiLCJwcml2YWN5RGlhbG9nTGFiZWxzIiwib25zaG93IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJlbGVtZW50cyIsImRlZmF1bHRGb2N1c09mZiIsIm9uZm9jdXMiLCJkaWFsb2dUZW1wbGF0ZSIsInByaXZhY3lNb2RhbENvbnRlbnQiLCJwcml2YWN5SHRtbCIsInJlcGxhY2UiLCJjb250ZW50Iiwic3RvcmVEZWNpc2lvbkZpZWxkTmFtZSIsImNoZWNrZWQiLCJzZXRJdGVtIiwib2siLCJidG5MYWJlbE9rIiwiYnRuUHJpdmFjeU9rIiwiY2FuY2VsIiwiYnRuTGFiZWxDYW5jZWwiLCJidG5Qcml2YWN5Q2FuY2VsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInZpZGVvV3JhcHBlciIsImFwcGVuZENoaWxkIiwiaW5uZXJIVE1MIiwiZWxlbWVudERlc2NyaXB0aW9uIiwiSlNPTiIsInBhcnNlIiwidmlkZW9FbGVtZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImF0dHJpYnV0ZXMiLCJ2YWx1ZSIsInNldEF0dHJpYnV0ZSIsImlmcmFtZXMiLCJsZW5ndGgiLCJpZnJhbWUiLCJzcmMiLCJ2aWRlb0VsZW1lbnRzIiwicmVtb3ZlIiwic3R5bGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUVBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVO0VBQ3BELElBQUlDLGVBQWUsR0FBR0YsUUFBUSxDQUFDRyxnQkFBVCxDQUEwQixZQUExQixDQUF0QjtFQUNBRCxlQUFlLENBQUNFLE9BQWhCLENBQXdCLFVBQUNDLE9BQUQ7SUFBQSxPQUFhLElBQUlDLDhDQUFKLENBQVVELE9BQVYsQ0FBYjtFQUFBLENBQXhCLEVBRm9ELENBSXBEOztFQUNBTCxRQUFRLENBQUNHLGdCQUFULENBQTBCLHVCQUExQixFQUFtREMsT0FBbkQsQ0FBMkQsVUFBU0MsT0FBVCxFQUFrQjtJQUN6RSxJQUFJQyw4Q0FBSixDQUFVRCxPQUFWLEVBQW1CLE1BQW5CO0VBQ0gsQ0FGRDtBQUdILENBUkQsRSxDQVVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RXRDLE9BQVQ7Y0FBa0JvQyxPQUFPLEVBQUUsSUFBM0I7Y0FBaUNDLFVBQVUsRUFBRTtZQUE3QyxDQUFwQyxDQUF2QjtVQUNILENBRkQ7UUFHSDtNQUNKOztNQUVELEtBQUszQixxQkFBTCxDQUEyQitDLFNBQTNCLENBQXFDbUIsTUFBckMsQ0FBNEMsY0FBNUM7O01BQ0EsSUFBSSxLQUFLcEUsbUJBQVQsRUFBOEI7UUFDMUIsS0FBS0EsbUJBQUwsQ0FBeUJxRSxLQUF6QixHQUFpQyxlQUFqQztNQUNIOztNQUVELE9BQU8sSUFBUDtJQUNIO0lBRUQ7QUFDSjtBQUNBOzs7O1dBQ0ksOEJBQXFCO01BQ2pCLElBQUksQ0FBQyxLQUFLdkUsV0FBTixJQUFxQixLQUFLRSxtQkFBOUIsRUFBbUQ7UUFDL0MsSUFBSSxhQUFhLEtBQUtBLG1CQUFMLENBQXlCSCxPQUExQyxFQUFtRDtVQUMvQyxLQUFLQyxXQUFMLEdBQW1CLElBQW5CO1VBQ0FhLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLGtIQUFiO1FBQ0g7TUFDSjtJQUNKOzs7Ozs7Z0JBeFFnQm5CLEssZ0JBQ0csbUI7O2dCQURIQSxLLDRCQUVlLG9CIiwiZmlsZSI6ImNvbnRhby12aWRlby1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiY29udGFvLXZpZGVvLWJ1bmRsZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1bmRsZXMvaGVpbXJpY2hoYW5ub3R2aWRlby9hc3NldHMvXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qc1wiLFwiYWxlcnRpZnlcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgVmlkZW8gZnJvbSAnLi92aWRlbydcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7XG4gICAgbGV0IHdyYXBwZXJFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5odWhfdmlkZW8nKTtcbiAgICB3cmFwcGVyRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4gbmV3IFZpZGVvKGVsZW1lbnQpKTtcblxuICAgIC8vIGZ1bGxzaXplIHZpZGVvc1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5odWhfdmlkZW8udmlkZW8tbGluaycpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBuZXcgVmlkZW8oZWxlbWVudCwgJ2xpbmsnKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBpbXBvcnQgRXZlbnRVdGlsIGZyb20gJ0BodW5kaC9jb250YW8tdXRpbHMtYnVuZGxlL2pzL2V2ZW50LXV0aWwnO1xuLy8gaW1wb3J0IGFsZXJ0aWZ5IGZyb20gJ2FsZXJ0aWZ5anMnO1xuXG4vLyBjb25zdCB2aWRlb1RodW1ibmFpbFNlbGVjdG9yID0gJy5odWhfdmlkZW8gPiAudmlkZW8td3JhcHBlciA+IC52aWRlby10aHVtYm5haWwnO1xuLy8gY29uc3QgaHRtbFZpZGVvU2VsZWN0b3IgPSAnLmh1aF92aWRlbyA+IC52aWRlby13cmFwcGVyID4gLnZpZGVvLWNvbnRhaW5lcic7XG4vLyBjb25zdCBsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSA9ICdodWhfdmlkZW9fcHJpdmFjeSc7XG4vLyBjb25zdCBwcml2YWN5QXV0b0ZpZWxkTmFtZSA9ICd2aWRlby1zYXZlLXByaXZhY3knO1xuLy9cbi8vIGNsYXNzIFZpZGVvQnVuZGxlIHtcbi8vICAgICBzdGF0aWMgb25SZWFkeSgpIHtcbi8vXG4vLyAgICAgICAgIC8vIGF1dG9wbGF5IHZpZGVvc1xuLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZpZGVvVGh1bWJuYWlsU2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuLy8gICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWF1dG9wbGF5JykpIHtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8oaXRlbSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChodG1sVmlkZW9TZWxlY3RvcikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFZpZGVvKGl0ZW0pO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudFxuLy8gICAgICAgICBFdmVudFV0aWwuYWRkRHluYW1pY0V2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdmlkZW9UaHVtYm5haWxTZWxlY3RvciwgZnVuY3Rpb24odGFyZ2V0KSB7XG4vLyAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8odGFyZ2V0KTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRcbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlby52aWRlby1saW5rJykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG4vLyAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbi8vICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuLy9cbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0UHJpdmFjeShldmVudC50YXJnZXQpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFRvZ2dsZVZpZGVvKCk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdFByaXZhY3koZWxlbWVudCkge1xuLy8gICAgICAgICBpZiAoJ3ByaXZhY3knIGluIGVsZW1lbnQuZGF0YXNldCkge1xuLy8gICAgICAgICAgICAgaWYgKG51bGwgIT09IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5KSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGxhYmVsczoge1xuLy8gICAgICAgICAgICAgICAgICAgICBvazogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSAhPT0gbnVsbCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgOiAnT0snLFxuLy8gICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgOiAnQ2FuY2VsJ1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgb25zaG93OiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbnNob3cnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4vLyAgICAgICAgICAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeS1odG1sJykucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLFxuLy8gICAgICAgICAgICAgICAgICgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGRpYWxvZy5lbGVtZW50cy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPScgKyBwcml2YWN5QXV0b0ZpZWxkTmFtZSArICddJykuY2hlY2tlZCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXksIHRydWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5wcml2YWN5LmFjY2VwdCcsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLmhyZWYgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5wcml2YWN5LmNhbmNlbCcsIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0VmlkZW8oZWxlbWVudCkge1xuLy8gICAgICAgICBsZXQgY29udGFpbmVyID0gZWxlbWVudC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1jb250YWluZXInKSxcbi8vICAgICAgICAgICAgIGlmcmFtZXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJyksXG4vLyAgICAgICAgICAgICBodG1sVmlkZW8gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbi8vXG4vLyAgICAgICAgIGlmIChpZnJhbWVzICYmIChpZnJhbWVzLmxlbmd0aCA+IDApKSB7XG4vLyAgICAgICAgICAgICBpZnJhbWVzLmZvckVhY2goaWZyYW1lID0+IHtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5pbml0SWZyYW1lVmlkZW8oZWxlbWVudCwgaWZyYW1lKTtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5zaG93VmlkZW8oZWxlbWVudCwgaWZyYW1lKTtcbi8vICAgICAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGh0bWxWaWRlbykge1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdEh0bWxWaWRlbyhlbGVtZW50LCBodG1sVmlkZW8pO1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuc2hvd1ZpZGVvKGVsZW1lbnQsIGh0bWxWaWRlbyk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBzaG93VmlkZW8oZWxlbWVudCwgdmlkZW8pIHtcbi8vICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLWNvbnRhaW5lcicpO1xuLy9cbi8vICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuLy8gICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvLWhpZGRlbicpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luaXRpYWxpemUnKTtcbi8vICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LmFkZCgnaW5pdGlhbGl6ZScpO1xuLy9cbi8vICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbml0aWFsaXplJyk7XG4vLyAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlkZW8taGlkZGVuJyk7XG4vL1xuLy8gICAgICAgICB2aWRlby5jbGFzc0xpc3QucmVtb3ZlKCdpbml0aWFsaXplJyk7XG4vLyAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvLWhpZGRlbicpO1xuLy9cbi8vICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3ZpZGVvSW5pdGlhbGl6ZWQnLCB7ZGV0YWlsOiB2aWRlbywgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZX0pKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0SWZyYW1lVmlkZW8oZWxlbWVudCwgaWZyYW1lKSB7XG4vLyAgICAgICAgIC8vIHN0b3AgcGxheWluZyB2aWRlbyBvbiBjbG9zaW5nIGFueSBtb2RhbCB3aW5kb3dcbi8vICAgICAgICAgRXZlbnRVdGlsLmFkZER5bmFtaWNFdmVudExpc3RlbmVyKCdjbGljaycsICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLCBmdW5jdGlvbih0YXJnZXQpIHtcbi8vICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vIHN0b3AgcGxheWluZyB2aWRlbyBvbiBjbG9zaW5nIGFueSBib290c3RyYXAgbW9kYWxcbi8vICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSkge1xuLy8gICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgLy8gaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSk7XG4vL1xuLy8gICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeScpKSB7XG4vL1xuLy8gICAgICAgICAgICAgaWYgKG51bGwgIT09IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5KSkge1xuLy8gICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy8gICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLnNob3dWaWRlbyhlbGVtZW50LCBpZnJhbWUpO1xuLy9cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgbGV0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGxhYmVsczoge1xuLy8gICAgICAgICAgICAgICAgICAgICBvazogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktb2snKSAhPT0gbnVsbCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgOiAnT0snLFxuLy8gICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpICE9PSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnRuLXByaXZhY3ktY2FuY2VsJykgOiAnQ2FuY2VsJ1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgb25zaG93OiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5ldmVudC5hbGVydGlmeS5vbnNob3cnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIG9uZm9jdXM6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmV2ZW50LmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIGFsZXJ0aWZ5LmNvbmZpcm0oJyZuYnNwOycsXG4vLyAgICAgICAgICAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpdmFjeS1odG1sJykucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLFxuLy8gICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoZGlhbG9nLmVsZW1lbnRzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignW25hbWU9JyArIHByaXZhY3lBdXRvRmllbGROYW1lICsgJ10nKS5jaGVja2VkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSwgdHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuc2hvd1ZpZGVvKGVsZW1lbnQsIGlmcmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIHN0YXRpYyBpbml0SHRtbFZpZGVvKGVsZW1lbnQsIHZpZGVvKSB7XG4vLyAgICAgICAgIGxldCB3cmFwcGVyID0gZWxlbWVudC5jbG9zZXN0KCcudmlkZW8td3JhcHBlcicpO1xuLy8gICAgICAgICBsZXQgYnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheS1idXR0b24nKTtcbi8vICAgICAgICAgaWYgKGJ1dHRvbikge1xuLy8gICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuLy8gICAgICAgICAgICAgICAgIGlmICghdmlkZW8uaGFzQXR0cmlidXRlKFwiY29udHJvbHNcIikpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiY29udHJvbHNcIiwgXCJjb250cm9sc1wiKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGUgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBlID0+IHtcbi8vICAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdFRvZ2dsZVZpZGVvKCkge1xuLy9cbi8vICAgICAgICAgbGV0IHZpZGVvQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZV9odWhfdmlkZW8gLmh1aF92aWRlbycpO1xuLy8gICAgICAgICBjb25zdCBpbml0U3RhdGVzID0gW3RydWUsIHRydWVdO1xuLy9cbi8vICAgICAgICAgdmlkZW9Db250YWluZXJzICYmIHZpZGVvQ29udGFpbmVycy5mb3JFYWNoKGN0biA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgbGV0IHRvZ2dsZUJ1dHRvbnMgPSBjdG4ucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlbyAudmlkZW8tdG9nZ2xlLWN0biBidXR0b24nKTtcbi8vICAgICAgICAgICAgIGxldCBsaXZlUmVnaW9uID0gY3RuLnF1ZXJ5U2VsZWN0b3IoJyN2aWRlb1RvZ2dsZUxpdmVSZWdpb25PdXRwdXQnKTtcbi8vXG4vLyAgICAgICAgICAgICBjb25zdCB0b2dnbGVWaWRlbyA9IChpbmRleCwgd2l0aExpdmVSZWdpb24gPSBmYWxzZSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGxldCBzdGF0ZXMgPSBpbml0U3RhdGVzLnNsaWNlKDApO1xuLy8gICAgICAgICAgICAgICAgIHN0YXRlc1tpbmRleF0gPSBmYWxzZTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZUJ1dHRvbnMubGVuZ3RoID4gMCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZm9yRWFjaCgoc3RhdGUsIGkpID0+IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9DdG4gPSBjdG4ucXVlcnlTZWxlY3RvcignIycgKyB0b2dnbGVCdXR0b25zW2ldLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ2J0bi12aWRlby1zaG93Jyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9DdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIGlmcmFtZVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZnJhbWUgPSB2aWRlb0N0bi5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpZnJhbWUgIT09IG51bGwpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgaWZyYW1lLnNyYyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQnV0dG9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tdmlkZW8tc2hvdycpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvQ3RuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgfSlcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gaG93IHRvIGxvY2FsaXplIHRoaXNcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHdpdGhMaXZlUmVnaW9uKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluZGV4KSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZVJlZ2lvbi50ZXh0Q29udGVudCA9IFwiQXVkaW9kZXNrcmlwdGlvbiBzdGVodCBpbSBmb2xnZW5kZW4gVmlkZW8genVyIFZlcmbDvGd1bmdcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZVJlZ2lvbi50ZXh0Q29udGVudCA9IFwiQXVkaW9kZXNrcmlwdGlvbiBzdGVodCBpbSBmb2xnZW5kZW4gVmlkZW8gbmljaHQgbWVociB6dXIgVmVyZsO8Z3VuZ1wiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGlmICh0b2dnbGVCdXR0b25zLmxlbmd0aCA+IDApIHtcbi8vICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWwgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlVmlkZW8oaW5kZXgsIHRydWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICAgICAgICAgIHRvZ2dsZVZpZGVvKDEpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuLy9cbi8vXG4vLyAgICAgfVxuLy8gfVxuLy9cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FmdGVyVW5sb2NrUHJvdGVjdGVkQ29kZScsIChlKSA9PiB7XG4vLyAgICAgLy8gcHJpdmFjeSBjZW50ZXIgLT4gc2tpcCB0aGUgcHJldmlldyBpbWFnZSBvbiBmaXJzdCB1bmxvY2ssIGkuZS4sIGlmIHRoZSB1bmxvY2tpbmcgaGFzIGJlZW4gZG9uZSBieSBhIGNsaWNrXG4vLyAgICAgbGV0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaWRlbnRpZmllcj1cIicgKyBlLmRldGFpbC5pZGVudGlmaWVyICsgJ1wiXSAuaHVoX3ZpZGVvJyk7XG4vLyAgICAgaWYgKHZpZGVvICE9PSBudWxsKSB7XG4vLyAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyh2aWRlbyk7XG4vLyAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRUb2dnbGVWaWRlbygpO1xuLy9cbi8vICAgICAgICAgaWYoZS5kZXRhaWwudW5sb2NrQnlDbGljaykge1xuLy8gICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJy52aWRlby10b2dnbGUtY3RuIGJ1dHRvbicpO1xuLy8gICAgICAgICAgICAgaWYodG9nZ2xlKSB7XG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlLmZvY3VzKCk7XG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIHZpZGVvLnF1ZXJ5U2VsZWN0b3IoJ1t0YWJpbmRleD1cIjBcIl0nKS5mb2N1cygpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vL1xuLy8gICAgIH1cbi8vIH0pO1xuLy9cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBWaWRlb0J1bmRsZS5vblJlYWR5KTtcbi8vXG4vLyBleHBvcnQgZGVmYXVsdCBWaWRlb0J1bmRsZTtcbiIsImltcG9ydCBhbGVydGlmeSBmcm9tICdhbGVydGlmeWpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW8ge1xuICAgIHN0YXRpYyBwcml2YWN5S2V5ID0gJ2h1aF92aWRlb19wcml2YWN5JztcbiAgICBzdGF0aWMgc3RvcmVEZWNpc2lvbkZpZWxkTmFtZSA9ICd2aWRlby1zYXZlLXByaXZhY3knO1xuXG4gICAgLyoqIEB0eXBlIHtET01TdHJpbmdNYXB9ICovXG4gICAgY29uZmlndXJhdGlvbjtcbiAgICAvKiogQHR5cGUge0hUTUxFbGVtZW50fG51bGx9ICovXG4gICAgcHJldmlld0ltYWdlRWxlbWVudDtcbiAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgcHJpdmFjeU1vZGU7XG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudHxudWxsfSAqL1xuICAgIHZpZGVvQ29udGFpbmVyRWxlbWVudDtcbiAgICAvKiogQHR5cGUge0hUTUxFbGVtZW50fG51bGx9ICovXG4gICAgd3JhcHBlckVsZW1lbnQ7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gd3JhcHBlckVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB9IHR5cGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3cmFwcGVyRWxlbWVudCwgdHlwZSA9ICd2aWRlbycpIHtcbiAgICAgICAgdGhpcy53cmFwcGVyRWxlbWVudCA9IHdyYXBwZXJFbGVtZW50O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSB0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXRcbiAgICAgICAgdGhpcy5wcml2YWN5TW9kZSA9ICgncHJpdmFjeU1vZGUnIGluIHRoaXMuY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgaWYgKCdsaW5rJyA9PT0gdHlwZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseVByaXZhY3lTZXR0aW5nc1RvTGluaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50ID0gdGhpcy53cmFwcGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlciAudmlkZW8tdGh1bWJuYWlsJyk7XG4gICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50ID0gdGhpcy53cmFwcGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlciAudmlkZW8tY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMubGVnYWN5UHJpdmFjeUNoZWNrKCk7XG5cbiAgICAgICAgdGhpcy5hcHBseVByaXZhY3lTZXR0aW5nc1RvVmlkZW8oKTtcbiAgICB9XG5cbiAgICBhcHBseVByaXZhY3lTZXR0aW5nc1RvVmlkZW8oKSB7XG4gICAgICAgIC8vIGFsd2F5cyBzaG93IHZpZGVvIGlmIHByaXZhY3kgaXMgbm90IGFjdGl2YXRlZFxuICAgICAgICBpZiAoIXRoaXMucHJpdmFjeU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IHZpZGVvIGZvciBsb2NhbCB2aWRlbyBmaWxlc1xuICAgICAgICBpZiAodGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBodG1sVmlkZW9FbGVtZW50ID0gdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQucXVlcnlTZWxlY3RvcignOnNjb3BlID4gdmlkZW8nKTtcbiAgICAgICAgICAgIGlmIChodG1sVmlkZW9FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IHZpZGVvIGlmIGFsbG93cyBiZWZvcmUgYnkgdXNlclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oVmlkZW8ucHJpdmFjeUtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMucHJpdmFjeURpYWxvZyh0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQsICgpID0+IHRoaXMuc2hvd1ZpZGVvKCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlQcml2YWN5U2V0dGluZ3NUb0xpbmsoKVxuICAgIHtcbiAgICAgICAgLy8gbGVnYWN5IHN1cHBvcnRcbiAgICAgICAgLy8gQHRvZG8gRGVwcmVjYXRlZCwgcmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvblxuICAgICAgICBpZiAoIXRoaXMucHJpdmFjeU1vZGUpIHtcbiAgICAgICAgICAgIGlmICgncHJpdmFjeScgaW4gdGhpcy5jb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcml2YWN5TW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiWW91J3JlIHVzaW5nIGFuIG91dGRhdGVkIHZpZGVvIGZ1bGxzaXplIHRlbXBsYXRlLiBQbGVhc2UgYWRqdXN0IHlvdXIgdGVtcGxhdGUgYWNjb3JkaW5nIHRvIHRoZSBkb2NzLiBTaW5jZSB2ZXJzaW9uIDEuMi4wXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwcGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByaXZhY3lNb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcml2YWN5RGlhbG9nKHRoaXMud3JhcHBlckVsZW1lbnQsIChlbGVtZW50KSA9PiB3aW5kb3cub3BlbihlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxudWxsfSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gc3VjY2Vzc0NhbGxiYWNrXG4gICAgICovXG4gICAgcHJpdmFjeURpYWxvZyhlbGVtZW50LCBzdWNjZXNzQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGRpYWxvZyA9IGFsZXJ0aWZ5LmNvbmZpcm0oKS5zZXQoe1xuICAgICAgICAgICAgbGFiZWxzOiB0aGlzLnByaXZhY3lEaWFsb2dMYWJlbHMoKSxcbiAgICAgICAgICAgIG9uc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbnNob3cnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIC8vIEB0b2RvIGRlcHJlY2F0ZWQsIHJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmV2ZW50LmFsZXJ0aWZ5Lm9uc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdEZvY3VzT2ZmOiB0cnVlLFxuICAgICAgICAgICAgb25mb2N1czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbmZvY3VzJywge1xuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyBkZXByZWNhdGVkLCByZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5ldmVudC5hbGVydGlmeS5vbmZvY3VzJywge1xuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGRpYWxvZ1RlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgaWYgKCdwcml2YWN5TW9kYWxDb250ZW50JyBpbiB0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIGRpYWxvZ1RlbXBsYXRlID0gdGhpcy5jb25maWd1cmF0aW9uLnByaXZhY3lNb2RhbENvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50ICYmICdwcml2YWN5SHRtbCcgaW4gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgIGRpYWxvZ1RlbXBsYXRlID0gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQucHJpdmFjeUh0bWwucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMucHJldmlld0ltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLndyYXBwZXJFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWxlcnRpZnkuY29uZmlybSgnJm5ic3A7JyxcbiAgICAgICAgICAgIGRpYWxvZ1RlbXBsYXRlLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaWFsb2cuZWxlbWVudHMuY29udGVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT0nICsgVmlkZW8uc3RvcmVEZWNpc2lvbkZpZWxkTmFtZSArICddJykuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShWaWRlby5wcml2YWN5S2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLnByaXZhY3kuYWNjZXB0Jywge1xuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soZWxlbWVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLnByaXZhY3kuY2FuY2VsJywge1xuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YWN5RGlhbG9nTGFiZWxzKCkge1xuICAgICAgICBsZXQgbGFiZWxzID0ge1xuICAgICAgICAgICAgJ29rJzogJ09rJyxcbiAgICAgICAgICAgICdjYW5jZWwnOiAnQ2FuY2VsJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgnYnRuTGFiZWxPaycgaW4gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICBsYWJlbHMub2sgPSB0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXQuYnRuTGFiZWxPaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQgJiYgJ2J0blByaXZhY3lPaycgaW4gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMub2sgPSB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldC5idG5Qcml2YWN5T2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ2J0bkxhYmVsT2snIGluIHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgbGFiZWxzLmNhbmNlbCA9IHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldC5idG5MYWJlbENhbmNlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQgJiYgJ2J0blByaXZhY3lDYW5jZWwnIGluIHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLmNhbmNlbCA9IHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5kYXRhc2V0LmJ0blByaXZhY3lDYW5jZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGFiZWxzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgc2hvd1ZpZGVvKCkge1xuICAgICAgICBpZiAoJ2VsZW1lbnQnIGluIHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChbJ3ZpZGVvLWNvbnRhaW5lciddKTtcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9XcmFwcGVyID0gdGhpcy53cmFwcGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8td3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW9XcmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmlkZW9XcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBlbGVtZW50RGVzY3JpcHRpb24gPSBKU09OLnBhcnNlKHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldC5lbGVtZW50KTtcblxuICAgICAgICAgICAgLyoqIEB2YXIge0VsZW1lbnR9IHZpZGVvRWxlbWVudCAqL1xuICAgICAgICAgICAgbGV0IHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudERlc2NyaXB0aW9uLnR5cGUpO1xuXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhlbGVtZW50RGVzY3JpcHRpb24uYXR0cmlidXRlcykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHZpZGVvRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaWZyYW1lcyA9IHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpO1xuICAgICAgICAgICAgaWYgKGlmcmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmcmFtZXMuZm9yRWFjaCgoaWZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zcmMgPSBpZnJhbWUuZGF0YXNldC5zcmM7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd2aWRlb0luaXRpYWxpemVkJywge2RldGFpbDogaWZyYW1lLCBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9FbGVtZW50cyA9IHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IHZpZGVvJyk7XG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvRWxlbWVudHMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpZGVvRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgndmlkZW9Jbml0aWFsaXplZCcsIHtkZXRhaWw6IGVsZW1lbnQsIGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWV9KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd2aWRlby1oaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMucHJldmlld0ltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LnN0eWxlID0gJ2Rpc3BsYXk6bm9uZTsnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHRvZG8gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvblxuICAgICAqL1xuICAgIGxlZ2FjeVByaXZhY3lDaGVjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByaXZhY3lNb2RlICYmIHRoaXMucHJldmlld0ltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCdwcml2YWN5JyBpbiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmFjeU1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIllvdSdyZSB1c2luZyBhbiBvdXRkYXRlZCB2aWRlbyB0ZW1wbGF0ZXMuIFBsZWFzZSBhZGp1c3QgeW91ciB0ZW1wbGF0ZSBhY2NvcmRpbmcgdG8gdGhlIGRvY3MuIFNpbmNlIHZlcnNpb24gMS4yLjBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufSJdLCJzb3VyY2VSb290IjoiIn0=