$(document).ready(function(){
	loadSData();
	createDialog();
});

function createDialog(){
  $("#dialog-modal").dialog({
                height: 450,
                width: 400,
                dialogClass: "no-close",
                modal: true,
                autoOpen: false
    });
}

function updateRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  console.log( $tdlist.length);
  var mp_id = $tdlist.get(0);
  var mp_name = $tdlist.get(1);
  var mp_remark = $tdlist.get(2);
  console.log( $(mp_name).html() );
  $("#mp_id").val( $(mp_id).html() );
  $("#updateName").val( $(mp_name).html() );
  $("#updateRemark").val( $(mp_remark).html());
  $("#dialog-modal").dialog( "open");
}

$('#cancelBtn').click( function(){
  $("#dialog-modal").dialog('close');
});

$('#updateBtn').click( function(){
  var url = $('#updateForm').attr('action');
  $("#updateBtn").attr('disabled',true);
  console.log(url);
  $.ajax({
    type:'POST',
    url: url,
    data: $('#updateForm').serialize(),
    success: function(data){
      console.log(data);
      if( data['status'] == 1 ){
        loadSData();
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
});

function deleteRow(ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  console.log( $tr.find('td').html() );
  var mp_id = $tr.find('td').html();
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:'/pos/Pos/index.php/Supplier/delete',
      data: {'mp_id' : mp_id },
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
  var url = $('#updateForm').attr('action');
  $("#updateBtn").attr('disabled',true);
  console.log(url);
  $.ajax({
    type:'POST',
    url: url,
    data: $('#updateForm').serialize(),
    success: function(data){
      console.log(data);
      if( data['status'] == 1 ){
        loadSData();
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
});

$('#addbtn').click(function(event){
	event.preventDefault();
	var supplier = $('#supplier').val(),
		  remark = $('#remark').val();
	if(supplier != ""){
		$(this).attr('disabled', true);
    $.ajax({
      type:'POST',
      url:'/pos/Pos/index.php/Supplier/add',
      data: {'supplier' : supplier,
            'remark' : remark},
      success: function(data){
        console.log(data);
        alert(data['info']);
        if(data['info'] == 1)
          clearInput();
        $('#addbtn').attr('disabled', false);
      }
    });
	}
});

function clearInput(){
  var inputs = $('#addsupplier_form').find('input');
  for( var i = 0; i < inputs.length; ++i ){
    $(inputs[i]).val("")  ;
  }
  var textarea = $('textarea');
  for( var i = 0; i < textarea.length; ++ i ){
    $(textarea[i]).val("") ;
  }
}

function loadSData(){
  $.ajax({
    type:'POST',
    dataType:"json", 
    url:"/pos/Pos/index.php/Supplier/search",
    success: function( data){
      var SArr = data['data'];
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
      for( var i=0; i<SArr.length; ++i ){
        var item = SArr[i];
        var row = [];
        row.push( item["mp_id"] );
        row.push( item["name"] );
        row.push( item["remark"]);
        row.push( item["create_time"] );
        row.push( item["create_user"] );
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
                        null,  null, null,null, null, null, null, { "bSortable": false }
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