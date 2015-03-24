<?php
  class CommonAction extends Action{
    protected function index(){}
    
    protected function doAuth($content){
      $flag = false;

      if( isset( $_SESSION['u_id'] ) ){
        $map['u_id'] = $_SESSION['u_id'];
        $user = M('user');
        $data = $user->where($map)->select();
        $authStr = $data[0]['auth'];
        $authArr = explode(',', $authStr);
        $i = 1;
        if( $content == null )
          $flag = true;
        foreach( $authArr as $auth ){
          if( $auth != "" ){
            $this->assign( $auth, $i );
            $i ++;

            if($content == $auth)
              $flag = true;
          }
        }
        $this->assign('activeTab', $_GET['activeTab'] );
        $this->assign('name', $_SESSION['user']);
      }

      return $flag;
    }

    protected function addModifyRecord($data,$map,$table_name,$id_name,$createFlag = false){
      $model = M($table_name);
      $origin_Item = $model->where( $map )->select()[0];
      $modifyItem = array();
      foreach ($data as $key => $value) {
        if( $value != $origin_Item[$key] ){
          $modifyItem[$key] =  $origin_Item[$key]. ' => ' .$value;
        }
      }
      if( $createFlag == true ){
        $modify_record['table_name'] = $table_name;
        $modify_record['item_id'] = $map[$id_name];
        $modify_record['u_id'] = $_SESSION['u_id'];
        $modify_record['time'] = Date( 'Y-m-d H:m:s');
        $modify_record['content'] = json_encode( '创建' );
        M('modify_record')->add( $modify_record );
      }
      else if( count( $modifyItem ) != 0 ){
        $modify_record['table_name'] = $table_name;
        $modify_record['item_id'] = $map[$id_name];
        $modify_record['u_id'] = $_SESSION['u_id'];
        $modify_record['time'] = Date( 'Y-m-d H:m:s');
        $modify_record['content'] = json_encode( $modifyItem, JSON_UNESCAPED_UNICODE );
        M('modify_record')->add( $modify_record );
      }
    }

    public function getInfoData(){
      if( $this->doAuth() ){
        $data = array();
        $provinceModel = M('area_province');
        $data['province'] = $provinceModel->select();
        $cityModel = M("area_city");
        $data['city'] = $cityModel->where("is_active=1")->select();
        $districtModel = M('area_district');
        $data['district'] = $districtModel->where("is_active=1")->select();
        $bankModel = M('bank');
        $data['bank'] = $bankModel->where("is_active=1")->select();
        $bankOpModel = M('bank_operator');
        $data['bankop'] = $bankOpModel->where("is_active=1")->select();
        $caModel = M('client_attr');
        $data['clientAttr'] = $caModel->select();
        $cpModel = M('client_platform');
        $data['clientPlatform'] = $cpModel->select();
        $userModel = M('user');
        $data['user'] = $userModel->field('u_id,name')->select();
        $mpModel = M('machinetype');
        $mpMap['mt_type'] = 0;
        $data['machineType'] = $mpModel->where($mpMap)->select();
        $mpMap['mt_type'] = 1;
        $data['keyboardType'] = $mpModel->where($mpMap)->select();
        $mpMap['mt_type'] = 2;
        $data['sim'] = $mpModel->where($mpMap)->select();
        $miModel = M('mcc_item');
        $data['mcc'] = $miModel->where("is_active=1")->select();
        $crModel = M('client_rate');
        $crMap['is_inner'] = 1;
        $crMap['is_active'] = 1;
        $data['ri'] = $crModel->where($crMap)->select();
        $crMap['is_inner'] = 0;
        $data['ro'] = $crModel->where($crMap)->select();
        $data['posType'] = M('pos_type')->select();
        $data['machineVersion'] = M('machine_version')->select();
        $this->ajaxReturn($data, 'ok','123');
      }
    }

    public function get_record_list(){
      if( $this->doAuth() ){
        $map['table_name'] = $_POST['table_name'];
        $map['item_id'] = $_POST['item_id'];
        $Model = new Model();  
          
        $data = $Model->query($sql);
        $data = M('mr_view')->where( $map)->order('time desc') ->select();
        for ( $i = 0 ; $i < count($data); ++$i ) {
          $data[$i]['content'] = json_decode( $data[$i]['content'] , JSON_UNESCAPED_UNICODE );
        }
        $this->ajaxReturn( $data, 'ok', 1 );
      }
    }
    protected function updateUserInfo($arr){
      $user = M('user');
      $resArr = array();
      foreach( $arr as $userItem){
        $map['u_id'] = array( 'in', array($userItem['create_user'], $userItem['edit_user'] ) );
        $data = $user->where($map)->select();
        foreach($data as $dataItem){
          if( $dataItem['u_id'] == $userItem['create_user'] )
            $userItem['create_user'] = $dataItem['name'];
          if( $dataItem['u_id'] == $userItem['edit_user'] )
            $userItem['edit_user'] = $dataItem['name'];
        }
        array_push( $resArr, $userItem);
      }
      return $resArr;
    }
    
    protected function updateCompanyInfo($arr){
      $company = M('company');
      $resArr = array();
      foreach( $arr as $companyItem ){
        $map['c_id'] = $companyItem['c_id'];
        $data = $company->where($map)->select();
        if( isset($data)){
          $companyItem['c_name'] = $data[0]['name'];
          array_push( $resArr, $companyItem );
        }
      }
      return $resArr;
    }

    protected function getName($arr=null, $key=null){
      if($arr && $key){
        for($i=0; $i<count($arr); $i++){
          if($arr[$i]['id'] == $key){
            return $arr[$i]['name'];
          }
        }
      }

      return null;
    }
  }
?>