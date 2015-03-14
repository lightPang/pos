var dataUrl = rootUrl + 'Supplier/search';
var addUrl = rootUrl + "Supplier/add";
var delUrl = rootUrl + "Supplier/delete";
$(document).ready(function(){
	loadSData();
});

function updateRow(mp_id){
  $("#updateDiv").css('display','block');
  $("#tableContent").css('display','none');
  $.ajax({
    type:'post',
    data: { 'mp_id':mp_id },
    url : dataUrl ,
    success:function(data){
      var item = data['data'];
      for( var k in item ){
        var id = "#update_" + k;
        $(id).val( item[k] );
      }
      $("#item_id").val( item['mp_id'] );
      loadModifyRecord();
    }
  });
}

$('#cancelBtn').click( function(){
  $("#updateDiv").css('display','none');
  $("#tableContent").css('display','block');
  $("record_table").find('tbody').html('');
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
        loadModifyRecord();
      }
      else{
        alert( "修改失败！");  
      }
      $("#updateBtn").attr('disabled',false);
    }
  }
  );
});

function deleteRow(mp_id,ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  console.log( $tr.find('td').html() );
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url: delUrl,
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

$('#addbtn').click(function(event){
	event.preventDefault();
	var supplier = $('#supplier').val(),
		  remark = $('#remark').val();
	if(supplier != ""){
		$(this).attr('disabled', true);
    $.ajax({
      type:'POST',
      url:addUrl,
      data: {'supplier' : supplier,
            'remark' : remark},
      success: function(data){
        console.log(data);
        alert(data['info']);
        if(data['status'] == 1){
          clearInput();
          loadSData();
        }
          
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
    url:dataUrl,
    success: function( data){
      var SArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmleEnd = ')\"><i class=\"icon-pencil bigger-130\"></i></a>';
			var delHtml = '<a class=\"red\" href=\"#\" onclick=\"deleteRow(';
      var delHtmlEnd = ',this)\"><i class=\"icon-trash bigger-130\"></i></a></div>';
      for( var i=0; i<SArr.length; ++i ){
        var item = SArr[i];
        var row = [];
        row.push( item["name"] );
        row.push( item["remark"]);
        row.push( editHtml + item['mp_id'] + editHtmleEnd + delHtml + item['mp_id'] + delHtmlEnd );
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
                          null,  null,  { "bSearchable" : false,  "bSortable": false }
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