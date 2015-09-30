var url = 'http://www.erickwellem.com/demo/approsys/'
angular.module('starter', ['ionic', 'starter.controllers', 'services', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'dashboardCtrl'
        }
      }
    })

    .state('app.signin', {
      url: '/signin',
      views: {
        'menuContent': {
          templateUrl: 'templates/signin.html',
          controller: 'signInCtrl'
        }
      }
    })

    .state('app.approvals',{
      url: '/approvals',
      views: {
        'menuContent': {
          templateUrl: 'templates/approvals.html',
          controller: 'approvalsCtrl'
        }
      }
    })

    .state('app.profile',{
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })

    .state('app.history',{
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'historyCtrl'
        }
      }
    })

    .state('app.setting',{
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html',
          controller: 'settingCtrl'
        }
      }
    })

    .state('app.approval', {
      url: '/approvals/:approvalId',
      views: {
        'menuContent': {
          templateUrl: 'templates/approval.html',
          controller: 'approvalCtrl'
        }
      }
  });
  $urlRouterProvider.otherwise('/app');
});