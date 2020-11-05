<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

$GLOBALS['TL_CTE']['media'][\HeimrichHannot\VideoBundle\ContentElement\VideoElement::TYPE] = \HeimrichHannot\VideoBundle\ContentElement\VideoElement::class;

$GLOBALS['TL_HOOKS']['loadDataContainer']['huh_video'] = [\HeimrichHannot\VideoBundle\EventListener\LoadDataContainerListener::class, 'onLoadDataContainer'];
$GLOBALS['TL_HOOKS']['parseArticles'][] = [\HeimrichHannot\VideoBundle\EventListener\ParseArticlesListener::class, 'onParseArticles'];
$GLOBALS['TL_HOOKS']['sqlGetFromDca']['videoBundle'] = [\HeimrichHannot\VideoBundle\EventListener\SqlGetDataListener::class, 'onSqlGetFromDca'];

$GLOBALS['TL_HOOKS']['initializeSystem']['huh_video'] = [\HeimrichHannot\VideoBundle\EventListener\InitializeSystemListener::class, '__invoke'];

if ('BE' === TL_MODE) {
    $GLOBALS['TL_CSS']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.css|static';
    $GLOBALS['TL_JAVASCRIPT']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.js|static';
}
