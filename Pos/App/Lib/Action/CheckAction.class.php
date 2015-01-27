<?php
// 处理巡检记录
class CheckAction extends CommonAction {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->doAuth();
      $this->display();
    }

}