<?php
  class CompanyAction extends CommonAction{
    public function index(){
      if( $_SESSION['u_id'] ){
        $this->doAuth();
        $this->display('index');
      }
    }
    
    public function getCompanyData(){
      $company = M('company');
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['c_id'] ) ){
        $map['c_id'] = $_POST['c_id'] ;
        $data = $company->where($map)->select();
        $this->ajaxReturn( $data, "singleCompanyData", 1);
      }
      else if( isset( $_SESSION['u_id'] ) ){
        $data = $company->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "allCompanyData", 1);
      }
      else{
        $this->ajaxReturn( null, "no data", 0 );
      }
    }
    
    public function delCompany(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['c_id'] ) ){
        $map['c_id'] = $_POST['c_id'];
        $res = $company->where($map)->delete();
        $this->ajaxReturn( $res, "ok", 1 );
      }
      else{
        $this->ajaxReturn( null, "delete fail", 0 );
      }
    }
    
    public function createCompany(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['name'] ) ){
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['create_time'] = date('Y-m-d H:i:s',time());
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_user'] = $_SESSION['u_id'];
        $Company = M('company');
        $res = $Company->add( $data );
        $this->ajaxReturn( $res, "insertion", 1 );
      }
      else{
        $this->ajaxReturn( $_POST['name'], "insertion failed!" , 0 );
      }
    }
    
    public function updateCompany(){
      if( isset( $_SESSION['u_id'] )&& isset( $_POST['c_id'] ) ){
        $map['c_id'] = $_POST['c_id'];
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'] ;
        $Company = M('company');
        $res = $Company->where($map)->save( $data );
        $this->ajaxReturn( $res, "update", 1 );
      } 
      else{
        $this->ajaxReturn( null, "update failed!", 0);
      }
    }
    
    
  }
?>