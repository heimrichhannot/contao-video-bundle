<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

$dca = &$GLOBALS['TL_DCA']['tl_content'];

$dca['config']['onload_callback'][] = [\HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithLegend'];

$dca['palettes'][\HeimrichHannot\VideoBundle\ContentElement\VideoElement::TYPE] =
    '{type_legend},type,name,headline;
	{video_legend},videoProvider;
	{player_legend},videoFullsize,videoAutoplay,videoRemoveControls,videoLoop;
	{template_legend:hide},customTpl;
	{protected_legend:hide},protected;
	{expert_legend:hide},cssID,space;
	{invisible_legend:hide},invisible,start,stop;';

\HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator::addSubpalettes($dca);

/**
 * Fields.
 */
$arrFields = \HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator::getVideoFields();

$dca['fields'] = array_merge($dca['fields'], $arrFields);
