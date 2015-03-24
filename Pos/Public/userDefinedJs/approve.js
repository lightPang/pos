var siDataUrl = rootUrl + "SetupItem/getSiData";
var soDataUrl = rootUrl + 'Apply/getSoData';
var soItemUrl = rootUrl + 'Apply/getSoItem';
var passUrl = rootUrl + "Approve/passApply";
var dispatchUrl = rootUrl + 'Approve/dispatch';
$(document).ready(function(){
  createDialog();
  loadOrderData(0);

});

function loadOrderData(type){
  $.ajax({
    type:'post',
    dataType:'json',
    data:{'type':type},
    url:soDataUrl,
    success:function(data){
      //console.log( data['data'] );
      var soArr = data['data'];
      var rows = [];
      var confirmTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var confirmTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var dispatchBtnTxt = '<a class="green" href="#" onclick="loadDispatchOrder(';
      var dispatchBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var showBtnTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var idArr = ['ua_table','apr_table','back_table','loaded_table','ok_table'];
      var rowsArr = new Array();
      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

      for( var i = 0; i < soArr.length; ++i ){
        var item = soArr[i];
        var row = [];
        var checkboxClass = '';
        var checkBoxTxt = "<input type='checkbox' class='apr-checkbox ";
        var checkBoxMid = "' value='";
        var checkboxEnd = "'/>";
        var stateTxt = '';
        var opTxt = '';
        var arrIndex = -1;
        switch(item['state']){
          case '1':
            stateTxt = '已提交';
            opTxt = confirmTxt + item['so_id'] + ",1" + confirmTxtEnd;
            arrIndex = 0;
            break;
          case '2':
            stateTxt = '已审批';
            opTxt = showBtnTxt + item['so_id'] + ",2" + showBtnTxtEnd;
            checkboxClass = 'apr';
            arrIndex = 1;
            break;
          case '3':
            stateTxt = '已导出MDB';
            opTxt = showBtnTxt + item['so_id'] + ",3" + showBtnTxtEnd;
            arrIndex = 1;
            break;
          case '4':
            stateTxt = '已导入MDB';
            opTxt = dispatchBtnTxt + item['so_id']  + dispatchBtnTxtEnd;
            arrIndex = 2;
            break;
          case '5':
            stateTxt = '装机完成';
            opTxt = showBtnTxt + item['so_id'] + ",5" + showBtnTxtEnd;
            checkboxClass = 'loaded';
            arrIndex = 3;
            break;
          default:
            stateTxt = '装机完成';
            opTxt = showBtnTxt + item['so_id'] + ",6" + showBtnTxtEnd;
            arrIndex = 4;
            break;
        }
        if( checkboxClass != ''  ){
          row.push( checkBoxTxt + checkboxClass + checkBoxMid + item['so_id'] + checkboxEnd );
        }
        var typeTxt = '';
        if( item['type'] == '0' ){
          typeTxt = '直联';
        } 
        else{
          typeTxt = '间联';
        }
        row.push( item['so_number']);
        row.push( item['client_name'] );
        row.push( item['client_number'] );
        row.push( item['billBank']);
        row.push( item['ac_time'] );
        row.push( typeTxt );
        row.push( stateTxt);
        row.push( opTxt );
        if( arrIndex != -1 )
          rowsArr[arrIndex].push( row );
      }
      for( var i = 0 ; i < idArr.length; ++ i ){
        var oTable;
        var tableId = "#" + idArr[i];
        rows = rowsArr[i];
        if( $.fn.dataTable.isDataTable( tableId ) ){
          oTable = $(tableId).dataTable();
        }
        else{
          if( i == 1  ){
            oTable = $(tableId).dataTable({
              "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
            "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
            "bPaginate" : true, //是否显示（应用）分页器  
            "aoColumns" : [
                           { "bSortable": false }, null,null,  null, null, null,null, null, { "bSortable": false }
                          ],
            "oLanguage": { //国际化配置  
                    "sProcessing" : "正在获取数据，请稍后...",    
                    "sLengthMenu" : "显示 _MENU_ 条",    
                    "sZeroRecords" : "没有您要搜索的内容",    
                    "sInfo" : "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",    
                    "sInfoEmpty" : "记录数为0",    
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",    
                    "sInfoPostFix" : "",    
                    "sSearch" : "搜索",    
                    "sUrl" : "",    
                    }
            }); 
          }
          else{
            oTable = $(tableId).dataTable({
              "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
            "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
            "bPaginate" : true, //是否显示（应用）分页器  
            "aoColumns" : [
                            null,null,  null, null, null,null, null, { "bSortable": false }
                          ],
            "oLanguage": { //国际化配置  
                    "sProcessing" : "正在获取数据，请稍后...",    
                    "sLengthMenu" : "显示 _MENU_ 条",    
                    "sZeroRecords" : "没有您要搜索的内容",    
                    "sInfo" : "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",    
                    "sInfoEmpty" : "记录数为0",    
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",    
                    "sInfoPostFix" : "",    
                    "sSearch" : "搜索",    
                    "sUrl" : "",    
                    }
            }); 
          }  
        }
        oTable.fnClearTable();
        if( rows.length>0 )
          oTable.fnAddData( rows );
      }

      
    }
  });
}

