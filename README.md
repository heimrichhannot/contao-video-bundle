# Contao Video Bundle
[![](https://img.shields.io/packagist/v/heimrichhannot/contao-video-bundle.svg)](https://packagist.org/packages/heimrichhannot/contao-video-bundle)
[![](https://img.shields.io/packagist/dt/heimrichhannot/contao-video-bundle.svg)](https://packagist.org/packages/heimrichhannot/contao-video-bundle)



This bundle brings enhanced video embedding support to contao with additional privacy options and is the successor of our [YouTube Bundle](https://github.com/heimrichhannot/contao-youtube-bundle). 

## Features
* Support for YouTube and Vimeo as video providers
* Support for Videos from Contao File System
    * integration of multiple sources for one video
    * integration for subtitles
    * integration for madia-queries on video <source> tag
* Out-of-the-box-usage: 
    * Content Element
    * News
* enhance your users privacy with preview images, privacy notice before playing and no cookie urls
* responsive Videos
* expandable architecture
* [Encore Bundle](https://github.com/heimrichhannot/contao-encore-bundle) support
* [List Bundle](https://github.com/heimrichhannot/contao-list-bundle) and [Reader Bundle](https://github.com/heimrichhannot/contao-reader-bundle) support
* Privacy Center Bundle support

## Usage

### Install

Install with contao manager or composer:

    composer require heimrichhannot/contao-video-bundle
    
Update database afterwards.

### Setup

1. Setup the [configuration](https://docs.contao.org/manual/de/system/einstellungen/#config-yml) to your likes (see [configuration reference](docs/configuration.md) for all options):

    ```yaml
    huh_video:
        # Enable support for news entity.
        enable_news_support:    false
        # Enable if by default no cookie embed urls should be used, if supported by the video provider. This can be overwritten on root pages.
        default_use_no_cookie_video_url: false
        # Enable if by default a privacy message should be displayed before playing the video. This can be overwritten on root pages.
        default_display_privacy_notice: false
    ```
1. Clear cache and check for database updates after update your config
1. Adjust template settings on root page if needed. You can also overwrite the default configuration there.
    * If privacy center bundle installed, configure the integration there.

1. Start adding videos as content element or to your news.
    * Content Element: Select "Video" content element
    * News:
        * Check "Add video" in your news item
        * output "videoplayer" variable in your news template


### Customize

#### Add custom video link texts

Add your wanted translation as [symfony translation](https://symfony.com/doc/4.4/translation.html) withing `huh_video.fields.videoLinkText` key. Example:

```yaml
# Projekt: app/Resources/translations/messages.en.yml
# Bundle: src/Resources/translations/messages.en.yml
huh_video:
  fields:
    videoLinkText:
      amazing: "Show this amazing video!"
```

#### Add custom media queries for file system videos

The `name` is optional and is used for better explanation to the backend user
```yaml
huh_video:
    media_queries:
        xxl:
            query: "(min-width: 1200px)"
            name: "Desktop"
```
**Note: Some browsers do not support media-queries on video element, even more it breaks autoplay. So just remove media-queries(it is not mandatory - just let the media-query field empty) from video source, if you want all browsers to autoplay on load.**

### Help

#### IE Support

To make video bundle work in IE, you have to add polyfills:

* https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
* https://developer.mozilla.org/en-US/docs/Web/API/Element/matches


## Documentation

[Developer documentation](docs/developers.md)

[Configuration reference](docs/configuration.md)
 
 
## Acknowledgments

The creation of this bundle and the vimeo integration was supported by [Liebchen+Liebchen GmbH](https://www.lplusl.de/).