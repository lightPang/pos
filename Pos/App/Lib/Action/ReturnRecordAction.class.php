<?php
// 处理退机记录
class ReturnRecordAction extends CommonAction {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->doAuth();
      $this->display();
    }

    public function getReturnRecord(){
      if( isset( $_SESSION['u_id'] ) && isset($_POST['rr_id'] ) ){
        $sqlModel = M('rr_view');
        $sqlMap['rr_id'] = $_POST['rr_id'] ;
        $res = $sqlModel->where( $sqlMap )->select();
        $this->ajaxReturn( $res[0], 'ok', 1);
      }
      else if( isset( $_POST['state'] ) ){
        $sqlModel = M('rr_view');
        $sqlMap['c_id'] = $_SESSION['c_id'];
        $sqlMap['state'] = array( 'in', "2,3" );
        $res = $sqlModel->where( $sqlMap )->select();
        $this->ajaxReturn( $res, 'ok', 1);
      }
      else{
        $sqlModel = M('rr_view');
        $sqlMap['c_id'] = $_SESSION['c_id'];
        $res = $sqlModel->where( $sqlMap )->select();
        $this->ajaxReturn( $res, 'ok', 1 );
      }
    }

    public function createReturnRecord(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['info']) ){
        $data = $this->_post();
        $rrItem = M('setup_item')->where( "si_id =".$_POST['si_id'] )->select() ;
        if( $rrItem['return_id'] != 0 ){
          $this->ajaxReturn( $data, '此机器已申请退机！',0);
        }
        else{
          $data['c_id'] = $_SESSION['c_id'];
          $res = M('return_record')->add( $data );

          $map['rr_id'] = $res;
          if( $res != 0 ){
            $this->addModifyRecord( $data, $map, 'retrun_record', 'rr_id', 1 );

            $siMap['si_id'] = $_POST['si_id'];
            $siData['return_id'] = $res;
            M('setup_item')->where( $siMap )->save( $siData );
          }
          $this->ajaxReturn( $data, 'ok', $res );
        }
      }
      else
        $this->ajaxReturn( $this->_post(), 'ok', 0);
    }

    public function finishReturnRecord(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['rr_id'] ) ){
        $map['rr_id'] = $_POST['rr_id'];
        $data['complete_info'] =$_POST['complete_info'];
        $data['state'] = 2;
        $this->addModifyRecord( $data, $map, 'return_record', 'rr_id' );
        $res = M("return_record")->where( $map )->save( $data );
        if( $res != 0 ){
          $this->ajaxReturn( $data, 'ok', 1);
        }
        else{
          $this->ajaxReturn( $data, '已经确认，请勿重复操作！' , 0 );
        }
      }
    }

    public function confirmReturn(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['rr_id'] ) ){
        $map['rr_id'] = $_POST['rr_id'];
        $rrItem = M('return_record')->where( $map )->select()[0];
        $siMap['si_id'] = $rrItem['si_id'];
        $siItem = M('setup_item')->where( $siMap )->select()[0];
        if( $rrItem['state'] == 0 ){
          $rrItem['state'] = 1;
          $rrItem['u_id'] = $_POST['u_id'];
          $rrItem['confirm_time'] = Date( 'Y-m-d H:m:s');
          $this->addModifyRecord( $rrItem, $map, 'return_record', 'rr_id' );
          M('return_record')->where( $map )->save( $rrItem );
          $siItem['state'] = 5;
          $this->addModifyRecord( $siItem, $siMap, 'setup_item', 'si_id' );
          M('setup_item')->where( $siMap )->save( $siItem );

          $mMap['code'] = $siItem['m_code'];
          $mData['state'] = 4;
          M('machine')->where( $mMap )->save( $mData );

          $this->ajaxReturn( null,'ok', 1);
        }
        else{
          $this->ajaxReturn(null,'此机器已经处于退机中，请勿重新操作！',0);
        }
      }
    }

    public function rejectReturn(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['rr_id'] ) ){
        $map['rr_id'] = $_POST['rr_id'];
        $rrItem = M('return_record')->where( $map )->select()[0];
        $siMap['si_id'] = $rrItem['si_id'];
        $siItem = M('setup_item')->where( $siMap )->select()[0];
        if( $rrItem['state'] == 0 ){
          $rrItem['state'] = 4;
          $rrItem['reject_info'] = $_POST['reject_info'];
          $this->addModifyRecord( $rrItem, $map, 'return_record', 'rr_id' );
          M('return_record')->where( $map )->save( $rrItem );
          $siItem['return_id'] = 0;
          $this->addModifyRecord( $siItem, $siMap, 'setup_item', 'si_id' );
          M('setup_item')->where( $siMap )->save( $siItem );

          $this->ajaxReturn( null,'ok', 1);
        }
        else{
          $this->ajaxReturn(null,'此机器已经撤销退机，请勿重新操作！',0);
        }
      }
    }

    public function confirmReceive(){
      if( isset( $_SESSION['u_id']) && isset( $_POST['rr_id'] ) ){
        $map['rr_id'] = $_POST['rr_id'];
        $rrItem = M('return_record')->where( $map )->select()[0];
        $siMap['si_id'] = $rrItem['si_id'];
        $siItem = M('setup_item')->where( $siMap )->select()[0];
        if( $rrItem['state'] == 2 ){
          $rrItem['state'] = 3;
          $rrItem['receive_time'] = Date("Y-m-d H:m:s");
          $this->addModifyRecord( $rrItem, $map, 'return_record', 'rr_id' );
          M('return_record')->where( $map )->save( $rrItem );
          $siItem['state'] = 6;
          //$this->addModifyRecord( $siItem, $siMap, 'setup_item', 'si_id' );
          M('setup_item')->where( $siMap )->save( $siItem );

          $mMap['code'] = $siItem['m_code'];
          $mData['state'] = 0;
          $mData['si_id'] = 0;
          M('machine')->where( $mMap )->save( $mData );
          $this->ajaxReturn( $rrItem,'ok', 1);
        }
        else{
          $this->ajaxReturn(null,'此机器已经完成接机，请勿重新操作！',0);
        }
      }
    } 

}