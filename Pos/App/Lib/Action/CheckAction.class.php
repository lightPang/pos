<?php
// 处理巡检记录
class CheckAction extends CommonAction {
    public function index(){
      $this->doAuth();
      $this->display();
    }

}