<?php
  class ApproveAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->assign("activeTab", $_GET["activeTab"]);
      $sqlModel = M('setup_order');
      $map['c_id'] = $_SESSION['c_id'];
      $map['state'] = 0;
      $submitPage = $sqlModel->where($map)->count() ;
      $map['state'] = 1;
      $approvedPage = $sqlModel->where($map)->count() ;
      $map['state'] = 2;
      $mdbPage = $sqlModel->where($map)->count();
      $map['state'] = 3;
      $loadedPage = $sqlModel->where($map)->count();
      $this->assign('submitPage',$submitPage);
      $this->assign('aprPage',$approvedPage);
      $this->assign('mdbPage',$mdbPage);
      $this->assign('loadedPage',$loadedPage);
      $this->display();
    }

    public function getUADataByPage(){
      if( $this->doAuth('applyApprove')){
        $uaMap['state'] = 0;
        $uaMap['c_id'] = $_SESSION['c_id'];
        $sqlModel = M('setup_order');
        $data = $sqlModel->where($uaMap)->select();
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
      $aprMap['state'] = 1;
      $aprMap['c_id'] = $_SESSION['c_id'];
     // var_dump($_SESSION['c_id']);
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
        $this->ajaxReturn( $data, $_SESSION['c_id'], 'ok' );
      } 
    }

    public function getMDBDataByPage(){
      $this->doAuth();
      $aprMap['state'] = 2;
      $aprMap['c_id'] = $_SESSION['c_id'];
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

    public function getloadedDataByPage(){
      $this->doAuth();
      $aprMap['state'] = 3;
      $aprMap['c_id'] = $_SESSION['c_id'];
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