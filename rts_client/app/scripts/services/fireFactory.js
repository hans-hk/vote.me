'use strict';

angular.module('rtsClientApp')
.factory('fireFactory', function () {
    // Service logic
    var currentUser = null;
    var chatRef = new Firebase('https://voteme.firebaseio.com');
    var authClient = new FirebaseSimpleLogin(chatRef, function(error, user) {
      console.log(error + " " + user);
      if (error) {
        // an error occurred while attempting login
        console.log(error);
        currentUser = null;
      } else if (user) {
        // user authenticated with Firebase
        console.log('Login User ID: ' + user.id + ', Provider: ' + user.provider);
        currentUser = user;
        // scope.$apply();
      } else {
        // user is logged out
        currentUser = null;

      }
    });

    function getCurrentUser() {
      console.log('currentUser '+currentUser);
      return currentUser;
    }

    function getAuthClient() {
      return authClient;
    }


    

    // Public API here
    return {
      authClient: getAuthClient,
      currentUser: getCurrentUser,
      firebaseRef: function(path) {
        var baseUrl = 'https://voteme.firebaseio.com';
        path = (path !== '') ?  baseUrl + '/' + path : baseUrl;
        return new Firebase(path);
      }
    };
  });
