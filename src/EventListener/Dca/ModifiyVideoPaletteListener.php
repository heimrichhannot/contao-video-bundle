<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\EventListener\Dca;


use Contao\ContentModel;
use Contao\DataContainer;
use Contao\Message;
use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\ContentElement\VideoElement;
use HeimrichHannot\VideoBundle\Video\PreviewImageInterface;
use HeimrichHannot\VideoBundle\Video\VideoInterface;

class ModifiyVideoPaletteListener
{
    /**
     * @var ContainerUtil
     */
    private $containerUtil;
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;

    /**
     * ModifiyVideoPaletteListener constructor.
     */
    public function __construct(ContainerUtil $containerUtil, VideoProviderCollection $videoProviderCollection)
    {
        $this->containerUtil = $containerUtil;
        $this->videoProviderCollection = $videoProviderCollection;
    }


    /**
     * @param DataContainer $dataContainer
     */
    public function onLoadCallback($dataContainer)
    {
        if (!$this->containerUtil->isBackend()) {
            return;
        }
        $contentElement = ContentModel::findByPk($dataContainer->id);
        if (!$contentElement || VideoElement::TYPE !== $contentElement->type) {
            return;
        }
        try
        {
            /** @var string|VideoInterface $videoClass */
            $videoClass = $this->videoProviderCollection->getClassByVideoProvider($contentElement->videoProvider);
        } catch (\Exception $e)
        {
            Message::addError($e->getMessage());
            return;
        }
        $dca = &$GLOBALS['TL_DCA'][$dataContainer->table];
        $videoElementPalette = &$dca['palettes'][VideoElement::TYPE];

        $videoProviderFields = $videoClass::getPalette();
        $videoElementPalette = str_replace(
            ',videoProvider',
            ',videoProvider,'.$videoProviderFields,
            $videoElementPalette
        );

        if (is_subclass_of($videoClass, PreviewImageInterface::class)) {
            $videoElementPalette = str_replace(
                '{template_legend',
                '{previewImage_legend},addPreviewImage;{template_legend',
                $videoElementPalette
            );
        }

        return;
    }
}