/*global define */
define(['jquery', 'jquery-ui', 'handlebars'], function ($, ui, Handlebars) {
    'use strict';

    function renderTemplate(template, context) {
        var Template = Handlebars.compile(template);
        return Template(context);
    }

    function render(srcId, destId, context) {
        var template = renderTemplate($(srcId).html(), context);
        $(destId).html(template);
    }

    function createSection() {
    }

    function bindAll() {
        $('.canvas').sortable({
            items: '>ul',
            axis: 'y',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            cursor: 'move'
        }).disableSelection();

        $('.pose-list').sortable({
            items: '>li',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            connectWith: '.pose-list',
            cursor: 'move',
            //grid: [140, 140],
            over: function (event, ui) {
                var $prompt = $('.drop-here-prompt', this);
                if ($prompt.is(':visible')) $prompt.hide();
            },
            out: function (event, ui) {
                //var $section = $(this),
                    //$prompt = $('.drop-here-prompt', this);
                //if ($prompt.not(':visible') && $section.children('li').length <= 2) {
                    //$section.addClass('empty');
                    //$prompt.show();
                //}
            },
            stop: function (event, ui) {
                var $section = $(this);
                if ($section.children('li').length <= 2) {
                    $section.removeClass('empty');
                    $('.drop-here-prompt', $section).hide();
                }
                $('p', ui.item).hide();
            },
            receive: function (event, ui) {
                var $prompt = $('.drop-here-prompt', this);
                if ($prompt.is(':visible')) $prompt.hide();
            },
            remove: function (event, ui) {
                var $section = $(this),
                    $prompt = $('.drop-here-prompt', this);
                if ($prompt.not(':visible') && $section.children('li').length <= 2) {
                    $section.addClass('empty');
                    $prompt.show();
                }
            }
        }).disableSelection();

        $('.pose-picker-archive li').draggable({
            connectToSortable: '.pose-list',
            helper: 'clone',
            revert: 'invalid'
        }).disableSelection();

        $('#nav-links').on({
            'click': function (event) {
                var $target = $( event.currentTarget ),
                    alink = $target.attr('href');

                event.preventDefault();
                $target.parent().addClass('active').siblings().removeClass('active');

                render(alink, '#content', {});
                bindAll();

                return false;
            }
        }, 'a');

        $('.aflow-tools').on({
            'click': function (event) {
                var $target = $( event.currentTarget ),
                    alink = $target.attr('href');

                event.preventDefault();

                render(alink, '#content', {});
                bindAll();

                return false;
            }
        }, 'a');

        $('.page-toolbar').on({
            'click': function (event) {
                var section = $('#empty-section').html();
                event.preventDefault();
                $(section).insertBefore($(this).parent());
                bindAll();
                return false;
            }
        }, 'a');
    }

    // default template
    render('#my-flows', '#content', {});
    bindAll();

    return 'App is on!';

});

