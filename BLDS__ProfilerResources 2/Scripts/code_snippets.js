            lookupUrl: function ( s, e ) {

                /*var GoogleApiKey = 'AIzaSyAcAM-5p_VI-HmLlGa3DDIkHMW2vQNpeWc';
                var cn = String( $( "#EditCompanyNameTextBox" ).val() );
                if ( cn === '' ) return;

                //var url = "http://www.google.com/search?num=50&start=0&hl=en&lr=&ie=UTF-8&oe=UTF-8&as_qdr=all&q=" + escape( cn ) + "&btnG=Google+Search";
                //var url = 'http://broadlook.com';

                var url = "https://www.googleapis.com/customsearch/v1?key=" + GoogleApiKey + "&cx=013036536707430787589:_pqjad5hr1a&q=" + escape( cn ) + "&alt=json";

                jQuery.support.cors = true;

                Broadlook.CompanyViewer.requestCrossDomain( 
                    url,
                    function ( results ) {
                        $( '#content' ).html( results );
                    }
                    );*/
            },


            
            // Accepts a url and a callback function to run.
            // Note: Yahoo respects robots.txt so, no Google scrapping is posssible
            requestCrossDomain: function ( site, callback ) {

                // If no url was passed, exit.
                if ( !Broadlook.Library.nz( site ) ) {
                    alert( 'No site was passed.' );
                    return false;
                }
                /*
                // Take the provided url, and add it to a YQL query. Make sure you encode it!
                var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent( 'select * from html where url="' + site + '"' ) + '&amp;format=xml&amp;callback=cbFunc';

                jQuery.ajax( 
                yql,
                {
                success: cbFunc,
                error: function ( jqXHR, textStatus, errorThrown ) {
                alert( textStatus + ": " + errorThrown );
                }

                }
                );

                function cbFunc( data ) {


                var mydata = $( data.documentElement.xml ).find( "results" ).text();

                // If we have something to work with...
                if ( mydata ) {
                // Strip out all script tags, for security reasons.
                // BE VERY CAREFUL. This helps, but we should do more.
                mydata = mydata.replace( /&lt;script[^&gt;]*&gt;[\s\S]*?&lt;\/script&gt;/gi, '' );

                // If the user passed a callback, and it
                // is a function, call it, and send through the data var.
                if ( typeof callback === 'function' ) {
                callback( mydata );
                }
                }
                // Else, Maybe we requested a site that doesn't exist, and nothing returned.
                else throw new Error( 'Nothing returned from getJSON.' );
                }

                */

                jQuery.ajax( 
                    site,
                    {
                        success: function ( data ) {
                            alert( "done - " + String( data ).substr( 0, 100 ) );
                            callback( data );
                        },
                        error: function ( jqXHR, textStatus, errorThrown ) {
                            alert( textStatus + ": " + errorThrown );
                        }

                    }
                );




            },






                                    /*
                        var rec = jQuery("#grid").jqGrid('getRowData', id);
                        var id = rec['id'];
                        var linkname = "#leadlink"+id;
                        //$(linkname).click();
                        window.open($(linkname).href, '_blank');
                        */






                        
                    //c = c.replace( /</g, "<\/li___<li___<a target='blank' class='context-link' href='" );
                    //c = c.replace( />/g, "'>Open<\/a>" );
                    //c = c.replace( /___/g, ">" );








