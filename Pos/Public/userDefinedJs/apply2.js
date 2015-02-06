var rootUrl = '/pos/Pos/index.php/';
var soDataUrl = rootUrl + 'Apply/getSoData';
var soItemUrl = rootUrl + '/Apply/getSoItem';
var delSetupItemUrl = rootUrl + 'SetupItem/del';
var setupItemUrl = rootUrl + 'SetupItem/getSetupItem';

$(document).ready(function(){
  loadOrderData();
  loadEditSetupOrder( 1 );
});

$("#returnBtn").click(function(){
  $("#showOrder").css('display','none');
  $("#table-div").css('display','block');
  $("#showOrder").find('span').html('');
});

function loadEditSetupOrder( soId ){
  $("#table-div").css('display','none');
  $("#showOrder").css('display','none');
  $("#EditOrder").css('display','block');
  $.ajax({
    type:'post',
    dataType:'json',
    data:{
      'soId' :soId
    },
    url : soItemUrl,
    success:function(data){
      var soItem = data['data'];
      //console.log(soItem);
      if( soItem['ac_time']  != null )
        soItem['ac_time'] = soItem['ac_time'].split(' ')[0];
      if( soItem['active_date'] != null )
        soItem['active_date'] = soItem['active_date'].split(' ')[0];
      if( soItem['register_date'] != null )
        soItem['register_date'] = soItem['register_date'].split(' ')[0];
      for( var key in soItem ){
        var id = "#update_" + key;
        if( $(id).length != 0 ){
          $(id).val( soItem[key] );
        }
      }
      loadUpdateSiTableData();
    }
  })
}

function loadSetupOrder(soId){
  $("#table-div").css('display','none');
  $("#showOrder").css('display','block');
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
        var id = "#" + key;
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

      $('#contractDownload').attr('onclick',"downloadFile("+soItem['contract_file_id']+")")
      $("#taxDownload").attr('onclick',"downloadFile("+soItem['tax_file_id']+")");
      $("#licenseDownload").attr('onclick',"downloadFile("+soItem['license_file_id']+")");
      $("#cardDownload").attr('onclick',"downloadFile("+soItem['card_file_id']+")");
      $("#passportDownload").attr('onclick',"downloadFile("+soItem['passport_file_id']+")");
      $("#authDownload").attr('onclick',"downloadFile("+soItem['auth_file_id']+")");
      $("#clientImgDownload1").attr('onclick',"downloadFile("+soItem['client_img_1_id']+")");
      $("#clientImgDownload2").attr('onclick',"downloadFile("+soItem['client_img_2_id']+")");
      $("#clientImgDownload3").attr('onclick',"downloadFile("+soItem['client_img_3_id']+")");
      var rows = [];
      var soList = soItem['siList'];
      for( var i = 0 ; i < soList.length; ++ i ){
        var item = soList[i];
        var row = [];
        row.push(item['addr']);
        row.push(item['expandUser']);
        row.push(item['maintainUser']);
        row.push(item['machineType']);
        row.push(item['m_code']);
        row.push(item['keyboardType']);
        row.push(item['keyboard_code']);
        row.push(item['simType']);
        row.push(item['m_tcode']);
        row.push(item['annual_fee']);
        row.push( item['deposit_fee'] );
        row.push(item['remark']);
        rows.push(row);
      }
      loadTable( '#si-table', rows) ;
    }
  });
}


function loadTable(id,data){
  var html = '';
  for( var i = 0 ; i < data.length; ++i ){
    var row = '<tr>';
    for( var j = 0 ; j < data[i].length; ++j ){
      row += '<td>' + data[i][j] + '</td>';
    }
    row += '</tr>';
    html += row;
  }
  $(id).find('tbody').html(html);
}

