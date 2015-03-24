var soDataUrl = rootUrl + 'Task/getSoData';
var soItemUrl = rootUrl + 'Apply/getSoItem';
var comfirmUrl = rootUrl + 'Task/confirm';
var printUrl = rootUrl + 'Print/index';
$(document).ready(function(){
  loadOrderData();
});

$("#complete_btn").click(function(){
  if( $("#file_id").val() == '' ){
    alert("请上传附件！");
    return;
  }
  $.ajax({
    type:'post',
    data :{
      "so_id" : $("#so_id").val(),
      "file_id" : $("#file_id").val()
    },
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

function loadSetupOrder(soId,prefixId){
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
  var orderId = "#" + prefix + "showOrder";
  $(tableId).css('display','none');
  $(orderId).css('display','block');
  $.ajax({
    type:'post',
    dataType:'json',
    data:{
      'soId' : soId
    },
    url:soItemUrl,
    success:function(data){
      //console.log(data);
      var soItem  = data['data'];
      for(var key in soItem){
        var id = "#" + prefix + key;
        if( $(id).find('span') != null ){
          $(id).find('span').html( soItem[key] );
        }
      }
      $stateSpan = $("#state").find('span');
      switch ($stateSpan.html()){
        case '1':
          $stateSpan.html('已提交');
      }
      $urgentSpan = $("#is_urgent").find('span');
      switch ($urgentSpan.html()){
        case '0':
          $urgentSpan.html("否");
        case '1' :
          $urgentSpan.html("是");
      }
      if( soItem['state'] == 5 ){
        $("#confirmDiv").css('display','block');
        $("#resForm").css('display','none');
      }
      else{
        $("#confirmDiv").css('display','none');
        $("#resForm").css('display','block');
      }
      var idList = ["contractDownload","taxDownload","licenseDownload","cardDownload","passportDownload","authDownload","clientImgDownload1","clientImgDownload2","clientImgDownload3"];
      var keyList = ['contract_file_id','tax_file_id','license_file_id','card_file_id','passport_file_id','auth_file_id','client_img_1_id','client_img_2_id','client_img_3_id'];
      for( var j = 0; j<idList.length; ++j ){
        var id = "#" + prefix + idList[j];
        if( soItem[ keyList[j] ] == null )
          $(id).css('display','none');
        else
          $(id).attr( 'onclick', "downloadFile("+soItem[ keyList[j] ]+")");

      }
      $("#so_id").val( soItem['so_id'] );
      $("#ua_c_id").val( soItem['c_id'] );  
      var rows = [];
      var soList = soItem['siList'];
      var keyboardCodeInput = "<input type='text' class='required' name='keyboard_code[]' />";
      var mCodeInput = "<input type='text' class='required' name='m_code[]' />";
      var siIdInput = "<input type='hidden' name='si_id[]' value='";
      var mTypeInput = "<input type='hidden' name='m_type[]' value='";
      var keyboardInput = "<input type='hidden' name='keyboard_type[]' value='";
      var inputEnd = "'/>";
      var version = '';
      for( var i = 0 ; i < soList.length; ++ i ){
        version = soList[i]['version'];
        var item = soList[i];
        var row = [];
        var mCodeTxt = '';
        var keyboardCodeTxt = '';
        var mTypeTxt = '';
        var keyboardTypeTxt = '';
        if( prefixId != 1 ){
          mCodeTxt = item['m_code'];
          keyboardCodeTxt = item['keyboard_code'];
          mTypeTxt = item['machineType'];
          keyboardTypeTxt = item['keyboardType'];
        }
        else{
          mCodeTxt = siIdInput + item['si_id'] + inputEnd + mCodeInput;
          keyboardCodeTxt = keyboardCodeInput;
          keyboardTypeTxt = keyboardInput + item['keyboard_type'] + inputEnd + item['keyboardType'];
          mTypeTxt = mTypeInput + item['m_type'] + inputEnd + item['machineType'];
        }
        row.push(item['addr']);
        row.push(item['expandUser']);
        row.push(item['maintainUser']);
        row.push( mTypeTxt );
        row.push( mCodeTxt );
        row.push(keyboardTypeTxt );
        row.push( keyboardCodeTxt );
        row.push(item['simType']);
        row.push(item['m_tcode']);
        row.push(item['annual_fee']);
        row.push( item['deposit_fee'] );
        row.push(item['remark']);
        rows.push(row);
      }
      var siTableId = "#" + prefix + "si-table";
      $("#versionTxt").val( version );
      loadTable( siTableId, rows) ;
    }
  });
}

function loadOrderData(){
  $.ajax({
    type:'post',
    dataType:'json',
    url:soDataUrl,
    success:function(data){
      //console.log( data['data'] );
      var soArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var idArr = ['ua_table','apr_table'];
      var rowsArr = new Array();
      for( var i = 0; i < idArr.length; ++ i ){
        rowsArr[i] = new Array();
      }

      for( var i = 0; i < soArr.length; ++i ){
        var item = soArr[i];
        var row = [];
        row.push( item['so_number']);
        row.push( item['client_name'] );
        row.push( item['client_number'] );
        row.push( item['billBank']);
        row.push( item['ac_time'] );
        var stateTxt = '';
        var btnTxt = '';
        var btnTxtEnd = '';
        var type = '';
        var arrIndex = 1;
        btnTxt = showBtnTxt;
        btnTxtEnd = showBtnTxtEnd;
        if( item['type'] == 0 ){
          type = '直联';
        }
        else{
          type = '间联';
        }
        row.push( type );
        switch(item['state']){
          case '5':
            stateTxt = '待确认';
            arrIndex = 0;
            break;
          case '6':
            stateTxt = '已确认';
            arrIndex = 0;
            break;
          case '7' :
            stateTxt = '装机完成';
            arrIndex = 1;
            break;
          default:
            break;
        }
        row.push( stateTxt);
        row.push( btnTxt+ item['so_id'] + ',' + arrIndex.toString() + btnTxtEnd);

        rowsArr[arrIndex].push( row );
      }
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
          "aoColumns" : [
                          null,null,  null, null, null, null, null,{ "bSortable": false }
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
        oTable.fnClearTable();
        if( rows.length>0 )
          oTable.fnAddData( rows );
      }

      
    }
  });
}

$("#comfirm_btn").click( function(){
  $.ajax({
    type:'post',
    data:{
      'so_id':$("#so_id").val()
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

$("#printBtn").click( function(){
  var version = $("#versionTxt").val();
  if( version == '' ){
    alert("请填写机器版本号！");
    $("#versionTxt").focus();
  }
  else{
    var soId = $("#so_id").val();
    var printWindowUrl = printUrl + '/so_id/' + soId + '/version/' + version; 
    window.open( printWindowUrl );
  }
});

$("#ua_returnBtn").click(function(){
  $("#ua_table-div").css('display','block');
  $("#ua_showOrder").css('display','none');
  $("#ua_showOrder").find('span').html('');
  $("#ua_si-table").find('tbody').html('');
  $("#confirmDiv").css('display','none');
  $("#resForm").css('display','none');
  $("#ua_passBtn").attr('disabled', false);
});