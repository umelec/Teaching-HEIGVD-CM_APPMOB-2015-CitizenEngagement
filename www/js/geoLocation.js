
angular.module('citizen-engagement.geoLocation', ['angular-storage'])


.factory('geoLocation', function (store) {
    return {
        setGeolocation: function (latitude, longitude) {
                
                geolocation.getLocation().then(function(data) {
                    var lat = data.coords.latitude;
                    var lng = data.coords.longitude;

                    var _position = {
                        lat : lat,
                        lng : lng
                    }
            //store.setObject('geoLocation', _position)
        }
    }
})


