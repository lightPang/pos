<?php
  class ApproveAction extends Action{
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }
  }

?>