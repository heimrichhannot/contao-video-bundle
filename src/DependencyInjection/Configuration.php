<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\DependencyInjection;


use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{

    /**
     * @inheritDoc
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('huh_video');
        $rootNode
            ->children()
                ->booleanNode("enableNewsSupport")->defaultFalse()->end()
                ->arrayNode("supportedTables")
                ->useAttributeAsKey("name")
                    ->arrayPrototype()
                        ->children()
                            ->booleanNode("multipleLegends")->defaultFalse()->info("If true, fields will be shown in multiple legends instead of one.")->end()
                            ->arrayNode('palettes')
                                ->arrayPrototype()
                                    ->children()
                                        ->scalarNode('name')->end()
                                        ->scalarNode("videoLegendSelector")->defaultValue('{image_legend}')->end()
                                        ->enumNode("videoLegendSelectorPosition")->values(['before','after'])->defaultValue('before')->end()
                                    ->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
                ->booleanNode("defaultEnableNoCookieVideoUrl")->defaultFalse()->info("Enable if by default no cookie embed urls should be used, if supported by the video provider. This can be overwritten on root pages.")->end()
                ->booleanNode("defaultEnablePrivacyNotice")->defaultFalse()->info("Enable if by default a privacy message should be displayed before playing the video. This can be overwritten on root pages.")->end()
                ->arrayNode('videoProvider')
                    ->useAttributeAsKey("name")
                    ->arrayPrototype()
                        ->children()
                            ->scalarNode('class')->end()
                            ->arrayNode("configuration")
                                ->useAttributeAsKey("name")
                                ->defaultValue([])
                                ->scalarPrototype()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()

            ->end();
        return $treeBuilder;
    }
}