var quantityUrl = rootUrl + "MachineDispatch/getMachineQuantity";
var createDOUrl = rootUrl + "MachineDispatch/addDeployOrders";
var doDataUrl = rootUrl + "MachineDispatch/getDeployOrders";
$(document).ready(function(){
	dispatchedNum = new Array($("#m_type option").length);
	for(var i = 0; i < dispatchedNum.length; i++){
		dispatchedNum[i] = 0;
	}

	loadDeployOrderData();
	//loadAgreedDeployOrderData();
	//loadDisagreedDeployOrderData()
  loadAllQuantity();
	createDialog();
});

function createDialog(){

  $("#dialog-modal-disagree").dialog({
                height: 'auto',
                width: '30%',
                dialogClass: "no-close",
                modal: true,
                autoOpen: false
    });
}

function agreeRow( do_id ){
  $("#confirmTable").css('display','none');
  $("#confirmContent").css('display','block');
  $.ajax({
    type:'post',
    data :{ 'do_id' : do_id },
    url : doDataUrl,
    success : function( data ){
      console.log( data );
      var item = data['data'];
      for( var k in item ){
        var id = "#update_" + k;
        $(id).html( item[k] );
      }
      $("#update_do_id").val( item['do_id'] );
    }
  });
}

$("#rtnBtn").click(function(){
  $("#confirmTable").css('display','block');
  $("#m_list").val('');
  $("#confirmContent").css('display','none');
});

$('#agreeBtn').click( function(){
	$("#agreeBtn").attr('disabled',true);
    var flag = validate_machine_num( $("#m_list").val(), $("#update_quantity").html() );
    if( flag == false ){
      alert("机身编码数量与所需数量不匹配！");
      return;
    }
    
    $.ajax({
      type:'POST',
      url: "/pos/Pos/index.php/MachineDispatch/agreeDeployOrder",
      data: $("#agreeForm").serialize(),
      success: function(data){
        console.log(data);
        if( data['status'] == 0){
          alert( "同意设备调拨成功！");
          loadDeployOrderData();
        }
        else{
          alert( "同意设备调拨失败: \n" + data['info']);
        }

        $("#agreeBtn").attr('disabled',false);
      }
    });
});

function validate_machine_num( numTxt,totalNum ){
  var count = 0;
  var numArr = numTxt.split('\n');
  for( var i =0 ; i < numArr.length; ++i ){
    if( numArr == '' )
      continue;
    ++count;
  }
  if( count == totalNum ){
    return true;
  }
  return false;
}

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
  change_dispachtable_num();
});

$("#in_company").change(function(){
	var selected = $(this).val();
	$("#out_company option").each(function(){
		$(this).attr("disabled", false);
	});

	$("#out_company option[value="+selected+"]").attr("disabled", true);
});

$("#m_type").change( change_dispachtable_num );

function change_dispachtable_num(){
	var m_type = $("#m_type").val();
  var sourc_c = $("#out_company").val();
  for(var i = 0 ; i < quantityArr.length; ++i ){
    if( quantityArr[i]['m_type'] == m_type && sourc_c == quantityArr[i]['c_id'] ){
      $("#valid_quantity").val( quantityArr[i]['num'] );
      return;
    }
  }
  $("#valid_quantity").val(0);
}


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

$("#addBtn").click(function(){
	$(this).attr("disabled", true);
	$.ajax({
		type: 'POST',
		dataType: 'json',
		data:  $("#createForm").serialize() ,
		url: createDOUrl,
		success: function( data){
    	if(data['data']){
    		alert("添加成功！");
        console.log( data );
        loadDeployOrderData();
    	}
    	else{
    		alert("添加失败！");
    	}
    }
	});

	$(this).attr("disabled", false);
});

function loadAllQuantity(){
  $.ajax({
    type: 'post',
    url : quantityUrl,
    success : function (data ){
      quantityArr = data['data'];
    }
  });
}

$("#d2_rtnBtn").click( function(){
  $("#dispatch_content_2").css('display','none');
  $("#dispatch-table-content-2").css( 'display', 'block');
  $("#dispatch_content_2").find('span').html('');
});

$("#d3_rtnBtn").click(function(){
  $("#dispatch_content_3").css('display','none');
  $("#dispatch-table-content-3").css( 'display', 'block');
  $("#dispatch_content_3").find('span').html('');
});

