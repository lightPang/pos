$(document).ready(
	function(){

		var tab = document.getElementById("activeTab").value;
		if(tab=="")
		{
			tab = 0;
		}
		var li = document.getElementById("menu_bar").getElementsByTagName("li");
		var target = li[tab-'0'];
		target.className="active";
	}
)