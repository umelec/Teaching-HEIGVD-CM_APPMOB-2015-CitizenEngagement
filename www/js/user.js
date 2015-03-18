angular.module('citizen-engagement.user', [ 'citizen-engagement.constants'])

.controller('RegisterCtrl', function($http, $scope, apiUrl){

  $scope.user={roles:["citizen"]};

	$scope.createUser=function(){
     $http({
        method: 'POST',
        url: apiUrl + '/users',
        data: $scope.user
     }).success(function(){
        data: $scope.user
     }).error(function(err){
        console.error('ERR', err);
     });
   };
});
