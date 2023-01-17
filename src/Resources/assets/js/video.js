import alertify from 'alertifyjs';

export default class Video {
    static privacyKey = 'huh_video_privacy';
    static storeDecisionFieldName = 'video-save-privacy';

    /** @type {DOMStringMap} */
    configuration;
    /** @type {HTMLElement|null} */
    previewImageElement;
    /** @type {boolean} */
    privacyMode;
    /** @type {HTMLElement|null} */
    videoContainerElement;
    /** @type {HTMLElement|null} */
    wrapperElement;
    /** @type {string} */
    type;

    /**
     * @param {Element} wrapperElement
     * @param {string } type
     */
    constructor(wrapperElement, type = 'video') {
        this.wrapperElement = wrapperElement;
        this.type = type;
        this.configuration = this.wrapperElement.dataset
        this.privacyMode = ('privacyMode' in this.configuration);

        if ('link' === type) {
            this.applyPrivacySettingsToLink();
        }

        this.previewImageElement = this.wrapperElement.querySelector('.video-wrapper .video-thumbnail');
        this.videoContainerElement = this.wrapperElement.querySelector('.video-wrapper .video-container');
        this.legacyPrivacyCheck();

        this.applyPrivacySettingsToVideo();
    }

    applyPrivacySettingsToVideo() {
        // always show video if privacy is not activated
        if (!this.privacyMode) {
            this.showVideo();
            return;
        }

        // show video for local video files
        if (this.videoContainerElement) {
            let htmlVideoElement = this.videoContainerElement.querySelector(':scope > video');
            if (htmlVideoElement) {
                this.showVideo();
                return;
            }
        }

        // show video if allows before by user
        if (localStorage.getItem(Video.privacyKey)) {
            this.showVideo();
        }

        if (this.previewImageElement) {
            this.previewImageElement.addEventListener('click',
                () => this.privacyDialog(this.previewImageElement, () => this.showVideo())
            );
        }
    }

    applyPrivacySettingsToLink()
    {
        // legacy support
        // @todo Deprecated, remove in next major version
        if (!this.privacyMode) {
            if ('privacy' in this.configuration) {
                this.privacyMode = true;
                console.warn("You're using an outdated video fullsize template. Please adjust your template according to the docs. Since version 1.2.0");
            }
        }

        this.wrapperElement.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.privacyMode) {
                this.privacyDialog(this.wrapperElement, (element) => window.open(element.getAttribute('href')));
            }
        })
    }

    /**
     * @param {HTMLElement|null} element
     * @param {function} successCallback
     */
    privacyDialog(element, successCallback) {
        let dialog = alertify.confirm().set({
            labels: this.privacyDialogLabels(),
            onshow: function() {
                document.dispatchEvent(new CustomEvent('huh.video.alertify.onshow', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        elements: dialog.elements
                    }
                }));
                // @todo deprecated, remove in next major version
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
                document.dispatchEvent(new CustomEvent('huh.video.alertify.onfocus', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        elements: dialog.elements
                    }
                }));
                // @todo deprecated, remove in next major version
                document.dispatchEvent(new CustomEvent('huh.video.event.alertify.onfocus', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        elements: dialog.elements
                    }
                }));
            }
        });

        let dialogTemplate = null;
        if ('privacyModalContent' in this.configuration) {
            dialogTemplate = this.configuration.privacyModalContent;
        } else if (this.previewImageElement && 'privacyHtml' in this.previewImageElement.dataset) {
            dialogTemplate = this.previewImageElement.dataset.privacyHtml.replace(/\\"/g, '"')
        } else {
            return;
        }

        if (!element) {
            element = this.previewImageElement;
            if (!this.previewImageElement) {
                element = this.wrapperElement;
            }
        }

        alertify.confirm('&nbsp;',
            dialogTemplate,
            () => {
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
            },
            function() {
                element.dispatchEvent(new CustomEvent('huh.video.privacy.cancel', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        elements: dialog.elements
                    }
                }));
            }
        );
    }

    privacyDialogLabels() {
        let labels = {
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
    showVideo() {
        if ('element' in this.wrapperElement.dataset) {
            if (!this.videoContainerElement) {
                this.videoContainerElement = document.createElement('div');
                this.videoContainerElement.classList.add(['video-container']);
                let videoWrapper = this.wrapperElement.querySelector('.video-wrapper');
                if (!videoWrapper) {
                    return false;
                }
                videoWrapper.appendChild(this.videoContainerElement);
            } else {
                this.videoContainerElement.innerHTML = '';
            }

            let elementDescription = JSON.parse(this.wrapperElement.dataset.element);

            /** @var {Element} videoElement */
            let videoElement = document.createElement(elementDescription.type);

            Object.entries(elementDescription.attributes).forEach((value) => {
                videoElement.setAttribute(value[0], value[1]);
            });
            this.videoContainerElement.appendChild(videoElement);
        } else {
            if (!this.videoContainerElement) {
                return false;
            }

            let iframes = this.videoContainerElement.querySelectorAll('iframe');
            if (iframes.length > 0) {
                iframes.forEach((iframe) => {
                    iframe.src = iframe.dataset.src;
                    document.dispatchEvent(new CustomEvent('videoInitialized', {detail: iframe, bubbles: true, cancelable: true}));
                });
            } else {
                let videoElements = this.videoContainerElement.querySelectorAll(':scope > video');
                if (videoElements.length < 1) {
                    return false;
                }
                videoElements.forEach((element) => {
                    document.dispatchEvent(new CustomEvent('videoInitialized', {detail: element, bubbles: true, cancelable: true}));
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
    legacyPrivacyCheck() {
        if (!this.privacyMode && this.previewImageElement) {
            if ('privacy' in this.previewImageElement.dataset) {
                this.privacyMode = true;
                console.warn("You're using an outdated video templates. Please adjust your template according to the docs. Since version 1.2.0");
            }
        }
    }


}