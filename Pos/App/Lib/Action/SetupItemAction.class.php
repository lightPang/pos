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
      if( $this->doAuth("setupApply") == true && isset($_POST['si_list']) ){

        $si_list = explode(",", $_POST['si_list']);
        $sqlModel = M('setup_item');
        $data = array();
        foreach ($si_list as $si_id) {
          $map['mi_id'] = $si_id;
          $item = $sqlModel->where($map)->select();
          if( $item!=false){
            array_push($data, $item[0]);
          }
        }
        $this->updateUserInfo( $data);
        $this->ajaxReturn( $data,"ok", count($data));
      }
    }
  }
?>