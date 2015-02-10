<?php
  import("@.ORG.Access");
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

    public function getMDBFile(){
      if( $this->doAuth() && $_POST['so_list'] )
      {
        $so_list = $_POST['so_list'];

        $fileDir="MDB/download/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
          mkdir($fileDir,0777, true);
        $content = file_get_contents("MDB/blank.MDB");
        //var_dump($content);
        $date = date("d").'-'.date("H").'-'.date('i').'-'.date('s');
        $fileName = $fileDir.$date.".MDB";
        copy("MDB/blank.MDB", $fileName);
        $filePreFix = "D:/PgmTools/xampp/htdocs/pos/Pos/";
        //$fileName = "D:/PgmTools/xampp/htdocs/pos/Pos/MDB/download/2015/02/09-21-33-49.MDB";
        $fileName = $filePreFix.$fileName;
        $accessUtil = new Access($fileName);

        $soData = $this->getFullSoData($so_list);
        $i = 1;
        $res = array();
        foreach ($soData as $soItem ) {
          $item['商户序号'] = $i;
          $item['商户名'] = $soItem['client_name'];
          $item['正式名称'] = $soItem['formal_name'];
          $item['商户地址'] = $soItem['client_addr'];
          $item['收单行'] = $soItem['bill_b'];
          $item['开户银行'] = $soItem['account_b_id'];
          $item['银行帐号'] = $soItem['account_num'];
          $item['联系人'] = $soItem['legal_name'];
          $item['联系人职务'] = '法人';
          $item['电话'] = $soItem['legal_tel'];
          $item['传真'] = $soItem['contact_fax'];
          $item['费率_内'] = $soItem['cr_inner'];
          $item['费率_外'] = $soItem['cr_outer'];
          $item['所属平台'] = $soItem['cp'];
          $item['地区'] = $soItem['ac'];
          $item['装机联系人'] = $soItem['contact_name'];
          $item['装机电话'] = $soItem['contact_phone'];
          $item['业别ID'] = $soItem['mi'];
          $item['起用日期'] = $soItem['active_date'];
          $item['登记日期'] = $soItem['register_date'];
          $item['经办单位'] = "城域科技";
          $item['账户名称'] = $soItem['account_name'];
          /*以下赋值的代表我不清楚从哪来的*/
          $item['状态'] = '-1';
          $item['费率2'] = 0;
          $item['收费类别'] = 'F';

          //array_push($res, $item);
          $tableName = '商户';
          
          $siData = $this->getFullSiData( $soItem['si_list'] );
          $item['申请终端'] = count($siData);
          $accessUtil->add( $tableName, $item);
          $posTableName = "POS机";
          foreach ($siData as $siItem) {
            $newSiItem['商户序号'] = $i;
            $newSiItem['机身号'] = $siItem['m_code'];
            $newSiItem['备注'] = $siItem['addr'];

            /*以下赋值就是不清楚的*/
            $newSiItem['型号ID'] = 100;
            $newSiItem['状态'] = -1;
            $newSiItem['出单日期'] = $soItem['active_date'];
            $newSiItem['安装日期'] = $soItem['active_date'];
            $newSiItem['操作'] = 'A';
            $accessUtil->add( $posTableName, $newSiItem );
          }
          $i++;
        }
        $downloadFileName = date("Y")."-".date("m").'-'.date("d").".MDB";
        $name ="Content-Disposition: attachment; filename=" . $downloadFileName;
        sleep(2);
        $content = file_get_contents($fileName);
        header("Content-type:file"); 
        header($name); 
        echo $content;
      }
    }

    public function reloadMDB(){

    }

    protected function getFullSiData($si_list){
      $siMap['si_id'] = array('in', $si_list );
      $siData = M('setup_item')->where( $siMap)->select();
      $m_list = '';
      return $siData;
    }

    protected function getFullSoData($so_list){
      $soModel = M('setup_order');
      $soMap['so_id'] = array('in', $so_list);
      $soData = $soModel->where( $soMap )->select();
      $bank_list = '';
      $mcc_list = '';
      foreach ($soData as $value) {
        $bank_list .= $value['bill_b_id'].',';
        $mcc_list .= $value['mi_id'].',';
        $ac_list .= $value['ac_id'].',';
        $cp_list .= $value['cp_id'].',';
        $cr_list .= $value['cr_inner_id'].','.$value['cr_outer_id'].',';
      }
      $bankMap['b_id'] = array( 'in', $bank_list );
      $mccMap['mi_id'] = array('in', $mcc_list );
      $acMap['ac_id'] = array('in', $ac_list );
      $cpMap['cp_id'] = array('in', $cp_list );
      $crMap['cr_id'] = array( 'in', $cr_list );
      $bankData = M('bank')->where($bankMap)->select();
      $miData = M('mcc_item')->where($mccMap)->select();
      $acData = M('area_city')->where($acMap)->select();
      $cpData = M('client_platform')->where( $cpMap )->select();
      $crData = M('client_rate')->where( $crMap )->select();

      foreach ($soData as $key => $value) {
        foreach ($bankData as $bankItem) {
          if( $value['bill_b_id'] == $bankItem['b_id'] ){
            $soData[$key]['bill_b'] = $bankItem['code'];
            break;
          }
        }

        foreach ($miData as $miItem) {
          if( $value['mi_id'] == $miItem['mi_id'] ){
            $soData[$key]['mi'] = $miItem['code'];
            break;
          }
        }

        foreach ($acData as $acItem ) {
          if( $value['ac_id'] == $acItem['ac_id'] ){
            $soData[$key]['ac'] = $acItem['code'];
            break;
          }
        }

        foreach ($cpData as $cpItem) {
          if( $value['cp_id'] == $cpItem['cp_id'] ){
            $soData[$key]['cp'] = $cpItem['code'];
            break;
          }
        }
        foreach ($crData as $crItem) {
          if( $value['cr_inner_id'] == $crItem['cr_id'] ){
            $soData[$key]['cr_inner'] = $crItem['code'];
          }

          if( $value['cr_outer_id'] == $crItem['cr_id'] ){
            $soData[$key]['cr_outer'] = $crItem['code'];
          }
        }
      }

      return $soData;
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