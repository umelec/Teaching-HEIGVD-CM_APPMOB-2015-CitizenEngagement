angular.module('citizen-engagement.issue', ['citizen-engagement.constants', 'citizen-engagement.geoLocation'])


.controller('IssueListCrtl', function(IssueService, $scope){
  IssueService.getIssues().then(function(resp) {
   // console.log('Success', resp.data);
   $scope.issues = resp.data;
 }, function(err) {
   console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('IssueCrtl', function(IssueService, $scope){
  Speaker.getIssue($stateParams.issueId).success(function(issue) {
    $scope.issue = issue;
  });
})

.factory("IssueService", function($http, apiUrl) {
	return {
		getIssues: function() {
			return $http.get(apiUrl + '/issues');
    },
    getIssue: function(id){
      return $http.get(apiUrl + '/issues/' + id);
    }
  }
})


.filter("upcase", function() {
  return function(input) {
    return input.toUpperCase();
  };
})

.directive('actualSrc', function () {
  return{
    link: function postLink(scope, element, attrs) {
      attrs.$observe('actualSrc', function(newVal, oldVal){
       if(newVal != undefined){
         var img = new Image();
         img.src = attrs.actualSrc;
         angular.element(img).bind('load', function () {
           element.attr("src", attrs.actualSrc);
         });
       }
     });
    }
  }
})



//Issuecraetion controller
.controller('IssueTypeListCrtl', function($http, $scope, apiUrl){
  $scope.issue={};
  var req = {
   method: 'GET',
   url: apiUrl + '/issueTypes'
 };

 $http(req).success(function(data){
  $scope.issueTypes = data;
  $scope.issue.issueTypeId= data[0].id;
}).error(function(err){
  console.error('ERR', err);
});

})


.controller('NewIssueCtrl', function($http, $scope, apiUrl, GeoLocationService){
	$scope.createIssue=function(){
		console.log('foo');
   $http({
    method: 'POST',
    url: apiUrl + '/issues',
    data: { issues: 'issues' },
  }).success(function(){
    data: $scope.issue
  }).error(function(err){
    console.error('ERR', err);
  });
};

$scope.yummy = function() {

   var yummy = GeoLocationService.setGeolocation();
   console.log("Yummy",yummy);
};
})

.controller('IssueShowCrtl', function($http, $scope, apiUrl, $stateParams){

  var req = {
   method: 'GET',
	 //url: "/issueDetails/:issueId"
	 url: apiUrl + '/issues/'+$stateParams.id
  };

  var getIssue = function() {
    // Warning to update
    $http(req).success(function(data){
      $scope.issue = data;
      // $scope.issue.issueTypeId= data[0].id;
    }).error(function(err){
      console.log(err);
    });
  };

  getIssue();



 $scope.action={type:["comment"]};

 // warning to update !
 $scope.addComment=function(issueId){
   console.log('post comment debug');
   console.log(issueId);
   $http({
     method: 'POST',
     url: apiUrl + '/issues/'+$stateParams.id+'/actions',

     data: $scope.action
   }).success(function(){
     getIssue();
   }).error(function(err){
     console.error('ERR', err);
   });
 };




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
