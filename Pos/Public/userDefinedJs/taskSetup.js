var soDataUrl = rootUrl + 'Task/getSoData';
var soItemUrl = rootUrl + 'Apply/getSoItem';
var completeUrl = rootUrl + "Task/setupComplete";
var siItemUrl = rootUrl + 'SetupItem/getSetupItem';
var comfirmUrl = rootUrl + 'Task/confirm';
var rejectUrl = rootUrl ;
var userDataUrl = rootUrl + 'User/getUserData';
$(document).ready(function(){
  loadOrderData();
});
$("reject_btn").click( function(){

} );
$("#complete_btn").click(function(){
  if( $("#file_id").val() == '' ){
    alert("请上传附件！");
    return;
  }
  $.ajax({
    type:'post',
    data :{
      "si_id" : $("#si_id").val(),
      "file_id" : $("#file_id").val(),
      "setup_user" : $("#setup_user").val()
    },
    url : completeUrl,
    success:function( data ){
      if( data['status'] == '1' ){
        alert( '提交成功！');
        loadOrderData();
      }
      else{
        alert("请勿重复提交记录！");
      }
    }
  });
});

$('#upload').Huploadify({
    auto:true,
    fileTypeExts:"*.txt;*.xls;*.docx;*.doc;*.xlsx;*.pdf;*.jpg;",
    multi:true,
    formData:null,
    fileSizeLimit:5000,
    showUploadedPercent:true,//是否实时显示上传的百分比，如20%
    showUploadedSize:true,
    removeTimeout:9999999,
    uploader:"/pos/Pos/index.php/File/upload",
    onUploadStart:function(){
      //alert('开始上传');
      },
    onInit:function(){
      //alert('初始化');
      },
    onUploadComplete:function(file,response){
      if( response != '0' )
        $("#file_id").val( response );
      else
        alert("文件上传失败！");
    },
    onDelete:function(file){
    },
    onCancel:function(file){
    }
    });

function loadSetupOrder(si_id,prefixId,state){
  var prefix = '';
  prefixId = prefixId.toString();
  switch (prefixId){
    case '0':
      prefix = 'ua_';
      break;
    case '1':
      prefix = 'apr_';
      break;
  }
  var tableId = "#" + prefix + "table-div";
  var itemDiv = "#" + prefix + 'itemDiv';
  var orderId = "#" + prefix + "showOrder";
  $("#si_id").val( si_id );
  $("#file_id").val('');
  $(tableId).css('display','none');
  $(orderId).css('display','block');
  if( state == '2' ){
    $("#resForm").css('display','none' );
    $("#confirmDiv").css('display','block');
  }
  else if( state == '7' ){
    $("#resForm").css('display','block' );
    $("#confirmDiv").css('display','none');
    $.ajax({
      type: 'post',
      data : { 'c_id' : 'c'},
      url : userDataUrl,
      success : function( data ){
        var userData = data['data'];
        var options = '';
        for( var i = 0 ; i < userData.length; ++ i ){
          options += "<option value='" + userData[i]['u_id'] + "'>" + userData[i]['name'] + "</option>";
        }
        $("#setup_user").html('');
        $("#setup_user").append( options );
      }
    });
  }
  $(itemDiv).siPlugin({
    "si_id" : si_id,
    "div_prefix" : prefix + "_content_"
  });
}

