/*global define*/
define(['jquery', 'jquery-ui', 'handlebars', 'quicksearch', 'bootstrapDropdown'], function ($, ui, Handlebars, quicksearch, bootstrapDropdown) {
    'use strict';


    //poses archive
    var archive = [
        {
            "id": 1,
            "image": "http://truestar.com/yoga/jpg-big/HappyBaby-Pose.jpg",
            "tooltip": "Happy Baby",
            "text": "Ananda Balasana Happy Baby Pose Supine Hips Groins"
        },
        {
            "id": 2,
            "image": "http://truestar.com/yoga/jpg-big/Table-Pose.jpg",
            "tooltip": "Table",
            "text": "Svaasana Table Pose Standing Twist Meditative"
        },
        {
            "id": 3,
            "image": "http://truestar.com/yoga/jpg-big/Cat-Pose.jpg",
            "tooltip": "Cat",
            "text": "Marjaryasana Cat Pose Back"
        },
        {
            "id": 4,
            "image": "http://truestar.com/yoga/jpg-big/Cow-Pose.jpg",
            "tooltip": "Cow",
            "text": "Bitilasana Cow Pose Back"
        },
        {
            "id": 5,
            "image": "http://truestar.com/yoga/jpg-big/HalfBow-Pose.jpg",
            "tooltip": "Half Bow",
            "text": "Ardha Dhanurasana Half Bow Pose Back"
        },
        {
            "id": 6,
            "image": "http://truestar.com/yoga/jpg-big/SidePlank-Pose.jpg",
            "tooltip": "Side Plank",
            "text": "Side Plank Pose Vasisthasana Balance"
        },
        {
            "id": 7,
            "image": "http://truestar.com/yoga/jpg-big/Dolphin-Pose.jpg",
            "tooltip": "Dolphin",
            "text": "Dolphin Pose Makarasana"
        },
        {
            "id": 8,
            "image": "http://truestar.com/yoga/jpg-big/Camel-Pose.jpg",
            "tooltip": "Camel",
            "text": "Camel Pose Ustrasana Backbend"
        },
        {
            "id": 9,
            "image": "http://truestar.com/yoga/jpg-big/Rabbit-Pose.jpg",
            "tooltip": "Rabbit",
            "text": "Rabbit Pose Sasangasana"
        },
        {
            "id": 10,
            "image": "http://truestar.com/yoga/jpg-big/Hero-Pose.jpg",
            "tooltip": "Hero",
            "text": "Hero Pose Virasana Sitting"
        },
        {
            "id": 11,
            "image": "http://truestar.com/yoga/jpg-big/Cobra-Pose.jpg",
            "tooltip": "Cobra",
            "text": "Cobra Pose Bhujangasana Backbend"
        },
        {
            "id": 12,
            "image": "http://truestar.com/yoga/jpg-big/Sphinx-Pose.jpg",
            "tooltip": "Sphinx",
            "text": "Sphinx Pose Salamba Bhujangasana Backbend"
        },
        {
            "id": 13,
            "image": "http://truestar.com/yoga/jpg-big/Fish-Pose.jpg",
            "tooltip": "Fish",
            "text": "Fish Pose Matsyasana Backbend"
        },
        {
            "id": 14,
            "image": "http://truestar.com/yoga/jpg-big/Bridge-Pose.jpg",
            "tooltip": "Bridge",
            "text": "Bridge Pose Setu Bandha Sarvangasana"
        },

    ];



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


    // enable building of pose list with drag & drop, removal of poses
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
        }).disableSelection();

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
        // add a default section
        $($('#empty-section').html()).appendTo('.page');

        // enable building of pose list
        initDragDrop();

        // activate search
        $('.searchbox input').quicksearch('.pose-picker-archive li');

    }


    // default template
    render('#flow-builder', '#content', {objects:archive});
    initBuilder();

    return 'App is on!';
});

