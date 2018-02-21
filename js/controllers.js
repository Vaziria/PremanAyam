// controller.js
angular.module('app')
.config(['$httpProvider', function($http) {  
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$http.defaults.transformRequest = function(data) {
           // return data;
        //};
    }])
.controller('kandang',function($scope,premanReq,$state){
	request = premanReq;
	request.set('kandang','kandang');
	$scope.kandangs;
	$scope.reload = function(){
		request.read().then(function(data){
			$scope.kandangs = data.data.data;
			$scope.$apply;
		});
	};
	$scope.reload();
	
	//delete
	$scope.delet = function(data){
		var ask = confirm("are you Sure..?");
		if(ask == true){
			request.delet({token:localStorage['token'],cond:["id","=",data]})
			.then(function(data){
				//console.log(data);
				if(data.data.status == "ok"){
					$scope.reload();
				}else{
					alert("fails");
				}
			});
			
			
		}
	}

	$scope.edit = function(data){
		idnya = data;
		$state.go('app.kandangForm',{"id":idnya});
	}
	
})
.controller('kandangForm',function($scope,$stateParams,premanReq,$state){
	request = premanReq;
	request.set('kandang','kandang');
	$scope.title = "new";
	$scope.form = [];
	$scope.form.nama = "";
	$scope.form.kota = "";
	
	$scope.reload = function(){
	request.read({cond:["id","=",$stateParams.id]}).then(function(data){
			dat = data.data.data[0];
			$scope.form.nama = dat.nama;
			$scope.form.kota = dat.kota;
			$scope.$apply;
			//console.log(dat);
		});
	}
	
	if($stateParams.id!=""){
		$scope.title = "Edit";
		$scope.reload()
		$scope.submit = function(){
			datanya = {};
			datanya.cond =["id","=",$stateParams.id];
			datanya.data = {
				"nama" : $scope.form.nama,
				"kota" : $scope.form.kota,
				"user" : localStorage["user"],
			};
			request.update(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.kandang');
				}
			});
			
		}
	}

	
})
//////////////////////////////////////////info 
.controller('jenisAyamInfo',function($scope,premanReq){
	request = premanReq;
	request.set('ayam','info');
	$scope.jenisAyams;
	$scope.reload = function(){
		request.read().then(function(data){
			$scope.jenisAyams = data.data.data;
			$scope.$apply;
		});
	};
	$scope.reload();
	
	//delete
	$scope.delet = function(data){
		var ask = confirm("are you Sure..?");
		if(ask == true){
			request.delet({token:localStorage['token'],cond:["jenis","=",data]})
			.then(function(data){
				console.log(data);
				if(data.data.status == "ok"){
					$scope.reload();
				}else{
					alert("fails");
				}
			});
			
			
		}
		
		
	}
	
	$scope.insert = function(){
		if($scope.jenisbaru!=""){
			request.insert({data:{jenis:$scope.jenisbaru}})
			.then(function(data){
				$scope.reload();
			});
			
		}
	}
	
})
.controller('vaksinInfo',function($scope,premanReq){
	request = premanReq;
	request.set('vaksin','info');
	$scope.vaksins;
	$scope.reload = function(){
		request.read().then(function(data){
			$scope.vaksins = data.data.data;
			console.log($scope.vaksins);
			$scope.$apply;
		});
	};
	$scope.reload();
	
	//delete
	$scope.delet = function(data){
		var ask = confirm("are you Sure..?");
		if(ask == true){
			request.delet({token:localStorage['token'],cond:["id","=",data]})
			.then(function(data){
				console.log(data);
				if(data.data.status == "ok"){
					$scope.reload();
				}else{
					alert("fails");
				}
			});
			
			
		}
		
		
	}
	
	$scope.insert = function(){
		if($scope.vaksinbaru!=""){
			request.insert({data:{jenis:$scope.vaksinbaru}})
			.then(function(data){
				$scope.reload();
			});
			
		}
	}
	
})
.controller('test',function($scope,premanReq,$http,$httpParamSerializerJQLike,$stateParams,$state){
	$scope.judul = $stateParams.judul;
	var to = premanReq;
	to.set('kandang','kandang');
	
	to.read().then(function(data){
		console.log(data);
	});
	
	console.log(to);
});

