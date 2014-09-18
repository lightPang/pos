<?php
  class OperationAction extends Action{
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }
    
    public function addMccBig(){
      $name = $_POST['name'];
      $remark = $_POST['remark'];
      $u_id = $_SESSION['u_id'];
      $curTime = time();
      $MccBigItem['name'] = $name;
      $MccBigItem['create_user'] = $u_id;
      $MccBigItem['create_time'] = $curTime;
      $MccBigItem['edit_user'] = $u_id;
      $MccBigItem['remark'] = $remark;
      $MCCBig = M('mcc_big');
      if( $res = $MCCBig->add( $MccBigItem ) )
        $this->ajaxReturn($data, "表单数据保存成功!", 1);
      else
        $this->ajaxReturn( $data, "", 0);
    }
    
    public function getMCCBigData(){
      $MCCBig = M('mcc_big');
      $data = $MCCBig->select();
      //echo json_encode ( $data, JSON_UNESCAPED_UNICODE ); 
      $this->ajaxReturn( $data, "123", 1 );
    }
  }
?>