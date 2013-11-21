/*global define */
define(['jquery', 'jquery-ui', 'handlebars', 'quicksearch'], function ($, ui, Handlebars, quicksearch) {
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

    function bindAll() {
        $( '.searchbox input' ).quicksearch( '.pose-picker-archive li' );

        $('.canvas').sortable({
            items: '>div',
            axis: 'y',
            handle:'.section-toolbar' ,
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            cursor: 'move'
        }).disableSelection();

        $('.canvas').on({
            click: function (event) {
                $(event.currentTarget).getParent(3).remove();
                return false;
            }
        }, '.section-options a');

        $('.pose-list').sortable({
            items: '>li',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            connectWith: '.pose-list',
            cursor: 'move',
            tolerance: 'pointer',
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
                //$('p', ui.item).hide();
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

        $('.pose-picker-archive li').draggable({
            connectToSortable: '.pose-list',
            helper: 'clone',
            revert: 'invalid'
        }).disableSelection();

        $('.page-toolbar').on({
            'click': function (event) {
                var section = $('#empty-section').html();
                $(section).insertBefore($(this).parent());
                bindAll();
                return false;
            }
        }, 'button');

    }

    // default template
    render('#my-flows', '#content', {});
    bindAll();

    return 'App is on!';

});

