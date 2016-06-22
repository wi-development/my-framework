    //get actived language tab
$('.tab-content a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    console.warn('rab');
    //$('#active_language_tab').val($(e.target).attr("aria-controls"));
    console.info($(e.target).attr("aria-controls"));
    console.info($(e.target).data("tab-type"));

    if ($(e.target).data("tab-type") != 'main'){
        var lng = $(e.target).attr("aria-controls");
        $('#page-content .tab-content a[href="#main_'+lng+'"]').tab('show');

    }

    if ($(e.target).data("tab-type") != 'seo'){
        var lng = $(e.target).attr("aria-controls");
        $('#page-content .tab-content a[href="#seo_'+lng+'"]').tab('show');
    }


    //$('#myTabs a[href="#profile"]').tab('show')
    //e.target // newly activated tab
    //e.relatedTarget // previous active tab
});
(function(){
    var o = $({});

    $.subscribe = function(){
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function(){
        o.off.apply(o, arguments);
    };

    $.publish = function(){
        o.trigger.apply(o, arguments);
    };

})(jQuery);

var ajaxResponse = '';
(function(){
    $.subscribe('form.submitted',function(e){


        $('button.submit-sitemap i').hide();

        //console.info(test);
        //$('.flash').fadeIn(500).delay(1000).fadeOut(500);

        //console.info(ajaxResponse.status != 'succes');
        if (ajaxResponse.status != 'success'){
            ajaxResponse.status = 'danger';
            $.niftyNoty({
                type: ajaxResponse.status+' basic',//succes
                icon : 'fa fa-warning fa-2x',
                container: 'floating',
                title: ajaxResponse.statusText,
                message: ajaxResponse.responseText,
                closeBtn: true

                //,
                //onShow:function(){
                //	alert("onShow Callback");
                //}
            });
        }
        else{
            $.niftyNoty({
                type: ajaxResponse.status+' basic',//succes
                icon : 'fa fa-check fa-2x',
                container: 'floating',
                title: ajaxResponse.statusText,
                message: ajaxResponse.responseText,
                closeBtn: true,
                timer: 5000
                //,
                //onShow:function(){
                //	alert("onShow Callback");
                //}
            });
        }

    });
})();

//viewConfig / set Tabs etc. SESSION
(function(){
    var setFormConfig = function(e){
        //$('button.submit-sitemap i').show();
        var config = $(this);
        var value = config.data('config') || 'none';
        //console.info(config.data('config'));
        //console.info(value);







        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': '{{csrf_token()}}'
            }
        });


        $.ajax({
            type: 'POST',
            url: "{{ route('admin::sitemap.session') }}",
            dataType: 'json',
            data: value,
        }).done (function (data) {
            ajaxResponse = data;
            //console.info(data)
            //$.publish('form.submitted',form);
            //console.info('tab yeah');
        }).fail(function(data) {
            ajaxResponse = data;
            //form.data = data;
            //console.warn(data);
            //console.info('tab no');



            //$.publish('form.submitted',form);
        });
        e.preventDefault();//disable submit form
    };


    //From marked with the "data-remote" attribute will submit, via AJAX.
    $('ul.nav-tabs a[data-config]').on('click',setFormConfig);


})();




