(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["alertify"],{

/***/ "./node_modules/alertifyjs/build/alertify.js":
/*!***************************************************!*\
  !*** ./node_modules/alertifyjs/build/alertify.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * alertifyjs 1.13.1 http://alertifyjs.com
 * AlertifyJS is a javascript framework for developing pretty browser dialogs and notifications.
 * Copyright 2019 Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) 
 * Licensed under GPL 3 <https://opensource.org/licenses/gpl-3.0>*/
( function ( window ) {
    'use strict';
    var NOT_DISABLED_NOT_RESET = ':not(:disabled):not(.ajs-reset)';
    /**
     * Keys enum
     * @type {Object}
     */
    var keys = {
        ENTER: 13,
        ESC: 27,
        F1: 112,
        F12: 123,
        LEFT: 37,
        RIGHT: 39,
        TAB: 9
    };
    /**
     * Default options 
     * @type {Object}
     */
    var defaults = {
        autoReset:true,
        basic:false,
        closable:true,
        closableByDimmer:true,
        invokeOnCloseOff:false,
        frameless:false,
        defaultFocusOff:false,
        maintainFocus:true, //global default not per instance, applies to all dialogs
        maximizable:true,
        modal:true,
        movable:true,
        moveBounded:false,
        overflow:true,
        padding: true,
        pinnable:true,
        pinned:true,
        preventBodyShift:false, //global default not per instance, applies to all dialogs
        resizable:true,
        startMaximized:false,
        transition:'pulse',
        transitionOff:false,
        tabbable:['button', '[href]', 'input', 'select', 'textarea', '[tabindex]:not([tabindex^="-"])'+NOT_DISABLED_NOT_RESET].join(NOT_DISABLED_NOT_RESET+','),//global
        notifier:{
            delay:5,
            position:'bottom-right',
            closeButton:false,
            classes: {
                base: 'alertify-notifier',
                prefix:'ajs-',
                message: 'ajs-message',
                top: 'ajs-top',
                right: 'ajs-right',
                bottom: 'ajs-bottom',
                left: 'ajs-left',
                center: 'ajs-center',
                visible: 'ajs-visible',
                hidden: 'ajs-hidden',
                close: 'ajs-close'
            }
        },
        glossary:{
            title:'AlertifyJS',
            ok: 'OK',
            cancel: 'Cancel',
            acccpt: 'Accept',
            deny: 'Deny',
            confirm: 'Confirm',
            decline: 'Decline',
            close: 'Close',
            maximize: 'Maximize',
            restore: 'Restore',
        },
        theme:{
            input:'ajs-input',
            ok:'ajs-ok',
            cancel:'ajs-cancel',
        },
        hooks:{
            preinit:function(){},
            postinit:function(){}
        }
    };
    
    //holds open dialogs instances
    var openDialogs = [];

    /**
     * [Helper]  Adds the specified class(es) to the element.
     *
     * @element {node}      The element
     * @className {string}  One or more space-separated classes to be added to the class attribute of the element.
     * 
     * @return {undefined}
     */
    function addClass(element,classNames){
        element.className += ' ' + classNames;
    }
    
    /**
     * [Helper]  Removes the specified class(es) from the element.
     *
     * @element {node}      The element
     * @className {string}  One or more space-separated classes to be removed from the class attribute of the element.
     * 
     * @return {undefined}
     */
    function removeClass(element, classNames) {
        var original = element.className.split(' ');
        var toBeRemoved = classNames.split(' ');
        for (var x = 0; x < toBeRemoved.length; x += 1) {
            var index = original.indexOf(toBeRemoved[x]);
            if (index > -1){
                original.splice(index,1);
            }
        }
        element.className = original.join(' ');
    }

    /**
     * [Helper]  Checks if the document is RTL
     *
     * @return {Boolean} True if the document is RTL, false otherwise.
     */
    function isRightToLeft(){
        return window.getComputedStyle(document.body).direction === 'rtl';
    }
    /**
     * [Helper]  Get the document current scrollTop
     *
     * @return {Number} current document scrollTop value
     */
    function getScrollTop(){
        return ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
    }

    /**
     * [Helper]  Get the document current scrollLeft
     *
     * @return {Number} current document scrollLeft value
     */
    function getScrollLeft(){
        return ((document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft);
    }

    /**
    * Helper: clear contents
    *
    */
    function clearContents(element){
        while (element.lastChild) {
            element.removeChild(element.lastChild);
        }
    }
    /**
     * Extends a given prototype by merging properties from base into sub.
     *
     * @sub {Object} sub The prototype being overwritten.
     * @base {Object} base The prototype being written.
     *
     * @return {Object} The extended prototype.
     */
    function copy(src) {
        if(null === src){
            return src;
        }
        var cpy;
        if(Array.isArray(src)){
            cpy = [];
            for(var x=0;x<src.length;x+=1){
                cpy.push(copy(src[x]));
            }
            return cpy;
        }
      
        if(src instanceof Date){
            return new Date(src.getTime());
        }
      
        if(src instanceof RegExp){
            cpy = new RegExp(src.source);
            cpy.global = src.global;
            cpy.ignoreCase = src.ignoreCase;
            cpy.multiline = src.multiline;
            cpy.lastIndex = src.lastIndex;
            return cpy;
        }
        
        if(typeof src === 'object'){
            cpy = {};
            // copy dialog pototype over definition.
            for (var prop in src) {
                if (src.hasOwnProperty(prop)) {
                    cpy[prop] = copy(src[prop]);
                }
            }
            return cpy;
        }
        return src;
    }
    /**
      * Helper: destruct the dialog
      *
      */
    function destruct(instance, initialize){
        if(instance.elements){
            //delete the dom and it's references.
            var root = instance.elements.root;
            root.parentNode.removeChild(root);
            delete instance.elements;
            //copy back initial settings.
            instance.settings = copy(instance.__settings);
            //re-reference init function.
            instance.__init = initialize;
            //delete __internal variable to allow re-initialization.
            delete instance.__internal;
        }
    }

    /**
     * Test to check if passive event listeners are supported.
     */
    var IsPassiveSupported = false;
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                IsPassiveSupported = true;
            }
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    } catch (e) {}

     /**
     * Removes an event listener
     *
     * @param {HTMLElement} el The EventTarget to register the listenr on.
     * @param {string} event The event type to listen for.
     * @param {Function} handler The function to handle the event.
     * @param {boolean} useCapture Specifices if the event to be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     * @param {boolean} passive A Boolean which, if true, indicates that the function specified by listener will never call preventDefault().
     */
    var on = function (el, event, fn, useCapture, passive) {
        el.addEventListener(event, fn, IsPassiveSupported ? { capture: useCapture, passive: passive } : useCapture === true);
    };

    /**
     * Removes an event listener
     *
     * @param {HTMLElement} el The EventTarget to unregister the listenr from.
     * @param {string} event The event type to remove.
     * @param {Function} fn The event handler to remove.
     * @param {boolean} useCapture Specifices if the event to be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     * @param {boolean} passive A Boolean which, if true, indicates that the function specified by listener will never call preventDefault().
     */
    var off = function (el, event, fn, useCapture, passive) {
        el.removeEventListener(event, fn, IsPassiveSupported ? { capture: useCapture, passive: passive } : useCapture === true);
    };

    /**
     * Prevent default event from firing
     *
     * @param  {Event} event Event object
     * @return {undefined}

    function prevent ( event ) {
        if ( event ) {
            if ( event.preventDefault ) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    }
    */
    var transition = (function () {
        var t, type;
        var supported = false;
        var transitions = {
            'animation'        : 'animationend',
            'OAnimation'       : 'oAnimationEnd oanimationend',
            'msAnimation'      : 'MSAnimationEnd',
            'MozAnimation'     : 'animationend',
            'WebkitAnimation'  : 'webkitAnimationEnd'
        };

        for (t in transitions) {
            if (document.documentElement.style[t] !== undefined) {
                type = transitions[t];
                supported = true;
                break;
            }
        }

        return {
            type: type,
            supported: supported
        };
    }());

    /**
    * Creates event handler delegate that sends the instance as last argument.
    * 
    * @return {Function}    a function wrapper which sends the instance as last argument.
    */
    function delegate(context, method) {
        return function () {
            if (arguments.length > 0) {
                var args = [];
                for (var x = 0; x < arguments.length; x += 1) {
                    args.push(arguments[x]);
                }
                args.push(context);
                return method.apply(context, args);
            }
            return method.apply(context, [null, context]);
        };
    }
    /**
    * Helper for creating a dialog close event.
    * 
    * @return {object}
    */
    function createCloseEvent(index, button) {
        return {
            index: index,
            button: button,
            cancel: false
        };
    }
    /**
    * Helper for dispatching events.
    *
    * @param  {string} evenType The type of the event to disptach.
    * @param  {object} instance The dialog instance disptaching the event.
    *
    * @return   {any}   The result of the invoked function.
    */
    function dispatchEvent(eventType, instance) {
        if ( typeof instance.get(eventType) === 'function' ) {
            return instance.get(eventType).call(instance);
        }
    }


    /**
     * Super class for all dialogs
     *
     * @return {Object}		base dialog prototype
     */
    var dialog = (function () {
        var //holds the list of used keys.
            usedKeys = [],
            //dummy variable, used to trigger dom reflow.
            reflow = null,
            //holds body tab index in case it has any.
            tabindex = false,
            //condition for detecting safari
            isSafari = window.navigator.userAgent.indexOf('Safari') > -1 && window.navigator.userAgent.indexOf('Chrome') < 0,
            //dialog building blocks
            templates = {
                dimmer:'<div class="ajs-dimmer"></div>',
                /*tab index required to fire click event before body focus*/
                modal: '<div class="ajs-modal" tabindex="0"></div>',
                dialog: '<div class="ajs-dialog" tabindex="0"></div>',
                reset: '<button class="ajs-reset"></button>',
                commands: '<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',
                header: '<div class="ajs-header"></div>',
                body: '<div class="ajs-body"></div>',
                content: '<div class="ajs-content"></div>',
                footer: '<div class="ajs-footer"></div>',
                buttons: { primary: '<div class="ajs-primary ajs-buttons"></div>', auxiliary: '<div class="ajs-auxiliary ajs-buttons"></div>' },
                button: '<button class="ajs-button"></button>',
                resizeHandle: '<div class="ajs-handle"></div>',
            },
            //common class names
            classes = {
                animationIn: 'ajs-in',
                animationOut: 'ajs-out',
                base: 'alertify',
                basic:'ajs-basic',
                capture: 'ajs-capture',
                closable:'ajs-closable',
                fixed: 'ajs-fixed',
                frameless:'ajs-frameless',
                hidden: 'ajs-hidden',
                maximize: 'ajs-maximize',
                maximized: 'ajs-maximized',
                maximizable:'ajs-maximizable',
                modeless: 'ajs-modeless',
                movable: 'ajs-movable',
                noSelection: 'ajs-no-selection',
                noOverflow: 'ajs-no-overflow',
                noPadding:'ajs-no-padding',
                pin:'ajs-pin',
                pinnable:'ajs-pinnable',
                prefix: 'ajs-',
                resizable: 'ajs-resizable',
                restore: 'ajs-restore',
                shake:'ajs-shake',
                unpinned:'ajs-unpinned',
                noTransition:'ajs-no-transition'
            };

        /**
         * Helper: initializes the dialog instance
         * 
         * @return	{Number}	The total count of currently open modals.
         */
        function initialize(instance){
            
            if(!instance.__internal){
                //invoke preinit global hook
                alertify.defaults.hooks.preinit(instance);
                //no need to expose init after this.
                delete instance.__init;
              
                //keep a copy of initial dialog settings
                if(!instance.__settings){
                    instance.__settings = copy(instance.settings);
                }
                
                //get dialog buttons/focus setup
                var setup;
                if(typeof instance.setup === 'function'){
                    setup = instance.setup();
                    setup.options = setup.options  || {};
                    setup.focus = setup.focus  || {};
                }else{
                    setup = {
                        buttons:[],
                        focus:{
                            element:null,
                            select:false
                        },
                        options:{
                        }
                    };
                }
                
                //initialize hooks object.
                if(typeof instance.hooks !== 'object'){
                    instance.hooks = {};
                }

                //copy buttons defintion
                var buttonsDefinition = [];
                if(Array.isArray(setup.buttons)){
                    for(var b=0;b<setup.buttons.length;b+=1){
                        var ref  = setup.buttons[b],
                            cpy = {};
                        for (var i in ref) {
                            if (ref.hasOwnProperty(i)) {
                                cpy[i] = ref[i];
                            }
                        }
                        buttonsDefinition.push(cpy);
                    }
                }

                var internal = instance.__internal = {
                    /**
                     * Flag holding the open state of the dialog
                     * 
                     * @type {Boolean}
                     */
                    isOpen:false,
                    /**
                     * Active element is the element that will receive focus after
                     * closing the dialog. It defaults as the body tag, but gets updated
                     * to the last focused element before the dialog was opened.
                     *
                     * @type {Node}
                     */
                    activeElement:document.body,
                    timerIn:undefined,
                    timerOut:undefined,
                    buttons: buttonsDefinition,
                    focus: setup.focus,
                    options: {
                        title: undefined,
                        modal: undefined,
                        basic:undefined,
                        frameless:undefined,
                        defaultFocusOff:undefined,
                        pinned: undefined,
                        movable: undefined,
                        moveBounded:undefined,
                        resizable: undefined,
                        autoReset: undefined,
                        closable: undefined,
                        closableByDimmer: undefined,
                        invokeOnCloseOff:undefined,
                        maximizable: undefined,
                        startMaximized: undefined,
                        pinnable: undefined,
                        transition: undefined,
                        transitionOff: undefined,
                        padding:undefined,
                        overflow:undefined,
                        onshow:undefined,
                        onclosing:undefined,
                        onclose:undefined,
                        onfocus:undefined,
                        onmove:undefined,
                        onmoved:undefined,
                        onresize:undefined,
                        onresized:undefined,
                        onmaximize:undefined,
                        onmaximized:undefined,
                        onrestore:undefined,
                        onrestored:undefined
                    },
                    resetHandler:undefined,
                    beginMoveHandler:undefined,
                    beginResizeHandler:undefined,
                    bringToFrontHandler:undefined,
                    modalClickHandler:undefined,
                    buttonsClickHandler:undefined,
                    commandsClickHandler:undefined,
                    transitionInHandler:undefined,
                    transitionOutHandler:undefined,
                    destroy:undefined
                };

                var elements = {};
                //root node
                elements.root = document.createElement('div');
                //prevent FOUC in case of async styles loading.
                elements.root.style.display = 'none';
                elements.root.className = classes.base + ' ' + classes.hidden + ' ';

                elements.root.innerHTML = templates.dimmer + templates.modal;
                
                //dimmer
                elements.dimmer = elements.root.firstChild;

                //dialog
                elements.modal = elements.root.lastChild;
                elements.modal.innerHTML = templates.dialog;
                elements.dialog = elements.modal.firstChild;
                elements.dialog.innerHTML = templates.reset + templates.commands + templates.header + templates.body + templates.footer + templates.resizeHandle + templates.reset;

                //reset links
                elements.reset = [];
                elements.reset.push(elements.dialog.firstChild);
                elements.reset.push(elements.dialog.lastChild);
                
                //commands
                elements.commands = {};
                elements.commands.container = elements.reset[0].nextSibling;
                elements.commands.pin = elements.commands.container.firstChild;
                elements.commands.maximize = elements.commands.pin.nextSibling;
                elements.commands.close = elements.commands.maximize.nextSibling;
                
                //header
                elements.header = elements.commands.container.nextSibling;

                //body
                elements.body = elements.header.nextSibling;
                elements.body.innerHTML = templates.content;
                elements.content = elements.body.firstChild;

                //footer
                elements.footer = elements.body.nextSibling;
                elements.footer.innerHTML = templates.buttons.auxiliary + templates.buttons.primary;
                
                //resize handle
                elements.resizeHandle = elements.footer.nextSibling;

                //buttons
                elements.buttons = {};
                elements.buttons.auxiliary = elements.footer.firstChild;
                elements.buttons.primary = elements.buttons.auxiliary.nextSibling;
                elements.buttons.primary.innerHTML = templates.button;
                elements.buttonTemplate = elements.buttons.primary.firstChild;
                //remove button template
                elements.buttons.primary.removeChild(elements.buttonTemplate);
                               
                for(var x=0; x < instance.__internal.buttons.length; x+=1) {
                    var button = instance.__internal.buttons[x];
                    
                    // add to the list of used keys.
                    if(usedKeys.indexOf(button.key) < 0){
                        usedKeys.push(button.key);
                    }

                    button.element = elements.buttonTemplate.cloneNode();
                    button.element.innerHTML = button.text;
                    if(typeof button.className === 'string' &&  button.className !== ''){
                        addClass(button.element, button.className);
                    }
                    for(var key in button.attrs){
                        if(key !== 'className' && button.attrs.hasOwnProperty(key)){
                            button.element.setAttribute(key, button.attrs[key]);
                        }
                    }
                    if(button.scope === 'auxiliary'){
                        elements.buttons.auxiliary.appendChild(button.element);
                    }else{
                        elements.buttons.primary.appendChild(button.element);
                    }
                }
                //make elements pubic
                instance.elements = elements;
                
                //save event handlers delegates
                internal.resetHandler = delegate(instance, onReset);
                internal.beginMoveHandler = delegate(instance, beginMove);
                internal.beginResizeHandler = delegate(instance, beginResize);
                internal.bringToFrontHandler = delegate(instance, bringToFront);
                internal.modalClickHandler = delegate(instance, modalClickHandler);
                internal.buttonsClickHandler = delegate(instance, buttonsClickHandler);
                internal.commandsClickHandler = delegate(instance, commandsClickHandler);
                internal.transitionInHandler = delegate(instance, handleTransitionInEvent);
                internal.transitionOutHandler = delegate(instance, handleTransitionOutEvent);

                //settings
                for(var opKey in internal.options){
                    if(setup.options[opKey] !== undefined){
                        // if found in user options
                        instance.set(opKey, setup.options[opKey]);
                    }else if(alertify.defaults.hasOwnProperty(opKey)) {
                        // else if found in defaults options
                        instance.set(opKey, alertify.defaults[opKey]);
                    }else if(opKey === 'title' ) {
                        // else if title key, use alertify.defaults.glossary
                        instance.set(opKey, alertify.defaults.glossary[opKey]);
                    }
                }

                // allow dom customization
                if(typeof instance.build === 'function'){
                    instance.build();
                }

                //invoke postinit global hook
                alertify.defaults.hooks.postinit(instance);
            }

            //add to the end of the DOM tree.
            document.body.appendChild(instance.elements.root);
        }

        /**
         * Helper: maintains scroll position
         *
         */
        var scrollX, scrollY;
        function saveScrollPosition(){
            scrollX = getScrollLeft();
            scrollY = getScrollTop();
        }
        function restoreScrollPosition(){
            window.scrollTo(scrollX, scrollY);
        }

        /**
         * Helper: adds/removes no-overflow class from body
         *
         */
        function ensureNoOverflow(){
            var requiresNoOverflow = 0;
            for(var x=0;x<openDialogs.length;x+=1){
                var instance = openDialogs[x];
                if(instance.isModal() || instance.isMaximized()){
                    requiresNoOverflow+=1;
                }
            }
            if(requiresNoOverflow === 0 && document.body.className.indexOf(classes.noOverflow) >= 0){
                //last open modal or last maximized one
                removeClass(document.body, classes.noOverflow);
                preventBodyShift(false);
            }else if(requiresNoOverflow > 0 && document.body.className.indexOf(classes.noOverflow) < 0){
                //first open modal or first maximized one
                preventBodyShift(true);
                addClass(document.body, classes.noOverflow);
            }
        }
        var top = '', topScroll = 0;
        /**
         * Helper: prevents body shift.
         *
         */
        function preventBodyShift(add){
            if(alertify.defaults.preventBodyShift){
                if(add && document.documentElement.scrollHeight > document.documentElement.clientHeight ){//&& openDialogs[openDialogs.length-1].elements.dialog.clientHeight <= document.documentElement.clientHeight){
                    topScroll = scrollY;
                    top = window.getComputedStyle(document.body).top;
                    addClass(document.body, classes.fixed);
                    document.body.style.top = -scrollY + 'px';
                } else if(!add) {
                    scrollY = topScroll;
                    document.body.style.top = top;
                    removeClass(document.body, classes.fixed);
                    restoreScrollPosition();
                }
            }
        }
		
        /**
         * Sets the name of the transition used to show/hide the dialog
         * 
         * @param {Object} instance The dilog instance.
         *
         */
        function updateTransition(instance, value, oldValue){
            if(typeof oldValue === 'string'){
                removeClass(instance.elements.root,classes.prefix +  oldValue);
            }
            addClass(instance.elements.root, classes.prefix + value);
            reflow = instance.elements.root.offsetWidth;
        }

        /**
         * Toggles the dialog no transition 
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateTransitionOff(instance){
            if (instance.get('transitionOff')) {
                // add class
                addClass(instance.elements.root, classes.noTransition);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.noTransition);
            }
        }

        /**
         * Toggles the dialog display mode
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateDisplayMode(instance){
            if(instance.get('modal')){

                //make modal
                removeClass(instance.elements.root, classes.modeless);

                //only if open
                if(instance.isOpen()){
                    unbindModelessEvents(instance);

                    //in case a pinned modless dialog was made modal while open.
                    updateAbsPositionFix(instance);

                    ensureNoOverflow();
                }
            }else{
                //make modelss
                addClass(instance.elements.root, classes.modeless);

                //only if open
                if(instance.isOpen()){
                    bindModelessEvents(instance);

                    //in case pin/unpin was called while a modal is open
                    updateAbsPositionFix(instance);

                    ensureNoOverflow();
                }
            }
        }

        /**
         * Toggles the dialog basic view mode 
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateBasicMode(instance){
            if (instance.get('basic')) {
                // add class
                addClass(instance.elements.root, classes.basic);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.basic);
            }
        }

        /**
         * Toggles the dialog frameless view mode 
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function updateFramelessMode(instance){
            if (instance.get('frameless')) {
                // add class
                addClass(instance.elements.root, classes.frameless);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.frameless);
            }
        }
		
        /**
         * Helper: Brings the modeless dialog to front, attached to modeless dialogs.
         *
         * @param {Event} event Focus event
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bringToFront(event, instance){
            
            // Do not bring to front if preceeded by an open modal
            var index = openDialogs.indexOf(instance);
            for(var x=index+1;x<openDialogs.length;x+=1){
                if(openDialogs[x].isModal()){
                    return;
                }
            }
			
            // Bring to front by making it the last child.
            if(document.body.lastChild !== instance.elements.root){
                document.body.appendChild(instance.elements.root);
                //also make sure its at the end of the list
                openDialogs.splice(openDialogs.indexOf(instance),1);
                openDialogs.push(instance);
                setFocus(instance);
            }
			
            return false;
        }
		
        /**
         * Helper: reflects dialogs options updates
         *
         * @param {Object} instance The dilog instance.
         * @param {String} option The updated option name.
         *
         * @return	{undefined}	
         */
        function optionUpdated(instance, option, oldValue, newValue){
            switch(option){
            case 'title':
                instance.setHeader(newValue);
                break;
            case 'modal':
                updateDisplayMode(instance);
                break;
            case 'basic':
                updateBasicMode(instance);
                break;
            case 'frameless':
                updateFramelessMode(instance);
                break;
            case 'pinned':
                updatePinned(instance);
                break;
            case 'closable':
                updateClosable(instance);
                break;
            case 'maximizable':
                updateMaximizable(instance);
                break;
            case 'pinnable':
                updatePinnable(instance);
                break;
            case 'movable':
                updateMovable(instance);
                break;
            case 'resizable':
                updateResizable(instance);
                break;
            case 'padding':
                if(newValue){
                    removeClass(instance.elements.root, classes.noPadding);
                }else if(instance.elements.root.className.indexOf(classes.noPadding) < 0){
                    addClass(instance.elements.root, classes.noPadding);
                }
                break;
            case 'overflow':
                if(newValue){
                    removeClass(instance.elements.root, classes.noOverflow);
                }else if(instance.elements.root.className.indexOf(classes.noOverflow) < 0){
                    addClass(instance.elements.root, classes.noOverflow);
                }
                break;
            case 'transition':
                updateTransition(instance,newValue, oldValue);
                break;
            case 'transitionOff':
                updateTransitionOff(instance);
                break;
            }

            // internal on option updated event
            if(typeof instance.hooks.onupdate === 'function'){
                instance.hooks.onupdate.call(instance, option, oldValue, newValue);
            }
        }
		
        /**
         * Helper: reflects dialogs options updates
         *
         * @param {Object} instance The dilog instance.
         * @param {Object} obj The object to set/get a value on/from.
         * @param {Function} callback The callback function to call if the key was found.
         * @param {String|Object} key A string specifying a propery name or a collection of key value pairs.
         * @param {Object} value Optional, the value associated with the key (in case it was a string).
         * @param {String} option The updated option name.
         *
         * @return	{Object} result object 
         *	The result objects has an 'op' property, indicating of this is a SET or GET operation.
         *		GET: 
         *		- found: a flag indicating if the key was found or not.
         *		- value: the property value.
         *		SET:
         *		- items: a list of key value pairs of the properties being set.
         *				each contains:
         *					- found: a flag indicating if the key was found or not.
         *					- key: the property key.
         *					- value: the property value.
         */
        function update(instance, obj, callback, key, value){
            var result = {op:undefined, items: [] };
            if(typeof value === 'undefined' && typeof key === 'string') {
                //get
                result.op = 'get';
                if(obj.hasOwnProperty(key)){
                    result.found = true;
                    result.value = obj[key];
                }else{
                    result.found = false;
                    result.value = undefined;
                }
            }
            else
            {
                var old;
                //set
                result.op = 'set';
                if(typeof key === 'object'){
                    //set multiple
                    var args = key;
                    for (var prop in args) {
                        if (obj.hasOwnProperty(prop)) {
                            if(obj[prop] !== args[prop]){
                                old = obj[prop];
                                obj[prop] = args[prop];
                                callback.call(instance,prop, old, args[prop]);
                            }
                            result.items.push({ 'key': prop, 'value': args[prop], 'found':true});
                        }else{
                            result.items.push({ 'key': prop, 'value': args[prop], 'found':false});
                        }
                    }
                } else if (typeof key === 'string'){
                    //set single
                    if (obj.hasOwnProperty(key)) {
                        if(obj[key] !== value){
                            old  = obj[key];
                            obj[key] = value;
                            callback.call(instance,key, old, value);
                        }
                        result.items.push({'key': key, 'value': value , 'found':true});

                    }else{
                        result.items.push({'key': key, 'value': value , 'found':false});
                    }
                } else {
                    //invalid params
                    throw new Error('args must be a string or object');
                }
            }
            return result;
        }


        /**
         * Triggers a close event.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function triggerClose(instance) {
            var found;
            triggerCallback(instance, function (button) {
                return found = instance.get('invokeOnCloseOff') !== true && (button.invokeOnClose === true);
            });
            //none of the buttons registered as onclose callback
            //close the dialog
            if (!found && instance.isOpen()) {
                instance.close();
            }
        }

        /**
         * Dialogs commands event handler, attached to the dialog commands element.
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function commandsClickHandler(event, instance) {
            var target = event.srcElement || event.target;
            switch (target) {
            case instance.elements.commands.pin:
                if (!instance.isPinned()) {
                    pin(instance);
                } else {
                    unpin(instance);
                }
                break;
            case instance.elements.commands.maximize:
                if (!instance.isMaximized()) {
                    maximize(instance);
                } else {
                    restore(instance);
                }
                break;
            case instance.elements.commands.close:
                triggerClose(instance);
                break;
            }
            return false;
        }

        /**
         * Helper: pins the modeless dialog.
         *
         * @param {Object} instance	The dialog instance.
         * 
         * @return {undefined}
         */
        function pin(instance) {
            //pin the dialog
            instance.set('pinned', true);
        }

        /**
         * Helper: unpins the modeless dialog.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function unpin(instance) {
            //unpin the dialog 
            instance.set('pinned', false);
        }


        /**
         * Helper: enlarges the dialog to fill the entire screen.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function maximize(instance) {
            // allow custom `onmaximize` method
            dispatchEvent('onmaximize', instance);
            //maximize the dialog 
            addClass(instance.elements.root, classes.maximized);
            if (instance.isOpen()) {
                ensureNoOverflow();
            }
            // allow custom `onmaximized` method
            dispatchEvent('onmaximized', instance);
        }

        /**
         * Helper: returns the dialog to its former size.
         *
         * @param {Object} instance	The dilog instance.
         * 
         * @return {undefined}
         */
        function restore(instance) {
            // allow custom `onrestore` method
            dispatchEvent('onrestore', instance);
            //maximize the dialog 
            removeClass(instance.elements.root, classes.maximized);
            if (instance.isOpen()) {
                ensureNoOverflow();
            }
            // allow custom `onrestored` method
            dispatchEvent('onrestored', instance);
        }

        /**
         * Show or hide the maximize box.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updatePinnable(instance) {
            if (instance.get('pinnable')) {
                // add class
                addClass(instance.elements.root, classes.pinnable);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.pinnable);
            }
        }

        /**
         * Helper: Fixes the absolutly positioned modal div position.
         *
         * @param {Object} instance The dialog instance.
         *
         * @return {undefined}
         */
        function addAbsPositionFix(instance) {
            var scrollLeft = getScrollLeft();
            instance.elements.modal.style.marginTop = getScrollTop() + 'px';
            instance.elements.modal.style.marginLeft = scrollLeft + 'px';
            instance.elements.modal.style.marginRight = (-scrollLeft) + 'px';
        }

        /**
         * Helper: Removes the absolutly positioned modal div position fix.
         *
         * @param {Object} instance The dialog instance.
         *
         * @return {undefined}
         */
        function removeAbsPositionFix(instance) {
            var marginTop = parseInt(instance.elements.modal.style.marginTop, 10);
            var marginLeft = parseInt(instance.elements.modal.style.marginLeft, 10);
            instance.elements.modal.style.marginTop = '';
            instance.elements.modal.style.marginLeft = '';
            instance.elements.modal.style.marginRight = '';

            if (instance.isOpen()) {
                var top = 0,
                    left = 0
                ;
                if (instance.elements.dialog.style.top !== '') {
                    top = parseInt(instance.elements.dialog.style.top, 10);
                }
                instance.elements.dialog.style.top = (top + (marginTop - getScrollTop())) + 'px';

                if (instance.elements.dialog.style.left !== '') {
                    left = parseInt(instance.elements.dialog.style.left, 10);
                }
                instance.elements.dialog.style.left = (left + (marginLeft - getScrollLeft())) + 'px';
            }
        }
        /**
         * Helper: Adds/Removes the absolutly positioned modal div position fix based on its pinned setting.
         *
         * @param {Object} instance The dialog instance.
         *
         * @return {undefined}
         */
        function updateAbsPositionFix(instance) {
            // if modeless and unpinned add fix
            if (!instance.get('modal') && !instance.get('pinned')) {
                addAbsPositionFix(instance);
            } else {
                removeAbsPositionFix(instance);
            }
        }
        /**
         * Toggles the dialog position lock | modeless only.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to make it modal, false otherwise.
         *
         * @return {undefined}
         */
        function updatePinned(instance) {
            if (instance.get('pinned')) {
                removeClass(instance.elements.root, classes.unpinned);
                if (instance.isOpen()) {
                    removeAbsPositionFix(instance);
                }
            } else {
                addClass(instance.elements.root, classes.unpinned);
                if (instance.isOpen() && !instance.isModal()) {
                    addAbsPositionFix(instance);
                }
            }
        }

        /**
         * Show or hide the maximize box.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateMaximizable(instance) {
            if (instance.get('maximizable')) {
                // add class
                addClass(instance.elements.root, classes.maximizable);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.maximizable);
            }
        }

        /**
         * Show or hide the close box.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateClosable(instance) {
            if (instance.get('closable')) {
                // add class
                addClass(instance.elements.root, classes.closable);
                bindClosableEvents(instance);
            } else {
                // remove class
                removeClass(instance.elements.root, classes.closable);
                unbindClosableEvents(instance);
            }
        }

        
        var cancelClick = false,// flag to cancel click event if already handled by end resize event (the mousedown, mousemove, mouseup sequence fires a click event.).
            modalClickHandlerTS=0 // stores last click timestamp to prevent executing the handler twice on double click.
            ;

        /**
         * Helper: closes the modal dialog when clicking the modal
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function modalClickHandler(event, instance) {
            if(event.timeStamp - modalClickHandlerTS > 200 && (modalClickHandlerTS = event.timeStamp) && !cancelClick){
                var target = event.srcElement || event.target;
                if (instance.get('closableByDimmer') === true && target === instance.elements.modal) {
                    triggerClose(instance);
                }
            }
            cancelClick = false;
        }

        // stores last call timestamp to prevent triggering the callback twice.
        var callbackTS = 0;
        // flag to cancel keyup event if already handled by click event (pressing Enter on a focusted button).
        var cancelKeyup = false;
        /** 
         * Helper: triggers a button callback
         *
         * @param {Object}		The dilog instance.
         * @param {Function}	Callback to check which button triggered the event.
         *
         * @return {undefined}
         */
        function triggerCallback(instance, check) {
            if(Date.now() - callbackTS > 200 && (callbackTS = Date.now())){
                for (var idx = 0; idx < instance.__internal.buttons.length; idx += 1) {
                    var button = instance.__internal.buttons[idx];
                    if (!button.element.disabled && check(button)) {
                        var closeEvent = createCloseEvent(idx, button);
                        if (typeof instance.callback === 'function') {
                            instance.callback.apply(instance, [closeEvent]);
                        }
                        //close the dialog only if not canceled.
                        if (closeEvent.cancel === false) {
                            instance.close();
                        }
                        break;
                    }
                }
            }
        }

        /**
         * Clicks event handler, attached to the dialog footer.
         *
         * @param {Event}		DOM event object.
         * @param {Object}		The dilog instance.
         * 
         * @return {undefined}
         */
        function buttonsClickHandler(event, instance) {
            var target = event.srcElement || event.target;
            triggerCallback(instance, function (button) {
                // if this button caused the click, cancel keyup event
                return button.element === target && (cancelKeyup = true);
            });
        }

        /**
         * Keyup event handler, attached to the document.body
         *
         * @param {Event}		DOM event object.
         * @param {Object}		The dilog instance.
         * 
         * @return {undefined}
         */
        function keyupHandler(event) {
            //hitting enter while button has focus will trigger keyup too.
            //ignore if handled by clickHandler
            if (cancelKeyup) {
                cancelKeyup = false;
                return;
            }
            var instance = openDialogs[openDialogs.length - 1];
            var keyCode = event.keyCode;
            if (instance.__internal.buttons.length === 0 && keyCode === keys.ESC && instance.get('closable') === true) {
                triggerClose(instance);
                return false;
            }else if (usedKeys.indexOf(keyCode) > -1) {
                triggerCallback(instance, function (button) {
                    return button.key === keyCode;
                });
                return false;
            }
        }
        /**
        * Keydown event handler, attached to the document.body
        *
        * @param {Event}		DOM event object.
        * @param {Object}		The dilog instance.
        * 
        * @return {undefined}
        */
        function keydownHandler(event) {
            var instance = openDialogs[openDialogs.length - 1];
            var keyCode = event.keyCode;
            if (keyCode === keys.LEFT || keyCode === keys.RIGHT) {
                var buttons = instance.__internal.buttons;
                for (var x = 0; x < buttons.length; x += 1) {
                    if (document.activeElement === buttons[x].element) {
                        switch (keyCode) {
                        case keys.LEFT:
                            buttons[(x || buttons.length) - 1].element.focus();
                            return;
                        case keys.RIGHT:
                            buttons[(x + 1) % buttons.length].element.focus();
                            return;
                        }
                    }
                }
            }else if (keyCode < keys.F12 + 1 && keyCode > keys.F1 - 1 && usedKeys.indexOf(keyCode) > -1) {
                event.preventDefault();
                event.stopPropagation();
                triggerCallback(instance, function (button) {
                    return button.key === keyCode;
                });
                return false;
            }
        }


        /**
         * Sets focus to proper dialog element
         *
         * @param {Object} instance The dilog instance.
         * @param {Node} [resetTarget=undefined] DOM element to reset focus to.
         *
         * @return {undefined}
         */
        function setFocus(instance, resetTarget) {
            // reset target has already been determined.
            if (resetTarget) {
                resetTarget.focus();
            } else {
                // current instance focus settings
                var focus = instance.__internal.focus;
                // the focus element.
                var element = focus.element;

                switch (typeof focus.element) {
                // a number means a button index
                case 'number':
                    if (instance.__internal.buttons.length > focus.element) {
                        //in basic view, skip focusing the buttons.
                        if (instance.get('basic') === true) {
                            element = instance.elements.reset[0];
                        } else {
                            element = instance.__internal.buttons[focus.element].element;
                        }
                    }
                    break;
                // a string means querySelector to select from dialog body contents.
                case 'string':
                    element = instance.elements.body.querySelector(focus.element);
                    break;
                // a function should return the focus element.
                case 'function':
                    element = focus.element.call(instance);
                    break;
                }

                // if no focus element, default to first reset element.
                if (instance.get('defaultFocusOff') === true || ((typeof element === 'undefined' || element === null) && instance.__internal.buttons.length === 0)) {
                    element = instance.elements.reset[0];
                }
                // focus
                if (element && element.focus) {
                    element.focus();
                    // if selectable
                    if (focus.select && element.select) {
                        element.select();
                    }
                }
            }
        }

        /**
         * Focus event handler, attached to document.body and dialogs own reset links.
         * handles the focus for modal dialogs only.
         *
         * @param {Event} event DOM focus event object.
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function onReset(event, instance) {

            // should work on last modal if triggered from document.body 
            if (!instance) {
                for (var x = openDialogs.length - 1; x > -1; x -= 1) {
                    if (openDialogs[x].isModal()) {
                        instance = openDialogs[x];
                        break;
                    }
                }
            }

            if(instance) {
                // if modal
                if (instance.isModal()) {
                    // determine reset target to enable forward/backward tab cycle.
                    var firstReset = instance.elements.reset[0],
                        lastReset = instance.elements.reset[1],
                        lastFocusedElement = event.relatedTarget,
                        within = instance.elements.root.contains(lastFocusedElement),
                        target = event.srcElement || event.target,
                        resetTarget;

                    //if the previous focused element element was outside the modal do nthing
                    if(  /*first show */
                        (target === firstReset && !within) ||
                         /*focus cycle */
                        (target === lastReset && lastFocusedElement === firstReset)){
                        return;
                    }else if(target === lastReset || target === document.body){
                        resetTarget = firstReset;
                    }else if(target === firstReset && lastFocusedElement === lastReset){
                        resetTarget = findTabbable(instance);
                    }else if(target === firstReset && within){
                        resetTarget = findTabbable(instance, true);
                    }
                    // focus
                    setFocus(instance, resetTarget);
                }
            }
        }
        function findTabbable(instance, last){
            var tabbables = [].slice.call(instance.elements.dialog.querySelectorAll(defaults.tabbable));
            if(last){
                tabbables.reverse();
            }
            for(var x=0;x<tabbables.length;x+=1){
                var tabbable = tabbables[x];
                //check if visible
                if(!!(tabbable.offsetParent || tabbable.offsetWidth || tabbable.offsetHeight || tabbable.getClientRects().length)){
                    return tabbable;
                }
            }
        }
        function recycleTab(event) {
            var instance = openDialogs[openDialogs.length - 1];
            if (instance && event.shiftKey && event.keyCode === keys.TAB) {
                instance.elements.reset[1].focus();
            }
        }
        /**
         * Transition in transitionend event handler. 
         *
         * @param {Event}		TransitionEnd event object.
         * @param {Object}		The dilog instance.
         *
         * @return {undefined}
         */
        function handleTransitionInEvent(event, instance) {
            // clear the timer
            clearTimeout(instance.__internal.timerIn);

            // once transition is complete, set focus
            setFocus(instance);

            // allow handling key up after transition ended.
            cancelKeyup = false;

            // allow custom `onfocus` method
            dispatchEvent('onfocus', instance);

            // unbind the event
            off(instance.elements.dialog, transition.type, instance.__internal.transitionInHandler);

            removeClass(instance.elements.root, classes.animationIn);
        }

        /**
         * Transition out transitionend event handler. 
         *
         * @param {Event}		TransitionEnd event object.
         * @param {Object}		The dilog instance.
         *
         * @return {undefined}
         */
        function handleTransitionOutEvent(event, instance) {
            // clear the timer
            clearTimeout(instance.__internal.timerOut);
            // unbind the event
            off(instance.elements.dialog, transition.type, instance.__internal.transitionOutHandler);

            // reset move updates
            resetMove(instance);
            // reset resize updates
            resetResize(instance);

            // restore if maximized
            if (instance.isMaximized() && !instance.get('startMaximized')) {
                restore(instance);
            }

            //destory the instance
            if (typeof instance.__internal.destroy === 'function') {
                instance.__internal.destroy.apply(instance);
            }
        }
        /* Controls moving a dialog around */
        //holde the current moving instance
        var movable = null,
            //holds the current X offset when move starts
            offsetX = 0,
            //holds the current Y offset when move starts
            offsetY = 0,
            xProp = 'pageX',
            yProp = 'pageY',
            bounds = null,
            refreshTop = false,
            moveDelegate = null
        ;

        /**
         * Helper: sets the element top/left coordinates
         *
         * @param {Event} event	DOM event object.
         * @param {Node} element The element being moved.
         * 
         * @return {undefined}
         */
        function moveElement(event, element) {
            var left = (event[xProp] - offsetX),
                top  = (event[yProp] - offsetY);

            if(refreshTop){
                top -= document.body.scrollTop;
            }
           
            element.style.left = left + 'px';
            element.style.top = top + 'px';
           
        }
        /**
         * Helper: sets the element top/left coordinates within screen bounds
         *
         * @param {Event} event	DOM event object.
         * @param {Node} element The element being moved.
         * 
         * @return {undefined}
         */
        function moveElementBounded(event, element) {
            var left = (event[xProp] - offsetX),
                top  = (event[yProp] - offsetY);

            if(refreshTop){
                top -= document.body.scrollTop;
            }
            
            element.style.left = Math.min(bounds.maxLeft, Math.max(bounds.minLeft, left)) + 'px';
            if(refreshTop){
                element.style.top = Math.min(bounds.maxTop, Math.max(bounds.minTop, top)) + 'px';
            }else{
                element.style.top = Math.max(bounds.minTop, top) + 'px';
            }
        }
            

        /**
         * Triggers the start of a move event, attached to the header element mouse down event.
         * Adds no-selection class to the body, disabling selection while moving.
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance The dilog instance.
         * 
         * @return {Boolean} false
         */
        function beginMove(event, instance) {
            if (resizable === null && !instance.isMaximized() && instance.get('movable')) {
                var eventSrc, left=0, top=0;
                if (event.type === 'touchstart') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                    xProp = 'clientX';
                    yProp = 'clientY';
                } else if (event.button === 0) {
                    eventSrc = event;
                }

                if (eventSrc) {

                    var element = instance.elements.dialog;
                    addClass(element, classes.capture);

                    if (element.style.left) {
                        left = parseInt(element.style.left, 10);
                    }

                    if (element.style.top) {
                        top = parseInt(element.style.top, 10);
                    }
                    
                    offsetX = eventSrc[xProp] - left;
                    offsetY = eventSrc[yProp] - top;

                    if(instance.isModal()){
                        offsetY += instance.elements.modal.scrollTop;
                    }else if(instance.isPinned()){
                        offsetY -= document.body.scrollTop;
                    }
                    
                    if(instance.get('moveBounded')){
                        var current = element,
                            offsetLeft = -left,
                            offsetTop = -top;
                        
                        //calc offset
                        do {
                            offsetLeft += current.offsetLeft;
                            offsetTop += current.offsetTop;
                        } while (current = current.offsetParent);
                        
                        bounds = {
                            maxLeft : offsetLeft,
                            minLeft : -offsetLeft,
                            maxTop  : document.documentElement.clientHeight - element.clientHeight - offsetTop,
                            minTop  : -offsetTop
                        };
                        moveDelegate = moveElementBounded;
                    }else{
                        bounds = null;
                        moveDelegate = moveElement;
                    }
                    
                    // allow custom `onmove` method
                    dispatchEvent('onmove', instance);

                    refreshTop = !instance.isModal() && instance.isPinned();
                    movable = instance;
                    moveDelegate(eventSrc, element);
                    addClass(document.body, classes.noSelection);
                    return false;
                }
            }
        }

        /**
         * The actual move handler,  attached to document.body mousemove event.
         *
         * @param {Event} event	DOM event object.
         * 
         * @return {undefined}
         */
        function move(event) {
            if (movable) {
                var eventSrc;
                if (event.type === 'touchmove') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                } else if (event.button === 0) {
                    eventSrc = event;
                }
                if (eventSrc) {
                    moveDelegate(eventSrc, movable.elements.dialog);
                }
            }
        }

        /**
         * Triggers the end of a move event,  attached to document.body mouseup event.
         * Removes no-selection class from document.body, allowing selection.
         *
         * @return {undefined}
         */
        function endMove() {
            if (movable) {
                var instance = movable;
                movable = bounds = null;
                removeClass(document.body, classes.noSelection);
                removeClass(instance.elements.dialog, classes.capture);
                // allow custom `onmoved` method
                dispatchEvent('onmoved', instance);
            }
        }

        /**
         * Resets any changes made by moving the element to its original state,
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function resetMove(instance) {
            movable = null;
            var element = instance.elements.dialog;
            element.style.left = element.style.top = '';
        }

        /**
         * Updates the dialog move behavior.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateMovable(instance) {
            if (instance.get('movable')) {
                // add class
                addClass(instance.elements.root, classes.movable);
                if (instance.isOpen()) {
                    bindMovableEvents(instance);
                }
            } else {

                //reset
                resetMove(instance);
                // remove class
                removeClass(instance.elements.root, classes.movable);
                if (instance.isOpen()) {
                    unbindMovableEvents(instance);
                }
            }
        }

        /* Controls moving a dialog around */
        //holde the current instance being resized		
        var resizable = null,
            //holds the staring left offset when resize starts.
            startingLeft = Number.Nan,
            //holds the staring width when resize starts.
            startingWidth = 0,
            //holds the initial width when resized for the first time.
            minWidth = 0,
            //holds the offset of the resize handle.
            handleOffset = 0
        ;

        /**
         * Helper: sets the element width/height and updates left coordinate if neccessary.
         *
         * @param {Event} event	DOM mousemove event object.
         * @param {Node} element The element being moved.
         * @param {Boolean} pinned A flag indicating if the element being resized is pinned to the screen.
         * 
         * @return {undefined}
         */
        function resizeElement(event, element, pageRelative) {

            //calculate offsets from 0,0
            var current = element;
            var offsetLeft = 0;
            var offsetTop = 0;
            do {
                offsetLeft += current.offsetLeft;
                offsetTop += current.offsetTop;
            } while (current = current.offsetParent);

            // determine X,Y coordinates.
            var X, Y;
            if (pageRelative === true) {
                X = event.pageX;
                Y = event.pageY;
            } else {
                X = event.clientX;
                Y = event.clientY;
            }
            // rtl handling
            var isRTL = isRightToLeft();
            if (isRTL) {
                // reverse X 
                X = document.body.offsetWidth - X;
                // if has a starting left, calculate offsetRight
                if (!isNaN(startingLeft)) {
                    offsetLeft = document.body.offsetWidth - offsetLeft - element.offsetWidth;
                }
            }

            // set width/height
            element.style.height = (Y - offsetTop + handleOffset) + 'px';
            element.style.width = (X - offsetLeft + handleOffset) + 'px';

            // if the element being resized has a starting left, maintain it.
            // the dialog is centered, divide by half the offset to maintain the margins.
            if (!isNaN(startingLeft)) {
                var diff = Math.abs(element.offsetWidth - startingWidth) * 0.5;
                if (isRTL) {
                    //negate the diff, why?
                    //when growing it should decrease left
                    //when shrinking it should increase left
                    diff *= -1;
                }
                if (element.offsetWidth > startingWidth) {
                    //growing
                    element.style.left = (startingLeft + diff) + 'px';
                } else if (element.offsetWidth >= minWidth) {
                    //shrinking
                    element.style.left = (startingLeft - diff) + 'px';
                }
            }
        }

        /**
         * Triggers the start of a resize event, attached to the resize handle element mouse down event.
         * Adds no-selection class to the body, disabling selection while moving.
         *
         * @param {Event} event	DOM event object.
         * @param {Object} instance The dilog instance.
         * 
         * @return {Boolean} false
         */
        function beginResize(event, instance) {
            if (!instance.isMaximized()) {
                var eventSrc;
                if (event.type === 'touchstart') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                } else if (event.button === 0) {
                    eventSrc = event;
                }
                if (eventSrc) {
                    // allow custom `onresize` method
                    dispatchEvent('onresize', instance);
                    
                    resizable = instance;
                    handleOffset = instance.elements.resizeHandle.offsetHeight / 2;
                    var element = instance.elements.dialog;
                    addClass(element, classes.capture);
                    startingLeft = parseInt(element.style.left, 10);
                    element.style.height = element.offsetHeight + 'px';
                    element.style.minHeight = instance.elements.header.offsetHeight + instance.elements.footer.offsetHeight + 'px';
                    element.style.width = (startingWidth = element.offsetWidth) + 'px';

                    if (element.style.maxWidth !== 'none') {
                        element.style.minWidth = (minWidth = element.offsetWidth) + 'px';
                    }
                    element.style.maxWidth = 'none';
                    addClass(document.body, classes.noSelection);
                    return false;
                }
            }
        }

        /**
         * The actual resize handler,  attached to document.body mousemove event.
         *
         * @param {Event} event	DOM event object.
         * 
         * @return {undefined}
         */
        function resize(event) {
            if (resizable) {
                var eventSrc;
                if (event.type === 'touchmove') {
                    event.preventDefault();
                    eventSrc = event.targetTouches[0];
                } else if (event.button === 0) {
                    eventSrc = event;
                }
                if (eventSrc) {
                    resizeElement(eventSrc, resizable.elements.dialog, !resizable.get('modal') && !resizable.get('pinned'));
                }
            }
        }

        /**
         * Triggers the end of a resize event,  attached to document.body mouseup event.
         * Removes no-selection class from document.body, allowing selection.
         *
         * @return {undefined}
         */
        function endResize() {
            if (resizable) {
                var instance = resizable;
                resizable = null;
                removeClass(document.body, classes.noSelection);
                removeClass(instance.elements.dialog, classes.capture);
                cancelClick = true;
                // allow custom `onresized` method
                dispatchEvent('onresized', instance);
            }
        }

        /**
         * Resets any changes made by resizing the element to its original state.
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function resetResize(instance) {
            resizable = null;
            var element = instance.elements.dialog;
            if (element.style.maxWidth === 'none') {
                //clear inline styles.
                element.style.maxWidth = element.style.minWidth = element.style.width = element.style.height = element.style.minHeight = element.style.left = '';
                //reset variables.
                startingLeft = Number.Nan;
                startingWidth = minWidth = handleOffset = 0;
            }
        }


        /**
         * Updates the dialog move behavior.
         *
         * @param {Object} instance The dilog instance.
         * @param {Boolean} on True to add the behavior, removes it otherwise.
         *
         * @return {undefined}
         */
        function updateResizable(instance) {
            if (instance.get('resizable')) {
                // add class
                addClass(instance.elements.root, classes.resizable);
                if (instance.isOpen()) {
                    bindResizableEvents(instance);
                }
            } else {
                //reset
                resetResize(instance);
                // remove class
                removeClass(instance.elements.root, classes.resizable);
                if (instance.isOpen()) {
                    unbindResizableEvents(instance);
                }
            }
        }

        /**
         * Reset move/resize on window resize.
         *
         * @param {Event} event	window resize event object.
         *
         * @return {undefined}
         */
        function windowResize(/*event*/) {
            for (var x = 0; x < openDialogs.length; x += 1) {
                var instance = openDialogs[x];
                if (instance.get('autoReset')) {
                    resetMove(instance);
                    resetResize(instance);
                }
            }
        }
        /**
         * Bind dialogs events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindEvents(instance) {
            // if first dialog, hook global handlers
            if (openDialogs.length === 1) {
                //global
                on(window, 'resize', windowResize);
                on(document.body, 'keyup', keyupHandler);
                on(document.body, 'keydown', keydownHandler);
                on(document.body, 'focus', onReset);

                //move
                on(document.documentElement, 'mousemove', move);
                on(document.documentElement, 'touchmove', move, false, false);
                on(document.documentElement, 'mouseup', endMove);
                on(document.documentElement, 'touchend', endMove);
                //resize
                on(document.documentElement, 'mousemove', resize);
                on(document.documentElement, 'touchmove', resize, false, false);
                on(document.documentElement, 'mouseup', endResize);
                on(document.documentElement, 'touchend', endResize);
            }

            // common events
            on(instance.elements.commands.container, 'click', instance.__internal.commandsClickHandler);
            on(instance.elements.footer, 'click', instance.__internal.buttonsClickHandler);
            on(instance.elements.reset[0], 'focusin', instance.__internal.resetHandler);
            on(instance.elements.reset[0], 'keydown', recycleTab);
            on(instance.elements.reset[1], 'focusin', instance.__internal.resetHandler);

            //prevent handling key up when dialog is being opened by a key stroke.
            cancelKeyup = true;
            // hook in transition handler
            on(instance.elements.dialog, transition.type, instance.__internal.transitionInHandler);

            // modelss only events
            if (!instance.get('modal')) {
                bindModelessEvents(instance);
            }

            // resizable
            if (instance.get('resizable')) {
                bindResizableEvents(instance);
            }

            // movable
            if (instance.get('movable')) {
                bindMovableEvents(instance);
            }
        }

        /**
         * Unbind dialogs events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindEvents(instance) {
            // if last dialog, remove global handlers
            if (openDialogs.length === 1) {
                //global
                off(window, 'resize', windowResize);
                off(document.body, 'keyup', keyupHandler);
                off(document.body, 'keydown', keydownHandler);
                off(document.body, 'focus', onReset);
                //move
                off(document.documentElement, 'mousemove', move);
                off(document.documentElement, 'mouseup', endMove);
                //resize
                off(document.documentElement, 'mousemove', resize);
                off(document.documentElement, 'mouseup', endResize);
            }

            // common events
            off(instance.elements.commands.container, 'click', instance.__internal.commandsClickHandler);
            off(instance.elements.footer, 'click', instance.__internal.buttonsClickHandler);
            off(instance.elements.reset[0], 'focusin', instance.__internal.resetHandler);
            off(instance.elements.reset[0], 'keydown', recycleTab);
            off(instance.elements.reset[1], 'focusin', instance.__internal.resetHandler);

            // hook out transition handler
            on(instance.elements.dialog, transition.type, instance.__internal.transitionOutHandler);

            // modelss only events
            if (!instance.get('modal')) {
                unbindModelessEvents(instance);
            }

            // movable
            if (instance.get('movable')) {
                unbindMovableEvents(instance);
            }

            // resizable
            if (instance.get('resizable')) {
                unbindResizableEvents(instance);
            }

        }

        /**
         * Bind modeless specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindModelessEvents(instance) {
            on(instance.elements.dialog, 'focus', instance.__internal.bringToFrontHandler, true);
        }

        /**
         * Unbind modeless specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindModelessEvents(instance) {
            off(instance.elements.dialog, 'focus', instance.__internal.bringToFrontHandler, true);
        }



        /**
         * Bind movable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindMovableEvents(instance) {
            on(instance.elements.header, 'mousedown', instance.__internal.beginMoveHandler);
            on(instance.elements.header, 'touchstart', instance.__internal.beginMoveHandler, false, false);
        }

        /**
         * Unbind movable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindMovableEvents(instance) {
            off(instance.elements.header, 'mousedown', instance.__internal.beginMoveHandler);
            off(instance.elements.header, 'touchstart', instance.__internal.beginMoveHandler, false, false);
        }



        /**
         * Bind resizable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindResizableEvents(instance) {
            on(instance.elements.resizeHandle, 'mousedown', instance.__internal.beginResizeHandler);
            on(instance.elements.resizeHandle, 'touchstart', instance.__internal.beginResizeHandler, false, false);
        }

        /**
         * Unbind resizable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindResizableEvents(instance) {
            off(instance.elements.resizeHandle, 'mousedown', instance.__internal.beginResizeHandler);
            off(instance.elements.resizeHandle, 'touchstart', instance.__internal.beginResizeHandler, false, false);
        }

        /**
         * Bind closable events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function bindClosableEvents(instance) {
            on(instance.elements.modal, 'click', instance.__internal.modalClickHandler);
        }

        /**
         * Unbind closable specific events
         *
         * @param {Object} instance The dilog instance.
         *
         * @return {undefined}
         */
        function unbindClosableEvents(instance) {
            off(instance.elements.modal, 'click', instance.__internal.modalClickHandler);
        }
        // dialog API
        return {
            __init:initialize,
            /**
             * Check if dialog is currently open
             *
             * @return {Boolean}
             */
            isOpen: function () {
                return this.__internal.isOpen;
            },
            isModal: function (){
                return this.elements.root.className.indexOf(classes.modeless) < 0;
            },
            isMaximized:function(){
                return this.elements.root.className.indexOf(classes.maximized) > -1;
            },
            isPinned:function(){
                return this.elements.root.className.indexOf(classes.unpinned) < 0;
            },
            maximize:function(){
                if(!this.isMaximized()){
                    maximize(this);
                }
                return this;
            },
            restore:function(){
                if(this.isMaximized()){
                    restore(this);
                }
                return this;
            },
            pin:function(){
                if(!this.isPinned()){
                    pin(this);
                }
                return this;
            },
            unpin:function(){
                if(this.isPinned()){
                    unpin(this);
                }
                return this;
            },
            bringToFront:function(){
                bringToFront(null, this);
                return this;
            },
            /**
             * Move the dialog to a specific x/y coordinates
             *
             * @param {Number} x    The new dialog x coordinate in pixels.
             * @param {Number} y    The new dialog y coordinate in pixels.
             *
             * @return {Object} The dialog instance.
             */
            moveTo:function(x,y){
                if(!isNaN(x) && !isNaN(y)){
                    // allow custom `onmove` method
                    dispatchEvent('onmove', this);
                    
                    var element = this.elements.dialog,
                        current = element,
                        offsetLeft = 0,
                        offsetTop = 0;
                    
                    //subtract existing left,top
                    if (element.style.left) {
                        offsetLeft -= parseInt(element.style.left, 10);
                    }
                    if (element.style.top) {
                        offsetTop -= parseInt(element.style.top, 10);
                    }
                    //calc offset
                    do {
                        offsetLeft += current.offsetLeft;
                        offsetTop += current.offsetTop;
                    } while (current = current.offsetParent);

                    //calc left, top
                    var left = (x - offsetLeft);
                    var top  = (y - offsetTop);

                    //// rtl handling
                    if (isRightToLeft()) {
                        left *= -1;
                    }

                    element.style.left = left + 'px';
                    element.style.top = top + 'px';
                    
                    // allow custom `onmoved` method
                    dispatchEvent('onmoved', this);
                }
                return this;
            },
            /**
             * Resize the dialog to a specific width/height (the dialog must be 'resizable').
             * The dialog can be resized to:
             *  A minimum width equal to the initial display width
             *  A minimum height equal to the sum of header/footer heights.
             *
             *
             * @param {Number or String} width    The new dialog width in pixels or in percent.
             * @param {Number or String} height   The new dialog height in pixels or in percent.
             *
             * @return {Object} The dialog instance.
             */
            resizeTo:function(width,height){
                var w = parseFloat(width),
                    h = parseFloat(height),
                    regex = /(\d*\.\d+|\d+)%/
                ;

                if(!isNaN(w) && !isNaN(h) && this.get('resizable') === true){
                    
                    // allow custom `onresize` method
                    dispatchEvent('onresize', this);
                    
                    if(('' + width).match(regex)){
                        w = w / 100 * document.documentElement.clientWidth ;
                    }

                    if(('' + height).match(regex)){
                        h = h / 100 * document.documentElement.clientHeight;
                    }

                    var element = this.elements.dialog;
                    if (element.style.maxWidth !== 'none') {
                        element.style.minWidth = (minWidth = element.offsetWidth) + 'px';
                    }
                    element.style.maxWidth = 'none';
                    element.style.minHeight = this.elements.header.offsetHeight + this.elements.footer.offsetHeight + 'px';
                    element.style.width = w + 'px';
                    element.style.height = h + 'px';
                    
                    // allow custom `onresized` method
                    dispatchEvent('onresized', this);
                }
                return this;
            },
            /**
             * Gets or Sets dialog settings/options 
             *
             * @param {String|Object} key A string specifying a propery name or a collection of key/value pairs.
             * @param {Object} value Optional, the value associated with the key (in case it was a string).
             *
             * @return {undefined}
             */
            setting : function (key, value) {
                var self = this;
                var result = update(this, this.__internal.options, function(k,o,n){ optionUpdated(self,k,o,n); }, key, value);
                if(result.op === 'get'){
                    if(result.found){
                        return result.value;
                    }else if(typeof this.settings !== 'undefined'){
                        return update(this, this.settings, this.settingUpdated || function(){}, key, value).value;
                    }else{
                        return undefined;
                    }
                }else if(result.op === 'set'){
                    if(result.items.length > 0){
                        var callback = this.settingUpdated || function(){};
                        for(var x=0;x<result.items.length;x+=1){
                            var item = result.items[x];
                            if(!item.found && typeof this.settings !== 'undefined'){
                                update(this, this.settings, callback, item.key, item.value);
                            }
                        }
                    }
                    return this;
                }
            },
            /**
             * [Alias] Sets dialog settings/options 
             */
            set:function(key, value){
                this.setting(key,value);
                return this;
            },
            /**
             * [Alias] Gets dialog settings/options 
             */
            get:function(key){
                return this.setting(key);
            },
            /**
            * Sets dialog header
            * @content {string or element}
            *
            * @return {undefined}
            */
            setHeader:function(content){
                if(typeof content === 'string'){
                    clearContents(this.elements.header);
                    this.elements.header.innerHTML = content;
                }else if (content instanceof window.HTMLElement && this.elements.header.firstChild !== content){
                    clearContents(this.elements.header);
                    this.elements.header.appendChild(content);
                }
                return this;
            },
            /**
            * Sets dialog contents
            * @content {string or element}
            *
            * @return {undefined}
            */
            setContent:function(content){
                if(typeof content === 'string'){
                    clearContents(this.elements.content);
                    this.elements.content.innerHTML = content;
                }else if (content instanceof window.HTMLElement && this.elements.content.firstChild !== content){
                    clearContents(this.elements.content);
                    this.elements.content.appendChild(content);
                }
                return this;
            },
            /**
             * Show the dialog as modal
             *
             * @return {Object} the dialog instance.
             */
            showModal: function(className){
                return this.show(true, className);
            },
            /**
             * Show the dialog
             *
             * @return {Object} the dialog instance.
             */
            show: function (modal, className) {
                
                // ensure initialization
                initialize(this);

                if ( !this.__internal.isOpen ) {

                    // add to open dialogs
                    this.__internal.isOpen = true;
                    openDialogs.push(this);

                    // save last focused element
                    if(alertify.defaults.maintainFocus){
                        this.__internal.activeElement = document.activeElement;
                    }

                    // set tabindex attribute on body element this allows script to give it focusable
                    if(!document.body.hasAttribute('tabindex')) {
                        document.body.setAttribute( 'tabindex', tabindex = '0');
                    }

                    //allow custom dom manipulation updates before showing the dialog.
                    if(typeof this.prepare === 'function'){
                        this.prepare();
                    }

                    bindEvents(this);

                    if(modal !== undefined){
                        this.set('modal', modal);
                    }

                    //save scroll to prevent document jump
                    saveScrollPosition();

                    ensureNoOverflow();

                    // allow custom dialog class on show
                    if(typeof className === 'string' && className !== ''){
                        this.__internal.className = className;
                        addClass(this.elements.root, className);
                    }

                    // maximize if start maximized
                    if ( this.get('startMaximized')) {
                        this.maximize();
                    }else if(this.isMaximized()){
                        restore(this);
                    }

                    updateAbsPositionFix(this);
                    this.elements.root.removeAttribute('style');
                    removeClass(this.elements.root, classes.animationOut);
                    addClass(this.elements.root, classes.animationIn);

                    // set 1s fallback in case transition event doesn't fire
                    clearTimeout( this.__internal.timerIn);
                    this.__internal.timerIn = setTimeout( this.__internal.transitionInHandler, transition.supported ? 1000 : 100 );

                    if(isSafari){
                        // force desktop safari reflow
                        var root = this.elements.root;
                        root.style.display  = 'none';
                        setTimeout(function(){root.style.display  = 'block';}, 0);
                    }

                    //reflow
                    reflow = this.elements.root.offsetWidth;
                  
                    // show dialog
                    removeClass(this.elements.root, classes.hidden);

                    //restore scroll to prevent document jump
                    restoreScrollPosition();

                    // internal on show event
                    if(typeof this.hooks.onshow === 'function'){
                        this.hooks.onshow.call(this);
                    }

                    // allow custom `onshow` method
                    dispatchEvent('onshow', this);

                }else{
                    // reset move updates
                    resetMove(this);
                    // reset resize updates
                    resetResize(this);
                    // shake the dialog to indicate its already open
                    addClass(this.elements.dialog, classes.shake);
                    var self = this;
                    setTimeout(function(){
                        removeClass(self.elements.dialog, classes.shake);
                    },200);
                }
                return this;
            },
            /**
             * Close the dialog
             *
             * @return {Object} The dialog instance
             */
            close: function () {
                if (this.__internal.isOpen ) {
                    // custom `onclosing` event
                    if(dispatchEvent('onclosing', this) !== false){

                        unbindEvents(this);

                        removeClass(this.elements.root, classes.animationIn);
                        addClass(this.elements.root, classes.animationOut);

                        // set 1s fallback in case transition event doesn't fire
                        clearTimeout( this.__internal.timerOut );
                        this.__internal.timerOut = setTimeout( this.__internal.transitionOutHandler, transition.supported ? 1000 : 100 );
                        // hide dialog
                        addClass(this.elements.root, classes.hidden);
                        //reflow
                        reflow = this.elements.modal.offsetWidth;

                        // return focus to the last active element
                        if (alertify.defaults.maintainFocus && this.__internal.activeElement) {
                            this.__internal.activeElement.focus();
                            this.__internal.activeElement = null;
                        }

                        // remove custom dialog class on hide
                        if (typeof this.__internal.className !== 'undefined' && this.__internal.className !== '') {
                            removeClass(this.elements.root, this.__internal.className);
                        }

                        // internal on close event
                        if(typeof this.hooks.onclose === 'function'){
                            this.hooks.onclose.call(this);
                        }

                        // allow custom `onclose` method
                        dispatchEvent('onclose', this);

                        //remove from open dialogs
                        openDialogs.splice(openDialogs.indexOf(this),1);
                        this.__internal.isOpen = false;

                        ensureNoOverflow();
                    }

                }
                // last dialog and tab index was set by us, remove it.
                if(!openDialogs.length && tabindex === '0'){
                    document.body.removeAttribute('tabindex');
                }
                return this;
            },
            /**
             * Close all open dialogs except this.
             *
             * @return {undefined}
             */
            closeOthers:function(){
                alertify.closeAll(this);
                return this;
            },
            /**
             * Destroys this dialog instance
             *
             * @return {undefined}
             */
            destroy:function(){
                if(this.__internal) {
                    if (this.__internal.isOpen ) {
                        //mark dialog for destruction, this will be called on tranistionOut event.
                        this.__internal.destroy = function(){
                            destruct(this, initialize);
                        };
                        //close the dialog to unbind all events.
                        this.close();
                    }else if(!this.__internal.destroy){
                        destruct(this, initialize);
                    }
                }
                return this;
            },
        };
	} () );
    var notifier = (function () {
        var reflow,
            element,
            openInstances = [],
            classes = defaults.notifier.classes,
            baseClass = classes.base;
        /**
         * Helper: initializes the notifier instance
         *
         */
        function initialize(instance) {

            if (!instance.__internal) {
                instance.__internal = {
                    position: alertify.defaults.notifier.position,
                    delay: alertify.defaults.notifier.delay,
                };

                element = document.createElement('DIV');
                var transitionOff = 'transitionOff' in defaults.notifier ? defaults.notifier.transitionOff : defaults.transitionOff;
                if(transitionOff){
                    baseClass = classes.base + ' ajs-no-transition';
                }
                updatePosition(instance);
            }

            //add to DOM tree.
            if (element.parentNode !== document.body) {
                document.body.appendChild(element);
            }
        }

        function pushInstance(instance) {
            instance.__internal.pushed = true;
            openInstances.push(instance);
        }
        function popInstance(instance) {
            openInstances.splice(openInstances.indexOf(instance), 1);
            instance.__internal.pushed = false;
        }
        /**
         * Helper: update the notifier instance position
         *
         */
        function updatePosition(instance) {
            element.className = baseClass;
            switch (instance.__internal.position) {
            case 'top-right':
                addClass(element, classes.top + ' ' + classes.right);
                break;
            case 'top-left':
                addClass(element, classes.top + ' ' + classes.left);
                break;
            case 'top-center':
                addClass(element, classes.top + ' ' + classes.center);
                break;
            case 'bottom-left':
                addClass(element, classes.bottom + ' ' + classes.left);
                break;
            case 'bottom-center':
                addClass(element, classes.bottom + ' ' + classes.center);
                break;

            default:
            case 'bottom-right':
                addClass(element, classes.bottom + ' ' + classes.right);
                break;
            }
        }

        /**
        * creates a new notification message
        *
        * @param  {DOMElement} message	The notifier message element
        * @param  {Number} wait   Time (in ms) to wait before the message is dismissed, a value of 0 means keep open till clicked.
        * @param  {Function} callback A callback function to be invoked when the message is dismissed.
        *
        * @return {undefined}
        */
        function create(div, callback) {

            function clickDelegate(event, instance) {
                if(!instance.__internal.closeButton || event.target.getAttribute('data-close') === 'true'){
                    instance.dismiss(true);
                }
            }

            function transitionDone(event, instance) {
                // unbind event
                off(instance.element, transition.type, transitionDone);
                // remove the message
                element.removeChild(instance.element);
            }

            function initialize(instance) {
                if (!instance.__internal) {
                    instance.__internal = {
                        pushed: false,
                        delay : undefined,
                        timer: undefined,
                        clickHandler: undefined,
                        transitionEndHandler: undefined,
                        transitionTimeout: undefined
                    };
                    instance.__internal.clickHandler = delegate(instance, clickDelegate);
                    instance.__internal.transitionEndHandler = delegate(instance, transitionDone);
                }
                return instance;
            }
            function clearTimers(instance) {
                clearTimeout(instance.__internal.timer);
                clearTimeout(instance.__internal.transitionTimeout);
            }
            return initialize({
                /* notification DOM element*/
                element: div,
                /*
                 * Pushes a notification message
                 * @param {string or DOMElement} content The notification message content
                 * @param {Number} wait The time (in seconds) to wait before the message is dismissed, a value of 0 means keep open till clicked.
                 *
                 */
                push: function (_content, _wait) {
                    if (!this.__internal.pushed) {

                        pushInstance(this);
                        clearTimers(this);

                        var content, wait;
                        switch (arguments.length) {
                        case 0:
                            wait = this.__internal.delay;
                            break;
                        case 1:
                            if (typeof (_content) === 'number') {
                                wait = _content;
                            } else {
                                content = _content;
                                wait = this.__internal.delay;
                            }
                            break;
                        case 2:
                            content = _content;
                            wait = _wait;
                            break;
                        }
                        this.__internal.closeButton = alertify.defaults.notifier.closeButton;
                        // set contents
                        if (typeof content !== 'undefined') {
                            this.setContent(content);
                        }
                        // append or insert
                        if (notifier.__internal.position.indexOf('top') < 0) {
                            element.appendChild(this.element);
                        } else {
                            element.insertBefore(this.element, element.firstChild);
                        }
                        reflow = this.element.offsetWidth;
                        addClass(this.element, classes.visible);
                        // attach click event
                        on(this.element, 'click', this.__internal.clickHandler);
                        return this.delay(wait);
                    }
                    return this;
                },
                /*
                 * {Function} callback function to be invoked before dismissing the notification message.
                 * Remarks: A return value === 'false' will cancel the dismissal
                 *
                 */
                ondismiss: function () { },
                /*
                 * {Function} callback function to be invoked when the message is dismissed.
                 *
                 */
                callback: callback,
                /*
                 * Dismisses the notification message
                 * @param {Boolean} clicked A flag indicating if the dismissal was caused by a click.
                 *
                 */
                dismiss: function (clicked) {
                    if (this.__internal.pushed) {
                        clearTimers(this);
                        if (!(typeof this.ondismiss === 'function' && this.ondismiss.call(this) === false)) {
                            //detach click event
                            off(this.element, 'click', this.__internal.clickHandler);
                            // ensure element exists
                            if (typeof this.element !== 'undefined' && this.element.parentNode === element) {
                                //transition end or fallback
                                this.__internal.transitionTimeout = setTimeout(this.__internal.transitionEndHandler, transition.supported ? 1000 : 100);
                                removeClass(this.element, classes.visible);

                                // custom callback on dismiss
                                if (typeof this.callback === 'function') {
                                    this.callback.call(this, clicked);
                                }
                            }
                            popInstance(this);
                        }
                    }
                    return this;
                },
                /*
                 * Delays the notification message dismissal
                 * @param {Number} wait The time (in seconds) to wait before the message is dismissed, a value of 0 means keep open till clicked.
                 *
                 */
                delay: function (wait) {
                    clearTimers(this);
                    this.__internal.delay = typeof wait !== 'undefined' && !isNaN(+wait) ? +wait : notifier.__internal.delay;
                    if (this.__internal.delay > 0) {
                        var  self = this;
                        this.__internal.timer = setTimeout(function () { self.dismiss(); }, this.__internal.delay * 1000);
                    }
                    return this;
                },
                /*
                 * Sets the notification message contents
                 * @param {string or DOMElement} content The notification message content
                 *
                 */
                setContent: function (content) {
                    if (typeof content === 'string') {
                        clearContents(this.element);
                        this.element.innerHTML = content;
                    } else if (content instanceof window.HTMLElement && this.element.firstChild !== content) {
                        clearContents(this.element);
                        this.element.appendChild(content);
                    }
                    if(this.__internal.closeButton){
                        var close = document.createElement('span');
                        addClass(close, classes.close);
                        close.setAttribute('data-close', true);
                        this.element.appendChild(close);
                    }
                    return this;
                },
                /*
                 * Dismisses all open notifications except this.
                 *
                 */
                dismissOthers: function () {
                    notifier.dismissAll(this);
                    return this;
                }
            });
        }

        //notifier api
        return {
            /**
             * Gets or Sets notifier settings.
             *
             * @param {string} key The setting name
             * @param {Variant} value The setting value.
             *
             * @return {Object}	if the called as a setter, return the notifier instance.
             */
            setting: function (key, value) {
                //ensure init
                initialize(this);

                if (typeof value === 'undefined') {
                    //get
                    return this.__internal[key];
                } else {
                    //set
                    switch (key) {
                    case 'position':
                        this.__internal.position = value;
                        updatePosition(this);
                        break;
                    case 'delay':
                        this.__internal.delay = value;
                        break;
                    }
                }
                return this;
            },
            /**
             * [Alias] Sets dialog settings/options
             */
            set:function(key,value){
                this.setting(key,value);
                return this;
            },
            /**
             * [Alias] Gets dialog settings/options
             */
            get:function(key){
                return this.setting(key);
            },
            /**
             * Creates a new notification message
             *
             * @param {string} type The type of notification message (simply a CSS class name 'ajs-{type}' to be added).
             * @param {Function} callback  A callback function to be invoked when the message is dismissed.
             *
             * @return {undefined}
             */
            create: function (type, callback) {
                //ensure notifier init
                initialize(this);
                //create new notification message
                var div = document.createElement('div');
                div.className = classes.message + ((typeof type === 'string' && type !== '') ? ' ' + classes.prefix + type : '');
                return create(div, callback);
            },
            /**
             * Dismisses all open notifications.
             *
             * @param {Object} excpet [optional] The notification object to exclude from dismissal.
             *
             */
            dismissAll: function (except) {
                var clone = openInstances.slice(0);
                for (var x = 0; x < clone.length; x += 1) {
                    var  instance = clone[x];
                    if (except === undefined || except !== instance) {
                        instance.dismiss();
                    }
                }
            }
        };
    })();

    /**
     * Alertify public API
     * This contains everything that is exposed through the alertify object.
     *
     * @return {Object}
     */
    function Alertify() {

        // holds a references of created dialogs
        var dialogs = {};

        /**
         * Extends a given prototype by merging properties from base into sub.
         *
         * @sub {Object} sub The prototype being overwritten.
         * @base {Object} base The prototype being written.
         *
         * @return {Object} The extended prototype.
         */
        function extend(sub, base) {
            // copy dialog pototype over definition.
            for (var prop in base) {
                if (base.hasOwnProperty(prop)) {
                    sub[prop] = base[prop];
                }
            }
            return sub;
        }


        /**
        * Helper: returns a dialog instance from saved dialogs.
        * and initializes the dialog if its not already initialized.
        *
        * @name {String} name The dialog name.
        *
        * @return {Object} The dialog instance.
        */
        function get_dialog(name) {
            var dialog = dialogs[name].dialog;
            //initialize the dialog if its not already initialized.
            if (dialog && typeof dialog.__init === 'function') {
                dialog.__init(dialog);
            }
            return dialog;
        }

        /**
         * Helper:  registers a new dialog definition.
         *
         * @name {String} name The dialog name.
         * @Factory {Function} Factory a function resposible for creating dialog prototype.
         * @transient {Boolean} transient True to create a new dialog instance each time the dialog is invoked, false otherwise.
         * @base {String} base the name of another dialog to inherit from.
         *
         * @return {Object} The dialog definition.
         */
        function register(name, Factory, transient, base) {
            var definition = {
                dialog: null,
                factory: Factory
            };

            //if this is based on an existing dialog, create a new definition
            //by applying the new protoype over the existing one.
            if (base !== undefined) {
                definition.factory = function () {
                    return extend(new dialogs[base].factory(), new Factory());
                };
            }

            if (!transient) {
                //create a new definition based on dialog
                definition.dialog = extend(new definition.factory(), dialog);
            }
            return dialogs[name] = definition;
        }

        return {
            /**
             * Alertify defaults
             * 
             * @type {Object}
             */
            defaults: defaults,
            /**
             * Dialogs factory 
             *
             * @param {string}      Dialog name.
             * @param {Function}    A Dialog factory function.
             * @param {Boolean}     Indicates whether to create a singleton or transient dialog.
             * @param {String}      The name of the base type to inherit from.
             */
            dialog: function (name, Factory, transient, base) {

                // get request, create a new instance and return it.
                if (typeof Factory !== 'function') {
                    return get_dialog(name);
                }

                if (this.hasOwnProperty(name)) {
                    throw new Error('alertify.dialog: name already exists');
                }

                // register the dialog
                var definition = register(name, Factory, transient, base);

                if (transient) {

                    // make it public
                    this[name] = function () {
                        //if passed with no params, consider it a get request
                        if (arguments.length === 0) {
                            return definition.dialog;
                        } else {
                            var instance = extend(new definition.factory(), dialog);
                            //ensure init
                            if (instance && typeof instance.__init === 'function') {
                                instance.__init(instance);
                            }
                            instance['main'].apply(instance, arguments);
                            return instance['show'].apply(instance);
                        }
                    };
                } else {
                    // make it public
                    this[name] = function () {
                        //ensure init
                        if (definition.dialog && typeof definition.dialog.__init === 'function') {
                            definition.dialog.__init(definition.dialog);
                        }
                        //if passed with no params, consider it a get request
                        if (arguments.length === 0) {
                            return definition.dialog;
                        } else {
                            var dialog = definition.dialog;
                            dialog['main'].apply(definition.dialog, arguments);
                            return dialog['show'].apply(definition.dialog);
                        }
                    };
                }
            },
            /**
             * Close all open dialogs.
             *
             * @param {Object} excpet [optional] The dialog object to exclude from closing.
             *
             * @return {undefined}
             */
            closeAll: function (except) {
                var clone = openDialogs.slice(0);
                for (var x = 0; x < clone.length; x += 1) {
                    var instance = clone[x];
                    if (except === undefined || except !== instance) {
                        instance.close();
                    }
                }
            },
            /**
             * Gets or Sets dialog settings/options. if the dialog is transient, this call does nothing.
             *
             * @param {string} name The dialog name.
             * @param {String|Object} key A string specifying a propery name or a collection of key/value pairs.
             * @param {Variant} value Optional, the value associated with the key (in case it was a string).
             *
             * @return {undefined}
             */
            setting: function (name, key, value) {

                if (name === 'notifier') {
                    return notifier.setting(key, value);
                }

                var dialog = get_dialog(name);
                if (dialog) {
                    return dialog.setting(key, value);
                }
            },
            /**
             * [Alias] Sets dialog settings/options 
             */
            set: function(name,key,value){
                return this.setting(name, key,value);
            },
            /**
             * [Alias] Gets dialog settings/options 
             */
            get: function(name, key){
                return this.setting(name, key);
            },
            /**
             * Creates a new notification message.
             * If a type is passed, a class name "ajs-{type}" will be added.
             * This allows for custom look and feel for various types of notifications.
             *
             * @param  {String | DOMElement}    [message=undefined]		Message text
             * @param  {String}                 [type='']				Type of log message
             * @param  {String}                 [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}               [callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            notify: function (message, type, wait, callback) {
                return notifier.create(type, callback).push(message, wait);
            },
            /**
             * Creates a new notification message.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            message: function (message, wait, callback) {
                return notifier.create(null, callback).push(message, wait);
            },
            /**
             * Creates a new notification message of type 'success'.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            success: function (message, wait, callback) {
                return notifier.create('success', callback).push(message, wait);
            },
            /**
             * Creates a new notification message of type 'error'.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            error: function (message, wait, callback) {
                return notifier.create('error', callback).push(message, wait);
            },
            /**
             * Creates a new notification message of type 'warning'.
             *
             * @param  {String}		[message=undefined]		Message text
             * @param  {String}     [wait='']				Time (in seconds) to wait before auto-close
             * @param  {Function}	[callback=undefined]	A callback function to be invoked when the log is closed.
             *
             * @return {Object} Notification object.
             */
            warning: function (message, wait, callback) {
                return notifier.create('warning', callback).push(message, wait);
            },
            /**
             * Dismisses all open notifications
             *
             * @return {undefined}
             */
            dismissAll: function () {
                notifier.dismissAll();
            }
        };
    }
    var alertify = new Alertify();

    /**
    * Alert dialog definition
    *
    * invoked by:
    *	alertify.alert(message);
    *	alertify.alert(title, message);
    *	alertify.alert(message, onok);
    *	alertify.alert(title, message, onok);
     */
    alertify.dialog('alert', function () {
        return {
            main: function (_title, _message, _onok) {
                var title, message, onok;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    if (typeof _message === 'function') {
                        message = _title;
                        onok = _message;
                    } else {
                        title = _title;
                        message = _message;
                    }
                    break;
                case 3:
                    title = _title;
                    message = _message;
                    onok = _onok;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('onok', onok);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: alertify.defaults.glossary.ok,
                            key: keys.ESC,
                            invokeOnClose: true,
                            className: alertify.defaults.theme.ok,
                        }
                    ],
                    focus: {
                        element: 0,
                        select: false
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                // nothing
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                this.setContent(message);
            },
            settings: {
                message: undefined,
                onok: undefined,
                label: undefined,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'label':
                    if (this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].element.innerHTML = newValue;
                    }
                    break;
                }
            },
            callback: function (closeEvent) {
                if (typeof this.get('onok') === 'function') {
                    var returnValue = this.get('onok').call(this, closeEvent);
                    if (typeof returnValue !== 'undefined') {
                        closeEvent.cancel = !returnValue;
                    }
                }
            }
        };
    });
    /**
     * Confirm dialog object
     *
     *	alertify.confirm(message);
     *	alertify.confirm(message, onok);
     *	alertify.confirm(message, onok, oncancel);
     *	alertify.confirm(title, message, onok, oncancel);
     */
    alertify.dialog('confirm', function () {

        var autoConfirm = {
            timer: null,
            index: null,
            text: null,
            duration: null,
            task: function (event, self) {
                if (self.isOpen()) {
                    self.__internal.buttons[autoConfirm.index].element.innerHTML = autoConfirm.text + ' (&#8207;' + autoConfirm.duration + '&#8207;) ';
                    autoConfirm.duration -= 1;
                    if (autoConfirm.duration === -1) {
                        clearAutoConfirm(self);
                        var button = self.__internal.buttons[autoConfirm.index];
                        var closeEvent = createCloseEvent(autoConfirm.index, button);

                        if (typeof self.callback === 'function') {
                            self.callback.apply(self, [closeEvent]);
                        }
                        //close the dialog.
                        if (closeEvent.close !== false) {
                            self.close();
                        }
                    }
                } else {
                    clearAutoConfirm(self);
                }
            }
        };

        function clearAutoConfirm(self) {
            if (autoConfirm.timer !== null) {
                clearInterval(autoConfirm.timer);
                autoConfirm.timer = null;
                self.__internal.buttons[autoConfirm.index].element.innerHTML = autoConfirm.text;
            }
        }

        function startAutoConfirm(self, index, duration) {
            clearAutoConfirm(self);
            autoConfirm.duration = duration;
            autoConfirm.index = index;
            autoConfirm.text = self.__internal.buttons[index].element.innerHTML;
            autoConfirm.timer = setInterval(delegate(self, autoConfirm.task), 1000);
            autoConfirm.task(null, self);
        }


        return {
            main: function (_title, _message, _onok, _oncancel) {
                var title, message, onok, oncancel;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    message = _title;
                    onok = _message;
                    break;
                case 3:
                    message = _title;
                    onok = _message;
                    oncancel = _onok;
                    break;
                case 4:
                    title = _title;
                    message = _message;
                    onok = _onok;
                    oncancel = _oncancel;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('onok', onok);
                this.set('oncancel', oncancel);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: alertify.defaults.glossary.ok,
                            key: keys.ENTER,
                            className: alertify.defaults.theme.ok,
                        },
                        {
                            text: alertify.defaults.glossary.cancel,
                            key: keys.ESC,
                            invokeOnClose: true,
                            className: alertify.defaults.theme.cancel,
                        }
                    ],
                    focus: {
                        element: 0,
                        select: false
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                //nothing
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                this.setContent(message);
            },
            settings: {
                message: null,
                labels: null,
                onok: null,
                oncancel: null,
                defaultFocus: null,
                reverseButtons: null,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'labels':
                    if ('ok' in newValue && this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].text = newValue.ok;
                        this.__internal.buttons[0].element.innerHTML = newValue.ok;
                    }
                    if ('cancel' in newValue && this.__internal.buttons[1].element) {
                        this.__internal.buttons[1].text = newValue.cancel;
                        this.__internal.buttons[1].element.innerHTML = newValue.cancel;
                    }
                    break;
                case 'reverseButtons':
                    if (newValue === true) {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element);
                    } else {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);
                    }
                    break;
                case 'defaultFocus':
                    this.__internal.focus.element = newValue === 'ok' ? 0 : 1;
                    break;
                }
            },
            callback: function (closeEvent) {
                clearAutoConfirm(this);
                var returnValue;
                switch (closeEvent.index) {
                case 0:
                    if (typeof this.get('onok') === 'function') {
                        returnValue = this.get('onok').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {
                        returnValue = this.get('oncancel').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                }
            },
            autoOk: function (duration) {
                startAutoConfirm(this, 0, duration);
                return this;
            },
            autoCancel: function (duration) {
                startAutoConfirm(this, 1, duration);
                return this;
            }
        };
    });
    /**
     * Prompt dialog object
     *
     * invoked by:
     *	alertify.prompt(message);
     *	alertify.prompt(message, value);
     *	alertify.prompt(message, value, onok);
     *	alertify.prompt(message, value, onok, oncancel);
     *	alertify.prompt(title, message, value, onok, oncancel);
     */
    alertify.dialog('prompt', function () {
        var input = document.createElement('INPUT');
        var p = document.createElement('P');
        return {
            main: function (_title, _message, _value, _onok, _oncancel) {
                var title, message, value, onok, oncancel;
                switch (arguments.length) {
                case 1:
                    message = _title;
                    break;
                case 2:
                    message = _title;
                    value = _message;
                    break;
                case 3:
                    message = _title;
                    value = _message;
                    onok = _value;
                    break;
                case 4:
                    message = _title;
                    value = _message;
                    onok = _value;
                    oncancel = _onok;
                    break;
                case 5:
                    title = _title;
                    message = _message;
                    value = _value;
                    onok = _onok;
                    oncancel = _oncancel;
                    break;
                }
                this.set('title', title);
                this.set('message', message);
                this.set('value', value);
                this.set('onok', onok);
                this.set('oncancel', oncancel);
                return this;
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: alertify.defaults.glossary.ok,
                            key: keys.ENTER,
                            className: alertify.defaults.theme.ok,
                        },
                        {
                            text: alertify.defaults.glossary.cancel,
                            key: keys.ESC,
                            invokeOnClose: true,
                            className: alertify.defaults.theme.cancel,
                        }
                    ],
                    focus: {
                        element: input,
                        select: true
                    },
                    options: {
                        maximizable: false,
                        resizable: false
                    }
                };
            },
            build: function () {
                input.className = alertify.defaults.theme.input;
                input.setAttribute('type', 'text');
                input.value = this.get('value');
                this.elements.content.appendChild(p);
                this.elements.content.appendChild(input);
            },
            prepare: function () {
                //nothing
            },
            setMessage: function (message) {
                if (typeof message === 'string') {
                    clearContents(p);
                    p.innerHTML = message;
                } else if (message instanceof window.HTMLElement && p.firstChild !== message) {
                    clearContents(p);
                    p.appendChild(message);
                }
            },
            settings: {
                message: undefined,
                labels: undefined,
                onok: undefined,
                oncancel: undefined,
                value: '',
                type:'text',
                reverseButtons: undefined,
            },
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                case 'message':
                    this.setMessage(newValue);
                    break;
                case 'value':
                    input.value = newValue;
                    break;
                case 'type':
                    switch (newValue) {
                    case 'text':
                    case 'color':
                    case 'date':
                    case 'datetime-local':
                    case 'email':
                    case 'month':
                    case 'number':
                    case 'password':
                    case 'search':
                    case 'tel':
                    case 'time':
                    case 'week':
                        input.type = newValue;
                        break;
                    default:
                        input.type = 'text';
                        break;
                    }
                    break;
                case 'labels':
                    if (newValue.ok && this.__internal.buttons[0].element) {
                        this.__internal.buttons[0].element.innerHTML = newValue.ok;
                    }
                    if (newValue.cancel && this.__internal.buttons[1].element) {
                        this.__internal.buttons[1].element.innerHTML = newValue.cancel;
                    }
                    break;
                case 'reverseButtons':
                    if (newValue === true) {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element);
                    } else {
                        this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);
                    }
                    break;
                }
            },
            callback: function (closeEvent) {
                var returnValue;
                switch (closeEvent.index) {
                case 0:
                    this.settings.value = input.value;
                    if (typeof this.get('onok') === 'function') {
                        returnValue = this.get('onok').call(this, closeEvent, this.settings.value);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    break;
                case 1:
                    if (typeof this.get('oncancel') === 'function') {
                        returnValue = this.get('oncancel').call(this, closeEvent);
                        if (typeof returnValue !== 'undefined') {
                            closeEvent.cancel = !returnValue;
                        }
                    }
                    if(!closeEvent.cancel){
                        input.value = this.settings.value;
                    }
                    break;
                }
            }
        };
    });

    // CommonJS
    if (  true && typeof module.exports === 'object' ) {
        module.exports = alertify;
    // AMD
    } else if ( true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return alertify;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    // window
    } else {}

} ( typeof window !== 'undefined' ? window : this ) );


