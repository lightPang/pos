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
					$data['create_time'] = time();

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
	}
?>