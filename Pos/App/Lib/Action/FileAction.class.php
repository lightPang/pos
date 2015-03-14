<?php
  class FileAction extends Action{
    public function downloadFileById(){
      $id = $_GET['id'];
      $sqlModel = M('file');
      $map['file_id'] = $id;
      $data = $sqlModel->where($map)->select();
      if( $data != false ){
        //var_dump($data);
        $data = $data[0];
        $type = $data['type'];
        $name ="Content-Disposition: attachment; filename=" . $data['name'];
        header("Content-type:$type"); 
        header($name); 
        echo $data['content'];
      }
    }

    public function upload(){
      if( isset($_SESSION['u_id'] ) ){
        $filename = $_FILES['file']['name'];
        $key = $_POST['key'];
        $key2 = $_POST['key2'];
        $time = date( "H-m-s");
        $file_preFix = $this->_server('DOCUMENT_ROOT') . C('Web_Prefix') ;
        $targetFolder = $file_preFix .'Mail/'.date("Y")."/".date("m")."/";
        if(!file_exists($targetFolder))//照片目录
                    mkdir($targetFolder,0777, true);

        $fileInfo=pathinfo($_FILES["file"]["name"]);
        if ($filename) {
          $tmpName = $time.".".$fileInfo['extension'];
          $serverFileName = $targetFolder . $tmpName;
          $flag = move_uploaded_file( $_FILES["file"]["tmp_name"], $serverFileName );

          $f_data['name'] = $_FILES["file"]["name"];
          $f_data['type'] = $_FILES["file"]["type"];
          $f_data['url'] = $serverFileName;
          //$f_data['content'] = file_get_contents( $serverFileName );
          //$data = M('file')->add( $f_data );
          //$data = 1;
          $this->ajaxReturn( $tmpName .'_'.$_FILES["file"]["name"] );
        }
        else{
          $this->ajaxReturn( null );
        }
        
      }
    }
  }
?>