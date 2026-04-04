import Video from './video'

document.addEventListener('DOMContentLoaded', function() {
    let wrapperElements = document.querySelectorAll('.huh_video');
    wrapperElements.forEach((element) => new Video(element));

    // fullsize videos
    document.querySelectorAll('.huh_video.video-link').forEach(function(element) {
        new Video(element, 'link');
    });
});

document.addEventListener('afterUnlockProtectedCode', (e) => {
    // privacy center -> skip the preview image on first unlock, i.e., if the unlocking has been done by a click
    let video = document.querySelector('[data-identifier="' + e.detail.identifier + '"] .huh_video');
    if (video !== null) {
        new Video(video);
        if (e.detail.unlockByClick) {
            let toggle = video.querySelector('.video-toggle-ctn button');
            if (toggle) {
                toggle.focus();
            } else {
                video.querySelector('[tabindex="0"]').focus();
            }
        }

    }
});