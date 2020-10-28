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
                ->booleanNode('enableNewsSupport')->defaultFalse()->info('Enable support for news entity. Needs database update after enable.')->end()
                ->booleanNode('defaultEnableNoCookieVideoUrl')->defaultFalse()->info('Enable if by default no cookie embed urls should be used, if supported by the video provider. This can be overwritten on root pages.')->end()
                ->booleanNode('defaultEnablePrivacyNotice')->defaultFalse()->info('Enable if by default a privacy message should be displayed before playing the video. This can be overwritten on root pages.')->end()
                ->arrayNode('videoProvider')
                    ->useAttributeAsKey('name')
                    ->arrayPrototype()
                        ->children()
                            ->scalarNode('class')->end()
//                            ->arrayNode("configuration")
//                                ->useAttributeAsKey("name")
//                                ->defaultValue([])
//                                ->scalarPrototype()->end()
//                            ->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('video_media_queries')
                    ->useAttributeAsKey('name')
                    ->arrayPrototype()
                        ->children()
                            ->scalarNode('query')->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
