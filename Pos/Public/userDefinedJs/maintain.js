var siDataUrl = rootUrl + "SetupItem/getSetupItem";
var userDataUrl = rootUrl + "User/getUserData";
var dataUrl = rootUrl + "Maintain/get";
var createUrl = rootUrl + "Maintain/create";
var updateUrl = rootUrl + "Maintain/update";

$(document).ready(function(){
  loadUserData();
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
  $("#createBtn").css('disabled', false);
});

$("#sb_returnBtn").click( function() {
  returnClick( 'submit_table', 'submitedDiv' ) ;
  $("#submitedDiv").find('span').html('');
});

$("#update_returnBtn").click( function(){
  returnClick( 'submit_table', 'editDiv' ) ;
  $("#editDiv").find('span').html('');
});

$("#updateBtn").click( function(){
  if( $("#update_remark").val() == "" ) {
    alert("请完整填写信息！");
    $("#update_remark").focus();
    return;
  }
  $("#updateBtn").css('disabled', true);
  $.ajax({
    type:'post',
    data : $("#updateForm").serialize(),
    url: updateUrl,
    success:function(data){
      console.log( data );
      if( data['status'] != '0' ){
        alert( "提交成功!");
        loadRRData();
      }
      else{
        alert( data['info'] );
      }
      $("#updateBtn").css('disabled', false);
    }
  });
});

$("#createBtn").click( function(){
  if( $("#remark").val() == "" ) {
    alert("请完整填写信息！");
    $("#remark").focus();
    return;
  }
  $("#createBtn").css('disabled', true);
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
      $("#createBtn").css('disabled', false);
    }
  });
});

function loadUOrder( mr_id ){
  $("#submit_table").css('display','none');
  $("#editDiv").css('display','block');

  $.ajax({
    type:'post',
    url : dataUrl,
    data : { 'mr_id' : mr_id },
    success:function(data){
      console.log(data);
      var item = data['data'];
      for( var k in item ){
        var id = "#ed_" + k ;
        $(id).find('span').html( item[k] );
      }
      var stateTxt = '未分派';
      $("#sb_state").find('span').html( stateTxt );
      $("#update_mr_id").val( item['mr_id'] );
      $("#update_remark").val( item['remark'] );
      $("#update_u_id").val( item['u_id'] );
    }
    
  });
}

function loadOrder( mr_id ){
  $("#submit_table").css('display','none');
  $("#submitedDiv").css('display','block');

  $.ajax({
    type:'post',
    url : dataUrl,
    data : { 'mr_id' : mr_id },
    success:function(data){
      console.log(data);
      var rrItem = data['data'];
      for( var k in rrItem ){
        var id = "#sb_" + k ;
        $(id).find('span').html( rrItem[k] );
      }
      var stateTxt = '';
      switch( rrItem['state'] ){
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
      $("#sb_state").find('span').html( stateTxt );
      $("#item_id").val( rrItem['mr_id']);
      loadModifyRecord();
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

function loadUserData(){
  $.ajax({
    type : 'post',
    data : {'c_id':'ok'},
    url : userDataUrl,
    success:function(data){
      var dataArr = data['data'];
      var options = '';
      for( var i = 0 ; i < dataArr.length; ++ i ){
        options += "<option value = '" + dataArr[i]['u_id']  + "'>" +dataArr[i].name + "</option>";
      }
      $("#u_id").append( options );
      $("#update_u_id").append( options );
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
      var editHtmlEnd = ')\"><i class=\"icon-pencil bigger-130\"></i></a>';
      var delHtml = '<a class=\"red\" href=\"#\" onclick=\"deleteUOrder(';
      var delHtmlEnd = ',this)\"><i class=\"icon-trash bigger-130\"></i></a></div>';
      var showBtnTxt = '<a class="green" href="#" onclick="loadOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var rows = Array();

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
        btnTxt = showBtnTxt;
        btnTxtEnd = showBtnTxtEnd;
        switch(item['state']){
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
        row.push( stateTxt );
        row.push( item['user'] );
        if( item['state'] != '0' )
          row.push( btnTxt+ item['mr_id'] + btnTxtEnd);
        else
          row.push( editHtml + item['mr_id'] + editHtmlEnd + delHtml + item['mr_id'] + delHtmlEnd);
        rows.push( row );
      }

      var newAoColDef = [ null,null,  null, null, null, null, null,{ "bSearchable" :false, "bSortable": false }];

      var tableId = "#table_submited";

        var oTable;
        
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
  });
}

function loadSiData(){
  $.ajax({
    type:'post',
    url : siDataUrl,
    success:function(data){
      console.log( data );
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
        if(  item['maintain_id'] == 0 && item['return_id'] == 0  )
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