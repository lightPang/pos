<?php

import("@.ORG.Access");
class IndexAction extends CommonAction {
    public function index(){
      $this->display();
    }

    public function home(){
    	$this->doAuth();
    	$this->display();
    }
    
    public function login(){
    	$account = $this->_post('account');
		$pwd = $this->_post('pwd');
		if($account && $pwd) {
			$userDao = M('User');
			$where = 'account = '."'$account'".' AND pwd = '."'$pwd'";
			$user = $userDao->where($where)->field('u_id, name,c_id')->select()[0];
			
			if($user) {
				session_start();
				$_SESSION['user'] = $user['name'];
				$_SESSION['u_id'] = $user['u_id'];
        $_SESSION['c_id'] = $user['c_id'];
				echo 'true';
				exit;
			}
			else {
				echo "fail";
				exit;
			}
		}
    }

	public function test(){
      
      $this->display();
    }

    public function test2(){
      $fModel = M('file');
      $map['file_id'] = 243;

      $data = $fModel->where($map)->select()[0];
      header('Content-Disposition: attachment; filename="' . $data['name'] . '"'); 
      echo $data['content'];
    }
}