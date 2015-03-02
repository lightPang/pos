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