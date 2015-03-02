var rootUrl = '/pos/Pos/index.php/';
var delSetupItemUrl = rootUrl + 'SetupItem/del';
var setupItemUrl = rootUrl + 'SetupItem/getSetupItem';

$(document).ready(function(){
  console.log( $("#type").val() );
  loadOrderData($("#type").val());
});

