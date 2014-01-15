(function() {
    var API_KEY = 'here put your GR API key',
        API_URL = 'http://api2.getresponse.com';

    function add_contact(email, campaign) {
        campaigns = {};

        // find campaign named 'test'
        $.ajax({
            url     : API_URL,
            data    : JSON.stringify({
                'jsonrpc'   : '2.0',
                'method'    : 'get_campaigns',
                'params'    : [
                    API_KEY,
                    {
                        // find by name literally
                        'name' : { 'EQUALS' : campaign }
                    }
                ],
                'id'        : 1
            }),
            type        : 'POST',
            contentType : 'application/json',
            dataType    : 'JSON',
            crossDomain : true,
            async       : false,
            success     : function(response) {
                // uncomment following line to preview Response
                // alert(JSON.stringify(response));

                campaigns = response.result;
            }
        });

        // because there can be only (too much HIGHLANDER movie) one campaign of this name
        // first key is the CAMPAIGN_ID required by next method
        // (this ID is constant and should be cached for future use)
        var CAMPAIGN_ID;
        for(var key in campaigns) {
            CAMPAIGN_ID = key;
            break;
        }

        $.ajax({
            url     : API_URL,
            data    : JSON.stringify({
                'jsonrpc'   : '2.0',
                'method'    : 'add_contact',
                'params'    : [
                    API_KEY,
                    {
                        // identifier of 'test' campaign
                        'campaign'  : CAMPAIGN_ID,

                        // basic info
                        'email'     : email,

                        // custom fields
                        'customs'   : []
                    }
                ],
                'id'        : 2
            }),
            type        : 'POST',
            contentType : 'application/json',
            dataType    : 'JSON',
            crossDomain : true,
            async       : false,
            success     : function(response) {
                // uncomment following line to preview Response
                // alert(JSON.stringify(response));
                alert('Contact added');
            }
        });
    }

    $('form').submit(function(event) {
        console.log($('input:first').val());
        add_contact($('input:first').val(), 'yfb');
    });

}());
