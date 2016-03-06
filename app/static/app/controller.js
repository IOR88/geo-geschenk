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

        ctrl.options = [{
            id: 0,
            name: 'regex search',
            value: false
        }];

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
                .search(ctrl.geojson_keys, ctrl.options)
                .then(function(data){
                    console.log(data.data.data);
                    ctrl.geojson_map = {type:'FeatureCollection', features: data.data.data}

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