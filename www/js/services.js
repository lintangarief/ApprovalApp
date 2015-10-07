var services = angular.module('services', []);

services.factory('ConnectionService', function() {
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

services.factory('UserService', function($q, Storage, $http){
  var objService = {
    checkLogin: function(){
      if(Storage.getItem('token') != null){
        return true
      }else{
        return false
      }
    },

    signIn: function(params){
      alert("masuk")
      var deferred = $q.defer();
      $http({
        method  : 'POST',
        url     : url + 'api/auth/login',
        data    : "userkey="+params.email+"&password="+params.password,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.status == 1){
          Storage.setItem('user', JSON.stringify(response.data.user));
          Storage.setItem('token', JSON.stringify(response.data.token));
        }
        return deferred.resolve(response.data);
      });
      return deferred.promise;
    },

    updateAccount: function(params){
      var deferred = $q.defer();
      $http.post(url + 'api/user', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
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
    }

  };
  return objService;
});

services.factory('PrServices', function($q, $http){
  var objService = {
    listPr: function(){
      var deferred = $q.defer();
      $http.get(url + '', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
      return deferred.promise;
    },

    showPr: function(params){
      var deferred = $q.defer();
      $http.post(url + '', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
      return deferred.promise;
    },

    acceptApproval: function(params){
      var deferred = $q.defer();
      $http.post(url + 'api/accept', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
      return deferred.promise;
    },

    cancleApproval: function(){
      var deferred = $q.defer();
      $http.post(url + '', {})
        .success(function(data, status, headers, config){
          deferred.resolve(data);
        })
        .error(function(result, status, headers, config){
          deferred.resolve(result);
        })
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

services.factory('DasboardServices', function($q, $http, Storage){
  var token = Storage.getItem('token')
  var objService = {
    getDashboard: function() {
      var deferred = $q.defer();
      $http({
        method  : 'GET',
        url     : url + 'api/auth/getdashboard',
        data    : "token="+token,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        return deferred.resolve(response.data);
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
      HttpService.getService('app/auth/getHistory').then(function(response){
        return deferred.resolve(response.data);
      })
      return deferred.promise;
    }
  };
  return objService;
});

