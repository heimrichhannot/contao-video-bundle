<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use Contao\FrontendTemplate;
use Contao\Module;
use HeimrichHannot\VideoBundle\Asset\FrontendAsset;
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
    /**
     * @var FrontendAsset
     */
    private $frontendAsset;

    public function __construct(array $bundleConfig, VideoProviderCollection $videoProviderCollection, VideoGenerator $videoGenerator, FrontendAsset $frontendAsset)
    {
        $this->bundleConfig = $bundleConfig;
        $this->videoProviderCollection = $videoProviderCollection;
        $this->videoGenerator = $videoGenerator;
        $this->frontendAsset = $frontendAsset;
    }

    /**
     * Hook("parseArticles").
     */
    public function onParseArticles(FrontendTemplate $template, array $newsEntry, Module $module): void
    {
        if (!isset($this->bundleConfig['enableNewsSupport']) || true !== $this->bundleConfig['enableNewsSupport']) {
            return;
        }

        /** @var VideoInterface|string $video */
        $video = $this->videoProviderCollection->getVideoByRawDataWithSelector($newsEntry);

        if (!$video) {
            return;
        }

        $template->videoplayer = $this->videoGenerator->generate($video, $module);
        $this->frontendAsset->addFrontendAsset();
    }
}
