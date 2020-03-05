# Contao Video Bundle Developer Documentation

## Events

Event name                     | Description
------------------------------ | -----------
huh.video.before_render_player | Customize the video player context before rendering

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

1. Register the video class within `huh_video.videoProvider.[videoprovider].class`