$(document).ready(function(){
	$('#addbtn').click(function(event){
		event.preventDefault();
		var form = $('#addmachinetypeform'),
			url = form.attr('action'),
			mp_id=$('#m_provider').val(),
			mt_name=$("input[name=mt_name]").val(),
			mt_number=$("input[name=mt_number]").val(),
			type=$("#type").val(),
			is_wired=$("input[name=is_wired]:checked").val() ? 1 : 0,
			is_identified=$("input[name=is_identified]:checked").val() ? 1 : 0,
			is_worked=$("input[name=is_worked]:checked").val() ? 1 : 0,
			is_keyboard=$("input[name=is_keyboard]:checked").val() ? 1 : 0,
			is_simed=$("input[name=is_simed]:checked").val() ? 1 : 0,
			remark=$('remark').val();
			
		if(mt_name == ""){
			$('#error_name').html("机器名称不能为空");
		}
		if(mt_number == ""){
			$('#error_number').html("机型号不能为空");
		}
		if(mt_name!="" && mt_number!=""){
			$(this).attr('disabled', true);

			$.post(url,
				   {mp_id:mp_id,
				   	mt_name:mt_name,
				   	mt_number:mt_number,
				   	type:type,
				   	is_wired:is_wired,
				   	is_identified:is_identified,
				   	is_worked:is_worked,
				   	is_keyboard:is_keyboard,
				   	is_simed:is_simed,
				   	remark:remark},
				   	function(data){
				   		alert(data);
				   	})
			.complete(function(){
				$('#addbtn').attr('disabled', false);
			});
		}
	});
	

	//input area focus and blur event
	$('input[name=mt_name]').focus(function(){
		$('#error_name').html("");
	})
	.blur(function(){
		if($(this).val() == ""){
			$('#error_name').html("机器名称不能为空");
		}
	});

	$('input[name=mt_number]').focus(function(){
		$('#error_number').html("");
	})
	.blur(function(){
		if($(this).val() == ""){
			$('#error_number').html("机型号不能为空");
		}
	});;
});
