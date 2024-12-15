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
use HeimrichHannot\VideoBundle\Video\FileVideo;

class FileVideoMultipleResolution extends FileVideo 
{
    const TYPE = 'file-multiple-resolution';
    const TEMPLATE = '@HeimrichHannotVideo/videoprovider/videoprovider_file_multi_resolution.html.twig';

    /**
     * @var string
     */
    protected $video_id = '';

    /**
     * @var array
     */
    protected $resolutions = [];

    /**
     * @var array 
     */
    protected $files = [];

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

    public function getFiles(): array
    {
        $this->parseVideoSource();
        return $this->files;
    }

    public function getFilesJson(): string 
    {
        return json_encode($this->getFiles());
    }

    public function getResolutionsJson(): string 
    {
        return json_encode($this->getResolutions());
    }

    public function getId(): string
    {
        $this->parseVideoSource();
        return $this->video_id;
    }

    public function getResolutions(): array 
    {
        $this->parseVideoSource();
        return $this->resolutions;
    }
    public function getResolutionsDesc(): array 
    {
        $desc = $this->getResolutions();
        arsort($desc);
        return $desc;
    }
    static public function getFilePathRegExp(): string
    {
        return '~^.*/(.*)_([0-9]*)\..*$~';
    }

    protected function parseVideoSource(): void 
    {
        if(count($this->files) && count($this->resolutions)) {
            return;
        }
        $data = StringUtil::deserialize($this->getRawData()['multiResolutionVideoSRC']);

        if (null === $data) {
            return;
        }        

        $this->files = [];
        $resolutions = [];
        foreach ($data as $i => $file) {
            $fileObject = System::getContainer()->get(ModelUtil::class)->getModelInstanceIfId($file, 'tl_files');
            
            $matches = [];
            if(!preg_match($this->getFilePathRegExp(), $fileObject->path, $matches)) {
                throw new \Exception("File name didn't match expectations, expected for example: file_name_720.mp4");
            }
            if($this->video_id == '') {
                $this->video_id = $matches[1];
            }
            $resolutions[] = intval($matches[2]);
            $this->files[$i] = [
                'path' => $fileObject->path,
                'name' => $fileObject->name,
                'extension' => $fileObject->extension
            ];
        }
        
        $this->resolutions = $resolutions;
        //var_dump($this->files);
    }

}