createAuthToken: function () {
        var h = '';
        var dt = new Date();
        h = '' + h + dt.getFullYear() + ( dt.getMonth() + 1 ) + dt.getDate();
        return h;
    },

    getApiUrl: function () {
        var dt = new Date();
        return 'http://1d5929a59c254e22a6442b5bff429810.cloudapp.net/API/v1/Default.aspx?t=' + dt;
        //return 'https://blcrm.broadlook.com/API/v1/Default.aspx?t=' + dt;
    },

    sendApiRequest: function ( command, data, callback ) {

        var method = 'POST';
        var token = Broadlook.Library.createAuthToken();

        var req = new XMLHttpRequest();

        var changes = new Object();
        changes.authToken = token;
        changes.data = data;
        changes.format = 'text';

        var path = Broadlook.Library.getApiUrl();

        path += '&c=' + escape( command );

        if ( method == 'GET' )
            path += '&q=' + escape( JSON.stringify( changes ) );

        $.jsonp( {
            url: path + "&callback=?",
            context: document.body,
            data: data,
            complete: function ( s ) {
                callback( s );
                //alert( 'done' + s );
                //$( this ).addClass( "done" );
            }
        } );

        //Broadlook.Library.requestCrossDomain( path, callback );
      
    },

    // Accepts a url and a callback function to run.
    // Note: Yahoo respects robots.txt so, no Google scrapping is posssible
    requestCrossDomain: function ( site, data, callback ) {

        // If no url was passed, exit.
        if ( !Broadlook.Library.nz( site ) ) {
            alert( 'No site was passed.' );
            callback( false );
            return false;
        }
        /*
        // Take the provided url, and add it to a YQL query. Make sure you encode it!
        var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent( 'select * from html where url="' + site + '"' ) + '&amp;format=xml&amp;callback=cbFunc';

        jQuery.ajax( 
        yql,
        {
        success: cbFunc,
        error: function ( jqXHR, textStatus, errorThrown ) {
        alert( textStatus + ": " + errorThrown );
        }

        }
        );

        function cbFunc( data ) {


        var mydata = $( data.documentElement.xml ).find( "results" ).text();

        // If we have something to work with...
        if ( mydata ) {
        // Strip out all script tags, for security reasons.
        // BE VERY CAREFUL. This helps, but we should do more.
        mydata = mydata.replace( /&lt;script[^&gt;]*&gt;[\s\S]*?&lt;\/script&gt;/gi, '' );

        // If the user passed a callback, and it
        // is a function, call it, and send through the data var.
        if ( typeof callback === 'function' ) {
        callback( mydata );
        }
        }
        // Else, Maybe we requested a site that doesn't exist, and nothing returned.
        else throw new Error( 'Nothing returned from getJSON.' );
        }

        */

        /*jQuery.ajax( 
        {
        url: site,
        typdataTypee: "POST",
        dataType: "jsonp",
        data: data,
        crossDomain: true,
        jsonp: function ( data ) {
        alert( "done - " + String( data ).substr( 0, 100 ) );
        callback( data );
        }

        }
        );

        */

        $.jsonp( {
            url: site + "&callback=?",
            context: document.body,
            complete: function ( s ) {
                alert( 'done' + s );
                $( this ).addClass( "done" );
            }
        } );


    },



    /*
    retrieveAccountRecord: function ( Id ) {
    showMessage( "retrieveAccountRecord function START" );

    var retrieveAccountReq = new XMLHttpRequest();
    retrieveAccountReq.open( "GET", ODataPath + "/AccountSet(guid'" + Id + "')", true );
    retrieveAccountReq.setRequestHeader( "Accept", "application/json" );
    retrieveAccountReq.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
    retrieveAccountReq.onreadystatechange = function () {
    retrieveAccountReqCallBack( this );
    };
    retrieveAccountReq.send();
    showMessage( "retrieveAccountRecord function END." );
    },

    retrieveAccountReqCallBack: function ( retrieveAccountReq ) {
    if ( retrieveAccountReq.readyState == 4  ) {
    if ( retrieveAccountReq.status == 200 ) {
    //Success
    var retrievedAccount = JSON.parse( retrieveAccountReq.responseText ).d;
    showMessage( "ACTION: Retrieved account Name = \"" + retrievedAccount.Name + "\", AccountId = {" + retrievedAccount.AccountId + "}" );

    //NEXT STEP: Update the account
    updateAccountRecord( retrievedAccount.AccountId );
    showMessage( "retrieveAccountReqCallBack function success END" );
    }
    else {
    //Failure
    Broadlook.Library.errorHandler( retrieveAccountReq );
    //showMessage( "retrieveAccountReqCallBack function failure END" );
    }
    }
    },
    */
    /*
    updateAccountRecord: function ( Id ) {
    showMessage( "updateAccountRecord function START" );
    var updateAccountReq = new XMLHttpRequest();
    var changes = new Object();
    changes.Name = "Updated Sample";
    changes.Telephone1 = "555-0123";
    changes.AccountNumber = "ABCDEFGHIJ";
    changes.EMailAddress1 = "someone1@example.com";

    updateAccountReq.open( "POST", ODataPath + "/AccountSet(guid'" + Id + "')", true );
    updateAccountReq.setRequestHeader( "Accept", "application/json" );
    updateAccountReq.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
    updateAccountReq.setRequestHeader( "X-HTTP-Method", "MERGE" );
    updateAccountReq.onreadystatechange = function () {
    updateAccountReqCallBack( this, Id );
    };
    updateAccountReq.send( JSON.stringify( changes ) );
    showMessage( "updateAccountRecord function END." );
    },

    updateAccountReqCallBack: function ( updateAccountReq, Id ) {
    if ( updateAccountReq.readyState == 4  ) {
    //There appears to be an issue where IE maps the 204 status to 1223 when no content is returned.
    if ( updateAccountReq.status == 204 || updateAccountReq.status == 1223 ) {
    //Success
    showMessage( "ACTION: Updated account data." );

    //NEXT STEP: Delete the account
    deleteAccountRecord( Id );
    showMessage( "updateAccountReqCallBack function success END" );
    }
    else {
    //Failure
    Broadlook.Library.errorHandler( updateAccountReq );
    //showMessage( "updateAccountReqCallBack function failure END" );
    }
    }
    },
    
    deleteAccountReqCallBack: function ( req, callback ) {
    if ( req.readyState == 4  ) {
    //There appears to be an issue where IE maps the 204 status to 1223 when no content is returned.
    if ( req.status == 204 || req.status == 1223 ) {
    //Success
    //showMessage( "ACTION: The account record was deleted." );
    //showMessage( "deleteAccountReqCallBack function success END" );

    if ( typeof ( callback ) != 'undefined' && callback != null )
    callback( true );
    }
    else {
    //Failure
    Broadlook.Library.errorHandler( req );
    callback( false );
    //showMessage( "deleteAccountReqCallBack function failure END" );
    }
    }
    },

    deleteAccountRecord: function ( Id ) {
    showMessage( "deleteAccountRecord START" );
    if ( confirm( "Do you want to delete this account record?" ) ) {
    showMessage( "You chose to delete the account record." );
    var deleteAccountReq = new XMLHttpRequest();
    deleteAccountReq.open( "POST", ODataPath + "/AccountSet(guid'" + Id + "')", true );
    deleteAccountReq.setRequestHeader( "Accept", "application/json" );
    deleteAccountReq.setRequestHeader( "Content-Type", "application/json; charset=utf-8" );
    deleteAccountReq.setRequestHeader( "X-HTTP-Method", "DELETE" );
    deleteAccountReq.onreadystatechange = function () {
    deleteAccountReqCallBack( this );
    };
    deleteAccountReq.send();
    showMessage( "deleteAccountRecord function END." );
    }
    else {
    showMessage( "ACTION: You chose not to delete the record. You can view the record <a href=\"" +
    serverUrl +
    "/main.aspx?etc=1&id=%7b" + Id +
    "%7d&pagetype=entityrecord\">here</a> " );
    }

    },

    deleteAccountReqCallBack: function ( deleteAccountReq ) {
    if ( deleteAccountReq.readyState == 4  ) {
    //There appears to be an issue where IE maps the 204 status to 1223 when no content is returned.
    if ( deleteAccountReq.status == 204 || deleteAccountReq.status == 1223 ) {
    //Success
    showMessage( "ACTION: The account record was deleted." );
    showMessage( "deleteAccountReqCallBack function success END" );
    }
    else {
    //Failure
    Broadlook.Library.errorHandler( deleteAccountReq );
    //showMessage( "deleteAccountReqCallBack function failure END" );
    }
    }
    },
    */