import EventUtil from '@hundh/contao-utils-bundle/js/event-util'
import alertify from 'alertifyjs';

const videoThumbnailSelector = '.huh_video > .video-wrapper > .video-thumbnail';
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
    }

    static initPrivacy(element) {
        if ('privacy' in element.dataset) {
            if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
                return true;
            }

            const dialog = alertify.confirm().set({
                labels: {
                    ok: element.getAttribute('data-btn-privacy-ok') !== null ? element.getAttribute('data-btn-privacy-ok') : 'OK' ,
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

    static initVideo(el) {
        let video = el.parentNode.querySelector('.video-container'),
            iframe = video.querySelector('iframe');

        // stop playing video on closing any modal window
        EventUtil.addDynamicEventListener('click', '[data-dismiss="modal"]', function(target) {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        });

        // stop playing video on closing any bootstrap modal
        document.addEventListener('hidden.bs.modal', function(e) {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        });

        if (el.getAttribute('data-privacy')) {
            if (null !== localStorage.getItem(localeStorageAcceptPrivacyKey)) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
                showVideo();
                return false;
            }

            let dialog = alertify.confirm().set({
                labels: {
                    ok: el.getAttribute('data-btn-privacy-ok') !== null ? el.getAttribute('data-btn-privacy-ok') : 'OK' ,
                    cancel: el.getAttribute('data-btn-privacy-cancel') !== null ? el.getAttribute('data-btn-privacy-cancel') : 'Cancel'
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
                el.getAttribute('data-privacy-html').replace(/\\"/g, '"'),
                function() {
                    if (dialog.elements.content.querySelector('[name=' + privacyAutoFieldName + ']').checked) {
                        localStorage.setItem(localeStorageAcceptPrivacyKey, true);
                    }

                    iframe.setAttribute('src', iframe.getAttribute('data-src'));

                    showVideo();
                },
                function() {
                });

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
}

document.addEventListener('afterUnlockProtectedCode', (e) => {
    // privacy center -> skip the preview image on first unlock, i.e., if the unlocking has been done by a click
    let video = document.querySelector('[data-identifier="' + e.detail.identifier + '"] .huh_video');

    if (video !== null && e.detail.unlockByClick) {
        VideoBundle.initVideo(video);
    }
});

document.addEventListener('DOMContentLoaded', VideoBundle.onReady);
