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
        $check_list = $_POST['check_list'];
        $rMap['cr_id'] = array('in', $check_list);
        $data = $recordModel->where($rMap)->select();
        $userModel = M('user');
        $userData = $userModel->field('u_id','name')->select();
        foreach ($data as $key => $value) {
          foreach ($userData as $userItem) {
            if( $value['u_id'] == $userItem['u_id'] ){
              $data[$key]['userName'] = $userItem['userName'];
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
        $item['is_add'] = $_POST['is_add'];
        /*
        $fileSqlModel = M('file');
        $fileDir="Upload/".date("Y")."/".date("m")."/";
        if(!file_exists($fileDir))//照片目录
          mkdir($fileDir,0777, true);
        $fileObj = $_FILES['img'];
        $fileInfo=pathinfo($_FILES['img']["name"]);
        $serverFileName = $fileDir.time().".".$fileInfo['extension'];
        move_uploaded_file ($_FILES['img']["tmp_name"],$serverFileName);
        $fp = fopen($serverFileName,'r');
        $file_data = fread($fp,$_FILES[$key]["size"]);
        $f_data['name'] = $_FILES[$key]["name"];
        $f_data['type'] = $_FILES[$key]["type"];
        $f_data['url'] = $serverFileName;
        $f_data['content'] = $file_data;
        fclose($fp); 
        $id = $fileSqlModel->add( $f_data );
        */
        $id = 1;
        $item['img_id'] = $id;
        $recordModel = M('record');
        $record_id = $recordModel->add( $item );
        $siData['si_list'] = $siList . $record_id . ',';
        $siMap['si_id'] = $si_id;
        $siModel = M('setup_item');
        $siModel->where($siMap)->save($siData);
        $this->ajaxReturn( $item, '12', 'ok');
      }

    }

}