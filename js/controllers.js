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
	
	$scope.baru = function(){
		$state.go('app.kandangForm',{"id":""});
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
	}else{
		$scope.submit = function(){
			datanya = {};
			datanya.data = {
				"nama" : $scope.form.nama,
				"kota" : $scope.form.kota,
				"user" : localStorage["user"],
			};
			request.insert(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.kandang');
				}
			});
		}
	}

	
})
//-----------------------------------LOG-------------------------------//
//HARIAN
.controller('logHarian',function($scope,premanReq){
	$scope.kandangs =[];
	$scope.logs =[];
	
	$scope.get_kandang = function(){
		request = premanReq;
		request.set('kandang','kandang');
		request.read().then(function(data){
			$scope.kandangs = data.data.data;
			$scope.$apply;
		});
	}
	
	$scope.getLog = function(id){
		request = premanReq;
		request.set('harian','kandang');
		
	request.read({cond:["id","=",id]}).then(function(data){
			$scope.logs = data.data.data;
			console.log($scope.logs);
			$scope.$apply;
		});
	}
	
	$scope.get_kandang();
	
	$scope.$watch('idActive',function(){
		if($scope.idActive!="" || $scope.idActive!=null){
			$scope.getLog($scope.idActive);
			
		}
	});
	
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
.controller('vaksinInfo',function($scope,premanReq,$state){
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
	
	$scope.edit = function(data){
		$state.go('app.vaksinInfoForm',{id:data});
	}
	
})
.controller('vaksinInfoForm',function($scope,premanReq,$state,$stateParams){
	request = premanReq;
	request.set('vaksin','info');
	
	$scope.form = [];
	$scope.load = function(){
		data = ['id','=',$stateParams.id];
		request.read({cond:data}).then(function(datanya){
			data = datanya.data.data[0];
			keys = Object.keys(data);
			a = 0;
			while(a<keys.length){
				$scope.form[keys[a]] = data[keys[a]];
				a++;
			}
			$scope.$apply;
			
		});
	}
	
	
	if($stateParams != "baru"){
		$scope.title = "Edit"
		$scope.load();
		
		$scope.submit = function(){
			datanya = {};
			datanya.cond =["id","=",$stateParams.id];
			datanya.data = {}
			keys = Object.keys($scope.form);
			a = 0;
			while(a<keys.length){
				datanya.data[keys[a]] = $scope.form[keys[a]];
				a++;
			}
			request.update(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.vaksinInfo');
				}
			});
		}
		
		
	}else{
		$scope.title = "Baru";
		$scope.submit = function(){
			datanya = {};
			datanya.data = {}
			keys = Object.keys($scope.form);
			a = 0;
			while(a<keys.length){
				datanya.data[keys[a]] = $scope.form[keys[a]];
				a++;
			}
			request.insert(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.pakanInfo');
				}
			});
		}
		
	}
})
.controller('pakanInfo',function($scope,premanReq,$state){
	request = premanReq;
	request.set('pakan','info');
	$scope.pakans;
	$scope.reload = function(){
		request.read().then(function(data){
			$scope.pakans = data.data.data;
			console.log($scope.pakans);
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
			request.insert({data:{jenis:$scope.pakanBaru}})
			.then(function(data){
				$scope.reload();
			});
			
		}
	}
	
	$scope.edit = function(data){
		$state.go('app.pakanInfoForm',{id:data});
	}
	
	
})
.controller('pakanInfoForm',function($scope,premanReq,$state,$stateParams){
	request = premanReq;
	request.set('pakan','info');
	
	$scope.form = [];
	$scope.load = function(){
		data = ['id','=',$stateParams.id];
		request.read({cond:data}).then(function(datanya){
			data = datanya.data.data[0];
			keys = Object.keys(data);
			a = 0;
			while(a<keys.length){
				$scope.form[keys[a]] = data[keys[a]];
				a++;
			}
			$scope.$apply;
			
		});
	}
	
	
	if($stateParams != "baru"){
		$scope.title = "Edit"
		$scope.load();
		
		$scope.submit = function(){
			datanya = {};
			datanya.cond =["id","=",$stateParams.id];
			datanya.data = {}
			keys = Object.keys($scope.form);
			a = 0;
			while(a<keys.length){
				datanya.data[keys[a]] = $scope.form[keys[a]];
				a++;
			}
			request.update(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.pakanInfo');
				}
			});
		}
		
		
	}else{
		$scope.title = "Baru";
		$scope.submit = function(){
			datanya = {};
			datanya.data = {}
			keys = Object.keys($scope.form);
			a = 0;
			while(a<keys.length){
				datanya.data[keys[a]] = $scope.form[keys[a]];
				a++;
			}
			request.insert(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.pakanInfo');
				}
			});
		}
		
	}
})

.controller('obatInfo',function($scope,premanReq,$state){
	request = premanReq;
	request.set('obat','info');
	$scope.obats;
	$scope.reload = function(){
		request.read().then(function(data){
			$scope.obats = data.data.data;
			//console.log($scope.pakans);
			$scope.$apply;
		});
	};
	$scope.reload();
	
	
	$scope.edit = function(data){
		$state.go('app.obatInfoForm',{id:data});
	}
	
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
			request.insert({data:{jenis:$scope.obatBaru}})
			.then(function(data){
				$scope.reload();
			});
			
		}
	}
	
})
.controller('obatInfoForm',function($scope,premanReq,$state,$stateParams){
	request = premanReq;
	request.set('obat','info');
	
	$scope.form = [];
	$scope.load = function(){
		data = ['id','=',$stateParams.id];
		request.read({cond:data}).then(function(datanya){
			data = datanya.data.data[0];
			keys = Object.keys(data);
			a = 0;
			while(a<keys.length){
				$scope.form[keys[a]] = data[keys[a]];
				a++;
			}
			$scope.$apply;
			
		});
	}
	
	
	if($stateParams != "baru"){
		$scope.title = "Edit"
		$scope.load();
		
		$scope.submit = function(){
			datanya = {};
			datanya.cond =["id","=",$stateParams.id];
			datanya.data = {}
			keys = Object.keys($scope.form);
			a = 0;
			while(a<keys.length){
				datanya.data[keys[a]] = $scope.form[keys[a]];
				a++;
			}
			request.update(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.obatInfo');
				}
			});
		}
		
		
	}else{
		$scope.title = "Baru";
		$scope.submit = function(){
			datanya = {};
			datanya.data = {}
			keys = Object.keys($scope.form);
			a = 0;
			while(a<keys.length){
				datanya.data[keys[a]] = $scope.form[keys[a]];
				a++;
			}
			request.insert(datanya).then(function(data){
				if(data.data.data == true){
					$state.go('app.obatInfo');
				}
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

