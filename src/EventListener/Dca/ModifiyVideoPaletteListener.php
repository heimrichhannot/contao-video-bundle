<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener\Dca;

use Contao\DataContainer;
use Contao\Message;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Video\PreviewImageInterface;
use HeimrichHannot\VideoBundle\Video\VideoInterface;

class ModifiyVideoPaletteListener
{
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;

    /**
     * ModifiyVideoPaletteListener constructor.
     */
    public function __construct(VideoProviderCollection $videoProviderCollection, private readonly Utils $utils)
    {
        $this->videoProviderCollection = $videoProviderCollection;
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
        if (!$this->utils->container()->isBackend()) {
            return;
        }

        if (false === strpos($dataContainer->getPalette(), 'videoProvider')) {
            return;
        }
        $model = $this->utils->model()->findModelInstanceByPk($dataContainer->table, $dataContainer->id);

        if (!isset($model->videoProvider)) {
            return;
        }

        try {
            /** @var string|VideoInterface $videoClass */
            $videoClass = $this->videoProviderCollection->getClassByVideoProvider($model->videoProvider);
        } catch (\Exception $e) {
            Message::addError($e->getMessage());

            return;
        }

        $isSubpalette = false;

        if (false !== strpos($dataContainer->getPalette(), 'addVideo')) {
            $isSubpalette = true;
        }

        $this->updatePalette($dataContainer->table, $videoClass, $withoutLegend, $isSubpalette);
    }

    /**
     * @param string|VideoInterface $videoClass
     *
     * @return array
     */
    protected function updatePalette(string $table, string $videoClass, bool $noLegend = false, bool $isSubpalette = false): void
    {
        $dca = &$GLOBALS['TL_DCA'][$table];

        $videoProviderFields = $videoClass::getPalette();

        $addPreviewImageFields = is_subclass_of($videoClass, PreviewImageInterface::class);

        if ($isSubpalette) {
            $palette = $dca['subpalettes']['addVideo'];
            $palette = str_replace(
                'videoProvider',
                'videoProvider,'.$videoProviderFields,
                $palette
            );

            if ($addPreviewImageFields) {
                $position = 'videoFullsize,videoAutoplay';
                $previewPalette = ',addPreviewImage';
                $palette = str_replace(
                    $position,
                    $position.$previewPalette,
                    $palette
                );
            }
            $dca['subpalettes']['addVideo'] = $palette;
        } else {
            foreach ($dca['palettes'] as $paletteName => $palette) {
                if (\is_array($palette)) {
                    continue;
                }

                $palette = str_replace(
                    ',videoProvider',
                    ',videoProvider,'.$videoProviderFields,
                    $palette
                );

                if ($addPreviewImageFields) {
                    if ($noLegend) {
                        $palette = str_replace('videoFullsize,videoAutoplay', 'videoFullsize,videoAutoplay,addPreviewImage', $palette);
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
