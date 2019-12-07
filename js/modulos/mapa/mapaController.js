
iCancha.controller("mapaCtrl",  ['$scope', 'uiGmapLogger', 'uiGmapGoogleMapApi', function  ($scope, uiGmapLogger, uiGmapGoogleMapApi) {

  $scope.map = {
    center: {
      latitude: 40.454018,
      longitude: -3.509205
    },
    zoom: 12,
    options : {
      scrollwheel: false
    },
    control: {}
  };
  $scope.marker = {
    id: 0,
    coords: {
      latitude: 40.454018,
      longitude: -3.509205
    },
    options: {
      draggable: true
    }
  };

}]);
