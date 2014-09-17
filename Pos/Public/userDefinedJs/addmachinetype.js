$('#addbtn').click(function(event){
	event.preventDefault();
	var form = $('#addmachinetypeform'),
		url = form.attr('action'),
		m_provider=$("input[name='machineprovider']").val(),
		m_name=$("input[name='m_name']").val(),
		m_number=$("input[name='m_number']").val(),
		m_type=$("input[name='m_type']").val(),
		is_wired=$("input[name='is_wired']:checked").val() ? 1 : 0,
		is_identified=$("input[name='is_identified']:checked").val() ? 1 : 0,
		is_worked=$("input[name='is_worked']:checked").val() ? 1 : 0,
		is_keyboard=$("input[name='is_keyboard']:checked").val() ? 1 : 0,
		is_simed=$("input[name='is_simed']:checked").val() ? 1 : 0,
		remark=$('remark').val();
	
	if(m_name!="" && m_number!=""){
		$(this).attr('disabled', true);

		$.post(url,
			   {m_provider:m_provider,
			   	m_name:m_name,
			   	m_number:m_number,
			   	m_type:m_type,
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