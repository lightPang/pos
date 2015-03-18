var siDataUrl = rootUrl + "SetupItem/getSetupItem";
var rtDataUrl = rootUrl + "ReturnType/getReturnTypeData";
var rrDataUrl = rootUrl + "ReturnRecord/getReturnRecord";
var finishUrl = rootUrl + "ReturnRecord/finishReturnRecord";
var createUrl = rootUrl + "ReturnRecord/createReturnRecord";

$(document).ready(function(){
  loadRtData();
  loadSiData();
  loadRRData();
});

function returnClick( show_name, unshow_name ){
  var show = "#" + show_name;
  var unshow = "#" + unshow_name;
  $(show).css('display', 'block');
  $(unshow).css('display', 'none');
}

$("#createRtnBtn").click( function(){
  returnClick( 'list_table', 'createDiv' );
  $("#createDiv").find('span').html('');
  $("#info").val('');
});

$("#sb_returnBtn").click( function() {
  returnClick( 'submit_table', 'submitedDiv' ) ;
  $("#submitedDiv").find('span').html('');
});

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

$("#createBtn").click( function(){
  if( $("#info").val() == "" ) {
    alert("请完整填写信息！");
    $("#info").focus();
    return;
  }
  $.ajax({
    type:'post',
    data : $("#createForm").serialize(),
    url: createUrl,
    success:function(data){
      console.log( data );
      if( data['status'] != '0' ){
        alert( "提交成功!");
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

  $.ajax({
    type:'post',
    url : rrDataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      var rrItem = data['data'];
      for( var k in rrItem ){
        var id = "#sb_" + k ;
        $(id).find('span').html( rrItem[k] );
      }
    }
  });
}

function loadFOrder( rr_id ){
  $("#finished_table").css('display','none');
  $("#finishedDiv").css('display','block');
  $.ajax({
    type:'post',
    url : rrDataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      console.log(data);
      var rrItem = data['data'];
      for( var k in rrItem ){
        var id = "#fh_" + k ;
        $(id).find('span').html( rrItem[k] );
      }
      var stateTxt = '';
      switch( rrItem['state'] ){
        case '2' :
          stateTxt = '已完成';
          break;
        case '3' :
          stateTxt = '已接机';
          break;
        case '4':
          stateTxt = '已拒绝';
          break;
      }
      $("#fh_state").find('span').html(stateTxt);
    }
  });
}

function confirmOrder( rr_id ){
  $("#confirmed_table").css('display','none');
  $("#completeDiv").css('display','block');
  $.ajax({
    type:'post',
    url : rrDataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      var rrItem = data['data'];
      for( var k in rrItem ){
        var id = "#cp_" + k ;
        $(id).find('span').html( rrItem[k] );
      }
      $("#cp_rr_id").val( rrItem['rr_id'] );
    }
  });
}

function updateRow( si_id ){
  $("#list_table").css('display','none');
  $("#createDiv").css('display','block');
  $.ajax({
    type:'post',
    url : siDataUrl,
    data : { 'si_id' : si_id },
    success:function(data){
      var item = data['data'][0];
      for( var k in item ){
        var id = "#ct_" + k;
        $(id).find('span').html( item[k] );
      }
      $("#ct_si_id").val( item['si_id'] );
    }
  });
}

function loadRtData(){
  $.ajax({
    type : 'post',
    url : rtDataUrl,
    success:function(data){
      var dataArr = data['data'];
      var options = '';
      for( var i = 0 ; i < dataArr.length; ++ i ){
        options += "<option value = '" + dataArr[i]['rt_id']  + "'>" +dataArr[i].name + "</option>";
      }
      $("#rt_id").append( options );
    }
  });
}

function loadRRData(){
  $.ajax({
    type:'post',
    url : rrDataUrl,
    success:function(data){
      var dataArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editBtnTxt = '<a class="green" href="#" onclick="confirmOrder(';
      var editBtnTxtEnd = ')"><i class="icon-print  align-top bigger-110 icon-info-sign"></i></a>';
      var showFTxt = '<a class="green" href="#" onclick="loadFOrder(';
      var showFTxtEnd =')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var idArr = ['table_submited','table_confirmed','table_finished'];
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
        var stateTxt = '';
        var btnTxt = '';
        var btnTxtEnd = '';
        var arrIndex = 1;
        btnTxt = showBtnTxt;
        btnTxtEnd = showBtnTxtEnd;
        switch(item['state']){
          case '0':
            stateTxt = '已提交';
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            arrIndex = 0;
            break;
          case '1':
            stateTxt = '已确认';
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            arrIndex = 1;
            break;
          case '2':
            stateTxt = '已完成';
            btnTxt = showFTxt;
            btnTxtEnd = showFTxtEnd;
            arrIndex = 2;
            row.push( stateTxt );
            break;
          case '3':
            stateTxt = '已还机';
            btnTxt = showFTxt;
            btnTxtEnd = showFTxtEnd;
            arrIndex = 2;
            row.push( stateTxt );
            break;
          case '4':
            stateTxt = '未通过';
            btnTxt = showFTxt;
            btnTxtEnd = showFTxtEnd;
            arrIndex = 2;
            row.push( stateTxt );
            break;
          default:
            stateTxt = '装机中';
            break;
        }
        row.push( btnTxt+ item['rr_id'] + btnTxtEnd);
        rowsArr[arrIndex].push( row );
      }
      var aoColDef = [ null,null,  null, null,  { "bSearchable" :false, "bSortable": false }];
      var aoColDefArr = Array();
      aoColDefArr.push( aoColDef );
      aoColDefArr.push( aoColDef );
      var newAoColDef = [ null,null,  null, null, null,  { "bSearchable" :false, "bSortable": false }];
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

function loadSiData(){
  $.ajax({
    type:'post',
    url : siDataUrl,
    success:function(data){
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmlEnd = ')\"><i class=\"icon-pencil bigger-130\"></i></a>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item["m_code"] );
        row.push( item['m_tcode']);
        row.push( item['addr'] );
        row.push( item['setup_time'] );
        row.push( editHtml + item['rt_id'] + editHtmlEnd  );
        if( item['return_id'] =='' )
          rows.push(row);
      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#si_list_table' ) ) {
        oTable1 = $('#si_list_table').dataTable();
      }
      else {
  
      oTable1 = $('#si_list_table').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null,null,null,null, { "bSearchable":false, "bSortable": false }
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
      oTable1.fnClearTable();
      if(rows.length > 0)
        oTable1.fnAddData( rows );
    }
  });
}