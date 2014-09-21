<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
    public function index(){
      $this->display();
    }

    public function home(){
    	doAuth();
    	$this->display();
    }
    public function login(){
    	$account = $this->_post('account');
		$pwd = $this->_post('pwd');
		if($account && $pwd) {
			$userDao = M('User');
			$where = 'account = '."'$account'".' AND pwd = '."'$pwd'";
			$user = $userDao->where($where)->field('u_id, name')->select()[0];
			
			if($user) {
				session_start();
				$_SESSION['user'] = $user['name'];
				$_SESSION['u_id'] = $user['u_id'];
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
      echo "test2";
    }
}