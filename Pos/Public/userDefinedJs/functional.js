var rootUrl = "/pos/Pos/index.php/";
var recordUrl = rootUrl + "Common/get_record_list";
$(document).ready(
  function(){
  updateTabIndex();
  activeTab();
  }
);

function activeTab(){
  var tab = document.getElementById("activeTab").value;
		if(tab === "")
		{
			tab = 0;
		}
		var $li = $("#menu_bar").find("li");
		var target = $li.get( tab );
    console.log(tab);
		$(target).addClass('active');
    var ul_id = $(target).parent('ul').attr('id');
    if( ul_id != "undefined" ){
      $("#"+ul_id).css("display", "block");
    }
}

function updateTabIndex(){
  var $liList = $('#menu_bar').find('li');
  var $storageList = $("#storage_menu").children('li');
  var $operationList = $("#operate_menu").children('li');
  var $storageLi = $("#storage_li");
  var $operationLi = $("#operation_li");
  if( $storageLi.html() !== "undefined" && $storageList.length == 0 ){
    $storageLi.remove();
  }
  if( $operationLi.html() !== "undefined" && $operationList.length === 0 ){
    $operationLi.remove();
  }
  console.log( $liList.length);
  for( var i = 0; i<$liList.length; ++i ){
    var li = $liList.get(i);
    var a = $($(li).children()).get(0);
    var href = $(a).attr('href');
    $(a).attr('href', href+ (i).toString());
  }
}

/****
function used to download img from server

id is the file id .

****/
function downloadFile(id){
  window.open('/pos/Pos/index.php/File/downloadFileById/id/'+id);
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

function loadMultiModifyRecord(){
  var table_name = $("#table_name").val();
  var item_id = $("#item_id").val();

  $.ajax({
    type:'post',
    data:{
      'table_name':table_name,
      'item_id' : item_id
    },
    url : recordUrl,
    success : function( data ){
      var recordList = data['data'];

      if( recordList != null )
        recordList = alter_key_name( recordList, table_name );
      else
        return;
      
      var rows = Array();
      for( var i = 0; i < recordList.length; ++ i ){
        var row = Array();
        row.push( recordList[i]['name'] );
        row.push( recordList[i]['time'] );
        row.push( recordList[i]['content'] );
        rows.push( row );
      }
      var tableId = "#"+ $("#update_table_name").val();
      loadTable( tableId, rows );
    }
  });

}

function loadModifyRecord(){
  var table_name = $("#table_name").val();
  var item_id = $("#item_id").val();

  $.ajax({
    type:'post',
    data:{
      'table_name':table_name,
      'item_id' : item_id
    },
    url : recordUrl,
    success : function( data ){
      var recordList = data['data'];

      if( recordList != null )
        recordList = alter_key_name( recordList, table_name );
      else
        return;
      
      var rows = Array();
      for( var i = 0; i < recordList.length; ++ i ){
        var row = Array();
        row.push( recordList[i]['name'] );
        row.push( recordList[i]['time'] );
        row.push( recordList[i]['content'] );
        rows.push( row );
      }
      loadTable( "#record_table", rows );
    }
  });
}

function alter_key_name( arr, tableName ){
  var key_arr = Array();
  var data = '';
  switch( tableName ){
    case 'mcc_item':
      data = {"name":"名称", "code":'代码','return_rate':'回扣率', 'is_active':'是否启用','remark':'备注'} ;
      break;
    case 'client_platform':
      data = {"name":"名称", "code":'编码','remark':'备注'};
      break;
    case 'client_rate':
      data = {"name":"名称", "code":'编码','value':'费率', 'value_top' :'封顶费用', 'value_bot':'保底费用','is_active':'是否启用', 'is_inner':'是否属内', 'remark':'备注'};
      break;
    case 'client_attr':
      data = {"name":"名称", "code":'编码','remark':'备注'};
      break;
    case 'bank' :
      data = {"name":"银行全称", "code":'行号', "num" : "编号", "short_name" :"银行简称", "short_en_name" :"银行缩写", "short_num" :"银行简号",'is_active':'是否启用' ,'remark':'备注'};
      break;
    case 'bank_operator' :
      data = { 'b_id': '所属银行' , 'name' :'经办人', 'contact_num' :'联系电话', 'is_active':'是否启用', 'remark' :'备注'};
      break;
    case 'area_city' :
      data = { "name":"名称", "code":'代码', 'is_active':'是否启用', 'ap_id' :'所属省份','remark':'备注' };
      break;
    case 'area_district' :
      data = { "name":"名称", "code":'代码', 'ap_id' :'所属省份','ac_id' :'所属城市', 'is_active':'是否启用','remark':'备注' };
      break;
    case 'machinetype':
      data = {"mt_name":"机型名称","mt_number":"机型号", "is_wired":'有无线',"is_simmed":'是否需要sim', 'is_keyboard':'是否需要键盘' ,'remark':'备注' };
      break;
    case 'order' :
      data = {"m_list":"机器列表", "m_type":'机器型号', 'quantity': "机器数量", 'pay_state':'付款状态', 'price' :'单价', 'sum_price' : '总价' ,'pay_remark':'备注'};
      break;
    case 'deployorder':
      data = {"name":"名称", "m_code_list":'编码' ,'state':'状态','remark':'备注'};
      break;
    case 'pos_type':
      data = {"name":"名称", "code":'机具ID' ,'brand':'机具品牌', 'type' :'机具型号' , 'price':'单价'};
      break;
    default :
      data = {"name":"名称", "code":'编码','remark':'备注'};
      break;
  }
  
  for( var i = 0; i < arr.length; ++ i ){
    var changeArr = arr[i]['content'] ;
    var resArr = '';
    if( arr[i]['content'] == '创建' ){
      resArr = '创建';
    }
    else{
      for( var k in changeArr ){
        resArr += "{ " + data[k] + ' ：' + changeArr[k] + " } ";
        //resArr[ data[k] ] = changeArr[k];
      }
      
    }
    //console.log( resArr.join("")  );
    arr[i]['content'] = resArr;
  }
  return arr;
}
