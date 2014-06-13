/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.controller(
    'errorcontroller',
    function ErrorCtrl($scope){
        $scope.translations = {
            'Error: 404' : 'Error: 404',
            'Something went terribly wrong, but most likely it is not your fault.' : 'Something went terribly wrong, but most likely it is not your fault.',
            'Open the home page and try to find the information of interest.' : 'Open the home page and try to find the information of interest.',
            'Press the back button in your browser and then click another link.' : 'Press the back button in your broswer and then click another link.',
            'Admin' : 'Admin'
        }
    }
);