// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('citizen-engagement', ['ionic', 'citizen-engagement.auth', 'citizen-engagement.constants', 'citizen-engagement.camera', 'citizen-engagement.map', 'citizen-engagement.issue', 'geolocation'])


.run(function(AuthService, $rootScope, $state) {

  // Listen for the $stateChangeStart event of AngularUI Router.
  // This event indicates that we are transitioning to a new state.
  // We have the possibility to cancel the transition in the callback function.
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    // If the user is not logged in and is trying to access another state than "login"...
    if (!AuthService.currentUserId && toState.name != 'login' && toState.name != 'newUser') {

      // ... then cancel the transition and go to the "login" state instead.
      event.preventDefault();
      $state.go('login');
    }
  });
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // This is the abstract state for the tabs directive.
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // The three next states are for each of the three tabs.
    // The state names start with "tab.", indicating that they are children of the "tab" state.
    .state('tab.newIssue', {
      // The URL (here "/newIssue") is used only internally with Ionic; you never see it displayed anywhere.
      // In an Angular website, it would be the URL you need to go to with your browser to enter this state.
      url: '/newIssue',
      views: {
        // The "tab-newIssue" view corresponds to the <ion-nav-view name="tab-newIssue"> directive used in the tabs.html template.
        'tab-newIssue': {
          // This defines the template that will be inserted into the directive.
          templateUrl: 'templates/newIssue.html'
        }
      }
    })

    .state('tab.issueMap', {
      url: '/issueMap',
      views: {
        'tab-issueMap': {
          templateUrl: 'templates/issueMap.html', controller: 'MapController'
        }
      }
    })

    // à recrer depuis la map
    .state('tab.issueShow', {
      url: '/issueShow/:id',
      views: {
        'tab-issueList': {
          controller: 'IssueShowCrtl',
          templateUrl: 'templates/issue.html'
        }
      }
    })


    .state('tab.issueList', {
      url: '/issueList',
      views: {
        'tab-issueList': {
          templateUrl: 'templates/issueList.html',
          controller: 'IssueListCrtl'
        }
      }
    })


    .state('tap.issueList', {
      url: "/:issueId",
      views: {
        'tab-issueList' :{
          templateUrl: "templates/issue.html",
          controller: "IssueCtrl"
        }
      }
    })


    .state('newUser', {
      url: '/newuser',
      views: {
        'tab-newUser': {
          templateUrl: 'templates/newuser.html'
        }
      }
    })

    .state('register', {
      url: '/register',
      controller:'LoginCtrl',
      templateUrl: 'templates/newUser.html'
    })

    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
    });

  // Define the default state (i.e. the first screen displayed when the app opens).
  $urlRouterProvider.otherwise(function($injector) {
    $injector.get('$state').go('tab.issueList'); // Go to the new issue tab by default.
  })
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

.controller('IssueShowCrtl', function($http, $scope, apiUrl, $stateParams){
  var req = {
   method: 'GET',
   url: apiUrl + '/issues/'+$stateParams.id
 };

 // Warning to update
 $http(req).success(function(data){
   $scope.issues = data;
   // $scope.issue.issueTypeId= data[0].id;
 }).error(function(err){
   console.error('ERR', err);
 });

 // warning to update !
 $scope.addComment=function(){
     $http({
       method: 'POST',
       url: apiUrl + '/issue/'+issue.id+'/actions',
       headers: {
         'Content-Type': application/json
       },
       data: { comments: 'comments' },
     }).success(function(){
         data: $scope.issue
       }).error(function(err){
         console.error('ERR', err);
       });
     };

})
