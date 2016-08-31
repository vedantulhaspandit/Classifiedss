(function() {

  "use strict";

  angular
    .module("ngClassifieds")
    .directive("classifiedCard", function() {
      return {
        templateUrl: "components/classifieds/card/classified-card.tpl.html",
        scope: {
          classifieds: "=classifieds",
          classifiedsFilter: "=classifiedsFilter",
          category: "=category"
        },
        controller: classifiedCardController,
        controllerAs: 'vm'
      }

      function classifiedCardController($scope, $state, $mdDialog, $mdToast) {
        var vm = this;

        vm.editClassified = editClassified;
        vm.deleteClassified = deleteClassified;

        function editClassified(classified) { // editing an existing classified
          $state.go('classifieds.edit', { id: classified.$id }); // $id comes from firebase
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
          $scope.classifieds.$remove(classified);
          showToast('Classified Deleted');
            }, function() {
     
        });
      };

        function showToast(message) {
          $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        );
      }
   
      } // classifiedCardController
    });
})();