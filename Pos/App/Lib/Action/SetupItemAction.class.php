<?php
  class SetupItemAction extends CommonAction{
    
    public function create(){
      if( $this->doAuth("setupApply") == true ){
        $data = array();
        foreach ($_POST as $key => $value) {
          $data[$key] = $value;
        }
        $sqlModel = M('setup_item');
        if( $data[$key]['si_id'] == "" ){
          $res = $sqlModel->add($data);
        }
        else{
          $map['si_id'] = $data[$key]['si_id'];
          $res = $sqlModel->where($map)->save($data);
        }
        $this->ajaxReturn( $data, "ok",$res);
      }
    }

    public function getSiData(){
      //echo 123;
      if( isset( $_SESSION['u_id'] ) && isset($_POST['si_list']) ){

        $si_list = explode(",", $_POST['si_list']);
        $sqlModel = M('setup_item');
        $data = array();
        $map['mi_id'] = array('in',$si_list);
        $data = $sqlModel->where($map)->select();
        $this->ajaxReturn( $data,"ok", count($data));
      }
    }
  }
?>