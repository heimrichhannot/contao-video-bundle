<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\ContentElement;


use Contao\ContentElement;
use Contao\System;
use HeimrichHannot\VideoBundle\Asset\FrontendAsset;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use HeimrichHannot\VideoBundle\Video\YouTubeVideo;

class VideoElement extends ContentElement
{
    const TYPE = 'huh_video';

    protected $strTemplate = 'ce_video';

    /**
     * @inheritDoc
     */
    protected function compile()
    {

        $video = System::getContainer()->get(VideoProviderCollection::class)->getVideoByRawDataWithSelector($this->objModel->row(), null);
        if ($video) {
            $this->Template->video = System::getContainer()->get(VideoGenerator::class)->generate($video, $this);
            System::getContainer()->get(FrontendAsset::class)->addFrontendAsset();
        }
    }
}