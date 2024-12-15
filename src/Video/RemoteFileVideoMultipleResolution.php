<?php

/*
 * Copyright (c) 2023 Informatik Dienste Dario Rekowski
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

use Contao\StringUtil;
use Contao\System;
use HeimrichHannot\UtilsBundle\File\FileUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Video\FileVideoMultipleResolution;

class RemoteFileVideoMultipleResolution extends FileVideoMultipleResolution 
{
    const TYPE = 'remote-file-multiple-resolution';
    const TEMPLATE = '@HeimrichHannotVideo/videoprovider/videoprovider_file_multi_resolution.html.twig';

   
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
        return 'videoRemoteFile,videoRemoteResolutions,videoSubtitles,videoAlternativeText';
    }

    static public function getFilePathRegExp(): string
    {
        return '~^(https?://.*/(.*))_xxx\.(mp4)$~';
    }

    static public function getResolutionsRegExp(): string 
    {
        return '~^([0-9],? ?)*$~';
    }

    protected function parseVideoSource(): void 
    {
        if(count($this->files) && count($this->resolutions)) {
            return;
        }
        $basicUrl = $this->getRawData()['videoRemoteFile'];
        
        if(!preg_match($this->getResolutionsRegExp(), $this->getRawData()['videoRemoteResolutions'])) {
            throw new \Exception("Resolutions not as expected");
        }
        $this->resolutions = explode(',',$this->getRawData()['videoRemoteResolutions']);
        sort($this->resolutions);

        if (null === $basicUrl || null === $this->resolutions) {
            return;
        }                

        $this->files = [];
        $urlParts = [];
        if(!preg_match($this->getFilePathRegExp(), $basicUrl, $urlParts)) {
            throw new \Exception("File Url not as expected");
        }        

        $this->video_id = $urlParts[2];
        foreach ($this->resolutions as $i => $resolution) {

            $this->files[$i] = [
                'path' => $urlParts[1] . '_' . $resolution . '.' . $urlParts[3],
                'name' => $urlParts[2] . '_' . $resolution,
                'extension' => $urlParts[3]
            ];
        }
    }

}