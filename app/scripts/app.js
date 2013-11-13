/*global define */
define(['jquery', 'handlebars'], function ($, Handlebars) {
    'use strict';

    function renderTemplate(template, context) {
        var Template = Handlebars.compile(template);
        return Template(context);
    }

    function render(srcId, destId, context) {
        var template = renderTemplate($(srcId).html(), context);
        $(destId).html(template);
    }

    $('#nav-links').on({
        'click': function (event) {
            var $target = $( event.currentTarget ),
                alink = $target.attr('href');

            event.preventDefault();
            $target.parent().addClass('active').siblings().removeClass('active');

            render(alink, '#page', {});
            return false;
        }
    }, 'a');

    // default template
    render('#my-flows', '#page', {});

    return 'App is on!';

});

