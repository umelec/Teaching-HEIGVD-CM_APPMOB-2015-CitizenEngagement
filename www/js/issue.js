angular.module('citizen-engagement.issue', ['citizen-engagement.constants', 'citizen-engagement.geoLocation','citizen-engagement.camera'])

.controller('IssueListCrtl', function(IssueService, $scope){



  $scope.items = [1,2,3];
  var p = 0;
  IssueService.getIssues(p).then(function(resp) {
   // console.log('Success', resp.data);
   console.log(resp.data);
   $scope.issues = resp.data;

 }, function(err) {
   console.error('ERR', err);
    // err.status will contain the status code.
  })

  $scope.doRefresh = function() {
    var issueList = IssueService.getIssues($scope.page);
    issueList.success(function(issues) {
      $scope.$broadcast('scroll.refreshComplete');
      if (issues.length == 0) {
        $scope.noMoreItemsAvailable = true;
        $scope.issues = false;
      } else {
        if (issues.length < 10) {
          $scope.noMoreItemsAvailable = true;
        }
        $scope.issues = issues;
        $scope.page++;
      }
    });
  };

 
//Réinitialiser les recherches
  $scope.clearSearch = function () {
        $scope.searchText = '';
        $scope.dOrd = '';
        $scope.nOrd = '';
        $scope.predicate = null;
    }

  $scope.nameOrd = function() {
    console.log('hey');

    $scope.dOrd = '';

    if ($scope.reverse) {
      $scope.nOrd = 'ion-ios-arrow-thin-down'
    } else {
      $scope.nOrd = 'ion-ios-arrow-thin-up'
    }
  };


  $scope.dateOrd = function() {
    console.log('3');

    $scope.nOrd = '';

    if ($scope.reverse) {
      $scope.dOrd = 'ion-ios-arrow-thin-down'
    } else {
      $scope.dOrd = 'ion-ios-arrow-thin-up'
    }
  };

})






.controller('IssueCrtl', function(IssueService, $scope){
  Speaker.getIssue($stateParams.issueId).success(function(issue) {
    $scope.issue = issue;
  });

})

.factory("IssueService", function($http, apiUrl) {

	return {
		getIssues: function(p) {
      return $http({
        method: 'GET',
        url: apiUrl + '/issues',
        headers: {
          'x-pagination': p + ';1000'
        }
      })
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
          })
        }
      })
    }
  }
})


//Issuecraetion controller
.controller('IssueTypeListCrtl', function($http, $scope, apiUrl, $ionicPopup){
  // supprimé sur les conseils de simon 
  // $scope.issue={};
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

.controller('NewIssueCtrl', function($http, $scope, apiUrl, geolocation, $ionicLoading, $ionicPopup, $state){

    // The $ionicView.beforeEnter event happens every time the screen is displayed.
    $scope.$on('$ionicView.beforeEnter', function() {
      // Re-initialize the user object every time the screen is displayed.
      // The first name and last name will be automatically filled from the form thanks to AngularJS's two-way binding.
      $scope.issue = {};
    });

    $scope.createIssue=function(){
      $http({
        method: 'POST',
        url: apiUrl + '/issues',
        data: $scope.issue
      }).success(function(){
        data: $scope.issue
        
        var alertPopup = $ionicPopup.alert({
          title: 'Incident créé'
        });
        alertPopup.then(function(res) {

        });

      }).error(function(err){

        var alertPopup = $ionicPopup.alert({
          title: 'Oups un problème est intervenu'
        });
        alertPopup.then(function(res) {
        });
        console.error('ERR', err);
      });
    };


    $scope.getPosition = function() {
      $ionicLoading.show({
        template: '<ion-spinner  class="spinner-light" icon="ripple"></ion-spinner>',
        delay: 750
      });
      geolocation.getLocation().then(function(data) {
       $ionicLoading.hide();
         //console.error ('lat', data.coords.latitude);

         //var lat = data.coords.latitude;
         //var lng = data.coords.longitude;
         var _position = {
           lat : data.coords.latitude,
           lng : data.coords.longitude
         }
         $scope.position = _position;
         //console.error ('debug', _position.lat );
         $scope.issue.lat = data.coords.latitude;
         $scope.issue.lng = data.coords.longitude

       },function(err){
        $ionicLoading.hide();
        console.error('ERR', err);
      });
    }

    geolocation.getLocation().then(function(data) {
      $ionicLoading.hide();

      var lat = data.coords.latitude;
      var lng = data.coords.longitude;
      var _position = {
        lat : lat,
        lng : lng
      }
      $scope.position = _position;
      $scope.issue.lat = lat;
      $scope.issue.lng = lng;

    },function(err){

     $ionicLoading.hide();
     console.error('ERR', err);
   });

    $scope.getPhoto = function() {
      CameraService.getPicture();
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
   $http({
     method: 'POST',
     url: apiUrl + '/issues/'+$stateParams.id+'/actions',
     data: $scope.action
   }).success(function(){
     getIssue();
    $scope.action.payload.text = " ";
   

   }).error(function(err){
     console.error('ERR', err);
   });
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
