<?php

$dc = &$GLOBALS['TL_DCA']['tl_content'];

$dc['palettes'][\HeimrichHannot\VideoBundle\ContentElement\VideoElement::TYPE] = '{title_legend},type,name,headline;
	{video_legend},youtube,autoplay,videoDuration,ytHd,ytShowRelated,ytModestBranding,ytShowInfo,youtubeFullsize,youtubeLinkText;
	{text_legend},text;
	{previewImage_legend},addPreviewImage;
	{expert_legend:hide},youtube_template,youtube_modal_template,cssID,space;';