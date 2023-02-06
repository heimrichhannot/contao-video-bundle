<?php

/*
 * Copyright (c) 2023 Informatik Dienste Dario Rekowski
 *
 * @license LGPL-3.0-or-later
 */

namespace einhornimmond\VideoBundle\Video;

use Contao\StringUtil;
use Contao\System;
use HeimrichHannot\UtilsBundle\File\FileUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Video\FileVideo;

class FileVideoMultipleResolution extends FileVideo 
{
    const TYPE = 'file-multiple-resolution';
    const TEMPLATE = '@HeimrichHannotVideo/videoprovider/videoprovider_file.html.twig';

    /**
     * {@inheritdoc}
     */
    public static function getType(): string
    {
        return self::TYPE;
    }

    /**
     * {@inheritdoc}
     */
    public static function getTemplate(): string
    {
        return self::TEMPLATE;
    }

    /**
     * {@inheritdoc}
     */
    public static function getPalette(): string
    {
        return 'multiResolutionVideoSRC,videoSubtitles,videoAlternativeText';
    }
}