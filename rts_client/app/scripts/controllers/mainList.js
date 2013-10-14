
'use strict';

angular.module('rtsClientApp')
.controller('MainCtrl', function ($scope, angularFire) {
    // $scope.surveys = [];
    // var ref = new Firebase("https://voteme.firebaseio.com");
    // angularFire(ref, $scope, "surveys");

    // $scope.addItem = function() {
    //     $scope.surveys.push({'title': 'first title'});
    //     console.log($scope.surveys);

    // }

    var ref = new Firebase("https://voteme.firebaseio.com/");
    var firebaseAuth = new FirebaseSimpleLogin(ref, function (error, user) {
        if (!error && user) {
            console.log(user);
            $scope.user = user;
            angularFire(ref, $scope, "surveys");
        }
    });    

    
    // $scope.surveys = [
    // {
    //     "id":1,
    //     "title": "첫 번째 방",
    //     "lock": true,
    //     "queryCount": 12,
    //     "state": "대기",
    //     "date": "3 days ago"
    // },
    // {
    //     "id":2,
    //     "title": "두 번째 방",
    //     "lock": false,
    //     "queryCount": 12,
    //     "state": "시작",
    //     "date": "3 days ago"
    // },
    // {
    //     "id":3,
    //     "title": "세 번째 방",
    //     "lock": true,
    //     "queryCount": 10,
    //     "state": "진행중",
    //     "date": "3 days ago"
    // }    
    // ];
});
