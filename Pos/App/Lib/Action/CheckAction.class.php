<?php
// 处理巡检记录
class CheckAction extends CommonAction {
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->doAuth();
      $this->display();
    }

    public function getRecords(){
      if( $this->doAuth() ){
        $recordModel = M('check_record');
        $rMap['si_id'] = $_POST['si_id'];
        $data = $recordModel->where($rMap)->select();
        $userModel = M('user');
        $userData = $userModel->select();
        foreach ($data as $key => $value) {
          foreach ($userData as $userItem) {
            if( $value['u_id'] == $userItem['u_id'] ){
              $data[$key]['userName'] = $userItem['name'];
              break;
            }
          }
        }
        $this->ajaxReturn( $data, 'ok', '123');
      }
    }

    public function addRecord(){
      if( $this->doAuth() ){
        $siList = $_POST['si_list'];
        $si_id = $_POST['si_id'];
        $item['confirm_code'] = $_POST['confirm_code'];
        $item['remark'] = $_POST['remark'];
        $item['si_id'] = $_POST['si_id'];
        $item['time'] = $_POST['time'];
        $item['u_id'] = $_SESSION['u_id'];
        if( isset($_POST['is_add']) )
            $item['is_add'] = 1;
        else
            $item['is_add'] = 0;
        
        $fileSqlModel = M('file');
        $fileDir="Upload/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
          mkdir($fileDir,0777, true);
        $fileObj = $_FILES['img'];
        $fileInfo=pathinfo($_FILES['img']["name"]);
        $serverFileName = $fileDir.time().".".$fileInfo['extension'];
        move_uploaded_file ($_FILES['img']["tmp_name"],$serverFileName);
        $fp = fopen($serverFileName,'r');
        $file_data = fread($fp,$_FILES['img']["size"]);
        $f_data['name'] = $_FILES['img']["name"];
        $f_data['type'] = $_FILES['img']["type"];
        $f_data['url'] = $serverFileName;
        $f_data['content'] = $file_data;
        fclose($fp); 
        $id = $fileSqlModel->add( $f_data );
        
        $item['img_id'] = $id;
        $recordModel = M('check_record');
        $record_id = $recordModel->add( $item );
        $siData['si_list'] = $siList . $record_id . ',';
        $siMap['si_id'] = $si_id;
        $siModel = M('setup_item');
        $siModel->where($siMap)->save($siData);
        $this->ajaxReturn( $item,$record_id , 'ok');
      }

    }

}