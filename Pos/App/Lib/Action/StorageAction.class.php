<?php
  class StorageAction extends CommonAction{
    public function index(){
        $this->doAuth();
        $this->display();
    }

    public function addSupplier(){
        $this->doAuth();
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }

    public function machineType(){
        $this->doAuth();

        //get machine provider
        $mpModel = M('Machineprovider');
        $providers = $mpModel->field('mp_id, name')->select();
        
        $this->assign("mp_id", $providers);
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }

    public function machineStoring(){
        $this->doAuth();
        $mtModel = M('Machinetype');
        $machineTypes = $mtModel->field('mt_id, mt_name, mt_number')->select();
        $this->assign("machineTypes", $machineTypes);
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }

    public function machineStorage(){
        $this->doAuth();
        $this->assign("activeTab", $_GET["activeTab"]);
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
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }
  }
?>