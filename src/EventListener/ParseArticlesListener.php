<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use Contao\CoreBundle\ServiceAnnotation\Hook;
use Contao\FrontendTemplate;
use Contao\Module;
use HeimrichHannot\VideoBundle\Asset\FrontendAsset;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use HeimrichHannot\VideoBundle\Video\VideoInterface;

/**
 * @Hook("parseArticles")
 */
class ParseArticlesListener
{
    private array $bundleConfig;
    private VideoProviderCollection $videoProviderCollection;
    private VideoGenerator $videoGenerator;
    private FrontendAsset $frontendAsset;

    public function __construct(array $bundleConfig, VideoProviderCollection $videoProviderCollection, VideoGenerator $videoGenerator, FrontendAsset $frontendAsset)
    {
        $this->bundleConfig = $bundleConfig;
        $this->videoProviderCollection = $videoProviderCollection;
        $this->videoGenerator = $videoGenerator;
        $this->frontendAsset = $frontendAsset;
    }

    public function __invoke(FrontendTemplate $template, array $newsEntry, Module $module): void
    {
        if (!isset($this->bundleConfig['enable_news_support']) || true !== $this->bundleConfig['enable_news_support']) {
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
