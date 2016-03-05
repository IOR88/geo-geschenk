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
    }]);