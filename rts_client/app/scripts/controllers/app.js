/* 
 * app controller
 *
 * /app/* 의 최상위 컨트롤러
 *
 * History
 * v1.0 - 최초 작성, subicura(2013/10/06)
 */
 'use strict';

 angular.module('rtsClientApp')
 .controller('AppCtrl', function ($scope, $state, $location, angularFireAuth) {

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

    $scope.newSurvey = function() {
        $state.go('app.survey.new');
    }       
    // $scope.logout = function() {
    //     $location.path("/");
    // }
});
