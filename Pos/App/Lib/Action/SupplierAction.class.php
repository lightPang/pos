<?php
	class SupplierAction extends Action{
		public function add(){
			doAuth();
			$supplier = $this->_get('supplier');
			$remark = $this->_get('remark');

			if($supplier){
				$supplierModel = M('MachineProvider');
				$isExsited = $supplierModel->where('name='.$supplier)->select();

				if(!$isExsited){
					$data['name'] = $supplier;
					$data['remark'] = $remark;
					$data['create_user'] = $_SESSION['u_id'];
					$data['create_time'] = now();

					if($supplierModel->add(data)){
						echo "true";
					}
					else{
						echo "添加失败1";
					}
				}
				
			}
			else{
				echo "添加失败2";
			}

			exit;
		}
	}
?>