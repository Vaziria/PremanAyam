angular.module('app')
.value('endpoint','http://localhost/premanayam/')
.service('premanReq',function($http,$httpParamSerializerJQLike,endpoint){
	this.table;
	this.section;
	
	this.set = function(table,section){
		this.table = table;
		this.section = section;
	}
	
	this.read = function(data = {cond:''}){
		url = endpoint+this.section+".php?action="+this.table+"&key=read";
		data.token = localStorage['token'];
		var request = $http({
			method:"post",
			dataTipe:'json',
			url:url,
			data:$httpParamSerializerJQLike(data),
			cache:false,
		});
		return request;
	}
	
	this.insert = function(data){
		
		url = endpoint+this.section+".php?action="+this.table+"&key=insert";
		data.token = localStorage['token'];
		
		var request = $http({
			method:"post",
			dataTipe:'json',
			url:url,
			data:$httpParamSerializerJQLike(data),
			cache:false,
		});
		return request;
		
	}
	this.update = function(data){
		url = endpoint+this.section+".php?action="+this.table+"&key=update";
		data.token = localStorage['token'];
		console.log(data);
		var request = $http({
			method:"post",
			dataTipe:'json',
			url:url,
			data:$httpParamSerializerJQLike(data),
			cache:false,
		});
		return request;
		
	}
	
	this.delet = function(data){
		
		url = endpoint+this.section+".php?action="+this.table+"&key=delete";
		
		var request = $http({
			method:"post",
			dataTipe:'json',
			url:url,
			data:$httpParamSerializerJQLike(data),
			cache:false,
		});
		return request;
		
	}
	
	return this;
});