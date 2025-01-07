<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\DependencyInjection;

use HeimrichHannot\VideoBundle\Video\FileVideo;
use HeimrichHannot\VideoBundle\Video\VimeoVideo;
use HeimrichHannot\VideoBundle\Video\YouTubeVideo;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;

class HeimrichHannotVideoExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container): void
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        if (!isset($config['video_provider']['youtube'])) {
            $config['video_provider']['youtube']['class'] = YouTubeVideo::class;
        }

        if (!isset($config['video_provider']['vimeo'])) {
            $config['video_provider']['vimeo']['class'] = VimeoVideo::class;
        }

        if (!isset($config['video_provider']['file'])) {
            $config['video_provider']['file']['class'] = FileVideo::class;
        }

        $container->setParameter('huh_video', $config);
    }

    public function getAlias(): string
    {
        return 'huh_video';
    }
}