(function(){
    var submitAjaxRequest = function(e){
        $('button.submit-sitemap i').show();
        var form = $(this);
        var method = form.find('input[name="_method"]').val() || 'POST';


        //console.info(form.find('input[name="_method"]').val());
        method = 'POST'
        $.ajax({
            type: method,
            url: form.prop('action'),
            data: form.serialize()
        }).done (function (data) {
            ajaxResponse = data;
            form.data = data;
            //console.info(form);
            //console.info((data.responseEnabledLocales.length));
            console.info(data);


            $('#sitemap_updated_at_as_formatLocalized').attr('value',data.responseSitemap.updated_at_as_formatLocalized);
            $('#sitemap_updated_at_info').html(data.responseSitemap.updated_at_info);
            $('.tab-content .panel .panel-heading h3.panel-title').html('Wijzigen \''+data.responseSitemap.translations['nl'].name+'\'');

            for (var i = 0;i<(data.responseEnabledLocales.length);i++){
                //console.warn(data.responseEnabledLocales[i]);
                //console.info(data.responseSitemap.translations[''+data.responseEnabledLocales[i]+''].slug);
                //set slug
                $('#translations\\['+data.responseEnabledLocales[i]+'\\]\\[slug\\]').attr('value',''+data.responseSitemap.translations[''+data.responseEnabledLocales[i]+''].slug+'');
                //$('#translations\\['+data.responseEnabledLocales[i]+'\\]\\[event\\]\\[price\\]').attr('value',''+data.responseSitemap.translations[''+data.responseEnabledLocales[i]+''].event.price+'');
                if ($('#translations\\['+data.responseEnabledLocales[i]+'\\]\\[event\\]\\[price\\]').length == 1){
                    $('#translations\\['+data.responseEnabledLocales[i]+'\\]\\[event\\]\\[price\\]').val(''+data.responseSitemap.translations[''+data.responseEnabledLocales[i]+''].event.price+'');
                }

                //console.warn(data.responseSitemap.translations[''+data.responseEnabledLocales[i]+''].event.price);
            }
            //for


            //data.responseEnabledLocales
            //$('.tab-content .panel .panel-heading h3.panel-title').html('Wijzigen \''+data.responseSitemap.name+'\'');
            //$('#sitemap_created_at').attr('value',''+data.responseSitemap.updated_at+'');
            $.publish('form.submitted',form);
        }).fail(function(data) {
            ajaxResponse = data;
            form.data = data;

            //console.info(data.status);
            //verplicht veld
            if (data.status == 422){
                for (key in data.responseJSON) {
                    //console.info(key+" - "+data.responseJSON[key]);
                    var str = key;
                    var newKey = str.split(".");
                    newKey = ''+newKey[0]+'['+newKey[1]+']['+newKey[2]+']';
                    //console.info(newKey);
                    $("label[for='"+newKey+"']").closest("div.form-group").addClass('has-error');
                }
            }



            $.publish('form.submitted',form);
        });


        e.preventDefault();//disable submit form
    };


    //From marked with the "data-remote" attribute will submit, via AJAX.
    $('form[data-remote]').on('submit',submitAjaxRequest);


})();


    //sortable
$(function() {
    $("ul.sortable").sortable({
        revert: true
    });
    $("#draggablex").draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });
    $("ul.sortable, ul.sortable li").disableSelection();
});

/*
 $(function() {
 $("div.sortable").sortable({
 revert: true
 });
 $("#draggablex").draggable({
 connectToSortable: "#sortable",
 helper: "clone",
 revert: "invalid"
 });
 $("div.sortable, div.sortable li").disableSelection();
 });
 */
/*
 $(document).ready(function() {
 // Handler for .ready() called.
 $("ul.sortable").sortable({
 revert: true
 });
 $("#draggablex").draggable({
 connectToSortable: "#sortable",
 helper: "clone",
 revert: "invalid"
 });
 $("ul.sortable, ul.sortable li").disableSelection();
 });
 */

    //sortable
$(function() {
    $("tbody.sortable-pane").sortable({
        revert: true,
        axis: 'y',
        helper: function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                // Set helper cell sizes to match the original sizes
                $(this).width($originals.eq(index).width());
                //$(this).height($originals.eq(index).height());
            });
            return $helper;
        }
    });
    $("#draggablex").draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });
    $("tbody.sortable-pane, tbody.sortable-pane li").disableSelection();
});

$(function() {
    //$("#collapse0").collapse('show');
});

//DATATABLES
//https://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript

//https://editor.datatables.net/examples/extensions/rowReorder.html



//$.MyPlugin.extend('RowReorder', function(table, opts) {
//	return this.css(prop, value);
//});



