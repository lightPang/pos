var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "Company/createCompany";
var updateUrl = rootUrl + "Company/updateCompany";
var delUrl = rootUrl + "Company/delCompany";
var dataUrl = rootUrl + "Company/getCompanyData";

$(document).ready(function(){
  loadData();
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
  var c_id = $tdlist.get(0);
  var name = $tdlist.get(1);
  var remark = $tdlist.get(2);
  $("#c_id").val( $(c_id).html() );
  $("#updateName").val( $(name).html() );
  $("#updateRemark").val( $(remark).html());
  $("#dialog-modal").dialog( "open");
}

function deleteRow(ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  console.log( $tr.find('td').html() );
  var mb_id = $tr.find('td').html();
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delUrl,
      data: {'mb_id' : mb_id },
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
  $("#updateBtn").attr('disabled',true);
  $.ajax({
    type:'POST',
    url: updateUrl,
    data: $('#updateForm').serialize(),
    success: function(data){
      console.log(data);
      if( data['status'] == 1 ){
        loadData();
        alert( "修改成功！");
        $("#dialog-modal").dialog("close");
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
      success: function(data,textStatus, jqXHR){
        if( data['status'] == 1 ){
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
}

function loadData(){
  $.ajax({
    type:'GET',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      var MccBigArr = data['data'];
      var rows = [];
      var editHtml = ''+ 
                '<td><div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"updateRow(this)\">\
																	<i class=\"icon-pencil bigger-130\"></i>\
																</a>\
																<a class=\"red\" href=\"#\" onclick=\"deleteRow(this)\">\
																	<i class=\"icon-trash bigger-130\"></i>\
																</a>\
															</div></td>';
      for( var i=0; i<MccBigArr.length; ++i ){
        var item = MccBigArr[i];
        var row = [];
        row.push( item["c_id"] );
        row.push( item["name"] );
        row.push( item["remark"] );
        row.push( item["create_user"] );
        row.push( item["create_time"] );
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
      }
      oTable1.fnClearTable();
      oTable1.fnAddData( rows );
    }
  }
  );
}