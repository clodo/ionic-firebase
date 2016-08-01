angular.module('starter.services', ['firebase', 'uuid'])

.factory('Chats', function($http, ENV, $firebaseArray, $firebaseObject) {
  return {
    all: function() {
      var itemsRef = new Firebase(ENV.baseurl + 'users');
      return $firebaseArray(itemsRef);
    },

    get: function(chatId) {
      var itemsRef = new Firebase(ENV.baseurl + 'users/' + chatId);
      return $firebaseObject(itemsRef);
    }
  };
})

.factory('Users', function(rfc4122, $q) {
  return {
    loginUser: function() {
      var user = Ionic.User.current();

      if (!user.isAuthenticated()) {
        var authProvider = 'basic';
        var authSettings = { 'remember': true };

        var uuid = rfc4122.v4();

        var details = {
           'email': uuid+'@ionic-push.com',
           'password': uuid
        }

        var signupSuccess = function(response) {
          Ionic.Auth.login(authProvider, authSettings, details)
        }

        var signupFailure = function(response) {
        }

        Ionic.Auth.signup(details).then(signupSuccess, signupFailure);
      }
    }
  }
})
;
