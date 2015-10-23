var services = angular.module('starter.services', []);

services.factory('ConnectionService', function(Storage) {
  var objService = {
    check: function() {
      if(navigator.connection != undefined){
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 1;//'Unknown connection';
        states[Connection.ETHERNET] = 2;//'Ethernet connection';
        states[Connection.WIFI]     = 3;//'WiFi connection';
        states[Connection.CELL_2G]  = 4;//'Cell 2G connection';
        states[Connection.CELL_3G]  = 5;//'Cell 3G connection';
        states[Connection.CELL_4G]  = 6;//'Cell 4G connection';
        states[Connection.CELL]     = 7;//'Cell generic connection';
        states[Connection.NONE]     = 8;//'No network connection';
        return states[networkState];
      }else{
        return null
      }
    },
    checkRespond: function(result){
      console.log(result)
      if(result.status == 2){
        Storage.clearAll();
        return false;
      }else{
        return true;
      }
    }
  };
  return objService;
});

services.factory('Storage', function(){
  return {
    getItem: function (key) {
      return localStorage.getItem(key);
    },

    getObject: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },

    setItem: function (key, data) {
      localStorage.setItem(key, data);
    },

    setObject: function (key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },

    remove: function (key) {
      localStorage.removeItem(key);
    },

    clearAll : function () {
      localStorage.clear();
    }
  };
});

services.factory('HttpService', function($q, $http, Storage){
  var token = Storage.getItem('token');
  var objService = {
    getService: function(query_url){
      var deferred = $q.defer();
      $http({
        method  : 'GET',
        url     : url + query_url,
        data    : "token="+token,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response);
      });
      return deferred.promise;
    },
    postService: function(query_url){
      var deferred = $q.defer();
      var token = Storage.getObject('token');
      $http({
        method  : 'POST',
        url     : url + query_url,
        data    : "token="+token,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response);
      });
      return deferred.promise;
    },
    deleteService: function(query_url){
      var deferred = $q.defer();
      $http({
        method  : 'DELETE',
        url     : url + query_url,
        data    : "token="+token,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response);
      });
      return deferred.promise;
    },
    patchService: function(query_url){
      var deferred = $q.defer();
      $http({
        method  : 'PATCH',
        url     : url + query_url,
        data    : "token="+token,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response);
      });
      return deferred.promise;
    }
  };
  return objService;
})

services.factory('UserService', function($q, Storage, $http, $httpParamSerializerJQLike){
  var objService = {
    checkLogin: function(){
      if(Storage.getItem('token') != null){
        return true
      }else{
        return false
      }
    },

    signIn: function(params){
      console.log(params)
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url+'api/auth/login',
        data    : "userkey="+params.email+"&password="+params.password,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.status == 1){
          Storage.setItem('user', JSON.stringify(response.data.user));
          Storage.setItem('token', JSON.stringify(response.data.token));
          console.log(response.data.user)
          console.log(response.data.token)
        }
        return deferred.resolve(response.data);
      }, function(error){
        console.log(error);
        console.log(JSON.stringify(error));
        return deferred.resolve(false);
      });
      return deferred.promise;
    },

    updateAccount: function(params){
      console.log(params)
      console.log("masuk update")
      var token = Storage.getObject('token');
      console.log(token)
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url + 'api/user?token='+token,
        // data    : 'first_name='+params.first_name+'&last_name='+params.last_name+'&description='+params.description+'&email_format=email',
        data    : $httpParamSerializerJQLike({first_name: params.first_name, last_name: params.last_name, description: params.description, email_format: "email"}),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        Storage.setItem('user', JSON.stringify(response.data.user))
        return deferred.resolve(response.data.user);        
      },function(errors){
        console.log(errors)
      });
      return deferred.promise;
    },

    updateEmail: function(params){
      if (params == true) {
        params = 1
      }else{
        params = 0
      }
      console.log(params)
      console.log("masuk update")
      var token = Storage.getObject('token');
      console.log(token)
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url + 'api/user?token='+token,
        // data    : 'first_name='+params.first_name+'&last_name='+params.last_name+'&description='+params.description+'&email_format=email',
        data    : $httpParamSerializerJQLike({is_notify_email: params, email_format: "email"}),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        console.log(JSON.stringify(response))
        Storage.setItem('user', JSON.stringify(response.data.user))
        return deferred.resolve(response.data);        
      },function(errors){
        console.log(errors)
      });
      return deferred.promise;
    },

    updatePush: function(params){
      if (params == true) {
        params = 1;
      }else{
        params = 0;
      }
      console.log(params)
      var token = Storage.getObject('token');
      console.log(token)
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url + 'api/user?token='+token,
        data    : $httpParamSerializerJQLike({is_push_notification: params, email_format: "email"}),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        console.log(JSON.stringify(response))
        Storage.setItem('user', JSON.stringify(response.data.user))
        return deferred.resolve(response.data);       
      },function(errors){
        console.log(errors);
      });
      return deferred.promise;
    },

    logoutAccount: function(){
      var token = Storage.getItem("token");
      var deferred = $q.defer();
      $http({
        method  : 'GET',
        url     : url + 'api/auth/logout',
        data    : "token="+token,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.status = 1){
          Storage.clearAll()
          return deferred.resolve(true);
        }else{
          return deferred.resolve(false);
        }
      });
      return deferred.promise;
    },
    getProfile: function(){
      var token = Storage.getObject('token');
      console.log(token)
      var deferred = $q.defer();
      $http.get(url + 'api/user?token='+token, {})
        .success(function(result, status, headers, config){
          console.log(JSON.stringify(result))
          console.log(result);
          Storage.setItem('user', JSON.stringify(result))
          deferred.resolve(result);
        })
        .error(function(result, status, headers, config){
          deferred.reject(result);
        })
      return deferred.promise;
    }
  };
  return objService;
});

