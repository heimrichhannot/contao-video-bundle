import EventUtil from '@hundh/contao-utils-bundle/js/event-util';
import alertify from 'alertifyjs';

const videoThumbnailSelector = '.huh_video > .video-wrapper > .video-thumbnail';
const htmlVideoSelector = '.huh_video > .video-wrapper > .video-container';
const localeStorageAcceptPrivacyKey = 'huh_video_privacy';
const privacyAutoFieldName = 'video-save-privacy';

class VideoBundle {
    static onReady() {
        // autoplay videos
        document.querySelectorAll(videoThumbnailSelector).forEach(function(item) {
            if (item.getAttribute('data-autoplay')) {
                VideoBundle.initVideo(item);
            }
        });

        document.querySelectorAll(htmlVideoSelector).forEach((item) => {
            VideoBundle.initVideo(item);
        });

        // handle click event
        EventUtil.addDynamicEventListener('click', videoThumbnailSelector, function(target) {
            VideoBundle.initVideo(target);
        });

        // handle click event
        document.querySelectorAll('.huh_video.video-link').forEach(function(element) {
            element.addEventListener('click', function(event) {
                event.preventDefault();
                VideoBundle.initPrivacy(event.target);
            });
        });

        VideoBundle.initToggleVideo();
    }

    static initPrivacy(element) {
        if ('privacy' in element.dataset) {
            if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
                return true;
            }

            const dialog = alertify.confirm().set({
                labels: {
                    ok: element.getAttribute('data-btn-privacy-ok') !== null ? element.getAttribute('data-btn-privacy-ok') : 'OK',
                    cancel: element.getAttribute('data-btn-privacy-cancel') !== null ? element.getAttribute('data-btn-privacy-cancel') : 'Cancel'
                },
                onshow: function() {
                    document.dispatchEvent(new CustomEvent('huh.video.alertify.onshow', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            elements: dialog.elements
                        }
                    }));
                },
                defaultFocusOff: true,
                onfocus: function() {
                    document.dispatchEvent(new CustomEvent('huh.video.alertify.onfocus', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            elements: dialog.elements
                        }
                    }));
                }
            });

            alertify.confirm('&nbsp;',
                element.getAttribute('data-privacy-html').replace(/\\"/g, '"'),
                () => {
                    if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
                        localStorage.setItem(localeStorageAcceptPrivacyKey, true);
                    }
                    element.dispatchEvent(new CustomEvent('huh.video.privacy.accept', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            elements: dialog.elements
                        }
                    }));
                    // location.href = element.getAttribute('href');
                },
                function() {
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

    static initVideo(element) {
        let container = element.parentNode.querySelector('.video-container'),
            iframes = container.querySelectorAll('iframe'),
            htmlVideo = container.querySelector('video');


        if (iframes) {
            iframes.forEach(iframe => {
                VideoBundle.initIframeVideo(element, iframe);
                VideoBundle.showVideo(element, iframe);
            })

        } else if (htmlVideo) {
            VideoBundle.initHtmlVideo(element, htmlVideo);
            VideoBundle.showVideo(element, htmlVideo);
        }
    }

    static showVideo(element, video) {
        let container = element.querySelector('.video-container');
        if (container) {
            container.classList.remove('video-hidden');
        }

        element.classList.add('initialize');
        video.classList.add('initialize');

        element.classList.remove('initialize');
        element.classList.remove('video-hidden');

        video.classList.remove('initialize');
        video.classList.remove('video-hidden');

        document.dispatchEvent(new CustomEvent('videoInitialized', {detail: video, bubbles: true, cancelable: true}));
    }

    static initIframeVideo(element, iframe) {
        // stop playing video on closing any modal window
        EventUtil.addDynamicEventListener('click', '[data-dismiss="modal"]', function(target) {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        });

        // stop playing video on closing any bootstrap modal
        document.addEventListener('hidden.bs.modal', function(e) {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        });

        iframe.setAttribute('src', iframe.getAttribute('data-src'));

        if (element.getAttribute('data-privacy')) {
            if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
                VideoBundle.showVideo(element, iframe);
                return false;
            }

            let dialog = alertify.confirm().set({
                labels: {
                    ok: element.getAttribute('data-btn-privacy-ok') !== null ? element.getAttribute('data-btn-privacy-ok') : 'OK',
                    cancel: element.getAttribute('data-btn-privacy-cancel') !== null ? element.getAttribute('data-btn-privacy-cancel') : 'Cancel'
                },
                onshow: function() {
                    document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onshow', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            elements: dialog.elements
                        }
                    }));
                },
                defaultFocusOff: true,
                onfocus: function() {
                    document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onfocus', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            elements: dialog.elements
                        }
                    }));
                }
            });

            alertify.confirm('&nbsp;',
                element.getAttribute('data-privacy-html').replace(/\\"/g, '"'),
                function() {
                    if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
                        localStorage.setItem(localeStorageAcceptPrivacyKey, true);
                    }

                    iframe.setAttribute('src', iframe.getAttribute('data-src'));

                    VideoBundle.showVideo(element, iframe);
                },
                function() {
                });

            return false;
        }
    }

    static initHtmlVideo(element, video) {
        let wrapper = element.closest('.video-wrapper');
        let button = wrapper.querySelector('button.play-button');
        if (button) {
            button.addEventListener('click', e => {
                video.play();
                if (!video.hasAttribute("controls")) {
                    video.setAttribute("controls", "controls");
                }
            });

            video.addEventListener('pause', e => {
                button.classList.remove('hidden');
            });

            video.addEventListener('play', e => {
                button.classList.add('hidden');
            });

        }

    }

    static initToggleVideo() {

        let videoContainers = document.querySelectorAll('.ce_huh_video .huh_video');
        const initStates = [true, true];

        videoContainers && videoContainers.forEach(ctn => {

            let toggleButtons = ctn.querySelectorAll('.huh_video .video-toggle-ctn button');
            let liveRegion = ctn.querySelector('#videoToggleLiveRegionOutput');

            const toggleVideo = (index, withLiveRegion = false) => {
                let states = initStates.slice(0);
                states[index] = false;

                if (toggleButtons.length > 0) {
                    states.forEach((state, i) => {
                        if (state) {
                            toggleButtons[i].classList.add('btn-video-show');
                            ctn.querySelector('#' + toggleButtons[i].getAttribute('aria-controls')).style.display = 'none';
                        } else {
                            toggleButtons[i].classList.remove('btn-video-show');
                            ctn.querySelector('#' + toggleButtons[i].getAttribute('aria-controls')).style.display = 'block';
                        }
                    })

                    // TODO how to localize this
                    if (withLiveRegion) {
                        if (!index) {
                            liveRegion.textContent = "Audiodeskription steht im folgenden Video zur Verfügung";
                        } else {
                            liveRegion.textContent = "Audiodeskription steht im folgenden Video nicht mehr zur Verfügung";
                        }
                    }
                }
            }

            if (toggleButtons.length > 0) {
                toggleButtons.forEach((btn, index) => {
                    btn.addEventListener('click', el => {
                        toggleVideo(index, true);
                    })
                })

                toggleVideo(1);
            }
        })


    }
}

document.addEventListener('afterUnlockProtectedCode', (e) => {
    // privacy center -> skip the preview image on first unlock, i.e., if the unlocking has been done by a click
    let video = document.querySelector('[data-identifier="' + e.detail.identifier + '"] .huh_video');
    //  removed && e.detail.unlockByClick -> reason why it was here?
    if (video !== null) {
        VideoBundle.initVideo(video);
        VideoBundle.initToggleVideo()
    }
});

document.addEventListener('DOMContentLoaded', VideoBundle.onReady);
