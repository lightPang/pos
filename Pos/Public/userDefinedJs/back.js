var siDataUrl = rootUrl + "SetupItem/getSetupItem";
var rtDataUrl = rootUrl + "ReturnType/getReturnTypeData";
var rrDataUrl = rootUrl + "ReturnRecord/getReturnRecord";
var finishUrl = rootUrl + "ReturnRecord/finishReturnRecord";
var createUrl = rootUrl + "ReturnRecord/createReturnRecord";

$(document).ready(function(){
  loadRRData();
});

function returnClick( show_name, unshow_name ){
  var show = "#" + show_name;
  var unshow = "#" + unshow_name;
  $(show).css('display', 'block');
  $(unshow).css('display', 'none');
}



$("#cp_RtnBtn").click(function(){
  returnClick( 'confirmed_table', 'completeDiv' ) ;
  $("#completeDiv").find('span').html('');
});

$("#fh_rtnBtn").click( function(){
  returnClick( 'finished_table', 'finishedDiv' ) ;
  $("#finishedDiv").find('span').html('');
});

$("#cp_Btn").click(function(){
  if( $("#cp_info").val() == '' ){
    alert("请填写完成信息！");
    $("#cp_info").focus();
    return;
  }
  $.ajax({
    type:'post',
    url : finishUrl,
    data : $("#cpForm").serialize(),
    success:function(data){
      console.log(data);
      if( data['status'] != '0' ){
        alert( "修改成功！");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
    }
  });
});

function loadOrder( rr_id ){
  $("#submit_table").css('display','none');
  $("#submitedDiv").css('display','block');
  $("#cp_record").rrPlugin({
    rr_id : rr_id,
    div_prefix : "cp_"
  });
  
}

function loadFOrder( rr_id ){
  $("#finished_table").css('display','none');
  $("#finishedDiv").css('display','block');
  $("#rr_record").rrPlugin({
    rr_id : rr_id,
    div_prefix : "rr_record"
  });
}

function confirmOrder( rr_id ){
  $("#confirmed_table").css('display','none');
  $("#completeDiv").css('display','block');
  $("#cp_record").rrPlugin({
    rr_id : rr_id,
    div_prefix : "cp_"
  });
}

function loadRRData(){
  $.ajax({
    type:'post',
    url : rrDataUrl,
    success:function(data){
      console.log( data );
      var dataArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editBtnTxt = '<a class="green" href="#" onclick="confirmOrder(';
      var editBtnTxtEnd = ')"><i class="icon-print  align-top bigger-110 icon-info-sign"></i></a>';
      var showFTxt = '<a class="green" href="#" onclick="loadFOrder(';
      var showFTxtEnd =')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var idArr = ['table_confirmed','table_finished'];
      var rowsArr = new Array();
      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

      for( var i = 0; i < dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item['m_code']);
        row.push( item['rr_id'] );
        row.push( item['create_time'] );
        row.push( item['confirm_time']);
        row.push( item['user'] );
        var stateTxt = '';
        var btnTxt = '';
        var btnTxtEnd = '';
        var arrIndex = -1;
        btnTxt = showBtnTxt;
        btnTxtEnd = showBtnTxtEnd;
        switch(item['state']){
          case '1':
            stateTxt = '已确认';
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            arrIndex = 0;
            break;
          case '2':
            stateTxt = '已完成';
            btnTxt = showFTxt;
            btnTxtEnd = showFTxtEnd;
            arrIndex = 1;
            row.push( stateTxt );
            break;
          case '3':
            stateTxt = '已还机';
            btnTxt = showFTxt;
            btnTxtEnd = showFTxtEnd;
            arrIndex = 1;
            row.push( stateTxt );
            break;
          default:
            arrIndex = -1;
            break;
        }
        row.push( btnTxt+ item['rr_id'] + btnTxtEnd);
        if( arrIndex != -1)
          rowsArr[arrIndex].push( row );
      }
      var aoColDef = [ null,null,  null, null,null,  { "bSearchable" :false, "bSortable": false }];
      var aoColDefArr = Array();
      aoColDefArr.push( aoColDef );
      var newAoColDef = [ null,null,  null, null, null,null,  { "bSearchable" :false, "bSortable": false }];
      aoColDefArr.push( newAoColDef );

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
          "aoColumns" : aoColDefArr[i],
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