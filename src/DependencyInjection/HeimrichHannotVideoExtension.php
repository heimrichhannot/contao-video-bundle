<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\DependencyInjection;

use HeimrichHannot\VideoBundle\Video\FileVideo;
use HeimrichHannot\VideoBundle\Video\FileVideoMultipleResolution;
use HeimrichHannot\VideoBundle\Video\RemoteFileVideoMultipleResolution;
use HeimrichHannot\VideoBundle\Video\VimeoVideo;
use HeimrichHannot\VideoBundle\Video\YouTubeVideo;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;

class HeimrichHannotVideoExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $config = $this->deprecatedOptionsMapping($config);

        if (!isset($config['video_provider']['youtube'])) {
            $config['video_provider']['youtube']['class'] = YouTubeVideo::class;
        }

        if (!isset($config['video_provider']['vimeo'])) {
            $config['video_provider']['vimeo']['class'] = VimeoVideo::class;
        }

        if (!isset($config['video_provider']['file'])) {
            $config['video_provider']['file']['class'] = FileVideo::class;
        }

        if(!isset($config['video_provider']['file_multi'])) {
            $config['video_provider']['file_multi']['class'] = FileVideoMultipleResolution::class;
        }

        if(!isset($config['video_provider']['remote_file_multi'])) {
            $config['video_provider']['remote_file_multi']['class'] = RemoteFileVideoMultipleResolution::class;
        }

        // Support deperecated option
        // @todo: remove in version 1.0
        $config['videoProvider'] = $config['video_provider'];

        $container->setParameter('huh_video', $config);
    }

    public function getAlias()
    {
        return 'huh_video';
    }

    /**
     * Support deprecated options.
     *
     * @todo Remove in version 1.0
     */
    protected function deprecatedOptionsMapping(array $config): array
    {
        if (true === $config['enableNewsSupport'] && true !== $config['enable_news_support']) {
            $config['enable_news_support'] = true;
        }
        $config['enableNewsSupport'] = $config['enable_news_support'];

        if (true === $config['defaultEnableNoCookieVideoUrl'] && true !== $config['default_use_no_cookie_video_url']) {
            $config['default_use_no_cookie_video_url'] = true;
        }
        $config['defaultEnableNoCookieVideoUrl'] = $config['default_use_no_cookie_video_url'];

        if (true === $config['defaultEnablePrivacyNotice'] && true !== $config['default_display_privacy_notice']) {
            $config['default_display_privacy_notice'] = true;
        }
        $config['defaultEnablePrivacyNotice'] = $config['default_display_privacy_notice'];

        $config['video_provider'] = array_merge($config['videoProvider'], $config['video_provider']);

        return $config;
    }
}
