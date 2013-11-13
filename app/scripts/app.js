/*global define */
define(['jquery', 'handlebars'], function ($, Handlebars) {
    'use strict';

    function render(template, context) {
        var Template = Handlebars.compile(template);
        return Template(context);
    }

    $('#nav-link').on({
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

    return 'App is on!';

});

