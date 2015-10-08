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

.controller('dashboardCtrl', function($scope, DasboardServices, Storage) {
  console.log("DashboardCtrl");
  $scope.user = Storage.getObject('user');
  DasboardServices.getDashboard().then(function(result){
    $scope.current_dashboard = result;
    console.log($scope.current_dashboard);
  })
})

.controller('approvalsCtrl', function($scope, $ionicLoading, PrServices) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("approvalsCtrl");
  PrServices.listPr().then(function(result){
    console.log(result)
    $scope.pr = result;
  })
})

.controller('profileCtrl', function($scope, $ionicLoading, Storage, UserService) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("profileCtrl");
  $scope.user = Storage.getObject('user');
  // UserService.getProfile().then(function(result){
  //   $scope.user = result;
  // })

  $scope.update_user = function(params){
    console.log(params)
    UserService.updateAccount(params).then(function(result){
      $scope.user = result
    })
  }
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
  $scope.show = function(){
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("approvalCtrl");
  console.log($stateParams);
});