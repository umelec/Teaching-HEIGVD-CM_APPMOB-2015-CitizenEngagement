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

.factory('GeoLocationService', function (geolocation, $q) {
    return {
        getGeolocation: function (options) {
                geolocation.getLocation().then(function(data) {
                  console.log('it s me');
                    var lat = data.coords.latitude;
                    var lng = data.coords.longitude;
                    var _position = {
                        lat : lat,
                        lng : lng
                    }
                    return _position;
                 })
          }
      }
});
