<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\EventListener;


use Contao\FrontendTemplate;
use Contao\Module;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use HeimrichHannot\VideoBundle\Video\VideoInterface;

class ParseArticlesListener
{
    /**
     * @var array
     */
    private $bundleConfig;
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;
    /**
     * @var VideoGenerator
     */
    private $videoGenerator;

    public function __construct(array $bundleConfig, VideoProviderCollection $videoProviderCollection, VideoGenerator $videoGenerator)
    {
        $this->bundleConfig = $bundleConfig;
        $this->videoProviderCollection = $videoProviderCollection;
        $this->videoGenerator = $videoGenerator;
    }


    /**
     * Hook("parseArticles")
     */
    public function onParseArticles(FrontendTemplate $template, array $newsEntry, Module $module): void
    {
//        if (!isset($this->bundleConfig['enableNewsSupport']) || true !== $this->bundleConfig['enableNewsSupport']) {
//            return;
//        }

        /** @var VideoInterface|string $video */
        $video = $this->videoProviderCollection->getVideoByRawDataWithSelector($newsEntry);
        if (!$video) {
            return;
        }
        $template->videoplayer = $this->videoGenerator->generate($video, $module);
    }
}