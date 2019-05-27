/******************************************MODULOS*********************************************/

var iCancha = angular.module('iCancha', [
  'ngRoute', //rutas
  'mobile-angular-ui', //angular
  'mobile-angular-ui.gestures', //gestos (ej: arrastrar el dedo)
  'ngFileUpload', //upload imagenes
  'uiGmapgoogle-maps' //mapa
])

/////ADAPTACION DE PANTALLA

iCancha.run(function($transform) {
  window.$transform = $transform;
});
