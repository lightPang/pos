var dataUrl = rootUrl + "Machine/getBroken";
var createUrl = rootUrl + "Maintain/create";
var confirmUrl = rootUrl + "Machine/confirm";
var repairUrl = rootUrl + "Machine/repair";


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


$("#ed_btn").click( function(){
  $.ajax({
    type : 'post',
    data : { 
      "m_id": $("#ed_m_id").val(),
      "is_repair" : $("#is_repair").val(),
    },
    url : repairUrl,
    success:function(data){
      console.log( data );
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

function loadUOrder( id,type ){
  $("#tableDiv").css('display','none');
  var divId = "#" + type + "_Div";
  $(divId).css('display','block');
  var keyName = 'm_id';

  $.ajax({
    type:'post',
    url : dataUrl,
    data : { "m_id" : id },
    success:function(data){
      var item = data['data'];
      for( var k in item ){
        var id = "#" + type + "_" + k ;
        $(id).find('span').html( item[k] );
      }
      var stateId = "#" + type + "_" + "state";
      var keyId = "#" + type + "_" + keyName ;
      $(keyId).val( item[keyName] );
      $(stateId).find('span').html( "坏机" );
    }
    
  });
}

function loadOrder( mr_id,type ){
  $("#submit_table").css('display','none');
  $("#submitedDiv").css('display','block');
  var keyName = "m_id";
  $.ajax({
    type:'post',
    url : dataUrl,
    data : { 'm_id' : mr_id },
    success:function(data){
      console.log(data);
      var item = data['data'];
      for( var k in item ){
        var id = "#" +type +"_"+k ;
        $(id).find('span').html( item[k] );
      }
      var stateTxt = '';

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
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"loadUOrder(';
      var editHtmlEnd = ",\'ed\')\"><i class=\"icon-exclamation-sign bigger-130\"></i></a>";
      var showBtnTxt = '<a class="green" href="#" onclick="loadOrder(';
      var showBtnTxtEnd = ',\'sb\')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var idArr = ['unprocessed_table','table_submited'];
      var rowsArr = Array();
      for( var i = 0 ; i < idArr.length; ++i  )
        rowsArr.push( new Array() );

      for( var i = 0; i < dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        var btnTxt = showBtnTxt;
        var btnTxtEnd = showBtnTxtEnd ;
        row.push( item['m_code'] );
        row.push( item['mType']);
        
        if( item['state'] == '5' ){
          btnTxt = editHtml;
          btnTxtEnd = editHtmlEnd;
          arrIndex = 0;
        }
        else{
          arrIndex = 1;
        }
        row.push( btnTxt+ item['m_id'] + btnTxtEnd);
        rowsArr[arrIndex].push( row );
      }
      
      var newAoColDef = [ null,null, { "bSearchable" :false, "bSortable": false }];

      
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
