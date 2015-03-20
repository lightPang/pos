var siDataUrl = rootUrl + "SetupItem/getSetupItem";
var dataUrl = rootUrl + "Maintain/get";
var createUrl = rootUrl + "Maintain/create";
var rejectUrl = rootUrl + "Maintain/reject";
var confirmUrl = rootUrl + "Maintain/confirm";
var checkUrl = rootUrl + "Maintain/check";
var changeUrl = rootUrl + "Maintain/change";

$(document).ready(function(){
  loadRRData();
});

function returnClick( prefix ){
  var tableDivId = "#tableDiv";
  var divId = "#" + prefix + "_Div";
  $(tableDivId).css('display', 'block');
  $(divId).css( 'display', 'none');
  $(divId).find('span').html('');
}

$("#cf_rtnBtn").click( function(){
  returnClick( "cf" );
  $("#cf_btn").css('disabled', false);
});

$("#cg_RtnBtn").click( function(){
   returnClick( "cg" );
   $("#cg_btn").css( 'disabled', false );
});

$("#sb_returnBtn").click( function() {
  $("#submit_table").css('display', 'block');
  $("#submitedDiv").css( 'display', 'none');
  $("#submitedDiv").find('span').html('');
});

$("#ed_RtnBtn").click( function(){
  returnClick("ed");
  $("#ed_btn").css( 'disabled', false );
});

