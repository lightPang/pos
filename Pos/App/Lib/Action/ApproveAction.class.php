<?php
  class ApproveAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display();
    }
  }

?>