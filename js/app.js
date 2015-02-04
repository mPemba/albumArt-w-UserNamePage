var app = angular.module('albumArt', ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'js/templates/login-view.html',
		controller: 'login-controller'
	})
	.when('/artView', {
		templateUrl: 'js/templates/main-tmpl.html',
		controller: 'main-controller'
	})
	.otherwise({
		redirectTo: '/login'
	})
});

app.run(function($rootScope, $location, envService) {
	$rootScope.url = "https://albumart.firebaseio.com";
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if (envService.getUsername()) {
			$rootScope.user = envService.getUsername();
			console.log($rootScope.user);
		} else {
			$location.path('/login');
		}
	})
});