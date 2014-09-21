<?php
	class MachineTypeAction extends CommonAction{
		public function add(){
			if($this->doAuth("manageMachineType")){
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
			}			
		}

		public function search(){
			if($this->doAuth("manageMachineType")){
				$mtModel = M('Machinetype');

				if(isset($_POST['mt_id'])){
					$map['mt_id'] = $_POST['mt_id'];
					$data = $mtModel->where($map)->select();
				}
				else{
					$data = $mtModel->select();
				}

				$data = $this->updateUserInfo( $data );
				$this->ajaxReturn( $data, "123", 1 );
			}		
		}
	}
?>