function loadDispatchOrder(soId){
  var prefix = 'back_';
  var tableId = "#" + prefix + "table-div";
  var orderId = "#" + prefix + "showOrder";
  $(tableId).css('display','none');
  $(orderId).css('display','block');
  $.ajax({
    type:'post',
    dataType:'json',
    data:{
      'soId' : soId,
      'flag' : '1'
    },
    url:soItemUrl,
    success:function(data){
      //console.log(data);
      var soItem  = data['data']['soItem'];
      var userList = data['data']['user'];
      var options = '';
      for( var i = 0 ; i < userList.length; ++ i ){
        options += "<option value = '" + userList[i]['u_id']  + "'>" + userList[i]['name']  + "</option>";
      } 
      $("#u_id").append( options );
      $("#dispatch_so_id").val( soItem['so_id'] );
      for(var key in soItem){
        var id = "#" + prefix + key;
        if( $(id).find('span') != null ){
          $(id).find('span').html( soItem[key] );
        }
      }
      $stateSpan = $("#state").find('span');
      switch ($stateSpan.html()){
        case '1':
          $stateSpan.html('已提交');
      }
      $urgentSpan = $("#is_urgent").find('span');
      switch ($urgentSpan.html()){
        case '0':
          $urgentSpan.html("否");
        case '1' :
          $urgentSpan.html("是");
      }
      var idList = ["contractDownload","taxDownload","licenseDownload","cardDownload","passportDownload","authDownload","clientImgDownload1","clientImgDownload2","clientImgDownload3"];
      var keyList = ['contract_file_id','tax_file_id','license_file_id','card_file_id','passport_file_id','auth_file_id','client_img_1_id','client_img_2_id','client_img_3_id'];
      for( var j = 0; j<idList.length; ++j ){
        var id = "#" + prefix + idList[j];
        if( soItem[ keyList[j] ] == null )
          $(id).css('display','none');
        else
          $(id).attr( 'onclick', "downloadFile("+soItem[ keyList[j] ]+")");

      }
      $("#ua_so_id").val( soItem['so_id'] );
      $("#ua_c_id").val( soItem['c_id'] );  
      var rows = [];
      var soList = soItem['siList'];
      var keyboardCodeInput = "<input type='text' class='required' name='keyboard_code[]' />";
      var mCodeInput = "<input type='text' class='required' name='m_code[]' />";
      var keyboardInput = "<input type='hidden' name='keyboard_type[]' value='";
      var inputEnd = "'/>";
      for( var i = 0 ; i < soList.length; ++ i ){
        var item = soList[i];
        var row = [];
        var mCodeTxt = '';
        var keyboardCodeTxt = '';
        var mTypeTxt = '';
        var keyboardTypeTxt = '';
        mCodeTxt = item['m_code'];
        keyboardCodeTxt = item['keyboard_code'];
        mTypeTxt = item['machineType'];
        keyboardTypeTxt = item['keyboardType'];
        row.push(item['addr']);
        row.push(item['expandUser']);
        row.push( item['machineType'] );
        row.push( mCodeInput );
        row.push( item['keyboardType'] );
        row.push( keyboardInput );
        row.push(item['simType']);
        row.push( simInput );
        row.push(item['annual_fee']);
        row.push( item['deposit_fee'] );
        row.push(item['remark']);
        rows.push(row);
      }
      console.log( rows );
      var siTableId = "#" + prefix + "si-table";
      loadTable( siTableId, rows) ;
    }
  });
}

