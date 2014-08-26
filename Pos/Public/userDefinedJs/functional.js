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
		var form = "form_"+(tab-'0'+1);
		var node = document.getElementById(form);
		node.className= node.className+" active";
		var date1 = document.getElementsByName("date1")[0];
                date1.style.fontSize = "12px";
                var date2 = document.getElementsByName("date2")[0];
                date2.style.fontSize = "12px";
                var date = document.getElementsByName("date")[0];
                date.style.fontSize = "12px";
	}
)