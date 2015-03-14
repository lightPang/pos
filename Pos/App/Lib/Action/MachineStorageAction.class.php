<?php
class MachineStorageAction extends CommonAction{
	public function getAllMachine(){
		if($this->doAuth("viewStorage")){
			$mModel = M();

			$sql = "SELECT machine.c_id, company.name as warehouse_name, machine.m_type,
							machinetype.mt_name, machinetype.mt_number, 
							sum(case when state = 0 or state = 1 then 1 else 0 end) as state_1,
							sum(case when state = 2 then 1 else 0 end) as state_2,
							sum(case when state = 3 then 1 else 0 end) as state_3,
							count(state) as total
					FROM machine
					INNER JOIN company
					ON machine.c_id = company.c_id
					INNER JOIN machinetype
					ON machine.m_type = machinetype.mt_id
					GROUP BY c_id, m_type";
			$allMachine = $mModel->query($sql);

			$this->ajaxReturn($allMachine, 'succeed', 1);
		}

		$this->ajaxReturn(false, 'failed', 0);
	}

	public function getMachineDetail(){
		if($this->doAuth("manageMachineStorage") && isset($_POST['c_id']) && isset($_POST['m_type'])){
			$mModel = M();

			$c_id = $_POST['c_id'];
			$m_type = $_POST['m_type'];
			$sql = "SELECT machine.m_code, machine.state, machine.create_time,
							company.name as warehouse_name,
							machinetype.mt_name, machinetype.mt_number
					FROM machine
					INNER JOIN company
					ON machine.c_id = company.c_id
					INNER JOIN machinetype
					ON machine.m_type = machinetype.mt_id
					WHERE machine.c_id=$c_id AND machine.m_type=$m_type";
			$allMachine = $mModel->query($sql);

			$this->ajaxReturn($allMachine, 'succeed', 1);
		}

		$this->ajaxReturn(false, 'failed', 0);
	}
}
?>