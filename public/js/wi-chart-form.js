//post wi-chart-form

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
        //console.warn(ajaxResponse.status);
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
                timer: 1000
                //,
                //onShow:function(){
                //	alert("onShow Callback");
                //}
            });
        }

    });
})();


(function(){
    //opslaan chart
    var submitAjaxRequest = function(e){
        //alert(action);
        console.info(e.target.id);
        if (e.target.id == 'chartjs'){

        }




        console.info($(e.target));
        alert('submit');
        console.info(e.target.id);
        switch(e.target.id) {
            case 'chartjs':
                var form = $(this);
                var method = form.find('input[name="_method"]').val() || 'POST';

                form.find('input[name="_method"]').val('PATCH');
                method = 'POST';
                $('#chart_id').val();
                alert('get'+$('#chart_id').val())
                //var route = form.prop('action');
                route = 'http://my-framework.dev/backStage/chart/update/'+$('#chart_id').val()+'';
                //return false;

                var postData = form.serialize()+'&config='+window.saveChartData()+'';
                break;
            case 'newData':

                var form = $('#chartjs');
                var method = 'POST';

                form.find('input[name="_method"]').val('POST');
                //form.find('input[name="_method"]').val('POST');
                method = 'POST';
                var route = $('#store_route').attr('value');
                alert(route);
                var postData = form.serialize();
                    //+'&config='+window.saveChartData()+'';
                break;
            default:
                alert('action not set');
                return false;
                //default code block
        }

        alert(postData);
        //return false;
        $('button.submit-sitemap i').show();




        $.ajax({
            type: method,
            url: route,
            data: postData
        }).done (function (data) {
            ajaxResponse = data;

            form.data = data;
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

    $('#newData').on('click',submitAjaxRequest);
})();


function getConfig(id){
    var form = $(this);
    var route = 'http://my-framework.dev/backStage/chart/'+id+'/edit';
    //console.info(route);

    var method = 'GET';
    $.ajax({
        type: method,
        url: route,
        dataType:'json',
        cache:false
        //data: form.serialize()+'&config='+window.saveChartData()+''
    }).done (function (data) {
        ajaxResponse = data;
        window.loadChartData(data.chart);

        $.publish('form.submitted',form);
    }).fail(function(data) {
        ajaxResponse = data;
        //form.data = data;
        console.info(data);
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



        //$.publish('form.submitted',form);
    });

}

function getVerzuimvensters(){
    var form = $(this);

    var route = 'http://my-framework.dev/backStage/chart/getVerzuimvensters';
    //console.info(route);
    $('#getVerzuimvensters i').addClass('fa-spin');


    var method = 'GET';
    $.ajax({
        type: method,
        url: route,
        dataType:'json',
        cache:false
        //data: form.serialize()+'&config='+window.saveChartData()+''
    }).done (function (data) {
        ajaxResponse = data;

        console.info(data.chart);
        $('#chart_id option').remove();
        $.each(data.chart, function (i, item) {
            console.info(i);
            console.warn(item);
            $('#chart_id').append($('<option>', {
                value: i,
                text : item
            }));
        });


        $('#getVerzuimvensters i').removeClass('fa-spin');
        //chart_id

        //window.loadChartData(data.chart);
        //$.publish('form.submitted',form);
    }).fail(function(data) {
        ajaxResponse = data;
        //form.data = data;
        console.info('fail');
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



        //$.publish('form.submitted',form);
    });

}



