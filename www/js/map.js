 angular.module('citizen-engagement.map', ['leaflet-directive', 'citizen-engagement.constants', 'citizen-engagement.issue'])

 .controller("MapController", function($scope, mapboxMapId, mapboxAccessToken, IssueService,$log, $scope, geolocation) {

 	var mapboxTileLayer = "http://api.tiles.mapbox.com/v4/" + mapboxMapId;
 	mapboxTileLayer = mapboxTileLayer + "/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken;


 	$scope.mapDefaults = {
 		tileLayer: mapboxTileLayer
 	};

   $scope.mapCenter = {
    lat: 46.7752435,
    lng: 6.638055,
    zoom: 12
  };

  geolocation.getLocation().then(function(data) {
    $scope.mapCenter.lat = data.coords.latitude;
    $scope.mapCenter.lng = data.coords.longitude;

  }, function(error) {
    $log.error("Could not get location: " + error);
  });

  $scope.mapMarkers = [];

  IssueService.getIssues().then(function(data){
    //console.log(data.data);

    angular.forEach(data.data, function (issue) {
      // console.log('resp Issues' , issue)
      $scope.mapMarkers.push({
        lat: issue.lat,
        lng: issue.lng,

        //message: ' <ion-item ng-click="openModal()"  ui-sref="tab.issueShow/\"{{id:issue.id}}\"> '+
        //'<p>\"{{ issue.description }}\"</p><img src=\"{{ issue.imageUrl }}\"  ng-src=\"img/default.jpg\" width=\"100px\" /> </ion>',
        message: "<p>{{ issue.description }}</p><img src=\"{{ issue.imageUrl }}\"  ng-src=\"img/default.jpg\" width=\"100px\"/><button ng-click=\"openModal()\" ui-sref=\"tab.issueShow({id:issue.id})\" class=\"button button-small button-assertive\">en savoir plus</button>",
        getMessageScope: function() {
          var scope = $scope.$new();
          scope.issue = issue;
          return scope;
        }
      })
    });
  });
});
