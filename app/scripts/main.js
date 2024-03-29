require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',
        handlebars: '../bower_components/handlebars/handlebars.amd',
        requirejs: '../bower_components/requirejs/require',
        'sass-bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
        quicksearch: '../bower_components/quicksearch/jquery.quicksearch',
        'share-button': '../bower_components/share-button/build/share',
//        jeditable: '../bower_components/jquery_jeditable/jquery.jeditable'
    },
    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        quicksearch: {
            deps: [
                'jquery'
            ]
        },
        'share-button': {
            deps: [
                'jquery'
            ],
            exports: 'Share'
        },
//       jeditable: {
//            deps: [
//                'jquery'
//            ]
//        },
        bootstrapAffix: {
            deps: [
                'jquery'
            ]
        },
        bootstrapAlert: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapButton: {
            deps: [
                'jquery'
            ]
        },
        bootstrapCarousel: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapCollapse: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapDropdown: {
            deps: [
                'jquery'
            ]
        },
        bootstrapModal: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapPopover: {
            deps: [
                'jquery',
                'bootstrapTooltip'
            ]
        },
        bootstrapScrollspy: {
            deps: [
                'jquery'
            ]
        },
        bootstrapTab: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapTooltip: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapTransition: {
            deps: [
                'jquery'
            ]
        }
    }
});

require(['app'], function (app) {
    'use strict';
});

