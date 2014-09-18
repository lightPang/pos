$(document).ready(
  activeTab(),loadMCCBigData()
);

$('#submitBtn').click( function(){
  var url = $('#contentForm').attr('action');
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
  console.log( url );
  if( flag === 1 ){
    $.ajax({
      type:'POST',
      url: url,
      data:$('#contentForm').serialize(),
      success: function(data,textStatus, jqXHR){
      
        if( data['status'] == 1 ){
          alert("添加成功!");
          clearInput();
          console.log(data);
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
}

function activeTab(){
  var tab = document.getElementById("activeTab").value;
		if(tab === "")
		{
			tab = 0;
		}
		var li = document.getElementById("menu_bar").getElementsByTagName("li");
		var target = li[tab-'0'];
		target.className="active";
    if( tab >= 1 && tab <= 6){
      document.getElementById("storage_menu").style.display = "block";
    }
    
    if( tab >= 7 && tab <= 14){
      document.getElementById("operate_menu").style.display = "block";
    }
}

function loadMCCBigData(){
  $.ajax({
    type:'GET',
    dataType:"json", 
    url:"/pos/Pos/index.php/Operation/getMccBigData",
    success: function( data){
      console.log(data);
    }
  }
  );
}