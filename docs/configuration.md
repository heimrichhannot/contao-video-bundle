# Configuration

```yaml
huh_video:

    # Enable support for news entity.
    enableNewsSupport:    false

    # Enable if by default no cookie embed urls should be used, if supported by the video provider. This can be overwritten on root pages.
    defaultEnableNoCookieVideoUrl: false

    # Enable if by default a privacy message should be displayed before playing the video. This can be overwritten on root pages.
    defaultEnablePrivacyNotice: false
    videoProvider:

        # Prototype
        name:
            class:                ~
    # This is used to be the value key of the media-queries dropdown. Changing this option will cause problems with already set up Videos and assigned media-query settings.
    media_queries:
    
        # Prototype
        value:
            query:                ~
            name:                 ''
```

## Help

* [Contao Configuration](https://docs.contao.org/manual/de/system/einstellungen/#config-yml)
* [Symfony Configuration](https://symfony.com/doc/3.4/configuration.html)