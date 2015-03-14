<?php
  class ReturnTypeAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display();
    }
    
    public function createReturnType(){
      if( isset($_SESSION['u_id']) && isset( $_POST['name'] ) ){
        $ca = M('return_type');
        $data['name'] = $_POST['name'] ;
        $res = $ca->add( $data );
        $map['rt_id'] = $res;
        $this->addModifyRecord( $data,$map, 'return_type', 'rt_id',1);
        $this->ajaxReturn( $data, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function updateReturnType(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['rt_id'] ) ){
        $map['rt_id'] = $_POST['rt_id'];
        $data['name'] = $_POST['name'] ;
        $ca = M('return_type');
        $this->addModifyRecord( $data,$map, 'return_type', 'rt_id');
        $res = $ca->where( $map )->save( $data);
        $this->ajaxReturn( $map, "ok", 1);
      }
      $this->ajaxReturn( null, "update failed!", 0);
    }
    
    public function delReturnType(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['rt_id'] ) ){
        $map['rt_id'] = $_POST['rt_id'];
        $ca = M('return_type');
        $res = $ca->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
      $this->ajaxReturn( null, "deletion failed!", 0 );
    }
    
    public function getReturnTypeData(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['rt_id'] ) ){
        $map['rt_id'] = $_POST['rt_id'] ;
        $ca = M('return_type');
        $data = $ca->where($map)->select()[0];
        $this->ajaxReturn( $data, "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        $ca = M('return_type');
        $data = $ca->select();
        $this->ajaxReturn( $data, "ok", 0);
      }
    }
  }
?>