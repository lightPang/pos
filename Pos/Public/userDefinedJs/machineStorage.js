$(document).ready(function(){
	loadStorageData();
	createDialog();
});

function createDialog(){
  $("#dialog-modal").dialog({
                height: 'auto',
                width: '65%',
                dialogClass: "no-close",
                modal: true,
                autoOpen: false
    });
}

function viewDetail(ele){
  var $tr = $(ele).parents('tr');
  var $tdlist = $tr.find( $('td') );
  var ids = $tdlist.get(0);
  var inputs = $(ids).find("input");
  var c_id = $(inputs).get(0);
  var m_type = $(inputs).get(1);
  
  loadDetailData( $(c_id).val(), $(m_type).val() );
  $("#dialog-modal").dialog( "open");
}

function loadDetailData(c_id, m_type){
  $.ajax({
    type:'POST',
    dataType:"json", 
    data:{'c_id':c_id, 'm_type':m_type},
    url:"/pos/Pos/index.php/MachineStorage/getMachineDetail",
    success: function( data){
      var Arr = data['data'];
      var states = ['在仓','正常使用','坏机待修'];
      var rows = [];
      for( var i=0; i<Arr.length; ++i ){
        var item = Arr[i];
        var row = [];
        row.push( item['m_code']);
        row.push( item["warehouse_name"] );
        row.push( item["mt_name"] );
        row.push( item["mt_number"]);
        row.push( states[ item["state"] -1]);
        row.push( item["create_time"] );
        rows.push(row);
      }
      var oTable1;
      if ( $.fn.dataTable.isDataTable( '#detailTable' ) ) {
        oTable1 = $('#detailTable').dataTable();
      }
      else {
  
      oTable1 = $('#detailTable').dataTable({
        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示  
        "aLengthMenu" : [10, 20, 50], //更改显示记录数选项  
        "bPaginate" : true, //是否显示（应用）分页器  
        "aoColumns" : [
                       null, null, null, null, null, null
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

function loadStorageData(){
  $.ajax({
    type:'POST',
    dataType:"json", 
    url:"/pos/Pos/index.php/MachineStorage/getAllMachine",
    success: function( data){
      var Arr = data['data'];
      var rows = [];
      var editHtml = '<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">\
																<a class=\"green\" href=\"#\" onclick=\"viewDetail(this)\">\
																	<button class="btn btn-sm btn-primary">详细</button>\
																</a>\
															</div>';
      for( var i=0; i<Arr.length; ++i ){
        var item = Arr[i];
        var row = [];
        row.push( '<input type="hidden" value="'+item["c_id"] + '" />' + 
                  '<input type="hidden" value="'+item["m_type"] + '" />');
        row.push( item["warehouse_name"] );
        row.push( item["mt_name"] );
        row.push( item["mt_number"]);
        row.push( item["state_1"] );
        row.push( item["state_2"] );
        row.push( item["state_3"] );
        row.push( item["total"] );
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
              			   {"bSortable": false }, null, null, null, null, null, null, null, { "bSortable": false }
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