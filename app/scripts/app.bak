/*global define*/
define(['jquery', 'jquery-ui', 'handlebars', 'quicksearch', 'bootstrapDropdown'], function ($, ui, Handlebars, quicksearch, bootstrapDropdown) {
    'use strict';

    // little plugin to get nested parents (for handling of pose removal)
    $.fn.getParent = function (num) {
        var last = this[0];
        for (var i = 0; i < num; i++) {
            last = last.parentNode;
        }
        return $(last);
    }

    // handlebars template rendering
    function renderTemplate(template, context) {
        var Template = Handlebars.compile(template);
        return Template(context);
    }

    function render(srcId, destId, context) {
        var template = renderTemplate($(srcId).html(), context);
        $(destId).html(template);
    }


/*    function makeEditable(selector) {
        $(selector).editable(function(value, settings) {
                return(value);
            }, {
            indicator : '<img src="img/indicator.gif">',
            tooltip   : 'Doubleclick to edit',
            event     : 'dblclick',
            style     : 'inherit',
        });
    }
*/

/*    function print(e) {
        if (e.preventDefault) e.preventDefault();
        window.print();
        return false;
    }
*/

    function initDragDrop() {
        // pose archive draggable, drop to poselist
        $('.pose-picker-archive li').draggable({
            connectToSortable: '.pose-list',
            helper: 'clone',
            revert: 'invalid'
        }).disableSelection();

        // poselist sortable
        var $poseLlist = $('.pose-list').sortable({
            items: 'li',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
        //    connectWith: '.pose-list',
            cursor: 'move',
            tolerance: 'pointer',
        // hide prompt when a pose is hovering over the (empty) list
            over: function (event, ui) {
                var $this = $(this),
                    $prompt = $('.drop-here-prompt', this);
                if ($this.children('li').length <= 2) {
                    $prompt.hide();
                }
            },
            /*  receive: function (event, ui) {
                var $this = $(this),
                    $prompt = $('.drop-here-prompt', this);
                if ($this.children('li').length <= 1) {
                    $prompt.hide();
                }
            },
            */
           /* remove: function (event, ui) {
                var $this = $(this),
                    $prompt = $('.drop-here-prompt', this);
                if ($this.children('li').length === 0) {
                    $prompt.show();
                }
            }*/
        }).disableSelection();

//        makeEditable('.section-title p');

        // hack to make jquery sortable work with horizontal lists
        //$poseList.data('sortable').floating = true;
        //$poseList.data('uiSortable').floating = true;

        // handle removal
        $('.pose-list').on({
            mouseenter: function (event) {
                var btn = $('<div class="icn-remove"><i class="glyphicon glyphicon-remove"></i></div>');
                $(this).append(btn);
            },
            mouseleave: function (event) {
                $('.icn-remove', this). remove();
            }
        }, 'li');

        $('.pose-list').on({
            click: function (event) {
                var $list = $(this).getParent(2);
                $(this).parent().fadeOut(function () {
                    // if our removed element was the last one, then show the prompt
                    if ($list.children('li').length < 1) {
                        $('.drop-here-prompt', $list).fadeIn();
                    }
                }).remove();
            }
        }, '.icn-remove');
    }

    function initBuilder() {
        //make toolbar selectors work
/*        $('.dropdown-menu li a').click(function (e) {
            var newHeading = $(this).text();
            var $heading = $(this).getParent(3).children(":first");
            var $caret = $('.caret', $heading);
            $heading.html(newHeading);
        });
*/
        // add a default section
        $($('#empty-section').html()).appendTo('.page');

/*        // make sections sortable
        $('.canvas').sortable({
            items: '>div.section',
            axis: 'y',
            placeholder: 'sortable-placeholder',
            forcePlaceholderSize: true,
            cursor: 'move'
        }).disableSelection();
*/

/*        // remove sections
        $('.canvas').on({
            click: function (event) {
                event.preventDefault();
                $(event.currentTarget).getParent(3).remove();
            }
        }, '.section-options a');
*/
        initDragDrop();

        // Handle page toolbar events
/*        $('.page-toolbar').on({
            'click': function (event) {
                event.preventDefault();
                $($('#empty-section').html()).insertBefore($(this).parent());
                initDragDrop();
            }
        }, 'a');
*/

        // handle nav icon events
//        $('#builder-links').on('click', '[href$="#print"]', print);

        // misc
        $('.searchbox input').quicksearch('.pose-picker-archive li');
//        makeEditable('.section-title p');
    }

/*    function initIndex() {
//        var $myFlows = $('#nav-links a[href$="#my-flows"]');

        $('.aflow-tools, .toolbar').on({
            'click': function (event) {
                event.preventDefault();
                var $target = $(event.currentTarget),
                    alink = $target.attr('href');
                render(alink, '#content', {});
                $myFlows.parent().removeClass('active');
                initBuilder();
            }
        }, 'a');

        // Misc
        makeEditable('.aflow-description p');
    }
*/

/*    function init() {
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
*/

    // default template
//    init();
    render('#flow-builder', '#content', {});
    initBuilder();
//    initIndex();

    return 'App is on!';
});

