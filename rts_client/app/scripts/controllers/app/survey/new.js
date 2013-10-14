 'use strict';

 angular.module('rtsClientApp')
 .controller('AppNewSurveyCtrl', function ($scope, $state, $location, angularFire) {

    // var ref = new Firebase('https://voteme.firebaseio.com');
    // angularFire(ref, $scope, 'saveForm');
    // $scope.newItemForm = [{id :1, "done": false}];

    $scope.items = [];

    var ref = new Firebase("https://voteme.firebaseio.com/");
    var firebaseAuth = new FirebaseSimpleLogin(ref, function (error, user) {
        if (!error && user) {
            console.log(user);
            $scope.user = user;
            angularFire(ref, $scope, "items");
        }
    });        

    $scope.currentPage = 0;

    $scope.itemForm = {
        room_title: "방 1", 
        room_maxnumber: 2,
        room_lock: false,
        queries: [{
            query_title: "질문 1",
            query_graph: "none",
            options: [
                {type: "query_allow_add", label:"선택지 추가 허용", value: true},
                {type: "query_multi_select", label:"복수 선택 허용", value: false},
                {type: "query_unnamed_vote", label:"익명 투표 허용", value: false},
                {type: "query_see_result", label:"결과 즉시 보기", value: false}
            ],
            selections: [
                { selection_title: "선택지 1", check: false }
            ]}
        ]
    };

    $scope.addNewPaper = function() {
        $scope.currentPage++;

        $scope.itemForm.queries.push({
            query_title: "질문 " + ($scope.currentPage+1),
            query_graph: "none",
            options: [
                {type: "query_allow_add", label:"선택지 추가 허용", value: true},
                {type: "query_multi_select", label:"복수 선택 허용", value: false},
                {type: "query_unnamed_vote", label:"익명 투표 허용", value: false},
                {type: "query_see_result", label:"결과 즉시 보기", value: false}
            ],
            selections: [
                { selection_title: "선택지 " + ($scope.currentPage+1), check: false }
            ]});
    }

    $scope.removeSelection = function(selection) {
        var index = $scope.itemForm.queries[$scope.currentPage].selections.indexOf(selection)
        $scope.itemForm.queries[$scope.currentPage].selections.splice(index,1);     
    }

    $scope.removePage = function() {
        $scope.itemForm.queries.splice($scope.currentPage,1);     
        $scope.currentPage--;
    }

    $scope.prevPage = function() {
        $scope.currentPage--;
    }

    $scope.nextPage = function() {
        $scope.currentPage++;
    }

    $scope.addQuery = function() {
        $scope.itemForm.queries[$scope.currentPage].selections.push({ selection_title: "", check: false });
    }

    $scope.toggleClicked = function(option) {
        console.log(option);
        option.value = !option.value;
    }

    $scope.submitNewPaper = function() {
        console.log($scope.items + " : " + JSON.stringify($scope.user));

        var id = ref.push().name(); // generate a unique id based on timestamp
        console.log(id);
        $scope.items[id] = {
            items: $scope.itemForm
        };

        $location.path('/');
    }

});

    // $scope.newItemForm = {
    //     room_title: "", 
    //     room_maxnumber: 1,
    //     room_lock: false,
    //     queries: [{
    //         query_title: "가장 호감이가는 여자 연예인은?",
    //         query_allow_add: false,
    //         query_multi_select: false,
    //         query_unnamed_vote: false,
    //         query_see_result: false,
    //         query_graph: "none",
    //         selections: [
    //             { selection_title: "한지민", check: false },
    //             { selection_title: "한효주", check: false },
    //             { selection_title: "김예림", check: false }
    //         ]},{
    //         query_title: "vote.me가 도움이 되나?",
    //         query_allow_add: true,
    //         query_multi_select: false,
    //         query_unnamed_vote: true,
    //         query_see_result: false,
    //         query_graph: "pie",            
    //         selections: [
    //             { selection_title: "네", check: false },
    //             { selection_title: "아니오", check: false },
    //         ]}
    //     ]
    // };