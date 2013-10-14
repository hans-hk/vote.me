/* 
 * welcome controller
 *
 * welcome(첫화면) 컨트롤러
 *
 * History
 * v1.0 - 최초 작성, subicura(2013/10/06)
 */
 'use strict';

 angular.module('rtsClientApp')
 .controller('LoginCtrl', function ($scope, $state, $location, angularFire) {

  var chatRef = new Firebase('https://voteme.firebaseio.com');
  var authClient = new FirebaseSimpleLogin(chatRef, function(error, user) {
    console.log("Login " + error + " " + user);
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      // user authenticated with Firebase
      console.log('Login User ID: ' + user.id + ', Provider: ' + user.provider);
    } else {
      // user is logged out
    }
  });

  $scope.login = function() {
    var email = $scope.email;
    var password = $scope.password;

    authClient.login('password', {
      email: email,
      password: password
    });
  }

 });
