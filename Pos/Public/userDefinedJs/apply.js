var createUrl =  rootUrl + "Apply/createApplication";
var siDataUrl = rootUrl + "SetupItem/getSiData";
var createSetupItemUrl = rootUrl + "SetupItem/create";
var soDataUrl = rootUrl + 'Apply/getSoData';
var soItemUrl = rootUrl + '/Apply/getSoItem';
$(document).ready(function(){
  createSiDialog();
});

function createSiDialog(){
  $("#setup_item").dialog({
                height: 530,
                width: 700,
                dialogClass: "no-close",
                modal: true,
                autoOpen: false

            });
}
$('input[name="has_annual"]').change(function(){
  var val = $('input[name="has_annual"]:checked').val();
  if( val == 1 ){
    $("#si_annual_fee").attr( 'disabled', false);
    $("#si_annual_fee").addClass("required");
  }
  else{
    $("#si_annual_fee").attr( 'disabled', true);
    $("#si_annual_fee").removeClass("required");
  }
});

$('input[name="has_deposit"]').change(function(){
  var val = $('input[name="has_deposit"]:checked').val();
  if( val == 1 ){
    $("#si_deposit_fee").attr( 'disabled', false);
    $("#si_deposit_fee").addClass("required");
  }
  else{
    $("#si_deposit_fee").attr( 'disabled', true);
    $("#si_deposit_fee").removeClass("required");
  }
});

$("#addSiBtn").click(function(){
  $("#si_type").html('0');
  $("#setup_item").dialog('open');
});

$("#update_addSiBtn").click(function(){
  $("#si_so_id").val( $("#update_so_id").val() );
  $("#si_type").html('1');
  $("#setup_item").dialog('open');
});

