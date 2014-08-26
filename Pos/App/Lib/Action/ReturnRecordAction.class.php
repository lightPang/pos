<?php
// 处理退机记录
class ReturnRecordAction extends Action {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

}