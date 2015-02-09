var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "Bank/createOperator";
var updateUrl = rootUrl + "Bank/updateOperator";
var delUrl = rootUrl + "Bank/delOperator";
var dataUrl = rootUrl + "Bank/getOperatorData";
var bankDataUrl = rootUrl + "Bank/getBankData";

$(document).ready(function(){
  loadData();
  loadBankData();
  createDialog();
});

function loadBankData(){
  $.ajax({
    type:'GET',
    url: bankDataUrl,
    success:function(data){
      var dataArr = data['data'];
      var options = "";
      for( var i = 0; i < dataArr.length; ++ i){
        options += "<option value='" + dataArr[i].b_id +"'>" + dataArr[i].name + "</option>";
      }
      $("#selectBank").append( options);
      $("#update_b_id").append( options);
    }
  });
}

function createDialog(){
  $("#dialog-modal").dialog({
                height: 400,
                width: 510,
                dialogClass: "no-close",
                modal: true,
                autoOpen: false

            });
}

function updateRow(bo_id){
  $.ajax({
    type:'post',
    url : dataUrl,
    data : {'bo_id' :bo_id},
    success:function(data){
      console.log(data);
      var item = data['data'][0];
      for(var k in item ){
        var id = "#update_" + k;
        $(id).val( item[k] );
      }
      $("#dialog-modal").dialog('open');
    }
  });
}

function deleteRow( bo_id ){
  var id = "#"+bo_id;
  var $tr = $(id).parents('tr');
  
  console.log( $tr.find('td').html() );
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $tr.addClass('remove');
    $.ajax({
      type:'POST',
      url:delUrl,
      data: {'bo_id' : bo_id },
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
  $("#dialog-modal").dialog('close');
  $("#updateBtn").attr('disabled',false);
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
        $("#dialog-modal").dialog("close");
        $("#updateBtn").attr('disabled',false);
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
    type:'GET',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons"><a class="green" href="#" onclick="updateRow(';
      var editHtmlEnd =  ')"><i class="icon-pencil bigger-130"></i></a><a class="red" href="#" onclick="deleteRow('
      var delHtml = ')"><i class="icon-trash bigger-130"></i></a></div>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        var activeSign = '<i class="icon-ok"></i>';
        if( item['is_active'] == 0 ){
          activeSign = '';
        }
        row.push( "<span id='" + item["bo_id"] + "'>" + item['bo_id'] + "</span>");
        row.push( item["b_id"] );
        row.push( item["name"] );
        row.push( item["contact_num"] );
        row.push( activeSign );
        row.push( item["remark"]);
        row.push( item["create_user"] );
        row.push( item["create_time"] );
        row.push( item["edit_user"] );
        row.push( item["edit_time"] );
        row.push( editHtml + item['bo_id'] + editHtmlEnd + item['bo_id'] + delHtml );
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
                        null, 
                        null,
                        null,
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
      }
     oTable1.fnClearTable();
     if( rows.length > 0 )
      oTable1.fnAddData( rows );
    }
  }
  );
}