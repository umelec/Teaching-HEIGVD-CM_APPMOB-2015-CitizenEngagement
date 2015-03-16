angular.module('citizen-engagement.issue', ['citizen-engagement.constants'])

.controller('IssueListCrtl', function(IssueService, $scope){

	IssueService.getIssue().then(function(data) {
		console.log("Issues" , data.data[1].lat);
		$scope.issues = data.data;
	});


})



.factory("IssueService", function($http, apiUrl) {
	return {
		getIssue: function() {
			return $http.get(apiUrl + '/issues').then(function(response){
				issues = response;
				return issues;
			});
		}
	}
})



/*

.factory("IssueService", function($http, apiUrl) {
	  var issueService = {
    getIssue: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(apiUrl + '/issues').then(function (response) {
        // The then function here is an opportunity to modify the response
        // The return value gets picked up by the then in the controller.
        return response;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return issueService;
});

*/