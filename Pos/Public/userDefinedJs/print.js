var rootUrl = "/pos/Pos/index.php/";
$(document).ready(function(){
  loadPrintData();
});

function loadPrintData(){
  var so_id = $("#so_id").val();
  console.log( so_id );
  if( isNaN(so_id) == true ){
    alert("非法访问！");
  }
  else{
    $.ajax({
      type:'post',
      url: rootUrl + 'Apply/getSoItem',
      data:{
        'soId':so_id
      },
      success:function(data){
        var soItem = data['data'];
        for( var key in soItem ){
          var id = "#" + key;
          if( $(id).length != 0 ){
            $(id).html( soItem[key] );
          }
        }
        var siList = soItem['siList'];
        var appendHtml = '';
        for( var i = 0 ; i < siList.length; ++i ){
          var siItem = siList[i];
          var html = '';
          html += '<tr ><td class="td-list-title" >' + siItem['m_tcode'] + '</td>'
                + '<td class="td-content-sm">'+ siItem['phone'] + '</td>'
                + '<td class="td-content-sm">' + siItem['key'] + '</td>'
                + '<td class="td-list-title">' + siItem['machineType'] +'</td>'
                + '<td class="td-content-sm">' + siItem['m_code'] + '</td>'
                + '<td class="td-content-sm">' + siItem['keyboard_code'] + '</td>'
                + '</tr><tr><td class="td-list-title">' + siItem['isWired'] + '</td>' 
                + '<td>IP/SIM/地址</td><td colspan="4"></td></tr>';
          appendHtml += html;
        }
        $("#head_tr").after( appendHtml );
        var Week = ['日','一','二','三','四','五','六'];
        var date = new Date();
        var today = date.getFullYear() + '年' + (date.getMonth() + 1 ) + '月' + date.getDate() + '日 星期' + Week[ date.getDay()];
        $("#clientName").html( soItem['client_name'] );
        $("#client_num").html( soItem['client_number'] );
        $("#date").html( today );
        $("#rate").html( '（内）' + soItem['crInner'] + '（外）' + soItem['crOuter'] );
        $("#barcodeImg").attr('src' , '/barcode/produce_code.php?text='+ soItem['so_number'] );
        console.log( soItem['cr_inner_id']);
      }
    });
  }
}