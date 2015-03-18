<?php
  class UserAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display();
    }
    
    public function createUser(){
      if( isset($_SESSION['u_id']) && isset( $_POST['name'] )){
        $data['name'] = $_POST['name'];
        $data['pwd'] = $_POST['pwd'];
        $data['account'] = $_POST['account'];
        $data['c_id'] = $_POST['c_id'] ;
        $data['auth'] = $_POST['auth'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_time'] = date('Y-m-d H:i:s',time());
        $user = M('user');
        $map['account'] = $_POST['account'];
        if( $user->where($map)->select() == false ){
          $res = $user->add( $data );
          $this->ajaxReturn( null, "insertion", $res );
        }
        else{
          $this->ajaxReturn( $data, "insertion", 0 );
        }
      }
      else{
        $this->ajaxReturn($data, "insertion failed!", 0);  
      }
    }
    
    public function getUserData(){
      if( $this->doAuth('staffManage')  && isset( $_POST['u_id'] ) ){
        $map['u_id'] = $_POST['u_id'] ;
        $user = M('user');
        $data = $user->where( $map )->field('u_id,auth,account,name,c_id,email,phone,last_login_time,last_login_ip')->select();
        $this->ajaxReturn( $this->updateCompanyInfo( $data ), "get", 1 );
      }
      else if( isset($_POST['c_id'] ) ){
        $user = M('user');
        $map['c_id'] = $_SESSION['c_id'];
        $data = $user->where($map)->field('u_id,name,c_id')->select();
        $this->ajaxReturn( $data, "get", 1 );
      }
      else if( $this->doAuth('staffManage') ){
        $user = M('user');
        $data = $user->field('u_id,name,c_id,email,phone,last_login_time,last_login_ip')->select();
        $this->ajaxReturn( $this->updateCompanyInfo( $data ), "get", 1 );
      }
      else{
        $this->ajaxReturn( null, "get Failed!", 0 );
      }
    }
    public function delUser(){
      if( $this->doAuth('staffManage') && isset( $_POST['u_id'] ) ){
        $user = M('user');
        $map['u_id'] = $_POST['u_id'] ;
        $res = $user->where($map)->delete();
        $this->ajaxReturn( null, "delete ok", 1 );
      }
      else{
        $this->ajaxReturn( $_POST['u_id'], null, 1 );
      }
    }

    public function get_login_record(){
      if( isset( $_SESSION['u_id'] ) ){
        $map['u_id'] = $_SESSION['u_id'];
        $res = M('log_record')->where( $map )->select();
        $user = M('user')->where( $map )->field('u_id,c_id,name')->select();
        $user = $this->updateCompanyInfo( $user );
        $this->ajaxReturn( $res , $user[0], 1);
      }
    }
    
    public function updateUser(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['u_id'] ) ){
        $map['u_id'] = $_POST['u_id'];
        if( $_POST['pwd'] !== "" )
          $data['pwd'] = $_POST['pwd'] ;
        $data['name'] = $_POST['name'] ;
        $data['c_id'] = $_POST['c_id'];
        $data['auth'] = $_POST['auth'];
        $user = M('user');
        $user->where($map)->save($data);
        $this->ajaxReturn(null,"update",1);
      }
    }
    
    protected function removeMsg($arr){
      $res = Array();
      foreach( $arr as $user ){
        unset( $user['pwd'] );
        unset( $user['account'] );
        array_push( $res, $user );
      }
      return $this->updateUserInfo( $res );
    }
  }
?>