(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('editclassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, classifiedsFactory, $timeout) {

      var vm = this; // capture variable
      vm.classifieds = classifiedsFactory.ref;
      // vm.sidebarTitle = 'Add a Classifed';
      vm.closeSidebar = closeSidebar; // adding functions to the capyure variable 
      vm.saveEdit = saveEdit;
      vm.classified = vm.classifieds.$getRecord($state.params.id); // grabbing actual record associated with firebase data object

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
 
      
      function saveEdit() {
        vm.classifieds.$save(vm.classified).then(function(){
              vm.sidenavOpen = false;
              $scope.$emit('editSaved', 'Edit Saved');
        }) // saving it in firebase from vm.classified = vm.classifieds.$getRecord($state.params.id);
      }

    })

})();