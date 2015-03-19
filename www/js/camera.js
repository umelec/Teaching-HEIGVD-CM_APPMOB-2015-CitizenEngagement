angular.module('citizen-engagement.camera', ['citizen-engagement.constants'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})


.controller('photoCtrl', function(CameraService, $http, qimgUrl, qimgToken) {

 CameraService.getPicture({
  quality: 75,
  targetWidth: 400,
  targetHeight: 300,
  encodingType: Camera.EncodingType.JPEG,
  // return base64-encoded data instead of a file
  destinationType: Camera.DestinationType.DATA_URL
}).then(function(imageData) {
// upload the image
$http({
  method: "POST",
  url: qimgUrl + "/images",
  headers: {
    Authorization: "Bearer " + qimgToken
  },
  data: {
    data: imageData
  }
}).success(function(data) {
  var imageUrl = data.url;
// do something with imageUrl
});
});

})

.factory('CameraService', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

