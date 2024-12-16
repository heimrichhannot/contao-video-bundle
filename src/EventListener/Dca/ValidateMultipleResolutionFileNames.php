<?php

namespace HeimrichHannot\VideoBundle\EventListener\Dca;

use Contao\CoreBundle\ServiceAnnotation\Callback;
use Contao\DataContainer;
use Contao\StringUtil;
use Contao\System;
use HeimrichHannot\VideoBundle\Video\FileVideoMultipleResolution;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;

/**
 * @Callback(table="tl_content", target="fields.multiResolutionVideoSRC.save")
 */
class ValidateMultipleResolutionFileNames
{
    public function __invoke($value, DataContainer $dc)
    {
        $files = StringUtil::deserialize($value);
        foreach($files as $file) {
            $fileObject = System::getContainer()->get(ModelUtil::class)->getModelInstanceIfId($file, 'tl_files');
            if(!preg_match(FileVideoMultipleResolution::getFilePathRegExp(), $fileObject->path)) {
                throw new \Exception("File name didn't match expectations, expected for example: file_name_720.mp4");
            }
        }
        
        return $value;
    }
}