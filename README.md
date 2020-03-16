# Contao Video Bundle

This bundle brings enhanced video embedding support to contao with enhanced privacy options and is the successor of our [YouTube Bundle](https://github.com/heimrichhannot/contao-youtube-bundle). 

## Features
* Support for YouTube and Vimeo as video providers
* Out-of-the-box-usage: 
    * Content Element
    * News
* enhance your users privacy with preview images, privacy notice before playing and no cookie urls
* responsive Videos
* expandable architecture
* [Encore Bundle](https://github.com/heimrichhannot/contao-encore-bundle) support

## Usage

### Setup

1. Setup the configuration to your likes (see [configuration reference](docs/configuration.md) for all options):

    ```yaml
    huh_video:
        # Enable support for news entity.
        enableNewsSupport:    false
        # Enable if by default no cookie embed urls should be used, if supported by the video provider. This can be overwritten on root pages.
        defaultEnableNoCookieVideoUrl: false
        # Enable if by default a privacy message should be displayed before playing the video. This can be overwritten on root pages.
        defaultEnablePrivacyNotice: false
    ```
1. Adjust template settings on root page if needed. You can also overwrite the default configuration there. 

1. Start adding videos as content element or to your news.
    * Content Element: Select "Video" content element
    * News:
        * Check "Add video" in your news item
        * output "videoplayer" variable in your news template

## Documentation

[Developer documentation](docs/developers.md)

[Configuration reference](docs/configuration.md)
 
 
## Acknowledgments

The creation of this bundle and the vimeo integration was supported by [Liebchen+Liebchen GmbH](https://www.lplusl.de/).