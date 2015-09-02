angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, Storage) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.logout = function(){
    $ionicPopup.confirm({
      title: 'Approval System',
      template: 'Are you sure you want to Logout?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
   })
  };
})

.controller('signInCtrl', function($scope) {
  console.log("signInCtrl")
})

.controller('dashboardCtrl', function($scope) {
  console.log("db")
})

.controller('approvalsCtrl', function($scope) {
  console.log("approvalsCtrl")
})

.controller('profileCtrl', function($scope) {
  console.log("profileCtrl")
})

.controller('historyCtrl', function($scope) {
  console.log("historyCtrl")
})

.controller('settingCtrl', function($scope) {
  console.log("settingCtrl")
})

.controller('approvalCtrl', function($scope, $stateParams) {
  console.log("approvalCtrl");
  console.log($stateParams)
});