<?php
// 处理退机记录
class ReturnRecordAction extends CommonAction {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->doAuth();
      $this->display();
    }

    public function getReturnRecodr(){}

    public function finishReturnRecord(){}

}