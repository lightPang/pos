<?php
  class BankAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display('info');
    }
    
    public function bankInfo(){
      $this->doAuth();
      $this->display( 'info');
    }
    
    public function createBank(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['name'] ) ){
        $data['name'] = $_POST['name'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['code'] = $_POST['code'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['remark'] = $_POST['remark'];
        $data['is_active'] = $_POST['is_active'];
        $data['short_num'] = $_POST['short_num'];
        $data['num'] = $_POST['num'];
        $data['short_en_name'] = $_POST['short_en_name'];
        $sqlModel = M('bank');
        $res = $sqlModel->add($data);
        $this->ajaxReturn( $res, "insertion", 1);
      }
      else{
        $this->ajaxReturn( 0, "insertion failed!", 0);
      }
    }
    
    public function delBank(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['b_id'] ) ){
        $map['b_id'] = $_POST['b_id'] ;
        $sqlModel = M('bank');
        $res = $sqlModel->where($map)->delete();
        $this->ajaxReturn( $res, "deletion!", 1 );
      }
      else{
        $this->ajaxReturn( 0, "deletion failed!", 0);
      }
    }
    
    public function updateBank(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['b_id'] )){
        $map['b_id'] = $_POST['b_id'];
        $data['code'] = $_POST['code'];
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['is_active'] = $_POST['is_active'];
        $data['short_num'] = $_POST['short_num'];
        $data['num'] = $_POST['num'];
        $data['short_en_name'] = $_POST['short_en_name'];
        $data['edit_user'] = $_SESSION['u_id'];
        $sqlModel = M('bank');
        $this->addModifyRecord( $data, $map, 'bank', 'b_id');
        $res = $sqlModel->where($map)->save($data);
        $this->ajaxReturn( $res, "update", 1 );
      }
      else{
        $this->ajaxReturn( 0, "update failed!", 0 );
      }
    }
    
    public function getBankData(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['b_id'] ) ){
        $map['b_id'] = $_POST['b_id'];
        $sqlModel = M('bank');
        $data = $sqlModel->where($map)->select();
        $this->ajaxReturn( $data, "query", 1);
      }
      else if( $_SESSION['u_id'] ){
        $sqlModel = M('bank');
        $data = $sqlModel->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
    }
    /********
    *function about operator
    *
    *
    *********/
    public function bankOperator(){
      $this->doAuth();
      $this->display( 'operator');
    }
    
    public function createOperator(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['name'] ) ){
        $data['name'] = $_POST['name'];
        $data['b_id'] = $_POST['b_id'];
        $data['is_active'] = $_POST['is_active'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['contact_num'] = $_POST['contact_num'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['remark'] = $_POST['remark'];
        $sqlModel = M('bank_operator');
        $res = $sqlModel->add($data);
        $this->ajaxReturn( $res, "insertion", 1);
      }
      else{
        $this->ajaxReturn( 0, "insertion failed!", 0);
      }
    }
    
    public function delOperator(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['bo_id'] ) ){
        $map['bo_id'] = $_POST['bo_id'] ;
        $sqlModel = M('bank_operator');
        $res = $sqlModel->where($map)->delete();
        $this->ajaxReturn( $res, "deletion!", 1 );
      }
      else{
        $this->ajaxReturn( 0, "deletion failed!", 0);
      }
    }
    
    public function updateOperator(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['bo_id'] )){
        $map['bo_id'] = $_POST['bo_id'];
        $data['contact_num'] = $_POST['contact_num'];
        $data['b_id'] = $_POST['b_id'];
        $data['name'] = $_POST['name'];
        $data['is_active'] = $_POST['is_active'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $sqlModel = M('bank_operator');
        $this->addModifyRecord( $data, $map, 'bank_operator', 'bo_id');   
        $res = $sqlModel->where($map)->save($data);
        $this->ajaxReturn( $res, "update", 1 );
      }
      else{
        $this->ajaxReturn( 0, "update failed!", 0 );
      }
    }
    
    public function getOperatorData(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['bo_id'] ) ){
        $map['bo_id'] = $_POST['bo_id'];
        $sqlModel = M('bank_operator');
        $data = $sqlModel->where($map)->select()[0];
        $this->ajaxReturn( $data, "query", 1);
      }
      else if( $_SESSION['u_id'] ){
        $sqlModel = M('bo_view');
        $data = $sqlModel->select();
        $this->ajaxReturn( $data, "query", 0 );
      }
      else{
        $this->ajaxReturn(0, "query failed!", 0 );
      }
    }

    protected function updateBankInfo($data){
      $bankModel = M('bank');
      $bankData = $bankModel->select();
      foreach ($data as $key => $value) {
        foreach ($bankData as $bItem) {
          if( $bItem['b_id'] == $value['b_id'] ){
            $data[$key]['bankName'] = $bItem['name'];
            break;
          }
        }
      }
      return $data;
    }
    
    
    
  }
?>