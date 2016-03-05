'use strict';
angular
    .module('geoGeschenk')
    .controller('geoGeschenkController',
    ['$scope',
     'geoGeschenkUploadFactory',
     'geoGeschenkMongoFactory',
    function(
     $scope,
     geoGeschenkUploadFactory,
     geoGeschenkMongoFactory){

        var ctrl = this;

        ctrl.file = {};
        ctrl.progress = false;
        ctrl.geojson_ready = false;
        ctrl.geojson_keys = [];

        function uploadFile(file){
            ctrl.progress = true;
            geoGeschenkUploadFactory.uploadFile(file)
                .then(function (res) {
                   ctrl.progress = false;
                   ctrl.geojson_keys = angular.copy(res.data.data);

                   ctrl.geojson_ready = true;

                }, function (error) {
                   ctrl.progress = false;

                }, function (evt) {
                   //ctrl.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
        }

        function check(item){
            item.active = !item.active;
        }


        function search(){
            geoGeschenkMongoFactory
                .search(ctrl.geojson_keys)
                .then(function(data){

                }, function(error){

                })
        }


        $scope.$watch('ctrl.geojson_keys', function(newV, oldV){

                    if(newV !== oldV){
                       search();
                    }
        },true);

        ctrl.uploadFile = uploadFile;
        ctrl.check = check;


    }]);