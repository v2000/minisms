ngModule.controller(
    'categoriesaddcontroller',
    function ($scope,  routerFactory, compileFactory, $routeParams, $location){


        /***
         * Submenu
         * @type {Array}
         */
        $scope.submenu  = [
            {
                url : routerFactory.adminUrl('categories'),
                title : 'Categories',
                current : false
            }
        ];

        $scope.edit = {};

        /**
         * myObj
         * @type {Object}
         */

        $scope.currentMenu = "categories";

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
            'Select category' : 'Select category'
        }

        /**
         * Categories
         * @type {null}
         */
        $scope.categories = [];


        /**
         * Categories
         */
        routerFactory.http({
            method: 'GET',
            url:  routerFactory.serverAdminUrl("categories/list")
        }, function(res){
            $scope.categories = res.data;
        });


        /**
         * Routeparam EDIT
         */
        if( angular.isDefined($routeParams.id) && $routeParams.id !== null ){
            $scope.edit._id = $routeParams.id;

            /**
             * It cannot be subcategory of itself
             */
            $scope.$watch("categories", function(cn){
                angular.forEach(cn,function(val, index){
                    if( val._id === $routeParams.id ){
                        $scope.categories.splice(index,1);
                    }
                });
            });


            /**
             * Get one category
             */
            routerFactory.http({
                method: 'GET',
                url:  routerFactory.serverAdminUrl("categories/one"),
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
             * On edit select selected id
             */
            $scope.$watch("edit", function(n){
                angular.forEach($scope.categories,function(val){
                    if(val._id === Number(n.parent_category)){
                        val.selected = "selected";
                    }else{
                        val.selected = null;
                    }

                });
                $scope.$watch("categories", function(cn){
                    angular.forEach(cn,function(cnv){
                        if(cnv._id === Number(n.parent_category)){
                            cnv.selected = "selected";
                        }else{
                            cnv.selected = null;
                        }
                    });
                });
            });
        }






        /**
         * Save category
         */
        $scope.save = function(){
            var form = document.getElementById("add_category"),
                title = form.querySelector('input[name="title"]'),
                short_description = form.querySelector('textarea[name="short_description"]'),
                tags = form.querySelector('textarea[name="tags"]'),
                parent_category = form.querySelector('[name="parent_category"]'),
                id = form.querySelector('input[name="id"]');

            var selected = parent_category.value;

            if( selected === "Select" || selected === ""){
                selected = null;
            }


            /**
             * Router
             */
            routerFactory.http({
                url:  routerFactory.serverAdminUrl("categories/save"),
                data: ({title : title.value, short_description : short_description.value, tags: tags.value, parent_category: selected, id: id.value })
            }, function(res) {

                if( angular.isDefined( res.error ) && res.error === false ){
                    $location.url(routerFactory.adminUrl('categories'));
                }else{
                    $scope.title = "Ups something is wrong :)";
                    $scope.close_button_title = "Close";
                    $scope.errors = res.translations;
                    $scope.close = function(){
                        angular.element(document.querySelector("#overlay_wrapper")).removeClass("show");
                    }
                    compileFactory.compileErrorOverly( $scope );
                }

            });

        }

    }
);