function loadSetupOrder(soId,prefixId){
  var prefix = '';
  prefixId = prefixId.toString();
  switch (prefixId){
    case '1':
      prefix = 'ua_';
      break;
    case '2':
      prefix = 'apr_';
      break;
    case '3':
      prefix = 'apr_';
      break;
    case '5':
      prefix = 'loaded_';
      break;
    case '6':
      prefix = 'ok_';
      break;
  }
  var tableId = "#" + prefix + "table-div";
  var orderId = "#" + prefix + "showOrder";
  $(tableId).css('display','none');
  $(orderId).css('display','block');
  $.ajax({
    type:'post',
    dataType:'json',
    data:{
      'soId' : soId
    },
    url:soItemUrl,
    success:function(data){
      //console.log(data);
      var soItem  = data['data'];
      for(var key in soItem){
        var id = "#" + prefix + key;
        if( $(id).find('span') != null ){
          $(id).find('span').html( soItem[key] );
        }
      }
      $stateSpan = $("#state").find('span');
      switch ($stateSpan.html()){
        case '1':
          $stateSpan.html('已提交');
      }
      $urgentSpan = $("#is_urgent").find('span');
      switch ($urgentSpan.html()){
        case '0':
          $urgentSpan.html("否");
        case '1' :
          $urgentSpan.html("是");
      }
      var idList = ["contractDownload","taxDownload","licenseDownload","cardDownload","passportDownload","authDownload","clientImgDownload1","clientImgDownload2","clientImgDownload3"];
      var keyList = ['contract_file_id','tax_file_id','license_file_id','card_file_id','passport_file_id','auth_file_id','client_img_1_id','client_img_2_id','client_img_3_id'];
      for( var j = 0; j<idList.length; ++j ){
        var id = "#" + prefix + idList[j];
        if( soItem[ keyList[j] ] == null )
          $(id).css('display','none');
        else
          $(id).attr( 'onclick', "downloadFile("+soItem[ keyList[j] ]+")");

      }
      $("#ua_so_id").val( soItem['so_id'] );
      $("#ua_c_id").val( soItem['c_id'] );  
      var rows = [];
      var soList = soItem['siList'];
      var mTypeTxt = "<input type='hidden' name='m_type[]' value='";
      var simTypeTxt = "<input type='hidden' name='sim_type[]' value='";
      var keyboardTypeTxt = "<input type='hidden' name='keyboard_type[]' value='";
      var mCodeInput = "<input type='text' class='required' name='m_code[]' value='";
      var simInput = "<input name='sim_code[]' class='required' value='";
      var keyboardInput = "<input  class='required' name='keyboard_code[]' value='";
      var inputEnd = "'/>";
      for( var i = 0 ; i < soList.length; ++ i ){
        var item = soList[i];
        var row = [];
        var mCodeTxt = '';
        var simCodeTxt = '';
        var keyboardCodeTxt = '';
        var keyboardType = '';
        var simType = '';
        var mType = '';
        if( prefixId != 1 ){
          mCodeTxt = item['m_code'];
          keyboardCodeTxt = item['keyboard_code'];
          simCodeTxt = item['sim_code'];
          mType = item['machineType'];
          keyboardType = item['keyboardType'];
          simType = item['simType'];
        }
        else{
          mCodeTxt = mCodeInput + item['m_code'] + inputEnd ;
          keyboardCodeTxt = keyboardInput + item['keyboard_code'] + inputEnd  ;
          keyboardType = keyboardTypeTxt + item['keyboard_type'] + inputEnd + item['keyboardType'];
          mType = mTypeTxt + item['m_type'] + inputEnd + item['machineType'];
          if( item['sim_type'] != '' ){
            simType = '';
            simInput = '';
          }
          else{
            simType = simTypeTxt + item['sim_type'] + inputEnd + item['simType'];
            simInput = simInput + item['sim_code'] + inputEnd ;
          }
        }
        row.push(item['addr']);
        row.push(item['expandUser']);
        if( prefixId != 1 )
        row.push(item['maintainUser']);
        row.push( mType );
        row.push( mCodeTxt );
        row.push( keyboardType );
        row.push( keyboardCodeTxt );
        row.push( simType );
        row.push( simCodeTxt );
        if( prefixId != 1)
        row.push(item['m_tcode']);
        row.push(item['annual_fee']);
        row.push( item['deposit_fee'] );
        row.push(item['remark']);
        rows.push(row);
      }
      var siTableId = "#" + prefix + "si-table";
      loadTable( siTableId, rows) ;
    }
  });
}


