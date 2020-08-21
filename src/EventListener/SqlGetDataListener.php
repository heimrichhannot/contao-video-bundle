<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

class SqlGetDataListener
{
    /**
     * @var array
     */
    private $bundleConfig;

    /**
     * LoadDataContainerListener constructor.
     */
    public function __construct(array $bundleConfig)
    {
        $this->bundleConfig = $bundleConfig;
    }

    /**
     * Hook loadDataContainer.
     */
    public function onSqlGetFromDca($sqlDcaData)
    {
        return $this->preparePageTable($sqlDcaData);
    }

    protected function preparePageTable($sqlDcaData)
    {
        return $this->enablePrivacyCenterSupport($sqlDcaData);
    }

    protected function enablePrivacyCenterSupport($sqlDcaData)
    {
        if (!class_exists('HeimrichHannot\PrivacyCenterBundle\HeimrichHannotPrivacyCenterBundle')) {
            return $sqlDcaData;
        }

        if (!class_exists('HeimrichHannot\MultiColumnEditorBundle\HeimrichHannotContaoMultiColumnEditorBundle')) {
            trigger_error(
                'HeimrichHannotContaoMultiColumnEditorBundle not found. Multi Column Editor bundle is needed for privacy center integration.',
                E_USER_WARNING);

            return $sqlDcaData;
        }

        $sqlDcaData['tl_page']['TABLE_FIELDS']['usePrivacyCenter'] = "`usePrivacyCenter` char(1) NOT NULL default ''";
        $sqlDcaData['tl_page']['TABLE_FIELDS']['privacyCenterLocalStorageAttribute'] = '`privacyCenterLocalStorageAttribute` blob NULL';

        return $sqlDcaData;
    }
}
