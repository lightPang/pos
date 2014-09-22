var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "Operation/createMccItem";
var updateUrl = rootUrl + "Operation/updateMccItem";
var delUrl = rootUrl + "Operation/delMccItem";
var dataUrl = rootUrl + "Operation/getMccItemData";
var mccBigDataUrl = rootUrl + "Operation/getMCCBigData";
var mccSubDataUrl = rootUrl + "Operation/getMccSubData";

$(document).ready(function(){
  loadMccBigData();
  loadMccSubData();
  loadData();
  createDialog();
});

function loadMccBigData(){
  $.ajax({
    type:'POST',
    url: mccBigDataUrl,
    success: function(data){
      var dataArr = data['data'];
      var options = "";
      for ( var i = 0; i < dataArr.length; ++i ){
        options += "<option value=\"" + dataArr[i].mb_id + "\" >" + dataArr[i].name + " </option>";
      }
      $('#selectMccBig').append( options );
      $('#updateMccBig').append( options );
    }
  });
}

function loadMccSubData(){
  $.ajax({
    type:'POST',
    url: mccSubDataUrl,
    success: function(data){
      var dataArr = data['data'];
      var options = "";
      for ( var i = 0; i < dataArr.length; ++i ){
        options += "<option value=\"" + dataArr[i].ms_id + "\" >" + dataArr[i].name + " </option>";
      }
      $('#selectMccSub').append( options );
      $('#updateMccSub').append( options );
    }
  });
}


function createDialog(){
  $("#dialog-modal").dialog({
                height: 600,
                width: 510,
                dialogClass: "no-close",
                modal: true,
                autoOpen: false

            });
}

function updateRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  console.log( $tdlist.length);
  var mi_id = $tdlist.get(0);
  var mccBig = $tdlist.get(1);
  var mccSub = $tdlist.get(2);
  var code = $tdlist.get(3);
  var a_rate = $tdlist.get(4);
  var b_rate = $tdlist.get(5);
  var c_rate = $tdlist.get(6);
  var d_rate = $tdlist.get(7);
  var remark = $tdlist.get(8);
  console.log(mi_id);
  $("#mi_id").val( $(mi_id).html() );
  $("#updateMccBig").val( $(mccBig).html() );
  $("updateMccSub").val( $(mccSub).html() );
  $("#updateCode").val( $(code).html() );
  $("#updateA_rate").val( $(a_rate).html() );
  $("#updateB_rate").val( $(b_rate).html());
  $("#updateC_rate").val( $(c_rate).html() );
  $("#updateD_rate").val( $(d_rate).html() );
  $("#updateRemark").val( $(remark).html() );
  $("#dialog-modal").dialog( "open");
}

function deleteRow(ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  console.log( $tr.find('td').html() );
  var mi_id = $tr.find('td').html();
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delUrl,
      data: {'mi_id' : mi_id },
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
    type:'GET',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<td><div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"updateRow(this)\">\
																	<i class=\"icon-pencil bigger-130\"></i>\
																</a>\
																<a class=\"red\" href=\"#\" onclick=\"deleteRow(this)\">\
																	<i class=\"icon-trash bigger-130\"></i>\
																</a>\
															</div></td>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item["mi_id"] );
        row.push( item["mb_id"] );
        row.push( item["ms_id"] );
        row.push( item["code"] );
        row.push( item["a_rate"]);
        row.push( item["b_rate"] );
        row.push( item["c_rate"] );
        row.push( item["d_rate"] );
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
      oTable1.fnAddData( rows );
    }
  }
  );
}