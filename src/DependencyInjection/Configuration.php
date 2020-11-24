<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('huh_video');

        $rootNode
            ->children()
                ->booleanNode('enableNewsSupport')->defaultFalse()->setDeprecated('Option was renamed and will be removed in Version 1.0. Use enable_news_support instead.')->end()
            ->booleanNode('defaultEnableNoCookieVideoUrl')->defaultFalse()->setDeprecated('Option was renamed and will be removed in Version 1.0. Use default_use_no_cookie_video_url instead.')->end()
            ->booleanNode('defaultEnablePrivacyNotice')->defaultFalse()->setDeprecated('Option was renamed and will be removed in Version 1.0. Use default_display_privacy_notice instead.')->end()
            ->arrayNode('videoProvider')
                ->useAttributeAsKey('name')
                ->setDeprecated('Option was renamed and will be removed in Version 1.0. Use video_provider instead.')
                ->arrayPrototype()
                    ->children()
                        ->scalarNode('class')->end()
                    ->end()
                ->end()
            ->end()
        ;

        $rootNode
            ->children()
                ->booleanNode('enable_news_support')->defaultFalse()->info('Enable support for news entity. Needs database update after enable.')->end()
                ->booleanNode('default_use_no_cookie_video_url')->defaultFalse()->info('Enable if by default no cookie embed urls should be used, if supported by the video provider. This can be overwritten on root pages.')->end()
                ->booleanNode('default_display_privacy_notice')->defaultFalse()->info('Enable if by default a privacy message should be displayed before playing the video. This can be overwritten on root pages.')->end()
                ->arrayNode('video_provider')
                    ->useAttributeAsKey('name')
                    ->arrayPrototype()
                        ->children()
                            ->scalarNode('class')->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('media_queries')->info('Configure the media queries of the html video-element.')
                    ->useAttributeAsKey('value')->info('This is used to be the value key of the media-queries dropdown. Changing this option will cause problems with already set up Videos and assigned media-query settings.')
                    ->arrayPrototype()
                        ->children()
                            ->scalarNode('query')->end()
                            ->scalarNode('name')->defaultValue('')->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
