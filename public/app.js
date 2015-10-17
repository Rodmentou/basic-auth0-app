// app.js
var app = angular.module('basic-auth0', ['auth0', 'angular-storage', 'angular-jwt'])
.config(function (authProvider) {
  authProvider.init({
    domain: 'rodmentou.auth0.com',
    clientID: 'kaW247PPvX8pfitQZWgTlSSFKNTJjmNL'
  });
})
.run(function(auth) {
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
      $location.path('/');
      console.log(profile);
    }, function () {
      // Error callback
    });
  }
}]);