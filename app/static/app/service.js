'use strict';
angular
    .module('geoGeschenk')
    .factory('geoGeschenkUploadFactory', ['Upload',function(Upload){

        function uploadFile(file) {
            return Upload.upload({
                url: 'upload',
                data: {file: file}
            })
        }

        return {
            uploadFile: uploadFile
        }
    }])
    .factory('geoGeschenkMongoFactory', ['$http',function($http){

        var req = {
             method: 'POST',
             url: 'search',
             headers: {
               'Content-Type': 'application/json'
             },
             data: { query: null }
        };



        function search(data){
            req.data.query = clean(data);
            return $http(req)
        }

        function clean(query){
            return query.filter(function(item){
                if(item.search){
                   return item.search.length > 0
                }
            })

        }

        return {

            search: search

        }

    }]);