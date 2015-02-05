<?php
class MachineDispatchAction extends CommonAction{
	public function getMachineQuantity(){
		if($this->doAuth("manageDeploy") && isset($_POST['m_type'])){

			$mModel = M('Machine');
			$map['m_type'] = $_POST['m_type'];
			$map['state'] = 1;

			$quantity = $mModel->where($map)->count();

			$this->ajaxReturn($quantity, 'machine quantity', 1);
		}
	}

	public function getDeployOrders(){
		if($this->doAuth("manageDeploy") && isset($_POST['state'])){

			$dModel = M('Deployorder');
			$cModel = M('Company');
			$uModel = M('User');
			$mtModel = M('Machinetype');

			$map['state'] = $_POST['state'];
			$deployOrders = $dModel->where($map)->select();
			$companys = $cModel->field('c_id as id, name')->select();
			$users = $uModel->field('u_id as id, name')->select();
			$machinetypes = $mtModel->field('mt_id, mt_name, mt_number')->select();

			for($i=0; $i<count($deployOrders); $i++){
				$deployOrders[$i]['source_c'] = $this->getName($companys, $deployOrders[$i]['source_c']);
				$deployOrders[$i]['target_c'] = $this->getName($companys, $deployOrders[$i]['target_c']);
				$deployOrders[$i]['create_user'] = $this->getName($users, $deployOrders[$i]['create_user']);
				$deployOrders[$i]['edit_user'] = $this->getName($users, $deployOrders[$i]['edit_user']);

				for($j=0; $j<count($machinetypes); $j++){
					if($deployOrders[$i]['m_type'] == $machinetypes[$j]['mt_id']){
						$deployOrders[$i]['m_type'] = $machinetypes[$j]['mt_name'].'-'.$machinetypes[$j]['mt_number'];
					}
				}
			}

			$this->ajaxReturn($deployOrders, 'deployOrders', 1);
		}
	}

	public function agreeDeployOrder(){
		if($this->doAuth("manageDeploy") && isset($_POST['do_id'])){
			$doModel = M('Deployorder');
			$mModel = M('Machine');

			$map1['do_id'] = $_POST['do_id'];
			$deployOrder = $doModel->where($map1)->select()[0];

			$map2['state'] = 1;
			$map2['m_type'] = $deployOrder['m_type'];
			$machines = $mModel->where($map2)->limit($deployOrder['quantity'])->select();

			if(count($machines) >= $deployOrder['quantity']){
				$m_code = "";
				foreach($machines as $machine){
					$machine['c_id'] = $deployOrder['target_c'];
					$machine['state'] = 2;
					$machine['edit_user'] = $_SESSION['u_id'];
					$machine['edit_time'] = date('Y-m-d H:i:s');

					$m_code .= $machine['m_code']."\n";

					$mModel->save($machine);
				}

				$deployOrder['m_code'] = $m_code;
				$deployOrder['remark'] = $_POST['remark'];
				$deployOrder['state'] = 1;
				$deployOrder['edit_user'] = $_SESSION['u_id'];
				$deployOrder['edit_time'] = date('Y-m-d H:i:s');

				$doModel->save($deployOrder);

				$this->ajaxReturn(true, '同意设备调拨成功!', 1);
			}
			else{
				$this->ajaxReturn(flase, '可用机器数量不足!', 0);
			}
			
		}
	}

	public function disagreeDeployOrder(){
		if($this->doAuth("manageDeploy") && isset($_POST['do_id'])){
			$doModel = M('Deployorder');
			$data['do_id'] = $_POST['do_id'];
			$data['remark'] = $_POST['remark'];
			$data['state'] = 2;
			
			$res = $doModel->save($data);

			if($res){
				$this->ajaxReturn(true, '拒绝设备调拨成功！', 1);
			}
			else{
				$this->ajaxReturn(false, '拒绝设备调拨失败！', 0);
			}
		}
	}

	public function addDeployOrders(){
		if($this->doAuth("manageDeploy") && isset($_POST['deployOrders'])){
			$dModel = M('Deployorder');

			foreach($_POST['deployOrders'] as $deployOrder){
				$deployOrder['create_user'] = $_SESSION['u_id'];
				$deployOrder['create_time'] = date('Y-m-d H:i:s');
				$deployOrder['edit_user'] = $_SESSION['u_id'];
				$deployOrder['edit_time'] = date('Y-m-d H:i:s');

				$dModel->add($deployOrder);
			}

			$this->ajaxReturn(true, 'succeed', 1);
		}

		$this->ajaxReturn(false, 'fail', 1);
	}
}
?>