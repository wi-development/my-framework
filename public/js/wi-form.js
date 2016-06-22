//User Settings / set Tabs etc. SESSION
$(document).ready(function() {


(function(){
    var mergeUserSettings = function(e){

        var config = $(this);
        var value = config.data('user-settings') || 'none';
        //console.warn(value);
        //console.info($('input[name="_token"]').val());

console.info(value);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': ''+$('input[name="_token"]').val()+''
            }
        });


        $.ajax({
            type: 'GET',
            //url: "{{ route('admin::sitemap.session') }}",
            url: "/settings",
            dataType: 'json',
            data: value,
        }).done (function (data) {
            ajaxResponse = data;
            console.info(data)
            //$.publish('form.submitted',form);
            //console.info('tab yeah');
        }).fail(function(data) {
            ajaxResponse = data;
            form.data = data;
            //console.warn(data);
            //console.info('tab no');



            //$.publish('form.submitted',form);
        });
        e.preventDefault();//disable submit form

    };


    //From marked with the "data-remote" attribute will submit, via AJAX.
    $('a[data-user-settings]').on('click',mergeUserSettings);


})();


});