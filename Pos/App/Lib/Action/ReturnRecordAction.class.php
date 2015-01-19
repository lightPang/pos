<?php
// 处理退机记录
class ReturnRecordAction extends CommonAction {
    public function index(){
      $this->doAuth();
      $this->display();
    }

}