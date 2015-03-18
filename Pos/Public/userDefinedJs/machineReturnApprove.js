var dataUrl = rootUrl + "ReturnRecord/getReturnRecord";
var confirmUrl = rootUrl + "ReturnRecord/confirmReturn";
var userDataUrl = rootUrl + "User/getUserData";

$(document).ready(function(){
  loadRRData();
  loadUserData();
});

$("#if_returnBtn").click( function(){
  $("#tableContent").css('display','block');
  $("#infoDiv").css('display','none');
  $("#infoDiv").find('span').html('');
});

$("#confirmRtnBtn").click( function(){
  $("#list_table").css('display','block');
  $("#createDiv").css('display','none');
  $("#createDiv").find('span').html('');
});

$("#confirmBtn").click( function(){
  $.ajax({
    type:'post',
    url : confirmUrl,
    data : { 'rr_id' : $("#cf_rr_id").val() },
    success:function(data){
      if( data['status'] == '1' ){
        console.log( data );
        alert("确认成功！");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
    }
  });
});


function loadUserData(){
  $.ajax({
    type:'post',
    url: userDataUrl,
    data:{'c_id':'ok'},
    success:function(data){
      var arr = data['data'];
      options = '';
      for( var i = 0 ; i < arr.length; ++i ){
        options += "<option value='" + arr[i]['u_id'] + "'>" + arr[i]['name'] + "</option>";
      }
      $("#u_id").append(options);
    }
  });
}

function confirmReceive(rr_id){
  $("#list_table").css('display','none');
  $("#createDiv").css('display','block');

  $.ajax({
    type:'post',
    url : dataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      var rrItem = data['data'];
      for( var k in rrItem ){
        var id = "#cf_" + k ;
        $(id).find('span').html( rrItem[k] );
      }
      $("#cf_rr_id").val( rrItem['rr_id'] );
    }
  });
}

function loadOrder(rr_id){
  $("#tableContent").css('display','none');
  $("#infoDiv").css('display','block');

  $.ajax({
    type:'post',
    url : dataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      var rrItem = data['data'];
      for( var k in rrItem ){
        var id = "#if_" + k ;
        $(id).find('span').html( rrItem[k] );
      }
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
      var showBtnTxt = '<a class="green" href="#" onclick="loadOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editBtnTxt = '<a class="green" href="#" onclick="confirmReceive(';
      var editBtnTxtEnd = ')"><i class="icon-print  align-top bigger-110 icon-info-sign"></i></a>';
      var idArr = ['si_list_table','receive_list_table'];
      var rowsArr = new Array();
      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

      for( var i = 0; i < dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item['m_code']);
        row.push( item['m_tcode'] );
        row.push( item['addr'] );
        row.push( item['setup_time']);
        row.push( item['returnType'] );
        var stateTxt = '';
        var btnTxt = '';
        var btnTxtEnd = '';
        var arrIndex = -1;
        switch(item['state']){
          case '0':
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            arrIndex = 0;
            break;
          case '1':
            arrIndex = 1;
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            row.push('审核通过');
            break;
          case '2':
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            arrIndex = 1;
            row.push( '确认退机');
            break;
          case '3':
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            row.push( '已接机');
            arrIndex = 1;
            break;
          case '4':
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            row.push('已拒绝');
            arrIndex = 1;
            break;
          default:
            stateTxt = '装机中';
            break;
        }
        row.push( btnTxt+ item['rr_id'] + btnTxtEnd);
        if( arrIndex != -1 )
          rowsArr[arrIndex].push( row );
      }
      var aoColDef = [ null,null,  null, null,null,  { "bSearchable" :false, "bSortable": false }];
      var newAoColDef = [ null,null,  null, null, null, null,{ "bSearchable" :false, "bSortable": false }];
      var aoColDefArr = Array();
      aoColDefArr.push( aoColDef);
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