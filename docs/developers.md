# Contao Video Bundle Developer Documentation

## Events

### PHP events

Events are fired as symfony events.

Event name                     | Description
------------------------------ | -----------
BeforeRenderPlayer | Customize the video player context before rendering
AfterRenderPlayer | Work with the rendered player buffer before output.

### JavaScript events

Event name | Description
---------- | -----------
huh.video.alertify.onshow | Proxy for alertify onshow event
huh.video.alertify.onfocus | Proxy for alertify onfocus event
huh.video.privacy.accept | User accepted privacy prompt
huh.video.privacy.cancel | User canceled privacy prompt

## Add new video provider

1. Create a video class that extends from `AbstractVideo` and implement the abstract methods.
1. Create a videoprovider template or use the default one.

    ```twig
    {% extends "@HeimrichHannotVideo/videoprovider/videoprovider_default.html.twig" %}
    
    {% block videoplayer %}
       {% if previewImage|default() %}
           <iframe src="about:blank" data-src="{{ src }}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       {% else %}
           <iframe src="{{ src }}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       {% endif %}
    {% endblock %}
    ```
   
1. Add all properties the video may need (typically database/dca fields). For example videoId, autoplay, addPreviewImage, posterSrc
   
1. Implement optional interfaces:
    * `PreviewImageInterface` - Video support preview images
    * `NoCookieUrlInterface` - Videoprovider supports no cookie embedding

1. Add video translations within `huh_video.video.youtube`

1. Register the video class within `huh_video.video_provider.[videoprovider].class`

    Example: 
    
    ```yaml
    huh_video:
      video_provider:
        my_custom_provider:
          class: App\Video\MyCustomProviderVideo
    ```

## Add video support to custom entity

1. Add `DcaFieldGenerator::addSingleLegendPalette($dca)` in your dca config file and add the returned palette where you want. In following example this is done in the dca file, but we recommend to add use this code in the loadDataContainer hook instead, so you have more control over the context (see [our Implementation](../src/EventListener/LoadDataContainerListener.php) as example).

    ```php
    <?php
    // tl_news.php
    $dca = &$GLOBALS['TL_DCA']['tl_news'];
    $palette = \HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator::addSingleLegendPalette($dca);
    $dca['palettes']['default'] = str_replace('{image_legend}', $palette.'{image_legend}', $dca['palettes']['default']);
    ```
   
## Add custom video link texts

Add your wanted translation as [symfony translation](https://symfony.com/doc/3.4/translation.html) withing `huh_video.fields.videoLinkText` key. Example: 

```yaml
# Projekt: app/Resources/translations/messages.en.yml
# Bundle: src/Resources/translations/messages.en.yml
huh_video:
  fields:
    videoLinkText:
      amazing: "Show this amazing video!"
```
    
## Add custom media queries for file system videos
The `name` is optional and is used for better explanation to the backend user
```yaml
huh_video:
    media_queries:
        xxl:
            query: "(min-width: 1200px)"
            name: "Desktop"
```
**Note: Some browsers do not support media-queries on video element, even more it breaks autoplay. So just remove media-queries(it is not mandatory - just let the media-query field empty) from video source, if you want all browsers to autoplay on load.**
