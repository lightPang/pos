<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends CommonAction {
    public function index(){
      $this->display();
    }

    public function home(){
    	$this->doAuth();
    	$this->display();
    }

    public function change(){
      if( $this->doAuth() ){
        $c_id = $_GET['c_id'];
        if( strpos($_SESSION['c_auth'] , $c_id ) >= 0 ){
          $_SESSION['c_id'] = $c_id;
          $this->doAuth();
          $this->display('home');
        }
        else{
          $this->display('index');
        }
      }
      else{
        $this->display('index');
      }
    }
    
    public function login(){
    	$account = $this->_post('account');
  		$pwd = $this->_post('pwd');
  		if($account && $pwd) {
  			$userDao = M('User');
  			$where = 'account = '."'$account'".' AND pwd = '."'$pwd'";
  			$user = $userDao->where($where)->field('u_id, name,c_id,c_auth')->select()[0];
  			
  			if($user) {
  				session_start();
          $user['last_login_time'] = Date("Y-m-d H:i:s");
          $user['last_login_ip'] = get_client_ip();
          $userDao->where( $where )->save( $user );
          $logData['u_id'] = $user['u_id'];
          $logData['time'] = $user['last_login_time'];
          $logData['ip'] = $user['last_login_ip'];
          M('log_record')->add($logData);
  				$_SESSION['user'] = $user['name'];
  				$_SESSION['u_id'] = $user['u_id'];
          $_SESSION['c_id'] = $user['c_id'];
          $_SESSION['c_auth'] = $user['c_auth'];
  				echo 'true';
  				exit;
  			}
  			else {
  				echo "fail";
  				exit;
  			}
  		}
    }
    public function log_out(){
      session_destroy(); 
      $this->display('index');
    }
}