/* 
 * global controller
 *
 * 최상위 컨트롤러
 *
 * History
 * v1.0 - 최초 작성, subicura(2013/10/06)
 */
'use strict';

angular.module('rtsClientApp')
  .controller('GlobalCtrl', function ($scope, $location, $state) {
    $scope.$state = $state;
    $scope.$location = $location;
  });
