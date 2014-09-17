<?php
	/*
	*在某些操作之前验证是否为登陆用户
	*/
	function doAuth() {
		session_start();
		if( !isset($_SESSION['user']) || !isset($_SESSION['u_id']) ) {
			header("Location:".U('Index/index'));
		}
	}
	
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
