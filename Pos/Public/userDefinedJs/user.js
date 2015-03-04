var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "User/createUser";
var updateUrl = rootUrl + "User/updateUser";
var delUrl = rootUrl + "User/delUser";
var dataUrl = rootUrl + "User/getUserData";
var companyDataUrl = rootUrl + "Company/getCompanyData";
var logRecordUrl = rootUrl + "User/get_login_record";

$(document).ready(function(){
  loadCompanyData();
  $("#storageCheck").click( function(){checkMainBox(".storage-checkbox" ,this)});
   $("#storageCheck-update").click( function(){checkMainBox(".storage-checkbox-update" ,this)});
  //如果不用function包裹则会直接执行，因为这个时候参数里面返回值是undefined，而不是函数。把this传进去是为了获取this的check属性。
  $("#operationCheck").on('change', function(){checkMainBox(".operation-checkbox",this)});
  $("#operationCheck-update").on('change', function(){checkMainBox(".operation-checkbox-update",this)});
  $("#areaCheck").on('change', function(){checkMainBox(".area-checkbox",this)});
  $("#areaCheck-update").on('change', function(){checkMainBox(".area-checkbox-update",this)});
  $("#bankCheck").on('change', function(){checkMainBox(".bank-checkbox",this)});
  $("#bankCheck-update").on('change', function(){checkMainBox(".bank-checkbox-update",this)});
  loadData();
});



function checkMainBox( className,ele ){
  var that = this;
  $boxList = $(className);
  for( var i = 0; i<$boxList.length; ++i){
    var $box = $boxList.get(i);
    $box.checked = ele.checked;
  }
}

function loadCompanyData(){
  $.ajax({
    type:'POST',
    url: companyDataUrl,
    success: function(data){
      var companyArr = data['data'];
      var options = "";
      for ( var i = 0; i < companyArr.length; ++i ){
        options += "<option value=\"" + companyArr[i].c_id + "\" >" + companyArr[i].name + " </option>";
      }
      $('#selectCompany').append( options );
      $('#updateCompany').append( options );
    }
  });
}

function load_log_record( u_id ){
  $("#userListTableDiv").css('display', 'none');
  $("#login").css( 'display', 'block' );
  $.ajax({
    type:'post',
    data : { 'u_id' : u_id },
    url : logRecordUrl,
    success : function( data ){
      console.log( data );
      var logList = data['data'];
      var userName = data['info']['name'];
      var company = data['info']['c_name'];
      if( logList != null ){
        var rows = [];
        for( var i = 0 ; i < logList.length; ++ i ){
          var row = [];
          var logItem = logList[i];
          row.push( userName );
          row.push( company);
          row.push( logItem['time']);
          row.push( logItem['ip']);
          rows.push( row);
        }
        console.log( rows );
        loadTable('#login_table', rows );
      }
    }
  });
}

$("#login_returnBtn").click(function(){
  $("#login_table").find('tbody').html('');
  $("#userListTableDiv").css('display', 'block');
  $("#login").css( 'display', 'none' );
});

$("#updateRtnBtn").click( function(){
  $("#userListTableDiv").css('display', 'block');
  $("#updateDiv").css('display','none');
});

function updateRow(u_id){
  $("#userListTableDiv").css('display', 'none');
  $("#updateDiv").css('display','block');
  $('#updateForm').find('input[type="checkbox"]').prop("checked",false);
  $.ajax({
    type:'POST',
    url:dataUrl,
    data: { 'u_id' : u_id },
    success:function(data){
      console.log(data);
      var userItem = data['data'][0];
      $('#updateCompany').val( userItem['c_id'] );
      $('#updateName').val( userItem['name'] );
      $('#updateUid').val( userItem['u_id'] );
      $("#updateAccount").val( userItem['account'] );
      var strs = userItem['auth'].split(',');
      for( var i = 0 ; i<strs.length; ++i ){
        if( strs[i] !== '' )
        {
          var condition = "input[value='" + strs[i] +"']";
          //console.log(condition);
          //用prop成功修改属性，用attr失败。
          $('#updateForm').find(condition).prop("checked",true);
          //console.log(box);
          
        }
      }
    }
  });
}

function deleteRow(u_id,ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delUrl,
      data: {'u_id' : u_id },
      success: function(data){
        console.log(data);
        if( data['status'] != null ){
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

$('#updateBtn').click( function(){
  $("#updateBtn").attr('disabled',true);
  var inputs = $('#updateForm').find('input');
  for( var i = 0 ; i <inputs.length; ++i ){
    if( inputs.eq(i).val() == '' ){
      alert( '请完整填写表单内容！' );
      inputs.eq(i).focus();
      $("#updateBtn").attr('disabled',false);
      return;
    }
  }
  $.ajax({
    type:'POST',
    url: updateUrl,
    data:{
        u_id : $("#updateUid").val(),
        name : $("#updateName").val(),
        c_id : $("#updateCompany").val(),
        pwd : stripPwd( $("#updatePwd").val() ),
        account : $("#updateAccount").val(),
        auth : serializeAuth("#updateForm"),
      },
    success: function(data){
      console.log(data);
      if( data['status'] == 1 ){
        loadData();
        alert( "修改成功！");
        $("#updateBtn").attr('disabled',false);
      }
    }
  }
  );
});

function stripPwd( pwd){
  $res = $.trim( pwd );
  if( $res !== "" )
    return $.md5($res);
  else
    return "";
}
  
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
      data:{
        name : $("input[name='name']").val(),
        c_id : $("#selectCompany").val(),
        account : $("input[name='newAccount']").val() ,
        pwd : $.md5( $("input[name='newPwd']").val() ),
        auth : serializeAuth("#contentForm"),
      },
      success: function(data,textStatus, jqXHR){
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

function serializeAuth( authName ){
  var res = "";
  var $authArr = $(authName).find("input[type='checkbox']");
  for ( var i = 0 ; i < $authArr.length; ++i){
    var tempObj = $authArr.get(i);
    if( tempObj.checked === true )
      res += $(tempObj).val() + ",";
  }
  return res;
}

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
      var MccBigArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmlEnd = ')\"><i class=\"icon-pencil bigger-120\"></i></a>';
      var delBtn = '<a class=\"red\" href=\"#\" onclick=\"deleteRow(';
      var delBtnEnd = ',this)\"><i class=\"icon-trash bigger-120\"></i></a>';
      var logBtn = "<a class=\"red\" href=\"#\" onclick=\"load_log_record(";
      var logBtnEnd = ")\"><i class=\"icon-bookmark bigger-120\"></i></a></div>";
      for( var i=0; i<MccBigArr.length; ++i ){
        var item = MccBigArr[i];
        var row = [];
        row.push( item["name"] );
        row.push( item["c_name"] );
        row.push( item["email"] );
        row.push( item["phone"] );
        row.push( item["last_login_time"] );
        row.push( item["last_login_ip"] );
        row.push( editHtml + item['u_id'] + editHtmlEnd + delBtn + item['u_id'] + delBtnEnd + logBtn + item['u_id'] + logBtnEnd );
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