<?php
class MachineDispatchAction extends CommonAction{
	public function getMachineQuantity(){
		if($this->doAuth("manageDeploy") && isset($_POST['m_type'])){

			$mModel = M('Machine');
			$map['m_type'] = $_POST['m_type'];
			$map['state'] = 0;

			$quantity = $mModel->where($map)->count();

			$this->ajaxReturn($quantity, 'machine quantity', 1);
		}
		else if( $this->doAuth("manageDeploy") ){
			$sql = "select c_id,m_type,count(*) as num from machine where state = 0 group by m_type,c_id";
			$sqlModel = M('machine');
			$data = $sqlModel->query( $sql );
			$this->ajaxReturn($data, 'machine quantity', 1);
		}
	}

	public function getDeployOrders(){
		if($this->doAuth("manageDeploy") ){

			$dModel = M('Deployorder');
			$cModel = M('Company');
			$uModel = M('User');
			$mtModel = M('Machinetype');

			$map['c_id'] = $_SESSION['c_id'];
			if( isset($_POST['do_id']) )
				$map['do_id'] = $_POST['do_id'];
			$deployOrders = $dModel->where($map)->select();
			$companys = $cModel->field('c_id as id, name')->select();
			$users = $uModel->field('u_id as id, name')->select();
			$machinetypes = $mtModel->field('mt_id, mt_name, mt_number')->select();

			for($i=0; $i<count($deployOrders); $i++){
				$deployOrders[$i]['sourceC'] = $this->getName($companys, $deployOrders[$i]['source_c']);
				$deployOrders[$i]['targetC'] = $this->getName($companys, $deployOrders[$i]['target_c']);
				$deployOrders[$i]['create_user'] = $this->getName($users, $deployOrders[$i]['create_user']);
				$deployOrders[$i]['edit_user'] = $this->getName($users, $deployOrders[$i]['edit_user']);

				for($j=0; $j<count($machinetypes); $j++){
					if($deployOrders[$i]['m_type'] == $machinetypes[$j]['mt_id']){
						$deployOrders[$i]['mType'] = $machinetypes[$j]['mt_name'].'-'.$machinetypes[$j]['mt_number'];
					}
				}
			}
			if( isset($_POST['do_id'] ) )
				$this->ajaxReturn($deployOrders[0], 'deployOrders', $_SESSION['c_id']);
			else
				$this->ajaxReturn($deployOrders, 'deployOrders', $_SESSION['c_id']);
		}
	}

	public function agreeDeployOrder(){
		if($this->doAuth("manageDeploy") && isset($_POST['do_id'])){
			$doModel = M('Deployorder');
			$mModel = M('Machine');

			$map1['do_id'] = $_POST['do_id'];
			$deployOrder = $doModel->where($map1)->select()[0];

			$m_list = $_POST['m_list'];
			$mArr = explode('\n', $m_list );
			$machineMap['m_code'] = array( 'in' , $mArr );
			$machineMap['state'] = 0;
			$flag = 0;
			$mData = $mModel->where($machineMap)->select();
			if( $deployOrder['state'] != 0 ){
				$flag = 1;
				$resMsg = '请勿重复操作！';
			}	
			else if( count($mData) != $deployOrder['quantity'] ){
				$resMsg = "分配错误!\n ";
				foreach ($mArr as $codeItem) {
					
					foreach ($mData as $mItem) {
						if( $mData['m_code'] == $codeItem  ){
							$flag = 1;
							break;
						}
					}
					if( $flag == 0 ){
						$resMsg .= $codeItem ."： 机身码不存在或已被分配！\n ";
						$flag = 1;
					}
				}
			}

			else{
				$flag = 0;
				foreach ($mData as $mItem) {
					if( $mItem['m_type'] != $deployOrder['m_type'] ){
						$flag = 1;
						$resMsg .= $mItem['m_code']."：机器型号不匹配！\n ";
					}
				}

				if( $flag == 0 ){
					$m_id = '';
					foreach ($mData as $key => $mItem) {
						$saveMap['m_id'] = $mItem['m_id'];
						$m_id .= $mItem['m_id'].',';
						$mData[$key]['edit_user'] = $_SESSION['u_id'];
						$mData[$key]['edit_time'] = date('Y-m-d H:i:s');
						$mData[$key]['c_id'] = $deployOrder['target_c'];
						$res = $mModel->save( $mData[$key] );
					}
					
					$deployOrder['state'] = 1;
					$deployOrder['m_id'] = $m_id;
					$deployOrder['m_code_list'] = $_POST['m_list'];
					$this->addModifyRecord( $deployOrder, $map1, 'deployorder', 'do_id');
					$doModel->save($deployOrder);
					$resMsg = '同意设备调拨成功!';
				}	
			}
		
			$this->ajaxReturn( $res, $resMsg, $flag);
			
		}
	}

	public function disagreeDeployOrder(){
		if($this->doAuth("manageDeploy") && isset($_POST['do_id'])){
			$doModel = M('Deployorder');
			$map['do_id'] = $_POST['do_id'];
			$data['do_id'] = $_POST['do_id'];
			$data['remark'] = $_POST['remark'];
			$data['state'] = 2;
			$this->addModifyRecord( $data, $map, 'deployorder', 'do_id');
			$res = $doModel->save($data);

			if($res){
				$this->ajaxReturn(true, '拒绝设备调拨成功！', 1);
			}
			else{
				$this->ajaxReturn(false, '拒绝设备调拨失败！', 0);
			}
		}
		else{
			$this->ajaxReturn(false,'请登录后再进行操作！',0);
		}
	}

	public function addDeployOrders(){
		$deployOrder = array();
		if($this->doAuth("manageDeploy") ){
			$dModel = M('Deployorder');

			$deployOrder = $this->_post();
			$deployOrder['create_user'] = $_SESSION['u_id'];
			$deployOrder['create_time'] = date('Y-m-d H:i:s');
			$deployOrder['edit_user'] = $_SESSION['u_id'];
			$deployOrder['edit_time'] = date('Y-m-d H:i:s');
			$deployOrder['state'] = 0;
			$map['do_id'] = $dModel->add($deployOrder);
			$this->addModifyRecord( $data, $map, 'deployorder', 'do_id',true);
			$this->ajaxReturn($deployOrder, 'succeed', 1);
		}

		$this->ajaxReturn(false, 'fail', 1);
	}
}
?>