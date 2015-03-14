var dataUrl = rootUrl +'MachineStoring/searchOrder';
var addUrl = rootUrl + "MachineStoring/addOrder";
var delUrl = rootUrl + "MachineStoring/deleteOrder";
$(document).ready(function(){
	loadOrderData();
});

$("#m_type").change(function(){
	$("#clearMachineBtn").click();
});

$("#m_list").bind('input propertychange', function(){
	var content = $(this).val();
	var list = new Array();
	list = content.split("\n");
  var row = 0;
  for(var i = 0; i < list.length; i++){
    if(list[i] != "")
      row++;
  }
	$("#quantity").val(row);
});

$("#clearMachineBtn").click(function(){
	$("#m_list").html("");
	$("#quantity").val(0);
});

$("#update_m_list").bind('input propertychange', function(){
  var content = $(this).val();
  var list = new Array();
  list = content.split("\n");
  var row = 0;
  for(var i = 0; i < list.length; i++){
    if(list[i] != "")
      row++;
  }
  $("#update_quantity").val(row);
});

$("#update_clearMachineBtn").click(function(){
  $("#update_m_list").html("");
  $("#update_quantity").val(0);
});

$("#addBtn").click(function(){
	if(validInput()){
		$(this).attr('disabled', true);
		var m_list = $("#m_list").val(),
			m_type = $("#m_type").val(),
			quantity = $("input[name=quantity]").val(),
			price = $("input[name=price]").val()
			sum_price = $("input[name=sum_price]").val(),
			pay_state = $("#pay_state").val(),
			pay_remark = $("#remark").val();

	    $.ajax({
	      type:'POST',
	      url:addUrl,
	      data: {'m_list' : m_list,
	      		 'm_type' : m_type,
	      		 'quantity' : quantity,
	      		 'price' : price,
	      		 'sum_price' : sum_price,
	      		 'pay_state' : pay_state,
	             'pay_remark' : pay_remark},
	      success: function(data){
	        if(data['status'] == 1){
	        	clearInput();
            loadOrderData();
	        }
	          
	      	alert(data['info']);
	        $('#addBtn').attr('disabled', false);
	      }
	    });
	}
});

function clearInput(){
  var inputs = $('#addOrderForm').find('input');
  for( var i = 0; i < inputs.length; ++i ){
    $(inputs[i]).val("")  ;
  }
  var textarea = $('textarea');
  for( var i = 0; i < textarea.length; ++ i ){
    $(textarea[i]).val("") ;
  }

  $("#quantity").val(0);
}

function validInput(){
	var flag = true;

	if( $("#m_list").val() == "")
		flag = false;

	if( $("#price").val() == ""){
		$("#error_price").html("请输入合法单价");
		flag = false;
	}
  else{
    $("#error_price").html("");
  }

	if( $("#sum_price").val() == ""){
		$("#error_sum_price").html("请输入合法总价");
		flag = false;
	}
  else{
    $("#error_sum_price").html("");
  }

	return flag;
}

var pay_states = ["完成", "未付", "付款部分"];
function updateRow(o_id ){
  $("#tableContent").css('display','none');
  $("#updateDiv").css('display','block');
  $.ajax({
    type : 'post',
    data : { 'o_id' : o_id },
    url : dataUrl,
    success : function(data){
      console.log( data );
      var item = data['data'];
      for( var k in item ){
        var id = "#update_" + k;
        $(id).val( item[k] );
      }
      $("#item_id").val( item['o_id'] );
      loadModifyRecord();
    }
  });
}

$('#cancelBtn').click( function(){
  $("#tableContent").css('display','block');
  $("#updateDiv").css('display','none');
  $("#record_table").find('tbody').html('');
  $("#updateBtn").attr('disabled',false);
});

$('#updateBtn').click( function(){
  var url = $('#updateForm').attr('action'),
      o_id=$('#update_o_id').val(),
      m_list = $("#update_m_list").val(),
      m_type = $("#update_m_type").val(),
      quantity = $("input[name=update_quantity]").val(),
      price = $("input[name=update_price]").val()
      sum_price = $("input[name=update_sum_price]").val(),
      pay_state = $("#update_pay_state").val(),
      pay_remark = $("#update_remark").val();

  if(price == ""){
    $('#update_error_price').html("请输入合法单价");
    }
  if(sum_price == ""){
    $('#update_error_sum_price').html("请输入合法总价");
  }
  if(price!="" && sum_price!=""){
    $("#updateBtn").attr('disabled',true);

    console.log(url);
    $.ajax({
      type:'POST',
      url: url,
      data: { 'o_id' : o_id,
              'm_list' : m_list,
              'm_type' : m_type,
              'quantity' : quantity,
              'price' : price,
              'sum_price' : sum_price,
              'pay_state' : pay_state,
              'pay_remark' : pay_remark},
      success: function(data){
        console.log(data);
        if( data['status'] == 1 ){
          loadOrderData();
          alert( "修改成功！");
          loadModifyRecord();
        }
        else{
          alert( "修改失败！");
        }

        $("#updateBtn").attr('disabled',false);
      }
      }
    );
  } 
});

function deleteRow(o_id,ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url: delUrl,
      data: {'o_id' : o_id },
      success: function(data){
        console.log(data);
        if( data['data'] != false ){
          var table = $('#sample-table-2').DataTable();
          table.row('.remove').remove().draw();
          alert("删除成功！");
        }
        else{
           alert("删除失败！");
        }
      }
    });
    
  }
}

function loadOrderData(){
  $.ajax({
    type:'POST',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      var Arr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\"><a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmlEnd = ')\"><i class=\"icon-pencil bigger-130\"></i></a>';
			var delHtml = '<a class=\"red\" href=\"#\" onclick=\"deleteRow(';
      var delHtmlEnd = ',this)\"><i class=\"icon-trash bigger-130\"></i></a></div>';
      var pay_states = ['未付款','付款部分','已完成'];
      for( var i=0; i<Arr.length; ++i ){
        var item = Arr[i];
        var row = [];
        row.push( item["o_code"] );
        row.push( item["m_list"]);
        row.push( item["quantity"] );
        row.push( item["price"] );
        row.push( item["sum_price"]);
        row.push( pay_states[ item["pay_state"] ]);
        row.push( item["pay_remark"] );
        row.push( editHtml + item['o_id'] + editHtmlEnd + delHtml + item['o_id'] + delHtmlEnd  );
        rows.push(row);
      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#sample-table-2' ) ) {
        oTable1 = $('#sample-table-2').dataTable();
      }
      else {
  
      oTable1 = $('#sample-table-2').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null, null, null,null, null, null, null,  { "bSortable": false }
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
  }
  );
}