export default class Video {

    /** @type {Element} */
    wrapperElement;
    /** @type {Element} */
    videoContainerElement;

    /**
     * @param {Element} wrapperElement
     */
    constructor(wrapperElement) {
        this.wrapperElement = wrapperElement;
        this.privacyNotice = 'privacyNotice' in wrapperElement.dataset;
        this.previewImageElement = this.wrapperElement.querySelector('.video-wrapper .video-thumbnail');
        this.videoContainerElement = this.wrapperElement.querySelector('.video-wrapper .video-container');


        this.legacyPrivacyCheck();
        this.showVideo();

    }

    applyPrivacySetting()
    {
        if (!this.privacyNotice) {
            this.showVideo();
        }
    }

    /**
     *
     * @returns {boolean}
     */
    showVideo()
    {
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
            if  (iframes.length < 1) {
                return false;
            }

            iframes.forEach((iframe) => {
                iframe.src = iframe.dataset.src;
            });
        }

        this.videoContainerElement.classList.remove('video-hidden');

        return true;
    }

    /**
     * @todo Remove in next major version
     */
    legacyPrivacyCheck()
    {
        if (!this.privacyNotice && this.previewImageElement) {
            if ('privacy' in this.previewImageElement.dataset) {
                this.privacyNotice = true;
                console.warn("You're using an outdated video templates. Please adjust your template according to the docs. Since version 1.2.0");
            }
        }
    }


}