 angular.module('citizen-engagement.map', ['leaflet-directive', 'citizen-engagement.constants', 'citizen-engagement.issue'])

 .controller("MapController", function($scope, mapboxMapId, mapboxAccessToken, IssueService,$log, $scope, geolocation) {

 	var mapboxTileLayer = "http://api.tiles.mapbox.com/v4/" + mapboxMapId;
 	mapboxTileLayer = mapboxTileLayer + "/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken;


 	$scope.mapDefaults = {
 		tileLayer: mapboxTileLayer
 	};

 	IssueService.getIssues().then(function(data){
 		//console.log(data.data);

	 	angular.forEach(data.data, function (issue) {
	 		console.log(issue)
	 		$scope.mapMarkers.push({
		 		lat: issue.lat,
		 		lng: issue.lng,
		 		message: "<p>{{ issue.description }}</p><img src=\"{{ issue.imageUrl }}\" width=\"200px\" />",
		 		getMessageScope: function() {
		 			var scope = $scope.$new();
		 			scope.issue = issue;
		 			return scope;
		 		}
		 	})
	 	});

	$scope.mapCenter = {
 		lat: 46.76,
 		lng: 63.62,
 		zoom: 14
 	};

 	geolocation.getLocation().then(function(data) {
 		$scope.mapCenter.lat = data.coords.latitude;
 		$scope.mapCenter.lng = data.coords.longitude;

 	}, function(error) {
 		$log.error("Could not get location: " + error);
 	});

	//$scope.mapMarkers = [];

});
});


 	//IssueService.getIssues().then(function(data){
 		//console.log("MapIssues" , data.data);


 		//angular.forEach(data.data, function (issue) {
	 		////console.log(issue)
	 		//$scope.mapMarkers.push({
	 			//lat: issue.lat,
	 			//lng: issue.lng,
	 			//message: "<p>{{ issue.description }}</p><img src=\"{{ issue.imageUrl }}\" width=\"200px\" />",
	 			//getMessageScope: function() {
	 				//var scope = $scope.$new();
	 				//scope.issue = issue;
	 			//	return scope;
	 			//}
	 		//})
	 	//})
 	//});
//});
