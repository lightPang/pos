var rootUrl = "/pos/Pos/index.php/";
var setupItemUrl  = rootUrl + 'SetupItem/getSetupItemByDistrict';
var checkListUrl = rootUrl + "Check/getRecords";
var addRecordUrl = rootUrl + "Check/addRecord";
$(document).ready(function(){
  loadMachineData(0);
});


$("#returnBtn").click(function(){
  $("#record").css('display','none');
  $("#table-div").css('display', 'block');
});

function addRecord(){
  if( checkInput() == true ){
    $("#record-form").ajaxSubmit({
      type:'post',
      url : addRecordUrl,
      success:function(data){ 
        var reg = new RegExp("<[^>]+>","g" );
        data = data.replace( reg,"" );
        data = JSON.parse(data);
        console.log( data );
        loadCheckList( $("#siRecord").val() );
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

function loadCheckList( si_id ){
  $("#table-div").css('display', 'none');
  $("#record").css('display','block');
  $("#siRecord").val( si_id );
  $.ajax({
    type : 'post',
    dataType:"json",
    data:{
      'si_id' : si_id
    },
    url : checkListUrl,
    success : function(data){
      var recordList = data['data'];
      console.log( data);
      var inHtml = "";
      var tr = '';
      var si_id = "";
      for( var i = 0 ; i < recordList.length; ++i ){
        var recordItem = recordList[i];
        si_id = recordItem['si_id'];
        tr = "<tr>";
        tr += "<td>" + recordItem['time'] + "</td>";
        var addSign = '';
        if( recordItem['is_add'] == 1 ){
          addSign = '<i class="icon-ok"></i>';
        }
        tr += "<td>" + addSign + "</td>"
            + "<td>" + recordItem['userName'] + "</td>"
            + "<td>" + recordItem['confirm_code'] + "</td>"
            + "<td><button onclick='downloadFile(" + recordItem['img_id'] +")'>下载</button></td>"
            + "<td>" + recordItem['remark'] + "</td></tr>";
        inHtml += tr;
      }
      $("#record-table").find('tbody').html(inHtml);
    }
  });
}

function loadMachineData(district_id){
  $.ajax({
    type:'post',
    dataType:"json",
    data:{
      'district_id':district_id
    },
    url:setupItemUrl,
    success:function(data){
      var mList = data['data'];
      var rows = [];
      var btnTxt = '<a class="green" href="#" onclick="loadCheckList('
      var btnTxtEnd = ')"><i class="icon-print  align-top bigger-110 icon-info-sign"></i></a>';
      for( var i =0 ; i < mList.length; ++i ){
        var item = mList[i];
        var row = [];
        row.push( item['m_code']);
        row.push( item['m_tcode']);
        row.push( item['addr']);
        row.push( item['setup_time']);
        row.push( item['check_time']);
        row.push( item['checkUser']);
        row.push( calDays(item['check_time']));
        row.push( btnTxt+ item['si_id']  + btnTxtEnd);
        rows.push(row);
      }
      var oTable;
      if( $.fn.dataTable.isDataTable( '#order-table' ) ){
        oTable = $("#order-table").dataTable();
      }
      else{
        oTable = $("#order-table").dataTable({
          "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                        null,null,  null, null, null, null,null, { "bSortable": false }
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
  });
}
/**
*function used to calculate days between two date
**/
function calDays(date){
  //var date = "2015-1-06 11:17:03";
  //var date2 = "2014-10-09 11:17:03";
  date = datetime_to_unix( date);
  var date2 = (new Date()).valueOf();
  var days=Math.floor((date2 - date)/(24*3600*1000));
  return days;
}

function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime());
}
