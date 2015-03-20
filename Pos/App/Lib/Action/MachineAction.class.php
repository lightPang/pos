<?php
  class MachineAction extends CommonAction{
    public function getBroken(){
      if( $this->doAuth() && isset($_POST['m_id']) ){
        $map['m_id'] = $_POST['m_id'];
        $map['c_id'] = $_SESSION['c_id'] ;
        $res = M('m_view')->where( $map )->select()[0];
        $this->ajaxReturn( $res, 'ok', 1);
      }
      else if( $this->doAuth() ){
        $map['state'] = array('in', '5,6');
        $map['c_id'] = $_SESSION['c_id'] ;
        $res = M('m_view')->where( $map )->select();
        $this->ajaxReturn( $res, 'ok', 1);
      }
    }

    public function repair(){
      if( $this->doAuth() && isset($_POST['m_id'] ) ){
        $map['m_id'] = $_POST['m_id'];
        $mItem = M('machine')->where( $map )->select()[0];
        if( $mItem['state'] == '5' ){
          if( $_POST['is_repair'] == '0' ){
            $mItem['state'] = 0;
          }
          else{
            $mItem['state'] = 6;
          }
          $this->addModifyRecord( $mItem, $map, 'machine', 'm_id' );
          M('machine')->where( $map )->save( $mItem );
          $this->ajaxReturn( null, null, 1 );
        }
        else{
          $this->ajaxReturn(null, "机器状态错误！", 0 );
        }
      }
    }
  }
?>