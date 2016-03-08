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

        $scope.file = {};
        $scope.progress = false;
        $scope.geojson_ready = false;

        $scope.options = [{
            id: 0,
            name: 'regex search',
            value: false
        }];

        function uploadFile(file){
            $scope.progress = true;
            geoGeschenkUploadFactory.uploadFile(file)
                .then(function (res) {
                   $scope.progress = false;
                    $scope.geojson_keys = angular.copy(res.data.data);

                   $scope.geojson_ready = true;

                }, function (error) {
                   $scope.progress = false;

                }, function (evt) {
                   //ctrl.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
        }

        function check(item){
            item.active = !item.active;
            if(!item.active){item.search = ''}
        }


        function search(){
            geoGeschenkMongoFactory
                .search($scope.geojson_keys, $scope.options)
                .then(function(data){
                    $scope.geojson_map = {type:'FeatureCollection', features: data.data.data}

                }, function(error){

                })
        }


        $scope.$watch('geojson_keys', function(newV, oldV){

                    if(newV !== oldV){
                       search();
                    }
        },true);

        $scope.uploadFile = uploadFile;
        $scope.check = check;


    }]);