 /* 
 * join controller
 *
 * 회원가입 컨트롤러
 *
 * History
 * v1.0 - 최초 작성, subicura(2013/10/06)
 */
 'use strict';

 angular.module('rtsClientApp')
 .controller('JoinCtrl', function ($scope, $location, angularFire, fireFactory) {
    // FirebaseAuth callback
    // $scope.authCallback = function(error, user) {
    //     console.log("user " + user);
    //     if (error) {
    //         console.log('error: ', error.code);
    //         /*if (error.code === 'EXPIRED_TOKEN') {
    //             $location.path('/');
    //         }*/
    //     } else if (user) {
    //         console.log('Logged In', $scope);
    //         // Store the auth token
    //         localStorage.setItem('token', user.firebaseAuthToken);
    //         $scope.isLoggedIn = true;

    //         $scope.userId = user.id;

    //         // Set the userRef and add user child refs once
    //         $scope.userRef = fireFactory.firebaseRef('users').child(user.id);
    //         $scope.userRef.once('value', function(data) {
    //             // Set the userRef children if this is first login
    //             var val = data.val();
    //             var info = {
    //                 userId: user.id,
    //                 name: user.name
    //             };
    //             // Use snapshot value if not first login
    //             if (val) {
    //                 info = val;
    //             }
    //             $scope.userRef.set(info); // set user child data once
    //         });

    //         $location.path('/user/' + $scope.userRef.name());
    //     } else {
    //         localStorage.clear();
    //         $scope.isLoggedIn = false;
    //         $location.path('/');
    //     }
    // };

    // var authClient = new FirebaseSimpleLogin(fireFactory.firebaseRef('users'), $scope.authCallback);

    // instatiate the FirebaseSimpleLogin and monitor the user's auth state
    var chatRef = new Firebase('https://voteme.firebaseio.com');
    var authClient = new FirebaseSimpleLogin(chatRef, function(error, user) {
      console.log("Join " + error + " " + user);
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase

        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        $location.path("/");

      } else {
        // user is logged out
      }
    });

    // attempt to log the user in with your preferred authentication provider
    // auth.login('<provider>');
    $scope.createUser = function() {
      var username = $scope.username;
      var email = $scope.email;
      var password = $scope.password;

      authClient.createUser(email, password, function(error, user) {
        user.username = username;
        console.log(user);
        if (!error) {
          console.log('User Id: ' + user.id + ', Email: ' + user.email);
          authClient.login('password', {
            email: email,
            password: password
          });
        } else {
          // console.log(error);
        }
      });        
    }


    // $scope.login = function(provider) {
    //     $scope.token = localStorage.getItem('token');
    //     var options = {
    //         'rememberMe': true
    //     };
    //     provider = 'twitter';

    //     if ($scope.token) {
    //         console.log('login with token', $scope.token);
    //         fireFactory.firebaseRef('users').auth($scope.token, $scope.authCallback);
    //     } else {
    //         console.log('login with authClient');
    //         authClient.login(provider, options);
    //     }
    // };

    // $scope.logout = function() {
    //     localStorage.clear();
    //     authClient.logout();
    //     $location.path('/');
    // };

    // // instatiate the FirebaseSimpleLogin and monitor the user's auth state
    // var chatRef = new Firebase('https://voteme.firebaseio.com/');    
    // var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

    //   if (error) {
    //     // an error occurred while attempting login
    //     alert(error);
    //   } else if (user) {
    //     // user authenticated with Firebase
    //     alert('User ID: ' + user.id + ', Provider: ' + user.provider);
    //   } else {
    //     // user is logged out
    //   }
    // });

    // // attempt to log the user in with your preferred authentication provider
    // auth.login('<provider>');   


  });
