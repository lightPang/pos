<?php
  class SetupItemAction extends CommonAction{
    
    public function create(){
      if( $this->doAuth("setupApply") == true ){
        $data = array();
        foreach ($_POST as $key => $value) {
          $data[$key] = $value;
        }
        $sqlModel = M('setup_item');
        if( $data['si_id'] == "" ){
          $res = $sqlModel->add($data);
          $msg = "add";
        }
        else{
          $map['si_id'] = $data['si_id'];
          $sqlModel->where($map)->save($data);
          $res = 0;
          $msg = "save";
        }
        $this->ajaxReturn( $data, $msg,$res);
      }
    }
    public function getSetupItem(){
      if( $this->doAuth() && isset($_POST['si_id'] )){
        $sqlModel = M('setup_item');
        $siMap['si_id'] = $_POST['si_id'];
        $data = $sqlModel->where( $siMap )->select();
        $this->ajaxReturn( $data[0], 'ok','123');
      }
      else if( $this->doAuth() ){
        $sqlModel = M('si_view');
        $siMap['c_id'] = $_SESSION['c_id'];
        $siMap['state'] = 3;
        $data = $sqlModel->where( $siMap )->select();
        $this->ajaxReturn( $data, 'ok', 1);
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

    public function del(){
      if( $this->doAuth() && $_POST['si_id'] ){
        $siModel = M('setup_item');
        $soModel = M('setup_order');
        $siMap['si_id'] = $_POST['si_id'];
        $siData = $siModel->where($siMap)->select()[0];
        if( $siData['so_id'] != '0' ){
          $soMap['so_id'] = $siData['so_id'];
          $soData = $soModel->where($soMap)->select()[0];
          $si_list['si_list'] = str_replace( $_POST['si_id'].",", '', $soData['si_list']) ;
          $soModel->where($soMap)->save( $si_list );
        }
        $res = $siModel->where($siMap)->delete();
        $this->ajaxReturn($res, 'ok', 1);
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