/*global define */
define(['jquery', 'handlebars'], function ($, Handlebars) {
    'use strict';

    var nav = $('#nav-links');

    function render(template, context) {
        var Template = Handlebars.compile(template);
        return Template(context);
    }

    // manage navigation events
    nav.on({
        'click': function (event) {
            var $target = $( event.currentTarget ),
                alink = $target.attr('href'),
                template;

            event.preventDefault();
            $target.parent().addClass('active').siblings().removeClass('active');

            template = render($(alink).html(), {});
            $('#page').html(template);

            return false;
        }
    }, 'a');

});

