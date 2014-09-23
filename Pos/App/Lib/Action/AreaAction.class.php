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
        $data = $ap->where($map)->select();
        $this->ajaxReturn( $data, "query", 1);
      }
      else if( $_SESSION['u_id'] ){
        $ap = M('area_province');
        $data = $ap->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "query", 0 );
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
        $data['ap_id'] = $_POST['ap_id'];
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
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $ac = M('area_city');
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
        $ac = M('area_city');
        $data = $ac->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
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
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $ad = M('area_district');
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
        $ac = M('area_district');
        $data = $ac->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
    }
    
  }
?>