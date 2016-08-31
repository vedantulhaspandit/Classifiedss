angular
 	.module("ngClassifieds",["ngMaterial", "ui.router", "firebase"])
 	.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider){

 			$mdThemingProvider.theme('default')
 			 .primaryPalette('teal')
 			 .accentPalette('orange');

            $urlRouterProvider.otherwise('/classifieds');  

 			 $stateProvider
 			 .state("classifieds",{
 			   	 url:'/classifieds',
 			   	 templateUrl: 'components/classifieds/classifieds.tpl.html',
         		 controller: 'classifiedsCtrl as vm' // defining the controller here
 			   })
 			 .state('classifieds.new', { // By using classifieds.new, ui router knows that classifieds.new is a substate of classifieds
                 url: '/new',
         		 templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
         		 controller: 'newclassifiedsCtrl as vm'
              })
 			  .state('classifieds.edit', { // By using classifieds.edit, ui router knows that classifieds.edit is a substate of classifieds
                 url: '/edit/:id',
         		 templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
         		 controller: 'editclassifiedsCtrl as vm',
         		 params:{
         		 	classified : null
         		 }
              });

 	});
