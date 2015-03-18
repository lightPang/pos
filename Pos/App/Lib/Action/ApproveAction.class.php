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

    public function returnApprove(){
      $this->doAuth();
      $this->display();
    }

    public function passApply(){
      $so_id = $_POST['so_id'];
      $c_id = $_POST['c_id'];
      $si_id = $_POST['si_id'];
      $keyboardType = $_POST['keyboard_type'];
      $keyboardCode = $_POST['keyboard_code'];
      $machineType = $_POST['m_type'];
      $machineCode = $_POST['m_code'];
      $machineData = array();
      $keyboardData = array();
      $machineCodeList = '';
      $keyboardCodeList = '';
      $siList = '';
      for( $i = 0 ; $i < count($si_id); ++$i ){
        $machineCodeList .= $machineCode[$i] . ',';
        $keyboardCodeList .= $keyboardCode[$i] . ','; 
        $siList .= $si_id[$i].',';
      }
      
      $machineMap['m_code'] = array('in', $machineCodeList); 
      $machineData = M('machine')->where( $machineMap )->select();
      $keyboardMap['m_code'] = array('in', $keyboardCodeList);
      $keyboardData = M('machine')->where( $keyboardMap)->select();
      $siMap['si_id'] = array('in', $siList);
      $siData = M('setup_item')->where( $siMap )->select();
      $flag = 1;
      for( $i = 0 ; $i <count($si_id); ++$i ){
        $tag = 0;
        foreach ($machineData as $machineKey => $machine) {
          if( $machine['m_code'] == $machineCode[$i] ){
            $tag = 1;
            if( $machine['state'] != 0 || $machine['c_id'] != $c_id ){
              $flag = 0;
              $resMsg = "机器代码填写有误！";
              break;
            }
            else{
              $machineData[$machineKey]['state'] = 1;
              $machineData[$machineKey]['si_id'] = $si_id[$i];
            }
          }
        }
        if( $tag == 0 ){
          $flag = 0;
          $resMsg = "机器代码填写有误！";
          break;
        }
        $tag = 0;
        foreach ($keyboardData as $keyboardKey => $keyboard) {
          if( $keyboard['m_code'] == $keyboardCode[$i] ){
            $tag = 1;
            if( $keyboard['state'] != 0 || $keyboard['c_id'] != $c_id){
              $flag = 0;
              $resMsg = "键盘机身码填写有误！";
              break;
            }
            else{
              $keyboardData[$keyboardKey]['state'] = 1;
              $keyboardData[$keyboardKey]['si_id'] = $si_id[$i];
            }
          }
        }
        if( $tag == 0 ){
          $flag = 0;
          $resMsg = "键盘机身码填写有误！";
          break;
        }
        foreach ($siData as $siKey => $siItem) {
          if( $siItem['si_id'] == $si_id[$i] ){
            $siData[$siKey]['m_code'] = $machineCode[$i];
            $siData[$siKey]['keyboard_code'] = $keyboardCode[$i];
            $siData[$siKey]['setup_state'] = 1;
          }
        }
      }
      if( $flag == 1 ){
        foreach ($siData as $siItem) {
          $map['si_id'] = $siItem['si_id'];
          M('setup_item')->where($map)->save( $siItem );
          
          $resMsg = "修改成功！";
        }

        foreach ($keyboardData as $keboard) {
          $kMap['m_id'] = $keyboard['m_id'];
          $keyboard['state'] = 1;
          M('machine')->where($kMap)->save($keyboard);
        }

        foreach ($machineData as $machine) {
          $mMap['m_id'] = $machine['m_id'];
          $machine['state'] = 1;
          M('machine')->where( $mMap )->save( $machine );
        }

        $soMap['so_id'] = $so_id;
        $soData['state'] = 2;
        M('setup_order')->where($soMap)->save( $soData );
      }
      $tag = M('setup_item')->save( $siData);
      $this->ajaxReturn( $resMsg,$resMsg,$flag);
    }

    public function dispatch(){
      if( $this->doAuth() && isset($_POST['so_id']) ){
        $so_id = $_POST['so_id'];
        $u_id = $_POST['u_id'];
        $soMap['so_id'] = $so_id;
        $soData = M('setup_order')->where( $soMap )->select()[0];
        if( $soData != null ){
          $siMap['si_id'] = array( 'in', $soData['si_list'] );
          $siData = M('setup_item')->where( $siMap )->select();
          foreach ($siData as $siItem) {
            $siMap['si_id'] = $siItem['si_id'];
            $saveMap['setup_user'] = $u_id;
            M('setup_item')->where( $siMap )->save( $saveMap );
          }
          $soData['state'] = 5;
          $soData['setup_user'] = $u_id;
          $soData['dispatch_time'] = date('Y-m-d H:i:s');
          M('setup_order')->where( $soMap )->save( $soData );
          $this->ajaxReturn('ok', 'ok','1' );
        }
        else{
          $this->ajaxReturn( 'no exist setup order', 'no exist setup order', '0' );
        }
      }
    }

    public function getMDBFile(){
      if( $this->doAuth() && $_GET['so_list'] )
      {
        $so_list = $_GET['so_list'];

        $fileDir="MDB/download/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
          mkdir($fileDir,0777, true);
        //$content = file_get_contents("MDB/blank.MDB");
        //var_dump($content);
        $date = date("d").'-'.date("H").'-'.date('i').'-'.date('s');
        $fileName = $fileDir.$date.".MDB";
        copy("MDB/blank.MDB", $fileName);
        $filePreFix = $this->_server('DOCUMENT_ROOT') . C('Web_Prefix') .
        //$fileName = "D:/PgmTools/xampp/htdocs/pos/Pos/MDB/download/2015/02/09-21-33-49.MDB";
        $fileName = $filePreFix.$fileName;
        $accessUtil = new Access($fileName);

        $soData = $this->getFullSoData($so_list);
        $i = 1;
        $res = array();
        $clientNameList = '';
        $bankName = '';
        $qoutFlag = 0;
        foreach ($soData as $soItem ) {
          if( $qoutFlag == 0 ){
            $clientNameList .= $soItem['client_name'];
            $qoutFlag = 1;  
          }
          else{
            $clientNameList .= "、".$soItem['client_name'];
            
          }
          
          $bankName = $soItem['bill_b_short'];
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
          $item['状态'] = '-1'; #默认
          $item['费率2'] = 0; #默认
          $item['收费类别'] = 'F'; #默认 
          $item['电传'] = $soItem['ca'];

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
            $newSiItem['型号ID'] = $siItem['mType'];#与机器中的mt_number挂钩
            $newSiItem['状态'] = -1;
            $newSiItem['出单日期'] = date("Y/m/d"); #填写回填银联MDB的日期。
            //$newSiItem['安装日期'] = $soItem['active_date'];
            $newSiItem['操作'] = 'A'; #默认
            $accessUtil->add( $posTableName, $newSiItem );
          }
          $i++;
        }
        $downloadFileName = $bankName .'-'. '城域科技'. date("Y")."-".date("m").'-'.date("d").$clientNameList .".MDB";
        //$downloadFileName = "123.MDB";
        $name ="Content-Disposition: attachment; filename=" . $downloadFileName;
        sleep(1);
        $content = file_get_contents($fileName);
        header("Content-type:file"); 
        header($name); 
        readfile( $fileName);
      }
    }

    public function getLoadedMDBFile(){
      if( $this->doAuth() && $_GET['so_list'] ){
        $fileDir="MDB/loadedDownload/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
          mkdir($fileDir,0777, true);

        $date = date("d").'-'.date("H").'-'.date('i').'-'.date('s');
        $fileName = $fileDir.$date.".MDB";
        copy("MDB/reload.MDB", $fileName);
        $filePreFix = "D:/PgmTools/xampp/htdocs/pos/Pos/";
        //$fileName = "D:/PgmTools/xampp/htdocs/pos/Pos/MDB/download/2015/02/09-21-33-49.MDB";
        $fileName = $filePreFix.$fileName;
        $accessUtil = new Access($fileName);
        $so_list = $_GET['so_list'];
        $soData = $this->getFullSoData($so_list);
        //var_dump($so_list);
        $i = 1;
        foreach ($soData as $soItem ) {
          $item['商户序号'] = $i;
          $item['商户名'] = $soItem['client_name'];
          $item['正式名称'] = $soItem['formal_name'];
          $item['商户地址'] = $soItem['client_addr'];
          $item['收单行'] = $soItem['bill_b'];
          $item['开户银行'] = $soItem['account_b_id'];
          $item['银行帐号'] = $soItem['account_num'];
          $item['联系人'] = $soItem['legal_name'];
          //$item['联系人职务'] = '法人';
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
          $item['营业执照'] = $soItem['license_num'];
          /*以下赋值的代表我不清楚从哪来的*/
          $item['状态'] = '-1'; #默认
          $item['费率2'] = 0; #默认
          $item['收费类别'] = 'F'; #默认 
          $item['电传'] = $soItem['ca'];

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
            $newSiItem['型号ID'] = $siItem['mType'];
            $newSiItem['密钥'] = $siItem['key'];
            $newSiItem['完成'] = 1;
            $newSiItem['出单日期'] = date("Y/m/d"); #填写回填银联MDB的日期。
            //$newSiItem['安装日期'] = $soItem['active_date'];
            $newSiItem['操作'] = 'A'; #默认
            $accessUtil->add( $posTableName, $newSiItem );
          }
          $i++;
        }
        $downloadFileName = $bankName .'-'. '城域科技'. date("Y")."-".date("m").'-'.date("d").$clientNameList .".MDB";
        //$downloadFileName = "123.MDB";
        $name ="Content-Disposition: attachment; filename=" . $downloadFileName;
        sleep(1);
        $content = file_get_contents($fileName);
        header("Content-type:file"); 
        header($name); 
        readfile( $fileName);
      }
    }

    public function reloadMDB(){
      if( $this->doAuth() ){
        $flag = 1;

        $fileDir="MDB/Upload/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
          mkdir($fileDir,0777, true);

        $uploadFile = $_FILES['mdb_file'];
        $fileInfo=pathinfo( $uploadFile['name'] );
        $serverFileName = $fileDir.$uploadFile['name'];
        $serverFileName = iconv("UTF-8","GBK",  $serverFileName);
        

        if( $fileInfo['extension'] != 'MDB' && $fileInfo['extension'] != 'mdb' ){
          $flag = 0;
          $resMsg = '请上传MDB格式的文件！';
        }
        else{
          move_uploaded_file ($uploadFile["tmp_name"], $serverFileName);
          $fp = fopen($serverFileName,'r');
          $file_data = fread($fp,$uploadFile["size"]);
          $f_data['name'] = $uploadFile["name"];
          $f_data['type'] = $uploadFile["type"];
          $f_data['url'] = $serverFileName;
          $f_data['content'] = $file_data;
          fclose($fp); 

          $filePreFix = "D:/PgmTools/xampp/htdocs/pos/Pos/";
          //$fileName = "D:/PgmTools/xampp/htdocs/pos/Pos/MDB/reload.mdb";
          $accessUtil = new Access( $filePreFix .$serverFileName);

          $table = "POS机";
          $fields = ['*'];
          $param = array();
          $data = $accessUtil->select( $table, $fields);
          $arrayData = (array)$data;
          $arrayData = $this->mult_iconv("GBK", "UTF-8", $arrayData);
          $soModel = M('setup_order');
          $siModel = M('setup_item');
          $resMsg = '';
        }
        for( $i = 0 ; $i < count($arrayData); ++ $i) {
          if( $flag == 0 ){
            break;
          }
          //var_dump($arrayData[$i]['处理说明']);
          $item = (array)$arrayData[$i];
          //$item = $this->mult_iconv("GBK", "UTF-8", $item);
          $siMap['m_code'] = $item['机身号'];
          $siData = $siModel->where( $siMap )->select()[0];
          if( $siData['so_id'] != null ){
            $siSave['m_tcode'] = $item['编号'];
            $siSave['key'] = $item['密钥'];
            $siModel->where( $siMap )->save( $siSave );
            $soMap['so_id'] = $siData['so_id'];
            $soData['state'] = '4';
            $soData['client_num'] = $item['商户编号'];
            $soModel->where($soMap)->save( $soData );
          }
          else{
            $resMsg .= $item['机身号'] . ' ';
            $flag = 0;
          }
        }
        if( $flag == 0 ){
          $resMsg = "信息有误！错误POS机身号为：".$resMsg;
        }
        $this->ajaxReturn($serverFileName ,$resMsg, $flag);
      }
    }

    protected function mult_iconv($in_charset,$out_charset,$data)
    {
      $res = array();
      for( $i = 0; $i < count($data); ++$i ){
        $item = array();
        foreach ($data[$i] as $key => $value) {
          $item[ iconv($in_charset,$out_charset,$key) ] = iconv($in_charset,$out_charset,$value);
        }
        array_push($res, $item);
      }

      return $res;
    }

    protected function getFullSiData($si_list){
      $siMap['si_id'] = array('in', $si_list );
      $siData = M('setup_item')->where( $siMap)->select();
      $m_list = '';
      $mtData = M('machinetype')->select();
      foreach ($siData as $key => $value) {
        foreach ($mtData as $mtItem) {
          if( $value['m_type'] == $mtItem['mt_id'] ){
            $siData[$key]['mType'] = $mtItem['mt_number'];
          }
        }
        
      }
      return $siData;
    }

    protected function getFullSoData($so_list){
      $soModel = M('setup_order');
      $soMap['so_id'] = array('in', $so_list);
      $soData = $soModel->where( $soMap )->select();
      $bank_list = '';
      $mcc_list = '';
      $ca_list = '';
      foreach ($soData as $value) {
        $bank_list .= $value['bill_b_id'].',';
        $mcc_list .= $value['mi_id'].',';
        $ac_list .= $value['ac_id'].',';
        $cp_list .= $value['cp_id'].',';
        $ca_list .= $value['ca_id'].',';
        $cr_list .= $value['cr_inner_id'].','.$value['cr_outer_id'].',';
      }
      $bankMap['b_id'] = array( 'in', $bank_list );
      $mccMap['mi_id'] = array('in', $mcc_list );
      $acMap['ac_id'] = array('in', $ac_list );
      $cpMap['cp_id'] = array('in', $cp_list );
      $crMap['cr_id'] = array( 'in', $cr_list );
      $caMap['ca_id'] = array( 'in', $ca_list);
      $bankData = M('bank')->where($bankMap)->select();
      $miData = M('mcc_item')->where($mccMap)->select();
      $acData = M('area_city')->where($acMap)->select();
      $cpData = M('client_platform')->where( $cpMap )->select();
      $crData = M('client_rate')->where( $crMap )->select();
      $caData = M('client_attr')->where( $caMap )->select();
      foreach ($soData as $key => $value) {
        foreach ($bankData as $bankItem) {
          if( $value['bill_b_id'] == $bankItem['b_id'] ){
            $soData[$key]['bill_b'] = $bankItem['code'];
            $soData[$key]['bill_b_short'] = $bankItem['short_name'];
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

        foreach ($caData as $caItem) {
          if( $value['ca_id'] == $caItem['ca_id'] ){
            $soData[$key]['ca'] = $caItem['code'];
          }
        }
      }

      return $soData;
    }

  }

?>