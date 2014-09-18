<?php
	class MachineTypeAction extends Action{
		public function add(){
			doAuth();

			$mt_name = $this->_post('mt_name');
			$mtModel = M('Machinetype');
			$isExisted = $mtModel->where("mt_name='$mt_name'")->select();

			if(!$isExisted){
				$data = $this->_post();
				$data['create_user'] = $_SESSION['u_id'];
				$data['create_time'] = date('Y-m-d H:i:s');
				$data['edit_user'] = $_SESSION['u_id'];
				$data['edit_time'] = date('Y-m-d H:i:s');

				if($mtModel->add($data)){
					echo "添加设备机型成功！";
				}
				else{
					echo "添加失败！";
				}
			}
			else{
				echo "添加失败，设备机型已存在！";
			}

			exit;
		}
	}
?>