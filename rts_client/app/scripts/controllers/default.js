
 /* 
 * default controller
 *
 * 기본 화면(welcome/login/join)의 최상위 컨트롤러
 *
 * History
 * v1.0 - 최초 작성, subicura(2013/10/06)
 */
 'use strict';

 angular.module('rtsClientApp')
 .controller('DefaultCtrl', function ($scope, $state, $location, angularFireAuth) {
    var ref = new Firebase("https://voteme.firebaseio.com/");
    angularFireAuth.initialize(ref, {scope: $scope, name: "user"});

    $scope.login = function() {
        angularFireAuth.login("facebook");
    };
    $scope.logout = function() {
        angularFireAuth.logout();
    };

    $scope.$on("angularFireAuth:login", function(evt, user) {
      // User logged in.
      // console.log('user '+JSON.stringify(user));
    });
    $scope.$on("angularFireAuth:logout", function(evt) {
      // User logged out.
        $location.path("/");      
    });
    $scope.$on("angularFireAuth:error", function(evt, err) {
      // There was an error during authentication.
    });

    // var currentUser = null;
    // var chatRef = new Firebase('https://voteme.firebaseio.com');
    // var authClient = new FirebaseSimpleLogin(chatRef, function(error, user) {
    //     console.log('authClient ' + error + " " + user);
    //     if (error) {
    //         // an error occurred while attempting login
    //         console.log(error);
    //         $scope.currentUser = null;

    //     } else if (user) {
    //         // user authenticated with Firebase
    //         console.log('Login User ID: ' + user.id + ', Provider: ' + user.provider + ', JSON: \n ' + JSON.stringify(user));

    //     } else {
    //         // user is logged out
    //         $scope.currentUser = null;

    //     }
    //     $scope.$apply(function () {
    //         $scope.currentUser = user;
    //     });      
    // });

    // // $scope.currentUser = authClient.currentUser();

    $scope.newSurvey = function() {
        $state.go('app.survey.new');
    }   

    // $scope.logIn = function() {
    //     // var authClient = fireFactory.authClient();
    //     authClient.login('facebook');
    // }

    // $scope.logOut = function() {
    //     // var authClient = fireFactory.authClient();
    //     authClient.logout();
    // }
});