/****
function used to create a dialog

****/
function createDialog(){
  $("#setup_item").dialog({
    height: 400,
    width: 1000,
    modal: true,
    dialogClass: "no-close",
    autoOpen: false
    });
}

/****
function used to initial the dialog to fill in data about machines

****/
function passApply(){
  $("#ua_passBtn").attr('disabled','true');
  var inputs = $("#ua_si_form").find('input');
  var flag = 1;
  for( var i = 0 ; i < inputs.length; ++i ){
    if(  $(inputs[i]).hasClass('required') && $(inputs[i]).val() === "" ){
      alert( "请完整填写表单内容！" );
      $(inputs[i]).focus();
      flag = 0;
      break;
    }
  }
  if( flag == 0 ) {
    $("#ua_passBtn").attr('disabled', false);
    return;
  }
  $.ajax({
    type:'POST',
    url: passUrl,
    data:$('#ua_si_form').serialize(),
    success:function(data){
      console.log( data['data'] );
      if( data['status'] == 1 ){
        alert('修改成功!');
        loadOrderData(0);
      }
      else{
        alert( data['info'] );
      }
      $("#ua_passBtn").attr('disabled', false);
    }
    });
}

/****
function used to cancel the dialog
****/
$("#cancelBtn").click(function(){
  $("#updateBtn").attr('disabled',false);
  $("#setup_item").dialog('close');
});

$("#dispatch_confirmBtn").click( function(){
  console.log(123);
  var flag = confirm("确定分派给此人？");
  if( flag == true ){
    console.log( $('#dispatch_form').serialize() );
    $.ajax({
      type:'POST',
      url : dispatchUrl,
      data:$('#dispatch_form').serialize(),
      success:function(data){
        console.log( data );
        var res = data['status'];
        if( res == '1' ){
          alert( '分配成功！' );
          loadOrderData();
          $('#dispatch_content').html('装机人：' + data['data']);
        }
        else{
          alert('分配失败！');
        }
      }
    });
  }
    
});

/*
all the click functions of the return button
*/
$("#ua_returnBtn").click(function(){
  $("#ua_table-div").css('display','block');
  $("#ua_showOrder").css('display','none');
  $("#ua_showOrder").find('span').html('');
  $("#ua_si-table").find('tbody').html('');
  $("#ua_passBtn").attr('disabled', false);
});

$("#apr_returnBtn").click( function(){
  $("#apr_table-div").css('display', 'block');
  $("#apr_showOrder").css("display",'none');
  $("#apr_showOrder").find('span').html('');
  $("#apr_si-table").find('tbody').html('');
});

$("#mdb_returnBtn").click( function(){
  $("#mdb_table-div").css('display', 'block');
  $("#mdb_showOrder").css("display",'none');
  $("#mdb_showOrder").find('span').html('');
  $("#mdb_si-table").find('tbody').html('');
});

$("#loaded_returnBtn").click( function(){
  $("#loaded_table-div").css('display', 'block');
  $("#loaded_showOrder").css("display",'none');
  $("#loaded_showOrder").find('span').html('');
  $("#loaded_si-table").find('tbody').html('');
});

$("#back_returnBtn").click( function(){
  $("#back_table-div").css('display', 'block');
  $("#back_showOrder").css("display",'none');
  $("#back_showOrder").find('span').html('');
  $("#back_si-table").find('tbody').html('');
});

