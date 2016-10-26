test = true;
Dropzone.autoDiscover = false;
if (test){
    function WiDropzone() {


    }


    WiDropzone.prototype.init = function() {
        Dropzone.autoDiscover = false;

        var previewNode = document.querySelector("#dropzone_preview_template");
        previewNode.id = "";
        var previewTemplate = previewNode.parentNode.innerHTML;
        previewNode.parentNode.removeChild(previewNode);


        var dzContainers = document.querySelectorAll(".dropzone-container");


        var myDropzones = [];

        console.info($('meta[name="csrf-token"]').attr('content'));
        for (var i=0;i<dzContainers.length;i++){
            //console.info(i);
            var thisDropzoneContainer = dzContainers.item(i);
            var thisDropzone = thisDropzoneContainer.querySelector('.dropzone');
            var thisTotalUploadProgress = thisDropzoneContainer.querySelector(".total-progress");
            console.info('myDropzone.js: '+thisDropzone);
            myDropzones[i] = new Dropzone(thisDropzone, { // Make the whole body a dropzone
                url: ""+$('meta[name="upload-route"]').attr('content')+"",// Set the url
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                //uploadMultiple
                paramMedia_type:'image',
                thumbnailWidth: 60,
                thumbnailHeight: 60,
                parallelUploads: 1,
                previewTemplate: previewTemplate,
                //autoProcessQueue: false, // Make sure the files aren't queued until manually added
                autoQueue: false,
                previewsContainer: thisDropzoneContainer.querySelector(".files"), // Define the container to display the previews
                clickable: thisDropzoneContainer.querySelector(".fileinput-button"), // Define the element that should be used as click trigger to select files.
                //clickable: ".fileinput-button, .fileInput",
                init: function () {
                    //this.tonny = 'test: '+i;

                    //this.dropzone = this;
                    //console.info(this);
                    this.totalUploadProgress = thisTotalUploadProgress;
                    this.totalUploadProgressBar = thisTotalUploadProgress.querySelector('.progress-bar');
                    this.dropzoneContainer = thisDropzoneContainer;

                }
            });

            myDropzones[i].on("addedfile", function(file) {
                var myDropzone = this;
                // Hookup the start button
                file.previewElement.querySelector(".start").onclick = function() {
                    //autoQueue
                    myDropzone.enqueueFile(file);   //autoProcessQueue//myDropzone.processQueue();
                };
                // Hookup the start-all button
                this.dropzoneContainer.querySelector(".submit-all").onclick = function() {
                    //autoQueue
                    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));     //autoProcessQueue//myDropzone.processQueue();
                };
                // Hookup the cancel-all button
                this.dropzoneContainer.querySelector(".cancel-all").onclick = function() {
                    //autoQueue
                    myDropzone.removeAllFiles(true);    //autoProcessQueue//myDropzone.??;
                };
            });

            //file upload is complete, succes or fail
            myDropzones[i].on("complete", function(file) {
                console.info('complete');
                var thatProgress = this.totalUploadProgress;
                var thatProgressBar = this.totalUploadProgressBar;
                setTimeout(function(){
                    thatProgress.style.opacity = "0";
                    thatProgressBar.style.width = "0";
                }, 1000);
                file.previewElement.querySelector(".progress").classList.add('hide');

                //this.removeFile(file);


            });

            // Update the total progress bar
            myDropzones[i].on("totaluploadprogress", function(progress) {
                //this.totalUploadProgressBar.textContent = progress + "%";
                this.totalUploadProgressBar.style.width = progress + "%";
                //console.info(progress);
            });

            myDropzones[i].on("sending", function(file, xhr, data) {
                var str = file.type;
                console.info(str);
                var n = str.indexOf("image");

                if (n > -1){
                    console.info('image');
                    data.append("media_type", "image");
                }
                else{
                    data.append("media_type", "file");
                    console.info('file');
                }


                // Show the total progress bar when upload starts
                this.totalUploadProgress.style.opacity = "1";
                // And disable the start button
                file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
            });

            // Hide the total progress bar when nothing's uploading anymore
            myDropzones[i].on("queuecomplete", function(progress) {
                var that = this.totalUploadProgress;
                var that1 = this.totalUploadProgressBar;
                setTimeout(function(){
                    that.style.opacity = "0";
                    that1.style.width = "0";
                }, 1000);


            });


            myDropzones[i].on('success', function (file, response) {
                file.previewElement.querySelector(".dz-success-mark").classList.toggle('hide');
                //file.previewElement.querySelector(".dz-success-mark").textContent = response.message;
                var oTable = $('#users-table').DataTable();
                //oTable.ajax.reload();
                //oTable.clearPipeline().draw();
                oTable.clearPipeline().draw(false);
                console.info(response);
            });

            myDropzones[i].on('error', function (file, error ,xhr) {
                file.previewElement.querySelector(".dz-error-mark").classList.toggle('hide');
            });

            //dz-drag-hover class
        }
    }
    var myWiDropzone = new WiDropzone();
    myWiDropzone.init();



}







/*
 function Person(name, family) {
 this.name = name;
 this.family = family;

 var records = [{type: "in", amount: 0}];

 this.addTransaction = function(trans) {
 if(trans.hasOwnProperty("type") && trans.hasOwnProperty("amount")) {
 records.push(trans);
 }
 }

 this.balance = function() {
 var total = 0;

 records.forEach(function(record) {
 if(record.type === "in") {
 total += record.amount;
 }
 else {
 total -= record.amount;
 }
 });

 return total;
 };
 };

 Person.prototype.getFull = function() {
 return this.name + " " + this.family;
 };

 Person.prototype.getProfile = function() {
 return this.getFull() + ", total balance: " + this.balance();
 };



 */





/*
 (function(){

 var Person = {

 init: function() {
 alert('Person');
 //this.form = $('#form');
 //this.bindEvents();
 },

 bindEvents: function() {
 alert('vent');
 //this.form.on('submit', $.proxy(this.showName, this));
 },

 showName: function(event) {
 //event.preventDefault();

 //alert(this.form.find('input[type=text]').val());
 }
 }

 Person.init();


 })();

 Person.bindEvents();
 */
