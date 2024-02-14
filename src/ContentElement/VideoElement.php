<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\ContentElement;

use Contao\BackendTemplate;
use Contao\ContentElement;
use Contao\System;
use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\Asset\FrontendAsset;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Controller\ContentElement\ExtendedVideoElementController;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use Twig\Error\LoaderError;

/**
 * @deprecated
 */
class VideoElement extends ContentElement
{
    const TYPE = 'huh_video';

    protected $strTemplate = 'ce_video';

    /**
     * @var string|null
     */
    protected $videoBuffer;

    public function generate()
    {
        /** @noinspection PhpDeprecationInspection */
        trigger_deprecation(
            'heimrichhannot/contao-video-bundle',
            '1.7.0',
            'Using %s has been deprecated and will no longer be supported in version 3.0. Use %s instead.',
            VideoElement::class,
            ExtendedVideoElementController::class
        );

        $video = System::getContainer()->get(VideoProviderCollection::class)->getVideoByRawDataWithSelector($this->objModel->row(), null);

        if ($video) {
            try {
                $this->videoBuffer = System::getContainer()->get(VideoGenerator::class)->generate($video, $this);
            } catch (LoaderError $e) {
                if (System::getContainer()->get(Utils::class)->container()->isBackend()) {
                    $this->videoBuffer = '<span style="color:red">'.$e->getMessage().' Please verify template settings in root page.</span>';
                } else {
                    throw $e;
                }
            }
        }

        if (TL_MODE == 'BE') {
            $objTemplate = new BackendTemplate('be_wildcard');
            $objTemplate->title = $this->headline;

            $objTemplate->wildcard = $this->videoBuffer;

            return $objTemplate->parse();
        }

        return parent::generate();
    }

    /**
     * {@inheritdoc}
     */
    protected function compile()
    {
        if ($this->videoBuffer) {
            $this->Template->video = $this->videoBuffer;
            System::getContainer()->get(FrontendAsset::class)->addFrontendAsset();
        }
    }
}