//sja..
function tonnyTestDisable(settings,disable){
    //console.info(settings)
    var rowReorderObject = $('#users-table').dataTable.settings[0].rowreorder;
    if (rowReorderObject === undefined){
        rowReorderObject = settings.oInit.rowReorder;
    }
    else{
        rowReorderObject = rowReorderObject.c;
    }
    rowReorderObject.disabled = disable;
    $('.dataTable .dragpointer').removeClass('move');
    if (!(disable)){
        $('.dataTable .dragpointer').addClass('move');
    }

}


//console.info($.fn.dataTable.RowReorder);
function setTable(tableConfig) {
    tableConfig.reOrderConfig = {
        dataSrc: 'reorderData_id_AND_order_by_number',
        update:false,
        snapX:true,
        disabled:false //$('#users-table').dataTable.settings[0].rowreorder.c.disabled
    };
    //var tableConfig = tableConfig;







    //
// Pipelining function for DataTables. To be used to the `ajax` option of DataTables
//
    $.fn.dataTable.pipeline = function ( opts ) {
        // Configuration options
        //console.info('init pipeline');
        var conf = $.extend( {
            pages: 5,     // number of pages to cache
            url: '',      // script url
            data: null,   // function or object with parameters to send to the server
                          // matching how `ajax.data` works in DataTables
            method: 'GET' // Ajax HTTP method
        }, opts );

        // Private variables for storing the cache
        var cacheLower = -1;
        var cacheUpper = null;
        var cacheLastRequest = null;
        var cacheLastJson = null;

        return function ( request, drawCallback, settings ) {
            var ajax          = false;
            var requestStart  = request.start;
            var drawStart     = request.start;
            var requestLength = request.length;
            var requestEnd    = requestStart + requestLength;

            if ( settings.clearCache ) {
                // API requested that the cache be cleared
                ajax = true;
                settings.clearCache = false;
            }
            else if ( cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper ) {
                // outside cached data - need to make a request
                ajax = true;
            }
            else if ( JSON.stringify( request.order )   !== JSON.stringify( cacheLastRequest.order ) ||
                JSON.stringify( request.columns ) !== JSON.stringify( cacheLastRequest.columns ) ||
                JSON.stringify( request.search )  !== JSON.stringify( cacheLastRequest.search )
            ) {
                // properties changed (ordering, columns, searching)
                ajax = true;
            }

            // Store the request for checking next time around
            cacheLastRequest = $.extend( true, {}, request );

            if ( ajax ) {
                // Need data from the server
                if ( requestStart < cacheLower ) {
                    requestStart = requestStart - (requestLength*(conf.pages-1));

                    if ( requestStart < 0 ) {
                        requestStart = 0;
                    }
                }

                cacheLower = requestStart;
                cacheUpper = requestStart + (requestLength * conf.pages);

                request.start = requestStart;
                request.length = requestLength*conf.pages;

                // Provide the same `data` options as DataTables.
                if ( $.isFunction (conf.data) ) {
                    // As a function it is executed with the data object as an arg
                    // for manipulation. If an object is returned, it is used as the
                    // data object to submit
                    //console.info(conf.data);
                    var d = conf.data(request);

                    if (d) {
                        $.extend( request, d );
                    }
                }
                else if ( $.isPlainObject( conf.data ) ) {
                    // As an object, the data given extends the default
                    $.extend( request, conf.data );
                }

                settings.jqXHR = $.ajax( {
                    "type":     conf.method,
                    "url":      conf.url,
                    "data":     request,
                    "dataType": "json",
                    "cache":    false,
                    "success":  function ( json ) {
                        cacheLastJson = $.extend(true, {}, json);

                        if ( cacheLower != drawStart ) {
                            json.data.splice( 0, drawStart-cacheLower );
                        }
                        json.data.splice( requestLength, json.data.length );

                        drawCallback( json );
                    }
                } );
            }
            else {
                json = $.extend( true, {}, cacheLastJson );
                json.draw = request.draw; // Update the echo for each response
                json.data.splice( 0, requestStart-cacheLower );
                json.data.splice( requestLength, json.data.length );

                drawCallback(json);
            }
        }
    };

// Register an API method that will empty the pipelined data, forcing an Ajax
// fetch on the next draw (i.e. `table.clearPipeline().draw()`)
    $.fn.dataTable.Api.register( 'clearPipeline()', function () {
        return this.iterator( 'table', function ( settings ) {
            settings.clearCache = true;
        } );
    } );



    var oTable = $('#users-table').DataTable({
        lengthMenu: [[5, 10, 25, 50, 1000], [5, 10, 25, 50, "All"]],
        order: [[ tableConfig.orderColumnInit, tableConfig.orderColumnInitType ]],
        dom: "<'row'<'col-xs-12'<'toolbarx'><'col-xs-6'<'tableDraggable'>f>>r>" +
        "<'row'<'col-xs-12't>>" +
        "<'row'<'col-xs-12' l<'col-xs-6'i><'col-xs-6'p>>>",
        //dom:"<'toolbar'>frtip",
        //retrieve: true,
        //deferRender: false,
        //deferLoading: 57,
        pagingType: "full_numbers",
        processing: false,
        serverSide: true,
        //stateSave: true,
        //rowReorder: true,
        rowReorder: tableConfig.reOrderConfig,
        ajax_uit: {
            url: tableConfig.urlData,
            //pages: 5, // number of pages to cache
            data: function (d) {
                //d.status = $('input[name=status]').val();
                console.info('data');
                //d[""+tableConfig.customSearchColumn+""] = $('input[name='+tableConfig.customSearchColumn+']').val();//custom search on this field
            }
        },
        ajax: $.fn.dataTable.pipeline({
            url: tableConfig.urlData,
            pages: 5 // number of pages to cache
            //type:"POST",
            ,data: function (d) {

                if (d.columns[3].search.value == 'geen'){
                    d.columns[3].search.value = '';
                    d.columns[3].search.isNull = true;
                }


                console.info(d.columns[4]);
                console.warn(tableConfig.customSearchColumn);
                //var oTable = $('#users-table').DataTable();
                //$('#users-table').DataTable().clearPipeline().draw();

                //oTable.clearPipeline().draw(false);
                //d.city = $('input[name=city]').val();
                //d[""+tableConfig.customSearchColumn+""] = $('input[name='+tableConfig.customSearchColumn+']').val();
            }

        }),
        columns: tableConfig.columns,
        initComplete: function (settings, json) {
            //console.log( 'Table initialisation complete: '+new Date().getTime() );
            if ($('[data-toggle="tooltip"]').length == 1){
                $('[data-toggle="tooltip"]').tooltip();
            }

            $('#tableDraggable').on('click', function () {

                oTable.page.len(1000).draw();
            });
            tonnyTestDisable(settings,true);
            $('.dataTables_processing').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw margin-bottom"></i>');
            $('.dataTables_processing').removeClass('panel');
            //$('#users-table').dataTable.settings[0].rowreorder.c.disabled = false;
            //$('#users-table').dataTable.settings.rowreorder.c.disabled = false;
        },
        preDrawCallback: function( settings ) {
            $('.dataTables_wrapper tbody').addClass('wait');
        },
        drawCallback: function (settings) {

            //var test = $('#users-table').dataTable;
            //console.warn('status: '+settings.oInit.rowReorder.disabled+' - ');
            //console.warn(test.settings[0]);
            //$('#users-table').dataTable.settings[0].rowreorder.c.disabled = true;
            //$('#users-table').dataTable.settings[0].rowreorder.c.disabled
            if (tableConfig.allowSortable){

                $('button#tableDraggable').show();

                //visible rows (thispage) == total record
                if (settings.aiDisplay.length == settings._iRecordsTotal) {
                    $('button#tableDraggable').toggleClass('btn-success', true);
                    //$("table.sortable tbody").sortable("enable");
                    //settings.oInit.rowReorder.disabled = false;
                    tonnyTestDisable(settings,false);
                }
                else {
                    //console.info('toggle false');
                    $('button#tableDraggable').toggleClass('btn-success', false);
                    //$("table.sortable tbody").sortable("disable");
                    //$('#users-table').dataTable.settings[0].rowreorder.c.disabled = true;
                    //settings.oInit.rowReorder.disabled = true;
                    tonnyTestDisable(settings,true);
                    //console.info('niet');
                }
            }
            else{
                $('button#tableDraggable').hide();
                //console.warn('helemaal uit');

            }
            //console.info(settings.oInit.rowReorder);
            //console.info($('#users-table').dataTable.RowReorder);
            $('.dataTables_wrapper tbody').removeClass('wait');

        }
    });







    /*tfooter search column*/

    /*
     $('#users-table tfoot th').each( function () {
     var title = $(this).text();
     $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
     } );




     oTable.columns().every( function () {

     var that = this;
     console.info('evenry');
     $('input', this.footer()).on('change', function () {
     if ( that.search() !== this.value ) {
     that.search(this.value).draw();
     }
     });
     });
     */


    oTable.on('row-reorder', function ( e, diff, edit ) {


        var rows_ordered = $('#users-table tr[id^=sortable_]');

        var rows_ordered_data = rows_ordered.map(function() {
            return 'sortable_[]='+this.id.replace("sortable_", "");
        }).get().join('&');

        var newData, oldData, dataSortable = '',reorder_result = '';
        for ( var i=0, ien=diff.length ; i<ien ; i++ ) {
            var rowData = oTable.row( diff[i].node ).data();
            newData = (JSON.parse(diff[i].newData));
            oldData = (JSON.parse(diff[i].oldData));

            /*reorder_result += rowData['testname']+' (id = '+oldData.id+') staat nu op positie '+
             newData.order_by_number+' - '+(diff[i].newPosition+1)+' (was '+oldData.order_by_number+' - '+(diff[i].oldPosition+1)+') <br>';

             dataSortable += 'sortable['+oldData.id+']='+newData.order_by_number+'&';
             */
        }
        //console.warn(rows_ordered_data);
        var data = rows_ordered_data;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': '{{csrf_token()}}'
            }
        });
        $.ajax({
                type: "POST",
                url: "{{ route('admin::sitemap.sort') }}",
                dataType: 'json',
                //processData: true,
                //contentType: false,
                cache: false,
                data: data,
                statusCode: {
                    404: function () {
                        alert("page not found");
                    }
                }
            })
            .done(function (data) {
                //alert(dataSortable);
                $.niftyNoty({
                    type: ''+data.status+'',
                    container: 'floating',
                    title: ''+data.statusText+'',
                    message: ''+data.responseText+'<br> '+reorder_result+'',
                    closeBtn: true,
                    timer: 2000
                    //,
                    //onShow:function(){
                    //	alert("onShow Callback");
                    //}
                });
                var oTable = $('#users-table').DataTable();
                //oTable.fnDraw(false);
                oTable.clearPipeline().draw();
                //oTable.ajax.reload();
            })
            .fail(function (data) {

                $.niftyNoty({
                    type: ''+data.responseJSON.status+'',
                    container: 'floating',
                    title: ''+data.responseJSON.statusText+' ('+data.statusText+' - '+data.status+')',
                    message: ''+data.responseJSON.responseText+'',
                    closeBtn: true,
                    timer: 0
                    //,
                    //onShow:function(){
                    //	alert("onShow Callback");
                    //}
                });
                //alert("errorx " + x.status + " " + x.statusText + " " + x.responseText + "");
            })
            .always(function (x) {
            });
    } );






    //console.info(oTable);

    //CUSTOM SEARCH

    var selectOptionValues = '';
    function logArrayElements(element, index, array) {
        selectOptionValues += ('<option value="'+element+'">' + element + '</option>');
    }
    var optionValues = tableConfig.customSearchColumnValues;

    optionValues.forEach(logArrayElements);
    //console.info(selectOptionValues);



    var bulkSelect = '<div class="btn-group pull-left mar-rgt pad-no">'+
        '<button class="btn btn-default">Bulk acties</button>'+
        '<button aria-expanded="false" class="btn btn-default dropdown-toggle dropdown-toggle-icon" data-toggle="dropdown" type="button">'+
        '<i class="dropdown-caret fa fa-caret-down"></i>'+
        '</button>'+
        '<ul class="dropdown-menu">'+
        '<li><a href="#">Action</a>'+
        '</li>'+
        '<li><a href="#" id="wiBulkDeleteMedia">Verwijder alle aangevinkte items</a>'+
        '</li>'+
        '<li><a href="#">Another action</a>'+
        '</li>'+
        '<li><a href="#">Something else here</a>'+
        '</li>'+
        '<li class="divider"></li>'+
        '		<li><a href="#">Separated link</a>'+
        '</li>'+
        '</ul>'+
        '</div>';


    $("div.toolbarx").html('' +

        ''+bulkSelect+'' +
            //'<button class="btn btn-info pull-left mar-rgt pad-no" id="wiBulk">CLICK</button>' +
        '<form role="form" class="form-inline" id="search-form" method="GET">' +
        '<div class="form-group">' +
            //'<label for="'+tableConfig.customSearchColumn+'"></label>' +
            //'<input type="text" placeholder="zoek '+tableConfig.customSearchColumn+'" id="'+tableConfig.customSearchColumn+'" name="'+tableConfig.customSearchColumn+'" class="form-control" autocomplete="off">' +
            //'</div>' +
        '<button class="btn btn-primary">'+tableConfig.customSearchButtonValue+'</button>'+
        '<select class="selectpicker" id="x'+tableConfig.customSearchColumn+'" name="c'+tableConfig.customSearchColumn+'" style="display:none;"> ' +
        '<optgroup label="Selecteer een '+tableConfig.customSearchButtonValue+'">' +
        '<option value="">toon alles</option>' +
        ''+selectOptionValues+'' +
        '</select>' +
        '<optgroup>' +
        '</form>');
    $("div.toolbarx").addClass('col-xs-6 pad-no');


    /*
     custom text search
     $('#'+tableConfig.customSearchColumn+'').on('keyup', function () {
     oTable.columns(2)
     .search(this.value)
     .draw();
     });
     */
    ///escape . in id
    $('#x'+CSS.escape(tableConfig.customSearchColumn)+'').on('change', function () {
        //console.warn(tableConfig.customSearchColumn);
        oTable.column(''+tableConfig.customSearchColumn+':name').search(this.value).draw();
    });



    //button draggable
    $("div.tableDraggable").html('' +
        '<button id="tableDraggable" class="btn btn-default btn-hover-success btn-icon icon-lg fa fa-arrows-v" data-placement="top" data-toggle="tooltip" data-original-title="Pas de volgorde aan"></button>');
    $("div.tableDraggable").addClass('col-xs-6');
}