function loadOrderData(){
  $.ajax({
    type:'post',
    dataType:'json',
    data :{
      'state' : "1"
    },
    url:siItemUrl,
    success:function(data){
      //console.log( data['data'] );
      var soArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editTxtEnd = ')"><i class="icon-exclamation-sign align-top bigger-110 icon-check"></i></a>';
      var idArr = ['ua_table','apr_table'];
      var checkBoxTxt = "<input type='checkbox' class='print-checkbox apr' value='";
      var checkboxEnd = "'/>";
      var rowsArr = new Array();
      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

      for( var i = 0; i < soArr.length; ++i ){
        var item = soArr[i];
        var row = [];
        var arrIndex = 1;
        var btnTxt = '123';
        var btnTxtEnd = '';
        var stateTxt = '';
        switch(item['state']){
          case '2':
            stateTxt = '待确认';
            arrIndex = 0;
            row.push( checkBoxTxt + item['so_id'] + '-' + item['si_id'] + checkboxEnd );
            btnTxtEnd = editTxtEnd;
            break;
          case '7':
            stateTxt = '已确认';
            arrIndex = 0;
            row.push( checkBoxTxt + item['so_id'] + '-' + item['si_id'] + checkboxEnd );
            btnTxtEnd = editTxtEnd;
            break;
          default:
            stateTxt = '装机完成';
            arrIndex = 1;
            
            btnTxtEnd = showBtnTxtEnd;
            break;
        }
        row.push( item['so_number']);
        row.push( item['client_name'] );
        row.push( item['addr'] );
        row.push( item['m_code'] );
        row.push( item['version'] );
        
        var type = '';
        if( item['type'] == 0 ){
          type = '直联';
        }
        else{
          type = '间联';
        }
        row.push( type );
        row.push( stateTxt);
        btnTxt = showBtnTxt + item['si_id'] + ',' + arrIndex.toString() + ',' + item['state'];
        row.push( btnTxt + btnTxtEnd );

        rowsArr[arrIndex].push( row );
      }
      var secondAoConfig = [null,null,  null, null, null, null, null,{ "bSearchable" :false, "bSortable": false }];
      var firstAoConfig = [ { "bSearchable" :false, "bSortable": false },null,null,  null, null, null, null, null,{ "bSearchable" :false, "bSortable": false }];
      var aoConfig = Array();
      aoConfig.push( firstAoConfig );
      aoConfig.push( secondAoConfig );
      for( var i = 0 ; i < idArr.length; ++ i ){
        var oTable;
        var tableId = "#" + idArr[i];

        rows = rowsArr[i];
        if( $.fn.dataTable.isDataTable( tableId ) ){
          oTable = $(tableId).dataTable();
        }
        else{
          oTable = $(tableId).dataTable({
            "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
          "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
          "bPaginate" : true, //是否显示（应用）分页器  
          "aoColumns" : aoConfig[i],
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
        oTable.fnClearTable();
        if( rows.length>0 )
          oTable.fnAddData( rows );
      }
    }
  });
}

$("#confirm_btn").click( function(){
  $.ajax({
    type:'post',
    data:{
      'si_id':$("#si_id").val()
    },
    url: comfirmUrl,
    success : function( data ){
      console.log( data );
      if( data['status'] == '1' ){
        alert( "确认成功！");
        $("#confirmDiv").css('display','none');
        $("#resForm").css('display','block');
        loadOrderData();
      }
      else{
        alert( '确认失败！');
      }
    }
  });
});

function submit(){
  if( checkInput() == true ){
    $("#submitForm").ajaxSubmit({
      type:'post',
      url : addRecordUrl,
      success:function(data){ 
        var reg = new RegExp("<[^>]+>","g" );
        data = data.replace( reg,"" );
        data = JSON.parse(data);
        console.log( data );
        alert("保存成功！");
      }
    });
  }
}

function checkInput(){
  $inputEles = $("input.required");
  for( var i = 0 ; i < $inputEles.length; ++i ){
    if( $inputEles.eq(i).val() == '' ) {
      $inputEles.eq(i).focus();
      alert("请完整填写表单内容！");
      return false;
    }
  }
  return true;
}


$("#ua_returnBtn").click(function(){
  $("#ua_table-div").css('display','block');
  $("#ua_showOrder").css('display','none');
  $("#ua_passBtn").attr('disabled', false);
});

$("#apr_returnBtn").click(function(){
  $("#apr_table-div").css('display','block');
  $("#apr_showOrder").css('display','none');
});

$("#apr_check").on('change', function(){ checkMainBox('.apr',this);});

function printOrder( className ){
  var si_list = '';
  $boxList = $(className);
  var so_id = '';
  for( var i = 0; i<$boxList.length; ++i){
    var box = $boxList.get(i);
    var boxVal = $(box).val();
    var so_temp = boxVal.split('-')[0];
    var si_id = boxVal.split('-')[1];
    if( box.checked == true && $(box).val() != '' ){
      if( so_id == '' )
        so_id = so_temp;
      else{
        if( so_id != so_temp ){
          alert("请勾选同属一个订单的装机单进行操作！");
          return;
        }
      }
      si_list += si_id + ',';
    }
  }
  window.open( rootUrl + 'Print/printBySi/so_id/' + so_id + '/si_list/' +si_list);
}

function checkMainBox( className,ele){
  $boxList = $(className);
  for( var i = 0; i<$boxList.length; ++i){
    var $box = $boxList.get(i);
    $box.checked = ele.checked;
  }
}