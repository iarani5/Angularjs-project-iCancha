/******************************************MODULOS*********************************************/

var iCancha = angular.module('iCancha', [
  'ngRoute', //rutas
  'mobile-angular-ui', //angular
  'mobile-angular-ui.gestures', //gestos (ej: arrastrar el dedo)
  'ngFileUpload', //upload imagenes
  //'uiGmapgoogle-maps', //mapa
  //'google-maps', //mapa
  'ui.bootstrap' //modal
]);




/////ADAPTACION DE PANTALLA

iCancha.run(function($transform) {
  window.$transform = $transform;
});
