/*global define*/
define(['jquery', 'jquery-ui', 'handlebars', 'quicksearch', 'bootstrapDropdown', 'share-button'], function ($, ui, Handlebars, quicksearch, bootstrapDropdown, Share) {
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

    // printing functionality
    function print(e) {
        if (e.preventDefault) e.preventDefault();
        window.print();
        return false;
    }
    
    // sharing functionality
    var share = new Share('.share-button', {
        ui: {
            flyout: 'bottom center'
        }
    });

    /**
     * Enable building of pose list with drag & drop,
     * removal of poses.
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

    /**
     * Init the flow builder.
     * @param {Array} poses
     */
    function initBuilder(poses) {
        var posesData = [],
            result,
            source,
            template,
            html;

        // if we have poses, transpose it into a template context
        if (poses) {
            $.each(poses, function(index, value) {
                result = $.grep(archive, function(e) {
                    if (e.id == value) {
                        return e;
                    }
                });

                if (result.length === 1) {
                    posesData.push(result[0]);
                }
            });
        }

        // render the template
        source = $('#empty-section').html();
        template = Handlebars.compile(source);
        html = template({ poses: posesData });
        $(html).appendTo('.page');

        // enable building of pose list
        initDragDrop();

        // activate search
        $('.searchbox input').quicksearch('.pose-picker-archive li');

        $('#social').on('click', '[href$="#print"]', print);

    }


    /**
     * Generate a deep link with a sequence.
     * @returns {string} generated url
     */
    function generateDeepLink() {
        var arr = [];
        $('.pose-list li').each(function(index) {
            arr.push($(this).attr("id-data"));
        });
        return 'http://127.0.0.1:9000/poses=' + encodeURIComponent(arr.join(','));
    }


    /**
     * Retrieve a GET parameter by name.
     * @param variable Parameter name
     * @returns {string} GET parameter value or an empty string
     */
    function getQueryVariable(variable) {
        var query = decodeURIComponent(window.location.search.substring(1));
        var vars = query.split("&");

        for(var i = 0, len = vars.length; i < len; i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
                return pair[1];
            }
        }

        return '';
    }

    // Get URL params and render the template
    var poses = getQueryVariable('poses');
    var posesArray = [];
    if (poses) posesArray = poses.split(',');

    render('#flow-builder', '#content', { objects: archive });
    initBuilder(posesArray);

    return 'App is on!';
});