services.factory('PrServices', function($q, $http, Storage, $httpParamSerializerJQLike){
  var token = Storage.getObject('token')
  console.log(url + 'api/pr?token=' + token)
  var objService = {
    listPr: function(){
      var deferred = $q.defer();
      $http.get(url + 'api/pr?token=' + token, {})
        .success(function(result, status, headers, config){
          console.log(JSON.stringify(result.data))
          Storage.setItem('pr', JSON.stringify(result.data))
          deferred.resolve(result.data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
      return deferred.promise;
    },

    showPr: function(params){
      var deferred = $q.defer();
      var data = Storage.getObject('')
      $http.post(url + '', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
      return deferred.promise;
    },

    acceptApproval: function(requisition_number){
      console.log(requisition_number)
      var token = Storage.getObject('token');
      console.log(token)
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url + 'api/accept?token='+token,
        data    : $httpParamSerializerJQLike({requisition_number: requisition_number, status: 'approve'}),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response.data);       
      },function(errors){
        return deferred.reject(response.data);
      });
      return deferred.promise;
    },

    rejectApproval: function(requisition_number, status, reason){
      var token = Storage.getObject('token');
      console.log(token);
      console.log(requisition_number);
      console.log(reason);
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url + 'api/accept?token='+token,
        data    : $httpParamSerializerJQLike({requisition_number: requisition_number, status: status, reason: reason}),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response.data);       
      },function(errors){
        return deferred.reject(false);
      });
      return deferred.promise;
    },

    listHistoryApprovals: function(){
      var deferred = $q.defer();
      $http.post(url + '', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
      return deferred.promise;
    }
  };
  return objService;
});

services.factory('DasboardServices', function($q, $http, Storage, ConnectionService){
  var token = Storage.getObject('token')
  var objService = {
    getDashboard: function() {
      console.log("masuk getDashboard")
      var deferred = $q.defer();
      $http({
        method  : 'GET',
        url     : url + 'api/dashboard',
        params: { token: token },
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response.data);
      }, function(errors){
        return deferred.resolve(errors.data);
      });
      return deferred.promise;
    }
  };
  return objService;
});

services.factory('HistoryServices', function($q, $http, Storage, HttpService){
  var token = Storage.getItem('token')
  var objService = {
    getHistory: function(){
      var deferred = $q.defer();
      HttpService.postService('api/history').then(function(response){
        return deferred.resolve(response.data);
      })
      return deferred.promise;
    }
  };
  return objService;
});