/***/ }),

/***/ "./node_modules/alertifyjs/build/css/alertify.css":
/*!********************************************************!*\
  !*** ./node_modules/alertifyjs/build/css/alertify.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxlcnRpZnlqcy9idWlsZC9hbGVydGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxlcnRpZnlqcy9idWlsZC9jc3MvYWxlcnRpZnkuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEtBQUs7QUFDdEIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEtBQUs7QUFDdEIsbUJBQW1CLE9BQU87QUFDMUI7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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Q2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsU0FBUyxLQUEwQjtBQUNuQztBQUNBO0FBQ0EsS0FBSyxXQUFXLElBQTBDO0FBQzFELFFBQVEsaUNBQVEsRUFBRSxtQ0FBRTtBQUNwQjtBQUNBLFNBQVM7QUFBQSxvR0FBRTtBQUNYO0FBQ0EsS0FBSyxNQUFNLEVBRU47O0FBRUwsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM2tIRCx1QyIsImZpbGUiOiJhbGVydGlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBhbGVydGlmeWpzIDEuMTMuMSBodHRwOi8vYWxlcnRpZnlqcy5jb21cclxuICogQWxlcnRpZnlKUyBpcyBhIGphdmFzY3JpcHQgZnJhbWV3b3JrIGZvciBkZXZlbG9waW5nIHByZXR0eSBicm93c2VyIGRpYWxvZ3MgYW5kIG5vdGlmaWNhdGlvbnMuXHJcbiAqIENvcHlyaWdodCAyMDE5IE1vaGFtbWFkIFlvdW5lcyA8TW9oYW1tYWRAYWxlcnRpZnlqcy5jb20+IChodHRwOi8vYWxlcnRpZnlqcy5jb20pIFxyXG4gKiBMaWNlbnNlZCB1bmRlciBHUEwgMyA8aHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9ncGwtMy4wPiovXHJcbiggZnVuY3Rpb24gKCB3aW5kb3cgKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgTk9UX0RJU0FCTEVEX05PVF9SRVNFVCA9ICc6bm90KDpkaXNhYmxlZCk6bm90KC5hanMtcmVzZXQpJztcclxuICAgIC8qKlxyXG4gICAgICogS2V5cyBlbnVtXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB2YXIga2V5cyA9IHtcclxuICAgICAgICBFTlRFUjogMTMsXHJcbiAgICAgICAgRVNDOiAyNyxcclxuICAgICAgICBGMTogMTEyLFxyXG4gICAgICAgIEYxMjogMTIzLFxyXG4gICAgICAgIExFRlQ6IDM3LFxyXG4gICAgICAgIFJJR0hUOiAzOSxcclxuICAgICAgICBUQUI6IDlcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgb3B0aW9ucyBcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBhdXRvUmVzZXQ6dHJ1ZSxcclxuICAgICAgICBiYXNpYzpmYWxzZSxcclxuICAgICAgICBjbG9zYWJsZTp0cnVlLFxyXG4gICAgICAgIGNsb3NhYmxlQnlEaW1tZXI6dHJ1ZSxcclxuICAgICAgICBpbnZva2VPbkNsb3NlT2ZmOmZhbHNlLFxyXG4gICAgICAgIGZyYW1lbGVzczpmYWxzZSxcclxuICAgICAgICBkZWZhdWx0Rm9jdXNPZmY6ZmFsc2UsXHJcbiAgICAgICAgbWFpbnRhaW5Gb2N1czp0cnVlLCAvL2dsb2JhbCBkZWZhdWx0IG5vdCBwZXIgaW5zdGFuY2UsIGFwcGxpZXMgdG8gYWxsIGRpYWxvZ3NcclxuICAgICAgICBtYXhpbWl6YWJsZTp0cnVlLFxyXG4gICAgICAgIG1vZGFsOnRydWUsXHJcbiAgICAgICAgbW92YWJsZTp0cnVlLFxyXG4gICAgICAgIG1vdmVCb3VuZGVkOmZhbHNlLFxyXG4gICAgICAgIG92ZXJmbG93OnRydWUsXHJcbiAgICAgICAgcGFkZGluZzogdHJ1ZSxcclxuICAgICAgICBwaW5uYWJsZTp0cnVlLFxyXG4gICAgICAgIHBpbm5lZDp0cnVlLFxyXG4gICAgICAgIHByZXZlbnRCb2R5U2hpZnQ6ZmFsc2UsIC8vZ2xvYmFsIGRlZmF1bHQgbm90IHBlciBpbnN0YW5jZSwgYXBwbGllcyB0byBhbGwgZGlhbG9nc1xyXG4gICAgICAgIHJlc2l6YWJsZTp0cnVlLFxyXG4gICAgICAgIHN0YXJ0TWF4aW1pemVkOmZhbHNlLFxyXG4gICAgICAgIHRyYW5zaXRpb246J3B1bHNlJyxcclxuICAgICAgICB0cmFuc2l0aW9uT2ZmOmZhbHNlLFxyXG4gICAgICAgIHRhYmJhYmxlOlsnYnV0dG9uJywgJ1tocmVmXScsICdpbnB1dCcsICdzZWxlY3QnLCAndGV4dGFyZWEnLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJytOT1RfRElTQUJMRURfTk9UX1JFU0VUXS5qb2luKE5PVF9ESVNBQkxFRF9OT1RfUkVTRVQrJywnKSwvL2dsb2JhbFxyXG4gICAgICAgIG5vdGlmaWVyOntcclxuICAgICAgICAgICAgZGVsYXk6NSxcclxuICAgICAgICAgICAgcG9zaXRpb246J2JvdHRvbS1yaWdodCcsXHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOmZhbHNlLFxyXG4gICAgICAgICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgICAgICAgICBiYXNlOiAnYWxlcnRpZnktbm90aWZpZXInLFxyXG4gICAgICAgICAgICAgICAgcHJlZml4OidhanMtJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdhanMtbWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgICB0b3A6ICdhanMtdG9wJyxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYWpzLXJpZ2h0JyxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2Fqcy1ib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogJ2Fqcy1sZWZ0JyxcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogJ2Fqcy1jZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogJ2Fqcy12aXNpYmxlJyxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogJ2Fqcy1oaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICdhanMtY2xvc2UnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdsb3NzYXJ5OntcclxuICAgICAgICAgICAgdGl0bGU6J0FsZXJ0aWZ5SlMnLFxyXG4gICAgICAgICAgICBvazogJ09LJyxcclxuICAgICAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcclxuICAgICAgICAgICAgYWNjY3B0OiAnQWNjZXB0JyxcclxuICAgICAgICAgICAgZGVueTogJ0RlbnknLFxyXG4gICAgICAgICAgICBjb25maXJtOiAnQ29uZmlybScsXHJcbiAgICAgICAgICAgIGRlY2xpbmU6ICdEZWNsaW5lJyxcclxuICAgICAgICAgICAgY2xvc2U6ICdDbG9zZScsXHJcbiAgICAgICAgICAgIG1heGltaXplOiAnTWF4aW1pemUnLFxyXG4gICAgICAgICAgICByZXN0b3JlOiAnUmVzdG9yZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGVtZTp7XHJcbiAgICAgICAgICAgIGlucHV0OidhanMtaW5wdXQnLFxyXG4gICAgICAgICAgICBvazonYWpzLW9rJyxcclxuICAgICAgICAgICAgY2FuY2VsOidhanMtY2FuY2VsJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhvb2tzOntcclxuICAgICAgICAgICAgcHJlaW5pdDpmdW5jdGlvbigpe30sXHJcbiAgICAgICAgICAgIHBvc3Rpbml0OmZ1bmN0aW9uKCl7fVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8vaG9sZHMgb3BlbiBkaWFsb2dzIGluc3RhbmNlc1xyXG4gICAgdmFyIG9wZW5EaWFsb2dzID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbSGVscGVyXSAgQWRkcyB0aGUgc3BlY2lmaWVkIGNsYXNzKGVzKSB0byB0aGUgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAZWxlbWVudCB7bm9kZX0gICAgICBUaGUgZWxlbWVudFxyXG4gICAgICogQGNsYXNzTmFtZSB7c3RyaW5nfSAgT25lIG9yIG1vcmUgc3BhY2Utc2VwYXJhdGVkIGNsYXNzZXMgdG8gYmUgYWRkZWQgdG8gdGhlIGNsYXNzIGF0dHJpYnV0ZSBvZiB0aGUgZWxlbWVudC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LGNsYXNzTmFtZXMpe1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogW0hlbHBlcl0gIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjbGFzcyhlcykgZnJvbSB0aGUgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAZWxlbWVudCB7bm9kZX0gICAgICBUaGUgZWxlbWVudFxyXG4gICAgICogQGNsYXNzTmFtZSB7c3RyaW5nfSAgT25lIG9yIG1vcmUgc3BhY2Utc2VwYXJhdGVkIGNsYXNzZXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBjbGFzcyBhdHRyaWJ1dGUgb2YgdGhlIGVsZW1lbnQuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lcykge1xyXG4gICAgICAgIHZhciBvcmlnaW5hbCA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgdmFyIHRvQmVSZW1vdmVkID0gY2xhc3NOYW1lcy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgdG9CZVJlbW92ZWQubGVuZ3RoOyB4ICs9IDEpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gb3JpZ2luYWwuaW5kZXhPZih0b0JlUmVtb3ZlZFt4XSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IG9yaWdpbmFsLmpvaW4oJyAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtIZWxwZXJdICBDaGVja3MgaWYgdGhlIGRvY3VtZW50IGlzIFJUTFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIGRvY3VtZW50IGlzIFJUTCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpc1JpZ2h0VG9MZWZ0KCl7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFtIZWxwZXJdICBHZXQgdGhlIGRvY3VtZW50IGN1cnJlbnQgc2Nyb2xsVG9wXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBjdXJyZW50IGRvY3VtZW50IHNjcm9sbFRvcCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKXtcclxuICAgICAgICByZXR1cm4gKChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogW0hlbHBlcl0gIEdldCB0aGUgZG9jdW1lbnQgY3VycmVudCBzY3JvbGxMZWZ0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBjdXJyZW50IGRvY3VtZW50IHNjcm9sbExlZnQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdCgpe1xyXG4gICAgICAgIHJldHVybiAoKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogSGVscGVyOiBjbGVhciBjb250ZW50c1xyXG4gICAgKlxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIGNsZWFyQ29udGVudHMoZWxlbWVudCl7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQubGFzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5sYXN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRXh0ZW5kcyBhIGdpdmVuIHByb3RvdHlwZSBieSBtZXJnaW5nIHByb3BlcnRpZXMgZnJvbSBiYXNlIGludG8gc3ViLlxyXG4gICAgICpcclxuICAgICAqIEBzdWIge09iamVjdH0gc3ViIFRoZSBwcm90b3R5cGUgYmVpbmcgb3ZlcndyaXR0ZW4uXHJcbiAgICAgKiBAYmFzZSB7T2JqZWN0fSBiYXNlIFRoZSBwcm90b3R5cGUgYmVpbmcgd3JpdHRlbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBleHRlbmRlZCBwcm90b3R5cGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNvcHkoc3JjKSB7XHJcbiAgICAgICAgaWYobnVsbCA9PT0gc3JjKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNyYztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNweTtcclxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHNyYykpe1xyXG4gICAgICAgICAgICBjcHkgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciB4PTA7eDxzcmMubGVuZ3RoO3grPTEpe1xyXG4gICAgICAgICAgICAgICAgY3B5LnB1c2goY29weShzcmNbeF0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgaWYoc3JjIGluc3RhbmNlb2YgRGF0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShzcmMuZ2V0VGltZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIGlmKHNyYyBpbnN0YW5jZW9mIFJlZ0V4cCl7XHJcbiAgICAgICAgICAgIGNweSA9IG5ldyBSZWdFeHAoc3JjLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIGNweS5nbG9iYWwgPSBzcmMuZ2xvYmFsO1xyXG4gICAgICAgICAgICBjcHkuaWdub3JlQ2FzZSA9IHNyYy5pZ25vcmVDYXNlO1xyXG4gICAgICAgICAgICBjcHkubXVsdGlsaW5lID0gc3JjLm11bHRpbGluZTtcclxuICAgICAgICAgICAgY3B5Lmxhc3RJbmRleCA9IHNyYy5sYXN0SW5kZXg7XHJcbiAgICAgICAgICAgIHJldHVybiBjcHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHR5cGVvZiBzcmMgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgY3B5ID0ge307XHJcbiAgICAgICAgICAgIC8vIGNvcHkgZGlhbG9nIHBvdG90eXBlIG92ZXIgZGVmaW5pdGlvbi5cclxuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzcmMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzcmMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjcHlbcHJvcF0gPSBjb3B5KHNyY1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNweTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNyYztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAqIEhlbHBlcjogZGVzdHJ1Y3QgdGhlIGRpYWxvZ1xyXG4gICAgICAqXHJcbiAgICAgICovXHJcbiAgICBmdW5jdGlvbiBkZXN0cnVjdChpbnN0YW5jZSwgaW5pdGlhbGl6ZSl7XHJcbiAgICAgICAgaWYoaW5zdGFuY2UuZWxlbWVudHMpe1xyXG4gICAgICAgICAgICAvL2RlbGV0ZSB0aGUgZG9tIGFuZCBpdCdzIHJlZmVyZW5jZXMuXHJcbiAgICAgICAgICAgIHZhciByb290ID0gaW5zdGFuY2UuZWxlbWVudHMucm9vdDtcclxuICAgICAgICAgICAgcm9vdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvb3QpO1xyXG4gICAgICAgICAgICBkZWxldGUgaW5zdGFuY2UuZWxlbWVudHM7XHJcbiAgICAgICAgICAgIC8vY29weSBiYWNrIGluaXRpYWwgc2V0dGluZ3MuXHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNldHRpbmdzID0gY29weShpbnN0YW5jZS5fX3NldHRpbmdzKTtcclxuICAgICAgICAgICAgLy9yZS1yZWZlcmVuY2UgaW5pdCBmdW5jdGlvbi5cclxuICAgICAgICAgICAgaW5zdGFuY2UuX19pbml0ID0gaW5pdGlhbGl6ZTtcclxuICAgICAgICAgICAgLy9kZWxldGUgX19pbnRlcm5hbCB2YXJpYWJsZSB0byBhbGxvdyByZS1pbml0aWFsaXphdGlvbi5cclxuICAgICAgICAgICAgZGVsZXRlIGluc3RhbmNlLl9faW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCB0byBjaGVjayBpZiBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycyBhcmUgc3VwcG9ydGVkLlxyXG4gICAgICovXHJcbiAgICB2YXIgSXNQYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBJc1Bhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIEV2ZW50VGFyZ2V0IHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5yIG9uLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlIFNwZWNpZmljZXMgaWYgdGhlIGV2ZW50IHRvIGJlIGRpc3BhdGNoZWQgdG8gdGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXIgYmVmb3JlIGJlaW5nIGRpc3BhdGNoZWQgdG8gYW55IEV2ZW50VGFyZ2V0IGJlbmVhdGggaXQgaW4gdGhlIERPTSB0cmVlLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBwYXNzaXZlIEEgQm9vbGVhbiB3aGljaCwgaWYgdHJ1ZSwgaW5kaWNhdGVzIHRoYXQgdGhlIGZ1bmN0aW9uIHNwZWNpZmllZCBieSBsaXN0ZW5lciB3aWxsIG5ldmVyIGNhbGwgcHJldmVudERlZmF1bHQoKS5cclxuICAgICAqL1xyXG4gICAgdmFyIG9uID0gZnVuY3Rpb24gKGVsLCBldmVudCwgZm4sIHVzZUNhcHR1cmUsIHBhc3NpdmUpIHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgSXNQYXNzaXZlU3VwcG9ydGVkID8geyBjYXB0dXJlOiB1c2VDYXB0dXJlLCBwYXNzaXZlOiBwYXNzaXZlIH0gOiB1c2VDYXB0dXJlID09PSB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIEV2ZW50VGFyZ2V0IHRvIHVucmVnaXN0ZXIgdGhlIGxpc3RlbnIgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgZXZlbnQgdHlwZSB0byByZW1vdmUuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZXZlbnQgaGFuZGxlciB0byByZW1vdmUuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmUgU3BlY2lmaWNlcyBpZiB0aGUgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZCB0byB0aGUgcmVnaXN0ZXJlZCBsaXN0ZW5lciBiZWZvcmUgYmVpbmcgZGlzcGF0Y2hlZCB0byBhbnkgRXZlbnRUYXJnZXQgYmVuZWF0aCBpdCBpbiB0aGUgRE9NIHRyZWUuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhc3NpdmUgQSBCb29sZWFuIHdoaWNoLCBpZiB0cnVlLCBpbmRpY2F0ZXMgdGhhdCB0aGUgZnVuY3Rpb24gc3BlY2lmaWVkIGJ5IGxpc3RlbmVyIHdpbGwgbmV2ZXIgY2FsbCBwcmV2ZW50RGVmYXVsdCgpLlxyXG4gICAgICovXHJcbiAgICB2YXIgb2ZmID0gZnVuY3Rpb24gKGVsLCBldmVudCwgZm4sIHVzZUNhcHR1cmUsIHBhc3NpdmUpIHtcclxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgSXNQYXNzaXZlU3VwcG9ydGVkID8geyBjYXB0dXJlOiB1c2VDYXB0dXJlLCBwYXNzaXZlOiBwYXNzaXZlIH0gOiB1c2VDYXB0dXJlID09PSB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmV2ZW50IGRlZmF1bHQgZXZlbnQgZnJvbSBmaXJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtFdmVudH0gZXZlbnQgRXZlbnQgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJldmVudCAoIGV2ZW50ICkge1xyXG4gICAgICAgIGlmICggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggZXZlbnQucHJldmVudERlZmF1bHQgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICovXHJcbiAgICB2YXIgdHJhbnNpdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHQsIHR5cGU7XHJcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuICAgICAgICAgICAgJ2FuaW1hdGlvbicgICAgICAgIDogJ2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICdPQW5pbWF0aW9uJyAgICAgICA6ICdvQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnLFxyXG4gICAgICAgICAgICAnbXNBbmltYXRpb24nICAgICAgOiAnTVNBbmltYXRpb25FbmQnLFxyXG4gICAgICAgICAgICAnTW96QW5pbWF0aW9uJyAgICAgOiAnYW5pbWF0aW9uZW5kJyxcclxuICAgICAgICAgICAgJ1dlYmtpdEFuaW1hdGlvbicgIDogJ3dlYmtpdEFuaW1hdGlvbkVuZCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHQgaW4gdHJhbnNpdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gdHJhbnNpdGlvbnNbdF07XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZDogc3VwcG9ydGVkXHJcbiAgICAgICAgfTtcclxuICAgIH0oKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENyZWF0ZXMgZXZlbnQgaGFuZGxlciBkZWxlZ2F0ZSB0aGF0IHNlbmRzIHRoZSBpbnN0YW5jZSBhcyBsYXN0IGFyZ3VtZW50LlxyXG4gICAgKiBcclxuICAgICogQHJldHVybiB7RnVuY3Rpb259ICAgIGEgZnVuY3Rpb24gd3JhcHBlciB3aGljaCBzZW5kcyB0aGUgaW5zdGFuY2UgYXMgbGFzdCBhcmd1bWVudC5cclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBkZWxlZ2F0ZShjb250ZXh0LCBtZXRob2QpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGFyZ3VtZW50cy5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbeF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KGNvbnRleHQsIFtudWxsLCBjb250ZXh0XSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBIZWxwZXIgZm9yIGNyZWF0aW5nIGEgZGlhbG9nIGNsb3NlIGV2ZW50LlxyXG4gICAgKiBcclxuICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsb3NlRXZlbnQoaW5kZXgsIGJ1dHRvbikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgYnV0dG9uOiBidXR0b24sXHJcbiAgICAgICAgICAgIGNhbmNlbDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEhlbHBlciBmb3IgZGlzcGF0Y2hpbmcgZXZlbnRzLlxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW5UeXBlIFRoZSB0eXBlIG9mIHRoZSBldmVudCB0byBkaXNwdGFjaC5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlhbG9nIGluc3RhbmNlIGRpc3B0YWNoaW5nIHRoZSBldmVudC5cclxuICAgICpcclxuICAgICogQHJldHVybiAgIHthbnl9ICAgVGhlIHJlc3VsdCBvZiB0aGUgaW52b2tlZCBmdW5jdGlvbi5cclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50VHlwZSwgaW5zdGFuY2UpIHtcclxuICAgICAgICBpZiAoIHR5cGVvZiBpbnN0YW5jZS5nZXQoZXZlbnRUeXBlKSA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmdldChldmVudFR5cGUpLmNhbGwoaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdXBlciBjbGFzcyBmb3IgYWxsIGRpYWxvZ3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHRcdGJhc2UgZGlhbG9nIHByb3RvdHlwZVxyXG4gICAgICovXHJcbiAgICB2YXIgZGlhbG9nID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgLy9ob2xkcyB0aGUgbGlzdCBvZiB1c2VkIGtleXMuXHJcbiAgICAgICAgICAgIHVzZWRLZXlzID0gW10sXHJcbiAgICAgICAgICAgIC8vZHVtbXkgdmFyaWFibGUsIHVzZWQgdG8gdHJpZ2dlciBkb20gcmVmbG93LlxyXG4gICAgICAgICAgICByZWZsb3cgPSBudWxsLFxyXG4gICAgICAgICAgICAvL2hvbGRzIGJvZHkgdGFiIGluZGV4IGluIGNhc2UgaXQgaGFzIGFueS5cclxuICAgICAgICAgICAgdGFiaW5kZXggPSBmYWxzZSxcclxuICAgICAgICAgICAgLy9jb25kaXRpb24gZm9yIGRldGVjdGluZyBzYWZhcmlcclxuICAgICAgICAgICAgaXNTYWZhcmkgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSA+IC0xICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpIDwgMCxcclxuICAgICAgICAgICAgLy9kaWFsb2cgYnVpbGRpbmcgYmxvY2tzXHJcbiAgICAgICAgICAgIHRlbXBsYXRlcyA9IHtcclxuICAgICAgICAgICAgICAgIGRpbW1lcjonPGRpdiBjbGFzcz1cImFqcy1kaW1tZXJcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgLyp0YWIgaW5kZXggcmVxdWlyZWQgdG8gZmlyZSBjbGljayBldmVudCBiZWZvcmUgYm9keSBmb2N1cyovXHJcbiAgICAgICAgICAgICAgICBtb2RhbDogJzxkaXYgY2xhc3M9XCJhanMtbW9kYWxcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgZGlhbG9nOiAnPGRpdiBjbGFzcz1cImFqcy1kaWFsb2dcIiB0YWJpbmRleD1cIjBcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgcmVzZXQ6ICc8YnV0dG9uIGNsYXNzPVwiYWpzLXJlc2V0XCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRzOiAnPGRpdiBjbGFzcz1cImFqcy1jb21tYW5kc1wiPjxidXR0b24gY2xhc3M9XCJhanMtcGluXCI+PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImFqcy1tYXhpbWl6ZVwiPjwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJhanMtY2xvc2VcIj48L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnPGRpdiBjbGFzcz1cImFqcy1oZWFkZXJcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgYm9keTogJzxkaXYgY2xhc3M9XCJhanMtYm9keVwiPjwvZGl2PicsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnPGRpdiBjbGFzcz1cImFqcy1jb250ZW50XCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGZvb3RlcjogJzxkaXYgY2xhc3M9XCJhanMtZm9vdGVyXCI+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHsgcHJpbWFyeTogJzxkaXYgY2xhc3M9XCJhanMtcHJpbWFyeSBhanMtYnV0dG9uc1wiPjwvZGl2PicsIGF1eGlsaWFyeTogJzxkaXYgY2xhc3M9XCJhanMtYXV4aWxpYXJ5IGFqcy1idXR0b25zXCI+PC9kaXY+JyB9LFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uOiAnPGJ1dHRvbiBjbGFzcz1cImFqcy1idXR0b25cIj48L2J1dHRvbj4nLFxyXG4gICAgICAgICAgICAgICAgcmVzaXplSGFuZGxlOiAnPGRpdiBjbGFzcz1cImFqcy1oYW5kbGVcIj48L2Rpdj4nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL2NvbW1vbiBjbGFzcyBuYW1lc1xyXG4gICAgICAgICAgICBjbGFzc2VzID0ge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uSW46ICdhanMtaW4nLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uT3V0OiAnYWpzLW91dCcsXHJcbiAgICAgICAgICAgICAgICBiYXNlOiAnYWxlcnRpZnknLFxyXG4gICAgICAgICAgICAgICAgYmFzaWM6J2Fqcy1iYXNpYycsXHJcbiAgICAgICAgICAgICAgICBjYXB0dXJlOiAnYWpzLWNhcHR1cmUnLFxyXG4gICAgICAgICAgICAgICAgY2xvc2FibGU6J2Fqcy1jbG9zYWJsZScsXHJcbiAgICAgICAgICAgICAgICBmaXhlZDogJ2Fqcy1maXhlZCcsXHJcbiAgICAgICAgICAgICAgICBmcmFtZWxlc3M6J2Fqcy1mcmFtZWxlc3MnLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiAnYWpzLWhpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBtYXhpbWl6ZTogJ2Fqcy1tYXhpbWl6ZScsXHJcbiAgICAgICAgICAgICAgICBtYXhpbWl6ZWQ6ICdhanMtbWF4aW1pemVkJyxcclxuICAgICAgICAgICAgICAgIG1heGltaXphYmxlOidhanMtbWF4aW1pemFibGUnLFxyXG4gICAgICAgICAgICAgICAgbW9kZWxlc3M6ICdhanMtbW9kZWxlc3MnLFxyXG4gICAgICAgICAgICAgICAgbW92YWJsZTogJ2Fqcy1tb3ZhYmxlJyxcclxuICAgICAgICAgICAgICAgIG5vU2VsZWN0aW9uOiAnYWpzLW5vLXNlbGVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICBub092ZXJmbG93OiAnYWpzLW5vLW92ZXJmbG93JyxcclxuICAgICAgICAgICAgICAgIG5vUGFkZGluZzonYWpzLW5vLXBhZGRpbmcnLFxyXG4gICAgICAgICAgICAgICAgcGluOidhanMtcGluJyxcclxuICAgICAgICAgICAgICAgIHBpbm5hYmxlOidhanMtcGlubmFibGUnLFxyXG4gICAgICAgICAgICAgICAgcHJlZml4OiAnYWpzLScsXHJcbiAgICAgICAgICAgICAgICByZXNpemFibGU6ICdhanMtcmVzaXphYmxlJyxcclxuICAgICAgICAgICAgICAgIHJlc3RvcmU6ICdhanMtcmVzdG9yZScsXHJcbiAgICAgICAgICAgICAgICBzaGFrZTonYWpzLXNoYWtlJyxcclxuICAgICAgICAgICAgICAgIHVucGlubmVkOidhanMtdW5waW5uZWQnLFxyXG4gICAgICAgICAgICAgICAgbm9UcmFuc2l0aW9uOidhanMtbm8tdHJhbnNpdGlvbidcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBpbml0aWFsaXplcyB0aGUgZGlhbG9nIGluc3RhbmNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVyblx0e051bWJlcn1cdFRoZSB0b3RhbCBjb3VudCBvZiBjdXJyZW50bHkgb3BlbiBtb2RhbHMuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZShpbnN0YW5jZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighaW5zdGFuY2UuX19pbnRlcm5hbCl7XHJcbiAgICAgICAgICAgICAgICAvL2ludm9rZSBwcmVpbml0IGdsb2JhbCBob29rXHJcbiAgICAgICAgICAgICAgICBhbGVydGlmeS5kZWZhdWx0cy5ob29rcy5wcmVpbml0KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIC8vbm8gbmVlZCB0byBleHBvc2UgaW5pdCBhZnRlciB0aGlzLlxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGluc3RhbmNlLl9faW5pdDtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8va2VlcCBhIGNvcHkgb2YgaW5pdGlhbCBkaWFsb2cgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgIGlmKCFpbnN0YW5jZS5fX3NldHRpbmdzKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX3NldHRpbmdzID0gY29weShpbnN0YW5jZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vZ2V0IGRpYWxvZyBidXR0b25zL2ZvY3VzIHNldHVwXHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0dXA7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgaW5zdGFuY2Uuc2V0dXAgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHVwID0gaW5zdGFuY2Uuc2V0dXAoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR1cC5vcHRpb25zID0gc2V0dXAub3B0aW9ucyAgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dXAuZm9jdXMgPSBzZXR1cC5mb2N1cyAgfHwge307XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZXR1cCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczpbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXM6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9pbml0aWFsaXplIGhvb2tzIG9iamVjdC5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBpbnN0YW5jZS5ob29rcyAhPT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmhvb2tzID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb3B5IGJ1dHRvbnMgZGVmaW50aW9uXHJcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9uc0RlZmluaXRpb24gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoc2V0dXAuYnV0dG9ucykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgYj0wO2I8c2V0dXAuYnV0dG9ucy5sZW5ndGg7Yis9MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgID0gc2V0dXAuYnV0dG9uc1tiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNweSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZi5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNweVtpXSA9IHJlZltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zRGVmaW5pdGlvbi5wdXNoKGNweSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnRlcm5hbCA9IGluc3RhbmNlLl9faW50ZXJuYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogRmxhZyBob2xkaW5nIHRoZSBvcGVuIHN0YXRlIG9mIHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBpc09wZW46ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogQWN0aXZlIGVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgdGhhdCB3aWxsIHJlY2VpdmUgZm9jdXMgYWZ0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgKiBjbG9zaW5nIHRoZSBkaWFsb2cuIEl0IGRlZmF1bHRzIGFzIHRoZSBib2R5IHRhZywgYnV0IGdldHMgdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAqIHRvIHRoZSBsYXN0IGZvY3VzZWQgZWxlbWVudCBiZWZvcmUgdGhlIGRpYWxvZyB3YXMgb3BlbmVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge05vZGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRWxlbWVudDpkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVySW46dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyT3V0OnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBidXR0b25zRGVmaW5pdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBmb2N1czogc2V0dXAuZm9jdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNpYzp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lbGVzczp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRGb2N1c09mZjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpbm5lZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZhYmxlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVCb3VuZGVkOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9SZXNldDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zYWJsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zYWJsZUJ5RGltbWVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZU9uQ2xvc2VPZmY6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhpbWl6YWJsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE1heGltaXplZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaW5uYWJsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25PZmY6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25zaG93OnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25jbG9zaW5nOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25jbG9zZTp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZm9jdXM6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbm1vdmU6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbm1vdmVkOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25yZXNpemU6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbnJlc2l6ZWQ6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbm1heGltaXplOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25tYXhpbWl6ZWQ6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbnJlc3RvcmU6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbnJlc3RvcmVkOnVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRIYW5kbGVyOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBiZWdpbk1vdmVIYW5kbGVyOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBiZWdpblJlc2l6ZUhhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJyaW5nVG9Gcm9udEhhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xpY2tIYW5kbGVyOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zQ2xpY2tIYW5kbGVyOnVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc0NsaWNrSGFuZGxlcjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkluSGFuZGxlcjp1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbk91dEhhbmRsZXI6dW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc3Ryb3k6dW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgLy9yb290IG5vZGVcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIC8vcHJldmVudCBGT1VDIGluIGNhc2Ugb2YgYXN5bmMgc3R5bGVzIGxvYWRpbmcuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5yb290LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5yb290LmNsYXNzTmFtZSA9IGNsYXNzZXMuYmFzZSArICcgJyArIGNsYXNzZXMuaGlkZGVuICsgJyAnO1xyXG5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJvb3QuaW5uZXJIVE1MID0gdGVtcGxhdGVzLmRpbW1lciArIHRlbXBsYXRlcy5tb2RhbDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9kaW1tZXJcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmRpbW1lciA9IGVsZW1lbnRzLnJvb3QuZmlyc3RDaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2RpYWxvZ1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMubW9kYWwgPSBlbGVtZW50cy5yb290Lmxhc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLm1vZGFsLmlubmVySFRNTCA9IHRlbXBsYXRlcy5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5kaWFsb2cgPSBlbGVtZW50cy5tb2RhbC5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZGlhbG9nLmlubmVySFRNTCA9IHRlbXBsYXRlcy5yZXNldCArIHRlbXBsYXRlcy5jb21tYW5kcyArIHRlbXBsYXRlcy5oZWFkZXIgKyB0ZW1wbGF0ZXMuYm9keSArIHRlbXBsYXRlcy5mb290ZXIgKyB0ZW1wbGF0ZXMucmVzaXplSGFuZGxlICsgdGVtcGxhdGVzLnJlc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXQgbGlua3NcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJlc2V0ID0gW107XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5yZXNldC5wdXNoKGVsZW1lbnRzLmRpYWxvZy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnJlc2V0LnB1c2goZWxlbWVudHMuZGlhbG9nLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZHNcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmNvbW1hbmRzID0ge307XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5jb21tYW5kcy5jb250YWluZXIgPSBlbGVtZW50cy5yZXNldFswXS5uZXh0U2libGluZztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmNvbW1hbmRzLnBpbiA9IGVsZW1lbnRzLmNvbW1hbmRzLmNvbnRhaW5lci5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuY29tbWFuZHMubWF4aW1pemUgPSBlbGVtZW50cy5jb21tYW5kcy5waW4ubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5jb21tYW5kcy5jbG9zZSA9IGVsZW1lbnRzLmNvbW1hbmRzLm1heGltaXplLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL2hlYWRlclxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuaGVhZGVyID0gZWxlbWVudHMuY29tbWFuZHMuY29udGFpbmVyLm5leHRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYm9keVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYm9keSA9IGVsZW1lbnRzLmhlYWRlci5uZXh0U2libGluZztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmJvZHkuaW5uZXJIVE1MID0gdGVtcGxhdGVzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5jb250ZW50ID0gZWxlbWVudHMuYm9keS5maXJzdENoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9vdGVyXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb290ZXIgPSBlbGVtZW50cy5ib2R5Lm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9vdGVyLmlubmVySFRNTCA9IHRlbXBsYXRlcy5idXR0b25zLmF1eGlsaWFyeSArIHRlbXBsYXRlcy5idXR0b25zLnByaW1hcnk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vcmVzaXplIGhhbmRsZVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucmVzaXplSGFuZGxlID0gZWxlbWVudHMuZm9vdGVyLm5leHRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYnV0dG9uc1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucy5hdXhpbGlhcnkgPSBlbGVtZW50cy5mb290ZXIuZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmJ1dHRvbnMucHJpbWFyeSA9IGVsZW1lbnRzLmJ1dHRvbnMuYXV4aWxpYXJ5Lm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucy5wcmltYXJ5LmlubmVySFRNTCA9IHRlbXBsYXRlcy5idXR0b247XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5idXR0b25UZW1wbGF0ZSA9IGVsZW1lbnRzLmJ1dHRvbnMucHJpbWFyeS5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgYnV0dG9uIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5idXR0b25zLnByaW1hcnkucmVtb3ZlQ2hpbGQoZWxlbWVudHMuYnV0dG9uVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIHg9MDsgeCA8IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9ucy5sZW5ndGg7IHgrPTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gaW5zdGFuY2UuX19pbnRlcm5hbC5idXR0b25zW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0byB0aGUgbGlzdCBvZiB1c2VkIGtleXMuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlZEtleXMuaW5kZXhPZihidXR0b24ua2V5KSA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkS2V5cy5wdXNoKGJ1dHRvbi5rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmVsZW1lbnQgPSBlbGVtZW50cy5idXR0b25UZW1wbGF0ZS5jbG9uZU5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uZWxlbWVudC5pbm5lckhUTUwgPSBidXR0b24udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgYnV0dG9uLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycgJiYgIGJ1dHRvbi5jbGFzc05hbWUgIT09ICcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoYnV0dG9uLmVsZW1lbnQsIGJ1dHRvbi5jbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGtleSBpbiBidXR0b24uYXR0cnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihrZXkgIT09ICdjbGFzc05hbWUnICYmIGJ1dHRvbi5hdHRycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5lbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGJ1dHRvbi5hdHRyc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihidXR0b24uc2NvcGUgPT09ICdhdXhpbGlhcnknKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuYnV0dG9ucy5hdXhpbGlhcnkuYXBwZW5kQ2hpbGQoYnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5idXR0b25zLnByaW1hcnkuYXBwZW5kQ2hpbGQoYnV0dG9uLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vbWFrZSBlbGVtZW50cyBwdWJpY1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMgPSBlbGVtZW50cztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zYXZlIGV2ZW50IGhhbmRsZXJzIGRlbGVnYXRlc1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWwucmVzZXRIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIG9uUmVzZXQpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWwuYmVnaW5Nb3ZlSGFuZGxlciA9IGRlbGVnYXRlKGluc3RhbmNlLCBiZWdpbk1vdmUpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWwuYmVnaW5SZXNpemVIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGJlZ2luUmVzaXplKTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLmJyaW5nVG9Gcm9udEhhbmRsZXIgPSBkZWxlZ2F0ZShpbnN0YW5jZSwgYnJpbmdUb0Zyb250KTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLm1vZGFsQ2xpY2tIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIG1vZGFsQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLmJ1dHRvbnNDbGlja0hhbmRsZXIgPSBkZWxlZ2F0ZShpbnN0YW5jZSwgYnV0dG9uc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbC5jb21tYW5kc0NsaWNrSGFuZGxlciA9IGRlbGVnYXRlKGluc3RhbmNlLCBjb21tYW5kc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbC50cmFuc2l0aW9uSW5IYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGhhbmRsZVRyYW5zaXRpb25JbkV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsLnRyYW5zaXRpb25PdXRIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGhhbmRsZVRyYW5zaXRpb25PdXRFdmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBvcEtleSBpbiBpbnRlcm5hbC5vcHRpb25zKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZXR1cC5vcHRpb25zW29wS2V5XSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZm91bmQgaW4gdXNlciBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldChvcEtleSwgc2V0dXAub3B0aW9uc1tvcEtleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGFsZXJ0aWZ5LmRlZmF1bHRzLmhhc093blByb3BlcnR5KG9wS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIGZvdW5kIGluIGRlZmF1bHRzIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Uuc2V0KG9wS2V5LCBhbGVydGlmeS5kZWZhdWx0c1tvcEtleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKG9wS2V5ID09PSAndGl0bGUnICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIHRpdGxlIGtleSwgdXNlIGFsZXJ0aWZ5LmRlZmF1bHRzLmdsb3NzYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldChvcEtleSwgYWxlcnRpZnkuZGVmYXVsdHMuZ2xvc3Nhcnlbb3BLZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgZG9tIGN1c3RvbWl6YXRpb25cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBpbnN0YW5jZS5idWlsZCA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuYnVpbGQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ludm9rZSBwb3N0aW5pdCBnbG9iYWwgaG9va1xyXG4gICAgICAgICAgICAgICAgYWxlcnRpZnkuZGVmYXVsdHMuaG9va3MucG9zdGluaXQoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2FkZCB0byB0aGUgZW5kIG9mIHRoZSBET00gdHJlZS5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnN0YW5jZS5lbGVtZW50cy5yb290KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogbWFpbnRhaW5zIHNjcm9sbCBwb3NpdGlvblxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIHNjcm9sbFgsIHNjcm9sbFk7XHJcbiAgICAgICAgZnVuY3Rpb24gc2F2ZVNjcm9sbFBvc2l0aW9uKCl7XHJcbiAgICAgICAgICAgIHNjcm9sbFggPSBnZXRTY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgICAgIHNjcm9sbFkgPSBnZXRTY3JvbGxUb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVzdG9yZVNjcm9sbFBvc2l0aW9uKCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxYLCBzY3JvbGxZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogYWRkcy9yZW1vdmVzIG5vLW92ZXJmbG93IGNsYXNzIGZyb20gYm9keVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZW5zdXJlTm9PdmVyZmxvdygpe1xyXG4gICAgICAgICAgICB2YXIgcmVxdWlyZXNOb092ZXJmbG93ID0gMDtcclxuICAgICAgICAgICAgZm9yKHZhciB4PTA7eDxvcGVuRGlhbG9ncy5sZW5ndGg7eCs9MSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBvcGVuRGlhbG9nc1t4XTtcclxuICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlLmlzTW9kYWwoKSB8fCBpbnN0YW5jZS5pc01heGltaXplZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlc05vT3ZlcmZsb3crPTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVxdWlyZXNOb092ZXJmbG93ID09PSAwICYmIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3Nlcy5ub092ZXJmbG93KSA+PSAwKXtcclxuICAgICAgICAgICAgICAgIC8vbGFzdCBvcGVuIG1vZGFsIG9yIGxhc3QgbWF4aW1pemVkIG9uZVxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3Nlcy5ub092ZXJmbG93KTtcclxuICAgICAgICAgICAgICAgIHByZXZlbnRCb2R5U2hpZnQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXF1aXJlc05vT3ZlcmZsb3cgPiAwICYmIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3Nlcy5ub092ZXJmbG93KSA8IDApe1xyXG4gICAgICAgICAgICAgICAgLy9maXJzdCBvcGVuIG1vZGFsIG9yIGZpcnN0IG1heGltaXplZCBvbmVcclxuICAgICAgICAgICAgICAgIHByZXZlbnRCb2R5U2hpZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBjbGFzc2VzLm5vT3ZlcmZsb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0b3AgPSAnJywgdG9wU2Nyb2xsID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHByZXZlbnRzIGJvZHkgc2hpZnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBwcmV2ZW50Qm9keVNoaWZ0KGFkZCl7XHJcbiAgICAgICAgICAgIGlmKGFsZXJ0aWZ5LmRlZmF1bHRzLnByZXZlbnRCb2R5U2hpZnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoYWRkICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICl7Ly8mJiBvcGVuRGlhbG9nc1tvcGVuRGlhbG9ncy5sZW5ndGgtMV0uZWxlbWVudHMuZGlhbG9nLmNsaWVudEhlaWdodCA8PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgICAgICB0b3BTY3JvbGwgPSBzY3JvbGxZO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBjbGFzc2VzLmZpeGVkKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9IC1zY3JvbGxZICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZighYWRkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsWSA9IHRvcFNjcm9sbDtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9IHRvcDtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCBjbGFzc2VzLmZpeGVkKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHRcdFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIHRyYW5zaXRpb24gdXNlZCB0byBzaG93L2hpZGUgdGhlIGRpYWxvZ1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVUcmFuc2l0aW9uKGluc3RhbmNlLCB2YWx1ZSwgb2xkVmFsdWUpe1xyXG4gICAgICAgICAgICBpZih0eXBlb2Ygb2xkVmFsdWUgPT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsY2xhc3Nlcy5wcmVmaXggKyAgb2xkVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMucHJlZml4ICsgdmFsdWUpO1xyXG4gICAgICAgICAgICByZWZsb3cgPSBpbnN0YW5jZS5lbGVtZW50cy5yb290Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVG9nZ2xlcyB0aGUgZGlhbG9nIG5vIHRyYW5zaXRpb24gXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRyYW5zaXRpb25PZmYoaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCd0cmFuc2l0aW9uT2ZmJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5ub1RyYW5zaXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm5vVHJhbnNpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRvZ2dsZXMgdGhlIGRpYWxvZyBkaXNwbGF5IG1vZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlRGlzcGxheU1vZGUoaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZS5nZXQoJ21vZGFsJykpe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbWFrZSBtb2RhbFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5tb2RlbGVzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IGlmIG9wZW5cclxuICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlLmlzT3BlbigpKXtcclxuICAgICAgICAgICAgICAgICAgICB1bmJpbmRNb2RlbGVzc0V2ZW50cyhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW4gY2FzZSBhIHBpbm5lZCBtb2RsZXNzIGRpYWxvZyB3YXMgbWFkZSBtb2RhbCB3aGlsZSBvcGVuLlxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUFic1Bvc2l0aW9uRml4KGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZW5zdXJlTm9PdmVyZmxvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vbWFrZSBtb2RlbHNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm1vZGVsZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL29ubHkgaWYgb3BlblxyXG4gICAgICAgICAgICAgICAgaWYoaW5zdGFuY2UuaXNPcGVuKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmRNb2RlbGVzc0V2ZW50cyhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW4gY2FzZSBwaW4vdW5waW4gd2FzIGNhbGxlZCB3aGlsZSBhIG1vZGFsIGlzIG9wZW5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVBYnNQb3NpdGlvbkZpeChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZU5vT3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVG9nZ2xlcyB0aGUgZGlhbG9nIGJhc2ljIHZpZXcgbW9kZSBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQmFzaWNNb2RlKGluc3RhbmNlKXtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnYmFzaWMnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLmJhc2ljKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5iYXNpYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRvZ2dsZXMgdGhlIGRpYWxvZyBmcmFtZWxlc3MgdmlldyBtb2RlIFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVGcmFtZWxlc3NNb2RlKGluc3RhbmNlKXtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnZnJhbWVsZXNzJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5mcmFtZWxlc3MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLmZyYW1lbGVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IEJyaW5ncyB0aGUgbW9kZWxlc3MgZGlhbG9nIHRvIGZyb250LCBhdHRhY2hlZCB0byBtb2RlbGVzcyBkaWFsb2dzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRm9jdXMgZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGJyaW5nVG9Gcm9udChldmVudCwgaW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRG8gbm90IGJyaW5nIHRvIGZyb250IGlmIHByZWNlZWRlZCBieSBhbiBvcGVuIG1vZGFsXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IG9wZW5EaWFsb2dzLmluZGV4T2YoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHg9aW5kZXgrMTt4PG9wZW5EaWFsb2dzLmxlbmd0aDt4Kz0xKXtcclxuICAgICAgICAgICAgICAgIGlmKG9wZW5EaWFsb2dzW3hdLmlzTW9kYWwoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdFxyXG4gICAgICAgICAgICAvLyBCcmluZyB0byBmcm9udCBieSBtYWtpbmcgaXQgdGhlIGxhc3QgY2hpbGQuXHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmJvZHkubGFzdENoaWxkICE9PSBpbnN0YW5jZS5lbGVtZW50cy5yb290KXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UuZWxlbWVudHMucm9vdCk7XHJcbiAgICAgICAgICAgICAgICAvL2Fsc28gbWFrZSBzdXJlIGl0cyBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgICBvcGVuRGlhbG9ncy5zcGxpY2Uob3BlbkRpYWxvZ3MuaW5kZXhPZihpbnN0YW5jZSksMSk7XHJcbiAgICAgICAgICAgICAgICBvcGVuRGlhbG9ncy5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHNldEZvY3VzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0XHRcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHRcdFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogcmVmbGVjdHMgZGlhbG9ncyBvcHRpb25zIHVwZGF0ZXNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbiBUaGUgdXBkYXRlZCBvcHRpb24gbmFtZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5cdHt1bmRlZmluZWR9XHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBvcHRpb25VcGRhdGVkKGluc3RhbmNlLCBvcHRpb24sIG9sZFZhbHVlLCBuZXdWYWx1ZSl7XHJcbiAgICAgICAgICAgIHN3aXRjaChvcHRpb24pe1xyXG4gICAgICAgICAgICBjYXNlICd0aXRsZSc6XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZXRIZWFkZXIobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21vZGFsJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3BsYXlNb2RlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdiYXNpYyc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVCYXNpY01vZGUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZyYW1lbGVzcyc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVGcmFtZWxlc3NNb2RlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwaW5uZWQnOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlUGlubmVkKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjbG9zYWJsZSc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDbG9zYWJsZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWF4aW1pemFibGUnOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTWF4aW1pemFibGUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Bpbm5hYmxlJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVBpbm5hYmxlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb3ZhYmxlJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZU1vdmFibGUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Jlc2l6YWJsZSc6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVSZXNpemFibGUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxyXG4gICAgICAgICAgICAgICAgaWYobmV3VmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubm9QYWRkaW5nKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3Nlcy5ub1BhZGRpbmcpIDwgMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5ub1BhZGRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ292ZXJmbG93JzpcclxuICAgICAgICAgICAgICAgIGlmKG5ld1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm5vT3ZlcmZsb3cpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5zdGFuY2UuZWxlbWVudHMucm9vdC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc2VzLm5vT3ZlcmZsb3cpIDwgMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5ub092ZXJmbG93KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2l0aW9uJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRyYW5zaXRpb24oaW5zdGFuY2UsbmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2l0aW9uT2ZmJzpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRyYW5zaXRpb25PZmYoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGludGVybmFsIG9uIG9wdGlvbiB1cGRhdGVkIGV2ZW50XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBpbnN0YW5jZS5ob29rcy5vbnVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5ob29rcy5vbnVwZGF0ZS5jYWxsKGluc3RhbmNlLCBvcHRpb24sIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHJlZmxlY3RzIGRpYWxvZ3Mgb3B0aW9ucyB1cGRhdGVzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBzZXQvZ2V0IGEgdmFsdWUgb24vZnJvbS5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGUga2V5IHdhcyBmb3VuZC5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGtleSBBIHN0cmluZyBzcGVjaWZ5aW5nIGEgcHJvcGVyeSBuYW1lIG9yIGEgY29sbGVjdGlvbiBvZiBrZXkgdmFsdWUgcGFpcnMuXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIE9wdGlvbmFsLCB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgKGluIGNhc2UgaXQgd2FzIGEgc3RyaW5nKS5cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9uIFRoZSB1cGRhdGVkIG9wdGlvbiBuYW1lLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVyblx0e09iamVjdH0gcmVzdWx0IG9iamVjdCBcclxuICAgICAgICAgKlx0VGhlIHJlc3VsdCBvYmplY3RzIGhhcyBhbiAnb3AnIHByb3BlcnR5LCBpbmRpY2F0aW5nIG9mIHRoaXMgaXMgYSBTRVQgb3IgR0VUIG9wZXJhdGlvbi5cclxuICAgICAgICAgKlx0XHRHRVQ6IFxyXG4gICAgICAgICAqXHRcdC0gZm91bmQ6IGEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBrZXkgd2FzIGZvdW5kIG9yIG5vdC5cclxuICAgICAgICAgKlx0XHQtIHZhbHVlOiB0aGUgcHJvcGVydHkgdmFsdWUuXHJcbiAgICAgICAgICpcdFx0U0VUOlxyXG4gICAgICAgICAqXHRcdC0gaXRlbXM6IGEgbGlzdCBvZiBrZXkgdmFsdWUgcGFpcnMgb2YgdGhlIHByb3BlcnRpZXMgYmVpbmcgc2V0LlxyXG4gICAgICAgICAqXHRcdFx0XHRlYWNoIGNvbnRhaW5zOlxyXG4gICAgICAgICAqXHRcdFx0XHRcdC0gZm91bmQ6IGEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBrZXkgd2FzIGZvdW5kIG9yIG5vdC5cclxuICAgICAgICAgKlx0XHRcdFx0XHQtIGtleTogdGhlIHByb3BlcnR5IGtleS5cclxuICAgICAgICAgKlx0XHRcdFx0XHQtIHZhbHVlOiB0aGUgcHJvcGVydHkgdmFsdWUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKGluc3RhbmNlLCBvYmosIGNhbGxiYWNrLCBrZXksIHZhbHVlKXtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtvcDp1bmRlZmluZWQsIGl0ZW1zOiBbXSB9O1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dldFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm9wID0gJ2dldCc7XHJcbiAgICAgICAgICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoa2V5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudmFsdWUgPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbGQ7XHJcbiAgICAgICAgICAgICAgICAvL3NldFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm9wID0gJ3NldCc7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgbXVsdGlwbGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGtleTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob2JqW3Byb3BdICE9PSBhcmdzW3Byb3BdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQgPSBvYmpbcHJvcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BdID0gYXJnc1twcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGluc3RhbmNlLHByb3AsIG9sZCwgYXJnc1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMucHVzaCh7ICdrZXknOiBwcm9wLCAndmFsdWUnOiBhcmdzW3Byb3BdLCAnZm91bmQnOnRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMucHVzaCh7ICdrZXknOiBwcm9wLCAndmFsdWUnOiBhcmdzW3Byb3BdLCAnZm91bmQnOmZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldCBzaW5nbGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob2JqW2tleV0gIT09IHZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCAgPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGluc3RhbmNlLGtleSwgb2xkLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lml0ZW1zLnB1c2goeydrZXknOiBrZXksICd2YWx1ZSc6IHZhbHVlICwgJ2ZvdW5kJzp0cnVlfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMucHVzaCh7J2tleSc6IGtleSwgJ3ZhbHVlJzogdmFsdWUgLCAnZm91bmQnOmZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2ludmFsaWQgcGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIG11c3QgYmUgYSBzdHJpbmcgb3Igb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmlnZ2VycyBhIGNsb3NlIGV2ZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXHRUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXJDbG9zZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgZm91bmQ7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjayhpbnN0YW5jZSwgZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kID0gaW5zdGFuY2UuZ2V0KCdpbnZva2VPbkNsb3NlT2ZmJykgIT09IHRydWUgJiYgKGJ1dHRvbi5pbnZva2VPbkNsb3NlID09PSB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vbm9uZSBvZiB0aGUgYnV0dG9ucyByZWdpc3RlcmVkIGFzIG9uY2xvc2UgY2FsbGJhY2tcclxuICAgICAgICAgICAgLy9jbG9zZSB0aGUgZGlhbG9nXHJcbiAgICAgICAgICAgIGlmICghZm91bmQgJiYgaW5zdGFuY2UuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpYWxvZ3MgY29tbWFuZHMgZXZlbnQgaGFuZGxlciwgYXR0YWNoZWQgdG8gdGhlIGRpYWxvZyBjb21tYW5kcyBlbGVtZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcdERPTSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXHRUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbW1hbmRzQ2xpY2tIYW5kbGVyKGV2ZW50LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgaW5zdGFuY2UuZWxlbWVudHMuY29tbWFuZHMucGluOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFpbnN0YW5jZS5pc1Bpbm5lZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGluKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5waW4oaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgaW5zdGFuY2UuZWxlbWVudHMuY29tbWFuZHMubWF4aW1pemU6XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlLmlzTWF4aW1pemVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhpbWl6ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgaW5zdGFuY2UuZWxlbWVudHMuY29tbWFuZHMuY2xvc2U6XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2xvc2UoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBwaW5zIHRoZSBtb2RlbGVzcyBkaWFsb2cuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcdFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHBpbihpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvL3BpbiB0aGUgZGlhbG9nXHJcbiAgICAgICAgICAgIGluc3RhbmNlLnNldCgncGlubmVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHVucGlucyB0aGUgbW9kZWxlc3MgZGlhbG9nLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXHRUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVucGluKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vdW5waW4gdGhlIGRpYWxvZyBcclxuICAgICAgICAgICAgaW5zdGFuY2Uuc2V0KCdwaW5uZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBlbmxhcmdlcyB0aGUgZGlhbG9nIHRvIGZpbGwgdGhlIGVudGlyZSBzY3JlZW4uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gbWF4aW1pemUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbm1heGltaXplYCBtZXRob2RcclxuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25tYXhpbWl6ZScsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgLy9tYXhpbWl6ZSB0aGUgZGlhbG9nIFxyXG4gICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm1heGltaXplZCk7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgZW5zdXJlTm9PdmVyZmxvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tYXhpbWl6ZWRgIG1ldGhvZFxyXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbm1heGltaXplZCcsIGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogcmV0dXJucyB0aGUgZGlhbG9nIHRvIGl0cyBmb3JtZXIgc2l6ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXN0b3JlKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25yZXN0b3JlYCBtZXRob2RcclxuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25yZXN0b3JlJywgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAvL21heGltaXplIHRoZSBkaWFsb2cgXHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubWF4aW1pemVkKTtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVOb092ZXJmbG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbnJlc3RvcmVkYCBtZXRob2RcclxuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25yZXN0b3JlZCcsIGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNob3cgb3IgaGlkZSB0aGUgbWF4aW1pemUgYm94LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9uIFRydWUgdG8gYWRkIHRoZSBiZWhhdmlvciwgcmVtb3ZlcyBpdCBvdGhlcndpc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGlubmFibGUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgncGlubmFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLnBpbm5hYmxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5waW5uYWJsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogRml4ZXMgdGhlIGFic29sdXRseSBwb3NpdGlvbmVkIG1vZGFsIGRpdiBwb3NpdGlvbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlhbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZEFic1Bvc2l0aW9uRml4KGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsTGVmdCgpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5tb2RhbC5zdHlsZS5tYXJnaW5Ub3AgPSBnZXRTY3JvbGxUb3AoKSArICdweCc7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpbkxlZnQgPSBzY3JvbGxMZWZ0ICsgJ3B4JztcclxuICAgICAgICAgICAgaW5zdGFuY2UuZWxlbWVudHMubW9kYWwuc3R5bGUubWFyZ2luUmlnaHQgPSAoLXNjcm9sbExlZnQpICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcjogUmVtb3ZlcyB0aGUgYWJzb2x1dGx5IHBvc2l0aW9uZWQgbW9kYWwgZGl2IHBvc2l0aW9uIGZpeC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlhbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUFic1Bvc2l0aW9uRml4KGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludChpbnN0YW5jZS5lbGVtZW50cy5tb2RhbC5zdHlsZS5tYXJnaW5Ub3AsIDEwKTtcclxuICAgICAgICAgICAgdmFyIG1hcmdpbkxlZnQgPSBwYXJzZUludChpbnN0YW5jZS5lbGVtZW50cy5tb2RhbC5zdHlsZS5tYXJnaW5MZWZ0LCAxMCk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpblRvcCA9ICcnO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5tb2RhbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJyc7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsLnN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3AgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSAwXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLnN0eWxlLnRvcCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSBwYXJzZUludChpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2cuc3R5bGUudG9wLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2cuc3R5bGUudG9wID0gKHRvcCArIChtYXJnaW5Ub3AgLSBnZXRTY3JvbGxUb3AoKSkpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLnN0eWxlLmxlZnQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHBhcnNlSW50KGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZy5zdHlsZS5sZWZ0LCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2cuc3R5bGUubGVmdCA9IChsZWZ0ICsgKG1hcmdpbkxlZnQgLSBnZXRTY3JvbGxMZWZ0KCkpKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBBZGRzL1JlbW92ZXMgdGhlIGFic29sdXRseSBwb3NpdGlvbmVkIG1vZGFsIGRpdiBwb3NpdGlvbiBmaXggYmFzZWQgb24gaXRzIHBpbm5lZCBzZXR0aW5nLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQWJzUG9zaXRpb25GaXgoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgLy8gaWYgbW9kZWxlc3MgYW5kIHVucGlubmVkIGFkZCBmaXhcclxuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZS5nZXQoJ21vZGFsJykgJiYgIWluc3RhbmNlLmdldCgncGlubmVkJykpIHtcclxuICAgICAgICAgICAgICAgIGFkZEFic1Bvc2l0aW9uRml4KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFic1Bvc2l0aW9uRml4KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUb2dnbGVzIHRoZSBkaWFsb2cgcG9zaXRpb24gbG9jayB8IG1vZGVsZXNzIG9ubHkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb24gVHJ1ZSB0byBtYWtlIGl0IG1vZGFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGlubmVkKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ3Bpbm5lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLnVucGlubmVkKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFic1Bvc2l0aW9uRml4KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMudW5waW5uZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpICYmICFpbnN0YW5jZS5pc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRBYnNQb3NpdGlvbkZpeChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNob3cgb3IgaGlkZSB0aGUgbWF4aW1pemUgYm94LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9uIFRydWUgdG8gYWRkIHRoZSBiZWhhdmlvciwgcmVtb3ZlcyBpdCBvdGhlcndpc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlTWF4aW1pemFibGUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnbWF4aW1pemFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm1heGltaXphYmxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5tYXhpbWl6YWJsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNob3cgb3IgaGlkZSB0aGUgY2xvc2UgYm94LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9uIFRydWUgdG8gYWRkIHRoZSBiZWhhdmlvciwgcmVtb3ZlcyBpdCBvdGhlcndpc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2xvc2FibGUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnY2xvc2FibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLmNsb3NhYmxlKTtcclxuICAgICAgICAgICAgICAgIGJpbmRDbG9zYWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuY2xvc2FibGUpO1xyXG4gICAgICAgICAgICAgICAgdW5iaW5kQ2xvc2FibGVFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2FuY2VsQ2xpY2sgPSBmYWxzZSwvLyBmbGFnIHRvIGNhbmNlbCBjbGljayBldmVudCBpZiBhbHJlYWR5IGhhbmRsZWQgYnkgZW5kIHJlc2l6ZSBldmVudCAodGhlIG1vdXNlZG93biwgbW91c2Vtb3ZlLCBtb3VzZXVwIHNlcXVlbmNlIGZpcmVzIGEgY2xpY2sgZXZlbnQuKS5cclxuICAgICAgICAgICAgbW9kYWxDbGlja0hhbmRsZXJUUz0wIC8vIHN0b3JlcyBsYXN0IGNsaWNrIHRpbWVzdGFtcCB0byBwcmV2ZW50IGV4ZWN1dGluZyB0aGUgaGFuZGxlciB0d2ljZSBvbiBkb3VibGUgY2xpY2suXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBjbG9zZXMgdGhlIG1vZGFsIGRpYWxvZyB3aGVuIGNsaWNraW5nIHRoZSBtb2RhbFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcdERPTSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBtb2RhbENsaWNrSGFuZGxlcihldmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGltZVN0YW1wIC0gbW9kYWxDbGlja0hhbmRsZXJUUyA+IDIwMCAmJiAobW9kYWxDbGlja0hhbmRsZXJUUyA9IGV2ZW50LnRpbWVTdGFtcCkgJiYgIWNhbmNlbENsaWNrKXtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ2Nsb3NhYmxlQnlEaW1tZXInKSA9PT0gdHJ1ZSAmJiB0YXJnZXQgPT09IGluc3RhbmNlLmVsZW1lbnRzLm1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNsb3NlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYW5jZWxDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3RvcmVzIGxhc3QgY2FsbCB0aW1lc3RhbXAgdG8gcHJldmVudCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFjayB0d2ljZS5cclxuICAgICAgICB2YXIgY2FsbGJhY2tUUyA9IDA7XHJcbiAgICAgICAgLy8gZmxhZyB0byBjYW5jZWwga2V5dXAgZXZlbnQgaWYgYWxyZWFkeSBoYW5kbGVkIGJ5IGNsaWNrIGV2ZW50IChwcmVzc2luZyBFbnRlciBvbiBhIGZvY3VzdGVkIGJ1dHRvbikuXHJcbiAgICAgICAgdmFyIGNhbmNlbEtleXVwID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIEhlbHBlcjogdHJpZ2dlcnMgYSBidXR0b24gY2FsbGJhY2tcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVx0XHRUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn1cdENhbGxiYWNrIHRvIGNoZWNrIHdoaWNoIGJ1dHRvbiB0cmlnZ2VyZWQgdGhlIGV2ZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXJDYWxsYmFjayhpbnN0YW5jZSwgY2hlY2spIHtcclxuICAgICAgICAgICAgaWYoRGF0ZS5ub3coKSAtIGNhbGxiYWNrVFMgPiAyMDAgJiYgKGNhbGxiYWNrVFMgPSBEYXRlLm5vdygpKSl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnMubGVuZ3RoOyBpZHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnNbaWR4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1dHRvbi5lbGVtZW50LmRpc2FibGVkICYmIGNoZWNrKGJ1dHRvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsb3NlRXZlbnQgPSBjcmVhdGVDbG9zZUV2ZW50KGlkeCwgYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZS5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2suYXBwbHkoaW5zdGFuY2UsIFtjbG9zZUV2ZW50XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jbG9zZSB0aGUgZGlhbG9nIG9ubHkgaWYgbm90IGNhbmNlbGVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VFdmVudC5jYW5jZWwgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xpY2tzIGV2ZW50IGhhbmRsZXIsIGF0dGFjaGVkIHRvIHRoZSBkaWFsb2cgZm9vdGVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH1cdFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cdFx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBidXR0b25zQ2xpY2tIYW5kbGVyKGV2ZW50LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjayhpbnN0YW5jZSwgZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBidXR0b24gY2F1c2VkIHRoZSBjbGljaywgY2FuY2VsIGtleXVwIGV2ZW50XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnV0dG9uLmVsZW1lbnQgPT09IHRhcmdldCAmJiAoY2FuY2VsS2V5dXAgPSB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZXl1cCBldmVudCBoYW5kbGVyLCBhdHRhY2hlZCB0byB0aGUgZG9jdW1lbnQuYm9keVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH1cdFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cdFx0VGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBrZXl1cEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy9oaXR0aW5nIGVudGVyIHdoaWxlIGJ1dHRvbiBoYXMgZm9jdXMgd2lsbCB0cmlnZ2VyIGtleXVwIHRvby5cclxuICAgICAgICAgICAgLy9pZ25vcmUgaWYgaGFuZGxlZCBieSBjbGlja0hhbmRsZXJcclxuICAgICAgICAgICAgaWYgKGNhbmNlbEtleXVwKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxLZXl1cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IG9wZW5EaWFsb2dzW29wZW5EaWFsb2dzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnMubGVuZ3RoID09PSAwICYmIGtleUNvZGUgPT09IGtleXMuRVNDICYmIGluc3RhbmNlLmdldCgnY2xvc2FibGUnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNsb3NlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKHVzZWRLZXlzLmluZGV4T2Yoa2V5Q29kZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrKGluc3RhbmNlLCBmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbi5rZXkgPT09IGtleUNvZGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEtleWRvd24gZXZlbnQgaGFuZGxlciwgYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50LmJvZHlcclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAcGFyYW0ge0V2ZW50fVx0XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICogQHBhcmFtIHtPYmplY3R9XHRcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAqIFxyXG4gICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24ga2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gb3BlbkRpYWxvZ3Nbb3BlbkRpYWxvZ3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcclxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IGtleXMuTEVGVCB8fCBrZXlDb2RlID09PSBrZXlzLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9ucyA9IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9ucztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgYnV0dG9ucy5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBidXR0b25zW3hdLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Uga2V5cy5MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1soeCB8fCBidXR0b25zLmxlbmd0aCkgLSAxXS5lbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNbKHggKyAxKSAlIGJ1dHRvbnMubGVuZ3RoXS5lbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChrZXlDb2RlIDwga2V5cy5GMTIgKyAxICYmIGtleUNvZGUgPiBrZXlzLkYxIC0gMSAmJiB1c2VkS2V5cy5pbmRleE9mKGtleUNvZGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjayhpbnN0YW5jZSwgZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidXR0b24ua2V5ID09PSBrZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIGZvY3VzIHRvIHByb3BlciBkaWFsb2cgZWxlbWVudFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IFtyZXNldFRhcmdldD11bmRlZmluZWRdIERPTSBlbGVtZW50IHRvIHJlc2V0IGZvY3VzIHRvLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNldEZvY3VzKGluc3RhbmNlLCByZXNldFRhcmdldCkge1xyXG4gICAgICAgICAgICAvLyByZXNldCB0YXJnZXQgaGFzIGFscmVhZHkgYmVlbiBkZXRlcm1pbmVkLlxyXG4gICAgICAgICAgICBpZiAocmVzZXRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGluc3RhbmNlIGZvY3VzIHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICB2YXIgZm9jdXMgPSBpbnN0YW5jZS5fX2ludGVybmFsLmZvY3VzO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZvY3VzIGVsZW1lbnQuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGZvY3VzLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgZm9jdXMuZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYSBudW1iZXIgbWVhbnMgYSBidXR0b24gaW5kZXhcclxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9ucy5sZW5ndGggPiBmb2N1cy5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW4gYmFzaWMgdmlldywgc2tpcCBmb2N1c2luZyB0aGUgYnV0dG9ucy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgnYmFzaWMnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluc3RhbmNlLl9faW50ZXJuYWwuYnV0dG9uc1tmb2N1cy5lbGVtZW50XS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gYSBzdHJpbmcgbWVhbnMgcXVlcnlTZWxlY3RvciB0byBzZWxlY3QgZnJvbSBkaWFsb2cgYm9keSBjb250ZW50cy5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGluc3RhbmNlLmVsZW1lbnRzLmJvZHkucXVlcnlTZWxlY3Rvcihmb2N1cy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIGEgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZm9jdXMgZWxlbWVudC5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZm9jdXMuZWxlbWVudC5jYWxsKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBubyBmb2N1cyBlbGVtZW50LCBkZWZhdWx0IHRvIGZpcnN0IHJlc2V0IGVsZW1lbnQuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdkZWZhdWx0Rm9jdXNPZmYnKSA9PT0gdHJ1ZSB8fCAoKHR5cGVvZiBlbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBlbGVtZW50ID09PSBudWxsKSAmJiBpbnN0YW5jZS5fX2ludGVybmFsLmJ1dHRvbnMubGVuZ3RoID09PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBpbnN0YW5jZS5lbGVtZW50cy5yZXNldFswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGZvY3VzXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHNlbGVjdGFibGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXMuc2VsZWN0ICYmIGVsZW1lbnQuc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGb2N1cyBldmVudCBoYW5kbGVyLCBhdHRhY2hlZCB0byBkb2N1bWVudC5ib2R5IGFuZCBkaWFsb2dzIG93biByZXNldCBsaW5rcy5cclxuICAgICAgICAgKiBoYW5kbGVzIHRoZSBmb2N1cyBmb3IgbW9kYWwgZGlhbG9ncyBvbmx5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRE9NIGZvY3VzIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG9uUmVzZXQoZXZlbnQsIGluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzaG91bGQgd29yayBvbiBsYXN0IG1vZGFsIGlmIHRyaWdnZXJlZCBmcm9tIGRvY3VtZW50LmJvZHkgXHJcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSBvcGVuRGlhbG9ncy5sZW5ndGggLSAxOyB4ID4gLTE7IHggLT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuRGlhbG9nc1t4XS5pc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBvcGVuRGlhbG9nc1t4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbW9kYWxcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pc01vZGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZXRlcm1pbmUgcmVzZXQgdGFyZ2V0IHRvIGVuYWJsZSBmb3J3YXJkL2JhY2t3YXJkIHRhYiBjeWNsZS5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3RSZXNldCA9IGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVzZXQgPSBpbnN0YW5jZS5lbGVtZW50cy5yZXNldFsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEZvY3VzZWRFbGVtZW50ID0gZXZlbnQucmVsYXRlZFRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aGluID0gaW5zdGFuY2UuZWxlbWVudHMucm9vdC5jb250YWlucyhsYXN0Rm9jdXNlZEVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRUYXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIHByZXZpb3VzIGZvY3VzZWQgZWxlbWVudCBlbGVtZW50IHdhcyBvdXRzaWRlIHRoZSBtb2RhbCBkbyBudGhpbmdcclxuICAgICAgICAgICAgICAgICAgICBpZiggIC8qZmlyc3Qgc2hvdyAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0ID09PSBmaXJzdFJlc2V0ICYmICF3aXRoaW4pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvKmZvY3VzIGN5Y2xlICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQgPT09IGxhc3RSZXNldCAmJiBsYXN0Rm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0UmVzZXQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRhcmdldCA9PT0gbGFzdFJlc2V0IHx8IHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0ID0gZmlyc3RSZXNldDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0YXJnZXQgPT09IGZpcnN0UmVzZXQgJiYgbGFzdEZvY3VzZWRFbGVtZW50ID09PSBsYXN0UmVzZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldFRhcmdldCA9IGZpbmRUYWJiYWJsZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodGFyZ2V0ID09PSBmaXJzdFJlc2V0ICYmIHdpdGhpbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VGFyZ2V0ID0gZmluZFRhYmJhYmxlKGluc3RhbmNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9jdXNcclxuICAgICAgICAgICAgICAgICAgICBzZXRGb2N1cyhpbnN0YW5jZSwgcmVzZXRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRUYWJiYWJsZShpbnN0YW5jZSwgbGFzdCl7XHJcbiAgICAgICAgICAgIHZhciB0YWJiYWJsZXMgPSBbXS5zbGljZS5jYWxsKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZy5xdWVyeVNlbGVjdG9yQWxsKGRlZmF1bHRzLnRhYmJhYmxlKSk7XHJcbiAgICAgICAgICAgIGlmKGxhc3Qpe1xyXG4gICAgICAgICAgICAgICAgdGFiYmFibGVzLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIHg9MDt4PHRhYmJhYmxlcy5sZW5ndGg7eCs9MSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFiYmFibGUgPSB0YWJiYWJsZXNbeF07XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHZpc2libGVcclxuICAgICAgICAgICAgICAgIGlmKCEhKHRhYmJhYmxlLm9mZnNldFBhcmVudCB8fCB0YWJiYWJsZS5vZmZzZXRXaWR0aCB8fCB0YWJiYWJsZS5vZmZzZXRIZWlnaHQgfHwgdGFiYmFibGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFiYmFibGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVjeWNsZVRhYihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBvcGVuRGlhbG9nc1tvcGVuRGlhbG9ncy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlICYmIGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IGtleXMuVEFCKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5lbGVtZW50cy5yZXNldFsxXS5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zaXRpb24gaW4gdHJhbnNpdGlvbmVuZCBldmVudCBoYW5kbGVyLiBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9XHRcdFRyYW5zaXRpb25FbmQgZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVx0XHRUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVHJhbnNpdGlvbkluRXZlbnQoZXZlbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lclxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50aW1lckluKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9uY2UgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZSwgc2V0IGZvY3VzXHJcbiAgICAgICAgICAgIHNldEZvY3VzKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IGhhbmRsaW5nIGtleSB1cCBhZnRlciB0cmFuc2l0aW9uIGVuZGVkLlxyXG4gICAgICAgICAgICBjYW5jZWxLZXl1cCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbmZvY3VzYCBtZXRob2RcclxuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25mb2N1cycsIGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVuYmluZCB0aGUgZXZlbnRcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgdHJhbnNpdGlvbi50eXBlLCBpbnN0YW5jZS5fX2ludGVybmFsLnRyYW5zaXRpb25JbkhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25Jbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2l0aW9uIG91dCB0cmFuc2l0aW9uZW5kIGV2ZW50IGhhbmRsZXIuIFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH1cdFx0VHJhbnNpdGlvbkVuZCBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XHRcdFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVUcmFuc2l0aW9uT3V0RXZlbnQoZXZlbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lclxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50aW1lck91dCk7XHJcbiAgICAgICAgICAgIC8vIHVuYmluZCB0aGUgZXZlbnRcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgdHJhbnNpdGlvbi50eXBlLCBpbnN0YW5jZS5fX2ludGVybmFsLnRyYW5zaXRpb25PdXRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2V0IG1vdmUgdXBkYXRlc1xyXG4gICAgICAgICAgICByZXNldE1vdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAvLyByZXNldCByZXNpemUgdXBkYXRlc1xyXG4gICAgICAgICAgICByZXNldFJlc2l6ZShpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXN0b3JlIGlmIG1heGltaXplZFxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNNYXhpbWl6ZWQoKSAmJiAhaW5zdGFuY2UuZ2V0KCdzdGFydE1heGltaXplZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN0b3JlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kZXN0b3J5IHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlLl9faW50ZXJuYWwuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuX19pbnRlcm5hbC5kZXN0cm95LmFwcGx5KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBDb250cm9scyBtb3ZpbmcgYSBkaWFsb2cgYXJvdW5kICovXHJcbiAgICAgICAgLy9ob2xkZSB0aGUgY3VycmVudCBtb3ZpbmcgaW5zdGFuY2VcclxuICAgICAgICB2YXIgbW92YWJsZSA9IG51bGwsXHJcbiAgICAgICAgICAgIC8vaG9sZHMgdGhlIGN1cnJlbnQgWCBvZmZzZXQgd2hlbiBtb3ZlIHN0YXJ0c1xyXG4gICAgICAgICAgICBvZmZzZXRYID0gMCxcclxuICAgICAgICAgICAgLy9ob2xkcyB0aGUgY3VycmVudCBZIG9mZnNldCB3aGVuIG1vdmUgc3RhcnRzXHJcbiAgICAgICAgICAgIG9mZnNldFkgPSAwLFxyXG4gICAgICAgICAgICB4UHJvcCA9ICdwYWdlWCcsXHJcbiAgICAgICAgICAgIHlQcm9wID0gJ3BhZ2VZJyxcclxuICAgICAgICAgICAgYm91bmRzID0gbnVsbCxcclxuICAgICAgICAgICAgcmVmcmVzaFRvcCA9IGZhbHNlLFxyXG4gICAgICAgICAgICBtb3ZlRGVsZWdhdGUgPSBudWxsXHJcbiAgICAgICAgO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHNldHMgdGhlIGVsZW1lbnQgdG9wL2xlZnQgY29vcmRpbmF0ZXNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudCBUaGUgZWxlbWVudCBiZWluZyBtb3ZlZC5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gbW92ZUVsZW1lbnQoZXZlbnQsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGxlZnQgPSAoZXZlbnRbeFByb3BdIC0gb2Zmc2V0WCksXHJcbiAgICAgICAgICAgICAgICB0b3AgID0gKGV2ZW50W3lQcm9wXSAtIG9mZnNldFkpO1xyXG5cclxuICAgICAgICAgICAgaWYocmVmcmVzaFRvcCl7XHJcbiAgICAgICAgICAgICAgICB0b3AgLT0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBzZXRzIHRoZSBlbGVtZW50IHRvcC9sZWZ0IGNvb3JkaW5hdGVzIHdpdGhpbiBzY3JlZW4gYm91bmRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgVGhlIGVsZW1lbnQgYmVpbmcgbW92ZWQuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVFbGVtZW50Qm91bmRlZChldmVudCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGVmdCA9IChldmVudFt4UHJvcF0gLSBvZmZzZXRYKSxcclxuICAgICAgICAgICAgICAgIHRvcCAgPSAoZXZlbnRbeVByb3BdIC0gb2Zmc2V0WSk7XHJcblxyXG4gICAgICAgICAgICBpZihyZWZyZXNoVG9wKXtcclxuICAgICAgICAgICAgICAgIHRvcCAtPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5taW4oYm91bmRzLm1heExlZnQsIE1hdGgubWF4KGJvdW5kcy5taW5MZWZ0LCBsZWZ0KSkgKyAncHgnO1xyXG4gICAgICAgICAgICBpZihyZWZyZXNoVG9wKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5taW4oYm91bmRzLm1heFRvcCwgTWF0aC5tYXgoYm91bmRzLm1pblRvcCwgdG9wKSkgKyAncHgnO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5tYXgoYm91bmRzLm1pblRvcCwgdG9wKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmlnZ2VycyB0aGUgc3RhcnQgb2YgYSBtb3ZlIGV2ZW50LCBhdHRhY2hlZCB0byB0aGUgaGVhZGVyIGVsZW1lbnQgbW91c2UgZG93biBldmVudC5cclxuICAgICAgICAgKiBBZGRzIG5vLXNlbGVjdGlvbiBjbGFzcyB0byB0aGUgYm9keSwgZGlzYWJsaW5nIHNlbGVjdGlvbiB3aGlsZSBtb3ZpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gYmVnaW5Nb3ZlKGV2ZW50LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpZiAocmVzaXphYmxlID09PSBudWxsICYmICFpbnN0YW5jZS5pc01heGltaXplZCgpICYmIGluc3RhbmNlLmdldCgnbW92YWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRTcmMsIGxlZnQ9MCwgdG9wPTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNyYyA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgeFByb3AgPSAnY2xpZW50WCc7XHJcbiAgICAgICAgICAgICAgICAgICAgeVByb3AgPSAnY2xpZW50WSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3JjID0gZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50U3JjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzZXMuY2FwdHVyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHBhcnNlSW50KGVsZW1lbnQuc3R5bGUubGVmdCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IHBhcnNlSW50KGVsZW1lbnQuc3R5bGUudG9wLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBldmVudFNyY1t4UHJvcF0gLSBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBldmVudFNyY1t5UHJvcF0gLSB0b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluc3RhbmNlLmlzTW9kYWwoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFkgKz0gaW5zdGFuY2UuZWxlbWVudHMubW9kYWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGluc3RhbmNlLmlzUGlubmVkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIC09IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnN0YW5jZS5nZXQoJ21vdmVCb3VuZGVkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ID0gLWxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAtdG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxjIG9mZnNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ICs9IGN1cnJlbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSBjdXJyZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoY3VycmVudCA9IGN1cnJlbnQub2Zmc2V0UGFyZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExlZnQgOiBvZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluTGVmdCA6IC1vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4VG9wICA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSBlbGVtZW50LmNsaWVudEhlaWdodCAtIG9mZnNldFRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblRvcCAgOiAtb2Zmc2V0VG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVEZWxlZ2F0ZSA9IG1vdmVFbGVtZW50Qm91bmRlZDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURlbGVnYXRlID0gbW92ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tb3ZlYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbm1vdmUnLCBpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hUb3AgPSAhaW5zdGFuY2UuaXNNb2RhbCgpICYmIGluc3RhbmNlLmlzUGlubmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92YWJsZSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVEZWxlZ2F0ZShldmVudFNyYywgZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3Nlcy5ub1NlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgYWN0dWFsIG1vdmUgaGFuZGxlciwgIGF0dGFjaGVkIHRvIGRvY3VtZW50LmJvZHkgbW91c2Vtb3ZlIGV2ZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcdERPTSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKG1vdmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudFNyYztcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2htb3ZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTcmMgPSBldmVudC50YXJnZXRUb3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNyYyA9IGV2ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50U3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZURlbGVnYXRlKGV2ZW50U3JjLCBtb3ZhYmxlLmVsZW1lbnRzLmRpYWxvZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyaWdnZXJzIHRoZSBlbmQgb2YgYSBtb3ZlIGV2ZW50LCAgYXR0YWNoZWQgdG8gZG9jdW1lbnQuYm9keSBtb3VzZXVwIGV2ZW50LlxyXG4gICAgICAgICAqIFJlbW92ZXMgbm8tc2VsZWN0aW9uIGNsYXNzIGZyb20gZG9jdW1lbnQuYm9keSwgYWxsb3dpbmcgc2VsZWN0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuZE1vdmUoKSB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBtb3ZhYmxlO1xyXG4gICAgICAgICAgICAgICAgbW92YWJsZSA9IGJvdW5kcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCBjbGFzc2VzLm5vU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgY2xhc3Nlcy5jYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tb3ZlZGAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbm1vdmVkJywgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXNldHMgYW55IGNoYW5nZXMgbWFkZSBieSBtb3ZpbmcgdGhlIGVsZW1lbnQgdG8gaXRzIG9yaWdpbmFsIHN0YXRlLFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXNldE1vdmUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgbW92YWJsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nO1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBlbGVtZW50LnN0eWxlLnRvcCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXBkYXRlcyB0aGUgZGlhbG9nIG1vdmUgYmVoYXZpb3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb24gVHJ1ZSB0byBhZGQgdGhlIGJlaGF2aW9yLCByZW1vdmVzIGl0IG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVNb3ZhYmxlKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ21vdmFibGUnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhpbnN0YW5jZS5lbGVtZW50cy5yb290LCBjbGFzc2VzLm1vdmFibGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZE1vdmFibGVFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXRcclxuICAgICAgICAgICAgICAgIHJlc2V0TW92ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMubW92YWJsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaXNPcGVuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bmJpbmRNb3ZhYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogQ29udHJvbHMgbW92aW5nIGEgZGlhbG9nIGFyb3VuZCAqL1xyXG4gICAgICAgIC8vaG9sZGUgdGhlIGN1cnJlbnQgaW5zdGFuY2UgYmVpbmcgcmVzaXplZFx0XHRcclxuICAgICAgICB2YXIgcmVzaXphYmxlID0gbnVsbCxcclxuICAgICAgICAgICAgLy9ob2xkcyB0aGUgc3RhcmluZyBsZWZ0IG9mZnNldCB3aGVuIHJlc2l6ZSBzdGFydHMuXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nTGVmdCA9IE51bWJlci5OYW4sXHJcbiAgICAgICAgICAgIC8vaG9sZHMgdGhlIHN0YXJpbmcgd2lkdGggd2hlbiByZXNpemUgc3RhcnRzLlxyXG4gICAgICAgICAgICBzdGFydGluZ1dpZHRoID0gMCxcclxuICAgICAgICAgICAgLy9ob2xkcyB0aGUgaW5pdGlhbCB3aWR0aCB3aGVuIHJlc2l6ZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG4gICAgICAgICAgICBtaW5XaWR0aCA9IDAsXHJcbiAgICAgICAgICAgIC8vaG9sZHMgdGhlIG9mZnNldCBvZiB0aGUgcmVzaXplIGhhbmRsZS5cclxuICAgICAgICAgICAgaGFuZGxlT2Zmc2V0ID0gMFxyXG4gICAgICAgIDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyOiBzZXRzIHRoZSBlbGVtZW50IHdpZHRoL2hlaWdodCBhbmQgdXBkYXRlcyBsZWZ0IGNvb3JkaW5hdGUgaWYgbmVjY2Vzc2FyeS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHRET00gbW91c2Vtb3ZlIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgVGhlIGVsZW1lbnQgYmVpbmcgbW92ZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBwaW5uZWQgQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGVsZW1lbnQgYmVpbmcgcmVzaXplZCBpcyBwaW5uZWQgdG8gdGhlIHNjcmVlbi5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzaXplRWxlbWVudChldmVudCwgZWxlbWVudCwgcGFnZVJlbGF0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAvL2NhbGN1bGF0ZSBvZmZzZXRzIGZyb20gMCwwXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdmFyIG9mZnNldExlZnQgPSAwO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gMDtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCArPSBjdXJyZW50Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgKz0gY3VycmVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQgPSBjdXJyZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgWCxZIGNvb3JkaW5hdGVzLlxyXG4gICAgICAgICAgICB2YXIgWCwgWTtcclxuICAgICAgICAgICAgaWYgKHBhZ2VSZWxhdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgWCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgWSA9IGV2ZW50LnBhZ2VZO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgWCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICBZID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBydGwgaGFuZGxpbmdcclxuICAgICAgICAgICAgdmFyIGlzUlRMID0gaXNSaWdodFRvTGVmdCgpO1xyXG4gICAgICAgICAgICBpZiAoaXNSVEwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJldmVyc2UgWCBcclxuICAgICAgICAgICAgICAgIFggPSBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC0gWDtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGhhcyBhIHN0YXJ0aW5nIGxlZnQsIGNhbGN1bGF0ZSBvZmZzZXRSaWdodFxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihzdGFydGluZ0xlZnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLSBvZmZzZXRMZWZ0IC0gZWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHdpZHRoL2hlaWdodFxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IChZIC0gb2Zmc2V0VG9wICsgaGFuZGxlT2Zmc2V0KSArICdweCc7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAoWCAtIG9mZnNldExlZnQgKyBoYW5kbGVPZmZzZXQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGJlaW5nIHJlc2l6ZWQgaGFzIGEgc3RhcnRpbmcgbGVmdCwgbWFpbnRhaW4gaXQuXHJcbiAgICAgICAgICAgIC8vIHRoZSBkaWFsb2cgaXMgY2VudGVyZWQsIGRpdmlkZSBieSBoYWxmIHRoZSBvZmZzZXQgdG8gbWFpbnRhaW4gdGhlIG1hcmdpbnMuXHJcbiAgICAgICAgICAgIGlmICghaXNOYU4oc3RhcnRpbmdMZWZ0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLmFicyhlbGVtZW50Lm9mZnNldFdpZHRoIC0gc3RhcnRpbmdXaWR0aCkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSVEwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL25lZ2F0ZSB0aGUgZGlmZiwgd2h5P1xyXG4gICAgICAgICAgICAgICAgICAgIC8vd2hlbiBncm93aW5nIGl0IHNob3VsZCBkZWNyZWFzZSBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgLy93aGVuIHNocmlua2luZyBpdCBzaG91bGQgaW5jcmVhc2UgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmYgKj0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5vZmZzZXRXaWR0aCA+IHN0YXJ0aW5nV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2dyb3dpbmdcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAoc3RhcnRpbmdMZWZ0ICsgZGlmZikgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm9mZnNldFdpZHRoID49IG1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaHJpbmtpbmdcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAoc3RhcnRpbmdMZWZ0IC0gZGlmZikgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmlnZ2VycyB0aGUgc3RhcnQgb2YgYSByZXNpemUgZXZlbnQsIGF0dGFjaGVkIHRvIHRoZSByZXNpemUgaGFuZGxlIGVsZW1lbnQgbW91c2UgZG93biBldmVudC5cclxuICAgICAgICAgKiBBZGRzIG5vLXNlbGVjdGlvbiBjbGFzcyB0byB0aGUgYm9keSwgZGlzYWJsaW5nIHNlbGVjdGlvbiB3aGlsZSBtb3ZpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0RE9NIGV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gYmVnaW5SZXNpemUoZXZlbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UuaXNNYXhpbWl6ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50U3JjO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRTcmMgPSBldmVudC50YXJnZXRUb3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5idXR0b24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNyYyA9IGV2ZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50U3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbnJlc2l6ZWAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25yZXNpemUnLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2Zmc2V0ID0gaW5zdGFuY2UuZWxlbWVudHMucmVzaXplSGFuZGxlLm9mZnNldEhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBpbnN0YW5jZS5lbGVtZW50cy5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3Nlcy5jYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydGluZ0xlZnQgPSBwYXJzZUludChlbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1pbkhlaWdodCA9IGluc3RhbmNlLmVsZW1lbnRzLmhlYWRlci5vZmZzZXRIZWlnaHQgKyBpbnN0YW5jZS5lbGVtZW50cy5mb290ZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gKHN0YXJ0aW5nV2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlLm1heFdpZHRoICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IChtaW5XaWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGgpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5tYXhXaWR0aCA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBjbGFzc2VzLm5vU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBhY3R1YWwgcmVzaXplIGhhbmRsZXIsICBhdHRhY2hlZCB0byBkb2N1bWVudC5ib2R5IG1vdXNlbW92ZSBldmVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHRET00gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXNpemUoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc2l6YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50U3JjO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNyYyA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U3JjID0gZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRTcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNpemVFbGVtZW50KGV2ZW50U3JjLCByZXNpemFibGUuZWxlbWVudHMuZGlhbG9nLCAhcmVzaXphYmxlLmdldCgnbW9kYWwnKSAmJiAhcmVzaXphYmxlLmdldCgncGlubmVkJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmlnZ2VycyB0aGUgZW5kIG9mIGEgcmVzaXplIGV2ZW50LCAgYXR0YWNoZWQgdG8gZG9jdW1lbnQuYm9keSBtb3VzZXVwIGV2ZW50LlxyXG4gICAgICAgICAqIFJlbW92ZXMgbm8tc2VsZWN0aW9uIGNsYXNzIGZyb20gZG9jdW1lbnQuYm9keSwgYWxsb3dpbmcgc2VsZWN0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuZFJlc2l6ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHJlc2l6YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gcmVzaXphYmxlO1xyXG4gICAgICAgICAgICAgICAgcmVzaXphYmxlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIGNsYXNzZXMubm9TZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLCBjbGFzc2VzLmNhcHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbnJlc2l6ZWRgIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25yZXNpemVkJywgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXNldHMgYW55IGNoYW5nZXMgbWFkZSBieSByZXNpemluZyB0aGUgZWxlbWVudCB0byBpdHMgb3JpZ2luYWwgc3RhdGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0UmVzaXplKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJlc2l6YWJsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5zdHlsZS5tYXhXaWR0aCA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NsZWFyIGlubGluZSBzdHlsZXMuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1heFdpZHRoID0gZWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IGVsZW1lbnQuc3R5bGUud2lkdGggPSBlbGVtZW50LnN0eWxlLmhlaWdodCA9IGVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gZWxlbWVudC5zdHlsZS5sZWZ0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAvL3Jlc2V0IHZhcmlhYmxlcy5cclxuICAgICAgICAgICAgICAgIHN0YXJ0aW5nTGVmdCA9IE51bWJlci5OYW47XHJcbiAgICAgICAgICAgICAgICBzdGFydGluZ1dpZHRoID0gbWluV2lkdGggPSBoYW5kbGVPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXBkYXRlcyB0aGUgZGlhbG9nIG1vdmUgYmVoYXZpb3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb24gVHJ1ZSB0byBhZGQgdGhlIGJlaGF2aW9yLCByZW1vdmVzIGl0IG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVSZXNpemFibGUoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgncmVzaXphYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFkZCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoaW5zdGFuY2UuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5yZXNpemFibGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlzT3BlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZFJlc2l6YWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3Jlc2V0XHJcbiAgICAgICAgICAgICAgICByZXNldFJlc2l6ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGluc3RhbmNlLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMucmVzaXphYmxlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuYmluZFJlc2l6YWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2V0IG1vdmUvcmVzaXplIG9uIHdpbmRvdyByZXNpemUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFx0d2luZG93IHJlc2l6ZSBldmVudCBvYmplY3QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gd2luZG93UmVzaXplKC8qZXZlbnQqLykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IG9wZW5EaWFsb2dzLmxlbmd0aDsgeCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBvcGVuRGlhbG9nc1t4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ2F1dG9SZXNldCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRNb3ZlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNldFJlc2l6ZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmluZCBkaWFsb2dzIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiaW5kRXZlbnRzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGZpcnN0IGRpYWxvZywgaG9vayBnbG9iYWwgaGFuZGxlcnNcclxuICAgICAgICAgICAgaWYgKG9wZW5EaWFsb2dzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy9nbG9iYWxcclxuICAgICAgICAgICAgICAgIG9uKHdpbmRvdywgJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudC5ib2R5LCAna2V5dXAnLCBrZXl1cEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQuYm9keSwgJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudC5ib2R5LCAnZm9jdXMnLCBvblJlc2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21vdmVcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNlbW92ZScsIG1vdmUpO1xyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAndG91Y2htb3ZlJywgbW92ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNldXAnLCBlbmRNb3ZlKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNoZW5kJywgZW5kTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3Jlc2l6ZVxyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2Vtb3ZlJywgcmVzaXplKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ3RvdWNobW92ZScsIHJlc2l6ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNldXAnLCBlbmRSZXNpemUpO1xyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAndG91Y2hlbmQnLCBlbmRSZXNpemUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb21tb24gZXZlbnRzXHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLmNvbW1hbmRzLmNvbnRhaW5lciwgJ2NsaWNrJywgaW5zdGFuY2UuX19pbnRlcm5hbC5jb21tYW5kc0NsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLmZvb3RlciwgJ2NsaWNrJywgaW5zdGFuY2UuX19pbnRlcm5hbC5idXR0b25zQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMF0sICdmb2N1c2luJywgaW5zdGFuY2UuX19pbnRlcm5hbC5yZXNldEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBvbihpbnN0YW5jZS5lbGVtZW50cy5yZXNldFswXSwgJ2tleWRvd24nLCByZWN5Y2xlVGFiKTtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMV0sICdmb2N1c2luJywgaW5zdGFuY2UuX19pbnRlcm5hbC5yZXNldEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgLy9wcmV2ZW50IGhhbmRsaW5nIGtleSB1cCB3aGVuIGRpYWxvZyBpcyBiZWluZyBvcGVuZWQgYnkgYSBrZXkgc3Ryb2tlLlxyXG4gICAgICAgICAgICBjYW5jZWxLZXl1cCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGhvb2sgaW4gdHJhbnNpdGlvbiBoYW5kbGVyXHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgdHJhbnNpdGlvbi50eXBlLCBpbnN0YW5jZS5fX2ludGVybmFsLnRyYW5zaXRpb25JbkhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gbW9kZWxzcyBvbmx5IGV2ZW50c1xyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlLmdldCgnbW9kYWwnKSkge1xyXG4gICAgICAgICAgICAgICAgYmluZE1vZGVsZXNzRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmVzaXphYmxlXHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5nZXQoJ3Jlc2l6YWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICBiaW5kUmVzaXphYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbW92YWJsZVxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdtb3ZhYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIGJpbmRNb3ZhYmxlRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVW5iaW5kIGRpYWxvZ3MgZXZlbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVuYmluZEV2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBsYXN0IGRpYWxvZywgcmVtb3ZlIGdsb2JhbCBoYW5kbGVyc1xyXG4gICAgICAgICAgICBpZiAob3BlbkRpYWxvZ3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dsb2JhbFxyXG4gICAgICAgICAgICAgICAgb2ZmKHdpbmRvdywgJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBvZmYoZG9jdW1lbnQuYm9keSwgJ2tleXVwJywga2V5dXBIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudC5ib2R5LCAna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudC5ib2R5LCAnZm9jdXMnLCBvblJlc2V0KTtcclxuICAgICAgICAgICAgICAgIC8vbW92ZVxyXG4gICAgICAgICAgICAgICAgb2ZmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNlbW92ZScsIG1vdmUpO1xyXG4gICAgICAgICAgICAgICAgb2ZmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ21vdXNldXAnLCBlbmRNb3ZlKTtcclxuICAgICAgICAgICAgICAgIC8vcmVzaXplXHJcbiAgICAgICAgICAgICAgICBvZmYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbW91c2Vtb3ZlJywgcmVzaXplKTtcclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdtb3VzZXVwJywgZW5kUmVzaXplKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29tbW9uIGV2ZW50c1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMuY29tbWFuZHMuY29udGFpbmVyLCAnY2xpY2snLCBpbnN0YW5jZS5fX2ludGVybmFsLmNvbW1hbmRzQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmZvb3RlciwgJ2NsaWNrJywgaW5zdGFuY2UuX19pbnRlcm5hbC5idXR0b25zQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzBdLCAnZm9jdXNpbicsIGluc3RhbmNlLl9faW50ZXJuYWwucmVzZXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLnJlc2V0WzBdLCAna2V5ZG93bicsIHJlY3ljbGVUYWIpO1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMucmVzZXRbMV0sICdmb2N1c2luJywgaW5zdGFuY2UuX19pbnRlcm5hbC5yZXNldEhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gaG9vayBvdXQgdHJhbnNpdGlvbiBoYW5kbGVyXHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLmRpYWxvZywgdHJhbnNpdGlvbi50eXBlLCBpbnN0YW5jZS5fX2ludGVybmFsLnRyYW5zaXRpb25PdXRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1vZGVsc3Mgb25seSBldmVudHNcclxuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZS5nZXQoJ21vZGFsJykpIHtcclxuICAgICAgICAgICAgICAgIHVuYmluZE1vZGVsZXNzRXZlbnRzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbW92YWJsZVxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ2V0KCdtb3ZhYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHVuYmluZE1vdmFibGVFdmVudHMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXNpemFibGVcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLmdldCgncmVzaXphYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHVuYmluZFJlc2l6YWJsZUV2ZW50cyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIG1vZGVsZXNzIHNwZWNpZmljIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiaW5kTW9kZWxlc3NFdmVudHMoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLCAnZm9jdXMnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJyaW5nVG9Gcm9udEhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVW5iaW5kIG1vZGVsZXNzIHNwZWNpZmljIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1bmJpbmRNb2RlbGVzc0V2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMuZGlhbG9nLCAnZm9jdXMnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJyaW5nVG9Gcm9udEhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIG1vdmFibGUgc3BlY2lmaWMgZXZlbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgVGhlIGRpbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGJpbmRNb3ZhYmxlRXZlbnRzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLmhlYWRlciwgJ21vdXNlZG93bicsIGluc3RhbmNlLl9faW50ZXJuYWwuYmVnaW5Nb3ZlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLmhlYWRlciwgJ3RvdWNoc3RhcnQnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luTW92ZUhhbmRsZXIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbmJpbmQgbW92YWJsZSBzcGVjaWZpYyBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdW5iaW5kTW92YWJsZUV2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMuaGVhZGVyLCAnbW91c2Vkb3duJywgaW5zdGFuY2UuX19pbnRlcm5hbC5iZWdpbk1vdmVIYW5kbGVyKTtcclxuICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnRzLmhlYWRlciwgJ3RvdWNoc3RhcnQnLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luTW92ZUhhbmRsZXIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJpbmQgcmVzaXphYmxlIHNwZWNpZmljIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiaW5kUmVzaXphYmxlRXZlbnRzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIG9uKGluc3RhbmNlLmVsZW1lbnRzLnJlc2l6ZUhhbmRsZSwgJ21vdXNlZG93bicsIGluc3RhbmNlLl9faW50ZXJuYWwuYmVnaW5SZXNpemVIYW5kbGVyKTtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMucmVzaXplSGFuZGxlLCAndG91Y2hzdGFydCcsIGluc3RhbmNlLl9faW50ZXJuYWwuYmVnaW5SZXNpemVIYW5kbGVyLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVW5iaW5kIHJlc2l6YWJsZSBzcGVjaWZpYyBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBUaGUgZGlsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdW5iaW5kUmVzaXphYmxlRXZlbnRzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIG9mZihpbnN0YW5jZS5lbGVtZW50cy5yZXNpemVIYW5kbGUsICdtb3VzZWRvd24nLCBpbnN0YW5jZS5fX2ludGVybmFsLmJlZ2luUmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgICAgIG9mZihpbnN0YW5jZS5lbGVtZW50cy5yZXNpemVIYW5kbGUsICd0b3VjaHN0YXJ0JywgaW5zdGFuY2UuX19pbnRlcm5hbC5iZWdpblJlc2l6ZUhhbmRsZXIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCaW5kIGNsb3NhYmxlIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBiaW5kQ2xvc2FibGVFdmVudHMoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgb24oaW5zdGFuY2UuZWxlbWVudHMubW9kYWwsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwubW9kYWxDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVW5iaW5kIGNsb3NhYmxlIHNwZWNpZmljIGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIFRoZSBkaWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB1bmJpbmRDbG9zYWJsZUV2ZW50cyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBvZmYoaW5zdGFuY2UuZWxlbWVudHMubW9kYWwsICdjbGljaycsIGluc3RhbmNlLl9faW50ZXJuYWwubW9kYWxDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkaWFsb2cgQVBJXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgX19pbml0OmluaXRpYWxpemUsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDaGVjayBpZiBkaWFsb2cgaXMgY3VycmVudGx5IG9wZW5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbnRlcm5hbC5pc09wZW47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzTW9kYWw6IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucm9vdC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc2VzLm1vZGVsZXNzKSA8IDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzTWF4aW1pemVkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5yb290LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzZXMubWF4aW1pemVkKSA+IC0xO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1Bpbm5lZDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucm9vdC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc2VzLnVucGlubmVkKSA8IDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1heGltaXplOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc01heGltaXplZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhpbWl6ZSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN0b3JlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzTWF4aW1pemVkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3RvcmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGluOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc1Bpbm5lZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBwaW4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5waW46ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNQaW5uZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5waW4odGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJpbmdUb0Zyb250OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBicmluZ1RvRnJvbnQobnVsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIE1vdmUgdGhlIGRpYWxvZyB0byBhIHNwZWNpZmljIHgveSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0geCAgICBUaGUgbmV3IGRpYWxvZyB4IGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0geSAgICBUaGUgbmV3IGRpYWxvZyB5IGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBtb3ZlVG86ZnVuY3Rpb24oeCx5KXtcclxuICAgICAgICAgICAgICAgIGlmKCFpc05hTih4KSAmJiAhaXNOYU4oeSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tb3ZlYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbm1vdmUnLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudHMuZGlhbG9nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdWJ0cmFjdCBleGlzdGluZyBsZWZ0LHRvcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCAtPSBwYXJzZUludChlbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCAtPSBwYXJzZUludChlbGVtZW50LnN0eWxlLnRvcCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2NhbGMgb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ICs9IGN1cnJlbnQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IGN1cnJlbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKGN1cnJlbnQgPSBjdXJyZW50Lm9mZnNldFBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FsYyBsZWZ0LCB0b3BcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9ICh4IC0gb2Zmc2V0TGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCAgPSAoeSAtIG9mZnNldFRvcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy8gcnRsIGhhbmRsaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRUb0xlZnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGN1c3RvbSBgb25tb3ZlZGAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25tb3ZlZCcsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXNpemUgdGhlIGRpYWxvZyB0byBhIHNwZWNpZmljIHdpZHRoL2hlaWdodCAodGhlIGRpYWxvZyBtdXN0IGJlICdyZXNpemFibGUnKS5cclxuICAgICAgICAgICAgICogVGhlIGRpYWxvZyBjYW4gYmUgcmVzaXplZCB0bzpcclxuICAgICAgICAgICAgICogIEEgbWluaW11bSB3aWR0aCBlcXVhbCB0byB0aGUgaW5pdGlhbCBkaXNwbGF5IHdpZHRoXHJcbiAgICAgICAgICAgICAqICBBIG1pbmltdW0gaGVpZ2h0IGVxdWFsIHRvIHRoZSBzdW0gb2YgaGVhZGVyL2Zvb3RlciBoZWlnaHRzLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlciBvciBTdHJpbmd9IHdpZHRoICAgIFRoZSBuZXcgZGlhbG9nIHdpZHRoIGluIHBpeGVscyBvciBpbiBwZXJjZW50LlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlciBvciBTdHJpbmd9IGhlaWdodCAgIFRoZSBuZXcgZGlhbG9nIGhlaWdodCBpbiBwaXhlbHMgb3IgaW4gcGVyY2VudC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZGlhbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcmVzaXplVG86ZnVuY3Rpb24od2lkdGgsaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHZhciB3ID0gcGFyc2VGbG9hdCh3aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgaCA9IHBhcnNlRmxvYXQoaGVpZ2h0KSxcclxuICAgICAgICAgICAgICAgICAgICByZWdleCA9IC8oXFxkKlxcLlxcZCt8XFxkKyklL1xyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFpc05hTih3KSAmJiAhaXNOYU4oaCkgJiYgdGhpcy5nZXQoJ3Jlc2l6YWJsZScpID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzaXplYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KCdvbnJlc2l6ZScsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCgnJyArIHdpZHRoKS5tYXRjaChyZWdleCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ID0gdyAvIDEwMCAqIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZigoJycgKyBoZWlnaHQpLm1hdGNoKHJlZ2V4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGggPSBoIC8gMTAwICogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50cy5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUubWF4V2lkdGggIT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1pbldpZHRoID0gKG1pbldpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gdGhpcy5lbGVtZW50cy5oZWFkZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5lbGVtZW50cy5mb290ZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9ucmVzaXplZGAgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25yZXNpemVkJywgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldHMgb3IgU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBrZXkgQSBzdHJpbmcgc3BlY2lmeWluZyBhIHByb3BlcnkgbmFtZSBvciBhIGNvbGxlY3Rpb24gb2Yga2V5L3ZhbHVlIHBhaXJzLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgT3B0aW9uYWwsIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSAoaW4gY2FzZSBpdCB3YXMgYSBzdHJpbmcpLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXR0aW5nIDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB1cGRhdGUodGhpcywgdGhpcy5fX2ludGVybmFsLm9wdGlvbnMsIGZ1bmN0aW9uKGssbyxuKXsgb3B0aW9uVXBkYXRlZChzZWxmLGssbyxuKTsgfSwga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQub3AgPT09ICdnZXQnKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuZm91bmQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHR5cGVvZiB0aGlzLnNldHRpbmdzICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGUodGhpcywgdGhpcy5zZXR0aW5ncywgdGhpcy5zZXR0aW5nVXBkYXRlZCB8fCBmdW5jdGlvbigpe30sIGtleSwgdmFsdWUpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3VsdC5vcCA9PT0gJ3NldCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5pdGVtcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5zZXR0aW5nVXBkYXRlZCB8fCBmdW5jdGlvbigpe307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wO3g8cmVzdWx0Lml0ZW1zLmxlbmd0aDt4Kz0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVzdWx0Lml0ZW1zW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0uZm91bmQgJiYgdHlwZW9mIHRoaXMuc2V0dGluZ3MgIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUodGhpcywgdGhpcy5zZXR0aW5ncywgY2FsbGJhY2ssIGl0ZW0ua2V5LCBpdGVtLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFtBbGlhc10gU2V0cyBkaWFsb2cgc2V0dGluZ3Mvb3B0aW9ucyBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNldDpmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZyhrZXksdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBbQWxpYXNdIEdldHMgZGlhbG9nIHNldHRpbmdzL29wdGlvbnMgXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6ZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmcoa2V5KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogU2V0cyBkaWFsb2cgaGVhZGVyXHJcbiAgICAgICAgICAgICogQGNvbnRlbnQge3N0cmluZyBvciBlbGVtZW50fVxyXG4gICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXRIZWFkZXI6ZnVuY3Rpb24oY29udGVudCl7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHModGhpcy5lbGVtZW50cy5oZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuaGVhZGVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MRWxlbWVudCAmJiB0aGlzLmVsZW1lbnRzLmhlYWRlci5maXJzdENoaWxkICE9PSBjb250ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckNvbnRlbnRzKHRoaXMuZWxlbWVudHMuaGVhZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmhlYWRlci5hcHBlbmRDaGlsZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBTZXRzIGRpYWxvZyBjb250ZW50c1xyXG4gICAgICAgICAgICAqIEBjb250ZW50IHtzdHJpbmcgb3IgZWxlbWVudH1cclxuICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0Q29udGVudDpmdW5jdGlvbihjb250ZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDb250ZW50cyh0aGlzLmVsZW1lbnRzLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGVudC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQgJiYgdGhpcy5lbGVtZW50cy5jb250ZW50LmZpcnN0Q2hpbGQgIT09IGNvbnRlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHModGhpcy5lbGVtZW50cy5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNob3cgdGhlIGRpYWxvZyBhcyBtb2RhbFxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkaWFsb2cgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzaG93TW9kYWw6IGZ1bmN0aW9uKGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93KHRydWUsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTaG93IHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGlhbG9nIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gKG1vZGFsLCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggIXRoaXMuX19pbnRlcm5hbC5pc09wZW4gKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0byBvcGVuIGRpYWxvZ3NcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGlhbG9ncy5wdXNoKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIGxhc3QgZm9jdXNlZCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxlcnRpZnkuZGVmYXVsdHMubWFpbnRhaW5Gb2N1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCB0YWJpbmRleCBhdHRyaWJ1dGUgb24gYm9keSBlbGVtZW50IHRoaXMgYWxsb3dzIHNjcmlwdCB0byBnaXZlIGl0IGZvY3VzYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkb2N1bWVudC5ib2R5Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSggJ3RhYmluZGV4JywgdGFiaW5kZXggPSAnMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGxvdyBjdXN0b20gZG9tIG1hbmlwdWxhdGlvbiB1cGRhdGVzIGJlZm9yZSBzaG93aW5nIHRoZSBkaWFsb2cuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMucHJlcGFyZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmluZEV2ZW50cyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9kYWwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdtb2RhbCcsIG1vZGFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZSBzY3JvbGwgdG8gcHJldmVudCBkb2N1bWVudCBqdW1wXHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZVNjcm9sbFBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZU5vT3ZlcmZsb3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGRpYWxvZyBjbGFzcyBvbiBzaG93XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycgJiYgY2xhc3NOYW1lICE9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1heGltaXplIGlmIHN0YXJ0IG1heGltaXplZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5nZXQoJ3N0YXJ0TWF4aW1pemVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXhpbWl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuaXNNYXhpbWl6ZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVBYnNQb3NpdGlvbkZpeCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnJvb3QucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25PdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25Jbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCAxcyBmYWxsYmFjayBpbiBjYXNlIHRyYW5zaXRpb24gZXZlbnQgZG9lc24ndCBmaXJlXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCB0aGlzLl9faW50ZXJuYWwudGltZXJJbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLnRpbWVySW4gPSBzZXRUaW1lb3V0KCB0aGlzLl9faW50ZXJuYWwudHJhbnNpdGlvbkluSGFuZGxlciwgdHJhbnNpdGlvbi5zdXBwb3J0ZWQgPyAxMDAwIDogMTAwICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzU2FmYXJpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yY2UgZGVza3RvcCBzYWZhcmkgcmVmbG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb290ID0gdGhpcy5lbGVtZW50cy5yb290O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290LnN0eWxlLmRpc3BsYXkgID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cm9vdC5zdHlsZS5kaXNwbGF5ICA9ICdibG9jayc7fSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JlZmxvd1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZmxvdyA9IHRoaXMuZWxlbWVudHMucm9vdC5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRzLnJvb3QsIGNsYXNzZXMuaGlkZGVuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXN0b3JlIHNjcm9sbCB0byBwcmV2ZW50IGRvY3VtZW50IGp1bXBcclxuICAgICAgICAgICAgICAgICAgICByZXN0b3JlU2Nyb2xsUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJuYWwgb24gc2hvdyBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLmhvb2tzLm9uc2hvdyA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9va3Mub25zaG93LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjdXN0b20gYG9uc2hvd2AgbWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25zaG93JywgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgbW92ZSB1cGRhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRNb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0IHJlc2l6ZSB1cGRhdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRSZXNpemUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hha2UgdGhlIGRpYWxvZyB0byBpbmRpY2F0ZSBpdHMgYWxyZWFkeSBvcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50cy5kaWFsb2csIGNsYXNzZXMuc2hha2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHNlbGYuZWxlbWVudHMuZGlhbG9nLCBjbGFzc2VzLnNoYWtlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENsb3NlIHRoZSBkaWFsb2dcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZGlhbG9nIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX19pbnRlcm5hbC5pc09wZW4gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGBvbmNsb3NpbmdgIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlzcGF0Y2hFdmVudCgnb25jbG9zaW5nJywgdGhpcykgIT09IGZhbHNlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuYmluZEV2ZW50cyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25Jbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudHMucm9vdCwgY2xhc3Nlcy5hbmltYXRpb25PdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IDFzIGZhbGxiYWNrIGluIGNhc2UgdHJhbnNpdGlvbiBldmVudCBkb2Vzbid0IGZpcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCB0aGlzLl9faW50ZXJuYWwudGltZXJPdXQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLnRpbWVyT3V0ID0gc2V0VGltZW91dCggdGhpcy5fX2ludGVybmFsLnRyYW5zaXRpb25PdXRIYW5kbGVyLCB0cmFuc2l0aW9uLnN1cHBvcnRlZCA/IDEwMDAgOiAxMDAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlkZSBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5lbGVtZW50cy5yb290LCBjbGFzc2VzLmhpZGRlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVmbG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmxvdyA9IHRoaXMuZWxlbWVudHMubW9kYWwub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gZm9jdXMgdG8gdGhlIGxhc3QgYWN0aXZlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFsZXJ0aWZ5LmRlZmF1bHRzLm1haW50YWluRm9jdXMgJiYgdGhpcy5fX2ludGVybmFsLmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYWN0aXZlRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjdXN0b20gZGlhbG9nIGNsYXNzIG9uIGhpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9faW50ZXJuYWwuY2xhc3NOYW1lICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLl9faW50ZXJuYWwuY2xhc3NOYW1lICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50cy5yb290LCB0aGlzLl9faW50ZXJuYWwuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJuYWwgb24gY2xvc2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMuaG9va3Mub25jbG9zZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvb2tzLm9uY2xvc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGBvbmNsb3NlYCBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudCgnb25jbG9zZScsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgZnJvbSBvcGVuIGRpYWxvZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbkRpYWxvZ3Muc3BsaWNlKG9wZW5EaWFsb2dzLmluZGV4T2YodGhpcyksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuc3VyZU5vT3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbGFzdCBkaWFsb2cgYW5kIHRhYiBpbmRleCB3YXMgc2V0IGJ5IHVzLCByZW1vdmUgaXQuXHJcbiAgICAgICAgICAgICAgICBpZighb3BlbkRpYWxvZ3MubGVuZ3RoICYmIHRhYmluZGV4ID09PSAnMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDbG9zZSBhbGwgb3BlbiBkaWFsb2dzIGV4Y2VwdCB0aGlzLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjbG9zZU90aGVyczpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnRpZnkuY2xvc2VBbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIERlc3Ryb3lzIHRoaXMgZGlhbG9nIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX19pbnRlcm5hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9faW50ZXJuYWwuaXNPcGVuICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21hcmsgZGlhbG9nIGZvciBkZXN0cnVjdGlvbiwgdGhpcyB3aWxsIGJlIGNhbGxlZCBvbiB0cmFuaXN0aW9uT3V0IGV2ZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0cnVjdCh0aGlzLCBpbml0aWFsaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jbG9zZSB0aGUgZGlhbG9nIHRvIHVuYmluZCBhbGwgZXZlbnRzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoIXRoaXMuX19pbnRlcm5hbC5kZXN0cm95KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdHJ1Y3QodGhpcywgaW5pdGlhbGl6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHR9ICgpICk7XHJcbiAgICB2YXIgbm90aWZpZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWZsb3csXHJcbiAgICAgICAgICAgIGVsZW1lbnQsXHJcbiAgICAgICAgICAgIG9wZW5JbnN0YW5jZXMgPSBbXSxcclxuICAgICAgICAgICAgY2xhc3NlcyA9IGRlZmF1bHRzLm5vdGlmaWVyLmNsYXNzZXMsXHJcbiAgICAgICAgICAgIGJhc2VDbGFzcyA9IGNsYXNzZXMuYmFzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IGluaXRpYWxpemVzIHRoZSBub3RpZmllciBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZShpbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZS5fX2ludGVybmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhbGVydGlmeS5kZWZhdWx0cy5ub3RpZmllci5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogYWxlcnRpZnkuZGVmYXVsdHMubm90aWZpZXIuZGVsYXksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uT2ZmID0gJ3RyYW5zaXRpb25PZmYnIGluIGRlZmF1bHRzLm5vdGlmaWVyID8gZGVmYXVsdHMubm90aWZpZXIudHJhbnNpdGlvbk9mZiA6IGRlZmF1bHRzLnRyYW5zaXRpb25PZmY7XHJcbiAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uT2ZmKXtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3MgPSBjbGFzc2VzLmJhc2UgKyAnIGFqcy1uby10cmFuc2l0aW9uJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hZGQgdG8gRE9NIHRyZWUuXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgIT09IGRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hJbnN0YW5jZShpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsLnB1c2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9wZW5JbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHBvcEluc3RhbmNlKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIG9wZW5JbnN0YW5jZXMuc3BsaWNlKG9wZW5JbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSksIDEpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsLnB1c2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6IHVwZGF0ZSB0aGUgbm90aWZpZXIgaW5zdGFuY2UgcG9zaXRpb25cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gYmFzZUNsYXNzO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGluc3RhbmNlLl9faW50ZXJuYWwucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzZXMudG9wICsgJyAnICsgY2xhc3Nlcy5yaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9wLWxlZnQnOlxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3Nlcy50b3AgKyAnICcgKyBjbGFzc2VzLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvcC1jZW50ZXInOlxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3Nlcy50b3AgKyAnICcgKyBjbGFzc2VzLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYm90dG9tLWxlZnQnOlxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3Nlcy5ib3R0b20gKyAnICcgKyBjbGFzc2VzLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1jZW50ZXInOlxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3Nlcy5ib3R0b20gKyAnICcgKyBjbGFzc2VzLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc2VzLmJvdHRvbSArICcgJyArIGNsYXNzZXMucmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogY3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZVxyXG4gICAgICAgICpcclxuICAgICAgICAqIEBwYXJhbSAge0RPTUVsZW1lbnR9IG1lc3NhZ2VcdFRoZSBub3RpZmllciBtZXNzYWdlIGVsZW1lbnRcclxuICAgICAgICAqIEBwYXJhbSAge051bWJlcn0gd2FpdCAgIFRpbWUgKGluIG1zKSB0byB3YWl0IGJlZm9yZSB0aGUgbWVzc2FnZSBpcyBkaXNtaXNzZWQsIGEgdmFsdWUgb2YgMCBtZWFucyBrZWVwIG9wZW4gdGlsbCBjbGlja2VkLlxyXG4gICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBtZXNzYWdlIGlzIGRpc21pc3NlZC5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUoZGl2LCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xpY2tEZWxlZ2F0ZShldmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpbnN0YW5jZS5fX2ludGVybmFsLmNsb3NlQnV0dG9uIHx8IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvc2UnKSA9PT0gJ3RydWUnKXtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5kaXNtaXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRG9uZShldmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVuYmluZCBldmVudFxyXG4gICAgICAgICAgICAgICAgb2ZmKGluc3RhbmNlLmVsZW1lbnQsIHRyYW5zaXRpb24udHlwZSwgdHJhbnNpdGlvbkRvbmUpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGluc3RhbmNlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlLl9faW50ZXJuYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2ludGVybmFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tIYW5kbGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FbmRIYW5kbGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25UaW1lb3V0OiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLl9faW50ZXJuYWwuY2xpY2tIYW5kbGVyID0gZGVsZWdhdGUoaW5zdGFuY2UsIGNsaWNrRGVsZWdhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLl9faW50ZXJuYWwudHJhbnNpdGlvbkVuZEhhbmRsZXIgPSBkZWxlZ2F0ZShpbnN0YW5jZSwgdHJhbnNpdGlvbkRvbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyVGltZXJzKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50aW1lcik7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaW5zdGFuY2UuX19pbnRlcm5hbC50cmFuc2l0aW9uVGltZW91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemUoe1xyXG4gICAgICAgICAgICAgICAgLyogbm90aWZpY2F0aW9uIERPTSBlbGVtZW50Ki9cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGRpdixcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiBQdXNoZXMgYSBub3RpZmljYXRpb24gbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmcgb3IgRE9NRWxlbWVudH0gY29udGVudCBUaGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgY29udGVudFxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHdhaXQgVGhlIHRpbWUgKGluIHNlY29uZHMpIHRvIHdhaXQgYmVmb3JlIHRoZSBtZXNzYWdlIGlzIGRpc21pc3NlZCwgYSB2YWx1ZSBvZiAwIG1lYW5zIGtlZXAgb3BlbiB0aWxsIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoX2NvbnRlbnQsIF93YWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9faW50ZXJuYWwucHVzaGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoSW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZXJzKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQsIHdhaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0ID0gdGhpcy5fX2ludGVybmFsLmRlbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKF9jb250ZW50KSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0ID0gX2NvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBfY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0ID0gdGhpcy5fX2ludGVybmFsLmRlbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBfY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXQgPSBfd2FpdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5jbG9zZUJ1dHRvbiA9IGFsZXJ0aWZ5LmRlZmF1bHRzLm5vdGlmaWVyLmNsb3NlQnV0dG9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgY29udGVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50KGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBvciBpbnNlcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGlmaWVyLl9faW50ZXJuYWwucG9zaXRpb24uaW5kZXhPZigndG9wJykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmVsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmbG93ID0gdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmVsZW1lbnQsIGNsYXNzZXMudmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBjbGljayBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbih0aGlzLmVsZW1lbnQsICdjbGljaycsIHRoaXMuX19pbnRlcm5hbC5jbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWxheSh3YWl0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBiZWZvcmUgZGlzbWlzc2luZyB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgICAgICAgKiBSZW1hcmtzOiBBIHJldHVybiB2YWx1ZSA9PT0gJ2ZhbHNlJyB3aWxsIGNhbmNlbCB0aGUgZGlzbWlzc2FsXHJcbiAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBvbmRpc21pc3M6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgbWVzc2FnZSBpcyBkaXNtaXNzZWQuXHJcbiAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogRGlzbWlzc2VzIHRoZSBub3RpZmljYXRpb24gbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBjbGlja2VkIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBkaXNtaXNzYWwgd2FzIGNhdXNlZCBieSBhIGNsaWNrLlxyXG4gICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZGlzbWlzczogZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2ludGVybmFsLnB1c2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVycyh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIHRoaXMub25kaXNtaXNzID09PSAnZnVuY3Rpb24nICYmIHRoaXMub25kaXNtaXNzLmNhbGwodGhpcykgPT09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXRhY2ggY2xpY2sgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZih0aGlzLmVsZW1lbnQsICdjbGljaycsIHRoaXMuX19pbnRlcm5hbC5jbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIGVsZW1lbnQgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgPT09IGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RyYW5zaXRpb24gZW5kIG9yIGZhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLnRyYW5zaXRpb25UaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLl9faW50ZXJuYWwudHJhbnNpdGlvbkVuZEhhbmRsZXIsIHRyYW5zaXRpb24uc3VwcG9ydGVkID8gMTAwMCA6IDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCBjbGFzc2VzLnZpc2libGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXN0b20gY2FsbGJhY2sgb24gZGlzbWlzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcywgY2xpY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wSW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIERlbGF5cyB0aGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgZGlzbWlzc2FsXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdCBUaGUgdGltZSAoaW4gc2Vjb25kcykgdG8gd2FpdCBiZWZvcmUgdGhlIG1lc3NhZ2UgaXMgZGlzbWlzc2VkLCBhIHZhbHVlIG9mIDAgbWVhbnMga2VlcCBvcGVuIHRpbGwgY2xpY2tlZC5cclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGRlbGF5OiBmdW5jdGlvbiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZXJzKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5kZWxheSA9IHR5cGVvZiB3YWl0ICE9PSAndW5kZWZpbmVkJyAmJiAhaXNOYU4oK3dhaXQpID8gK3dhaXQgOiBub3RpZmllci5fX2ludGVybmFsLmRlbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9faW50ZXJuYWwuZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC50aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBzZWxmLmRpc21pc3MoKTsgfSwgdGhpcy5fX2ludGVybmFsLmRlbGF5ICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiBTZXRzIHRoZSBub3RpZmljYXRpb24gbWVzc2FnZSBjb250ZW50c1xyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmcgb3IgRE9NRWxlbWVudH0gY29udGVudCBUaGUgbm90aWZpY2F0aW9uIG1lc3NhZ2UgY29udGVudFxyXG4gICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgc2V0Q29udGVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHModGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50ICYmIHRoaXMuZWxlbWVudC5maXJzdENoaWxkICE9PSBjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ29udGVudHModGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9faW50ZXJuYWwuY2xvc2VCdXR0b24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGNsb3NlLCBjbGFzc2VzLmNsb3NlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2Uuc2V0QXR0cmlidXRlKCdkYXRhLWNsb3NlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiBEaXNtaXNzZXMgYWxsIG9wZW4gbm90aWZpY2F0aW9ucyBleGNlcHQgdGhpcy5cclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGRpc21pc3NPdGhlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmllci5kaXNtaXNzQWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbm90aWZpZXIgYXBpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldHMgb3IgU2V0cyBub3RpZmllciBzZXR0aW5ncy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgc2V0dGluZyBuYW1lXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7VmFyaWFudH0gdmFsdWUgVGhlIHNldHRpbmcgdmFsdWUuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cdGlmIHRoZSBjYWxsZWQgYXMgYSBzZXR0ZXIsIHJldHVybiB0aGUgbm90aWZpZXIgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXR0aW5nOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy9lbnN1cmUgaW5pdFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbnRlcm5hbFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldFxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncG9zaXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwucG9zaXRpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUG9zaXRpb24odGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGF5JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLmRlbGF5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogW0FsaWFzXSBTZXRzIGRpYWxvZyBzZXR0aW5ncy9vcHRpb25zXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXQ6ZnVuY3Rpb24oa2V5LHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZyhrZXksdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBbQWxpYXNdIEdldHMgZGlhbG9nIHNldHRpbmdzL29wdGlvbnNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDpmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZyhrZXkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBub3RpZmljYXRpb24gbWVzc2FnZVxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiBub3RpZmljYXRpb24gbWVzc2FnZSAoc2ltcGx5IGEgQ1NTIGNsYXNzIG5hbWUgJ2Fqcy17dHlwZX0nIHRvIGJlIGFkZGVkKS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBtZXNzYWdlIGlzIGRpc21pc3NlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vZW5zdXJlIG5vdGlmaWVyIGluaXRcclxuICAgICAgICAgICAgICAgIGluaXRpYWxpemUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBuZXcgbm90aWZpY2F0aW9uIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBjbGFzc2VzLm1lc3NhZ2UgKyAoKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyAmJiB0eXBlICE9PSAnJykgPyAnICcgKyBjbGFzc2VzLnByZWZpeCArIHR5cGUgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlKGRpdiwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRGlzbWlzc2VzIGFsbCBvcGVuIG5vdGlmaWNhdGlvbnMuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBleGNwZXQgW29wdGlvbmFsXSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdCB0byBleGNsdWRlIGZyb20gZGlzbWlzc2FsLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZGlzbWlzc0FsbDogZnVuY3Rpb24gKGV4Y2VwdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lID0gb3Blbkluc3RhbmNlcy5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgY2xvbmUubGVuZ3RoOyB4ICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgIGluc3RhbmNlID0gY2xvbmVbeF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y2VwdCA9PT0gdW5kZWZpbmVkIHx8IGV4Y2VwdCAhPT0gaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxlcnRpZnkgcHVibGljIEFQSVxyXG4gICAgICogVGhpcyBjb250YWlucyBldmVyeXRoaW5nIHRoYXQgaXMgZXhwb3NlZCB0aHJvdWdoIHRoZSBhbGVydGlmeSBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBBbGVydGlmeSgpIHtcclxuXHJcbiAgICAgICAgLy8gaG9sZHMgYSByZWZlcmVuY2VzIG9mIGNyZWF0ZWQgZGlhbG9nc1xyXG4gICAgICAgIHZhciBkaWFsb2dzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4dGVuZHMgYSBnaXZlbiBwcm90b3R5cGUgYnkgbWVyZ2luZyBwcm9wZXJ0aWVzIGZyb20gYmFzZSBpbnRvIHN1Yi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBzdWIge09iamVjdH0gc3ViIFRoZSBwcm90b3R5cGUgYmVpbmcgb3ZlcndyaXR0ZW4uXHJcbiAgICAgICAgICogQGJhc2Uge09iamVjdH0gYmFzZSBUaGUgcHJvdG90eXBlIGJlaW5nIHdyaXR0ZW4uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBleHRlbmRlZCBwcm90b3R5cGUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kKHN1YiwgYmFzZSkge1xyXG4gICAgICAgICAgICAvLyBjb3B5IGRpYWxvZyBwb3RvdHlwZSBvdmVyIGRlZmluaXRpb24uXHJcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gYmFzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2UuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJbcHJvcF0gPSBiYXNlW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdWI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIZWxwZXI6IHJldHVybnMgYSBkaWFsb2cgaW5zdGFuY2UgZnJvbSBzYXZlZCBkaWFsb2dzLlxyXG4gICAgICAgICogYW5kIGluaXRpYWxpemVzIHRoZSBkaWFsb2cgaWYgaXRzIG5vdCBhbHJlYWR5IGluaXRpYWxpemVkLlxyXG4gICAgICAgICpcclxuICAgICAgICAqIEBuYW1lIHtTdHJpbmd9IG5hbWUgVGhlIGRpYWxvZyBuYW1lLlxyXG4gICAgICAgICpcclxuICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGRpYWxvZyBpbnN0YW5jZS5cclxuICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldF9kaWFsb2cobmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gZGlhbG9nc1tuYW1lXS5kaWFsb2c7XHJcbiAgICAgICAgICAgIC8vaW5pdGlhbGl6ZSB0aGUgZGlhbG9nIGlmIGl0cyBub3QgYWxyZWFkeSBpbml0aWFsaXplZC5cclxuICAgICAgICAgICAgaWYgKGRpYWxvZyAmJiB0eXBlb2YgZGlhbG9nLl9faW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nLl9faW5pdChkaWFsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkaWFsb2c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXI6ICByZWdpc3RlcnMgYSBuZXcgZGlhbG9nIGRlZmluaXRpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAbmFtZSB7U3RyaW5nfSBuYW1lIFRoZSBkaWFsb2cgbmFtZS5cclxuICAgICAgICAgKiBARmFjdG9yeSB7RnVuY3Rpb259IEZhY3RvcnkgYSBmdW5jdGlvbiByZXNwb3NpYmxlIGZvciBjcmVhdGluZyBkaWFsb2cgcHJvdG90eXBlLlxyXG4gICAgICAgICAqIEB0cmFuc2llbnQge0Jvb2xlYW59IHRyYW5zaWVudCBUcnVlIHRvIGNyZWF0ZSBhIG5ldyBkaWFsb2cgaW5zdGFuY2UgZWFjaCB0aW1lIHRoZSBkaWFsb2cgaXMgaW52b2tlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICAgICAqIEBiYXNlIHtTdHJpbmd9IGJhc2UgdGhlIG5hbWUgb2YgYW5vdGhlciBkaWFsb2cgdG8gaW5oZXJpdCBmcm9tLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZGlhbG9nIGRlZmluaXRpb24uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXIobmFtZSwgRmFjdG9yeSwgdHJhbnNpZW50LCBiYXNlKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZmFjdG9yeTogRmFjdG9yeVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy9pZiB0aGlzIGlzIGJhc2VkIG9uIGFuIGV4aXN0aW5nIGRpYWxvZywgY3JlYXRlIGEgbmV3IGRlZmluaXRpb25cclxuICAgICAgICAgICAgLy9ieSBhcHBseWluZyB0aGUgbmV3IHByb3RveXBlIG92ZXIgdGhlIGV4aXN0aW5nIG9uZS5cclxuICAgICAgICAgICAgaWYgKGJhc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbi5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleHRlbmQobmV3IGRpYWxvZ3NbYmFzZV0uZmFjdG9yeSgpLCBuZXcgRmFjdG9yeSgpKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdHJhbnNpZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBhIG5ldyBkZWZpbml0aW9uIGJhc2VkIG9uIGRpYWxvZ1xyXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbi5kaWFsb2cgPSBleHRlbmQobmV3IGRlZmluaXRpb24uZmFjdG9yeSgpLCBkaWFsb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkaWFsb2dzW25hbWVdID0gZGVmaW5pdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBbGVydGlmeSBkZWZhdWx0c1xyXG4gICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRlZmF1bHRzOiBkZWZhdWx0cyxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIERpYWxvZ3MgZmFjdG9yeSBcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgRGlhbG9nIG5hbWUuXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259ICAgIEEgRGlhbG9nIGZhY3RvcnkgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgIEluZGljYXRlcyB3aGV0aGVyIHRvIGNyZWF0ZSBhIHNpbmdsZXRvbiBvciB0cmFuc2llbnQgZGlhbG9nLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICBUaGUgbmFtZSBvZiB0aGUgYmFzZSB0eXBlIHRvIGluaGVyaXQgZnJvbS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRpYWxvZzogZnVuY3Rpb24gKG5hbWUsIEZhY3RvcnksIHRyYW5zaWVudCwgYmFzZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdldCByZXF1ZXN0LCBjcmVhdGUgYSBuZXcgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRmFjdG9yeSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRfZGlhbG9nKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhbGVydGlmeS5kaWFsb2c6IG5hbWUgYWxyZWFkeSBleGlzdHMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyByZWdpc3RlciB0aGUgZGlhbG9nXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IHJlZ2lzdGVyKG5hbWUsIEZhY3RvcnksIHRyYW5zaWVudCwgYmFzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zaWVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGl0IHB1YmxpY1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgcGFzc2VkIHdpdGggbm8gcGFyYW1zLCBjb25zaWRlciBpdCBhIGdldCByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbi5kaWFsb2c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBleHRlbmQobmV3IGRlZmluaXRpb24uZmFjdG9yeSgpLCBkaWFsb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lbnN1cmUgaW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlICYmIHR5cGVvZiBpbnN0YW5jZS5fX2luaXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX2luaXQoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbJ21haW4nXS5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZVsnc2hvdyddLmFwcGx5KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgaXQgcHVibGljXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbnN1cmUgaW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5kaWFsb2cgJiYgdHlwZW9mIGRlZmluaXRpb24uZGlhbG9nLl9faW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbi5kaWFsb2cuX19pbml0KGRlZmluaXRpb24uZGlhbG9nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHBhc3NlZCB3aXRoIG5vIHBhcmFtcywgY29uc2lkZXIgaXQgYSBnZXQgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb24uZGlhbG9nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpYWxvZyA9IGRlZmluaXRpb24uZGlhbG9nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nWydtYWluJ10uYXBwbHkoZGVmaW5pdGlvbi5kaWFsb2csIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlhbG9nWydzaG93J10uYXBwbHkoZGVmaW5pdGlvbi5kaWFsb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENsb3NlIGFsbCBvcGVuIGRpYWxvZ3MuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBleGNwZXQgW29wdGlvbmFsXSBUaGUgZGlhbG9nIG9iamVjdCB0byBleGNsdWRlIGZyb20gY2xvc2luZy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY2xvc2VBbGw6IGZ1bmN0aW9uIChleGNlcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9IG9wZW5EaWFsb2dzLnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBjbG9uZS5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGNsb25lW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGNlcHQgPT09IHVuZGVmaW5lZCB8fCBleGNlcHQgIT09IGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0cyBvciBTZXRzIGRpYWxvZyBzZXR0aW5ncy9vcHRpb25zLiBpZiB0aGUgZGlhbG9nIGlzIHRyYW5zaWVudCwgdGhpcyBjYWxsIGRvZXMgbm90aGluZy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGRpYWxvZyBuYW1lLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGtleSBBIHN0cmluZyBzcGVjaWZ5aW5nIGEgcHJvcGVyeSBuYW1lIG9yIGEgY29sbGVjdGlvbiBvZiBrZXkvdmFsdWUgcGFpcnMuXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7VmFyaWFudH0gdmFsdWUgT3B0aW9uYWwsIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSAoaW4gY2FzZSBpdCB3YXMgYSBzdHJpbmcpLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXR0aW5nOiBmdW5jdGlvbiAobmFtZSwga2V5LCB2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSAnbm90aWZpZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWVyLnNldHRpbmcoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRpYWxvZyA9IGdldF9kaWFsb2cobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlhbG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpYWxvZy5zZXR0aW5nKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogW0FsaWFzXSBTZXRzIGRpYWxvZyBzZXR0aW5ncy9vcHRpb25zIFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihuYW1lLGtleSx2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nKG5hbWUsIGtleSx2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBbQWxpYXNdIEdldHMgZGlhbG9nIHNldHRpbmdzL29wdGlvbnMgXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKG5hbWUsIGtleSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nKG5hbWUsIGtleSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvbiBtZXNzYWdlLlxyXG4gICAgICAgICAgICAgKiBJZiBhIHR5cGUgaXMgcGFzc2VkLCBhIGNsYXNzIG5hbWUgXCJhanMte3R5cGV9XCIgd2lsbCBiZSBhZGRlZC5cclxuICAgICAgICAgICAgICogVGhpcyBhbGxvd3MgZm9yIGN1c3RvbSBsb29rIGFuZCBmZWVsIGZvciB2YXJpb3VzIHR5cGVzIG9mIG5vdGlmaWNhdGlvbnMuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZyB8IERPTUVsZW1lbnR9ICAgIFttZXNzYWdlPXVuZGVmaW5lZF1cdFx0TWVzc2FnZSB0ZXh0XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICAgIFt0eXBlPScnXVx0XHRcdFx0VHlwZSBvZiBsb2cgbWVzc2FnZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICBbd2FpdD0nJ11cdFx0XHRcdFRpbWUgKGluIHNlY29uZHMpIHRvIHdhaXQgYmVmb3JlIGF1dG8tY2xvc2VcclxuICAgICAgICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259ICAgICAgICAgICAgICAgW2NhbGxiYWNrPXVuZGVmaW5lZF1cdEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBsb2cgaXMgY2xvc2VkLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IE5vdGlmaWNhdGlvbiBvYmplY3QuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIChtZXNzYWdlLCB0eXBlLCB3YWl0LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWVyLmNyZWF0ZSh0eXBlLCBjYWxsYmFjaykucHVzaChtZXNzYWdlLCB3YWl0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgbm90aWZpY2F0aW9uIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZ31cdFx0W21lc3NhZ2U9dW5kZWZpbmVkXVx0XHRNZXNzYWdlIHRleHRcclxuICAgICAgICAgICAgICogQHBhcmFtICB7U3RyaW5nfSAgICAgW3dhaXQ9JyddXHRcdFx0XHRUaW1lIChpbiBzZWNvbmRzKSB0byB3YWl0IGJlZm9yZSBhdXRvLWNsb3NlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufVx0W2NhbGxiYWNrPXVuZGVmaW5lZF1cdEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBsb2cgaXMgY2xvc2VkLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IE5vdGlmaWNhdGlvbiBvYmplY3QuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBmdW5jdGlvbiAobWVzc2FnZSwgd2FpdCwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3RpZmllci5jcmVhdGUobnVsbCwgY2FsbGJhY2spLnB1c2gobWVzc2FnZSwgd2FpdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvbiBtZXNzYWdlIG9mIHR5cGUgJ3N1Y2Nlc3MnLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9XHRcdFttZXNzYWdlPXVuZGVmaW5lZF1cdFx0TWVzc2FnZSB0ZXh0XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFt3YWl0PScnXVx0XHRcdFx0VGltZSAoaW4gc2Vjb25kcykgdG8gd2FpdCBiZWZvcmUgYXV0by1jbG9zZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn1cdFtjYWxsYmFjaz11bmRlZmluZWRdXHRBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgbG9nIGlzIGNsb3NlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBOb3RpZmljYXRpb24gb2JqZWN0LlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1lc3NhZ2UsIHdhaXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpZXIuY3JlYXRlKCdzdWNjZXNzJywgY2FsbGJhY2spLnB1c2gobWVzc2FnZSwgd2FpdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvbiBtZXNzYWdlIG9mIHR5cGUgJ2Vycm9yJy5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtICB7U3RyaW5nfVx0XHRbbWVzc2FnZT11bmRlZmluZWRdXHRcdE1lc3NhZ2UgdGV4dFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICBbd2FpdD0nJ11cdFx0XHRcdFRpbWUgKGluIHNlY29uZHMpIHRvIHdhaXQgYmVmb3JlIGF1dG8tY2xvc2VcclxuICAgICAgICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259XHRbY2FsbGJhY2s9dW5kZWZpbmVkXVx0QSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIGxvZyBpcyBjbG9zZWQuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gTm90aWZpY2F0aW9uIG9iamVjdC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAobWVzc2FnZSwgd2FpdCwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3RpZmllci5jcmVhdGUoJ2Vycm9yJywgY2FsbGJhY2spLnB1c2gobWVzc2FnZSwgd2FpdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG5vdGlmaWNhdGlvbiBtZXNzYWdlIG9mIHR5cGUgJ3dhcm5pbmcnLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd9XHRcdFttZXNzYWdlPXVuZGVmaW5lZF1cdFx0TWVzc2FnZSB0ZXh0XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSAge1N0cmluZ30gICAgIFt3YWl0PScnXVx0XHRcdFx0VGltZSAoaW4gc2Vjb25kcykgdG8gd2FpdCBiZWZvcmUgYXV0by1jbG9zZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn1cdFtjYWxsYmFjaz11bmRlZmluZWRdXHRBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgbG9nIGlzIGNsb3NlZC5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBOb3RpZmljYXRpb24gb2JqZWN0LlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgd2FybmluZzogZnVuY3Rpb24gKG1lc3NhZ2UsIHdhaXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90aWZpZXIuY3JlYXRlKCd3YXJuaW5nJywgY2FsbGJhY2spLnB1c2gobWVzc2FnZSwgd2FpdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEaXNtaXNzZXMgYWxsIG9wZW4gbm90aWZpY2F0aW9uc1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkaXNtaXNzQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmllci5kaXNtaXNzQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFyIGFsZXJ0aWZ5ID0gbmV3IEFsZXJ0aWZ5KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEFsZXJ0IGRpYWxvZyBkZWZpbml0aW9uXHJcbiAgICAqXHJcbiAgICAqIGludm9rZWQgYnk6XHJcbiAgICAqXHRhbGVydGlmeS5hbGVydChtZXNzYWdlKTtcclxuICAgICpcdGFsZXJ0aWZ5LmFsZXJ0KHRpdGxlLCBtZXNzYWdlKTtcclxuICAgICpcdGFsZXJ0aWZ5LmFsZXJ0KG1lc3NhZ2UsIG9ub2spO1xyXG4gICAgKlx0YWxlcnRpZnkuYWxlcnQodGl0bGUsIG1lc3NhZ2UsIG9ub2spO1xyXG4gICAgICovXHJcbiAgICBhbGVydGlmeS5kaWFsb2coJ2FsZXJ0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1haW46IGZ1bmN0aW9uIChfdGl0bGUsIF9tZXNzYWdlLCBfb25vaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlLCBtZXNzYWdlLCBvbm9rO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF9tZXNzYWdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ub2sgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX21lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb25vayA9IF9vbm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ3RpdGxlJywgdGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdvbm9rJywgb25vayk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBhbGVydGlmeS5kZWZhdWx0cy5nbG9zc2FyeS5vayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5cy5FU0MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VPbkNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBhbGVydGlmeS5kZWZhdWx0cy50aGVtZS5vayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhpbWl6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbm90aGluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmVwYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL25vdGhpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0TWVzc2FnZTogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudChtZXNzYWdlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIG9ub2s6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldHRpbmdVcGRhdGVkOiBmdW5jdGlvbiAoa2V5LCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtZXNzYWdlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGFiZWwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1swXS5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzBdLmVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGNsb3NlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5nZXQoJ29ub2snKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IHRoaXMuZ2V0KCdvbm9rJykuY2FsbCh0aGlzLCBjbG9zZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVyblZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUV2ZW50LmNhbmNlbCA9ICFyZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIENvbmZpcm0gZGlhbG9nIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqXHRhbGVydGlmeS5jb25maXJtKG1lc3NhZ2UpO1xyXG4gICAgICpcdGFsZXJ0aWZ5LmNvbmZpcm0obWVzc2FnZSwgb25vayk7XHJcbiAgICAgKlx0YWxlcnRpZnkuY29uZmlybShtZXNzYWdlLCBvbm9rLCBvbmNhbmNlbCk7XHJcbiAgICAgKlx0YWxlcnRpZnkuY29uZmlybSh0aXRsZSwgbWVzc2FnZSwgb25vaywgb25jYW5jZWwpO1xyXG4gICAgICovXHJcbiAgICBhbGVydGlmeS5kaWFsb2coJ2NvbmZpcm0nLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBhdXRvQ29uZmlybSA9IHtcclxuICAgICAgICAgICAgdGltZXI6IG51bGwsXHJcbiAgICAgICAgICAgIGluZGV4OiBudWxsLFxyXG4gICAgICAgICAgICB0ZXh0OiBudWxsLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgdGFzazogZnVuY3Rpb24gKGV2ZW50LCBzZWxmKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc09wZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX19pbnRlcm5hbC5idXR0b25zW2F1dG9Db25maXJtLmluZGV4XS5lbGVtZW50LmlubmVySFRNTCA9IGF1dG9Db25maXJtLnRleHQgKyAnICgmIzgyMDc7JyArIGF1dG9Db25maXJtLmR1cmF0aW9uICsgJyYjODIwNzspICc7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpcm0uZHVyYXRpb24gLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXV0b0NvbmZpcm0uZHVyYXRpb24gPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQXV0b0NvbmZpcm0oc2VsZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBzZWxmLl9faW50ZXJuYWwuYnV0dG9uc1thdXRvQ29uZmlybS5pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbG9zZUV2ZW50ID0gY3JlYXRlQ2xvc2VFdmVudChhdXRvQ29uZmlybS5pbmRleCwgYnV0dG9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsYmFjay5hcHBseShzZWxmLCBbY2xvc2VFdmVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2xvc2UgdGhlIGRpYWxvZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlRXZlbnQuY2xvc2UgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQXV0b0NvbmZpcm0oc2VsZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGVhckF1dG9Db25maXJtKHNlbGYpIHtcclxuICAgICAgICAgICAgaWYgKGF1dG9Db25maXJtLnRpbWVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGF1dG9Db25maXJtLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgIGF1dG9Db25maXJtLnRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHNlbGYuX19pbnRlcm5hbC5idXR0b25zW2F1dG9Db25maXJtLmluZGV4XS5lbGVtZW50LmlubmVySFRNTCA9IGF1dG9Db25maXJtLnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0QXV0b0NvbmZpcm0oc2VsZiwgaW5kZXgsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGNsZWFyQXV0b0NvbmZpcm0oc2VsZik7XHJcbiAgICAgICAgICAgIGF1dG9Db25maXJtLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgICAgIGF1dG9Db25maXJtLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGF1dG9Db25maXJtLnRleHQgPSBzZWxmLl9faW50ZXJuYWwuYnV0dG9uc1tpbmRleF0uZWxlbWVudC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGF1dG9Db25maXJtLnRpbWVyID0gc2V0SW50ZXJ2YWwoZGVsZWdhdGUoc2VsZiwgYXV0b0NvbmZpcm0udGFzayksIDEwMDApO1xyXG4gICAgICAgICAgICBhdXRvQ29uZmlybS50YXNrKG51bGwsIHNlbGYpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1haW46IGZ1bmN0aW9uIChfdGl0bGUsIF9tZXNzYWdlLCBfb25vaywgX29uY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUsIG1lc3NhZ2UsIG9ub2ssIG9uY2FuY2VsO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ub2sgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ub2sgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBvbmNhbmNlbCA9IF9vbm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gX3RpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBvbm9rID0gX29ub2s7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jYW5jZWwgPSBfb25jYW5jZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnbWVzc2FnZScsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ29ub2snLCBvbm9rKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdvbmNhbmNlbCcsIG9uY2FuY2VsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGFsZXJ0aWZ5LmRlZmF1bHRzLmdsb3NzYXJ5Lm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXlzLkVOVEVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBhbGVydGlmeS5kZWZhdWx0cy50aGVtZS5vayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYWxlcnRpZnkuZGVmYXVsdHMuZ2xvc3NhcnkuY2FuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXlzLkVTQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZU9uQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGFsZXJ0aWZ5LmRlZmF1bHRzLnRoZW1lLmNhbmNlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhpbWl6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9ub3RoaW5nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXBhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vbm90aGluZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRNZXNzYWdlOiBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxhYmVsczogbnVsbCxcclxuICAgICAgICAgICAgICAgIG9ub2s6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvbmNhbmNlbDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRGb2N1czogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJldmVyc2VCdXR0b25zOiBudWxsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nVXBkYXRlZDogZnVuY3Rpb24gKGtleSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWVzc2FnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhYmVscyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdvaycgaW4gbmV3VmFsdWUgJiYgdGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0uZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1swXS50ZXh0ID0gbmV3VmFsdWUub2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzBdLmVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWUub2s7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2FuY2VsJyBpbiBuZXdWYWx1ZSAmJiB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1sxXS5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzFdLnRleHQgPSBuZXdWYWx1ZS5jYW5jZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzFdLmVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWUuY2FuY2VsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JldmVyc2VCdXR0b25zJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zLnByaW1hcnkuYXBwZW5kQ2hpbGQodGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0uZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zLnByaW1hcnkuYXBwZW5kQ2hpbGQodGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMV0uZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZGVmYXVsdEZvY3VzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuZm9jdXMuZWxlbWVudCA9IG5ld1ZhbHVlID09PSAnb2snID8gMCA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoY2xvc2VFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJBdXRvQ29uZmlybSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2xvc2VFdmVudC5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5nZXQoJ29ub2snKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRoaXMuZ2V0KCdvbm9rJykuY2FsbCh0aGlzLCBjbG9zZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRXZlbnQuY2FuY2VsID0gIXJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5nZXQoJ29uY2FuY2VsJykgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmdldCgnb25jYW5jZWwnKS5jYWxsKHRoaXMsIGNsb3NlRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVyblZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VFdmVudC5jYW5jZWwgPSAhcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9PazogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydEF1dG9Db25maXJtKHRoaXMsIDAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhdXRvQ2FuY2VsOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0QXV0b0NvbmZpcm0odGhpcywgMSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIFByb21wdCBkaWFsb2cgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogaW52b2tlZCBieTpcclxuICAgICAqXHRhbGVydGlmeS5wcm9tcHQobWVzc2FnZSk7XHJcbiAgICAgKlx0YWxlcnRpZnkucHJvbXB0KG1lc3NhZ2UsIHZhbHVlKTtcclxuICAgICAqXHRhbGVydGlmeS5wcm9tcHQobWVzc2FnZSwgdmFsdWUsIG9ub2spO1xyXG4gICAgICpcdGFsZXJ0aWZ5LnByb21wdChtZXNzYWdlLCB2YWx1ZSwgb25vaywgb25jYW5jZWwpO1xyXG4gICAgICpcdGFsZXJ0aWZ5LnByb21wdCh0aXRsZSwgbWVzc2FnZSwgdmFsdWUsIG9ub2ssIG9uY2FuY2VsKTtcclxuICAgICAqL1xyXG4gICAgYWxlcnRpZnkuZGlhbG9nKCdwcm9tcHQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcclxuICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtYWluOiBmdW5jdGlvbiAoX3RpdGxlLCBfbWVzc2FnZSwgX3ZhbHVlLCBfb25vaywgX29uY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUsIG1lc3NhZ2UsIHZhbHVlLCBvbm9rLCBvbmNhbmNlbDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF90aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF9tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBvbm9rID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBvbm9rID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uY2FuY2VsID0gX29ub2s7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBfdGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IF9tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ub2sgPSBfb25vaztcclxuICAgICAgICAgICAgICAgICAgICBvbmNhbmNlbCA9IF9vbmNhbmNlbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCd0aXRsZScsIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCdtZXNzYWdlJywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgndmFsdWUnLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCgnb25vaycsIG9ub2spO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoJ29uY2FuY2VsJywgb25jYW5jZWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYWxlcnRpZnkuZGVmYXVsdHMuZ2xvc3Nhcnkub2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleXMuRU5URVIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGFsZXJ0aWZ5LmRlZmF1bHRzLnRoZW1lLm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBhbGVydGlmeS5kZWZhdWx0cy5nbG9zc2FyeS5jYW5jZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleXMuRVNDLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlT25DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogYWxlcnRpZnkuZGVmYXVsdHMudGhlbWUuY2FuY2VsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBmb2N1czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBpbnB1dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGltaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc05hbWUgPSBhbGVydGlmeS5kZWZhdWx0cy50aGVtZS5pbnB1dDtcclxuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRoaXMuZ2V0KCd2YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jb250ZW50LmFwcGVuZENoaWxkKHApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jb250ZW50LmFwcGVuZENoaWxkKGlucHV0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlcGFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9ub3RoaW5nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldE1lc3NhZ2U6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDb250ZW50cyhwKTtcclxuICAgICAgICAgICAgICAgICAgICBwLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQgJiYgcC5maXJzdENoaWxkICE9PSBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDb250ZW50cyhwKTtcclxuICAgICAgICAgICAgICAgICAgICBwLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBvbm9rOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBvbmNhbmNlbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTondGV4dCcsXHJcbiAgICAgICAgICAgICAgICByZXZlcnNlQnV0dG9uczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nVXBkYXRlZDogZnVuY3Rpb24gKGtleSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWVzc2FnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3ZhbHVlJzpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndHlwZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRldGltZS1sb2NhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWFyY2gnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RlbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGltZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2Vlayc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnR5cGUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGFiZWxzJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUub2sgJiYgdGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMF0uZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1swXS5lbGVtZW50LmlubmVySFRNTCA9IG5ld1ZhbHVlLm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUuY2FuY2VsICYmIHRoaXMuX19pbnRlcm5hbC5idXR0b25zWzFdLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2ludGVybmFsLmJ1dHRvbnNbMV0uZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZS5jYW5jZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmV2ZXJzZUJ1dHRvbnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmJ1dHRvbnMucHJpbWFyeS5hcHBlbmRDaGlsZCh0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1swXS5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmJ1dHRvbnMucHJpbWFyeS5hcHBlbmRDaGlsZCh0aGlzLl9faW50ZXJuYWwuYnV0dG9uc1sxXS5lbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoY2xvc2VFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjbG9zZUV2ZW50LmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy52YWx1ZSA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5nZXQoJ29ub2snKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRoaXMuZ2V0KCdvbm9rJykuY2FsbCh0aGlzLCBjbG9zZUV2ZW50LCB0aGlzLnNldHRpbmdzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRXZlbnQuY2FuY2VsID0gIXJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5nZXQoJ29uY2FuY2VsJykgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmdldCgnb25jYW5jZWwnKS5jYWxsKHRoaXMsIGNsb3NlRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVyblZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VFdmVudC5jYW5jZWwgPSAhcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWNsb3NlRXZlbnQuY2FuY2VsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0aGlzLnNldHRpbmdzLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDb21tb25KU1xyXG4gICAgaWYgKCB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnICkge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gYWxlcnRpZnk7XHJcbiAgICAvLyBBTURcclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIGRlZmluZSggW10sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFsZXJ0aWZ5O1xyXG4gICAgICAgIH0gKTtcclxuICAgIC8vIHdpbmRvd1xyXG4gICAgfSBlbHNlIGlmICggIXdpbmRvdy5hbGVydGlmeSApIHtcclxuICAgICAgICB3aW5kb3cuYWxlcnRpZnkgPSBhbGVydGlmeTtcclxuICAgIH1cclxuXHJcbn0gKCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMgKSApO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9