var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "Bank/createBank";
var updateUrl = rootUrl + "Bank/updateBank";
var delUrl = rootUrl + "Bank/delBank";
var dataUrl = rootUrl + "Bank/getBankData";


$(document).ready(function(){
  loadData();
});

function updateRow( b_id ){
  $("#updateDiv").css('display','block');
  $("#tableContent").css( 'display','none');
  $.ajax({
    type:'post',
    url : dataUrl,
    data : {'b_id' :b_id},
    success:function(data){
      console.log(data);
      var item = data['data'][0];
      for(var k in item ){
        var id = "#update_" + k;
        $(id).val( item[k] );
      }
      $("#item_id").val( item['b_id'] );
      loadModifyRecord();
    }
  });
}

function deleteRow( b_id ){
  var id = "#" + b_id;
  var $tr = $(id).parents('tr');
  console.log( $tr.find('td').html() );
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $tr.addClass('remove');
    $.ajax({
      type:'POST',
      url:delUrl,
      data: {'b_id' : b_id },
      success: function(data){
        console.log(data);
        if( data['status'] != false ){
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
  $("#updateBtn").attr('disabled',false);
  $("#updateDiv").css('display','none');
  $("#tableContent").css( 'display','block');
  $("#record_table").find('tbody').html('');
});

$('#updateBtn').click( function(){
  $("#updateBtn").attr('disabled',true);
  $.ajax({
    type:'POST',
    url: updateUrl,
    data:$('#updateForm').serialize(),
    success: function(data){
      console.log(data);
      if( data['status'] >= 1 ){
        loadData();
        alert( "修改成功！");
        $("#updateBtn").attr('disabled',false);
        loadModifyRecord();
      }
    }
  }
  );
});
  
$('#submitBtn').click( function(){
  var inputs = $('#contentForm').find('input');
  var flag = 1;
  for( var i = 0; i < inputs.length; ++i ){
    if( $(inputs[i]).val() === "" ){
      alert( "请完整填写表单内容！" );
      $(inputs[i]).focus();
      flag = 0;
      break;
    }
  }
  if( flag === 1 ){
    $.ajax({
      type:'POST',
      url: createUrl,
      data:$('#contentForm').serialize(),
      success: function(data){
        console.log(data);
        if( data['status'] !== 0 ){
          alert("添加成功!");
          console.log(data);
          clearInput();
          loadData();
        }
      }
    });
  } 
});

function clearInput(){
  var inputs = $('#contentForm').find('input');
  for( var i = 0; i < inputs.length; ++i ){
    $(inputs[i]).val("")  ;
  }
  var textarea = $('textarea');
  for( var i = 0; i < textarea.length; ++ i ){
    $(textarea[i]).val("") ;
  }
  
  $('input[type="checkbox"]').attr("checked",false);
}

function loadData(){
  $.ajax({
    type:'post',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">\
																<a class="green" href="#" onclick="updateRow(';
      var editHtmlEnd = ')"><i class="icon-pencil bigger-130"></i></a><a class="red" href="#" onclick="deleteRow('
      var delHtml = ')"><i class="icon-trash bigger-130"></i></a></div>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        var activeSign = '<i class="icon-ok"></i>';
        if( item['is_active'] == 0 ){
          activeSign = '';
        }
        row.push( item["name"] );
        row.push( item['short_name']);
        row.push( item['num'] );
        row.push( "<span id='" + item["b_id"] + "'>" + item["code"]+ "</span>" );
        row.push( item['short_num'] );
        row.push( activeSign );
        row.push( item["remark"]);
        row.push( editHtml + item['b_id'] + editHtmlEnd + item['b_id'] + delHtml  );
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
                        null,
                        null,
                        null,  
                        null, 
                        null,
                        null,
                        null,
                        { "bSearchable" :false, "bSortable": false }
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
      if( rows.length > 0 )
        oTable1.fnAddData( rows );
    }
  }
  );
}