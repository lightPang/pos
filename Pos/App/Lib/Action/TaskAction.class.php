<?php
// 处理任务分派
class TaskAction extends Action {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

}