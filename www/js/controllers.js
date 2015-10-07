angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, Storage, $state, UserService, $ionicLoading) {
  $scope.hasLogin = UserService.checkLogin();
  if($scope.hasLogin == true){
    $state.go('app.dashboard');
  }else{
    $state.go('app.signin');
  }

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.logout = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Approval System',
      template: 'Are you sure you want to Logout?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.show()
        console.log('You are sure');
        UserService.logoutAccount().then(function(result){
          if(result == true){
            $scope.hide()
            $state.go('app.signin');
            $scope.hasLogin = false;
          }else{
            $scope.hide()
            console.log("Error");
          }
        });
      }else {
        console.log('You are not sure');
      }
   })
  };

  $scope.$on('LoginSuccess', function (event, data) {
    $scope.hasLogin = data
  });
})

.controller('signInCtrl', function($scope, UserService, $state, $ionicLoading) {

  $scope.loginData = {};
  
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  console.log($scope.hasLogin);
  $scope.signIn = function(){
    $scope.show();
    console.log($scope.loginData);
    if($scope.loginData.password != null && $scope.loginData.email != null){
      UserService.signIn($scope.loginData).then(function(result){
        console.log(result.status);
        if(result.status == 1){
          $scope.$emit('LoginSuccess', true);
          $scope.hide();
          $state.go('app.dashboard');
        }else{
          alert(result.message);
        }
        console.log(JSON.stringify(result))
      });
    }else{
      alert("Harap Melengkapi Akses");
    }
  }
})

.controller('dashboardCtrl', function($scope, DasboardServices) {
  console.log("DashboardCtrl");
})

.controller('approvalsCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("approvalsCtrl");
})

.controller('profileCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("profileCtrl");
})

.controller('historyCtrl', function($scope, HistoryServices, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("historyCtrl");
})

.controller('settingCtrl', function($scope) {
  console.log("settingCtrl");
})

.controller('approvalCtrl', function($scope, $stateParams, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("approvalCtrl");
  console.log($stateParams);
})