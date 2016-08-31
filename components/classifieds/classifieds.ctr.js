// using iife
(function(){
  "use strict";
  // referencing the module we already created, hence no []
  angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {  
        
        var vm = this; // capture variable
        
        vm.categories;
        vm.classifieds;
        vm.classified;
        vm.closeSidebar = closeSidebar;
        vm.deleteClassified = deleteClassified;
        vm.editing;
        vm.editClassified = editClassified;
        vm.openSidebar = openSidebar;
        vm.saveClassified = saveClassified;
       
        //vm.saveEdit = saveEdit;

        vm.classifieds = classifiedsFactory.ref; // getting data from firebase
     // ** When all the data is loaded, we want to load categories..  $ loaded is provided from firebase
        vm.classifieds.$loaded().then(function(classifieds) {
                vm.categories = getCategories(classifieds);
        });



/*        classifiedsFactory.getClassifieds().then(function(response) {
                  vm.classifieds = response.data;
                  vm.categories = getCategories(vm.classifieds);
         });
*/

      $scope.$on('newClassified', function(event, data) { // data consist of the new classified, catching the new classified event
       // data.id = vm.classifieds.length + 1; // giving id to the new classified
       //  vm.classifieds.push(data);
        vm.classifieds.$add(data);
        showToast('Classified Saved');
      });

      $scope.$on('editSaved', function(event, message) { 
        showToast(message);
      });

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        );
      }


      function openSidebar() {
         vm.sidebarTitle = 'Add a Classified';
         $state.go('classifieds.new'); // routing to classifieds.new state
        }

      function closeSidebar() {
         vm.classified = {};
         $mdSidenav('left').close();
        }


        function saveClassified(classified) { // classified is the object that gets sent from the front end
              if(classified) {
                  classified.contact = contact; // contact will come from user's profile
                  vm.classifieds.push(classified);
                  vm.classified = {}; // clearing the fields after clicking the save button i.e making the classified object empty
                  closeSidebar();
                showToast('Classified Saved');
              }
        }

        function editClassified(classified) { // editing an existing classified
          $state.go('classifieds.edit', { id: classified.$id }); // $id comes from firebase
        }

        function saveEdit(){
          vm.editing = false;
          vm.classified = {};     // Need to clear the form after, or else it will be populated when we go to add new classifieds
          $mdSidenav('left').close();
          showToast('Edit Saved');
        }


        function deleteClassified(event, classified) {
         var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + classified.title + '?')
            .targetEvent(event) // coming grom view --   ng-click="deleteClassified($event, classified)"
            .ok('Yes')
            .cancel('No');
         $mdDialog.show(confirm).then(function() { // promise
          // var index = vm.classifieds.indexOf(classified);
          // vm.classifieds.splice(index, 1);
          vm.classifieds.$remove(classified);
          showToast('Classified Deleted');
            }, function() {
          vm.status = classified.title + ' is still here.';
        });
      };

    }); // end of controller

      function getCategories(classifieds) {

        var categories = [];

        angular.forEach(classifieds, function(ad) {
          angular.forEach(ad.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories); // use of lodash
      }


})(); // end of iffe