function wiLoad(sitemap_id){
    $('.dataTables_wrapper tbody').addClass('wait');

    var urlData = tableConfig.urlIndex;
    urlData += '/'+sitemap_id+'';

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': '{{csrf_token()}}'
        }
    });
    //get controller indexMenu
    var jqxhr = $.get(""+urlData+"", function( data ) {
        //set view data
        $('h3.panel-title small').html(data.breadcrumbAsHTML);
        $('#createPage').html(data.allowed_child_templates_as_html);

        //console.warn(data.tableConfig);
        if (data.tableConfig.allowSortable !== undefined){
            //console.info(data.tableConfig.allowSortable);
            tableConfig.allowSortable = data.tableConfig.allowSortable;
        }
        else{
            //console.warn('not definde');
        }

        if (data.tableConfig.header !== undefined){
            $('#content-container h1').html(data.tableConfig.header);
        }
        //console.info(data.sitemap);


        //get controller indexData
        var oTable = $('#users-table').DataTable();
        var urlData = tableConfig.urlDataRoot;
        urlData += '/'+sitemap_id+'';
        oTable.ajax.url(urlData).load();
    }).done(function() {
            //console.warn( "second success" );
        })
        .fail(function(d) {
            //console.warn( "error:");
            //console.warn(d.responseText);
        })
        .always(function() {
            //console.warn( "finished" );
            //$('.dataTables_wrapper tbody').removeClass('wait');
        });
}


