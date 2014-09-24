var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "Apply/createApplication";
var updateUrl = rootUrl + "Apply/updateApplication";
var delUrl = rootUrl + "Area/delApplication";
var dataUrl = rootUrl + "Area/getApplicationData";
var provinceDataUrl = rootUrl + "Area/getProvinceData";
var cityDataUrl = rootUrl + "Area/getCityData";
var districtDataUrl = rootUrl + "Area/getDistrictData";
var bankDataUrl = rootUrl + "Bank/getBankData";
var bankOperatorDataUrl = rootUrl + "Bank/getOperatorData";
var clientPlatformUrl = rootUrl + "Operation/getClientPlatformData";
var clientAttrUrl = rootUrl + "Operation/getClientAttrData";
var mccItemDataUrl = rootUrl + "Operation/getMccItemData";

$(document).ready(function(){
  //loadData();
  loadExtraData('Province',provinceDataUrl,'ap_id');
  loadExtraData('City', cityDataUrl,'ac_id','ap_id');
  loadExtraData( 'District', districtDataUrl,'ad_id','ac_id' );
  loadExtraData( 'Bank', bankDataUrl,'b_id' );
  loadExtraData( 'BankOperator', bankOperatorDataUrl,'bo_id' );
  loadExtraData( 'Ca_id', clientAttrUrl,'ca_id' );
  loadExtraData( 'Cp_id', clientPlatformUrl,'cp_id' );
  loadExtraData( 'Mi_id', mccItemDataUrl,'mi_id' );
  //createDialog();
});
//传的是函数指针！！！！！不能再调用函数了！！！！！！
$("#selectProvince").change( function(){
  refreshLinkedData("Province","City",'#select');
});

$("#updateCity").change( function(){
  refreshLinkedData("City","District",'#select');
});

$("#updateProvince").change( function(){
  refreshCityData("#update");
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

function refreshCityData(type){
  var eleId = type + "Province";
  var citySelect = type + "City";
  var value = $(eleId).val();
  console.log( eleId );
  var selectOption = "option[class='" + value + "']";
  console.log(  $(selectOption).val() );
  $(citySelect).find("option").css('display', 'none');
  $(citySelect).val( $(selectOption).val() );
  $(selectOption).css('display', 'inherit');
}

function loadExtraData(name,dataUrl,id,class_id){
console.log( dataUrl );
  $.ajax({
    type:'GET',
    url: dataUrl,
    success:function(data){
      console.log(data);
      var dataArr = data['data'];
      var options = "";
      var displayStr = "'>";
      
      for( var i = 0 ; i < dataArr.length; ++ i ){
        if( typeof(class_id) != "undefined" )
          displayStr = "' class = '" + dataArr[i][class_id] + displayStr;
        options += "<option value = '" + dataArr[i][id] + displayStr + dataArr[i].name + "</option>";
      } 
      var selectName = "#select" + name;
      var updateName = "#update" + name;
      $(selectName).append( options);
      //$(updateName).append( options);
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

function updateRow(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  console.log( $tdlist.length);
  var ad_id = $tdlist.get(0);
  var ap_id = $tdlist.get(1);
  var ac_id = $tdlist.get(2);
  var name = $tdlist.get(3);
  var remark = $tdlist.get(4);
  console.log(ad_id);
  $("#updateProvince").val( $(ap_id).html() );
  $("#updateCity").val( $(ac_id).html() );
  $("#ad_id").val( $(ad_id).html() );
  $("#updateName").val( $(name).html() );
  $("#updateRemark").val( $(remark).html() );
  $("#dialog-modal").dialog( "open");
}

function deleteRow(ele){
  var $tr = $(ele).parents('tr');
  $tr.addClass('remove');
  console.log( $tr.find('td').html() );
  var ad_id = $tr.find('td').html();
  var confirmFlag = confirm("确认要删除吗？");
  if( confirmFlag === true ){
    $.ajax({
      type:'POST',
      url:delUrl,
      data: {'ad_id' : ad_id },
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
      //console.log(data);
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
        row.push( item["ad_id"] );
        row.push( item["ap_id"] );
        row.push( item["ac_id"] );
        row.push( item["name"] );
        row.push( item["remark"]);
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