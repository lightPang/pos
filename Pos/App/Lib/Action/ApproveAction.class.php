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
      $this->assign('aprPage',$approvedPage);
      $this->display();
    }

    public function getUADataByPage(){
      if( $this->doAuth('applyApprove')){
        $map['state'] = 0;
        $sqlModel = M('setup_order');
        $data = $sqlModel->where($map)->select();
        foreach ($data as $value => $key) {
          $map['si_id'] = array('in', $key['si_list']);
          $siModel = M('setup_item');
          $siList = $siModel->where($map)->select();
          $data[$value]['siList'] = $siList;
        }
        $this->ajaxReturn( $data, "123", 'ok' );
      }
    }

    public function getAprDataByPage(){
      $this->doAuth();
      $aprMap['state'] = 1;
      $sqlModel = M("setup_order");
      $pageNum = $_POST['pageNum'];
      if( preg_match("/^\d+$/", $pageNum)){
        $data = $sqlModel->where($aprMap)->limit($pageNum*5,5)->select();
        foreach ($data as $value => $key) {
          $map['si_id'] = array('in', $key['si_list']);
          $siModel = M('setup_item');
          $siList = $siModel->where($map)->select();
          $data[$value]['siList'] = $siList;
        }
        $this->ajaxReturn( $data, "123", 'ok' );
      } 
    }
  }

?>