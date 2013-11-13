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

    function bindAll() {
        $('.section').sortable({
            over: function (event, ui) {
                $('h2', event.target).hide();
            },
            out: function (even, ui) {
                $('h2', event.target).show();
            },
            stop: function (event, ui) {
                $(event.target).removeClass('empty');
                ui.item.removeClass('ui-draggable');
                $('h2', event.target).hide();
                $('p', ui.item).hide();
            }
        }).disableSelection();
        $('.pose-picker-archive li').draggable({
            connectToSortable: $('.section'),
            helper: 'clone',
            revert: 'invalid'
        }).disableSelection();
    }

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

    // default template
    render('#my-flows', '#content', {});
    bindAll();

    return 'App is on!';

});

