<?php
  class AreaAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display('province');
    }
    
    public function province(){
      $this->doAuth();
      $this->display( 'province');
    }
    
    public function createProvince(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['name'] ) ){
        $data['name'] = $_POST['name'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['remark'] = $_POST['remark'];
        $ap = M('area_province');
        $res = $ap->add($data);
        $this->ajaxReturn( $res, "insertion", 1);
      }
      else{
        $this->ajaxReturn( 0, "insertion failed!", 0);
      }
    }
    
    public function delProvince(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ap_id'] ) ){
        $map['ap_id'] = $_POST['ap_id'] ;
        $ap = M('area_province');
        $res = $ap->where($map)->delete();
        $this->ajaxReturn( $res, "deletion!", 1 );
      }
      else{
        $this->ajaxReturn( 0, "deletion failed!", 0);
      }
    }
    
    public function updateProvince(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['ap_id'] )){
        $map['ap_id'] = $_POST['ap_id'];
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $ap = M('area_province');
        $this->addModifyRecord( $data,$map, 'area_province','ap_id');
        $res = $ap->where($map)->save($data);
        $this->ajaxReturn( $res, "update", 1 );
      }
      else{
        $this->ajaxReturn( 0, "update failed!", 0 );
      }
    }
    
    public function getProvinceData(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ap_id'] ) ){
        $map['ap_id'] = $_POST['ap_id'];
        $ap = M('area_province');
        $data = $ap->where($map)->select()[0];
        $this->ajaxReturn( $data, "query", 1);
      }
      else if( $_SESSION['u_id'] ){
        $ap = M('area_province');
        $data = $ap->select();
        $this->ajaxReturn( $data, "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
    }
    /********
    *function about city
    *
    *
    *********/
    public function city(){
      $this->doAuth();
      $this->display( 'city');
    }
    
    public function createCity(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['name'] ) ){
        $data['name'] = $_POST['name'];
        $data['code'] = $_POST['code'];
        $data['ap_id'] = $_POST['ap_id'];
        $data['is_active'] = $_POST['is_active'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['remark'] = $_POST['remark'];
        $ac = M('area_city');
        $res = $ac->add($data);
        $this->ajaxReturn( $data, "insertion", 1);
      }
      else{
        $this->ajaxReturn( 0, "insertion failed!", 0);
      }
    }
    
    public function delCity(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ac_id'] ) ){
        $map['ac_id'] = $_POST['ac_id'] ;
        $ac = M('area_city');
        $res = $ac->where($map)->delete();
        $this->ajaxReturn( $res, "deletion!", 1 );
      }
      else{
        $this->ajaxReturn( 0, "deletion failed!", 0);
      }
    }
    
    public function updateCity(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['ac_id'] )){
        $map['ac_id'] = $_POST['ac_id'];
        $data['ap_id'] = $_POST['ap_id'];
        $data['code'] = $_POST['code'];
        $data['name'] = $_POST['name'];
        $data['is_active'] = $_POST['is_active'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $ac = M('area_city');
        $this->addModifyRecord( $data,$map, 'area_city','ac_id');
        $res = $ac->where($map)->save($data);
        $this->ajaxReturn( $res, "update", 1 );
      }
      else{
        $this->ajaxReturn( 0, "update failed!", 0 );
      }
    }
    
    public function getCityData(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ac_id'] ) ){
        $map['ac_id'] = $_POST['ac_id'];
        $ac = M('area_city');
        $data = $ac->where($map)->select();
        $this->ajaxReturn( $data, "query", 1);
      }
      else if( $_SESSION['u_id'] ){
        $ac = M('ac_view');
        $data = $ac->select();
        $this->ajaxReturn( $data, "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
    }

    protected function updateApInfo( $data ){
      $provinceModel = M('area_province');
      $apData = $provinceModel->select();
      foreach ($data as $key => $value) {
        foreach ($apData as $apItem) {
          if( $value['ap_id'] == $apItem['ap_id'] ){
            $data[$key]['province'] = $apItem['name'];
          }
        }
      }
      return $data;
    }
    
    /********
    *function about district
    *
    *
    *********/
    public function district(){
      $this->doAuth();
      $this->display( 'district');
    }
    
    public function createDistrict(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['name'] ) ){
        $data['name'] = $_POST['name'];
        $data['ap_id'] = $_POST['ap_id'];
        $data['ac_id'] = $_POST['ac_id'];
        $data['is_active'] = $_POST['is_active'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['remark'] = $_POST['remark'];
        $ad = M('area_district');
        $res = $ad->add($data);
        $this->ajaxReturn( $data, "insertion", 1);
      }
      else{
        $this->ajaxReturn( 0, "insertion failed!", 0);
      }
    }
    
    public function delDistrict(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ad_id'] ) ){
        $map['ad_id'] = $_POST['ad_id'] ;
        $ad = M('area_district');
        $res = $ad->where($map)->delete();
        $this->ajaxReturn( $res, "deletion!", 1 );
      }
      else{
        $this->ajaxReturn( 0, "deletion failed!", 0);
      }
    }
    
    public function updateDistrict(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['ad_id'] )){
        $map['ad_id'] = $_POST['ad_id'];
        $data['ac_id'] = $_POST['ac_id'];
        $data['ap_id'] = $_POST['ap_id'];
        $data['is_active'] = $_POST['is_active'];
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $ad = M('area_district');
        $this->addModifyRecord( $data,$map, 'area_district','ad_id');
        $res = $ad->where($map)->save($data);
        $this->ajaxReturn( $res, "update", 1 );
      }
      else{
        $this->ajaxReturn( 0, "update failed!", 0 );
      }
    }
    
    public function getDistrictData(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ad_id'] ) ){
        $map['ad_id'] = $_POST['ad_id'];
        $ad = M('area_district');
        $data = $ad->where($map)->select();
        $this->ajaxReturn( $data, "query", 1);
      }
      else if( $_SESSION['u_id'] ){
        $ac = M('ad_view');
        $data = $ac->select();
        $this->ajaxReturn( $data , "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
    }

    protected function updateAPACData($data){
      $apModel = M('area_province');
      $apData = $apModel->select();
      $acModel = M('area_city');
      $acData = $acModel->select();
      foreach ($data as $key => $value) {
        foreach ($apData as $apItem) {
          if( $apItem['ap_id'] == $value['ap_id'] ){
            $data[$key]['province'] = $apItem['name'];
            break;
          }
        }

        foreach ($acData as $acItem) {
          if( $acItem['ac_id'] == $value['ac_id'] ){
            $data[$key]['city'] = $acItem['name'];
            break;
          }
        }
      }
      return $data;
    }
    
  }
?>