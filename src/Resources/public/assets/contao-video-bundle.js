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
      return;
    }

    this.previewImageElement = this.wrapperElement.querySelector('.video-wrapper .video-thumbnail');
    this.videoContainerElement = this.wrapperElement.querySelector('.video-wrapper .video-container');
    this.legacyPrivacyCheck();
    this.applyPrivacySettingsToVideo();

    if ('toggleVideo' in this.configuration) {
      this.videoToggle();
    }
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
  }, {
    key: "videoToggle",
    value: function videoToggle() {
      var _this3 = this;

      var initStates = [true, true];
      var toggleButtons = this.wrapperElement.querySelectorAll('.huh_video .video-toggle-ctn button');
      var liveRegion = this.wrapperElement.querySelector('#videoToggleLiveRegionOutput');

      var toggleVideo = function toggleVideo(index) {
        var withLiveRegion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var states = initStates.slice(0);
        states[index] = false;

        if (toggleButtons.length > 0) {
          states.forEach(function (state, i) {
            var videoCtn = _this3.wrapperElement.querySelector('#' + toggleButtons[i].getAttribute('aria-controls'));

            if (state) {
              toggleButtons[i].classList.add('btn-video-show');
              videoCtn.style.display = 'none'; // Refresh iframe

              var iframe = videoCtn.querySelector('iframe');

              if (iframe !== null) {
                iframe.setAttribute('src', iframe.src);
              }
            } else {
              toggleButtons[i].classList.remove('btn-video-show');
              videoCtn.style.display = 'block';
            }
          }); // TODO how to localize this

          if (withLiveRegion) {
            if (!index) {
              liveRegion.textContent = "Audiodeskription steht im folgenden Video zur Verfügung";
            } else {
              liveRegion.textContent = "Audiodeskription steht im folgenden Video nicht mehr zur Verfügung";
            }
          }
        }
      };

      if (toggleButtons.length > 0) {
        toggleButtons.forEach(function (btn, index) {
          btn.addEventListener('click', function (el) {
            toggleVideo(index, true);
          });
        });
        toggleVideo(1);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Jlc291cmNlcy9hc3NldHMvanMvY29udGFvLXZpZGVvLWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VzL2Fzc2V0cy9qcy92aWRlby5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwcGVyRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJWaWRlbyIsIndyYXBwZXJFbGVtZW50IiwidHlwZSIsImNvbmZpZ3VyYXRpb24iLCJkYXRhc2V0IiwicHJpdmFjeU1vZGUiLCJhcHBseVByaXZhY3lTZXR0aW5nc1RvTGluayIsInByZXZpZXdJbWFnZUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmlkZW9Db250YWluZXJFbGVtZW50IiwibGVnYWN5UHJpdmFjeUNoZWNrIiwiYXBwbHlQcml2YWN5U2V0dGluZ3NUb1ZpZGVvIiwidmlkZW9Ub2dnbGUiLCJzaG93VmlkZW8iLCJodG1sVmlkZW9FbGVtZW50IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInByaXZhY3lLZXkiLCJwcml2YWN5RGlhbG9nIiwiY29uc29sZSIsIndhcm4iLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwid2luZG93Iiwib3BlbiIsImdldEF0dHJpYnV0ZSIsInN1Y2Nlc3NDYWxsYmFjayIsImRpYWxvZyIsImFsZXJ0aWZ5IiwiY29uZmlybSIsInNldCIsImxhYmVscyIsInByaXZhY3lEaWFsb2dMYWJlbHMiLCJvbnNob3ciLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImRldGFpbCIsImVsZW1lbnRzIiwiZGVmYXVsdEZvY3VzT2ZmIiwib25mb2N1cyIsImRpYWxvZ1RlbXBsYXRlIiwicHJpdmFjeU1vZGFsQ29udGVudCIsInByaXZhY3lIdG1sIiwicmVwbGFjZSIsImNvbnRlbnQiLCJzdG9yZURlY2lzaW9uRmllbGROYW1lIiwiY2hlY2tlZCIsInNldEl0ZW0iLCJvayIsImJ0bkxhYmVsT2siLCJidG5Qcml2YWN5T2siLCJjYW5jZWwiLCJidG5MYWJlbENhbmNlbCIsImJ0blByaXZhY3lDYW5jZWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidmlkZW9XcmFwcGVyIiwiYXBwZW5kQ2hpbGQiLCJpbm5lckhUTUwiLCJlbGVtZW50RGVzY3JpcHRpb24iLCJKU09OIiwicGFyc2UiLCJ2aWRlb0VsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiYXR0cmlidXRlcyIsInZhbHVlIiwic2V0QXR0cmlidXRlIiwiaWZyYW1lcyIsImxlbmd0aCIsImlmcmFtZSIsInNyYyIsInZpZGVvRWxlbWVudHMiLCJyZW1vdmUiLCJzdHlsZSIsImluaXRTdGF0ZXMiLCJ0b2dnbGVCdXR0b25zIiwibGl2ZVJlZ2lvbiIsInRvZ2dsZVZpZGVvIiwiaW5kZXgiLCJ3aXRoTGl2ZVJlZ2lvbiIsInN0YXRlcyIsInNsaWNlIiwic3RhdGUiLCJpIiwidmlkZW9DdG4iLCJkaXNwbGF5IiwidGV4dENvbnRlbnQiLCJidG4iLCJlbCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLHVCQUF1QjtRQUN2Qzs7O1FBR0E7UUFDQTtRQUNBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBRUFBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVU7RUFDcEQsSUFBSUMsZUFBZSxHQUFHRixRQUFRLENBQUNHLGdCQUFULENBQTBCLFlBQTFCLENBQXRCO0VBQ0FELGVBQWUsQ0FBQ0UsT0FBaEIsQ0FBd0IsVUFBQ0MsT0FBRDtJQUFBLE9BQWEsSUFBSUMsOENBQUosQ0FBVUQsT0FBVixDQUFiO0VBQUEsQ0FBeEIsRUFGb0QsQ0FJcEQ7O0VBQ0FMLFFBQVEsQ0FBQ0csZ0JBQVQsQ0FBMEIsdUJBQTFCLEVBQW1EQyxPQUFuRCxDQUEyRCxVQUFTQyxPQUFULEVBQWtCO0lBQ3pFLElBQUlDLDhDQUFKLENBQVVELE9BQVYsRUFBbUIsTUFBbkI7RUFDSCxDQUZEO0FBR0gsQ0FSRCxFLENBVUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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VCxLQUFOLEVBQWdCO1VBQ2xDUyxHQUFHLENBQUNoRyxnQkFBSixDQUFxQixPQUFyQixFQUE4QixVQUFBaUcsRUFBRSxFQUFJO1lBQ2hDWCxXQUFXLENBQUNDLEtBQUQsRUFBUSxJQUFSLENBQVg7VUFDSCxDQUZEO1FBR0gsQ0FKRDtRQU1BRCxXQUFXLENBQUMsQ0FBRCxDQUFYO01BQ0g7SUFDSjtJQUVEO0FBQ0o7QUFDQTs7OztXQUNJLDhCQUFxQjtNQUNqQixJQUFJLENBQUMsS0FBSzVFLFdBQU4sSUFBcUIsS0FBS0UsbUJBQTlCLEVBQW1EO1FBQy9DLElBQUksYUFBYSxLQUFLQSxtQkFBTCxDQUF5QkgsT0FBMUMsRUFBbUQ7VUFDL0MsS0FBS0MsV0FBTCxHQUFtQixJQUFuQjtVQUNBYyxPQUFPLENBQUNDLElBQVIsQ0FBYSxrSEFBYjtRQUNIO01BQ0o7SUFDSjs7Ozs7O2dCQXpVZ0JwQixLLGdCQUNHLG1COztnQkFESEEsSyw0QkFFZSxvQiIsImZpbGUiOiJjb250YW8tdmlkZW8tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImNvbnRhby12aWRlby1idW5kbGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idW5kbGVzL2hlaW1yaWNoaGFubm90dmlkZW8vYXNzZXRzL1wiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9SZXNvdXJjZXMvYXNzZXRzL2pzL2NvbnRhby12aWRlby1idW5kbGUuanNcIixcImFsZXJ0aWZ5XCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFZpZGVvIGZyb20gJy4vdmlkZW8nXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xuICAgIGxldCB3cmFwcGVyRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaHVoX3ZpZGVvJyk7XG4gICAgd3JhcHBlckVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IG5ldyBWaWRlbyhlbGVtZW50KSk7XG5cbiAgICAvLyBmdWxsc2l6ZSB2aWRlb3NcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaHVoX3ZpZGVvLnZpZGVvLWxpbmsnKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgbmV3IFZpZGVvKGVsZW1lbnQsICdsaW5rJyk7XG4gICAgfSk7XG59KTtcblxuLy8gaW1wb3J0IEV2ZW50VXRpbCBmcm9tICdAaHVuZGgvY29udGFvLXV0aWxzLWJ1bmRsZS9qcy9ldmVudC11dGlsJztcbi8vIGltcG9ydCBhbGVydGlmeSBmcm9tICdhbGVydGlmeWpzJztcblxuLy8gY29uc3QgdmlkZW9UaHVtYm5haWxTZWxlY3RvciA9ICcuaHVoX3ZpZGVvID4gLnZpZGVvLXdyYXBwZXIgPiAudmlkZW8tdGh1bWJuYWlsJztcbi8vIGNvbnN0IGh0bWxWaWRlb1NlbGVjdG9yID0gJy5odWhfdmlkZW8gPiAudmlkZW8td3JhcHBlciA+IC52aWRlby1jb250YWluZXInO1xuLy8gY29uc3QgbG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXkgPSAnaHVoX3ZpZGVvX3ByaXZhY3knO1xuLy8gY29uc3QgcHJpdmFjeUF1dG9GaWVsZE5hbWUgPSAndmlkZW8tc2F2ZS1wcml2YWN5Jztcbi8vXG4vLyBjbGFzcyBWaWRlb0J1bmRsZSB7XG4vLyAgICAgc3RhdGljIG9uUmVhZHkoKSB7XG4vL1xuLy8gICAgICAgICAvLyBhdXRvcGxheSB2aWRlb3Ncbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh2aWRlb1RodW1ibmFpbFNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbi8vICAgICAgICAgICAgIGlmIChpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheScpKSB7XG4vLyAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFZpZGVvKGl0ZW0pO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaHRtbFZpZGVvU2VsZWN0b3IpLmZvckVhY2goKGl0ZW0pID0+IHtcbi8vICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRWaWRlbyhpdGVtKTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAvLyBoYW5kbGUgY2xpY2sgZXZlbnRcbi8vICAgICAgICAgRXZlbnRVdGlsLmFkZER5bmFtaWNFdmVudExpc3RlbmVyKCdjbGljaycsIHZpZGVvVGh1bWJuYWlsU2VsZWN0b3IsIGZ1bmN0aW9uKHRhcmdldCkge1xuLy8gICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFZpZGVvKHRhcmdldCk7XG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgLy8gaGFuZGxlIGNsaWNrIGV2ZW50XG4vLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5odWhfdmlkZW8udmlkZW8tbGluaycpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuLy8gICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4vLyAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdFByaXZhY3koZXZlbnQudGFyZ2V0KTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRUb2dnbGVWaWRlbygpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgc3RhdGljIGluaXRQcml2YWN5KGVsZW1lbnQpIHtcbi8vICAgICAgICAgaWYgKCdwcml2YWN5JyBpbiBlbGVtZW50LmRhdGFzZXQpIHtcbi8vICAgICAgICAgICAgIGlmIChudWxsICE9PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSkpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBhbGVydGlmeS5jb25maXJtKCkuc2V0KHtcbi8vICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgb2s6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgIT09IG51bGwgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1vaycpIDogJ09LJyxcbi8vICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1jYW5jZWwnKSAhPT0gbnVsbCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpIDogJ0NhbmNlbCdcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIG9uc2hvdzogZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uYWxlcnRpZnkub25zaG93Jywge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGRlZmF1bHRGb2N1c09mZjogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICBvbmZvY3VzOiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5hbGVydGlmeS5vbmZvY3VzJywge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICBhbGVydGlmeS5jb25maXJtKCcmbmJzcDsnLFxuLy8gICAgICAgICAgICAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3ktaHRtbCcpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSxcbi8vICAgICAgICAgICAgICAgICAoKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChkaWFsb2cuZWxlbWVudHMuY29udGVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT0nICsgcHJpdmFjeUF1dG9GaWVsZE5hbWUgKyAnXScpLmNoZWNrZWQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsZVN0b3JhZ2VBY2NlcHRQcml2YWN5S2V5LCB0cnVlKTtcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8ucHJpdmFjeS5hY2NlcHQnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5ocmVmID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8ucHJpdmFjeS5jYW5jZWwnLCB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdFZpZGVvKGVsZW1lbnQpIHtcbi8vICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudmlkZW8tY29udGFpbmVyJyksXG4vLyAgICAgICAgICAgICBpZnJhbWVzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpLFxuLy8gICAgICAgICAgICAgaHRtbFZpZGVvID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4vL1xuLy8gICAgICAgICBpZiAoaWZyYW1lcyAmJiAoaWZyYW1lcy5sZW5ndGggPiAwKSkge1xuLy8gICAgICAgICAgICAgaWZyYW1lcy5mb3JFYWNoKGlmcmFtZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuaW5pdElmcmFtZVZpZGVvKGVsZW1lbnQsIGlmcmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgVmlkZW9CdW5kbGUuc2hvd1ZpZGVvKGVsZW1lbnQsIGlmcmFtZSk7XG4vLyAgICAgICAgICAgICB9KVxuLy9cbi8vICAgICAgICAgfSBlbHNlIGlmIChodG1sVmlkZW8pIHtcbi8vICAgICAgICAgICAgIFZpZGVvQnVuZGxlLmluaXRIdG1sVmlkZW8oZWxlbWVudCwgaHRtbFZpZGVvKTtcbi8vICAgICAgICAgICAgIFZpZGVvQnVuZGxlLnNob3dWaWRlbyhlbGVtZW50LCBodG1sVmlkZW8pO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgc2hvd1ZpZGVvKGVsZW1lbnQsIHZpZGVvKSB7XG4vLyAgICAgICAgIGxldCBjb250YWluZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1jb250YWluZXInKTtcbi8vXG4vLyAgICAgICAgIGlmIChjb250YWluZXIpIHtcbi8vICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2aWRlby1oaWRkZW4nKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbml0aWFsaXplJyk7XG4vLyAgICAgICAgIHZpZGVvLmNsYXNzTGlzdC5hZGQoJ2luaXRpYWxpemUnKTtcbi8vXG4vLyAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW5pdGlhbGl6ZScpO1xuLy8gICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvLWhpZGRlbicpO1xuLy9cbi8vICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LnJlbW92ZSgnaW5pdGlhbGl6ZScpO1xuLy8gICAgICAgICB2aWRlby5jbGFzc0xpc3QucmVtb3ZlKCd2aWRlby1oaWRkZW4nKTtcbi8vXG4vLyAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd2aWRlb0luaXRpYWxpemVkJywge2RldGFpbDogdmlkZW8sIGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWV9KSk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdElmcmFtZVZpZGVvKGVsZW1lbnQsIGlmcmFtZSkge1xuLy8gICAgICAgICAvLyBzdG9wIHBsYXlpbmcgdmlkZW8gb24gY2xvc2luZyBhbnkgbW9kYWwgd2luZG93XG4vLyAgICAgICAgIEV2ZW50VXRpbC5hZGREeW5hbWljRXZlbnRMaXN0ZW5lcignY2xpY2snLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4vLyAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBpZnJhbWUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAvLyBzdG9wIHBsYXlpbmcgdmlkZW8gb24gY2xvc2luZyBhbnkgYm9vdHN0cmFwIG1vZGFsXG4vLyAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcbi8vICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuLy9cbi8vICAgICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3knKSkge1xuLy9cbi8vICAgICAgICAgICAgIGlmIChudWxsICE9PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbGVTdG9yYWdlQWNjZXB0UHJpdmFjeUtleSkpIHtcbi8vICAgICAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBpZnJhbWUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbi8vICAgICAgICAgICAgICAgICBWaWRlb0J1bmRsZS5zaG93VmlkZW8oZWxlbWVudCwgaWZyYW1lKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgIGxldCBkaWFsb2cgPSBhbGVydGlmeS5jb25maXJtKCkuc2V0KHtcbi8vICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgb2s6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LW9rJykgIT09IG51bGwgPyBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1vaycpIDogJ09LJyxcbi8vICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1idG4tcHJpdmFjeS1jYW5jZWwnKSAhPT0gbnVsbCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJ0bi1wcml2YWN5LWNhbmNlbCcpIDogJ0NhbmNlbCdcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIG9uc2hvdzogZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uZXZlbnQuYWxlcnRpZnkub25zaG93Jywge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGRlZmF1bHRGb2N1c09mZjogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICBvbmZvY3VzOiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2h1aC52aWRlby5ldmVudC5hbGVydGlmeS5vbmZvY3VzJywge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICBhbGVydGlmeS5jb25maXJtKCcmbmJzcDsnLFxuLy8gICAgICAgICAgICAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByaXZhY3ktaHRtbCcpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSxcbi8vICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGRpYWxvZy5lbGVtZW50cy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPScgKyBwcml2YWN5QXV0b0ZpZWxkTmFtZSArICddJykuY2hlY2tlZCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxlU3RvcmFnZUFjY2VwdFByaXZhY3lLZXksIHRydWUpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCBpZnJhbWUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIFZpZGVvQnVuZGxlLnNob3dWaWRlbyhlbGVtZW50LCBpZnJhbWUpO1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBzdGF0aWMgaW5pdEh0bWxWaWRlbyhlbGVtZW50LCB2aWRlbykge1xuLy8gICAgICAgICBsZXQgd3JhcHBlciA9IGVsZW1lbnQuY2xvc2VzdCgnLnZpZGVvLXdyYXBwZXInKTtcbi8vICAgICAgICAgbGV0IGJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktYnV0dG9uJyk7XG4vLyAgICAgICAgIGlmIChidXR0b24pIHtcbi8vICAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbi8vICAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmhhc0F0dHJpYnV0ZShcImNvbnRyb2xzXCIpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImNvbnRyb2xzXCIsIFwiY29udHJvbHNcIik7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBlID0+IHtcbi8vICAgICAgICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuLy8gICAgICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgIH1cbi8vXG4vLyAgICAgc3RhdGljIGluaXRUb2dnbGVWaWRlbygpIHtcbi8vXG4vLyAgICAgICAgIGxldCB2aWRlb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VfaHVoX3ZpZGVvIC5odWhfdmlkZW8nKTtcbi8vICAgICAgICAgY29uc3QgaW5pdFN0YXRlcyA9IFt0cnVlLCB0cnVlXTtcbi8vXG4vLyAgICAgICAgIHZpZGVvQ29udGFpbmVycyAmJiB2aWRlb0NvbnRhaW5lcnMuZm9yRWFjaChjdG4gPT4ge1xuLy9cbi8vICAgICAgICAgICAgIGxldCB0b2dnbGVCdXR0b25zID0gY3RuLnF1ZXJ5U2VsZWN0b3JBbGwoJy5odWhfdmlkZW8gLnZpZGVvLXRvZ2dsZS1jdG4gYnV0dG9uJyk7XG4vLyAgICAgICAgICAgICBsZXQgbGl2ZVJlZ2lvbiA9IGN0bi5xdWVyeVNlbGVjdG9yKCcjdmlkZW9Ub2dnbGVMaXZlUmVnaW9uT3V0cHV0Jyk7XG4vL1xuLy8gICAgICAgICAgICAgY29uc3QgdG9nZ2xlVmlkZW8gPSAoaW5kZXgsIHdpdGhMaXZlUmVnaW9uID0gZmFsc2UpID0+IHtcbi8vICAgICAgICAgICAgICAgICBsZXQgc3RhdGVzID0gaW5pdFN0YXRlcy5zbGljZSgwKTtcbi8vICAgICAgICAgICAgICAgICBzdGF0ZXNbaW5kZXhdID0gZmFsc2U7XG4vL1xuLy8gICAgICAgICAgICAgICAgIGlmICh0b2dnbGVCdXR0b25zLmxlbmd0aCA+IDApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgc3RhdGVzLmZvckVhY2goKHN0YXRlLCBpKSA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvQ3RuID0gY3RuLnF1ZXJ5U2VsZWN0b3IoJyMnICsgdG9nZ2xlQnV0dG9uc1tpXS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQnV0dG9uc1tpXS5jbGFzc0xpc3QuYWRkKCdidG4tdmlkZW8tc2hvdycpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvQ3RuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVmcmVzaCBpZnJhbWVcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWZyYW1lID0gdmlkZW9DdG4ucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaWZyYW1lICE9PSBudWxsKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5zcmMpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYnRuLXZpZGVvLXNob3cnKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0N0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGhvdyB0byBsb2NhbGl6ZSB0aGlzXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoTGl2ZVJlZ2lvbikge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVSZWdpb24udGV4dENvbnRlbnQgPSBcIkF1ZGlvZGVza3JpcHRpb24gc3RlaHQgaW0gZm9sZ2VuZGVuIFZpZGVvIHp1ciBWZXJmw7xndW5nXCI7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVSZWdpb24udGV4dENvbnRlbnQgPSBcIkF1ZGlvZGVza3JpcHRpb24gc3RlaHQgaW0gZm9sZ2VuZGVuIFZpZGVvIG5pY2h0IG1laHIgenVyIFZlcmbDvGd1bmdcIjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICBpZiAodG9nZ2xlQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlQnV0dG9ucy5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVsID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVZpZGVvKGluZGV4LCB0cnVlKTtcbi8vICAgICAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgICB9KVxuLy9cbi8vICAgICAgICAgICAgICAgICB0b2dnbGVWaWRlbygxKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcbi8vXG4vL1xuLy8gICAgIH1cbi8vIH1cbi8vXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZnRlclVubG9ja1Byb3RlY3RlZENvZGUnLCAoZSkgPT4ge1xuLy8gICAgIC8vIHByaXZhY3kgY2VudGVyIC0+IHNraXAgdGhlIHByZXZpZXcgaW1hZ2Ugb24gZmlyc3QgdW5sb2NrLCBpLmUuLCBpZiB0aGUgdW5sb2NraW5nIGhhcyBiZWVuIGRvbmUgYnkgYSBjbGlja1xuLy8gICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlkZW50aWZpZXI9XCInICsgZS5kZXRhaWwuaWRlbnRpZmllciArICdcIl0gLmh1aF92aWRlbycpO1xuLy8gICAgIGlmICh2aWRlbyAhPT0gbnVsbCkge1xuLy8gICAgICAgICBWaWRlb0J1bmRsZS5pbml0VmlkZW8odmlkZW8pO1xuLy8gICAgICAgICBWaWRlb0J1bmRsZS5pbml0VG9nZ2xlVmlkZW8oKTtcbi8vXG4vLyAgICAgICAgIGlmKGUuZGV0YWlsLnVubG9ja0J5Q2xpY2spIHtcbi8vICAgICAgICAgICAgIGxldCB0b2dnbGUgPSB2aWRlby5xdWVyeVNlbGVjdG9yKCcudmlkZW8tdG9nZ2xlLWN0biBidXR0b24nKTtcbi8vICAgICAgICAgICAgIGlmKHRvZ2dsZSkge1xuLy8gICAgICAgICAgICAgICAgIHRvZ2dsZS5mb2N1cygpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICB2aWRlby5xdWVyeVNlbGVjdG9yKCdbdGFiaW5kZXg9XCIwXCJdJykuZm9jdXMoKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy9cbi8vICAgICB9XG4vLyB9KTtcbi8vXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVmlkZW9CdW5kbGUub25SZWFkeSk7XG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgVmlkZW9CdW5kbGU7XG4iLCJpbXBvcnQgYWxlcnRpZnkgZnJvbSAnYWxlcnRpZnlqcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvIHtcbiAgICBzdGF0aWMgcHJpdmFjeUtleSA9ICdodWhfdmlkZW9fcHJpdmFjeSc7XG4gICAgc3RhdGljIHN0b3JlRGVjaXNpb25GaWVsZE5hbWUgPSAndmlkZW8tc2F2ZS1wcml2YWN5JztcblxuICAgIC8qKiBAdHlwZSB7RE9NU3RyaW5nTWFwfSAqL1xuICAgIGNvbmZpZ3VyYXRpb247XG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudHxudWxsfSAqL1xuICAgIHByZXZpZXdJbWFnZUVsZW1lbnQ7XG4gICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgIHByaXZhY3lNb2RlO1xuICAgIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR8bnVsbH0gKi9cbiAgICB2aWRlb0NvbnRhaW5lckVsZW1lbnQ7XG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudHxudWxsfSAqL1xuICAgIHdyYXBwZXJFbGVtZW50O1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHdyYXBwZXJFbGVtZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmcgfSB0eXBlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod3JhcHBlckVsZW1lbnQsIHR5cGUgPSAndmlkZW8nKSB7XG4gICAgICAgIHRoaXMud3JhcHBlckVsZW1lbnQgPSB3cmFwcGVyRWxlbWVudDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0XG4gICAgICAgIHRoaXMucHJpdmFjeU1vZGUgPSAoJ3ByaXZhY3lNb2RlJyBpbiB0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIGlmICgnbGluaycgPT09IHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQcml2YWN5U2V0dGluZ3NUb0xpbmsoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmlld0ltYWdlRWxlbWVudCA9IHRoaXMud3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXdyYXBwZXIgLnZpZGVvLXRodW1ibmFpbCcpO1xuICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudCA9IHRoaXMud3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLXdyYXBwZXIgLnZpZGVvLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmxlZ2FjeVByaXZhY3lDaGVjaygpO1xuXG4gICAgICAgIHRoaXMuYXBwbHlQcml2YWN5U2V0dGluZ3NUb1ZpZGVvKCk7XG4gICAgICAgIGlmICgndG9nZ2xlVmlkZW8nIGluIHRoaXMuY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy52aWRlb1RvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlQcml2YWN5U2V0dGluZ3NUb1ZpZGVvKCkge1xuICAgICAgICAvLyBhbHdheXMgc2hvdyB2aWRlbyBpZiBwcml2YWN5IGlzIG5vdCBhY3RpdmF0ZWRcbiAgICAgICAgaWYgKCF0aGlzLnByaXZhY3lNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dWaWRlbygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hvdyB2aWRlbyBmb3IgbG9jYWwgdmlkZW8gZmlsZXNcbiAgICAgICAgaWYgKHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgaHRtbFZpZGVvRWxlbWVudCA9IHRoaXMudmlkZW9Db250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHZpZGVvJyk7XG4gICAgICAgICAgICBpZiAoaHRtbFZpZGVvRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hvdyB2aWRlbyBpZiBhbGxvd3MgYmVmb3JlIGJ5IHVzZXJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFZpZGVvLnByaXZhY3lLZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dWaWRlbygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlld0ltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnByaXZhY3lEaWFsb2codGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LCAoKSA9PiB0aGlzLnNob3dWaWRlbygpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UHJpdmFjeVNldHRpbmdzVG9MaW5rKCkge1xuICAgICAgICAvLyBsZWdhY3kgc3VwcG9ydFxuICAgICAgICAvLyBAdG9kbyBEZXByZWNhdGVkLCByZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uXG4gICAgICAgIGlmICghdGhpcy5wcml2YWN5TW9kZSkge1xuICAgICAgICAgICAgaWYgKCdwcml2YWN5JyBpbiB0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhY3lNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJZb3UncmUgdXNpbmcgYW4gb3V0ZGF0ZWQgdmlkZW8gZnVsbHNpemUgdGVtcGxhdGUuIFBsZWFzZSBhZGp1c3QgeW91ciB0ZW1wbGF0ZSBhY2NvcmRpbmcgdG8gdGhlIGRvY3MuIFNpbmNlIHZlcnNpb24gMS4yLjBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXBwZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJpdmFjeU1vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhY3lEaWFsb2codGhpcy53cmFwcGVyRWxlbWVudCwgKGVsZW1lbnQpID0+IHdpbmRvdy5vcGVuKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fG51bGx9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdWNjZXNzQ2FsbGJhY2tcbiAgICAgKi9cbiAgICBwcml2YWN5RGlhbG9nKGVsZW1lbnQsIHN1Y2Nlc3NDYWxsYmFjaykge1xuICAgICAgICBsZXQgZGlhbG9nID0gYWxlcnRpZnkuY29uZmlybSgpLnNldCh7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMucHJpdmFjeURpYWxvZ0xhYmVscygpLFxuICAgICAgICAgICAgb25zaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmFsZXJ0aWZ5Lm9uc2hvdycsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZGlhbG9nLmVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgLy8gQHRvZG8gZGVwcmVjYXRlZCwgcmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8uZXZlbnQuYWxlcnRpZnkub25zaG93Jywge1xuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBkaWFsb2cuZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZhdWx0Rm9jdXNPZmY6IHRydWUsXG4gICAgICAgICAgICBvbmZvY3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIC8vIEB0b2RvIGRlcHJlY2F0ZWQsIHJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaHVoLnZpZGVvLmV2ZW50LmFsZXJ0aWZ5Lm9uZm9jdXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgZGlhbG9nVGVtcGxhdGUgPSBudWxsO1xuICAgICAgICBpZiAoJ3ByaXZhY3lNb2RhbENvbnRlbnQnIGluIHRoaXMuY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgZGlhbG9nVGVtcGxhdGUgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucHJpdmFjeU1vZGFsQ29udGVudDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQgJiYgJ3ByaXZhY3lIdG1sJyBpbiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgZGlhbG9nVGVtcGxhdGUgPSB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldC5wcml2YWN5SHRtbC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMucHJldmlld0ltYWdlRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMud3JhcHBlckVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhbGVydGlmeS5jb25maXJtKCcmbmJzcDsnLFxuICAgICAgICAgICAgZGlhbG9nVGVtcGxhdGUsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpYWxvZy5lbGVtZW50cy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPScgKyBWaWRlby5zdG9yZURlY2lzaW9uRmllbGROYW1lICsgJ10nKS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFZpZGVvLnByaXZhY3lLZXksIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8ucHJpdmFjeS5hY2NlcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhlbGVtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdodWgudmlkZW8ucHJpdmFjeS5jYW5jZWwnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGRpYWxvZy5lbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhY3lEaWFsb2dMYWJlbHMoKSB7XG4gICAgICAgIGxldCBsYWJlbHMgPSB7XG4gICAgICAgICAgICAnb2snOiAnT2snLFxuICAgICAgICAgICAgJ2NhbmNlbCc6ICdDYW5jZWwnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCdidG5MYWJlbE9rJyBpbiB0aGlzLndyYXBwZXJFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgIGxhYmVscy5vayA9IHRoaXMud3JhcHBlckVsZW1lbnQuZGF0YXNldC5idG5MYWJlbE9rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldmlld0ltYWdlRWxlbWVudCAmJiAnYnRuUHJpdmFjeU9rJyBpbiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgIGxhYmVscy5vayA9IHRoaXMucHJldmlld0ltYWdlRWxlbWVudC5kYXRhc2V0LmJ0blByaXZhY3lPaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgnYnRuTGFiZWxPaycgaW4gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICBsYWJlbHMuY2FuY2VsID0gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0LmJ0bkxhYmVsQ2FuY2VsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldmlld0ltYWdlRWxlbWVudCAmJiAnYnRuUHJpdmFjeUNhbmNlbCcgaW4gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMuY2FuY2VsID0gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQuYnRuUHJpdmFjeUNhbmNlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYWJlbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBzaG93VmlkZW8oKSB7XG4gICAgICAgIGlmICgnZWxlbWVudCcgaW4gdGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9Db250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFsndmlkZW8tY29udGFpbmVyJ10pO1xuICAgICAgICAgICAgICAgIGxldCB2aWRlb1dyYXBwZXIgPSB0aGlzLndyYXBwZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby13cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlb1dyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2aWRlb1dyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVsZW1lbnREZXNjcmlwdGlvbiA9IEpTT04ucGFyc2UodGhpcy53cmFwcGVyRWxlbWVudC5kYXRhc2V0LmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAvKiogQHZhciB7RWxlbWVudH0gdmlkZW9FbGVtZW50ICovXG4gICAgICAgICAgICBsZXQgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50RGVzY3JpcHRpb24udHlwZSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGVsZW1lbnREZXNjcmlwdGlvbi5hdHRyaWJ1dGVzKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUodmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodmlkZW9FbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpZnJhbWVzID0gdGhpcy52aWRlb0NvbnRhaW5lckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJyk7XG4gICAgICAgICAgICBpZiAoaWZyYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWZyYW1lcy5mb3JFYWNoKChpZnJhbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lLnNyYyA9IGlmcmFtZS5kYXRhc2V0LnNyYztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3ZpZGVvSW5pdGlhbGl6ZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGlmcmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvRWxlbWVudHMgPSB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgPiB2aWRlbycpO1xuICAgICAgICAgICAgICAgIGlmICh2aWRlb0VsZW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2aWRlb0VsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3ZpZGVvSW5pdGlhbGl6ZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZGVvQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd2aWRlby1oaWRkZW4nKTtcbiAgICAgICAgaWYgKHRoaXMucHJldmlld0ltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LnN0eWxlID0gJ2Rpc3BsYXk6bm9uZTsnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmlkZW9Ub2dnbGUoKSB7XG5cbiAgICAgICAgY29uc3QgaW5pdFN0YXRlcyA9IFt0cnVlLCB0cnVlXTtcblxuICAgICAgICBsZXQgdG9nZ2xlQnV0dG9ucyA9IHRoaXMud3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmh1aF92aWRlbyAudmlkZW8tdG9nZ2xlLWN0biBidXR0b24nKTtcbiAgICAgICAgbGV0IGxpdmVSZWdpb24gPSB0aGlzLndyYXBwZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWRlb1RvZ2dsZUxpdmVSZWdpb25PdXRwdXQnKTtcblxuICAgICAgICBjb25zdCB0b2dnbGVWaWRlbyA9IChpbmRleCwgd2l0aExpdmVSZWdpb24gPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IGluaXRTdGF0ZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICBzdGF0ZXNbaW5kZXhdID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0b2dnbGVCdXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0ZXMuZm9yRWFjaCgoc3RhdGUsIGkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9DdG4gPSB0aGlzLndyYXBwZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdG9nZ2xlQnV0dG9uc1tpXS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ2J0bi12aWRlby1zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0N0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVmcmVzaCBpZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZnJhbWUgPSB2aWRlb0N0bi5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlmcmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGlmcmFtZS5zcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi12aWRlby1zaG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0N0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC8vIFRPRE8gaG93IHRvIGxvY2FsaXplIHRoaXNcbiAgICAgICAgICAgICAgICBpZiAod2l0aExpdmVSZWdpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZVJlZ2lvbi50ZXh0Q29udGVudCA9IFwiQXVkaW9kZXNrcmlwdGlvbiBzdGVodCBpbSBmb2xnZW5kZW4gVmlkZW8genVyIFZlcmbDvGd1bmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVSZWdpb24udGV4dENvbnRlbnQgPSBcIkF1ZGlvZGVza3JpcHRpb24gc3RlaHQgaW0gZm9sZ2VuZGVuIFZpZGVvIG5pY2h0IG1laHIgenVyIFZlcmbDvGd1bmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2dnbGVCdXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbnMuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlVmlkZW8oaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0b2dnbGVWaWRlbygxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB0b2RvIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb25cbiAgICAgKi9cbiAgICBsZWdhY3lQcml2YWN5Q2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5wcml2YWN5TW9kZSAmJiB0aGlzLnByZXZpZXdJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICgncHJpdmFjeScgaW4gdGhpcy5wcmV2aWV3SW1hZ2VFbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhY3lNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJZb3UncmUgdXNpbmcgYW4gb3V0ZGF0ZWQgdmlkZW8gdGVtcGxhdGVzLiBQbGVhc2UgYWRqdXN0IHlvdXIgdGVtcGxhdGUgYWNjb3JkaW5nIHRvIHRoZSBkb2NzLiBTaW5jZSB2ZXJzaW9uIDEuMi4wXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0iXSwic291cmNlUm9vdCI6IiJ9