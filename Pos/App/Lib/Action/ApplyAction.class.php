<?php
// 处理装机申请
class ApplyAction extends CommonAction {
    public function index(){
      if( $this->doAuth() ){
        $map['state'] = 0;
        $map['u_id'] = $_SESSION['u_id'];
        $soModel = M("setup_order");
        $submitPage = $soModel->where($map)->count() ;
        $map['state'] = array('gt',0);
        $aprPage = $soModel->where($map)->count() ;
        $this->assign( 'submitPage', $submitPage);
        $this->assign( 'aprPage', $aprPage);
        $this->display();
      }
    }

    public function idIndex(){
      if( $this->doAuth() ){
        $this->display('index2');
      }

    }

    public function getSoData(){
      if( $this->doAuth() ){
        $map['c_id'] = $_SESSION['c_id'];
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

    public function getSoItem(){
      if( $this->doAuth() ){
        $soMap['so_id'] = $_POST['soId'];
        $soModel = M('setup_order');
        $data = $soModel->where($soMap)->select();
        $data = $data[0];
        $caModel = M('client_attr');
        $caMap['ca_id'] = $data['ca_id'];
        $data['clientAttr'] = $caModel->where( $caMap )->field('name')->select()[0]['name'];
        $mccModel = M('mcc_item');
        $mccMap['mi_id'] = $data['mi_id'];
        $mccItem = $mccModel->where($mccMap)->select()[0];
        $data['clientMcc'] = $mccItem['code'] . ' ' . $mccItem['remark'];
        $provinceModel = M('area_province');
        $proMap['ap_id'] = $data['ap_id'];
        $data['province'] = $provinceModel->where($proMap)->field('name')->select()[0]['name'];
        $cityModel = M('area_city');
        $cityMap['ac_id'] = $data['ac_id'];
        $data['city'] = $cityModel->where($cityMap)->field('name')->select()[0]['name'];
        $distModel = M('area_district');
        $disMap['ad_id'] = $data['ad_id'];
        $data['district'] = $distModel->where($disMap)->field('name')->select()[0]['name'];
        $crModel = M('client_rate');
        $crMap['is_inner'] = 1;
        $data['crInner'] = $crModel->where($crMap)->field('rate')->select()[0]['rate'];
        $crMap['is_inner'] = 0;
        $data['crOuter'] = $crModel->where($crMap)->field('rate')->select()[0]['rate'];
        $bankModel = M('bank');
        $bankMap['b_id'] = $data['bill_b_id'];
        $data['billBank'] = $bankModel->where($bankMap)->field('name')->select()[0]['name'];
        $bankMap['b_id'] = $data['account_b_id'] ;
        $data['acBank'] = $data['account_b_id'] ;
        $cpModel = M('client_platform');
        $cpMap['cp_id'] = $data['cp_id'];
        $data['clientPlatform'] = $cpModel->where($cpMap)->field('name')->select()[0]['name'];
        $bankOpModel = M('bank_operator');
        $bankOpMap['bo_id'] = $data['bo_id'];
        $data['bankOp'] = $bankOpModel->where($bankOpMap)->field('name')->select()[0]['name'];

        $map['si_id'] = array('in', $data['si_list']);
        $siModel = M('setup_item');
        $siList = $siModel->where($map)->select();
        $data['siList'] = $this->getFullSiList($siList);
        $this->ajaxReturn($data,'ok','123');
      }
    }

    protected function getFullSiList($siList){
      if(count($siList) == 0 )
        return null;

      $mTypeModel = M('machinetype');
      $mTypeData = $mTypeModel->select();
      $userModel = M('user');
      $userData = $userModel->select();
      foreach ($siList as $key => $value) {
        $u_id = $value['expand_user'];
        $mt_id = $value['m_type'];
        $kb_id = $value['keyboard_type'];
        $sm_id = $value['sim_type'];
        $mt_user = $value['maintain_user'];
        for(  $i = 0; $i<count($userData) ; ++$i ){
          if( $userData[$i]['u_id'] == $u_id )
            $siList[$key]['expandUser'] = $userData[$i]['name'];
          if( $userData[$i]['u_id'] == $mt_user )
            $siList[$key]['maintainUser'] = $userData[$i]['name'];
        }
        for( $i = 0 ; $i < count($mTypeData); ++$i ){
          if( $mTypeData[$i]['mt_id'] == $mt_id )
            $siList[$key]['machineType'] = $mTypeData[$i]['mt_name'];
          else if ( $mTypeData[$i]['mt_id'] == $kb_id )
            $siList[$key]['keyboardType'] = $mTypeData[$i]['mt_name'];
          else if( $mTypeData[$i]['mt_id'] == $sm_id )
            $siList[$key]['simType'] = $mTypeData[$i]['mt_name'];
        }
      }

      return $siList;
    }
    
    public function getSubmitDataByPage(){
      $this->doAuth();
      $uaMap['state'] = 0;
      $uaMap['c_id'] = $_SESSION['c_id'];
      //$uaMap['u_id'] = $_SESSION['u_id'];
      $sqlModel = M('setup_order');
      $data = $sqlModel->where($uaMap)->select();
      foreach ($data as $value => $key) {
        $map['si_id'] = array('in', $key['si_list']);
        $siModel = M('setup_item');
        $siList = $siModel->where($map)->select();
        $data[$value]['siList'] = $siList;
      }
      $this->ajaxReturn( $data, "123", 'ok' );
    }

    public function getPassedDataByPage(){
      $this->doAuth();
      $uaMap['state'] = array('gt',0);
      //$uaMap['c_id'] = $_SESSION['c_id'];
      $uaMap['u_id'] = $_SESSION['u_id'];
      $sqlModel = M('setup_order');
      $data = $sqlModel->where($uaMap)->select();
      foreach ($data as $value => $key) {
        $map['si_id'] = array('in', $key['si_list']);
        $siModel = M('setup_item');
        $siList = $siModel->where($map)->select();
        $data[$value]['siList'] = $siList;
      }
      $this->ajaxReturn( $data, "123", 'ok' );
    }

    public function createApplication(){
      if( $this->doAuth("setupApply") == true ){
        $sqlModel = M('setup_order');
        $resStr = $_POST['client_name'];
        $count = 0;
        //print_r($_POST);
        $data = array();
        foreach($_POST as $key => $value ){
           $data[$key] = $value;
        } 
        $fileSqlModel = M('file');
        $fileDir="Upload/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
                  mkdir($fileDir,0777, true);
        foreach( $_FILES as $key => $value ){
          
          $count++;
          $f_data = array();
          
             
          if( $_FILES[$key]['name'] != "" ){
            $fileInfo=pathinfo($_FILES[$key]["name"]);
            $serverFileName = $fileDir.time().".".$fileInfo['extension'];
            move_uploaded_file ($_FILES[$key]["tmp_name"],$serverFileName);
           
            $fp = fopen($serverFileName,'r');
            $file_data = fread($fp,$_FILES[$key]["size"]);
            // echo $file_data;
            $f_data['name'] = $_FILES[$key]["name"];
            $f_data['type'] = $_FILES[$key]["type"];
            $f_data['url'] = $serverFileName;
            $f_data['content'] = $file_data;
            fclose($fp); 
            
            $id = $fileSqlModel->add( $f_data );
            $keyName = $key . "_id";
            $data[$keyName] = $id;
            $resStr = $key;
          }
        }
        $data['so_number'] = $this->produceSoNum( $data['ac_time'], $data['si_list'],$data['bill_b_id']);
        $data['ac_time'] = date('Y-m-d H:i:s',strtotime($data['ac_time']));
        //$data['register_date'] = date('Y-m-d H:i:s',strtotime($data['register_date']));
        //$data['active_date'] = date('Y-m-d H:i:s',strtotime($data['active_date']));
        $data['c_id'] = $_SESSION['c_id'];
        $data['u_id'] = $_SESSION['u_id'];
        $siDao = M('setup_item');
        $siList = explode(',', $data['si_list'] );
        foreach ($siList as $value) {
          if( $value != '' ){
            $siMap['si_id'] = $value;
            $siData['ad_id'] = $data['ad_id'];
            $siDao->where( $siMap )->save( $siData );
          }
        }
        if( $data['so_id'] != '' ){
          $soMap['so_id'] = $data['so_id'] ;
          $res = $sqlModel->where( $soMap )->save( $data );
        }
        else
          $res = $sqlModel->add($data);
        $this->ajaxReturn( $data,"ok", 0 );
        
      }
      else{
        $this->ajaxReturn(null,"not ok" ,0 );
      }
    }

    protected function produceSoNum($ac_time, $si_list, $b_id){
      $serialNum = "";
      $c_id = $_SESSION['c_id'] ;
      switch ($c_id) {
        case '1':
          $serialNum .= 'G';
          break;
        
        default:
          break;
      }
      $time = str_replace('-', '',$ac_time );
      $serialNum .= $time;
      $si_id = explode(',', $si_list)[0];
      $siDao = M('setup_item');
      $siMap['si_id'] = $si_id;
      $siData = $siDao->where($siMap)->select()[0];
      $mTypeDao = M('machinetype');
      $mTypeMap['mt_id'] = $siData['m_type'];
      $mTypeData = $mTypeDao->where($mTypeMap)->select()[0];
      if( $mTypeData['is_wired'] == 1 ){
        $serialNum .= "Y";
      }
      else{
        $serialNum .= "N";
      }
      $bankDao = M('bank');
      $bankMap['b_id'] = $b_id;
      $bankData = $bankDao->where($bankMap)->select()[0];
      $serialNum .= substr($bankData['code'], 0,4);
      $siListCount = strlen( $si_list ) / 2;
      if( $siListCount < 10 )
        $serialNum .= '0'.$siListCount;
      else
        $serialNum .= $siListCount;
      $date1 = date("Y-m-d H:i:s", $ac_time );
      $date2 = date("Y-m-d H:i:s", strtotime('+1439 min',strtotime($ac_time)));
      $soMap['ac_time'] = array( 'between', array($date1,$date2) );
      $soMap['c_id'] = $_SESSION['c_id'];
      $soDao = M('setup_order');
      $soCount = $soDao->where( $soMap )->count();
      $soCount += 1;
      if( $soCount < 10 )
        $soCount = '00'.$soCount;
      else if ( $soCount < 100 )
        $soCount = '0'.$soCount;
      $serialNum .= $soCount;
      return $serialNum;
    }

}