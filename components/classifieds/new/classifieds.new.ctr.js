(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('newclassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, classifiedsFactory, $timeout) {

      var vm = this; // capture variable
      vm.sidebarTitle = 'Add a Classifed';
      vm.closeSidebar = closeSidebar; // adding functions to the capyure variable 
      vm.saveClassified = saveClassified;

      $timeout(function() { // to fix browser's event loop, timeout is used
        $mdSidenav('left').open();     
      });  

    

    // md-is-open = "vm.sidenavOpen" comes from classifieds.new.tpl.html
       $scope.$watch('vm.sidenavOpen', function(sidenav) { // 1 st argument = property to watch for changes, 2 nd argument = holds that value 
        if(sidenav === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('classifieds');
          });
        }
      });


      function closeSidebar() {
        vm.classified = {};
        vm.sidenavOpen = false;        
      }
 
      
      function saveClassified(classified) {
        if(classified) {

          classified.contact = { // dummy admin contact
            name: "Vedant Pandit", 
            phone: "(213) 663-5245",
            email: "vedantup@usc.edu"
          }

          $scope.$emit('newClassified', classified) // EVENT CAUGHT IN classified.ctr.js         
          vm.sidenavOpen = false;
        }
      }

    })

})();