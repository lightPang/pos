<?php
class SupplierAction extends Action{
	public function add(){
		doAuth();
		$supplier = $this->_post('supplier');
		$remark = $this->_post('remark');

		if($supplier){
			$supplierModel = M('Machineprovider');
			$isExsited = $supplierModel->where('name='."'$supplier'")->select();

			if(!$isExsited){
				$data['name'] = $supplier;
				$data['remark'] = $remark;
				$data['create_user'] = $_SESSION['u_id'];
				$data['create_time'] = date('Y-m-d H:i:s');
				$data['edit_user'] = $_SESSION['u_id'];
				$data['edit_time'] = date('Y-m-d H:i:s');
				if($supplierModel->add($data)){
					echo "true";
				}
				else{
					echo "添加失败";
				}
			}
			else{
				echo "添加失败：设备商已存在！";
			}
			
		}
		else{
			echo "添加失败";
		}

		exit;
	}

	public function delete(){
      if( isset( $_SESSION['u_id'] ) && isset( $_POST['mp_id']) ){
        $sModel = M('Machineprovider');
        $map['mp_id'] = $_POST['mp_id'];
        $res = $sModel->where($map)->delete();
        $this->ajaxReturn( $res, "123", $res );
      }
    }

	public function update(){
      	$sModel = M('Machineprovider');
     
		if( isset( $_POST['mp_id'] ) && isset( $_SESSION['u_id'] ) ){
			$map['mp_id'] = $_POST['mp_id'] ;
			$data['edit_user'] = $_SESSION['u_id'] ;
			$data['name'] = $_POST['name'];
			$data['edit_time'] = date('Y-m-d H:i:s',time());
			$data['remark'] = $_POST['updateRemark'];
			$sModel->where($map)->save($data);
			$this->ajaxReturn( $data, "123", 1 );
		}
		$this->ajaxReturn( null, "123", 0 );
    }

	public function search(){
		doAuth();

		$sModel = M('Machineprovider');

		if(isset($_POST['mp_id'])){
			$map['mp_id'] = $_POST['mp_id'];
			$data = $sModel->where($map)->select();
		}
		else{
			$data = $sModel->select();
		}

		$this->ajaxReturn( $data, "123", 1 );
	}
}
?>