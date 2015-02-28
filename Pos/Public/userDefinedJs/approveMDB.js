var rootUrl = '/pos/Pos/index.php/';
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
  var so_list = '';
  $boxList = $(className);
  
  for( var i = 0; i<$boxList.length; ++i){
    
    var box = $boxList.get(i);
    if( box.checked == true && $(box).val() != '' ){
      so_list += $(box).val() + ',';

    }
  }
  window.open( rootUrl + 'Approve/getLoadedMDBFile/so_list/'+so_list);
}



function produceMDB(className){
  var so_list = '';
  $boxList = $(className);
  
  for( var i = 0; i<$boxList.length; ++i){
    
    var box = $boxList.get(i);
    if( box.checked == true && $(box).val() != '' ){
      so_list += $(box).val() + ',';

    }
  }
  console.log( so_list );
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