function wiDeleteMedia(media_id){
    var route = "{{ route('admin::media.destroy') }}";
    route += '/'+media_id+'';

    wiDelete(media_id,route);
}

function wiDeleteSitemap(sitemap_id){
    var route = "{{ route('admin::sitemap.delete') }}";
    route += '/'+sitemap_id+'';

    wiDelete(sitemap_id,route);
}
function wiDelete(id,route){


    //sitemap.delete
    //var urlData = "
    // route('admin::media.destroy')";
    //urlData += '/'+sitemap_id+'';

    var urlData = route;


    //console.info('wiDelete: '+urlData);
    //return 'test';


    //console.info(urlData);
    //return true;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': '{{csrf_token()}}'
        }
    });
    $.ajax({
            type: "POST",
            url: urlData,
            dataType: 'json',
            //processData: true,
            //contentType: false,
            cache: false,
            data: {_method: 'delete'},
            statusCode: {
                404: function () {
                    alert("page not found");
                }
            }
        })
        .done(function (data) {
            console.info(data);
            //wiLoad(2);
            var oTable = $('#users-table').DataTable();
            //oTable.ajax.reload();
            //oTable.clearPipeline().draw();
            oTable.clearPipeline().draw(false);
            //alert("succesx" + data.status + " " + data.statusText + " ");

            $.niftyNoty({
                type: 'success',
                container: 'floating',
                title: data.statusText+'TEST',
                message: data.responseText,
                closeBtn: false,
                timer: 2000
                //,
                //onShow:function(){
                //	alert("onShow Callback");
                //}
            });

        })
        .fail(function (data) {
            console.info(data);
            /*
             console.info(data);
             console.info(data.status);
             console.info(data.statusText);
             console.info(data.responseText);
             //console.warn(data.responseJSON.error);
             //console.warn(data.responseJSON.exception);
             //console.warn(data.responseJSON.message);
             */
            //data
            $.niftyNoty({
                type: 'danger',
                container: 'floating',
                title: 'Error ('+data.statusText+' '+data.status+')',
                message: data.responseJSON.error,
                closeBtn: true
                //,timer: 2000
                //,
                //onShow:function(){
                //	alert("onShow Callback");
                //}
            });

        })
        .always(function (x) {
        });

}


