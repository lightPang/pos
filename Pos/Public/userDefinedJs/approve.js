var siDataUrl = rootUrl + "SetupItem/getSiData";
var soDataUrl = rootUrl + 'Apply/getSoData';
var soItemUrl = rootUrl + 'Apply/getSoItem';
var siItemUrl = siItemUrl = rootUrl + 'SetupItem/getSetupItem';
var passUrl = rootUrl + "Approve/passApply";
var dispatchUrl = rootUrl + 'Approve/dispatch';
var userDataUrl = rootUrl + 'User/getUserData';
$(document).ready(function(){
  loadOrderData(0);
  loadSiData();
});

function loadOrderData(){
  $.ajax({
    type:'post',
    dataType:'json',
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
      var idArr = ['ua_table','apr_table','ok_table'];
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
            checkboxClass = 'apr';
            opTxt = showBtnTxt + item['so_id'] + ",3" + showBtnTxtEnd;
            arrIndex = 1;
            break;
          case '8':
            stateTxt = '装机完成';
            opTxt = showBtnTxt + item['so_id'] + ",6" + showBtnTxtEnd;
            arrIndex = 2;
            break;
          default:
            stateTxt = '装机完成';
            arrIndex = -1;
            break;
        }
        if( checkboxClass != ''  ){
          row.push( checkBoxTxt + checkboxClass + checkBoxMid + item['so_id'] + '-' + item['bill_b_id'] + checkboxEnd );
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
          if( i == 1 || i == 3 ){
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

function loadSiData(){
  $.ajax({
    type:'post',
    dataType:'json',
    data :{
      'state' : "0"
    },
    url:siItemUrl,
    success:function(data){
      //console.log( data['data'] );
      var soArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadSetupItem(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editTxtEnd = ')"><i class="icon-exclamation-sign align-top bigger-110 icon-check"></i></a>';
      var idArr = ['back_table','loaded_table'];
      var checkBoxTxt = "<input type='checkbox' class='print-checkbox loaded' value='";
      var checkboxEnd = "'/>";
      var rowsArr = Array();
      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

      for( var i = 0; i < soArr.length; ++i ){
        var item = soArr[i];
        var row = [];
        var arrIndex = 1;
        var btnTxt = '123';
        var btnTxtEnd = '';
        var stateTxt = '';
        switch(item['state']){
          case '1':
            stateTxt = '待分配';
            arrIndex = 0;
            btnTxtEnd = editTxtEnd;
            break;
          case '2':
            stateTxt = '已分派';
            arrIndex = 0;
            btnTxtEnd = editTxtEnd;
            break;
          case '7':
            stateTxt = '已确认';
            arrIndex = 0;
            btnTxtEnd = editTxtEnd;
            break;
          case '3' :
          case '8' :
            stateTxt = '已回填';
            arrIndex = 1;
            row.push( checkBoxTxt + item['so_id'] + '-' + item['si_id'] + checkboxEnd );
            btnTxtEnd = showBtnTxtEnd;
            break;
          default:
            arrIndex = -1;
            break;
        }
        row.push( item['so_number']);
        row.push( item['client_name'] );
        row.push( item['addr'] );
        row.push( item['m_code'] );
        row.push( item['version'] );
        
        var type = '';
        if( item['type'] == 0 ){
          type = '直联';
        }
        else{
          type = '间联';
        }
        row.push( type );
        row.push( stateTxt);
        btnTxt = showBtnTxt + item['si_id'] + ',' + arrIndex.toString() + ',' + item['state'];
        row.push( btnTxt + btnTxtEnd );
        if( arrIndex != -1 )
        rowsArr[arrIndex].push( row );
      }
      var secondAoConfig = [null,null,  null, null, null, null, null,{ "bSearchable" :false, "bSortable": false }];
      var firstAoConfig = [ { "bSearchable" :false, "bSortable": false },null,null,  null, null, null, null, null,{ "bSearchable" :false, "bSortable": false }];
      var aoConfig = Array();
      aoConfig.push( secondAoConfig );
      aoConfig.push( firstAoConfig );
      for( var i = 0 ; i < idArr.length; ++ i ){
        var oTable;
        var tableId = "#" + idArr[i];

        rows = rowsArr[i];
        if( $.fn.dataTable.isDataTable( tableId ) ){
          oTable = $(tableId).dataTable();
        }
        else{
          oTable = $(tableId).dataTable({
            "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
          "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
          "bPaginate" : true, //是否显示（应用）分页器  
          "aoColumns" : aoConfig[i],
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
        oTable.fnClearTable();
        if( rows.length>0 )
          oTable.fnAddData( rows );
      }
    }
  });
}

function loadSetupItem( si_id, prefixId,state){
  var prefix = '';
  prefixId = prefixId.toString();
  switch (prefixId){
    case '0':
      prefix = 'back_';
      break;
    case '1':
      prefix = 'loaded_';
      break;
  }
  var tableId = "#" + prefix + "table-div";
  var itemDiv = "#" + prefix + 'itemDiv';
  var orderId = "#" + prefix + "showOrder";
  console.log( itemDiv );
  $("#si_id").val( si_id );
  $(tableId).css('display','none');
  $(orderId).css('display','block');
  $("#user_select").css('display','none');
  if( state == '1' ){
    $("#user_select").css('display','block');
    $.ajax({
      type: 'post',
      data : { 'c_id' : 'c'},
      url : userDataUrl,
      success : function( data ){
        var userData = data['data'];
        var options = '';
        for( var i = 0 ; i < userData.length; ++ i ){
          options += "<option value='" + userData[i]['u_id'] + "'>" + userData[i]['name'] + "</option>";
        }
        $("#setup_user").html('');
        $("#setup_user").append( options );
      }
    });
  }

  $(itemDiv).siPlugin({
    "si_id" : si_id,
    "div_prefix" : prefix + "_content_"
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
    case '7':
      prefix = 'loaded_';
      break;
    case '8':
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


$("#dispatchBtn").click(function(){
  if( $("#setup_user").val() == '' ){
    alert('请选择用户！');
    return;
  }
  $.ajax({
    type:'post',
    data:{
      'si_id' : $("#si_id").val(),
      "setup_user" : $("#setup_user").val()
    },
    url : dispatchUrl,
    success : function(data ){
      if( data['status'] == '1' ){
        alert("分派成功！");
        loadSiData();
        return;
      }
      else{
        alert("状态错误！");
      }
    }
  });
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

