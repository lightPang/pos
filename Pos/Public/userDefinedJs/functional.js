$(document).ready(
  function(){
  activeTab();
  }
);

function activeTab(){
  var tab = document.getElementById("activeTab").value;
		if(tab === "")
		{
			tab = 0;
		}
		var li = document.getElementById("menu_bar").getElementsByTagName("li");
		var target = li[tab-'0'];
		target.className="active";
    if( tab >= 8 && tab <=13 ){
      $("#operate_menu").css("display", "block");
    }
    if( tab >= 2 && tab <=7 ){
      $("#storage_menu").css("display", "block");
    }
}

