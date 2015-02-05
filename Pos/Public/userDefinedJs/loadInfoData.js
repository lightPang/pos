var infoDataUrl = "/pos/Pos/index.php/Common/getInfoData";

$(document).ready(function(){
  loadInfoData();
});

function loadInfoData(){
  $.ajax({
    type:'post',
    url:infoDataUrl,
    success: function(res){
      var data = res['data'];
      console.log(data);
      loadExtraData('ap_id',data['province'],'ap_id','name');
      loadExtraData('ac_id', data['city'],'ac_id','name','ap_id');
      loadExtraData( 'ad_id', data['district'],'ad_id','name','ac_id' );
      loadExtraData( 'bill_b_id', data['bank'],'b_id','name' );
      loadExtraData( 'bo_id', data['bankop'],'bo_id','name' );
      loadExtraData( 'ca_id', data['clientAttr'],'ca_id','name' );
      loadExtraData( 'cp_id', data['clientPlatform'],'cp_id','name' );
      loadExtraData( 'si_expand_user',data['user'],'u_id','name');
      loadExtraData('si_m_type', data['machineType'], 'mt_id','mt_name');
      loadExtraData('si_keyboard_type', data['keyboardType'], 'mt_id','mt_name');
      loadExtraData('si_sim_type', data['sim'], 'mt_id','mt_name');

      loadMccData( 'mi_id',data['mcc'],'mi_id' );
      loadRateData('cr_inner_id',data['ri'], 1);
      loadRateData('cr_outer_id',data['ro'],0);

    }
  });
}

function loadMccData(name,data){
  var dataArr = data;
  var options = "";
  var displayStr = "'>"; 
  for( var i = 0 ; i < dataArr.length; ++ i ){
    options += "<option value = '" + dataArr[i]['mi_id'] + displayStr + dataArr[i].code + ' ' +dataArr[i].remark + "</option>";
  } 
  var selectName = "#" + name;
  var updateName = "#update_" + name;
  $(selectName).append( options);
  $(updateName).append( options);
}

function loadRateData(name,data,type){
  var dataArr = data;
  var options = "";
  var displayStr = "'>"; 
  for( var i = 0 ; i < dataArr.length; ++ i ){
    options += "<option value = '" + dataArr[i]['cr_id'] + displayStr + dataArr[i].rate  + "</option>";
  } 
  var selectName = "#" + name;
  var updateName = "#update_" + name;
  $(selectName).append( options);
  $(updateName).append( options);
}

function loadExtraData( name,data,id,attr_name,class_id){    
  if( data==null ) return;
  var dataArr = data;
  var options = "";
  var displayStr = "'>";  
  for( var i = 0 ; i < dataArr.length; ++ i ){
    if( typeof(class_id) != "undefined" )
      displayStr = "' class = '" + dataArr[i][class_id] + displayStr;
      options += "<option value = '" + dataArr[i][id] + displayStr + dataArr[i][attr_name] + "</option>";
  } 
  var selectName = "#" + name;
  var updateName = "#update_" + name;
  if( name===""){
    console.log(data);
    console.log( options);}
  $(selectName).append( options);
  $(updateName).append( options);
}