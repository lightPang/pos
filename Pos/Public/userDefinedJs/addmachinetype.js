var dataUrl = rootUrl +'MachineType/search';
var delUrl = rootUrl + 'MachineType/delete';
var upadteUrl = rootUrl + "MachineType/update";
$(document).ready(function(){
	loadMCTData();
});

var types = ["POS机", "键盘", "SIM卡", "其它"];

function updateRow(mt_id){
  $("#tableContent").css('display','none');
  $("#updateDiv").css('display','block');
  $.ajax({
    type:'post',
    data : { 'mt_id' : mt_id },
    url : dataUrl,
    success : function( data ){
      var item = data['data'];
      for( var k in item ){
        var id = "#update_" + k;
        $(id).val( item[k] );
      }
      $("#item_id").val( item['mt_id'] );
      var is_wired = item['is_wired'] == 1 ? true : false;
      var is_simed = item['is_simed'] == 1 ? true : false;
      var is_keyboard = item['is_keyboard'] == 1 ? true : false;
      $("input[name=update_is_keyboard]").prop("checked", is_keyboard);
      $("input[name=update_is_simed]").prop("checked", is_simed);
      $("input[name=update_is_wired][value="+ item['is_wired'] +"]").prop( 'checked', true);
      loadModifyRecord();
    }
  });
}

function deleteRow(mt_id,ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url: delUrl     ,
      data: {'mt_id' : mt_id },
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

$('#cancelBtn').click( function(){
  $("#tableContent").css('display','block');
  $("#updateDiv").css('display','none');
  $("#record_table").find('tbody').html('');
  $("#updateBtn").attr('disabled',false);
});

$('#updateBtn').click( function(){
  var url = $('#updateForm').attr('action'),
      mt_id=$('#update_mt_id').val(),
      mt_name=$("#update_mt_name").val(),
      mt_number=$("#update_mt_number").val(),
      type=$("#update_mt_type").val(),
      is_wired=$("input[name=update_is_wired]:checked").val(),
      is_keyboard=$("input[name=update_is_keyboard]:checked").val() ? 1 : 0,
      is_simed=$("input[name=update_is_simed]:checked").val() ? 1 : 0,
      remark=$("#update_remark").val();

  if(mt_name == ""){
    $('#update_error_name').html("机器名称不能为空");
    }
  if(mt_number == ""){
    $('#update_error_number').html("机型号不能为空");
  }
  if(mt_name!="" && mt_number!=""){
    $("#updateBtn").attr('disabled',true);

    console.log(url);
    $.ajax({
      type:'POST',
      url: updateUrl,
      data: { 'mt_id' : mt_id,
              'mt_name' : mt_name,
              'mt_number' : mt_number,
              'mt_type' : type,
              'is_wired' : is_wired,
              'is_keyboard' : is_keyboard,
              'is_simed' : is_simed,
              'remark' : remark},
      success: function(data){
        console.log(data);
        if( data['status'] == 1 ){
          loadMCTData();
          alert( "修改成功！");
          $("#updateBtn").attr('disabled',false);
          loadModifyRecord();
        }
        else{
          alert( "修改失败！");
        }

        $("#updateBtn").attr('disabled',false);
      }
    });
  } 
});

//input area focus and blur event
$('input[name=updateName]').focus(function(){
  $('#update_error_name').html("");
})
.blur(function(){
  if($(this).val() == ""){
    $('#update_error_name').html("机器名称不能为空");
  }
});

$('input[name=updateNumber]').focus(function(){
  $('#update_error_number').html("");
})
.blur(function(){
  if($(this).val() == ""){
    $('#update_error_number').html("机型号不能为空");
  }
});

$('#addbtn').click(function(event){
		event.preventDefault();
		var form = $('#addmachinetypeform'),
			url = form.attr('action'),
			mp_id=$('#m_provider').val(),
			mt_name=$("input[name=mt_name]").val(),
			mt_number=$("input[name=mt_number]").val(),
			type=$("#type").val(),
			is_wired=$("input[name=is_wired]:checked").val(),
			is_keyboard=$("input[name=is_keyboard]:checked").val() ? 1 : 0,
			is_simed=$("input[name=is_simed]:checked").val() ? 1 : 0,
			remark=$("#remark").val();
		if(mt_name == ""){
			$('#error_name').html("机器名称不能为空");
		}
		if(mt_number == ""){
			$('#error_number').html("机型号不能为空");
		}
		if(mt_name!="" && mt_number!=""){
			$(this).attr('disabled', true);

			$.post(url,
				   {mp_id:mp_id,
				   	mt_name:mt_name,
				   	mt_number:mt_number,
				   	mt_type:type,
				   	is_wired:is_wired,
				   	is_keyboard:is_keyboard,
				   	is_simed:is_simed,
				   	remark:remark},
				   	function(data){
				   		alert(data);
              loadMCTData();
				   	})
			.complete(function(){
				$('#addbtn').attr('disabled', false);
				clearInput();
			});
		}
});

function clearInput(){
  var inputs = $('#addmachinetypeform').find('input');
  for( var i = 0; i < inputs.length; ++i ){
    $(inputs[i]).val("")  ;
  }
  var textarea = $('textarea');
  for( var i = 0; i < textarea.length; ++ i ){
    $(textarea[i]).val("") ;
  }
}

//input area focus and blur event
$('input[name=mt_name]').focus(function(){
	$('#error_name').html("");
})
.blur(function(){
	if($(this).val() == ""){
		$('#error_name').html("机器名称不能为空");
	}
});

$('input[name=mt_number]').focus(function(){
	$('#error_number').html("");
})
.blur(function(){
	if($(this).val() == ""){
		$('#error_number').html("机型号不能为空");
	}
});

function loadMCTData(){
  $.ajax({
    type:'POST',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      var MCTArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmlEnd = ')\"><i class=\"icon-pencil bigger-130\"></i></a>';
      var delHtml = '<a class=\"red\" href=\"#\" onclick=\"deleteRow(';
      var delHtmlEnd = ',this)\"><i class=\"icon-trash bigger-130\"></i></a></div>';
      for( var i=0; i<MCTArr.length; ++i ){
        var item = MCTArr[i];
        var row = [];
        row.push( item["mt_name"] );
        row.push( item["mt_number"] );
        row.push( types[ item["mt_type"] ]);
        row.push( item["is_wired"] == 1 ? '有' : '无' );
        row.push( item["is_keyboard"] == 1 ? '是' : '否' );
        row.push( item["is_simed"] == 1 ? '是' : '否' );
        row.push( item["remark"]);
        row.push( editHtml + item['mt_id'] + editHtmlEnd + delHtml + item['mt_id'] + delHtmlEnd );
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
                        null, null,null, null, null,null,
                        null, { "bSearchable":false, "bSortable": false }
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