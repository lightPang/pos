<?php
  class PrintAction extends CommonAction{
    public function index(){
      if( $this->doAuth() && $_GET['so_id'] ){
        $version = $_GET['version'];
        $this->assign('so_id', $_GET['so_id'] );
        $this->assign('version', $version );
        $soMap['so_id'] = $_GET['so_id'];
        $soData = M("setup_order")->where( $soMap )->select()[0];
        if( $soData != null && $version != null ){
          $siMap['si_id'] = array( 'in', $soData['si_list'] );
          $siData['version'] = $version;
          M("setup_item")->where( $siMap )->save( $siData );
        }
        $this->display('print');
      }
    }
  }
?>