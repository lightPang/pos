<?php
  class OperationAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display();
    }
    
    public function addMccBig(){
      $name = $_POST['name'];
      $remark = $_POST['remark'];
      $u_id = $_SESSION['u_id'];
      $curTime = date('Y-m-d H:i:s',time());
      $MccBigItem['name'] = $name;
      $MccBigItem['create_user'] = $u_id;
      $MccBigItem['create_time'] = $curTime;
      $MccBigItem['edit_user'] = $u_id;
      $MccBigItem['remark'] = $remark;
      $MCCBig = M('mcc_big');
      if( $res = $MCCBig->add( $MccBigItem ) )
        $this->ajaxReturn($res, "表单数据保存成功!", 1);
      else
        $this->ajaxReturn( $data, "", 0);
    }
    
    public function delMCCBigItem(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mb_id']) ){
        $MCCBig = M('mcc_big');
        $map['mb_id'] = $_POST['mb_id'];
        $res = $MCCBig->where($map)->delete();
        $this->ajaxReturn( $res, "123", $res );
      }
    }
    
    public function getMCCBigData(){
      $MCCBig = M('mcc_big');
      if( isset( $_POST['itemId'] ) ){
        $map['mb_id'] = $_POST['itemId'] ;
        $data = $MCCBig->where($map)->select();
      }
      else
        $data = $MCCBig->select();
      //echo json_encode ( $data, JSON_UNESCAPED_UNICODE ); 
      if( isset( $_SESSION['u_id'] ) ){
       $data = $this->updateUserInfo( $data );
       $this->ajaxReturn( $data, "123", 1 );
      }
    }
    
    public function updateMCCBig(){
      $MCCBig = M('mcc_big');
     
      if( isset( $_POST['mb_id'] ) && isset( $_SESSION['u_id'] ) ){
        $map['mb_id'] = $_POST['mb_id'] ;
        $data['edit_user'] = $_SESSION['u_id'] ;
        $data['name'] = $_POST['name'];
        $data['edit_time'] = date('Y-m-d H:i:s',time());
        $data['remark'] = $_POST['remark'];
        $MCCBig->where($map)->save($data);
        $this->ajaxReturn( $data, "123", 1 );
      }
      $this->ajaxReturn( null, "123", 0 );
    }
  }
?>