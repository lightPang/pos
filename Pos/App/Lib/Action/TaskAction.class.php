<?php
// 处理任务分派
class TaskAction extends CommonAction {
    public function index(){
      $this->doAuth();
      $this->display();
    }

}