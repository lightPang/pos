var soDataUrl = '/pos/Pos/index.php/Apply/getSoData';
var soItemUrl = '/pos/Pos/index.php/Apply/getSoItem'
$(document).ready(function(){
  loadOrderData();
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
      console.log(data);
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