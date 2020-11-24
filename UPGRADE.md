# Upgrade introductions

This document contains informations about migrating from older versions or predecessor of this bundle.

## From 0.8.x

Renamed configuration options to meet coding standards. 

Old | New
--- | ---
enableNewsSupport | enable_news_support
defaultEnableNoCookieVideoUrl | default_use_no_cookie_video_url
defaultEnablePrivacyNotice | default_display_privacy_notice
videoProvider | video_provider

## From contao-youtube-bundle

tl_page:

Old | New
--- | ---
youtubePrivacy | enableNoCookieVideoUrl
ytShowRelated | videoShowRelated

tl_content:

Old | New
--- | ---
youtubeFullSize | videoFullSize