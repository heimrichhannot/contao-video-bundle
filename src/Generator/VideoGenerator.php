<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Generator;


use Contao\FilesModel;
use Contao\System;
use HeimrichHannot\UtilsBundle\Image\ImageUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Video\PreviewImageInterface;
use HeimrichHannot\VideoBundle\Video\VideoInterface;
use Twig\Environment;

class VideoGenerator
{
    /**
     * @var Environment
     */
    private $twig;
    /**
     * @var ModelUtil
     */
    private $modelUtil;
    /**
     * @var ImageUtil
     */
    private $imageUtil;


    /**
     * VideoGenerator constructor.
     */
    public function __construct(Environment $twig, ModelUtil $modelUtil, ImageUtil $imageUtil)
    {
        $this->twig = $twig;
        $this->modelUtil = $modelUtil;
        $this->imageUtil = $imageUtil;
    }

    public function generate(VideoInterface $video): string
    {
        $context = [];
        $context = $video->getData();
        if ($video instanceof PreviewImageInterface)
        {
            $this->generatePreviewImage($video, $context);
        }

        $context['videoplayer'] = $this->twig->render($video->getTemplate(), $context);
        return $this->twig->render('@HeimrichHannotVideo/wrapper/videowrapper_default.html.twig', $context);
    }

    public function generatePreviewImage(PreviewImageInterface $video, array &$context): void
    {
        if (!$video->hasPreviewImage()) {
            unset($context['previewImage']);
            return;
        }

        /** @var FilesModel $imageModel */
        $imageModel = $this->modelUtil->findModelInstancesBy('tl_files', 'uuid', $video->getPreviewImage());

        //TODO: Load image from external source

        if (!$imageModel) {
            unset($context['previewImage']);
            return;
        }

        $imageData = [];
        $this->imageUtil->addToTemplateData(
            'singleSRC',
            'addImage',
            $imageData,
            [
                'singleSRC' => $imageModel->path,
                'addImage' => true,
//                'size' => $this->getConfig()->getSize(),
//                'alt' => $this->getConfig()->getYoutube(),
            ]
        );
        $context['previewImage'] = $imageData;
    }
}