<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

use HeimrichHannot\VideoBundle\Controller\ContentElement\ExtendedVideoElementController;
use HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener;
use HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator;

$dca = &$GLOBALS['TL_DCA']['tl_content'];

$dca['config']['onload_callback'][] = [ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithLegend'];

$dca['palettes'][ExtendedVideoElementController::TYPE] =
    '{type_legend},type,name,headline;
	{video_legend},videoProvider;
	{player_legend},videoFullsize,videoAutoplay,videoRemoveControls,videoLoop;
	{text_legend:hide},text;
	{template_legend:hide},customTpl;
	{protected_legend:hide},protected;
	{expert_legend:hide},cssID,space;
	{invisible_legend:hide},invisible,start,stop;';

DcaFieldGenerator::addSubpalettes($dca);

/**
 * Fields.
 */
$arrFields = DcaFieldGenerator::getVideoFields();

$dca['fields'] = array_merge($dca['fields'], $arrFields);
