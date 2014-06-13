/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.controller(
    'articleaddcontroller',
    function ($scope,$location,  routerFactory, compileFactory, $routeParams){

        /***
         * Add class to current menu
         * @type {String}
         */
        $scope.currentMenu = "articles";

        /**
         * Set to null
         * @type {Object}
         */
        $scope.edit = {};

        /**
         * myObj
         * @type {Object}
         */
        $scope.myObj = {
            'Title' : 'Title',
            'Short description' : 'Short description',
            'Description' : 'Description',
            'Submit' : 'Submit',
            'Image' : 'Image',
            'Choose file' : 'Choose file',
            'Select category' : 'Select category',
            'Select' : 'Select'
        }

        /**
         * Categories
         * @type {null}
         */
        $scope.categories = null;

        /**
         * Routeparam EDIT
         */
        if( angular.isDefined($routeParams.id) && $routeParams.id !== null ){
            $scope.edit._id = $routeParams.id;

            /**
             * Get one category
             */
            routerFactory.http({
                method: 'GET',
                url:  routerFactory.serverAdminUrl("articles/one"),
                params: ({id : $routeParams.id})
            }, function(res){

                if( angular.isDefined( res.error ) && res.error === false ){
                    $scope.edit = res.data;
                }else{
                    $scope.title = "Ups something is wrong :)";
                    $scope.close_button_title = "Close";
                    $scope.errors = [];
                    $scope.close = function(){
                        angular.element(document.querySelector("#overlay_wrapper")).removeClass("show");
                    }
                    compileFactory.compileErrorOverly( $scope );
                }

            });

            /**
             * Watch
             */
            $scope.$watch("edit", function(n){
                angular.forEach($scope.categories,function(val){
                    if(n &&  n.category && val._id === parseInt(n.category)){
                        val.selected = "selected";
                    }else{
                        val.selected = null;
                    }

                });
                $scope.$watch("categories", function(cn){
                    angular.forEach(cn,function(cnv){
                        if(n && n.category && cnv._id === parseInt(n.category)){
                            cnv.selected = "selected";
                        }else{
                            cnv.selected = null;
                        }
                    });
                });
            });


        }
    /*
    * Tinymce wysiwyg editor
     */
        tinymce.init({
            selector: "textarea",
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste moxiemanager"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
        });
        /**
         * Errors
         */
        if( angular.isDefined($routeParams.errors) ){
            var parsed = JSON.parse($routeParams.errors);
            $scope.title = "Ups something is wrong :)";
            $scope.close_button_title = "Close";
            $scope.errors = parsed.translations;
            $scope.close = function(){
                angular.element(document.querySelector("#overlay_wrapper")).removeClass("show");
            }

            compileFactory.compileErrorOverly( $scope );
        }

        /**
         * List categories
         */
        routerFactory.http({
            method: 'GET',
            url:  routerFactory.serverAdminUrl("categories/list")
        }, function(res){
            $scope.categories = res.data;
        });
        /**
         * Action url
         * @type {String}
         */
        $scope.action_url = routerFactory.serverAdminUrl("articles/save");
        /**
         * Redirect after save
         * @type {String}
         */
        $scope.redirect = routerFactory.absAdminUrl("articles");


    }
);

