var dataUrl = rootUrl +'MachineVersion/get';
var delUrl = rootUrl + 'MachineVersion/del';
var createUrl = rootUrl + 'MachineVersion/create';
var updateUrl = rootUrl + "MachineVersion/update";
$(document).ready(function(){
  loadMCTData();
});


function updateRow(mv_id){
  $("#tableContent").css('display','none');
  $("#updateDiv").css('display','block');
  $.ajax({
    type:'post',
    data : { 'mv_id' : mv_id },
    url : dataUrl,
    success : function( data ){
      var item = data['data'];
      for( var k in item ){
        var id = "#update_" + k;
        $(id).val( item[k] );
      }
      $("#item_id").val( item['mv_id'] );
      loadModifyRecord();
    }
  });
}

function deleteRow(mv_id,ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url: delUrl     ,
      data: {'mv_id' : mv_id },
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
  $("#tableContent").css('display','block');
  $("#updateDiv").css('display','none');
  $("#update_name").val('');
  $("#record_table").find('tbody').html('');
  $("#updateBtn").attr('disabled',false);
});

$('#updateBtn').click( function(){
  var mv_id=$('#update_mv_id').val(),
      name=$("#update_name").val();

  if(name == ""){
    alert("名称不能为空！");
    $("#update_name").focus();
    return;
  }
  $("#updateBtn").attr('disabled',true);
  $.ajax({
    type:'POST',
    url: updateUrl,
    data: { 'mv_id' : mv_id,
            'is_active' : $("#update_is_active").val(),
            'name' : name,},
    success: function(data){
      console.log(data);
      if( data['status'] == 1 ){
        loadMCTData();
        alert( "修改成功！");
        $("#updateBtn").attr('disabled',false);
        loadMCTData();
        loadModifyRecord();
      }
      else{
        alert( "修改失败！");
      }

      $("#updateBtn").attr('disabled',false);
    }
  });
});


$('#addbtn').click(function(event){
    event.preventDefault();
    var name=$("#name").val();

    if(name == ""){
      alert("名称不能为空！");
      $('#name').focus();
      return;
    }

    $(this).attr('disabled', true);

    $.post(createUrl,
          {
          'name':name,
          'is_active' : $("#is_active").val(),
          },
          function(data){
            if( data['status'] > 0 ){
              alert( "添加成功！");
              loadMCTData();
              clearInput();
            }
            else{
              console.log( data );
              alert( "添加失败！");
            }
          })
    .complete(function(){
      $('#addbtn').attr('disabled', false);
      
    });
    
});

function clearInput(){
  var inputs = $('#createForm').find('input');
  for( var i = 0; i < inputs.length; ++i ){
    $(inputs[i]).val("")  ;
  }
}

function loadMCTData(){
  $.ajax({
    type:'POST',
    dataType:"json", 
    url: dataUrl,
    success: function( data){
      var MCTArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmlEnd = ')\"><i class=\"icon-pencil bigger-130\"></i></a>';
      var delHtml = '<a class=\"red\" href=\"#\" onclick=\"deleteRow(';
      var delHtmlEnd = ',this)\"><i class=\"icon-trash bigger-130\"></i></a></div>';
      for( var i=0; i<MCTArr.length; ++i ){
        var item = MCTArr[i];
        var row = [];
        var activeSign = '<i class="icon-ok"></i>';
        if( item['is_active'] == 0 ){
          activeSign = '';
        }
        row.push( item["name"] );
        row.push( activeSign );
        row.push( editHtml + item['mv_id'] + editHtmlEnd + delHtml + item['mv_id'] + delHtmlEnd );
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
                        null, { "bSearchable":false }, { "bSearchable":false, "bSortable": false }
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