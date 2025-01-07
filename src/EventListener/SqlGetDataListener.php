<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use HeimrichHannot\MultiColumnEditorBundle\HeimrichHannotContaoMultiColumnEditorBundle;
use Contao\CoreBundle\ServiceAnnotation\Hook;

/**
 * @Hook("sqlGetFromDca")
 */
class SqlGetDataListener
{
    private array $bundleConfig;

    public function __construct(array $bundleConfig)
    {
        $this->bundleConfig = $bundleConfig;
    }

    public function __invoke($sqlDcaData)
    {
        return $this->enablePrivacyCenterSupport($sqlDcaData);
    }

    protected function enablePrivacyCenterSupport($sqlDcaData)
    {
        if (!class_exists('HeimrichHannot\PrivacyCenterBundle\HeimrichHannotPrivacyCenterBundle')) {
            return $sqlDcaData;
        }

        if (!class_exists(HeimrichHannotContaoMultiColumnEditorBundle::class)) {
            trigger_error(
                'HeimrichHannotContaoMultiColumnEditorBundle not found. Multi Column Editor bundle is needed for privacy center integration.',
                \E_USER_WARNING);

            return $sqlDcaData;
        }

        $sqlDcaData['tl_page']['TABLE_FIELDS']['usePrivacyCenter'] = "`usePrivacyCenter` char(1) NOT NULL default ''";
        $sqlDcaData['tl_page']['TABLE_FIELDS']['privacyCenterLocalStorageAttribute'] = '`privacyCenterLocalStorageAttribute` blob NULL';

        return $sqlDcaData;
    }
}
