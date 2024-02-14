# Changelog

All notable changes to this project will be documented in this file.

## [1.7.0] - 2024-02-14
- Added: migration command to migration from youtube bundle ([#19])
- Changed: refactored content element to controller ([#19])
- Changed: added text field to video content element ([#19])
- Fixed: some deprecations ([#19])
- Deprecated: old content element class ([#19])

## [1.6.0] - 2023-12-22
- Changed: refactored list- and readerbundle integration to ConfigElementType
- Fixed: hard dependency to contao/list-bundle and contao/reader-bundle is osme 

## [1.5.0] - 2023-09-13
- Added: missing license file
- Changed: refactored hooks to current contao standard
- Fixed: issues with hook ordering

## [1.4.0] - 2023-08-23
- Added: support for additional url parameter for vimeo ([#18], [@zonky2])

## [1.3.1] - 2023-05-08
- Fixed: generate content element in backend 

## [1.3.0] - 2023-01-23
- Added: encore contracts support ([#16])

## [1.2.0] - 2023-01-18
- Added: ExternalElementInterface ([#15])
- Changed: [Attention!] added data attributes variable to wrapper elements. Please adjust your custom templates. ([#15])
- Changed: refactored js code ([#15])
- Fixed: compatibility issues with contao 4.13 ([#15])
- Fixed: palette issues in tl_page and tl_content ([#15])
- Fixed: warning with php 8 ([#15])

## [1.1.1] - 2022-09-16
- Added: iframe aria-labels

## [1.1.0] - 2022-09-08
- Changed: refactored privacy center integration
- Changed: minumum php version is now 7.4
- Changed: minumum contao version is now 4.9

## [1.0.7] - 2022-08-15
- Changed: update non encore assets
- Fixed: removed debug output

## [1.0.6] - 2022-08-02
- Fixed: differentiate html and iframe js

## [1.0.5] - 2022-07-22
- Added: export js module

## [1.0.4] - 2022-06-29
- Fixed: added missing multi column editor dependency

## [1.0.3] - 2022-05-18
- Fixed: remove debug logs

## [1.0.2] - 2022-05-17
- Fixed: focus only after unlock video

## [1.0.1] - 2022-05-17
- Updated: production assets

## [1.0.0] - 2022-05-16
- Changed: drop symfony 3 support
- Changed: refactoring
- Added: focus on video element after confirming protected code

## [0.12.0] - 2022-05-16
- Updated: symfony/http-kernel dep up to 5.4

## [0.11.5] - 2022-04-13
- Added: reset iframe on video toggle

## [0.11.4] - 2022-03-28
- Added: video toggle for transcripted video and its live region

## [0.11.3] - 2021-11-10
- Changed: removed mandatory attribute from htmlVideo mediaquery field
- Fixed: Added play-button to htmlVideo

## [0.11.2] - 2021-10-28
- Fixed: filevideos not to be applied to privacy center overlay and acceptance

## [0.11.1] - 2021-07-27

- fixed issue in references in translations

## [0.11.0] - 2021-06-29

- added Polish translations

## [0.10.4] - 2021-06-23

- added 'playsinline' attribute to autoplay settings, to autoplay videos on mobile devices

## [0.10.3] - 2021-05-19

- fixed js code to cause errors on wrong preview image configuration

## [0.10.2] - 2021-05-19

- extended FileVideo with looping and controls

## [0.10.1] - 2021-03-27

- fixed issue if preview image and play-button set

## [0.10.0] - 2021-03-10

- allow php 8 (experimental)
- fixed issue if no preview image set

## [0.9.1] - 2021-03-02

- fixed previewImage

## [0.9.0] - 2020-11-24

- added support for alternative text (#5)

## [0.8.2] - 2020-11-19

- added event after video initialization

## [0.8.1] - 2020-11-17

- fixed adding of video fields for non content entities

## [0.8.0] - 2020-10-28

- add file video type (#3)
- updated README

## [0.7.2] - 2020-10-20

- added `type` to play-button class

## [0.7.1] - 2020-10-20

- removed play-button span description
- added aria-label to play-button

## [0.7.0] - 2020-10-20

- modified play button to be actual html button
- added sr-only text to play-button

## [0.6.0] - 2020-09-01

- updated build dependencies and configuration
- enhanced ie support
- added template comments when in dev mode

## [0.5.4] - 2020-08-27

- fixed configuration not correctly applied to youtube embed uri

## [0.5.3] - 2020-08-26

- fixed js issue

## [0.5.2] - 2020-08-21

- fixed sql issue for contao 4.9

## [0.5.1] - 2020-08-19

- added php_cs fixer

## [0.5.0] - 2020-08-19

- fixed support for privacy center

## [0.4.0] - 2020-07-21

- added list and reader config elements

## [0.3.2] - 2020-06-19

- added raw filter to privacy template checkbox field, to allow addition to html links

## [0.3.1] - 2020-06-17

- fix exception in backend when template not found
- fix wrong return value notation in VideoProviderCollection::getVideoByRawDataWithSelector()

## [0.3.0] - 2020-06-16

- made BeforeRenderPlayer event usable
- added AfterRenderPlayer event
- moved privacy center integration into event subscriber
- add privacy center fields only if privacy center is installed
- fixed autowire exception when privacy center is not installed
- removed multicolumneditor dependency as it is only needed when using together with privacy center

## [0.2.2] - 2020-06-16

- modified privacy-center integration class

## [0.2.1] - 2020-06-16

- fixed fullsize template fallback not working when no template set in root page

## [0.2.0] - 2020-06-16

- added privacy-center intergration

## [0.1.3] - 2020-06-16

- fixed privacy template fallback not working when no template set in root page

## [0.1.2] - 2020-06-04

- removed duplicate js code
- added tabindex to video-wrapper and play-button elements to prevent scrolling to top when closing privacy dialog

## [0.1.1] - 2020-06-02

- removed unused field 'text' from tl_content dca

## [0.1.0] - 2020-03-16

Initial version


[#15]: https://github.com/heimrichhannot/contao-video-bundle/pull/15
[#16]: https://github.com/heimrichhannot/contao-video-bundle/pull/16
[#18]: https://github.com/heimrichhannot/contao-video-bundle/pull/18
[#19]: https://github.com/heimrichhannot/contao-video-bundle/pull/19

[@zonky2]: https://github.com/zonky2
