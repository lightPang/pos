<?php
  class MaintainAction extends CommonAction{
    public function index(){
      if( $this->doAuth() ){
        $this->display();
      }
    }

    public function create(){
      if( $this->doAuth() && $_POST['si_id'] ){
        $data = $this->_post();

        $siMap['si_id'] = $_POST['si_id'] ;
        $mrItem = M('maintain_record')->select();
        if( $mrItem != false ){
          $this->ajaxReturn( $data, '请勿重复提交记录！' , 0 );
        }
        else{
          $data['state'] = 1;
          $data['create_time'] = Date("Y-m-d H:m:s");
          $res = M('maintain_record')->add($data);
          $map['mr_id'] = $res;
          $this->addModifyRecord( $data, $map, 'machine_record', 'mr_id',1);
          $siData['maintain_id'] = $res;
          $siMap['si_id'] = $_POST['si_id'] ;
          M('setup_item')->where( $siMap)->sava( $siData );
          $this->ajaxReturn( $data, 'ok', $res );
        }
      }
    }

    public function get(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $map['mr_id'] = $_POST['mr_id'];
        $data = M('maintain_view')->where( $map )->select();
        $this->ajaxReturn( $data[0], 'ok', 1 );
      }
      else if( $this->doAuth() ){
        $map['c_id'] = $_SESSION['c_id']; 
        $data = M('maintain_view')->where( $map )->select();
        $this->ajaxReturn( $data, 'ok', 1 );
      }
    }

    public function confirm(){}

    public function update(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $data['remark'] = $_POST['remark'];
        $data['u_id'] = $_POST['u_id'] ;
        $map['mr_id'] = $_POST['mr_id'];
        $data['state'] = 1;
        $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
        M('maintain_record')->where( $map)->save( $data );
        $this->ajaxReturn(null,null,1);
      }
    }

    public function reject(){}

    public function del(){}
  }
?>