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

                var def_cor = [26.3652805, 45.6416492];

                var BaseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        maxZoom: 18
                });

                map = L.map('map', {
                        center: def_cor,
                        zoom: 4,
                        layers:[BaseMap]
                });


                scope.$watch('geojson', function(nGeo, oGeo){

                    if(nGeo !== oGeo){
                        if(!angular.isUndefined(FeatureLayer)){
                            FeatureLayer.clearLayers();
                            FeatureLayer.addData(nGeo);
                            setCenter(map, nGeo.features);
                        } else {
                            FeatureLayer = L.geoJson(nGeo);
                            map.addLayer(FeatureLayer);
                            setCenter(map, nGeo.features);
                        }
                    }
                },true);

                function setCenter(map, features){
                    if(features[0]) {
                        var cor = features[0].geometry.coordinates;
                        map.setView([cor[1], cor[0]], 8);
                    } else {
                        map.setView([def_cor[1], def_cor[0]], 4);
                    }
                }

            }
        }
    }]);
