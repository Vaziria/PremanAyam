angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'bower_components/chart.js/dist/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })
  .state('app.kandang',{
	url: '/kandang',
    templateUrl: 'views/page/kandang.html',
    //page title goes here
	params: { subtitle: 'Kandang User' },
    ncyBreadcrumb: {
      label: 'Kandang',
    },
  })
  .state('app.kandangForm',{
	url: '/kandang/:id',
    templateUrl: 'views/page/kandangForm.html',
    //page title goes here
	params: { subtitle: 'Kandang Form' },
    ncyBreadcrumb: {
      label: 'Kandang',
    },
  })
  //info
  .state('app.jenisAyamInfo',{
	url: '/info-ayam',
    templateUrl: 'views/page/info/jenisayam.html',
    //page title goes here
	params: { subtitle: 'Info Jenis Ayam' },
    ncyBreadcrumb: {
      label: 'info',
    },
	
  })
  .state('app.vaksinInfo',{
	url: '/info-vaksin',
    templateUrl: 'views/page/info/vaksin.html',
    //page title goes here
	params: { subtitle: 'Info Vaksin' },
    ncyBreadcrumb: {
      label: 'info',
    },
	
  })
  .state('app.pakanInfo',{
	url: '/info-pakan',
    templateUrl: 'views/page/info/pakan.html',
    //page title goes here
	params: { subtitle: 'Info Pakan' },
    ncyBreadcrumb: {
      label: 'pakan',
    },
	
  })
  .state('app.obatInfo',{
	url: '/info-obat',
    templateUrl: 'views/page/info/obat.html',
    //page title goes here
	params: { subtitle: 'Info Obat' },
    ncyBreadcrumb: {
      label: 'obat',
    },
	
  })
  .state('app.test',{
	url: '/test/:judul',
    templateUrl: 'views/page/test.html',
    //page title goes here
	hiddenParam : 'YES',
	params: { subtitle: 'test' },
    ncyBreadcrumb: {
      label: 'test',
    },
	
  })
  
  
  
  
  
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
    }
  })

  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html'
  })
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
}]);
