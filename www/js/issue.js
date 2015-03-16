angular.module('citizen-engagement.issue', ['citizen-engagement.constants'])

.controller('IssueListCrtl', function(IssueService, $scope){

	IssueService.getIssues().then(function(data) {
		

		$scope.issues = data.data;


	});


})



.factory("IssueService", function($http, apiUrl) {
	var issues = [];
	return {
		getIssues: function() {
			return $http.get(apiUrl + '/issues')

			/*.then(function(response){
				issues = response.data;
				return issues;
			});*/
		},
		getIssue: function(id){
			for(i=0;i<issues.length;i++){
				if(users[i].id == id){
					return issues[i];
				}
			}
			return null;
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