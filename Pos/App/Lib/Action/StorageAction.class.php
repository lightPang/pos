<?php
  class StorageAction extends CommonAction{
    public function index(){
        $this->doAuth();
        $this->display();
    }

    public function addSupplier(){
        $this->doAuth();
        $this->display();
    }

    public function machineType(){
        $this->doAuth();

        //get machine provider
        $mpModel = M('Machineprovider');
        $providers = $mpModel->field('mp_id, name')->select();
        
        $this->assign("providers", $providers);
        $this->display();
    }

    public function machineStoring(){
        $this->doAuth();
        $mtModel = M('Machinetype');
        $machineTypes = $mtModel->field('mt_id, mt_name, mt_number')->select();
        
        $this->assign("machineTypes", $machineTypes);
        $this->display();
    }

    public function machineStorage(){
        $this->doAuth();
        $this->display();
    }

    public function machineDispatch(){
        $this->doAuth();

        $cModel = M('Company');
        $companys = $cModel->field("c_id, name")->select();

        $mtModel = M('Machinetype');
        $machineTypes = $mtModel->field('mt_id, mt_name, mt_number')->select();

        $this->assign("companys", $companys);
        $this->assign("machineTypes", $machineTypes);
        $this->display();
    }

    public function validateSerial(){
        $this->doAuth();
        $sqlModel = M('machine');
        $typeList = $_POST['typeList'];
        $numberList = $_POST['numberList'];
        $typeArr = explode(',', $typeList);
        $numberArr = explode(',', $numberList);
        for( $i = 0; $i < count($typeArr); ++ $i ){
            if( $typeArr[$i] == "" or $numberArr[$i] == "" ) continue;
            $map['m_type'] = $typeArr[$i];
            $map['m_code'] = $numberArr[$i];
            $data = $sqlModel->where($map)->select();
            if( $data == false )
                $this->ajaxReturn( $typeArr, "123", false );
        }
        $this->ajaxReturn( null, "123", true );
    }

    public function updateMachine(){
        $sidArr = $_POST['si_id'];
        $so_id = $_POST['confirmSoId'];
        $mcodeArr = $_POST['m_code'];
        $soModel = M('setup_order');
        $siModel = M('setup_item');
        for ($i = 0 ; $i < count($sidArr) ; ++ $i ) {
            $map['si_id'] = $sidArr[$i];
            $data['m_code'] = $mcodeArr[$i];
            $data['setup_state'] = 0;
            $siModel->where($map)->save($data);
        }
        $state['state'] = 1;
        $soMap['so_id'] = $so_id;
        $soModel->where($soMap)->save($state);
        $this->ajaxReturn($mcodeArr,'ok', true);
    }
  }
?>