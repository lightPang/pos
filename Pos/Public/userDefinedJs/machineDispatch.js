$(document).ready(function(){
	dispatchedNum = new Array($("#m_type option").length);
	for(var i = 0; i < dispatchedNum.length; i++){
		dispatchedNum[i] = 0;
	}

	loadDeployOrderData();
	loadAgreedDeployOrderData();
	loadDisagreedDeployOrderData()
	createDialog();
});

function createDialog(){
  $("#dialog-modal-agree").dialog({
                height: 'auto',
                width: '30%',
                dialogClass: "no-close",
                modal: true,
                autoOpen: false
    });

  $("#dialog-modal-disagree").dialog({
                height: 'auto',
                width: '30%',
                dialogClass: "no-close",
                modal: true,
                autoOpen: false
    });
}

function agreeRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  var inputs = $tdlist.get(0);
  var do_id = $($(inputs).find("input").get(0)).val();

  $("#agree_do_id").val(do_id);
  $("#dialog-modal-agree").dialog( "open");
}

$('#agreeBtn').click( function(){
	$("#agreeBtn").attr('disabled',true);

    $.ajax({
      type:'POST',
      url: "/pos/Pos/index.php/MachineDispatch/agreeDeployOrder",
      data: $("#agreeForm").serialize(),
      success: function(data){
        console.log(data);
        if( data['status'] == 1){
          alert( "同意设备调拨成功！");
          $("#dialog-modal-agree").dialog("close");
          $("#agree_remark").val("");
          loadDeployOrderData();
          loadAgreedDeployOrderData();
        }
        else{
          alert( "同意设备调拨失败: " + data['info']);
        }

        $("#agreeBtn").attr('disabled',false);
      }
    });
});

function disagreeRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  var inputs = $tdlist.get(0);
  var do_id = $($(inputs).find("input").get(0)).val();

  $("#disagree_do_id").val(do_id);
  $("#dialog-modal-disagree").dialog( "open");
}

$('#disagreeBtn').click( function(){
	$("#disagreeBtn").attr('disabled',true);

    $.ajax({
      type:'POST',
      url: "/pos/Pos/index.php/MachineDispatch/disagreeDeployOrder",
      data: $("#disagreeForm").serialize(),
      success: function(data){
        console.log(data);alert(data.toSource());
        if( data['status'] == 1){
          alert( data['info'] );
          $("#dialog-modal-disagree").dialog("close");
          $("#disagree_remark").val("");
          loadDeployOrderData();
          loadDisagreedDeployOrderData();
        }
        else{
          alert( data['info'] );
        }

        $("#disagreeBtn").attr('disabled',false);
      }
    });
});

$('#agree_cancelBtn').click( function(){
  $("#dialog-modal-agree").dialog('close');
  $("#agree_remark").val("");
});

$('#disagree_cancelBtn').click( function(){
  $("#dialog-modal-disagree").dialog('close');
  $("#disagree_remark").val("");
});

$("#out_company").change(function(){
	var selected = $(this).val();
	$("#in_company option").each(function(){
		$(this).attr("disabled", false);
	});

	$("#in_company option[value="+selected+"]").attr("disabled", true);
});

$("#in_company").change(function(){
	var selected = $(this).val();
	$("#out_company option").each(function(){
		$(this).attr("disabled", false);
	});

	$("#out_company option[value="+selected+"]").attr("disabled", true);
});

$("#m_type").change(function(){
	var m_type = $(this).val();

	$.ajax(
		{
			type:'POST',
    		dataType:"json",
    		data: {"m_type": m_type},
    		url:"/pos/Pos/index.php/MachineDispatch/getMachineQuantity",
    		success: function( data){
    			$("#valid_quantity").val(data['data'] - dispatchedNum[getSelectIndex("m_type", $("#m_type option:selected").val())]);
	    	}
	    });
});

$("#addMachineType").click(function(){
	var out_company = $("#out_company option:selected").val();
	var in_company = $("#in_company option:selected").val();
	var quantity = $("#quantity").val();
	var valid_quantity = $("#valid_quantity").val();
	if( out_company != "" && in_company != "" && quantity != ""){
		if( quantity <= valid_quantity && valid_quantity != 0 && quantity > 0){
			var newRow = "<tr>" +
						"<td>" +
							"<input type=\"hidden\" value=\"" + $("#out_company option:selected").val() + "\" />" +
							"<input type=\"hidden\" value=\"" + $("#in_company option:selected").val() + "\" />" +
							"<input type=\"hidden\" value=\"" + $("#m_type option:selected").val() + "\" />" +
							"<input type=\"hidden\" value=\"" + $("#quantity").val() + "\" />" +
						"</td>" +
						"<td class=\"center\">"+$("#out_company option:selected").text()+"</td>" +
						"<td class=\"center\">"+$("#in_company option:selected").text()+"</td>" +
						"<td class=\"center\">"+$("#m_type option:selected").text()+"</td>" +
						"<td class=\"center\">"+$("#quantity").val()+"</td>" +
						"<td><div class=\"center action-buttons\">\
								<a class=\"blue\" href=\"#\" onclick=\"deleteRow(this)\">\
									<i class=\"icon-trash bigger-160\"></i>\
								</a> \
							 </div> \
						</td>" +
					  "</tr>";
			
			$("#addRecord tr:last").after(newRow);

			dispatchedNum[getSelectIndex("m_type", $("#m_type option:selected").val() )] += quantity;
			$("#valid_quantity").val(valid_quantity - quantity);
			$("#quantity").val("");
		}
		else{
			alert("调出数量不合法！");
		}
	}
});

