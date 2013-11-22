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
                $(event.currentTarget).getParent(3).remove();
                return false;
            }
        }, '.section-options a');

        initPosesSectionsDragDrop();

        // Handle page toolbar events
        $('.page-toolbar').on({
            'click': function (event) {
                $($('#empty-section').html()).insertBefore($(this).parent());
                initPosesSectionsDragDrop();
                return false;
            }
        }, 'button');

        // misc
        $('.searchbox input').quicksearch('.pose-picker-archive li');
        makeEditable('.section-title p');
    }

    function initIndex() {
        var $flowTools = $('.aflow-tools');

        // flow tools
        $flowTools.on({
            'click': function (event) {
                var $target = $(event.currentTarget),
                    alink = $target.attr('href');
                event.preventDefault();
                render(alink, '#content', {});
                return false;
            }
        }, 'a');

        // Misc
        makeEditable('.aflow-description p')
    }

    function init() {
        var $nav = $('#nav-links');

        // Navigation events
        $nav.on({
            'click': function (event) {
                var $target = $( event.currentTarget ),
                    alink = $target.attr('href');
                event.preventDefault();
                $target.parent().addClass('active').siblings().removeClass('active');
                render(alink, '#content', {});
                if (alink === '#flow-builder') {
                    initBuilder();
                } else {
                    initIndex();
                }
                return false;
            }
        }, 'a');
    }

    // default template
    init();
    render('#my-flows', '#content', {});
    initIndex();

    return 'App is on!';
});

