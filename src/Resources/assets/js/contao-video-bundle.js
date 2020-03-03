import '@hundh/contao-utils-bundle';

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
        utilsBundle.event.addDynamicEventListener('click', videoThumbnailSelector, function(target) {
            VideoBundle.initVideo(target);
        });
    }

    static initVideo(el) {
        let video = el.parentNode.querySelector('.video-container'),
            iframe = video.querySelector('iframe');

        // stop playing video on closing any modal window
        utilsBundle.event.addDynamicEventListener('click', '[data-dismiss="modal"]', function(target) {
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
                    document.dispatchEvent(new CustomEvent('huh.youtube.event.alertify.onshow', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            elements: dialog.elements
                        }
                    }));
                },
                defaultFocusOff: true,
                onfocus: function() {
                    document.dispatchEvent(new CustomEvent('huh.youtube.event.alertify.onfocus', {
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
            let iframeUrl = new URL(iframe.getAttribute('src'));
            iframeUrl.searchParams.append('autoplay', '1');
            iframe.setAttribute('src', iframeUrl.toString());
            el.classList.remove('initialize', 'video-hidden');
            video.classList.remove('initialize', 'video-hidden');
        }
    }
}
document.addEventListener('DOMContentLoaded', VideoBundle.onReady);