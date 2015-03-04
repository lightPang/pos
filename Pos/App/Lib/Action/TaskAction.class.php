<?php
// 处理任务分派
class TaskAction extends CommonAction {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      if( $this->doAuth() ){
        $this->display('setup');
      }
    }

    public function maintain(){
      $this->assign("activeTab", $_GET["activeTab"]);
      if( $this->doAuth() ){
        $this->display('maintain');
      }
    }

    public function back(){
      $this->assign("activeTab", $_GET["activeTab"]);
      if( $this->doAuth() ){
        $this->display('back');
      }
    }
    public function confirm(){
      if( $this->doAuth() && isset($_POST['so_id']) ){
        $so_id = $_POST['so_id'];
        $soMap['so_id'] = $so_id;
        $soData = M('setup_order')->where( $soMap )->select()[0];
        if( $soData != null ){
          $soData['confirm_time'] = date('Y-m-d H:i:s');
          $soData['state'] = 6;
          M('setup_order')->where( $soMap )->save( $soData );
          $this->ajaxReturn(null,null,1);
        }
        else{
          $this->ajaxReturn( null,null, 0 );
        }
      }
    }
    public function getSoData(){
      if( $this->doAuth() ){
        $map['c_id'] = $_SESSION['c_id'];
        $map['setup_user'] = $_SESSION['u_id'];
        $map['state'] = array('gt', 4);
        $soModel = M('setup_order');
        $data = $soModel->where($map)->select();
        $bankModel = M('bank');
        $bankData = $bankModel->select();
        foreach ($data as $key => $value) {
          foreach ($bankData as $bank) {
            if( $bank['b_id'] == $value['bill_b_id'])
              $data[$key]['billBank'] = $bank['name'];
          }
        }
        $this->ajaxReturn($data, '123','ok');
      }
    }

}