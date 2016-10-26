(function (angular) {
    'use strict';


//var module = angular.module('haLocationInputModule');


    var module = angular.module('ng.wi.cms', ['ngAnimate', 'ui.bootstrap','ngSanitize','ui.sortable'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

    });

    module.factory('SharedData', function(){
        return {
            data: {
                searchNameValue: '',
                testTonny :'testy'
                //,lastName: ''
            }
            // Other methods or objects can go here
        };
    });

    module.factory('DataLayer', ['$http',
        function($http) {
            var factory = {};
            var media = [];
            //var apiRoute = apiRoute; //form.blade
            //alert(apiRoute);
            factory.getMediaListByPageNumber = function(success,media_type,page_number,sortable_querystring) {
                //console.info('datalayer: '+media_type+' - '+page_number+' - '+sortable_querystring+' x');
                //console.info(page_number);
                //sortable_querystring = 'x';
                //console.warn(media[media_type+'-'+page_number]);
                if(media[media_type+'-'+page_number+'-'+sortable_querystring+'']){
                    success(media[media_type+'-'+page_number+'-'+sortable_querystring+'']);
                    return;
                }
                else{

                    //console.info('haal op');
                }
                //$http.get("/admin/api/media/modal/"+media_type+"?page="+page_number+""+sortable_querystring+"").success(function(data) {
                //var apiRoute = apiRoute; //form.blade
                $http.get(""+apiRoute+"/"+media_type+"?page="+page_number+""+sortable_querystring+"").success(function(data) {

                    media[media_type+'-'+page_number+'-'+sortable_querystring+''] = data;
                    success(media[media_type+'-'+page_number+'-'+sortable_querystring+'']);
                });
            };
            return factory;
        }
    ]);


    module.directive('dropZone', function ($compile) {
        //http://stackoverflow.com/questions/12371159/how-to-get-evaluated-attributes-inside-a-custom-directive
        //https://docs.angularjs.org/api/ng/service/$compile#-scope-
        //http://excellencenodejsblog.com/angularjs-directive-isolate-scope/
        //https://github.com/angular/angular.js/wiki/Understanding-Scopes
        //http://www.infragistics.com/community/blogs/dhananjay_kumar/archive/2015/06/11/understanding-scopes-in-angularjs-custom-directives.aspx
        //http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/

        return {
            scope:true,
            //templateUrl: '/js/dz/dropzone1.php',
            templateUrl:modalCreateMediaTemplateUrl,
            link: function (scope, element, attrs) {
                //console.info(attrs.mimetypes);

                //scope.testDataBind = 'dataBindValue';
                //scope.created_medium = 'created_mediumValue';


                scope.created_medium = {};


                if (attrs.autoProcess != null && attrs.autoProcess == "false") {
                    attrs.autoProcess = false;
                } else {
                    attrs.autoProcess = true;
                }


                // Allowed max file size
                scope.maxFileSize = (scope.form_media_field.config.dropzone[scope.this_form_media_field.id].maxFileSize)        //attr from form_media_field directive
                    ? parseInt(scope.form_media_field.config.dropzone[scope.this_form_media_field.id].maxFileSize)
                    : (attrs.maxFileSize) ? parseInt(attrs.maxFileSize)                                         //attr from dropzone directive
                    : Dropzone.prototype.defaultOptions.maxFilesize;                                            //default from dropzone
                //console.info(scope.maxFileSize);

                // Allowed mimetypes
                scope.mimetypes = (scope.form_media_field.config.dropzone[scope.this_form_media_field.id].mimetypes)            //attr from form_media_field directive
                    ? scope.form_media_field.config.dropzone[scope.this_form_media_field.id].mimetypes
                    : (attrs.mimetypes) ? attrs.mimetypes                                                       //attr from dropzone directive
                    : '';                                                                                       //default from dropzone
                //console.info(scope.mimetypes);

                // Message for the uploading
                scope.message = (scope.form_media_field.config.dropzone[scope.this_form_media_field.id].message)                //attr from form_media_field directive
                    ? scope.form_media_field.config.dropzone[scope.this_form_media_field.id].message
                    : (attrs.message) ? attrs.message                                                           //attr from dropzone directive
                    : Dropzone.prototype.defaultOptions.dictDefaultMessage;                                     //default from dropzone

                //console.info(scope.message);





                //console.warn(element[0]);
                var dzElement = element[0].querySelector('.dropzone');
                //console.warn(dzElement);
                var previewsContainer = element[0].querySelector('.files');
                var totalUploadProgress = element[0].querySelector(".total-progress");
                var totalUploadProgressBar = totalUploadProgress.querySelector(".progress-bar");


                var previewTemplate = "<div id=\"\" class=\"file-row\">" +
                 "<div class='media-body' style='padding-top: 13px;padding-bottom: 13px;border-bottom: 1px solid #cdd6e1;'>"+
                    "<div class='media-left'>"+
                        "<span class=\"preview\"><img data-dz-thumbnail /></span> "+
                    "</div>"+

                        //"<div ng-click='showFn()'>showFn</div>"+
                        //"<div ng-click='updateFn({msg : \"teskt\"})'>updatefn</div>"+
                        //"<div ng-click=\"showMessage('test ng-click');\">showM 1xxx</div>"+
                        //"<div ng-click=\"showMessage(testDataBind);\">showM databind</div>"+
                        //"<div ng-click=\"addImage({image:created_medium});\">add image</div>"+
                    //"<div ng-click=\"addMediaTranslations(created_medium);\" style='display:none'>add image</div>"+

                    "<div class='media-body' style=''>"+
                        "<p class=\"name text-main text-bold mar-no text-overflow\" data-dz-name></p>"+
                        "<span class=\"error text-danger\" data-dz-errormessage></span>"+

                        //"<div class='col-lg-5'>"+
                            "<p class=\"size text-sm\" data-dz-size></p>"+
                            //"<div class=\"dz-filename\"><span data-dz-name=\"\">functieprofiel-project-manager-enrgy-di.pdf</span></div>"+
                            "<div class='total-progress' style='xopacity: 0'>"+
                            "<div class=\"progress progress-striped active\" style='height:2px;' role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"0\">"+
                            "<div class=\"progress-bar progress-bar-success\" style=\"width:0%;\" data-dz-uploadprogress></div>"+
                            "</div>"+
                        //"</div>"+
                    "</div>"+
                 "</div>"+
                 "<div class='media-right'>" +
                    //"<button data-dz-remove='' class='btn btn-xs btn-danger dz-cancel'><i class='cross'>X</i></button>"+
                    "   <div data-dz-remove class=\"btn btn-danger delete\">"+
                    "   <i class=\"glyphicon glyphicon-trash\"></i>"+
                    //"   <span>Delete</span>"+
                    "   </div>"+
                    "<div class=\"dz-success-mark hide\" style='color:green'><span>✔</span></div>"+
                    "<div class=\"dz-error-mark hide\"><span>✘</span></div>"+

                  "</div>"+

                    //"<div class=\"dz-success-mark hide\"><span>✔</span></div>"+
                    //"<div class=\"dz-error-mark hide\"><span>✘</span></div>"+
                    //"</div>"+

                    "<div style='display: none'>"+
                    "   <div class=\"btn btn-primary start\">"+
                    "    <i class=\"xglyphicon xglyphicon-upload\"></i>"+
                    "    <span>Start</span>"+
                    "    </div>"+
                    "    <div data-dz-remove class=\"btn btn-warning cancel\">"+
                    "    <i class=\"gxlyphicon xglyphicon-ban-circle\"></i>"+
                    "    <span>Cancel</span>"+
                    "   </div>"+
                    "   <div data-dz-remove class=\"btn btn-danger delete\">"+
                    "   <i class=\"xxglyphicon xglyphicon-trash\"></i>"+
                    "   <span>Delete</span>"+
                    "   </div>"+
                    "   </div> </div>";
                //console.info(dzElement);
                //console.info($(dzElement));
                $(dzElement).dropzone({
                    //url: "/admin/media/upload",// Set the url
                    url:mediaUploadUrl, //form/blade
                    headers: {
                        'X-CSRF-Token': $('input[name="_token"]').val()
                    },
                    paramMedia_type:'image',
                    thumbnailWidth: 60,
                    thumbnailHeight: 60,
                    parallelUploads: 1,
                    acceptedFiles: scope.mimetypes,
                    maxFilesize:scope.maxFileSize,
                    previewTemplate: previewTemplate,
                    previewsContainer:previewsContainer,
                    //autoProcessQueue: false, // Make sure the files aren't queued until manually added
                    //autoQueue: false,
                    autoQueue:attrs.autoProcess,
                    clickable: dzElement.querySelector(".fileinput-button"), // Define the element that should be used as click trigger to select files.
                    init: function() {
                        //console.info(attrs.mimetypes);
                        this.on("addedfile", function(file) {
                            //$compile(file.previewTemplate)(scope);
                            var myDropzone = this;
                            file.previewElement.querySelector(".start").onclick = function() {
                                //autoQueue
                                myDropzone.enqueueFile(file);   //autoProcessQueue//myDropzone.processQueue();
                            };
                            // Hookup the start-all button
                            element[0].querySelector(".submit-all").onclick = function() {
                                //autoQueue
                                myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));     //autoProcessQueue//myDropzone.processQueue();
                            };
                            // Hookup the cancel-all button
                            element[0].querySelector(".cancel-all").onclick = function() {
                                //autoQueue
                                myDropzone.removeAllFiles(true);    //autoProcessQueue//myDropzone.??;
                            };
                            console.info(totalUploadProgress);

                            file.previewElement.querySelector(".progress").style.opacity = "0";

                            totalUploadProgress.style.opacity = "1";
                        });

                        //file upload is complete, succes or fail
                        this.on('complete', function(file) {
                            console.info('complete');
                            var thatProgress = totalUploadProgress;
                            var thatProgressBar = totalUploadProgressBar;
                            var previewElement = file.previewElement.querySelector(".progress")

                            setTimeout(function(){
                                //thatProgress.style.opacity = "0";
                                //thatProgressBar.style.width = "0";
                                previewElement.style.opacity = "0";
                            }, 1000);
                            //file.previewElement.querySelector(".progress").classList.add('hide');
                            //this.removeFile(file);
                        });

                        // Update the total progress bar
                        this.on('totaluploadprogress', function(progress) {
                            //this.totalUploadProgressBar.textContent = progress + "%";
                            totalUploadProgressBar.style.width = progress + "%";
                            //console.info(progress);
                        });

                        this.on('sending', function(file, xhr, data) {

                            //console.info(file);
                            //console.warn(data);
                            //console.info(xhr);
                            //console.info('mediaType: '+scope.this_form_media_field.mediaType);
                            data.append("media_type", ""+scope.this_form_media_field.mediaType+""); //image,file
                            // Show the total progress bar when upload starts
                            totalUploadProgress.style.opacity = "1";
                            file.previewElement.querySelector(".progress").style.opacity = "1";
                            // And disable the start button
                            file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
                        });

                        // Hide the total progress bar when nothing's uploading anymore
                        this.on('queuecomplete', function(progress) {
                            console.info('queuecomplete');
                            var that = totalUploadProgress;
                            var that1 = totalUploadProgressBar;

                            setTimeout(function(){
                                that.style.opacity = "0";
                                that1.style.width = "0";
                            }, 1000);
                        });

                        // when file is succesfully upload
                        this.on('success', function (file, response) {
                            file.previewElement.querySelector(".dz-success-mark").classList.toggle('hide');
                            file.previewElement.querySelector(".delete").classList.toggle('hide');

                            console.info(response.created_medium.translations);

                            //modal_create_media view add image by click
                            scope.created_medium = response.created_medium.translations;
                            //auto insert
                            scope.addMediaTranslations(response.created_medium.translations);

                            $compile(file.previewTemplate)(scope);
                            console.info(response);
                        });

                        //when error occured during upload
                        this.on('error', function (file, error ,xhr) {
                            file.previewElement.querySelector(".dz-error-mark").classList.toggle('hide');
                        });

                        this.on('removedfile', function (file, error ,xhr) {
                            console.info('removedfile');
                            var that = totalUploadProgress;
                            var that1 = totalUploadProgressBar;

                            setTimeout(function(){
                                //that.style.opacity = "0";
                                that1.style.width = "0";
                            }, 1000);


                            //file.previewElement.querySelector(".dz-error-mark").classList.toggle('hide');

                        });


                        this.on('canceled', function (file, error ,xhr) {
                            console.info('canceled');
                        });



                    }
                });

            }
        }
    });

    //http://stackoverflow.com/questions/13318726/easiest-way-to-pass-an-angularjs-scope-variable-from-directive-to-controller

    Array.prototype.unique2 = function()
    {
        var n = {},r=[];
        for(var i = 0; i < this.length; i++)
        {
            if (!n[this[i]])
            {
                n[this[i]] = true;
                r.push(this[i]);
            }
        }
        return r;
    }

    module.directive("formMediaField", function($compile){
        return {
            scope:true,
            ///transclude:true,
            //replace:true,
            //replace: true,
            //templateUrl: '/js/dz/form_media_field.html',
            templateUrl: formMediaTemplateUrl,
            link: function (scope, element, attrs) { ////form.blade
                scope.ix[0]++;

                //used in this directive html
                scope.field_id = attrs.fieldId;
                scope.label_value = attrs.labelValue ? attrs.labelValue : attrs.fieldName;



                scope.button_select_value = attrs.buttonSelectValue ? attrs.buttonSelectValue : 'Select '+attrs.mediaType;
                scope.button_upload_value = attrs.buttonUploadValue ? attrs.buttonUploadValue : 'Upload '+attrs.mediaType;

                scope.media_field_edit_media_url = formMediaFieldEditMediaUrl; //form.blade


                //directive id, data object key
                var media_key = scope.field_id+'[ng]';


                scope.this_form_media_field = {
                    'id': media_key,
                    'locale':attrs.locale,
                    'fieldName':attrs.fieldName,
                    'mediaType':attrs.mediaType,
                    'buttonSelectValue':attrs.buttonSelectValue
                };

                //all enabled Locales
                scope.form_media_field.enabledLocales.push(attrs.locale);
                //hmmm...
                scope.form_media_field.enabledLocales = scope.form_media_field.enabledLocales.unique2();
                //console.info(scope.form_media_field.enabledLocales);


                scope.form_media_field.config.dropzone[media_key] = ({
                    message:attrs.dropzoneMessage,
                    mimetypes:attrs.dropzoneMimetypes,
                    maxFileSize:attrs.dropzoneMaxFileSize
                });

                scope.form_media_field.values[media_key] = [];

                //set related media for form_media_field
                if (attrs.relatedMedia){
                    scope.form_media_field.values[media_key] = JSON.parse(attrs.relatedMedia);
                }
                else{
                    scope.form_media_field.values[media_key] = {};
                }
            }
        };
    });


    //refactor, OPEN MODAL
    module.controller('ModalDemoCtrl', function ($scope, $uibModal, $log, $http, $sce,DataLayer,SharedData) {

        $scope.list1 = {title: 'AngularJS - Drag Me'};
        $scope.list2 = {};
        $scope.sharedData = SharedData.data;//share data between controller

        $scope.ix = [0];
        $scope.this_form_media_field = '';

        $scope.form_media_field = {};
        $scope.form_media_field.syncLocale = true;
        $scope.form_media_field.enabledLocales = [];
        $scope.form_media_field.config = {};
        $scope.form_media_field.config.dropzone = {};
        $scope.form_media_field.values = {};
        //$scope.form_media_field.values = {};


        //holds the mediaLibrary for media types
        //used in modal_select_media
        $scope.mediaLibrary = {};

        //holds paginator settings
        //used in modal_select_media
        $scope.paginator = {};
        $scope.paginator.image = {};
        $scope.paginator.file = {};


        //FOR TESTING
        $scope.this_form_media_field = {};
        $scope.this_form_media_field.locale = 'nl';
        $scope.this_form_media_field.fieldName = 'overzicht';
        $scope.this_form_media_field.id = 'translations[nl][media][overzicht][ng]';
        $scope.this_form_media_field.mediaType = 'image';
        //END TESTING


        //SORTABLE
        //$scope.sortable_config = {firstName:"John", lastName:"Doe", age:46};
        //$scope.sortable_querystring = '';
        $scope.sortable_querystring = '&updated_at=desc';    //id=ASC etc


        $scope.messagex = '';//pagina to do

        $scope.getConfig = function(){
            $scope.form_media_field.syncLocale = (!($scope.form_media_field.syncLocale));
            //console.trace($scope.form_media_field);
            console.info($scope.form_media_field);
            console.info($scope.this_form_media_field);

            //console.info($scope.form_media_field.values['translations[nl][media][overzicht][ng]']);


            //console.info($scope.dropzonex);
            //console.warn($scope.form_media_field.values);
            //console.info(Object);

            //$scope.test = Object.keys($scope.form_media_field.values).length;
            //$scope.test = Object.is($scope.form_media_field.values);
            //console.info($scope.test);
        };

        $scope.animationsEnabled = true;


        //create
        //niet meer nodig doet input_media directive
        /*
        $('.image_container').each(function( index ) {
            //$scope.input_type_media[''+$(this).attr('id')+''] = [];
            //console.warn(''+$(this).attr('id')+'');
            //console.info($scope.key);
        });
        */




        //PAGINATOR
            //for all media_type paginate directives
            //$scope.bigCurrentPage = 1; use this: reset paginate page1 after open modal
            $scope.maxSize = 7;

            function setPaginatorFromTo(pMediaType){
                //var mediaType = $scope.this_form_media_field.mediaType;
                $scope.paginator[pMediaType].showFrom = (($scope.paginator[pMediaType].bigCurrentPage*$scope.paginator[pMediaType].itemsPerPage)-$scope.paginator[pMediaType].itemsPerPage)+1;
                $scope.paginator[pMediaType].showTo = ($scope.paginator[pMediaType].bigCurrentPage*$scope.paginator[pMediaType].itemsPerPage);
                if ($scope.paginator[pMediaType].showTo > $scope.paginator[pMediaType].bigTotalItems){
                    $scope.paginator[pMediaType].showTo = $scope.paginator[pMediaType].bigTotalItems;
                }
                //console.warn($scope.this_form_media_field.pMediaType+' - '+pMediaType);
                //console.info($scope.paginator[pMediaType]);

                //console.warn($scope.paginator['file'].bigTotalItems);
            }

            /*
            $scope.setPage = function (pageNo) {
                console.info(pageNo);
                $scope.currentPage = pageNo;
            };

            modal calls paginate directly
            $scope.pageChanged = function() {
                $scope.paginate($scope.currentPage);
                //$scope.paginate($scope.bigCurrentPage);
                $log.log('Page changed to: ' + $scope.currentPage +' - '+$scope.bigCurrentPage);
            };
            */
        //END PAGINATOR


        //get first page for select IMAGE media
        DataLayer.getMediaListByPageNumber(function(response){
                //console.info('datalaruy');
                //for this media_type paginate directive
                $scope.mediaLibrary.image = response.media.data;

                $scope.paginator.image.bigTotalItems = response.media.total;
                $scope.paginator.image.itemsPerPage = response.media.per_page;
                //use scope.bigCurrentPage for always open on page1
                $scope.paginator.image.bigCurrentPage = 1;

                //console.error($scope.paginator.image.bigTotalItems);
                //console.error($scope.paginator.image.bigTotalItems+' - '+response.media.total);
            //var mediaType = $scope.this_form_media_field.mediaType;
                setPaginatorFromTo('image');

            },
            'image',                        //mediaType = image,file
            1,                              //pageNumber = 1
            $scope.sortable_querystring     //id=ASC etc
            );

        //get first page for select FILE media
        DataLayer.getMediaListByPageNumber(function(response){

                $scope.mediaLibrary.file = response.media.data;
                //for this media_type paginate directive
                $scope.paginator.file.bigTotalItems = response.media.total;
                $scope.paginator.file.itemsPerPage = response.media.per_page;
                //use scope.bigCurrentPage for always open on page1
                $scope.paginator.file.bigCurrentPage = 1;


                //console.error($scope.paginator.file.bigTotalItems);
                //console.error($scope.paginator.file.bigTotalItems+' - '+response.media.total);
                setPaginatorFromTo('file');
            },
            'file',                         //mediaType = image,file
            1,                              //pageNumber = 1
            $scope.sortable_querystring     //id=ASC etc
        );

        //console.info($scope.this_form_media_field);

        //open the modal for select from media list
        //media_id = key for input_type_media[key] input_type_media['translations[nl][overzicht]']
        $scope.open = function (size,this_form_media_field) {

            $scope.this_form_media_field = this_form_media_field;

            //console.info($scope.this_form_media_field);
            //console.info('open'+size);
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled, //doesn't work?
                backdrop:true,
                //templateUrl: 'myModalContent.html',
                //templateUrl: '/admin/media/modal_select_media',
                templateUrl: modalSelectMediaUrl, //form.blade
                controller: 'ModalInstanceCtrl',
                size: size,
                scope:$scope
                /*,
                resolve: {
                    currentPage: function () { return $scope.currentPage},

                }*/
                /*resolve: {
                 items: function () { return $scope.items;},
                 media_id: function () {return $scope.media_id;},
                 imageTest: function () {return $scope.imageTest;}
                 }*/
            });

            modalInstance.result.then(function (selectedItemxx) {
                //console.info(selectedItemxx);
                $scope.selected = selectedItemxx;
                //$scope.currentPage = 10;
                //$scope.imageTest = 'asdfasdfasdf';
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //open the modal for create medium and select
        //media_id = key for input_type_media[key] input_type_media['translations[nl][overzicht]']
        $scope.open_modal_create_media = function (size,this_form_media_field) {


            
            $scope.this_form_media_field = this_form_media_field;

            console.info(this_form_media_field);

            //return true;
            //$scope.media_id = media_id;
            //$scope.form_media_field.selectedKey = media_id;
            //alert("asdf"+$scope.media_id);

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                //templateUrl: 'myModalContent.html',
                //templateUrl: '/admin/media/modal_create_media',
                templateUrl: modalCreateMediaUrl, //form.blade
                controller: 'ModalInstanceCtrl',
                size: size,
                scope:$scope
                //resolve: {scope: function () { return $scope}}
                /*resolve: {
                 items: function () { return $scope.items;},
                 media_id: function () {return $scope.media_id;},
                 imageTest: function () {return $scope.imageTest;}
                 }*/
            });

            modalInstance.result.then(function (selectedItemxx) {
                //console.info(selectedItemxx);
                $scope.selected = selectedItemxx;
                //$scope.imageTest = 'asdfasdfasdf';
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            modalInstance.rendered.then(function(){
                //myDropzone.js
                //var myWiDropzone = new WiDropzone();
                //myWiDropzone.init();
            });
        };

        //get media list selected by page nummber

        $scope.paginate = function (page) {
            //console.info('function paginate');
            //console.info('page:'+page);
            //console.info($scope.this_form_media_field.mediaType);
            //return true;
            DataLayer.getMediaListByPageNumber(function(response){
                //$scope.media = response.media.data;
                $scope.mediaLibrary[$scope.this_form_media_field.mediaType] = response.media.data;
                setPaginatorFromTo(''+$scope.this_form_media_field.mediaType+'');
                //$scope.paginatex = $sce.trustAsHtml(response.paginate);
            }   ,$scope.this_form_media_field.mediaType
                ,page,$scope.sortable_querystring);
        };

        $scope.removeMedium = function (this_form_media_field,mediumId) {
            //console.info($scope.form_media_field.syncLocale);
            if ($scope.form_media_field.syncLocale){
                for (var i = 0; i < $scope.form_media_field.enabledLocales.length; i++) {
                    delete $scope.form_media_field.values['translations['+$scope.form_media_field.enabledLocales[i]+'][media]['+this_form_media_field.fieldName+'][ng]']['mediumId'+mediumId+''];
                }
            }
            else{
                delete $scope.form_media_field.values['translations['+this_form_media_field.locale+'][media]['+this_form_media_field.fieldName+'][ng]']['mediumId'+mediumId+'']
            }
            return true;
        };


        /*
            **
            * SORTABLE TABLE
            **
         */
        //$scope.sortable_querystring = '';
        $scope.sortable_config = {
            id:'',
            name:'',
            updated_at:'',
            prev_sortable_column:'',
            this_sortable_column:'updated_at',
            this_sortable_column_order:'desc',
            search_name:''};
        $scope.searchNameValue = 'init';

        function toggleOrderBy(item){
            //console.error(item);
            $scope.sortable_config['this_sortable_column'] = item;


            if (($scope.sortable_config['this_sortable_column_order'] == 'desc') || ($scope.sortable_config['this_sortable_column'] != $scope.sortable_config['prev_sortable_column']))
            {
                $scope.sortable_config['this_sortable_column_order'] = 'asc'
            }
            else{
                $scope.sortable_config['this_sortable_column_order'] = 'desc'
            }
            $scope.sortable_config['prev_sortable_column'] = item;

            //console.error($scope.sortable_config['this_sortable_column']+" = "+$scope.sortable_config['this_sortable_column_order']);


            //prev_sortable_column
            //if
           /*
           if ($scope.sortable_config[''+item+''] == 'ASC'){
                $scope.sortable_config[''+item+''] = 'DESC'
            }
            else{
                $scope.sortable_config[''+item+''] = 'ASC'
            }
            */
        }

        function setOrderBy(){
            $scope.sortable_querystring = '';

            $scope.sortable_querystring = '&'+$scope.sortable_config['this_sortable_column']+'='+$scope.sortable_config['this_sortable_column_order']+'';

            if ($scope.sortable_config['search_name'] != ''){
                $scope.sortable_querystring += '&search_name='+$scope.sortable_config['search_name']+'';
            }


            //console.error($scope.sortable_config['this_sortable_column']+" = "+$scope.sortable_config['this_sortable_column_order']);





            /*
            for (var key in $scope.sortable_config) {
                //console.info(key+' / '+$scope.sortable_config[key]);
                if ($scope.sortable_config[key] != ''){
                    $scope.sortable_querystring += '&'+key+'='+$scope.sortable_config[key]+'';
                }

            }*/

        }



        function getSortSearchResults(){
            setOrderBy();
            var mediaType = $scope.this_form_media_field.mediaType;

            //console.info('GETSORTSEARCH ('+mediaType+')'+$('table thead th[class*="sorting"]'));

            $('table thead th[class*="sorting_"]').removeClass('sorting_asc sorting_desc');
            //console.warn($('table thead th.'+ $scope.sortable_config['this_sortable_column']+''));
            $('table thead th.'+ $scope.sortable_config['this_sortable_column']+'').addClass('sorting_'+$scope.sortable_config['this_sortable_column_order']+'');



            //var rows_ordered = $('#users-table tr[id^=sortable_]');
            DataLayer.getMediaListByPageNumber(function(response){
                    //$scope.media = response.media.data;
                    //console.warn($scope.this_form_media_field.mediaType);

                    $scope.mediaLibrary[$scope.this_form_media_field.mediaType] = response.media.data;

                    $scope.paginator[$scope.this_form_media_field.mediaType].bigCurrentPage = 1;
                    $scope.paginate(1);

                    //$scope.paginator.image.bigTotalItems
                    $scope.paginator[$scope.this_form_media_field.mediaType].bigTotalItems = response.media.total;
                    $scope.paginator[$scope.this_form_media_field.mediaType].itemsPerPage = response.media.per_page;
                    setPaginatorFromTo($scope.this_form_media_field.mediaType);
                }   ,''+mediaType+''
                ,1,$scope.sortable_querystring);
        }


        $scope.setSearchNameValue = function(){
            //console.info($scope.sharedData.searchNameValue);

            //console.warn('---->'+$scope.data.firstName);
            //var module = angular.module('ng.wi.cms').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,$http) {
            $scope.sortable_config['search_name'] = $scope.sharedData.searchNameValue;
            getSortSearchResults();
        }

        $scope.setOrderByValue = function(column){
            //console.info('test setOrderByValue');
            toggleOrderBy(column);
            getSortSearchResults();
            //console.info($scope.sortable_querystring);
            //return true;
        }





        //mediaTranslations from mediaLibrary (select and add)
        //add to $scope.form_media_field.values
        //prepare for addMediaTranslation
        $scope.addMediaTranslations = function(mediaTranslations){
            console.info(mediaTranslations);
            if ($scope.form_media_field.syncLocale){
                for(var locale in mediaTranslations) {
                    $scope.this_form_media_field.id = ('translations['+locale+'][media]['+$scope.this_form_media_field.fieldName+'][ng]');
                    $scope.this_form_media_field.locale = locale;
                    //console.warn(locale);
                    $scope.addMediaTranslation(mediaTranslations[locale]);
                }
            }
            else{
                $scope.addMediaTranslation(mediaTranslations[$scope.this_form_media_field.locale]);
            }
        }


        //add to $scope.form_media_field.values
        $scope.addMediaTranslation = function (mediumtranslation) {
            console.info($scope.this_form_media_field.id);
            //console.info('before:');
            //console.warn($scope.form_media_field.values[$scope.this_form_media_field.id]);

            var newMedia = ($scope.form_media_field.values[$scope.this_form_media_field.id]['mediumId'+mediumtranslation.media_id+''] === undefined);
            if(newMedia) {
                $scope.form_media_field.values[$scope.this_form_media_field.id]['mediumId'+mediumtranslation.media_id+''] = (mediumtranslation);
                console.warn($scope.this_form_media_field);

                //container : '.modal-dialog.modal-lg .modal-body:first()',

                $.niftyNoty({
                    type: 'success basic',//succes
                    icon : 'fa fa-check fa-2x',
                    container: 'floating',
                    //title: 'Gekoppeld',
                    message: '<h4 class="alert-success">Gekoppeld</h4><p class="alert-message">Het bestand <br><strong>'+mediumtranslation.name+'</strong><br> is gekoppeld aan <strong>'+$scope.this_form_media_field.fieldName+'</strong></p>',
                    //closeBtn: true,
                    timer: 5000
                    //,
                    //onShow:function(){
                    //	alert("onShow Callback");
                    //}
                });


            }
            else{
                $.niftyNoty({
                    type: 'warning basic',//succes
                    icon : 'fa fa-exclamation-triangle fa-2x',
                    container: 'floating',
                    //title: 'Is al gekoppeld',
                    message : '<h4 class="alert-warning">Is al gekoppeld</h4><p class="alert-message">Het bestand <br><strong>'+mediumtranslation.name+'</strong><br> is al gekoppeld aan <strong>'+$scope.this_form_media_field.fieldName+'</strong></p>',
                    //closeBtn: true,
                    timer: 5000
                    //,
                    //onShow:function(){
                    //	alert("onShow Callback");
                    //}
                });
                console.info('is al gekoppeld hoor!');
            }
            //console.info('after:');
            //console.warn($scope.form_media_field.values[$scope.this_form_media_field.id]);
        };



    });




// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.


})(angular);





//MODAL INSTANCE
(function (angular) {
    'use strict';

    var module = angular.module('ng.wi.cms').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,$http,SharedData) {
        //console.info($uibModalInstance);
        $scope.sharedData = SharedData.data;
        $scope.ok = function () {
            $uibModalInstance.op;
            $uibModalInstance.close($scope.selected = 'sadfasdfsaHIERDUS');
        };

        $scope.cancel = function () {
            //console.info($scope.searchNameValue);
            $uibModalInstance.dismiss('cancel');
        };
    });

})(angular);



