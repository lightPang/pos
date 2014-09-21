<?php
  class CommonAction extends Action{
    protected function index(){}
    
    protected function doAuth($content=null){
      $flag = false;

      if( isset( $_SESSION['u_id'] ) ){
        $map['u_id'] = $_SESSION['u_id'];
        $user = M('user');
        $data = $user->where($map)->select();
        $authStr = $data[0]['auth'];
        $authArr = explode(',', $authStr);
        $i = 1;

        foreach( $authArr as $auth ){
          if( $auth != "" ){
            $this->assign( $auth, $i );
            $i ++;

            if($content == $auth)
              $flag = true;
          }
        }
        $this->assign('activeTab', $_GET['activeTab'] );
      }

      return $flag;
    }
    protected function updateUserInfo($arr){
      $user = M('user');
      $resArr = array();
      foreach( $arr as $userItem){
        $map['u_id'] = array( 'in', array($userItem['create_user'], $userItem['edit_user'] ) );
        $data = $user->where($map)->select();
        foreach($data as $dataItem){
          if( $dataItem['u_id'] == $userItem['create_user'] )
            $userItem['create_user'] = $dataItem['name'];
          if( $dataItem['u_id'] == $userItem['edit_user'] )
            $userItem['edit_user'] = $dataItem['name'];
        }
        array_push( $resArr, $userItem);
      }
      return $resArr;
    }
  }
?>