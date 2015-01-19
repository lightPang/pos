<?php
  class ApproveAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->assign("activeTab", $_GET["activeTab"]);
      $sqlModel = M('setup_order');
      $map['state'] = 0;
      $submitPage = $sqlModel->where($map)->count();
      $map['state'] = 1;
      $approvedPage = $sqlModel->where($map)->count();
      $this->assign('submitPage',$submitPage);
      $this->assign('approvedPage',$approvedPage);
      $this->display();
    }

    public function getUADataByPage(){
      if( $this->doAuth('applyApprove')){
        $map['state'] = 0;
        $sqlModel = M('setup_order');
        $data = $sqlModel->where($map)->select();
        $this->ajaxReturn( $data, "123", 'ok' );
      }
    }
  }

?>