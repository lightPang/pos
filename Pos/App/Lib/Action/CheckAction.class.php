<?php
// 处理巡检记录
class CheckAction extends Action {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

}