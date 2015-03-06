<?php
  class OperationAction extends CommonAction{
    public function index(){
      $this->doAuth();
      $this->display();
    }
    
    /*******
    function about mccBig
    */
    
    public function addMccBig(){
      $name = $_POST['name'];
      $remark = $_POST['remark'];
      $u_id = $_SESSION['u_id'];
      $curTime = date('Y-m-d H:i:s',time());
      $MccBigItem['name'] = $name;
      $MccBigItem['create_user'] = $u_id;
      $MccBigItem['create_time'] = $curTime;
      $MccBigItem['edit_user'] = $u_id;
      $MccBigItem['remark'] = $remark;
      $MCCBig = M('mcc_big');
      if( $res = $MCCBig->add( $MccBigItem ) )
        $this->ajaxReturn($res, "表单数据保存成功!", 1);
      else
        $this->ajaxReturn( $data, "", 0);
    }
    
    public function delMCCBigItem(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mb_id']) ){
        $MCCBig = M('mcc_big');
        $map['mb_id'] = $_POST['mb_id'];
        $res = $MCCBig->where($map)->delete();
        $this->ajaxReturn( $res, "123", $res );
      }
    }
    
    public function getMCCBigData(){
      $MCCBig = M('mcc_big');
      if( isset( $_POST['itemId'] ) ){
        $map['mb_id'] = $_POST['itemId'] ;
        $data = $MCCBig->where($map)->select();
      }
      else
        $data = $MCCBig->select();
      //echo json_encode ( $data, JSON_UNESCAPED_UNICODE ); 
      if( isset( $_SESSION['u_id'] ) ){
       $data = $this->updateUserInfo( $data );
       $this->ajaxReturn( $data, "123", 1 );
      }
    }
    
    public function updateMCCBig(){
      $MCCBig = M('mcc_big');
     
      if( isset( $_POST['mb_id'] ) && isset( $_SESSION['u_id'] ) ){
        $map['mb_id'] = $_POST['mb_id'] ;
        $data['edit_user'] = $_SESSION['u_id'] ;
        $data['name'] = $_POST['name'];
        $data['edit_time'] = date('Y-m-d H:i:s',time());
        $data['remark'] = $_POST['remark'];
        $MCCBig->where($map)->save($data);
        $this->ajaxReturn( $data, "123", 1 );
      }
      $this->ajaxReturn( null, "123", 0 );
    }
    
    /*******
    function about mccSub
    */
    
    public function mccSub(){
      $this->doAuth();
      $this->display();
    }
    
    public function createMccSub(){
      if( isset($_SESSION['u_id']) && isset( $_POST['name'] ) ){
        $MccSub = M('mcc_sub');
        $data['name'] = $_POST['name'] ;
        $data['mb_id'] = $_POST['mb_id'];
        $data['remark'] = $_POST['remark'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['create_time'] =  date('Y-m-d H:i:s',time());
        $data['edit_user'] = $_SESSION['u_id'] ;
        $res = $MccSub->add( $data );
        $this->ajaxReturn( $res, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function getMccSubData(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['ms_id'] ) ){
        $map['ms_id'] = $$_POST['ms_id'] ;
        $MccSub = M('mcc_sub');
        $data = $MccSub->where($map)->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        $MccSub = M('mcc_sub');
        $data = $MccSub->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "ok", 0);
      }
    }
    
    public function updateMccSub(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ms_id'] ) ){
        $map['ms_id'] = $_POST['ms_id'];
        $data['mb_id'] = $_POST['mb_id'];
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $MccSub = M('mcc_sub');
        $res = $MccSub->where( $map)->save( $data);
        $this->ajaxReturn( $map, "ok", $res);
      }
    }
    
    public function delMccSub(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ms_id'] ) ){
        $map['ms_id'] = $_POST['ms_id'];
        $MccSub = M('mcc_sub');
        $res = $MccSub->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
    }
    
    /*******
    function about mccItem
    */
    
    public function mccItem(){
      $this->doAuth();
      $this->display('mccItem');
    }
    
    public function createMccItem(){
      if( isset($_SESSION['u_id']) && isset( $_POST['code'] ) ){
        $MccItem = M('mcc_item');
        $data['create_user'] = $_SESSION['u_id'];
        $data['create_time'] =  date('Y-m-d H:i:s',time());
        $data['edit_user'] = $_SESSION['u_id'] ;
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['code'] = $_POST['code'];
        $data['name'] = $_POST['name'];
        $data['is_active'] = $_POST['is_active'];
        $data['return_rate'] = $_POST['return_rate'];
        $res = $MccItem->add( $data );
        $this->ajaxReturn( $res, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function updateMccItem(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mi_id'] ) ){
        $map['mi_id'] = $_POST['mi_id'];
        $data['remark'] = $_POST['remark'];
        $data['edit_user'] = $_SESSION['u_id'];
        $data['code'] = $_POST['code'];
        $data['name'] = $_POST['name'];
        $data['is_active'] = $_POST['is_active'];
        $data['return_rate'] = $_POST['return_rate'];
        $MccItem = M('mcc_item');
        $origin_Item = $MccItem->where( $map )->select()[0];
        $modifyItem = array();
        foreach ($data as $key => $value) {
          if( $value != $origin_Item[$key] ){
            $modifyItem[$key] =  $origin_Item[$key]. ' => ' .$value;
          }
        }
        
        if( count( $modifyItem ) != 0 ){
          $modify_record['table_name'] = 'mcc_item';
          $modify_record['item_id'] = $map['mi_id'];
          $modify_record['u_id'] = $_SESSION['u_id'];
          $modify_record['time'] = Date( 'Y-m-d H:m:s');
          $modify_record['content'] = json_encode( $modifyItem, JSON_UNESCAPED_UNICODE );
          M('modify_record')->add( $modify_record );
        }
        $res = $MccItem->where( $map)->save( $data);
        $this->ajaxReturn( $data, "ok", 1);
      }
      $this->ajaxReturn( null, "ok", 0);
    }
    
    public function delMccItem(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mi_id'] ) ){
        $map['mi_id'] = $_POST['mi_id'];
        $MccItem = M('mcc_item');
        $res = $MccItem->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
      $this->ajaxReturn( null, "deletion failed!", 0 );
    }
    
    public function getMccItemData(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['mi_id'] ) ){
        $map['mi_id'] = $_POST['mi_id'] ;
        $MccItem = M('mcc_item');
        $data = $MccItem->where($map)->select();
        $this->ajaxReturn( $data, "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        $MccItem = M('mcc_item');
        $data = $MccItem->select();
        $this->ajaxReturn( $this->updateUserInfo($data), "ok", 0);
      }
    }
    
    /*******
    function about clientPlatform
    */
    
    public function clientPlatform(){
      $this->doAuth();
      $this->display('clientPlatform');
    }
    
    public function createClientPlatform(){
      if( isset($_SESSION['u_id']) && isset( $_POST['code'] ) ){
        $cp = M('client_platform');
        $data['code'] = $_POST['code'] ;
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['create_time'] =  date('Y-m-d H:i:s',time());
        $data['edit_user'] = $_SESSION['u_id'] ;
        $res = $cp->add( $data );
        $this->ajaxReturn( $res, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function updateClientPlatform(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['cp_id'] ) ){
        $map['cp_id'] = $_POST['cp_id'];
        $data['code'] = $_POST['code'] ;
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $cp = M('client_platform');
        $this->addModifyRecord( $data,$map, 'client_platform', 'cp_id');
        $res = $cp->where( $map)->save( $data);
        $this->ajaxReturn( $modify_record, "ok", 1);
      }
      $this->ajaxReturn( null, "ok", 0);
    }
    
    public function delClientPlatform(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['cp_id'] ) ){
        $map['cp_id'] = $_POST['cp_id'];
        $cp = M('client_platform');
        $res = $cp->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
      $this->ajaxReturn( null, "deletion failed!", 0 );
    }
    
    public function getClientPlatformData(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['cp_id'] ) ){
        $map['cp_id'] = $_POST['cp_id'] ;
        $cp = M('client_platform');
        $data = $cp->where($map)->select()[0];
        $this->ajaxReturn( $data, "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        $cp = M('client_platform');
        $data = $cp->select();
        $this->ajaxReturn( $data , "ok", 0);
      }
    }
    
    /*******
    function about clientRate
    */
    
    public function clientRate(){
      $this->doAuth();
      $this->display('clientRate');
    }
    
    public function createClientRate(){
      if( isset($_SESSION['u_id']) && isset( $_POST['code'] ) ){
        $cr = M('client_rate');
        $data['code'] = $_POST['code'] ;
        $data['name'] = $_POST['name'];
        $data['is_active'] = $_POST['is_active'];
        $data['value']  = $_POST['value'];
        $data['value_top']  = $_POST['value_top'];
        $data['value_bot'] = $_POST['value_bot'];
        $data['remark'] = $_POST['remark'];
        $data['is_inner'] = $_POST['is_inner'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['create_time'] =  date('Y-m-d H:i:s',time());
        $data['edit_user'] = $_SESSION['u_id'] ;
        $res = $cr->add( $data );
        $this->ajaxReturn( $res, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function updateClientRate(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['cr_id'] ) ){
        $map['cr_id'] = $_POST['cr_id'];
        $data['code'] = $_POST['code'] ;
        $data['name'] = $_POST['name'];
        $data['is_active'] = $_POST['is_active'];
        $data['value']  = $_POST['value'];
        $data['value_top']  = $_POST['value_top'];
        $data['value_bot'] = $_POST['value_bot'];
        $data['is_inner'] = $_POST['is_inner'];
        $data['remark'] = $_POST['remark'];
        $cr = M('client_rate');
        $this->addModifyRecord( $data,$map, 'client_rate', 'cr_id');
        $res = $cr->where( $map)->save( $data);
        $this->ajaxReturn( $map, "ok", 1);
      }
      $this->ajaxReturn( null, "update failed!", 0);
    }
    
    public function delClientRate(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['cr_id'] ) ){
        $map['cr_id'] = $_POST['cr_id'];
        $cr = M('client_rate');
        $res = $cr->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
      $this->ajaxReturn( null, "deletion failed!", 0 );
    }
    
    public function getClientRateData(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['cr_id'] ) ){
        $map['cr_id'] = $_POST['cr_id'] ;
        $cr = M('client_rate');
        $data = $cr->where($map)->select()[0];
        $this->ajaxReturn( $data, "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        if( isset($_GET['type'] ) ){
          $cr = M('client_rate');
          $map['is_inner'] = $_GET['type'];
          $data = $cr->where($map)->select();
          $this->ajaxReturn( $data, "ok", 1);
        }
        else{
          $cr = M('client_rate');
          $data = $cr->select();
          $this->ajaxReturn( $this->updateUserInfo($data), "ok", 1);
        }
      }
    }
    
    /*******
    function about clientAttr
    */
    
    public function clientAttr(){
      $this->doAuth();
      $this->display('clientAttr');
    }
    
    public function createClientAttr(){
      if( isset($_SESSION['u_id']) && isset( $_POST['code'] ) ){
        $ca = M('client_attr');
        $data['code'] = $_POST['code'] ;
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $data['create_user'] = $_SESSION['u_id'];
        $data['create_time'] =  date('Y-m-d H:i:s',time());
        $data['edit_user'] = $_SESSION['u_id'] ;
        $res = $ca->add( $data );
        $this->ajaxReturn( $res, "insertion", $res);
      }
      $this->ajaxReturn(null, "insertion failed!", 0);
    }
    
    public function updateClientAttr(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ca_id'] ) ){
        $map['ca_id'] = $_POST['ca_id'];
        $data['code'] = $_POST['code'] ;
        $data['name'] = $_POST['name'];
        $data['remark'] = $_POST['remark'];
        $ca = M('client_attr');
        $this->addModifyRecord( $data,$map, 'client_attr', 'ca_id');
        $res = $ca->where( $map)->save( $data);
        $this->ajaxReturn( $map, "ok", 1);
      }
      $this->ajaxReturn( null, "update failed!", 0);
    }
    
    public function delClientAttr(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['ca_id'] ) ){
        $map['ca_id'] = $_POST['ca_id'];
        $ca = M('client_attr');
        $res = $ca->where($map)->delete();
        $this->ajaxReturn( $res, "deletion", $res );
      }
      $this->ajaxReturn( null, "deletion failed!", 0 );
    }
    
    public function getClientAttrData(){
      if( isset($_SESSION['u_id'] ) && isset( $_POST['ca_id'] ) ){
        $map['ca_id'] = $_POST['ca_id'] ;
        $ca = M('client_attr');
        $data = $ca->where($map)->select()[0];
        $this->ajaxReturn( $data, "ok", 1);
      }
      else if( isset( $_SESSION['u_id' ]) ){
        $ca = M('client_attr');
        $data = $ca->select();
        $this->ajaxReturn( $data, "ok", 0);
      }
    }
  }
?>