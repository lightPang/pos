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
  }
?>