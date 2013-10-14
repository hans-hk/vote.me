'use strict';

angular.module('rtsClientApp', ['ngResource', 'ui.router', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // default route
    $urlRouterProvider.otherwise("/");

    // welcome/join route
    $stateProvider
      .state('default', {
        templateUrl: '/views/layout/default.html',
        controller: 'DefaultCtrl',
        abstract: true,
        onEnter: function() {
          setBodyClass("default-layout");
        }
      })
        .state('default.main', {
          url: '/',
          templateUrl: '/views/main.html',
          controller: 'MainCtrl'
        })      
        .state('default.login', {
          url: '/login',
          templateUrl: '/views/login.html',
          controller: 'LoginCtrl'
        })
        .state('default.join', {
          url: '/join',
          templateUrl: '/views/join.html',
          controller: 'JoinCtrl'
        });

    // main app route
    $stateProvider
      .state('app', {
        templateUrl: '/views/layout/app.html',
        controller: 'DefaultCtrl',
        abstract: true,
        onEnter: function() {
          setBodyClass("default-layout");
        }
      })
        .state('app.survey', {
          url: '/app',
          templateUrl: '/views/app/survey.html',
          controller: 'AppSurveyCtrl',
          abstract: true          
        })    
          .state('app.survey.new', {
            url: '/new',
            templateUrl: '/views/app/survey/new.html',
            controller: 'AppNewSurveyCtrl'
          })
          .state('app.survey.paper', {
            url: '/:survey_id',
            templateUrl: '/views/app/survey/paper.html',
            controller: 'AppSurveyPaperCtrl'
          })          
        .state('app.setting', {
          url: '/app/setting',
          templateUrl: '/views/app/setting.html',
          controller: 'AppSurveySettinghCtrl'
        });

        
    $locationProvider.html5Mode(true).hashPrefix('!');

    // layout마다 {name}-layout class를 body에 넣어줌
    function setBodyClass(className) {
      var body = $("body");
      var classes = body.attr("class").split(" ");
      angular.forEach(classes, function(value){
        if(value.indexOf("-layout") > 0) {
          body.removeClass(value);
        }
      });
      body.addClass(className);
    }
  });
