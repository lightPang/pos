<?php
// 处理装机申请
class ApplyAction extends CommonAction {
    public function index(){
      $this->doAuth();
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

}