$(document).ready(function(){
	loadMCTData();
});

$('#addbtn').click(function(event){
		event.preventDefault();
		var form = $('#addmachinetypeform'),
			url = form.attr('action'),
			mp_id=$('#m_provider').val(),
			mt_name=$("input[name=mt_name]").val(),
			mt_number=$("input[name=mt_number]").val(),
			type=$("#type").val(),
			is_wired=$("input[name=is_wired]:checked").val() ? 1 : 0,
			is_identified=$("input[name=is_identified]:checked").val() ? 1 : 0,
			is_worked=$("input[name=is_worked]:checked").val() ? 1 : 0,
			is_keyboard=$("input[name=is_keyboard]:checked").val() ? 1 : 0,
			is_simed=$("input[name=is_simed]:checked").val() ? 1 : 0,
			remark=$('remark').val();
			
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
				   	type:type,
				   	is_wired:is_wired,
				   	is_identified:is_identified,
				   	is_worked:is_worked,
				   	is_keyboard:is_keyboard,
				   	is_simed:is_simed,
				   	remark:remark},
				   	function(data){
				   		alert(data);
				   	})
			.complete(function(){
				$('#addbtn').attr('disabled', false);
			});
		}
});

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
});;

function loadMCTData(){
  $.ajax({
    type:'GET',
    dataType:"json", 
    url:"/pos/Pos/index.php/MachineType/search",
    success: function( data){
      var MCTArr = data['data'];
      var rows = [];
      var editHtml = '<tr>'+ 
                '<td><div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\">\
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
        row.push( item["type"] );
        row.push( item["is_identified"] == 1 ? '是' : '否' );
        row.push( item["is_keyboard"] == 1 ? '是' : '否' );
        row.push( item["remark"]);
        row.push( item["is_simed"] == 1 ? '是' : '否' );
        row.push( item["is_worked"] == 1 ? '是' : '否' );
        row.push( item["create_time"] );
        row.push( item["edit_time"] );
        row.push( editHtml  );
        rows.push(row);
      }
      var oTable1 = $('#sample-table-2').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null,  null, null,null, null, null,null,
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
      oTable1.fnClearTable();
      oTable1.fnAddData( rows );
    }
  }
  );
}