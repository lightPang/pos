$(document).ready(function(){
	loadMCTData();
	createDialog();
});

var types = ["POS机", "键盘", "SIM卡", "其它"];

function createDialog(){
  $("#dialog-modal").dialog({
                height: 850,
                width: 700,
                dialogClass: "no-close",
                modal: true,
                autoOpen: false

            });
}

function updateRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  console.log( $tdlist.length);
  var mt_id = $tdlist.get(0);
  var mt_name = $tdlist.get(1);
  var mt_number = $tdlist.get(2);
  var mt_type = jQuery.inArray( $( $tdlist.get(3) ).html(), types);
  var is_wired = $( $tdlist.get(4) ).html() == "有" ? 0 : 1;
  var is_keyboard = $( $tdlist.get(5) ).html() == "是" ? true : false;
  var is_simed = $( $tdlist.get(6) ).html() =="是" ? true : false;
  var mt_remark = $tdlist.get(7);
  console.log( $(mt_name).html() );
  $("#mt_id").val( $(mt_id).html() );
  $("#updateName").val( $(mt_name).html() );
  $("#updateNumber").val( $(mt_number).html() );
  $("#updateType option").eq(mt_type).attr("selected", true);
  $("input[name=update_is_wired]").eq(is_wired).attr("checked",'checked');
  $("input[name=update_is_keyboard]").attr("checked", is_keyboard);
  $("input[name=update_is_simed]").attr("checked", is_simed);
  $("#updateRemark").val( $(mt_remark).html());
  $("#dialog-modal").dialog( "open");
}

function deleteRow(ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  console.log( $tr.find('td').html() );
  var mt_id = $tr.find('td').html();
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:'/pos/Pos/index.php/MachineType/delete',
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
  $("#dialog-modal").dialog('close');
});

$('#updateBtn').click( function(){
  var url = $('#updateForm').attr('action'),
      mt_id=$('#mt_id').val(),
      mt_name=$("input[name=updateName]").val(),
      mt_number=$("input[name=updateNumber]").val(),
      type=$("#updateType").val(),
      is_wired=$("input[name=update_is_wired]:checked").val(),
      is_keyboard=$("input[name=update_is_keyboard]:checked").val() ? 1 : 0,
      is_simed=$("input[name=update_is_simed]:checked").val() ? 1 : 0,
      remark=$("#updateRemark").val();

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
      url: url,
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
          $("#dialog-modal").dialog("close");
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
    url:"/pos/Pos/index.php/MachineType/search",
    success: function( data){
      var MCTArr = data['data'];
      var rows = [];
      var editHtml = '<tr>'+ 
                '<td><div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"updateRow(this)\">\
																	<i class=\"icon-pencil bigger-130\"></i>\
																</a>\
																<a class=\"red\" href=\"#\" onclick=\"deleteRow(this)\">\
																	<i class=\"icon-trash bigger-130\"></i>\
																</a>\
															</div></tr>';
      for( var i=0; i<MCTArr.length; ++i ){
        var item = MCTArr[i];
        var row = [];
        row.push( item["mt_id"] );
        row.push( item["mt_name"] );
        row.push( item["mt_number"] );
        row.push( types[ item["mt_type"] ]);
        row.push( item["is_wired"] == 1 ? '有' : '无' );
        row.push( item["is_keyboard"] == 1 ? '是' : '否' );
        row.push( item["is_simed"] == 1 ? '是' : '否' );
        row.push( item["remark"]);
        row.push( item["create_time"] );
        row.push( item["edit_time"] );
        row.push( editHtml  );
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
                        null,  null, null,null, null, null,null,
                        null,null, null, { "bSortable": false }
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