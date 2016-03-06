'use strict';

angular
    .module('geoGeschenk')
    .directive('geoGeschenkMap', [function(){

        return {
            restrict:'E',
            transclude: true,
            template:'<ng-transclude></ng-transclude>',
            scope:{geojson:'='},
            link: function(scope, element, attr){

                var map, FeatureLayer;

                var BaseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        maxZoom: 18
                });

                map = L.map('map', {
                        center: [11.993777,8.610238],
                        zoom: 8,
                        layers:[BaseMap]
                });


                scope.$watch('geojson', function(nGeo, oGeo){

                    console.log([nGeo, oGeo]);
                    if(nGeo !== oGeo){
                        if(!angular.isUndefined(FeatureLayer)){
                            FeatureLayer.clearLayers();
                            FeatureLayer.addData(nGeo);
                        } else {
                            FeatureLayer = L.geoJson(nGeo);
                            map.addLayer(FeatureLayer);
                        }
                    }
                },true);

            }
        }
    }]);