$("#updateSiBtn").click( function(){
  var inputs = $('#createSiForm').find('input');
  var flag = 1;
  for( var i = 0; i < inputs.length; ++i ){
    if(  $(inputs[i]).hasClass('required') && $(inputs[i]).val() === "" ){
      alert( "请完整填写表单内容！" );
      $(inputs[i]).focus();
      flag = 0;
      break;
    }
  }
  if( flag === 1 ){
    $("#updateSiBtn").attr('disabled',true);
    $("#createSiForm").ajaxSubmit({
    type:'post',
    url: createSetupItemUrl,
    success: function (data){
      console.log(data);
       if( data['status'] >= 0 ){
          alert("操作成功!");
          var siListId = "#si_list";
          if($("#si_type").html() != '0' ){
            siListId = "#update_si_list";
          }
          if( data['status'] != '0' ){
            var si_list = $( siListId ).val();
            si_list +=  data['status'].toString() + ",";
            $( siListId ).val( si_list);
          }
          if($("#si_type").html() != '0' )
            loadUpdateSiTableData();
          else
            loadSiTableData();
           
          clearInput("#createSiForm");
          
          $("#setup_item").dialog('close');
          $("#updateSiBtn").attr('disabled',false);
        }
    }
    });
  }
});
$("#cancelSiBtn").click(function(){
  $("#setup_item").dialog('close');
  $("#setup_item").find('input').val('');
  $("#updateSiBtn").attr('disabled',false);
});
function loadSiTableData(){
  var si_list = $("#si_list").val();
  $.ajax({
    type:'POST',
    dataType:"json",
    data: { "si_list" : si_list}, 
    url: siDataUrl,
    success: function( data){
      if( data['data'] == null ) return;
      console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"updateRow(';
      var editHtmlEnd =         ')\">\
                                  <i class=\"icon-pencil bigger-130\"></i>\
                                </a>\
                                <a class=\"red\" href=\"#\" onclick=\"deleteRow(';
      var delHtml           =    ')\">\
                                  <i class=\"icon-trash bigger-130\"></i>\
                                </a>\
                              </div>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item["si_id"] );
        row.push( item["addr"] );
        row.push( item["expandUser"] );
        row.push( item["mType"] );
        row.push( item["keyboardType"]);
        row.push( item["simType"] );
        row.push( item["annual_fee"] );
        row.push( item["deposit_fee"]);
        row.push( "<span class='" + item['si_id'] + "'>" + item["remark"] + "</span>");
        row.push( editHtml + item['si_id'] + editHtmlEnd + item['si_id'] + delHtml );
        rows.push(row);
      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#machineListTable' ) ) {
        oTable1 = $('#machineListTable').dataTable();
      }
      else {
  
      oTable1 = $('#machineListTable').dataTable({
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
//传的是函数指针！！！！！不能再调用函数了！！！！！！
$("#ap_id").change( function(){
  refreshLinkedData("ap_id","ac_id",'#');
});

$("#update_ap_id").change( function(){
  refreshLinkedData("ap_id","ac_id",'#update_');
});

$("#ac_id").change( function(){
  refreshLinkedData("ac_id","ad_id",'#');
});

$("#update_ac_id").change( function(){
  refreshLinkedData("ac_id","ad_id",'#update_');
});

function refreshLinkedData( source, target, type){
  var sourceEle = type + source;
  var targetEle = type + target;
  console.log( sourceEle);
  console.log( $(sourceEle));
  var source_value = $(sourceEle).val();
  var targetOption = "option[class='" + source_value + "']";
  $(targetEle).find("option").css('display', 'none');
  $(targetEle).val( $($(targetEle).find(targetOption)).val() );
  $( $(targetEle).find( targetOption) ).css('display', 'inherit');
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

function updateRow(si_id){
  $.ajax({
    type:'post',
    url: setupItemUrl,
    data :{
      'si_id' : si_id
    },
    success: function(data){
      var setupItem = data['data'];
      $("#si_addr").val( setupItem['addr'] );
      $("#si_phone").val( setupItem['phone'] );
      $("#si_m_type").val( setupItem['m_type'] );
      $("si_keyboard_type").val( setupItem['keyboard_type'] );
      $("#si_sim_type").val( setupItem['sim_type'] );
      $("#si_sim_id").val( setupItem['sim_id'] );
      $("input[type='radio'][name='has_annual'][value='"+setupItem['has_annual']+"']").attr('checked','checked');
      $("#si_annual_fee").val( setupItem['annual_fee'] );
      $("input[type='radio'][name='has_deposit'][value='"+setupItem['has_deposit']+"']").attr('checked','checked');    
      $("#si_deposit_fee").val( setupItem['deposit_fee']);
      $("#si_expand_user").val( setupItem['expand_user'] );
      $("#si_remark").val( setupItem['remark'] );
      $("#si_id").val( setupItem['si_id'] );
      $("#si_so_id").val( '' );
      $("#si_type").html('0');
      $("#setup_item").dialog( "open");
    }
  });
  $("#setup_item").dialog( "open");
}

function deleteRow( si_id ){
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delSetupItemUrl,
      data: {'si_id' : si_id },
      success: function(data){
        console.log(data);
        if( data['status'] != false ){
          var si_list = $("#si_list").val();
          si_list = si_list.replace( si_id + ',' ,'' );
          $("#si_list").val( si_list);
          alert("删除成功！");
          $span = $("#machineListTable").find('.'+si_id);
          $tr = $("."+si_id).parents('td').parents('tr');
          console.log($tr);
          $tr.addClass('remove');
          var table = $('#machineListTable').DataTable();
          table.row('.remove').remove().draw();
        }
        else{
           alert("删除失败！");
        }
      }
    });
    
  }
}
 
$('#submitBtn').click( function(){
  var inputs = $('#contentForm').find('input');
  var flag = 1;
  for( var i = 0; i < inputs.length; ++i ){
    if( $(inputs[i]).hasClass('required') && $(inputs[i]).val() === "" ){
      alert( "请完整填写表单内容！" );
      $(inputs[i]).focus();
      flag = 0;
      break;
    }
  }
  if($("#si_list").val()=="" ){
    alert("请填写装机信息！");
    flag = 0;
  }
  if( flag === 1 ){
    $("#contentForm").ajaxSubmit({
    type:'post',
    url: createUrl,
    success: function (data){
      console.log(data);
       if( data['status'] !== 0 ){
          alert("添加成功!");
        }
    }
    });
  } 
});

function clearInput(formName){
  if( formName == "" )
    var inputs = $('#contentForm').find('input');
  else
    var inputs = $(formName).find('input');
  for( var i = 0; i < inputs.length; ++i ){
    $(inputs[i]).val("")  ;
  }
  var textarea = $('textarea');
  for( var i = 0; i < textarea.length; ++ i ){
    $(textarea[i]).val("") ;
  }
  $('input[type="checkbox"]').attr("checked",false);
}

/*
below code is about the tabs content after the first one
*/

function loadOrderData(type){
  $.ajax({
    type:'post',
    dataType:'json',
    data:{'type':type},
    url:soDataUrl,
    success:function(data){
      //console.log( data['data'] );
      var soArr = data['data'];
      var rows = [];
      var showBtnTxt = '<a class="green" href="#" onclick="loadSetupOrder(';
      var showBtnTxtEnd = ')"><i class="icon-print align-top bigger-110 icon-check"></i></a>';
      var editBtnTxt = '<a class="green" href="#" onclick="loadEditSetupOrder(';
      var editBtnTxtEnd = ')"><i class="icon-print  align-top bigger-110 icon-info-sign"></i></a>';
      var idArr = ['order-table','apr-table'];
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
        var arrIndex = 1;
        btnTxt = showBtnTxt;
        btnTxtEnd = showBtnTxtEnd;
        switch(item['state']){
          case '-1':
            stateTxt = '未通过';
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            arrIndex = 0;
            break;
          case '0':
            stateTxt = '暂存';
            btnTxt = editBtnTxt;
            btnTxtEnd = editBtnTxtEnd;
            arrIndex = 0;
            break;
          case '1':
            stateTxt = '已提交';
            break;
          case '2':
            stateTxt = '审核通过';
            break;
          case '5':
            stateTxt = '装机完成';
            break;
          default:
            stateTxt = '装机中';
            break;
        }
        row.push( stateTxt);
        row.push( btnTxt+ item['so_id'] + btnTxtEnd);
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
                          null,null,  null, null, null, null, { "bSearchable" :false, "bSortable": false }
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

$("#returnBtn").click(function(){
  $("#apr-table-div").css('display','block');
  $("#showOrder").css('display','none');
  $("#showOrder").find('span').html('');
});

$("#update_returnBtn").click(function(){
  $("#EditOrder").css('display','none');
  $("#table-div").css('display','block');
  $("#updateForm").find('input').val('');
});

$("#update_submitBtn").click( function(){
  var inputs = $('#updateForm').find('input');
  var flag = 1;
  for( var i = 0; i < inputs.length; ++i ){
    if( $(inputs[i]).hasClass('required') && $(inputs[i]).val() === "" ){
      alert( "请完整填写表单内容！" );
      $(inputs[i]).focus();
      flag = 0;
      break;
    }
  }
  if($("#update_si_list").val()=="" ){
    alert("请填写装机信息！");
    flag = 0;
  }
  if( flag === 1 ){
    $("update_submitBtn").attr('disabled',true);
    $("#updateForm").ajaxSubmit({
    type:'post',
    url: createUrl,
    success: function (data){
      console.log(data);
       if( data['status'] !== 0 ){
          alert("修改成功!");
      }
      //$("update_submitBtn").attr('disabled',false);
    }
    });

  }
});

function loadEditSetupOrder( soId ){
  $("#table-div").css('display','none');
  $("#EditOrder").css('display','block');
  $.ajax({
    type:'post',
    dataType:'json',
    data:{
      'soId' :soId
    },
    url : soItemUrl,
    success:function(data){
      var soItem = data['data'];
      //console.log(soItem);
      if( soItem['ac_time']  != null )
        soItem['ac_time'] = soItem['ac_time'].split(' ')[0];
      if( soItem['active_date'] != null )
        soItem['active_date'] = soItem['active_date'].split(' ')[0];
      if( soItem['register_date'] != null )
        soItem['register_date'] = soItem['register_date'].split(' ')[0];

      //$("#update_client_name").val("123");
      for( var key in soItem ){
        var id = "#update_" + key;
        if( $(id).length != 0 ){
          $(id).val( soItem[key] );
        }
        else if( id.indexOf('file') > 0 || id.indexOf('img') > 0 ){
          console.log(id.replace('_id','_download'));
          id = id.replace('_id','_download');
          if( soItem[key] != null ){
            $(id).attr('onclick',"downloadFile("+soItem[key]+")");
          }
          else{
            $(id).css('display','none');
          }
        }
      }
      loadUpdateSiTableData();
    }
  })
}

function loadSetupOrder(soId){
  $("#apr-table-div").css('display','none');
  $("#showOrder").css('display','block');
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
        var id = "#" + key;
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

      $('#contractDownload').attr('onclick',"downloadFile("+soItem['contract_file_id']+")")
      $("#taxDownload").attr('onclick',"downloadFile("+soItem['tax_file_id']+")");
      $("#licenseDownload").attr('onclick',"downloadFile("+soItem['license_file_id']+")");
      $("#cardDownload").attr('onclick',"downloadFile("+soItem['card_file_id']+")");
      $("#passportDownload").attr('onclick',"downloadFile("+soItem['passport_file_id']+")");
      $("#authDownload").attr('onclick',"downloadFile("+soItem['auth_file_id']+")");
      $("#clientImgDownload1").attr('onclick',"downloadFile("+soItem['client_img_1_id']+")");
      $("#clientImgDownload2").attr('onclick',"downloadFile("+soItem['client_img_2_id']+")");
      $("#clientImgDownload3").attr('onclick',"downloadFile("+soItem['client_img_3_id']+")");
      var rows = [];
      var soList = soItem['siList'];
      for( var i = 0 ; i < soList.length; ++ i ){
        var item = soList[i];
        var row = [];
        row.push(item['addr']);
        row.push(item['expandUser']);
        row.push(item['maintainUser']);
        row.push(item['machineType']);
        row.push(item['m_code']);
        row.push(item['keyboardType']);
        row.push(item['keyboard_code']);
        row.push(item['simType']);
        row.push(item['m_tcode']);
        row.push(item['annual_fee']);
        row.push( item['deposit_fee'] );
        row.push(item['remark']);
        rows.push(row);
      }
      loadTable( '#si-table', rows) ;
    }
  });
}

function loadUpdateSiTableData(){
  var si_list = $("#update_si_list").val();
  $.ajax({
    type:'POST',
    dataType:"json",
    data: { "si_list" : si_list}, 
    url: siDataUrl,
    success: function( data){
      if( data['data'] == null ) return;
      //console.log(data);
      var dataArr = data['data'];
      var rows = [];
      var editHtml = '<td><div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
                                <a class=\"green\" href=\"#\" onclick=\"editUpdateRow(';
      var editHtmlEnd =          ')\"><i class=\"icon-pencil bigger-130\"></i>\
                                </a>';
      var delHtml =            '<a class=\"red\" href=\"#\" onclick=\"deleteUpdateRow(';
      var delHtmlEnd =          ')\">\
                                  <i class=\"icon-trash bigger-130\"></i>\
                                </a>\
                              </div></td>';
      for( var i=0; i<dataArr.length; ++i ){
        var item = dataArr[i];
        var row = [];
        row.push( item["si_id"] );
        row.push( item["addr"] );
        row.push( item["expandUser"] );
        row.push( item["mType"] );
        row.push( item["keyboardType"]);
        row.push( item["simType"] );
        row.push( item["annual_fee"] );
        row.push( item["deposit_fee"]);
        row.push( "<span class='" + item['si_id'] + "'>" + item["remark"] + "</span>");
        row.push( editHtml + item['si_id'] + editHtmlEnd +delHtml + item['si_id'] + delHtmlEnd );
        rows.push(row);
      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#update_machineListTable' ) ) {
        oTable1 = $('#update_machineListTable').dataTable();
      }
      else {
  
      oTable1 = $('#update_machineListTable').dataTable({
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
                        { "bSearchable":false, "bSortable": false }
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

function editUpdateRow( si_id ){
  $.ajax({
    type:'post',
    url: setupItemUrl,
    data :{
      'si_id' : si_id
    },
    success: function(data){
      var setupItem = data['data'];
      //console.log( setupItem );
      $("#si_addr").val( setupItem['addr'] );
      $("#si_phone").val( setupItem['phone'] );
      $("#si_m_type").val( setupItem['m_type'] );
      $("si_keyboard_type").val( setupItem['keyboard_type'] );
      $("#si_sim_type").val( setupItem['sim_type'] );
      $("#si_sim_id").val( setupItem['sim_id'] );
      $("input[type='radio'][name='has_annual'][value='"+setupItem['has_annual']+"']").attr('checked','checked');
      $("#si_annual_fee").val( setupItem['annual_fee'] );
      $("input[type='radio'][name='has_deposit'][value='"+setupItem['has_deposit']+"']").attr('checked','checked');    
      $("#si_deposit_fee").val( setupItem['deposit_fee']);
      $("#si_expand_user").val( setupItem['expand_user'] );
      $("#si_remark").val( setupItem['remark'] );
      $("#si_id").val( setupItem['si_id'] );
      $("#si_so_id").val( setupItem['so_id'] );
      $("#si_type").html('1');
      $("#setup_item").dialog( "open");
    }
  });
  
}

function deleteUpdateRow(si_id){
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delSetupItemUrl,
      data: {'si_id' : si_id },
      success: function(data){
        console.log(data);
        if( data['status'] != false ){
          var si_list = $("#update_si_list").val();
          si_list = si_list.replace( si_id + ',' ,'' );
          $("#update_si_list").val( si_list);
          alert("删除成功！");
          $span = $("#update_machineListTable").find('.'+si_id);
          $tr = $("."+si_id).parents('td').parents('tr');
          console.log($tr);
          $tr.addClass('remove');
          var table = $('#update_machineListTable').DataTable();
          table.row('.remove').remove().draw();
        }
        else{
           alert("删除失败！");
        }
      }
    });
    
  }
}