function wiDuplicate(sitemap_id){


    var urlData = "{{ route('admin::sitemap.duplicate') }}";
    urlData += '/'+sitemap_id+'';

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': '{{csrf_token()}}'
        }
    });
    $.ajax({
            type: "POST",
            url: urlData,
            dataType: 'json',
            //processData: true,
            //contentType: false,
            cache: false,
            data: {_method: 'post'},
            statusCode: {
                404: function () {
                    alert("page not found");
                }
            }
        })
        .done(function (data) {
            console.info(data);
            //wiLoad(2);
            var oTable = $('#users-table').DataTable();
            //$('#users-table').DataTable().clearPipeline().draw();

            oTable.clearPipeline().draw(false);

            //oTable.ajax.reload(false);

            $.niftyNoty({
                type: 'purple',
                container: 'floating',
                title: data.statusText,
                message: data.responseText,
                closeBtn: false,
                timer: 2000
                //,
                //onShow:function(){
                //	alert("onShow Callback");
                //}
            });

        })
        .fail(function (x) {
            console.info(x);
            alert("errorx " + x.status + " " + x.statusText + " ");

        })
        .always(function (x) {
        });

}





$(document).ready(function() {
    (function(){

        function wiBulkDeleteMedia(e){

            var route = "{{ route('admin::media.destroy.bulk') }}";
            wiBulkDelete(route);
            e.stopImmediatePropagation();
            return false;
            //
            //route += '/'+sitemap_id+'';

            //wiBulkDelete(route);
        }

        var wiBulkDelete = function(route,e){

            //alert('wiBulkDelete'+route);

            //e.stopImmediatePropagation();

            //$ids = $request->input('checkboxes');
            // OR : $ids = Input::get('checkboxes');

            //Crew::destroy($ids);

            //console.info('CLICKED ++');

            var checked = $('input[name=selected_dt_row]:checked').serialize();


            //var checkedMediaIds= $('input[name="selected_dt_row[]"]:checked').serializeArray();

            var mediaIDs = $('input[name="selected_dt_row[]"]:checked').map(function(){
                return $(this).val();
            }).get().join();


            if (mediaIDs == ''){
                $.niftyNoty({
                    type: 'warning',
                    container: 'floating',
                    title: 'Melding',
                    message: 'Je hebt geen items geselecteerd.'+route+'',
                    closeBtn: true
                    //,timer: 2000
                    //,
                    //onShow:function(){
                    //	alert("onShow Callback");
                    //}
                });
                console.info('no media\'s clicked');
                return false;
            }
            var urlData = route;
            //urlData += '/'+sitemap_id+'';
            //console.info(mediaIDs);
            //return true;



            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': '{{csrf_token()}}'
                }
            });
            $.ajax({
                    type: "POST",
                    url: urlData,

                    dataType: 'json',
                    //processData: true,
                    //contentType: false,
                    cache: false,
                    data: {_method: 'delete',mediaIDs: mediaIDs},
                    statusCode: {
                        404: function () {
                            alert("page not found");
                        }
                    }
                })
                .done(function (data) {
                    console.info(data);
                    //wiLoad(2);
                    var oTable = $('#users-table').DataTable();
                    //oTable.ajax.reload();
                    //oTable.clearPipeline().draw();
                    oTable.clearPipeline().draw(false);
                    //alert("succesx" + data.status + " " + data.statusText + " ");

                    $.niftyNoty({
                        type: 'success',
                        container: 'floating',
                        title: data.statusText,
                        message: data.responseText,
                        closeBtn: false,
                        timer: 2000
                        //,
                        //onShow:function(){
                        //	alert("onShow Callback");
                        //}
                    });

                })
                .fail(function (data) {
                    console.info(data);
                    $.niftyNoty({
                        type: 'danger',
                        container: 'floating',
                        title: 'Error ('+data.statusText+' '+data.status+')',
                        message: data.responseJSON.error,
                        closeBtn: true
                        //,timer: 2000
                        //,
                        //onShow:function(){
                        //	alert("onShow Callback");
                        //}
                    });
                })
                .always(function (x) {
                });


            //console.info('wiBulk');
            var checked = $('#user_table input[name=selected_dt_row]').prop("checked");
            console.info(checked);
            e.preventDefault();
        }

        var wiToggleCheckAll = function(e){
            var allCheckboxes = $("input[name='selected_dt_row[]']");
            allCheckboxes.prop('checked',$(this).prop('checked'));
        }

        $('#toggleCheckAll').on('click',wiToggleCheckAll);
        $('#wiBulkDeleteMedia').on('click',wiBulkDeleteMedia);
    })();
});



//show menu index table
$(function() {
    $("table.showExtraData").on("mouseenter", "tr", function(e) {
        //e.stopPropagation();
        //.element { pointer-events: none; }
        $(this).find('div.extraData').css('display','block');
        //$(this).addClass('showExtraData');

        //return false;
        //console.info($(this).find('div'));
        //console.log( $(this).text() );
    });

    $("table.showExtraData").on("mouseleave", "tr", function(e) {
        //e.stopPropagation();
        //.element { pointer-events: none; }
        //$(this).find('div:first-of-type').css('pointer-events','none');
        $(this).find('div.extraData').css('display','none');
        //$(this).removeClass('showExtraData');

        //return false;
        //console.info($(this).find('div'));
        //console.log( $(this).text() );
    });
});


