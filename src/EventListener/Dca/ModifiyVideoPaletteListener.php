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
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
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
     * @var ModelUtil
     */
    private $modelUtil;

    /**
     * ModifiyVideoPaletteListener constructor.
     */
    public function __construct(ContainerUtil $containerUtil, ModelUtil $modelUtil, VideoProviderCollection $videoProviderCollection)
    {
        $this->containerUtil = $containerUtil;
        $this->videoProviderCollection = $videoProviderCollection;
        $this->modelUtil = $modelUtil;
    }


    /**
     * @param DataContainer $dataContainer
     */
    public function updateVideoPaletteWithLegend($dataContainer)
    {
        $this->updateVideoPalette($dataContainer);
    }

    /**
     * @param DataContainer $dataContainer
     */
    public function updateVideoPaletteWithoutLegend($dataContainer)
    {
        $this->updateVideoPalette($dataContainer, true);
    }

    protected function updateVideoPalette($dataContainer, bool $withoutLegend = false)
    {
        if (!$this->containerUtil->isBackend()) {
            return;
        }
        if (false === strpos($dataContainer->getPalette(), 'videoProvider')) {
            return;
        }
        $model = $this->modelUtil->findModelInstanceByPk($dataContainer->table, $dataContainer->id);
        if (!isset($model->videoProvider)) {
            return;
        }
        try
        {
            /** @var string|VideoInterface $videoClass */
            $videoClass = $this->videoProviderCollection->getClassByVideoProvider($model->videoProvider);
        } catch (\Exception $e)
        {
            Message::addError($e->getMessage());
            return;
        }

        $isSubpalette = false;
        if (false !== strpos($dataContainer->getPalette(), 'addVideo')) {
            $isSubpalette = true;
        }

        $this->updatePalette($dataContainer->table, $videoClass, $withoutLegend, $isSubpalette);

        return;
    }

    /**
     * @param string $table
     * @param string|VideoInterface $videoClass
     * @return array
     */
    protected function updatePalette(string $table, string $videoClass, bool $noLegend = false, bool $isSubpalette = false): void
    {
        $dca = &$GLOBALS['TL_DCA'][$table];

        $dca['palettes']['__selector__'][]                   = 'fullsize';
        $dca['subpalettes']['fullsize']                      = 'videoLinkText';
        $dca['fields']['fullsize']['label']                  = &$GLOBALS['TL_LANG']['tl_content']['videoFullSize'];
        $dca['fields']['fullsize']['eval']['submitOnChange'] = 'videoLinkText';

        $videoProviderFields = $videoClass::getPalette();

        $addPreviewImageFields = is_subclass_of($videoClass, PreviewImageInterface::class);

        if ($isSubpalette) {
            $palette = $dca['subpalettes']['addVideo'];
            $palette = str_replace(
                'videoProvider',
                'videoProvider,' . $videoProviderFields,
                $palette
            );

            if ($addPreviewImageFields) {
                $position = 'fullsize,autoplay';
                $previewPalette = ',addPreviewImage';
                $palette = str_replace(
                    $position,
                    $position.$previewPalette,
                    $palette
                );
            }
            $dca['subpalettes']['addVideo'] = $palette;
        } else {
            foreach ($dca['palettes'] as $paletteName => $palette)
            {
                if (is_array($palette)) {
                    continue;
                }

                $palette = str_replace(
                    ',videoProvider',
                    ',videoProvider,' . $videoProviderFields,
                    $palette
                );

                if ($addPreviewImageFields) {
                    if ($noLegend) {
                        $palette = str_replace('fullsize,autoplay','fullsize,autoplay,addPreviewImage',$palette);
                    } else {
                        $palette = str_replace(
                            '{template_legend',
                            '{previewImage_legend},addPreviewImage;{template_legend',
                            $palette
                        );
                    }
                }
                $dca['palettes'][$paletteName] = $palette;
            }
        }
    }
}