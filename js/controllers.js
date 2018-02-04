// controller.js
angular.module('app')
.value('endpoint','http://localhost/premanayam/')
.factory('jenisAyam',function($http,$httpParamSerializerJQLike,endpoint){
	url = endpoint+"info.php?action=ayam&key=read";
	var datanya = {"token":localStorage["token"],"cond":""};
	var request = $http({
		method:"post",
		dataTipe:'json',
		url:url,
		data:$httpParamSerializerJQLike(datanya),
		cache:false,
	});
	
	
	return request;
})
.factory('premanReq',function($http,$httpParamSerializerJQLike,endpoint){
	
	
	
	
	return function(data){
		url = endpoint+data.query;
		var datanya = data.data;
		var request = $http({
			method:"post",
			dataTipe:'json',
			url:url,
			data:$httpParamSerializerJQLike(datanya),
			cache:false,
		});	
		
		return request;
	};
})
.service('fkandang',function($http,$rootScope){
	url = endpoint+"kandang.php?action=kandang&key=read";
	var datanya = {"token":localStorage["token"],"cond":""};
	var request = $http({
		method:"post",
		dataTipe:'json',
		url:url,
		data:$httpParamSerializerJQLike(datanya),
		cache:false,
	});
	return "aa";
	request.then(function(data){
		//console.log(data.data.data);
		
		$rootScope = data.data;
		
	});
	
})
.config(['$httpProvider', function($http) {  
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$http.defaults.transformRequest = function(data) {
           // return data;
        //};
    }])
.controller('kandang',function($scope,$rootScope,$http,$httpParamSerializerJQLike,endpoint){
	url = endpoint+"kandang.php?action=kandang&key=read";
	var datanya = {"token":localStorage["token"],"cond":""};
	var request = $http({
		method:"post",
		dataTipe:'json',
		url:url,
		data:$httpParamSerializerJQLike(datanya),
		cache:false,
	});
	request.then(function(data){
		console.log(data.data.data);
		$rootScope.kandangs = data.data.data;
		$scope.kandangs = $rootScope.kandangs;
		
	});
})
.controller('kandangBaru',function($scope,$rootScope,jenisAyam,premanReq){
	jenisAyam.then(function(data){
		$scope.jenisAyams = data.data.data;
		console.log($scope.jenisAyams);
	});
	$scope.kandangs = $rootScope.kandangs;
	console.log($scope.kandangs);
	
	$scope.click = function(){
		$scope.form.user = localStorage['user'];
		var request = premanReq({
			query:'kandang.php?action=kandang&key=insert',
			data:{token:localStorage["token"],data:$scope.form},
		});
		
		
		
		
	}
	
})
//////////////////////////////////////////info 
.controller('jenisAyamInfo',function($scope,$rootScope,jenisAyam,premanReq){
	var ctrl = this;
	$scope.jenisAyams;
	
	$scope.get = function(){
		jenisAyam.then(function(data){
		$scope.jenisAyams = data.data.data;
		$scope.$apply();
		console.log($scope.jenisAyams); 
		});
	}
	
	
	$scope.get();
	
	
	//delete
	$scope.delet = function(data){
		alert("asdasd");
	}
})

