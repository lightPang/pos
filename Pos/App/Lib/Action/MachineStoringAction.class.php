<?php
	class MachineStoringAction extends CommonAction{
		private function getOrderCode(){
			$oModel = M('Order');
			$lastOrder = $oModel->order('o_id desc')->limit(1)->select();

			if($lastOrder){
				if(strtotime(substr($lastOrder[0]['o_code'], 1,10)) == strtotime(date("Y-m-d"))){
					$number = (int)substr($lastOrder[0]['o_code'], 11);

					$newNumber = ++$number;
					$numberStr = "";
					for(;$number < 100; $number *= 10){
						$numberStr.= "0";
					}

					return "R".date("Y-m-d").$numberStr.$newNumber;
				}
				else{
					return "R".date("Y-m-d")."001";
				}
			}
			else{
				return "R".date("Y-m-d")."001";
			}
		}

		public function addOrder(){
			if($this->doAuth("manageMachineStoring")){
				$order = $this->_post();
				$order['o_code'] = $this->getOrderCode();
				$order['o_user'] = $_SESSION['u_id'];
				$order['o_time'] = date('Y-m-d H:i:s');
				$order['create_user'] = $_SESSION['u_id'];
				$order['create_time'] = date('Y-m-d H:i:s');
				$order['edit_user'] = $_SESSION['u_id'];
				$order['edit_time'] = date('Y-m-d H:i:s');

				$oModel = M('Order');
				$result = $oModel->add($order);
				if($result){
					$machinelist = explode("\n", $order['m_list']);
					$machineMoedl = M('Machine');
					$data['o_id'] = $result;

					foreach($machinelist as $machine){
						if($machine != ""){
							$data['m_type'] = $_POST['m_type'];
							$data['m_code'] = $machine;
							$data['create_user'] = $_SESSION['u_id'];
							$data['create_time'] = date('Y-m-d H:i:s');
							$data['edit_user'] = $_SESSION['u_id'];
							$data['edit_time'] = date('Y-m-d H:i:s');

							$machineMoedl->add($data);
						}	
					}

					$this->ajaxReturn(true, '设备入库成功', 1);
				}
				else{
					$this->ajaxReturn(false, '设备入库失败', 0);
				}	
			}
			$this->ajaxReturn(false, '设备入库失败', 0);
		}

		public function deleteOrder(){
			if($this->doAuth("manageMachineStoring")){
				if(isset( $_POST['o_id']) ){
		        $oModel = M('Order');
		        $mModel = M('Machine');
		        $map['o_id'] = $_POST['o_id'];

		        $res1 = $mModel->where($map)->delete();
		        $res2 = $oModel->where($map)->delete();
		        $this->ajaxReturn( $res1&&$res2, "123", $res );
		      }
			}
	      
	    }

	    public function updateOrder(){
			if($this->doAuth("manageMachineStoring")){
				
				if( isset( $_POST['o_id'] )){
					//update Order first
					$oModel = M('Order');
					$data = $this->_post();
					$data['edit_user'] = $_SESSION['u_id'] ;
					$data['edit_time'] = date('Y-m-d H:i:s',time());
					$oModel->save($data);

					
					$map['o_id'] = $_POST['o_id'];
					$machinelist = explode("\n", $_POST['m_list']);
					$mModel = M('Machine');
					$oldMachines = $mModel->where($map)->field('m_code')->select();
					$oldMachine = array();
					foreach($oldMachines as $one){
						$oldMachine[] = $one['m_code'];
					}
					//$this->ajaxReturn($oldMachine,"123", 1);
					//add new machine
					$newMachine['o_id'] = $_POST['o_id'];
					foreach($machinelist as $onemachine){
						if($onemachine != ""){
							if(!in_array($onemachine, $oldMachine)){
								$newMachine['m_type'] = $_POST['m_type'];
								$newMachine['m_code'] = $onemachine;
								$newMachine['create_user'] = $_SESSION['u_id'];
								$newMachine['create_time'] = date('Y-m-d H:i:s');
								$newMachine['edit_user'] = $_SESSION['u_id'];
								$newMachine['edit_time'] = date('Y-m-d H:i:s');

								$mModel->add($newMachine);
							}
						}
					}
					//delete old machine
					$o_id  = $_POST['o_id'];
					foreach($oldMachine as $onemachine){
						if(!in_array($onemachine, $machinelist)){
							$mModel->where("o_id=".$o_id." And m_code='".$onemachine."'")->delete();
						}
					}

					$this->ajaxReturn( true, "123", 1 );
				}
				$this->ajaxReturn( null, "123", 0 );
			}
	      	
	    }

		public function searchOrder(){
			if($this->doAuth("manageMachineStoring")){

				$oModel = M('Order');
				if(isset($_POST['o_id'])){
					$map['o_id'] = $_POST['o_id'];
					$data = $sModel->where($map)->select();
				}
				else{
					$data = $oModel->select();
				}

				$data = $this->updateUserInfo( $data );
				$this->ajaxReturn( $data, "123", 1 );
			}
		}
	}
?>