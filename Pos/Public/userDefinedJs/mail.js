var sendMailUrl = rootUrl + 'Mail/sendMail';
var userMailUrl = rootUrl + 'Mail/getUserMail';
$(document).ready(function(){
  getUserMail();
});

  $('#upload').Huploadify({
    auto:true,
    fileTypeExts:"*.txt;*.xls;*.docx;*.doc;*.xlsx;*.pdf;*.jpg;",
    multi:true,
    formData:null,
    fileSizeLimit:700,
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
      console.log( response );
    },
    onDelete:function(file){
    },
    onCancel:function(file){
      var file_list = $("#file_list").val();
      var file_arr = file_list.split( ',' );
      var res_str = '';
      for( var i = 0 ; i < file_arr.length; ++ i ){
        if( file_arr[i] != '' ){
          var idx = file_arr[i].split('_')[0];
          if( idx != file['index'] ){
            res_str += file_arr[i] + ',';
          }
        }
      }
      $("#file_list").val( res_str );
    }
    });

function send(){
  $.ajax({
    type: 'post',
    url : sendMailUrl,
    data : $("#mailForm").serialize(),
    success : function(data){
      console.log( data );
      if( data['status'] == '1' )
        alert("发送成功！");
      else{
        alert("发送失败！\n " + data['info']);
      }
    }
  });
}

$("#addReceiver").click( function(){
  addUser( "receiver");
}) ;

$("#addCopyTo").click( function(){
  addUser( "copyTo" );
});

$("#addSecTo").click( function(){
  addUser( "secrTo");
});

function addUser(id){
  var userName = $("#search").val();
  var key = in_array( company, userName );
  var itemId = "#" + id;
  var curText = $( itemId ).val();
  if( key >= 0 ){
    var c_id = company[key]['c_id'];
    for(var i = 0; i < userMails.length; ++ i ){
      if( userMails[i]['c_id'] == c_id &&  curText.indexOf(  userMails[i]['email'] ) == -1 ){
        curText += userMails[i]['name'] + '-' + userMails[i]['email'] + ',';
      }
    }
    $(itemId).val( curText );
  }
  else if( curText.indexOf(  userName ) == -1){
    curText += userName + ',';
    $( itemId ).val( curText );
  }
  else{
    alert("用户已经在收件人列表中！");
  }
}

function in_array( source_arr, item){
  for( var i = 0; i < source_arr.length; ++ i ){
    if( source_arr[i]['name'] == item )
      return i;
  }
  return -1;
}

function getUserMail(){
  $.ajax({
    type:'post',
    url : userMailUrl,
    success : function( data ){
      userMails = data['data']['user'];
      company = data['data']['company'];
      tags = new Array();
      for( var i = 0 ; i < company.length; ++i ){
        tags.push( company[i]['name'] );
      }
      for( var i = 0 ; i < userMails.length; ++i ){
        tags.push( userMails[i]['name'] + '-' + userMails[i]['email'] );
      }
      $( "#search" ).autocomplete({
          source: tags
      });
    }
  })
}

        