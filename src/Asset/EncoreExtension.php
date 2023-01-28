<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Asset;

use HeimrichHannot\EncoreContracts\EncoreEntry;
use HeimrichHannot\EncoreContracts\EncoreExtensionInterface;
use HeimrichHannot\VideoBundle\HeimrichHannotVideoBundle;

class EncoreExtension implements EncoreExtensionInterface
{
    public function getBundle(): string
    {
        return HeimrichHannotVideoBundle::class;
    }

    public function getEntries(): array
    {
        return [
            EncoreEntry::create('contao-video-bundle', 'src/Resources/assets/js/contao-video-bundle.js')
                ->addJsEntryToRemoveFromGlobals('alertifyjs')
                ->addJsEntryToRemoveFromGlobals('contao-video-bundle'),
            EncoreEntry::create('contao-video-bundle-theme', 'src/Resources/assets/js/contao-video-bundle-theme.js')
                ->setRequiresCss(true)
                ->addCssEntryToRemoveFromGlobals('alertifyjs')
                ->addCssEntryToRemoveFromGlobals('contao-video-bundle'),
        ];
    }
}
