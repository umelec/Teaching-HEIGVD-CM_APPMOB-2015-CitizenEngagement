

angular.module('citizen-engagement.geoLocation', ['angular-storage'])


.controller("geoLocationCtrl", function($scope, GeoLocationService, geolocation ) {

 
  GeoLocationService.setGeolocation().then(function(resp) {
   // console.log('Success', resp.data);
    $scope.issues = resp.data;
    console.log('RspGeo' , $scope.issues);
  }, function(err) {
   console.error('ERR', err);
    // err.status will contain the status code
  })

})

.factory('GeoLocationService', function (geolocation) {

   
    return {
        setGeolocation: function (latitude, longitude) {

                geolocation.getLocation().then(function(data) {
                    var lat = data.coords.latitude;
                    var lng = data.coords.longitude;

                    var _position = {
                        lat : lat,
                        lng : lng
                    }
                    console.log('seGeoPosition' , _position);
                    return _position;
                 })
               
                }
            }
});
