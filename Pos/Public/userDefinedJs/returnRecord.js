var siDataUrl = rootUrl + "SetupItem/getSetupItem";
var rtDataUrl = rootUrl + "ReturnType/getReturnTypeData";
var rrDataUrl = rootUrl + "ReturnRecord/getReturnRecodr";
var finishUrl = rootUrl + "ReturnRecord/finishReturnRecord";

$(document).ready(function(){});

function loadOrder( rr_id ){
  $.ajax({
    type:'post',
    url : rrDataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){

    }
  });
}

function loadFOrder( rr_id ){
  $.ajax({
    type:'post',
    url : rrDataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      
    }
  });
}

function confirmOrder( rr_id ){
  $.ajax({
    type:'post',
    url : rrDataUrl,
    data : { 'rr_id' : rr_id },
    success:function(data){
      
    }
  });
}

function updateRow( si_id ){
  $.ajax({
    type:'post',
    url : siDataUrl,
    data : { 'si_id' : so_id },
    success:function(data){
      
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
        options += "<option value = '" + dataArr[i]['rt_id']  + '">' +dataArr[i].name + "</option>";
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

      for( var i = 0; i < soArr.length; ++i ){
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
            btnTxtEnd = showTxtEnd;
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
        row.push( btnTxt+ item['so_id'] + btnTxtEnd);
        rowsArr[arrIndex].push( row );
      }
      var aoColDef = [ null,null,  null, null, null, null, { "bSearchable" :false, "bSortable": false }];
      var aoColDefArr = Array();
      aoColDefArr.push( aoColDef );
      aoColDefArr.push( aoColDef );
      aoColDef = [ null,null,  null, null, null, null, { "bSearchable" :false, "bSortable": false }];
      aoColDefArr.push( aoColDef );
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
          "aoColumns" : aoColDef[i],
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