$("#cg_btn").click( function(){
  $.ajax({
    type : 'post',
    data : { 
      "mr_id": $("#cg_mr_id").val(),
      "complete_remark" : $("#complete_remark").val()
    },
    url : changeUrl,
    success:function(data){
      if( data['status'] != '0' ){
        alert( "提交成功!");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
      $("#ed_btn").css('disabled', false);
    }
  });
});

$("#ed_btn").click( function(){
  $.ajax({
    type : 'post',
    data : { 
      "mr_id": $("#ed_mr_id").val(),
      "maintain_remark" : $("#maintain_remark").val(),
      "maintain_type" : $("#maintain_type").val()
    },
    url : checkUrl,
    success:function(data){
      if( data['status'] != '0' ){
        alert( "提交成功!");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
      $("#ed_btn").css('disabled', false);
    }
  });
});

$("#cf_btn").click( function(){
  $("#cf_btn").css('disabled', true);
  $.ajax({
    type:'post',
    data : { "mr_id":$("#cf_mr_id").val() },
    url: confirmUrl,
    success:function(data){
      console.log( data );
      if( data['status'] != '0' ){
        alert( "提交成功!");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
      $("#cf_btn").css('disabled', false);
    }
  });
});

$("#rejectBtn").click( function(){
  $("#rejectBtn").css('disabled', true);
  $.ajax({
    type:'post',
    data : { "mr_id":$("#cf_mr_id").val() },
    url: rejectUrl,
    success:function(data){
      console.log( data );
      if( data['status'] != '0' ){
        alert( "提交成功!");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
      $("#rejectBtn").css('disabled', false);
    }
  });
});

function loadUOrder( id,type ){
  $("#tableDiv").css('display','none');
  var divId = "#" + type + "_Div";
  $(divId).css('display','block');
  var keyName = 'mr_id';

  $.ajax({
    type:'post',
    url : dataUrl,
    data : { "mr_id" : id },
    success:function(data){
      console.log(data);
      var item = data['data'];
      for( var k in item ){
        var id = "#" + type + "_" + k ;
        console.log( id );
        $(id).find('span').html( item[k] );
      }
      var stateTxt = '';
      switch( item['state'] ){
        case '0':
          stateTxt = '未分派';
          break;
        case '1':
          stateTxt = '已分派';
          break;
        case '2':
          stateTxt = '已确认';
          break;
        case '3':
          stateTxt = '维修完成';
          break;
        case '4':
          stateTxt = '换机维修中';
          break;
        case '5':
          stateTxt = '换机维修中（仓库已出机）';
          break;
        case '6':
          stateTxt = '换机维修中（仓库已收机）';
          break;
        case '7':
          stateTxt = '确认坏机，维修完成';
          break;
      }
      var stateId = "#" + type + "_" + "state";
      var keyId = "#" + type + "_" + keyName ;
      $(keyId).val( item[keyName] );
      $(stateId).find('span').html( stateTxt );
    }
    
  });
}

function loadOrder( mr_id,type ){
  $("#submit_table").css('display','none');
  $("#submitedDiv").css('display','block');
  var keyName = "mr_id";
  $.ajax({
    type:'post',
    url : dataUrl,
    data : { 'mr_id' : mr_id },
    success:function(data){
      console.log(data);
      var item = data['data'];
      for( var k in item ){
        var id = "#" +type +"_"+k ;
        $(id).find('span').html( item[k] );
      }
      var stateTxt = '';
      switch( item['state'] ){
        case '0':
          stateTxt = '未分派';
          break;
        case '1':
          stateTxt = '已分派';
          break;
        case '2':
          stateTxt = '已确认';
          break;
        case '3':
          stateTxt = '维修完成';
          break;
        case '4':
          stateTxt = '换机维修中';
          break;
        case '5':
          stateTxt = '换机维修中（仓库已出机）';
          break;
        case '6':
          stateTxt = '换机维修中（仓库已收机）';
          break;
        case '7':
          stateTxt = '确认坏机，维修完成';
          break;
      }
      var stateId = "#" + type + "_state";
      var id = "#" + type + "_" + keyName;
      $(stateId).find('span').html( stateTxt );
      $(id).val( item[keyName] );
      $("#item_id").val( item[keyName]);
      loadModifyRecord();
    }
  });
}

function loadRRData(){
  $.ajax({
    type:'post',
    url : dataUrl,
    success:function(data){
      console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"loadUOrder(';
      var confirmHtmlEnd = ',\'cf\')\"><i class=\"icon-exclamation-sign bigger-130\"></i></a>';
      var editHtmlEnd = ",\'ed\')\"><i class=\"icon-exclamation-sign bigger-130\"></i></a>";
      var changeHtmlEnd = ",\'cg\')\"><i class=\"icon-exclamation-sign bigger-130\"></i></a>";
      var showBtnTxt = '<a class="green" href="#" onclick="loadOrder(';
      var showBtnTxtEnd = ',\'sb\')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var idArr = ['unprocessed_table','table_submited'];
      var rowsArr = Array();
      for( var i = 0 ; i < idArr.length; ++i  )
        rowsArr.push( new Array() );

      for( var i = 0; i < dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item['m_code']);
        var typeTxt = '普通维修';
        if( item['is_change'] == 1 ){
          typeTxt = '换机维修';
        }
        row.push( typeTxt );
        row.push( item['create_time'] );
        row.push( item['confirm_time']);
        row.push( item['complete_time'] );
        
        var stateTxt = '';
        var btnTxt = '';
        var btnTxtEnd = '';
        btnTxt = editHtml;
        btnTxtEnd = confirmHtmlEnd;
        var arrIndex = 0;
        switch(item['state']){
          case '0':
            stateTxt = '未分派';
            arrIndex = -1;
            break;
          case '1':
            stateTxt = '已分派';
            break;
          case '2':
            stateTxt = '已确认';
            btnTxtEnd = editHtmlEnd;
            break;
          case '3':
            stateTxt = '维修完成';
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            arrIndex = 1;
            break;
          case '4':
            stateTxt = '换机维修中';
            btnTxtEnd = changeHtmlEnd;
            break;
          case '5':
            stateTxt = '换机维修中（仓库已出机）';
            btnTxtEnd = changeHtmlEnd;
            break;
          case '6':
            stateTxt = '换机维修中（仓库已收机）';
            btnTxtEnd = changeHtmlEnd;
            break;
          case '7':
            stateTxt = '确认坏机';
            btnTxtEnd = changeHtmlEnd;
            arrIndex = 0;
            break;
        }
        row.push( stateTxt );
        row.push( item['user'] );
        row.push( btnTxt+ item['mr_id'] + btnTxtEnd);
        if( arrIndex != -1 )
          rowsArr[arrIndex].push( row );
      }
      console.log( rowsArr);
      var newAoColDef = [ null,null,  null, null, null, null, null,{ "bSearchable" :false, "bSortable": false }];

      
      for( var i = 0 ; i < idArr.length ; ++i ){
        var oTable;
        var tableId = "#" +idArr[i];
        var rows = rowsArr[i];
        if( $.fn.dataTable.isDataTable( tableId ) ){
          oTable = $(tableId).dataTable();
        }
        else{
          oTable = $(tableId).dataTable({
            "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
          "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
          "bPaginate" : true, //是否显示（应用）分页器  
          "aoColumns" : newAoColDef,
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
