# Changelog
All notable changes to this project will be documented in this file.

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

