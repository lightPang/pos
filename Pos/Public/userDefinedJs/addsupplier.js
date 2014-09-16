$('#addbtn').click(function(event){
	event.preventDefault();
	var url = $('#addsupplier_form').attr('action'),
		supplier = $('#supplier').val(),
		remark = $('#remark').val();
	if(supplier != ""){
		$(this).attr('disabled', true);
		$.post(url, {supplier:supplier, remark:remark}, function(data){
			if(data == "true"){
				alert("添加成功！");
				$('#supplier').val("");
				$('#remark').val("");
			}
			else{
				alert(data);
			}			
		})
		.complete(function(){
			$('#addbtn').attr('disabled', false);
		})
	}
});