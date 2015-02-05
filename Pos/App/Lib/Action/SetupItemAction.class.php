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
    public function getSetupItem(){
      if( $this->doAuth() && isset($_POST['si_id'] )){
        $sqlModel = M('setup_item');
        $siMap['si_id'] = $_POST['si_id'];
        $data = $sqlModel->where( $siMap )->select();
        $this->ajaxReturn( $data[0], 'ok','123');
      }
    }
    public function getSiData(){
      //echo 123;
      if( isset( $_SESSION['u_id'] ) && isset($_POST['si_list']) ){

        $si_list  = $_POST['si_list'];
        $sqlModel = M('setup_item');
        $data = array();
        $map['si_id'] = array('in',$si_list);
        $data = $sqlModel->where($map)->select();
        $userDao = M('user');
        $userData = $userDao->select();
        $machineDao = M('machinetype');
        $machineData = $machineDao->select();
        foreach ($data as $key => $value) {
          foreach ($userData as $userItem) {
            if( $value['expand_user'] == $userItem['u_id']){
              $data[$key]['expandUser'] = $userItem['name'];
              break;
            }
          }
          foreach ($machineData as $machineItem) {
            if( $value['m_type'] == $machineItem['mt_id'] ){
              $data[$key]['mType'] = $machineItem['mt_name'];
            }
            else if( $value['keyboard_type'] == $machineItem['mt_id'] ){
              $data[$key]['keyboardType'] = $machineItem['mt_name'];
            }
            else if( $value['sim_type'] == $machinetype['mt_id'] ){
              $data[$key]['simType'] = $machineItem['mt_name'];
            }
          }
        }
        $this->ajaxReturn( $data,"ok", count($data));
      }
    }

    public function getSetupItemByDistrict(){
      if( $this->doAuth() ){
        $siModel = M('setup_item');
        $userModel = M('user');
        $userData = $userModel->field('u_id,name')->select();
        $district_id = $_POST['district_id'];
        if( $district_id != 0 )
          $siMap['ad_id'] = $district_id;
        $siMap['setup_state'] = 1;
        $data = $siModel->where($siMap)->select();
        
        foreach ($data as $key => $value) {
          foreach ($userData as $userItem) {
            if( $userItem['u_id'] == $value['check_user']){
              $data[$key]['checkUser'] = $userItem['name'];
              break;
            }
          }
        }
        $this->ajaxReturn($data,'ok' ,'123');
      }
    }
  }
?>