function showDelRow( do_id ){
  $("#dispatch_content_3").css('display','block');
  $("#dispatch-table-content-3").css( 'display', 'none');
  $.ajax({
    type:'post',
    url : doDataUrl,
    data : { 'do_id' : do_id },
    success : function( data ){
      var item = data['data'];
      for( var k in item ){
        var id = "#d3_" + k;
        if( k == 'state' ){
          $(id).find('span').html( '已拒绝' );
        }
        else
          $(id).find('span').html( item[k] );
      }
    }
  });
}

function showRow(do_id){
  $("#dispatch_content_2").css('display','block');
  $("#dispatch-table-content-2").css( 'display', 'none');
  $.ajax({
    type:'post',
    url : doDataUrl,
    data : { 'do_id' : do_id },
    success : function( data ){
      var item = data['data'];
      for( var k in item ){
        var id = "#d2_" + k;
        if( k == 'state' ){
          $(id).find('span').html( '已确认' );
        }
        else if( k == 'm_code_list' ){
          $(id).html( item[k].replace(/\\n/g, "<br>"));
        }
        else
          $(id).find('span').html( item[k] );
      }
    }
  });

}
function loadDeployOrderData(){
	$.ajax({
    type:'POST',
    dataType:"json",
    url:"/pos/Pos/index.php/MachineDispatch/getDeployOrders",
    success: function( data){
      var Arr = data['data']; console.log(data);
      var c_id = data['status'];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons style="width:100px;"\">\
							<a class=\"green\" href=\"#\" onclick=\"agreeRow(';
      var editHtmlEnd = ')\"><button class="btn btn-info btn-xs">同意</button></a>';
      var rejectHtml = '<a class=\"red\" href=\"#\" onclick=\"disagreeRow(';
      var rejectHtmlEnd = ')\"><button class="btn btn-info btn-xs">拒绝</button></a></div>';
      var showHtml = '<a class="green" href="#" onclick="showRow(';
      var showHtmlEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var showDelHtml = '<a class="red" href="#" onclick="showDelRow(';
      var showDelHtmlEnd = ')"><i class="icon-fire align-top bigger-110 icon-check"></i></a>';
      var idArr = ['dispatch-table-1','dispatch-table-2','dispatch-table-3'];
      var rowsArr = new Array();

      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

	    for( var i=0; i<Arr.length; ++i ){
	      var item = Arr[i];
	      var row = [];
        var stateTxt = '';
        var btnTxt = '';
        var arrIndex = -1;
        switch( item['state'] ){
          case '0' :
            stateTxt = '已提交';
            if( item['source_c'] == c_id )
              btnTxt = editHtml + item['do_id'] +","+item['m_type'] + editHtmlEnd + rejectHtml + item['do_id'] + rejectHtmlEnd;
            else 
              btnTxt = showHtml + item['do_id'] + showHtmlEnd;
            arrIndex = 0;
            break;
          case '1' :
            stateTxt = '已通过';
            btnTxt = btnTxt = showHtml + item['do_id'] + showHtmlEnd;
            arrIndex = 1;
            break;
          case '2' :
            stateTxt = '已拒绝';
            btnTxt = btnTxt = showDelHtml + item['do_id'] + showDelHtmlEnd;
            arrIndex = 2;
            break;
        }
	      row.push( item["sourceC"] );
        row.push( item["targetC"] );
	      row.push( item["mType"] );
	      row.push( item["quantity"] );
        row.push( stateTxt );
        row.push( item['remark'] );
	      row.push( btnTxt );
        
	      rowsArr[arrIndex].push( row );
	    }

      
      for( var i = 0 ; i < idArr.length; ++ i ){
        var oTable1;
        var tableId = "#" + idArr[i];
        rows = rowsArr[i];
        if ( $.fn.dataTable.isDataTable( tableId ) ) {
          oTable1 = $( tableId ).dataTable();
        }
        else {
    
        oTable1 = $( tableId ).dataTable({
          "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
          "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
          "bPaginate" : true, //是否显示（应用）分页器  
          "aoColumns" : [
                          null,null,
                          null,null, null, null,{ "bSearchable" : false, "bSortable": false }
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
  });
}
