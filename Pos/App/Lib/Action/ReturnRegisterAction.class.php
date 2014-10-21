<?php
// 处理退机登记
class ReturnRegisterAction extends CommonAction {
    public function index(){
      $this->doAuth();
      $this->display();
    }

}