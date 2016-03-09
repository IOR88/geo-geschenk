'use strict';
angular
    .module('geoGeschenk')
    .factory('geoGeschenkUploadFactory', ['Upload','$http',function(Upload, $http){

        function uploadFile(file) {
            return Upload.upload({
                url: 'upload',
                data: {file: file}
            })
        }

        function getDemo() {
                    var req = {
                         method: 'POST',
                         url: 'demo',
                         headers: {
                           'Content-Type': 'application/json'
                         },
                         data: {}
                    };
            return $http(req)
        }

        return {
            uploadFile: uploadFile,
            getDemo: getDemo
        }
    }])
    .factory('geoGeschenkMongoExtenstionsFactory', [function(){

        function mongo_regex(item){
            item.search = {$regex:'^'+item.search+'.*'};
            item.options = 0;
            return item;
        }

        return {
            extension0: mongo_regex
        }
    }])
    .factory('geoGeschenkMongoFactory', ['$http','geoGeschenkMongoExtenstionsFactory',function($http, ExtFactory){

        var req = {
             method: 'POST',
             url: 'search',
             headers: {
               'Content-Type': 'application/json'
             },
             data: { query: null }
        };



        function search(data, options){
            var query_data = angular.copy(data);
            req.data.query = extend_query_options(type(clean(query_data)), options);
            return $http(req)
        }

        function clean(query){
            return query.filter(function(item){
                if(item.search){
                   return item.search.length > 0
                }
            })
        }

        function type(query){
            return query.map(function(item){
                var t = parseInt(item.search, 10);
                if(!isNaN(t)){
                   item.search = parseInt(item.search, 10);
                }
                return item;
            })
        }

        function extend_query_options(query, options){
            var results = angular.copy(query);
            options.map(function(op){
                if(op.active){
                   results = query.map(function(item){
                       return ExtFactory['extension'+op.id](item)
                   })

                }

            });


            return results;
        }

        return {

            search: search

        }

    }]);