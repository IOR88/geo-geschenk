'use strict';
angular
    .module('geoGeschenk')
    .controller('geoGeschenkController',
    ['$scope',
     'geoGeschenkUploadFactory',
    function(
     $scope,
     geoGeschenkUploadFactory){

        var ctrl = this;

        ctrl.file = {};

        function uploadFile(file){
            geoGeschenkUploadFactory.uploadFile(file)
        .then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
        }

        ctrl.uploadFile = uploadFile;


    }]);