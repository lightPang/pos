<?php
// 处理任务分派
class TaskAction extends CommonAction {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->doAuth();
      $this->display();
    }

}