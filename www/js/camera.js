angular.module('citizen-engagement.camera', ['citizen-engagement.constants'])

// .config(function($compileProvider){
//   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
// })


.controller("PhotoCtrl", function(CameraService, $http, qimgUrl, qimgToken, $scope) {
// take the picture


$scope.getPhoto = function(){

CameraService.getPicture({
  quality: 75,
  targetWidth: 400,
  targetHeight: 300,
  sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
  encodingType: 0,     // 0=JPG 1=PNG
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
  $scope.lastPhoto =  "https://warm-bastion-3094.herokuapp.com/api" + imageUrl;
});
});


}; 
})//end Controller

.factory("CameraService", function($q) {
  return {
    getPicture: function(options) {
      var deferred = $q.defer();
      navigator.camera.getPicture(function(result) {
// do any magic you need
deferred.resolve(result);
}, function(err) {
  deferred.reject(err);
}, options);
      return deferred.promise;
    }
  }
});



// {
//     quality: 75,
//     targetWidth: 400,
//     targetHeight: 300,
//   // return base64-encoded data instead of a file
//   destinationType: Camera.DestinationType.DATA_URL
// }