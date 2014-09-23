$(document).ready(
  function(){
  updateTabIndex();
  activeTab();
  }
);

function activeTab(){
  var tab = document.getElementById("activeTab").value;
		if(tab === "")
		{
			tab = 0;
		}
		var $li = $("#menu_bar").find("li");
		var target = $li.get( tab );
    console.log(tab);
		$(target).addClass('active');
    var ul_id = $(target).parent('ul').attr('id');
    if( ul_id != "undefined" ){
      $("#"+ul_id).css("display", "block");
    }
}

function updateTabIndex(){
  var $liList = $('#menu_bar').find('li');
  var $storageList = $("#storage_menu").children('li');
  var $operationList = $("#operate_menu").children('li');
  var $storageLi = $("#storage_li");
  var $operationLi = $("#operation_li");
  if( $storageLi.html() !== "undefined" && $storageList.length == 0 ){
    $storageLi.remove();
  }
  if( $operationLi.html() !== "undefined" && $operationList.length === 0 ){
    $operationLi.remove();
  }
  console.log( $liList.length);
  for( var i = 0; i<$liList.length; ++i ){
    var li = $liList.get(i);
    var a = $($(li).children()).get(0);
    var href = $(a).attr('href');
    $(a).attr('href', href+ (i).toString());
  }
}