function loadOrderData(){
  $.ajax({
    type:'post',
    dataType:'json',
    url:soDataUrl,
    success:function(data){
      //console.log( data['data'] );
      var soArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editBtnTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var editBtnTxtEnd = ')"><i class="icon-print  align-top bigger-110 icon-info-sign"></i></a>';
      for( var i = 0; i < soArr.length; ++i ){
        var item = soArr[i];
        var row = [];
        row.push( item['so_number']);
        row.push( item['client_name'] );
        row.push( item['client_number'] );
        row.push( item['billBank']);
        row.push( item['ac_time'] );
        var stateTxt = '';
        var btnTxt = '';
        var btnTxtEnd = '';
        switch(item['state']){
          case '0':
            stateTxt = '暂存';
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            break;
          case '1':
            stateTxt = '已提交';
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            break;
          case '2':
            stateTxt = '审核通过';
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            break;
          case '3':
            stateTxt = '装机完成';
            btnTxt = showBtnTxt;
            btnTxtEnd = showBtnTxtEnd;
            break;
        }
        row.push( stateTxt);
        row.push( btnTxt+ item['so_id'] + btnTxtEnd);
        rows.push( row );
      }
      var oTable;
      if( $.fn.dataTable.isDataTable( '#order-table' ) ){
        oTable = $("#order-table").dataTable();
      }
      else{
        oTable = $("#order-table").dataTable({
          "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null,null,  null, null, null, null, { "bSortable": false }
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

      oTable.fnClearTable();
      if( rows.length>0 )
        oTable.fnAddData( rows );
    }
  });
}

function loadUpdateSiTableData(){
  var si_list = $("#update_si_list").val();
  $.ajax({
    type:'POST',
    dataType:"json",
    data: { "si_list" : si_list}, 
    url: siDataUrl,
    success: function( data){
      if( data['data'] == null ) return;
      //console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<td><div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"editUpdateRow(';
      var editHtmlEnd =          ')\"><i class=\"icon-pencil bigger-130\"></i>\
                                </a>';
      var delHtml =            '<a class=\"red\" href=\"#\" onclick=\"deleteUpdateRow(';
      var delHtmlEnd =          ')\">\
                                  <i class=\"icon-trash bigger-130\"></i>\
                                </a>\
                              </div></td>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item["si_id"] );
        row.push( item["addr"] );
        row.push( item["expandUser"] );
        row.push( item["mType"] );
        row.push( item["keyboardType"]);
        row.push( item["simType"] );
        row.push( item["annual_fee"] );
        row.push( item["deposit_fee"]);
        row.push( "<span class='" + item['si_id'] + "'>" + item["remark"] + "</span>");
        row.push( editHtml + item['si_id'] + editHtmlEnd +delHtml + item['si_id'] + delHtmlEnd );
        rows.push(row);
      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#update_machineListTable' ) ) {
        oTable1 = $('#update_machineListTable').dataTable();
      }
      else {
  
      oTable1 = $('#update_machineListTable').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null,
                        null,  
                        null,
                        null,
                        null, 
                        null,
                        null, 
                        null, 
                        null,
                        { "bSortable": false }
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
     if( rows.length > 0 )
      oTable1.fnAddData( rows );
    }
  }
  );
}

function editUpdateRow( si_id ){
  $.ajax({
    type:'post',
    url: setupItemUrl,
    data :{
      'si_id' : si_id
    },
    success: function(data){
      var setupItem = data['data'];
      //console.log( setupItem );
      $("#si_addr").val( setupItem['addr'] );
      $("#si_phone").val( setupItem['phone'] );
      $("#si_m_type").val( setupItem['m_type'] );
      $("si_keyboard_type").val( setupItem['keyboard_type'] );
      $("#si_sim_type").val( setupItem['sim_type'] );
      $("#si_sim_id").val( setupItem['sim_id'] );
      $("input[type='radio'][name='has_annual'][value='"+setupItem['has_annual']+"']").attr('checked','checked');
      $("#si_annual_fee").val( setupItem['annual_fee'] );
      $("input[type='radio'][name='has_deposit'][value='"+setupItem['has_deposit']+"']").attr('checked','checked');    
      $("#si_deposit_fee").val( setupItem['deposit_fee']);
      $("#si_expand_user").val( setupItem['expand_user'] );
      $("#si_remark").val( setupItem['remark'] );
      $("#si_id").val( setupItem['si_id'] );
      $("#si_so_id").val( setupItem['so_id'] );
      $("#si_type").html('1');
      $("#setup_item").dialog( "open");
    }
  });
  
}

function deleteUpdateRow(si_id){
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delSetupItemUrl,
      data: {'si_id' : si_id },
      success: function(data){
        console.log(data);
        if( data['status'] != false ){
          var si_list = $("#update_si_list").val();
          si_list = si_list.replace( si_id + ',' ,'' );
          $("#update_si_list").val( si_list);
          alert("删除成功！");
          $span = $("#update_machineListTable").find('.'+si_id);
          $tr = $("."+si_id).parents('td').parents('tr');
          console.log($tr);
          $tr.addClass('remove');
          var table = $('#update_machineListTable').DataTable();
          table.row('.remove').remove().draw();
        }
        else{
           alert("删除失败！");
        }
      }
    });
    
  }
}