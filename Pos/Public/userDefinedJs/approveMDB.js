/***
*function used to produce mdb with selected data
*
*
***/
function produceMDB(){
  $soIdArr = $("input.apr-soId");
  $inputs = $("input[type=checkbox]:checked");
  var soIdList = "";
  for( var i =0 ; i < $inputs.length; ++i ){
    soIdList += ($soIdArr.eq(i)).val() + ',';
  }
  console.log( soIdList );
}