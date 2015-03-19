<?php
  class MachineVersionAction extends CommonAction{
    
    public function create(){
      if( isset($_SESSION['u_id']) && isset( $_POST['name'] ) ){
        $ca = M('machine_version');
        $data['name'] = $_POST['name'] ;
        $data['is_active'] = $_POST['is_active'];
        $res = $ca->add( $data );
        $map['mv_id'] = $res;
        $this->addModifyRecord( $data,$map, 'machine_version', 'mv_id',1);
        $this->ajaxReturn( $data, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function update(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mv_id'] ) ){
        $map['mv_id'] = $_POST['mv_id'];
        $data['name'] = $_POST['name'] ;
        $data['is_active'] = $_POST['is_active'];
        $ca = M('machine_version');
        $this->addModifyRecord( $data,$map, 'machine_version', 'mv_id');
        $res = $ca->where( $map )->save( $data);
        $this->ajaxReturn( $map, "ok", 1);
      }
      $this->ajaxReturn( null, "update failed!", 0);
    }
    
    public function del(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mv_id'] ) ){
        $map['mv_id'] = $_POST['mv_id'];
        $ca = M('machine_version');
        $res = $ca->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
      $this->ajaxReturn( null, "deletion failed!", 0 );
    }
    
    public function get(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['mv_id'] ) ){
        $map['mv_id'] = $_POST['mv_id'] ;
        $ca = M('machine_version');
        $data = $ca->where($map)->select()[0];
        $this->ajaxReturn( $data, "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        $ca = M('machine_version');
        $data = $ca->select();
        $this->ajaxReturn( $data, "ok", 0);
      }
    }
  }
?>