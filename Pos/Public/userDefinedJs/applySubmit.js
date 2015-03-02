var rootUrl = "/pos/Pos/index.php/";
var UaDataUrl = rootUrl + "Apply/getSubmitDataByPage";
var aprDataUrl = rootUrl + "Apply/getPassedDataByPage";

$(document).ready(function(){
  loadOrderData( $("#type").val() );
});



