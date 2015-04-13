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
      if( $this->doAuth() && isset($_POST['si_id']) ){
        $si_id = $_POST['si_id'];
        $siMap['si_id'] = $si_id;
        $siData = M('setup_item')->where( $siMap )->select()[0];
        if( $siData != null && $siData['state'] == 2 ){
          $siData['confirm_time'] = date('Y-m-d H:i:s');
          $siData['state'] = 7;
          $this->addModifyRecord( $siData, $siMap, 'setup_item','si_id');
          M('setup_item')->where( $siMap )->save( $siData );
          $this->ajaxReturn(null,null,1);
        }
        else{
          $this->ajaxReturn( null,null, 0 );
        }
      }
    }

    public function setupComplete(){
      if( $this->doAuth() && isset($_POST['si_id'] ) ){
        $si_id = $_POST['si_id'];
        $siMap['si_id'] = $si_id;
        $siData = M('setup_item')->where( $siMap )->select()[0];
        if( $siData != null && $siData['state'] == 7 ){
          $siData['setup_img'] = $_POST['file_id'];
          $siData['setup_user'] = $_POST['setup_user'];
          $siData['setup_time'] = date('Y-m-d H:i:s');
          $siData['state'] = 3;
          $this->addModifyRecord( $siData, $siMap, 'setup_item','si_id');
          M('setup_item')->where( $siMap )->save( $siData );
          $this->ajaxReturn(null,null,1);
        }
        else{
          $this->ajaxReturn( null,null, 0 );
        }
      }
    }

    public function setupReject(){
      if( $this->doAuth() && isset($_POST['si_id'] ) ){
        $si_id = $_POST['si_id'];
        $siMap['si_id'] = $si_id;
        $siData = M('setup_item')->where( $siMap )->select()[0];
        if( $siData != null && $siData['state'] == 2 ){
          $siData['setup_user'] = '';
          $siData['state'] = 1;
          $this->addModifyRecord( $siData, $siMap, 'setup_item','si_id');
          M('setup_item')->where( $siMap )->save( $siData );
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

    public function complete(){
      if( $this->doAuth()&& isset( $_POST['so_id'] ) ){
        $map['so_id'] = $_POST['so_id'];
        $soItem = M('setup_order')->where($map)->select()[0];
        if( $soItem['state'] == '2' ){

        }
        else{
          $this->ajaxReturn(null,'订单状态错误', 0 );
        }
      }
    }

}