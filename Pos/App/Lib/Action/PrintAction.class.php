<?php
  class PrintAction extends CommonAction{
    public function index(){
      if( $this->doAuth() && $_GET['so_id'] ){
        $this->assign('so_id', $_GET['so_id'] );
        $this->display('print');
      }
    }
  }
?>