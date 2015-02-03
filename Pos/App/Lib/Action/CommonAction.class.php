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
      }

      return $flag;
    }

    public function getInfoData(){
      if( $this->doAuth() ){
        $data = array();
        $provinceModel = M('area_province');
        $data['province'] = $provinceModel->select();
        $cityModel = M("area_city");
        $data['city'] = $cityModel->select();
        $districtModel = M('area_district');
        $data['district'] = $districtModel->select();
        $bankModel = M('bank');
        $data['bank'] = $bankModel->select();
        $bankOpModel = M('bank_operator');
        $data['bankop'] = $bankOpModel->select();
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
        $data['mcc'] = $miModel->select();
        $crModel = M('client_rate');
        $crMap['is_inner'] = 1;
        $data['ri'] = $crModel->where($crMap)->select();
        $crMap['is_inner'] = 0;
        $data['ro'] = $crModel->where($crMap)->select();
        $this->ajaxReturn($data, 'ok','123');
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