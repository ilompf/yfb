/*global define*/
define(['jquery', 'jquery-ui', 'handlebars', 'quicksearch', 'jeditable'], function ($, ui, Handlebars, quicksearch, jeditable) {
    'use strict';

    // little plugin to get nested parents
    $.fn.getParent = function (num) {
        var last = this[0];
        for (var i = 0; i < num; i++) {
            last = last.parentNode;
        }
        return $(last);
    }


    function renderTemplate(template, context) {
        var Template = Handlebars.compile(template);
        return Template(context);
    }


    function render(srcId, destId, context) {
        var template = renderTemplate($(srcId).html(), context);
        $(destId).html(template);
    }


    function makeEditable(selector) {
        $(selector).editable(function(value, settings) {
                return(value);
            }, {
            indicator : '<img src="img/indicator.gif">',
            tooltip   : 'Doubleclick to edit',
            event     : 'dblclick',
            style     : 'inherit',
        });
    }

    function initPosesSectionsDragDrop() {
        // pose archive
        $('.pose-picker-archive li').draggable({
            connectToSortable: '.pose-list',
            helper: 'clone',
            revert: 'invalid'
        }).disableSelection();

        // section sortable
        $('.pose-list').sortable({
            items: '>li',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            connectWith: '.pose-list',
            cursor: 'move',
            tolerance: 'pointer',
            over: function (event, ui) {
                var $prompt = $('.drop-here-prompt', this);
                if ($prompt.is(':visible')) {
                    $prompt.hide();
                }
            },
            out: function (event, ui) {
                var $prompt = $('.drop-here-prompt', this);
                if ($prompt.not(':visible') && $(this).siblings('li').length == 0) {
                    $prompt.show();
                }
            },
        }).disableSelection();
    }

    function initBuilder() {
        // add a default section
        $($('#empty-section').html()).insertBefore('.page-toolbar');

        // make sections sortable
        $('.canvas').sortable({
            items: '>div',
            axis: 'y',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            cursor: 'move'
        }).disableSelection();

        // remove sections
        $('.canvas').on({
            click: function (event) {
                event.preventDefault();
                $(event.currentTarget).getParent(3).remove();
            }
        }, '.section-options a');

        initPosesSectionsDragDrop();

        // Handle page toolbar events
        $('.page-toolbar').on({
            'click': function (event) {
                event.preventDefault();
                $($('#empty-section').html()).insertBefore($(this).parent());
                initPosesSectionsDragDrop();
            }
        }, 'a');

        // misc
        $('.searchbox input').quicksearch('.pose-picker-archive li');
        makeEditable('.section-title p');
    }

    function initIndex() {
        var $myFlow = $('#nav-links a[href$="#my-flows"]');

        $('.aflow-tools, .toolbar').on({
            'click': function (event) {
                event.preventDefault();
                var $target = $(event.currentTarget),
                    alink = $target.attr('href');
                render(alink, '#content', {});
                $myFlow.parent().removeClass('active');
                initBuilder();
            }
        }, 'a');

        // Misc
        makeEditable('.aflow-description p');
    }

    function init() {
        var $nav = $('#nav-links'),
            $defaultActive = $('#nav-links a[href$="#my-flows"]');

        // Navigation events
        $defaultActive.parent().addClass('active');
        $nav.on({
            'click': function (event) {
                var $target = $(event.currentTarget),
                    alink = $target.attr('href');
                event.preventDefault();
                $target.parent().addClass('active').siblings().removeClass('active');
                render(alink, '#content', {});
                if (alink === '#flow-builder') {
                    initBuilder();
                } else {
                    initIndex();
                }
            }
        }, 'a');
    }

    // default template
    init();
    render('#my-flows', '#content', {});
    initIndex();

    return 'App is on!';
});

