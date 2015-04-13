
/*
check box functions

*/
$("#apr_check").on('change', function(){ checkMainBox('.apr',this);});

$("#loaded_check").on('change', function(){ checkMainBox('.loaded',this);});

function checkMainBox( className,ele){
  $boxList = $(className);
  for( var i = 0; i<$boxList.length; ++i){
    var $box = $boxList.get(i);
    $box.checked = ele.checked;
  }
}

function produceLoadedMDB( className ){
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
          alert("请勾选同属一个装机单的装机项目进行操作！");
          return;
        }
      }
      si_list += si_id + ',';
    }
  }
  window.open( rootUrl + 'Approve/getLoadedMDBFile/so_id/'+ so_id + '/si_list/'+si_list);
}



function produceMDB(className){
  var so_list = '';
  $boxList = $(className);
  var bill_b = '';
  for( var i = 0; i<$boxList.length; ++i){
    var box = $boxList.get(i);
    var boxVal = $(box).val();
    var so_id = boxVal.split('-')[0];
    var bill_b_id = boxVal.split('-')[1];
    if( box.checked == true && $(box).val() != '' ){
      if( bill_b == '' )
        bill_b = bill_b_id;
      else{
        if( bill_b != bill_b_id ){
          alert("请勾选同属一个收单银行的装机单进行操作！");
          return;
        }
      }
      so_list += so_id + ',';
    }
  }
  //console.log( so_list );
  window.open( rootUrl + 'Approve/getMDBFile/so_list/'+so_list);
}

function uploadMDB(){
  var val = $("#id-input-file-2").val();
  if( val == '' ){
    alert( "请选择需要导入的MDB文件！");
  }
  else if( val.indexOf(".mdb") < 0 && val.indexOf(".MDB") < 0 ){
    alert( "请上传MDB文件！");
  }
  else{
    console.log( 'uploading');
    $("#mdb_form").ajaxSubmit({
      type:'post',
      url : rootUrl +'Approve/reloadMDB',
      success: function (data){
        var reg = new RegExp("<[^>]+>","g" );
        data = data.replace( reg,"" );
        data = JSON.parse(data);
        console.log(data);
        if( data['status'] == 1 ){
            alert("上传成功!");
            loadOrderData(0);
        }
        else{
          alert( data['info'] );
        }
      }
      //$("update_submitBtn").attr('disabled',false);
    });
  }
}