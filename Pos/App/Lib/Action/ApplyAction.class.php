<?php
// 处理装机申请
class ApplyAction extends CommonAction {
    public function index(){
      $this->doAuth();
      $this->assign("activeTab", $_GET["activeTab"]);
      $map['state'] = 0;
      $map['u_id'] = $_SESSION['u_id'];
      $soModel = M("setup_order");
      $submitPage = $soModel->where($map)->count() ;
      $map['state'] = array('gt',0);
      $aprPage = $soModel->where($map)->count() ;
      $this->assign( 'submitPage', $submitPage);
      $this->assign( 'aprPage', $aprPage);
      $this->display();
    }
    
    public function getSubmitDataByPage(){
      $this->doAuth();
      $uaMap['state'] = 0;
      $uaMap['c_id'] = $_SESSION['c_id'];
      $uaMap['u_id'] = $_SESSION['u_id'];
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

    public function getPassedDataByPage(){
      $this->doAuth();
      $uaMap['state'] = array('gt',0);
      //$uaMap['c_id'] = $_SESSION['c_id'];
      $uaMap['u_id'] = $_SESSION['u_id'];
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

    public function createApplication(){
      if( $this->doAuth("setupApply") == true ){
        $sqlModel = M('setup_order');
        $resStr = $_POST['client_name'];
        $count = 0;
        //print_r($_POST);
        $data = array();
        foreach($_POST as $key => $value ){
           $data[$key] = $value;
        }
        
        $fileSqlModel = M('file');
        $fileDir="Upload/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
                  mkdir($fileDir,0777, true);
        foreach( $_FILES as $key => $value ){
          
          $count++;
          $f_data = array();
          
             
          if( $_FILES[$key]['name'] != "" ){
            $fileInfo=pathinfo($_FILES[$key]["name"]);
            $serverFileName = $fileDir.time().".".$fileInfo['extension'];
            move_uploaded_file ($_FILES[$key]["tmp_name"],$serverFileName);
           
            $fp = fopen($serverFileName,'r');
            $file_data = fread($fp,$_FILES[$key]["size"]);
            // echo $file_data;
            $f_data['name'] = $_FILES[$key]["name"];
            $f_data['type'] = $_FILES[$key]["type"];
            $f_data['url'] = $serverFileName;
            $f_data['content'] = $file_data;
            fclose($fp); 
            
            $id = $fileSqlModel->add( $f_data );
            $keyName = $key . "_id";
            $data[$keyName] = $id;
            $resStr = $key;
          }
        }
        $data['so_number'] = "123";
        $data['ac_time'] = date('Y-m-d H:i:s',strtotime($data['ac_time']));
        $data['register_date'] = date('Y-m-d H:i:s',strtotime($data['register_date']));
        $data['active_date'] = date('Y-m-d H:i:s',strtotime($data['active_date']));
        $data['u_id'] = $_SESSION['u_id'];
        $res = $sqlModel->add($data);
        $this->ajaxReturn( $data,"ok", 0 );
        
      }
      else{
        $this->ajaxReturn(null,"not ok" ,0 );
      }
    }

}