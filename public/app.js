// app.js
var app = angular.module('basic-auth0', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);



app.config(function (authProvider, $routeProvider) {
	$routeProvider
		.when('/home',
		{
			controller: 'HomeController',
			templateUrl: 'home.html'
		});


  authProvider.init({
    domain: 'rodmentou.auth0.com',
    clientID: 'kaW247PPvX8pfitQZWgTlSSFKNTJjmNL'
  });
});



app.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});

app.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/home');
    }, function () {
      // Error callback
    });  
  };

  if (store.get('profile')){
  	$scope.test = store.get('profile');
  	$http.post('https://rodmentou.auth0.com/oauth/access_token',
  	{
  		client_id: 'kaW247PPvX8pfitQZWgTlSSFKNTJjmNL',
  		access_token: $scope.test.identities[0].access_token,
  		connection: 'google-oauth2',
  		scope: 'openid profile'
  	})
  	.then( 
  		function (res) {
  			console.log(res.data);
  			$location.path('/home');
  		}, function (res) {

  	});

  	$http.get('https://rodmentou.auth0.com/userinfo', 
  		{ Authorization: 'Bearer ' + $scope.test.identities[0].access_token})
  		.then ( function (res) {
  			console.log(res.data);
  		}, function (res) {

  		});
  	
  };

}]);

app.controller('HomeController', ['$scope', 'store', function ($scope, store){
	$scope.profile = store.get('profile');
}]);