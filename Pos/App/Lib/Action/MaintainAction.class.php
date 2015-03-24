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
        $siItem = M('setup_item')->select()[0];
        //可以有重复的维修记录
        if( $siItem['maintain_id'] != '0' ){
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

    public function confirm(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $data['u_id'] = $_SESSION['u_id'] ;
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_view')->where( $map)->select()[0];
        if( $mrItem['state'] == '1' ){
          $data['state'] = 2;
          $data['confirm_time'] = Date("Y-m-d H:m:s");
          $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
          M('maintain_record')->where( $map)->save( $data );

          $mMap['m_code'] = $mrItem['m_code'];
          $mData['state'] = 3;
          M('machine')->where( $mMap )->save( $mData );

          $this->ajaxReturn(null,null,1);
        }
        else{
           $this->ajaxReturn(null,"请勿重复提交记录！",0);
        }
      }
    }

    public function update(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $data['remark'] = $_POST['remark'];
        $data['u_id'] = $_POST['u_id'] ;
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_view')->where( $map)->select()[0];
        if( $mrItem['state'] == '0' ){
          $data['state'] = 1;
          $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
          M('maintain_record')->where( $map)->save( $data );
          $this->ajaxReturn(null,null,1);
        }
        else{
          $this->ajaxReturn(null,"请勿重复提交记录！",0);
        }
      }
    }

    public function reject(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_record')->where( $map)->select()[0];
        if( $mrItem['state'] == '1' ){
          $data['state'] = 0;
          $data['u_id'] = 0;
          $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
          M('maintain_record')->where( $map)->save( $data );
          $this->ajaxReturn(null,null,1);
        }
        else{
           $this->ajaxReturn(null,"请勿重复提交记录！",0);
        }
      }
    }

    public function del(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_record')->where( $map )->select()[0];
        $siMap['si_id'] = $mrItem['si_id'];
        $siData['maintain_id'] = 0;
        M('setup_item')->where( $siMap )->save( $siData );
        M('maintain_record')->where( $map)->del( $data );
        $this->ajaxReturn(null,null,1);
      }
    }

    public function check(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_record')->where( $map)->select()[0];
        if( $mrItem['state'] == '2' ){
          if( $_POST['maintain_type'] == '0'){
            $data['state'] = 3;
            $data['complete_time'] = Date( "Y-m-d H:m:s");
            $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
            M('maintain_record')->where( $map)->save( $data );
            $siMap['si_id'] = $mrItem['si_id'];
            $siData['maintain_id'] = 0;
            M('setup_item')->where( $siMap )->save( $siData );
            $this->ajaxReturn(null,null,1);
          }
          else{
            $data['state'] = 4;
            $data['maintain_type'] = 1;
            $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
            M('maintain_record')->where( $map)->save( $data );
            $this->ajaxReturn(null,null,1);
          }
        }
        else{
           $this->ajaxReturn(null,"请勿重复提交记录！",0);
        }
      }
    }

    public function change(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $data['u_id'] = $_SESSION['u_id'] ;
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_view')->where( $map)->select()[0];
        if( $mrItem['state'] == '7' ||  $mrItem['state'] == '6' ){
          $data['state'] = 3;
          $data['complete_time'] = Date( "Y-m-d H:m:s");
          $data['complete_remark'] = $_POST['complete_remark'];
          $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
          M('maintain_record')->where( $map)->save( $data );
          $siMap['si_id'] = $mrItem['si_id'];
          $siData['maintain_id'] = 0;
          M('setup_item')->where( $siMap )->save( $siData );

          $mMap['m_code'] = $mrItem['m_code'];
          $mData['state'] = 2;
          M('machine')->where( $mMap )->save( $mData );
          $this->ajaxReturn(null,null,1);
        }
        else if( $mrItem['state'] == '5' ||$mrItem['state'] == '4'  ){
           $this->ajaxReturn(null,"请等待仓库处理！",0);
        }
        else{
          $this->ajaxReturn(null,"错误操作！",0);
        }
      }
    }

    public function confirmReceive(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $data['u_id'] = $_SESSION['u_id'] ;
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_view')->where( $map)->select()[0];
        if( $mrItem['state'] == '5' ){
          if( $_POST['is_change'] == '0' ){
            $data['state'] = 6;
            $data['back_time'] = Date( "Y-m-d H:m:s");
            $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
            M('maintain_record')->where( $map)->save( $data );

            $mMap['m_code'] = $mrItem['change_code'];
            $mData['state'] = 0;
            M('machine')->where( $mMap )->save( $mData );
            $this->ajaxReturn(null,null,1);
          }
          else{
            $data['state'] = 7;
            $data['back_time'] = Date( "Y-m-d H:m:s");
            $data['is_change'] = 1;
            $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
            M('maintain_record')->where( $map)->save( $data );

            $siMap['si_id'] = $mrItem['si_id'];
            $siData['m_code'] = $mrItem['change_code'];
            M('setup_item')->where( $siMap )->save( $siData );

            $mMap['m_code'] = $mrItem['m_code'];
            $mData['state'] = 5;
            M('machine')->where($mMap)->save( $mData );
            $this->ajaxReturn(null,null,1);
          }
        }
        else{
          $this->ajaxReturn(null,"错误操作！",0);
        }
      }
    }

    public function confirmOut(){
      if( $this->doAuth() && $_POST['mr_id'] ){
        $data['u_id'] = $_SESSION['u_id'] ;
        $map['mr_id'] = $_POST['mr_id'];
        $mrItem = M('maintain_view')->where( $map)->select()[0];
        if( $mrItem['state'] == '4'  ){
          
          $mMap['m_code'] = $_POST['change_code'];
          $machineItem = M('machine')->where( $mMap )->select()[0];

          $iniMap['m_code'] = $mrItem['m_code'];
          $iniItem = M('machine')->where( $siMap )->select()[0];
          if( $machineItem['c_id'] != $_SESSION['c_id'] || $machineItem['state'] != '0' ){
            $this->ajaxReturn( null, '机器不是正常在库！' , 0 );
          }
          else if( $iniItem['m_type'] != $machineItem['m_type'] ){
            $this->ajaxReturn( null, '机器型号不匹配！' , 0 );
          }
          else{
            $data['state'] = 5;
            $data['out_time'] = Date( "Y-m-d H:m:s");
            $data['change_code'] = $_POST['change_code'];
            $this->addModifyRecord( $data, $map, 'maintain_record', 'mr_id' );
            M('maintain_record')->where( $map)->save( $data );

            $mData['state'] = 2;
            M('machine')->where( $mMap )->save($mData);

            $this->ajaxReturn(null,null,1);
          }
        }
        else{
          $this->ajaxReturn(null,"错误操作！",0);
        }
      }
    }
  }
?>