function getSelectIndex(selectId, value){
	var index = 0;
	var options = $("#" + selectId + " option");
	for(var i=0; i<options.length; i++){
		if($(options[i]).val() == value){
			return index;
		}
		index++;
	}
}

function deleteRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  var ids = $tdlist.get(0);
  var inputs = $(ids).find("input");
  var m_type = $(inputs).get(2);
  var quantity = $(inputs).get(3);
  
  dispatchedNum[getSelectIndex("m_type", $(m_type).val())] -= $(quantity).val();
  console.log(dispatchedNum);
  $tr.remove();

  if($(m_type).val() == $("#m_type option:selected").val()){
  	$("#valid_quantity").val(parseInt( $("#valid_quantity").val() ) + parseInt( $(quantity).val() ));
  }
}

$("#addBtn").click(function(){
	var trs = $("#addRecord tr");
	var deployOrders = new Array();
	for(var i=1; i<trs.length; i++){
		var order = {};
		var $tdlist = $(trs[i]).find($('td'));
		var ids = $tdlist.get(0);
		var inputs = $(ids).find('input');

		order['source_c'] = $( $(inputs).get(0) ).val();
		order['target_c'] = $( $(inputs).get(1) ).val();
		order['m_type'] = $( $(inputs).get(2) ).val();
		order['quantity'] = $( $(inputs).get(3) ).val();

		deployOrders.push(order);
	}
	console.log(deployOrders);
	
	if(deployOrders.length > 0){
		$(this).attr("disabled", true);
		$.ajax({
				type: 'POST',
				dataType: 'json',
				data: {'deployOrders': deployOrders},
				url: '/pos/Pos/index.php/MachineDispatch/addDeployOrders',
				success: function( data){
    				if(data['data']){
    					alert("添加成功！");

    					var trs = $("#addRecord tr");
    					for(var i=1; i<trs.length; i++){
    						$(trs[i]).remove();
    					}
              loadDeployOrderData();
    				}
    				else{
    					alert("添加失败！");
    				}
    			}
		});

		$(this).attr("disabled", false);
	}
});

function loadDeployOrderData(){
	$.ajax({
    type:'POST',
    dataType:"json",
    data: {'state': 0},
    url:"/pos/Pos/index.php/MachineDispatch/getDeployOrders",
    success: function( data){
      var Arr = data['data']; console.log(data);
      var rows = [];
      var editHtml = '<td> \
      					<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons center\">\
							<a class=\"green\" href=\"#\" onclick=\"agreeRow(this)\">\
								<button class="btn btn-info btn-xs">同意</button>\
							</a>\
							<a class=\"red\" href=\"#\" onclick=\"disagreeRow(this)\">\
								<button class="btn btn-info btn-xs">拒绝</button>\
							</a>\
						</div> \
					</td>';
	  if(Arr)
	      for( var i=0; i<Arr.length; ++i ){
	        var item = Arr[i];
	        var row = [];
	        row.push( "<input type=\"hidden\" value=\"" + item["do_id"] + "\" />" );
	        row.push( item["source_c"] );
	        row.push( item["target_c"] );
	        row.push( item["m_type"]);
	        row.push( item["quantity"] );
	        row.push( item["create_user"]);
	        row.push( item["create_time"]);
	        row.push( item["edit_user"] );
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
                        { "bSortable": false},  null, null, null, null,null,
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

function loadAgreedDeployOrderData(){
	$.ajax({
    type:'POST',
    dataType:"json",
    data: {'state': 1},
    url:"/pos/Pos/index.php/MachineDispatch/getDeployOrders",
    success: function( data){
      var Arr = data['data']; console.log(data);
      var rows = [];
      
	  if(Arr)
	      for( var i=0; i<Arr.length; ++i ){
	        var item = Arr[i];
	        var row = [];
	        row.push( item["source_c"] );
	        row.push( item["target_c"] );
	        row.push( item["m_type"]);
	        row.push( item["quantity"] );
          row.push( item["m_code"] );
	        row.push( item["remark"]  );
	        row.push( item["create_user"]);
	        row.push( item["create_time"]);
	        row.push( item["edit_user"] );
	        row.push( item["edit_time"] );
	        rows.push(row);
	      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#sample-table-3' ) ) {
        oTable1 = $('#sample-table-3').dataTable();
      }
      else {
  
      oTable1 = $('#sample-table-3').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null, null, null, null, null, null,
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

function loadDisagreedDeployOrderData(){
	$.ajax({
    type:'POST',
    dataType:"json",
    data: {'state': 2},
    url:"/pos/Pos/index.php/MachineDispatch/getDeployOrders",
    success: function( data){
      var Arr = data['data']; console.log(data);
      var rows = [];
      
	  if(Arr)
	      for( var i=0; i<Arr.length; ++i ){
	        var item = Arr[i];
	        var row = [];
	        row.push( item["source_c"] );
	        row.push( item["target_c"] );
	        row.push( item["m_type"]);
	        row.push( item["quantity"] );
	         row.push( item["remark"]  );
	        row.push( item["create_user"]);
	        row.push( item["create_time"]);
	        row.push( item["edit_user"] );
	        row.push( item["edit_time"] );
	        rows.push(row);
	      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#sample-table-4' ) ) {
        oTable1 = $('#sample-table-4').dataTable();
      }
      else {
  
      oTable1 = $('#sample-table-4').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null, null, null, null, null,
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