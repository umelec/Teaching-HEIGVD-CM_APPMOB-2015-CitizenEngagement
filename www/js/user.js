angular.module('citizen-engagement.user', [ 'citizen-engagement.constants'])

.controller('RegisterCtrl', function($http, $scope, apiUrl, $ionicPopup){

  $scope.user={roles:["citizen"]};

	$scope.createUser=function(){
     $http({
        method: 'POST',
        url: apiUrl + '/users',
        data: $scope.user
     }).success(function(){
        data: $scope.user

        $scope.showAlert = function() {
           var alertPopup = $ionicPopup.alert({
             title: 'Utilisateur créé'
           });
           alertPopup.then(function(res) {
             console.log('should redirect to login');
           });
         };

     }).error(function(err){
        console.error('ERR', err);
     });
   };
});
