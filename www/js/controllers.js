angular.module('starter.controllers', [])
.controller('AppCtrl', function(ConnectionService, $scope, $ionicModal, $timeout, $ionicPopup, Storage, $state, UserService, $ionicLoading) {
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
        console.log(result);
        if (result != false) {
          if(result.status == 1){
            $scope.$emit('LoginSuccess', true);
            $scope.hide();
            $state.go('app.dashboard');
          }else{
            alert(result.message)
            $scope.hide();
          }
        }else{
          alert("Please Check Your Connection")
          console.log(JSON.stringify(result))
          $scope.hide();          
        };
      });
    }else{
      alert("Please fill username and password")
      $scope.hide();
    }
  }
})

.controller('dashboardCtrl', function($scope, DasboardServices, Storage, $ionicLoading, ConnectionService, $state) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  console.log("DashboardCtrl");
  $scope.user = Storage.getObject('user');
  $scope.show();
  DasboardServices.getDashboard().then(function(result){
    console.log(JSON.stringify(result))
    if (ConnectionService.checkRespond(result)){
      $scope.current_dashboard = result;
      console.log($scope.current_dashboard);
      $scope.hide();
    }else{
      $scope.hide();
      $state.go('app.signin');
    }

  })
})

.controller('approvalsCtrl', function($scope, $ionicLoading, $ionicPopup, $stateParams, PrServices, $ionicLoading, ConnectionService, $state) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("approvalsCtrl");
  $scope.show();
  $scope.getlistPr = function(){
    PrServices.listPr().then(function(result){
      if (ConnectionService.checkRespond(result)) {
        $scope.pr = result;
        $scope.hide();
      }else{
        $scope.hide();
        $state.go('app.signin');
      }
    })
  }
  $scope.getlistPr();
  $scope.acceptPr = function(requisition_number){
    console.log(requisition_number)
    var confirmPopup = $ionicPopup.confirm({
      title: 'Approval Apps',
      template: 'Are you sure you want to Accept this PR ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.show();
        console.log(requisition_number);
        PrServices.acceptApproval(requisition_number).then(function(result){
          console.log(result)
          if (result.status==1) {
            $scope.getlistPr();
            $state.go('app.approvals');
          }else{
          };
          $scope.hide();
        })
      } else {
        console.log('You are not sure');
      }
    });
  }
  $scope.reason = "";
  $scope.rejectPr = function(requisition_number){
      $scope.data = {}
      $ionicPopup.show({
        template: '<input type="reason" ng-model="reason">',
        title: 'Approval Apps',
        subTitle: 'Please Fill Reason for Reject Pr',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Reject</b>',
            type: 'button-danger',
            onTap: function(e) {
              console.log(requisition_number);
              $scope.show();
              console.log($scope.reason)
              PrServices.rejectApproval(requisition_number, "reject", $scope.reason).then(function(result){
                if (result.status == 1) {
                  $scope.getlistPr();
                }else{
                };
                $scope.hide();
              })
            }
          }
        ]
      })
  }

  $scope.details = function(ids){
    console.log(ids)
    $state.go('app.approval', {id: ids});
  }
})

.controller('approvCtrl', function($scope, $ionicLoading, $filter, $ionicPopup, PrServices, $stateParams, $ionicLoading, ConnectionService, $state, Storage) {
  console.log($state.params)
  console.log($stateParams.approvalId)
  console.log("asd")

  var list_pr = Storage.getObject('pr')
  console.log(list_pr)

  $scope.pr = $filter('filter')(list_pr, {id: $stateParams.Id})[0];
  console.log(JSON.stringify($scope.pr))

  $scope.acceptPr = function(requisition_number){
    console.log(requisition_number)
    var confirmPopup = $ionicPopup.confirm({
      title: 'Approval Apps',
      template: 'Are you sure you want to Accept this PR ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.show();
        console.log(requisition_number);
        PrServices.acceptApproval(requisition_number).then(function(result){
          console.log(result)
          if (result.status==1) {
            $scope.getlistPr();
            $state.go('app.approvals');
          }else{
            alert("Some problem")
          };
          $scope.hide();
        })
      } else {
        console.log('You are not sure');
      }
    });
  }
  $scope.reason = "";
  $scope.rejectPr = function(requisition_number){
      $scope.data = {}
      $ionicPopup.show({
        template: '<input type="reason" ng-model="reason">',
        title: 'Approval Apps',
        subTitle: 'Please Fill Reason for Reject Pr',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Reject</b>',
            type: 'button-danger',
            onTap: function(e) {
              console.log(requisition_number);
              $scope.show();
              console.log($scope.reason)
              PrServices.rejectApproval(requisition_number, "reject", $scope.reason).then(function(result){
                if (result.status == 1) {
                  $scope.getlistPr();
                }else{
                  alert("Some problem")
                };
                $scope.hide();
              })
            }
          }
        ]
      })
  }
})

.controller('profileCtrl', function($scope, $ionicLoading, Storage, UserService, $ionicLoading, ConnectionService, $state) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  console.log("profileCtrl");
  $scope.show();
  UserService.getProfile().then(function(result){
    if(ConnectionService.checkRespond(result)){
      $scope.user = result;
      console.log(result);
      $scope.hide();
    }else{
      $scope.hide();
      $state.go('app.signin');
    }
  })

  $scope.update_user = function(params){
    console.log(params)
    console.log("update")
    $scope.show()
    UserService.updateAccount(params).then(function(result){
      if(ConnectionService.checkRespond(result)){
        $scope.user = result;
        console.log(result);
        $scope.hide();
      }else{
        $scope.hide();
        $state.go('app.signin');
      }
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
  $scope.show();
  HistoryServices.getHistory().then(function(result){
    $scope.history = result;
    console.log($scope.history)
    console.log(JSON.stringify($scope.history))
    $scope.hide();
  })
})

.controller('settingCtrl', function($scope, Storage, UserService, $ionicLoading) {
  console.log("settingCtrl");
  var user = Storage.getObject('user');
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
  $scope.pushNotify = JSON.parse(user.is_push_notification) ? true : false;
  $scope.emailNotification = JSON.parse(user.is_notify_email) ? true : false;

  $scope.emailChange = function(params){
    $scope.show();
    UserService.updateEmail(params).then(function(result){
      console.log("masuk sini1")
      if (result.status == 1) {
        alert("Update Push notification has been Saved");
      }else{
        alert("Update Push notification can't Saved");
      };
      $scope.hide();
    })
  }
  
  $scope.pushChange = function(params){
    $scope.show();
    UserService.updatePush(params).then(function(result){
      console.log("masuk sini2")
      if (result.status == 1) {
        console.log("masuk sini21")
        alert("Update Push notification has Saved");
      }else{
        console.log("masuk sini22")
        alert("Update Push notification can't Saved");
      };
      $scope.hide();
    })
  }
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
})

.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});