<?php
  import("@.ORG.SendMail");
  class MailAction extends CommonAction{
    public function index(){
      $this->assign('activeTab',$_GET['activeTab']);
      $this->doAuth();
      $this->display();
    }

    public function sendMail(){
      $mail = new SendMail();
      $content = $_POST['content'];
      $copyTo = $_POST['copyTo'];
      $receiver = $_POST['receiver'];
      $secrTo = $_POST['secrTo'];
      $file_list = $_POST['file_list'];
      $theme = $_POST['theme'];
      
      $mail->setServer("smtp.163.com", "b85270854@163.com", "foreverlove", 465, true); 
      $mail->setFrom("b85270854@163.com"); //设置发件人
      $receiverArr = $this->get_mail_arr($receiver);
      for( $i = 0; $i < count($receiverArr) ; ++$i ){
        $mail->setReceiver( $receiverArr[$i] ); 
      }
      //设置收件人，多个收件人，调用多次
      
      //$mail->setCc("XXXX"); //设置抄送，多个抄送，调用多次
      //$mail->setBcc("XXXXX"); //设置秘密抄送，多个秘密抄送，调用多次
      $fileArr = $this->get_attachment( $file_list );
      $file_preFix = $this->_server('DOCUMENT_ROOT') . C('Web_Prefix') .'Mail/'.date("Y")."/".date("m")."/" ;
      for( $i = 0 ; $i < count($fileArr) ; ++$i ){
        $mail->addAttachment( array( $file_preFix.$fileArr[$i]['attach'] , $fileArr[$i]['name']) ); //添加附件，多个附件，可调用多次，第一个文件名是 程序要去抓的文件名，第二个文件名是显示在邮件中的文件名。
      }
      
      $mail->setMail($theme, $content); //设置邮件主题、内容
      $mail->sendMail();
      if( $mail->error() == 'No resource can to be close')
        $this->ajaxReturn( $this->_post(),  $mail->error(),1 ); //发送
      else
        $this->ajaxReturn( $this->_post(), $mail->error(), 0 );
    }
     

    protected function get_mail_arr( $str ){
      $resArr = array();
      $user_list = explode(',', $str );
      for ($i=0; $i < count($user_list) ; $i++) { 
         if( $user_list[$i] != '' ){
          array_push( $resArr, explode('-', $user_list[$i])[1] );
         }
       }
      return $resArr; 
    }
    
    protected function get_attachment( $str ){
      
      $resArr = array();

      $file_arr = explode(',', $str);
      for( $i = 0; $i < count( $file_arr ) ; $i ++ ){
        if( $file_arr[$i] != '' ){
          $tempArr = explode('_', $file_arr[$i] );
          $item = array();
          $item['attach'] = $tempArr[1];
          $item['name'] = $tempArr[2] ;
          array_push( $resArr, $item );
        }
      }
      return $resArr ;
    }

    public function getUserMail(){
      if( $this->doAuth() ){
        $companyData = M('company')->field('c_id,name')->select();
        $userData = M('user')->field('c_id,email,name')->select();
        $res['company'] = $companyData;
        $res['user'] = $userData;
        $this->ajaxReturn( $res, 'ok' ,1);
      }
    }
  }
?>