<?php	
	/*
	*按照JSON协议打印API接口的处理结果
	*/
	function render($code, $message, $result = '') {	
		//按照JSON协议返回数据
		if($result) {
			echo json_encode(array(
								'state' => $code,
								'message' =>  $message,
								'result' => $result
								), JSON_UNESCAPED_UNICODE);
			
			exit;
		}
		else {
			echo json_encode(array(
								'state' => $code,
								'message' =>  $message
								), JSON_UNESCAPED_UNICODE);
			
			exit;
		}
	}
