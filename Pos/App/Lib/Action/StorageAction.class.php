<?php
  class StorageAction extends Action{
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

    public function addSupplier(){
        doAuth();
        //header("Content-Type:text/html; charset=utf-8");
        $machineproviderModel = M('Machineprovider');
        $providers = $machineproviderModel->table('machineprovider M')
                                          ->join('user U1 ON M.create_user=U1.u_id')
                                          ->join('user U2 ON M.edit_user=U2.u_id')
                                          ->field('M.mp_id, M.name as mp_name, M.remark, M.create_time, M.edit_time, U1.name as create_user, U2.name as edit_user')
                                          ->select();

        $this->assign("activeTab", $_GET["activeTab"]);
        $this->assign("providers", $providers);
        $this->display();
    }

    public function machineType(){
        doAuth();

        //get machine provider
        $mpModel = M('Machineprovider');
        $providers = $mpModel->field('mp_id, name')->select();
        
        //get machine type
        $mtModel = M('Machinetype');
        $machineTypes = $mtModel->select();

        $this->assign("activeTab", $_GET["activeTab"]);
        $this->assign("providers", $providers);
        $this->assign("machineTypes", $machineTypes);
        $this->display();
    }

    public function machineStoring(){
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }

    public function machineStorage(){
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }

    public function machineDispatch(){
        $this->assign("activeTab", $_GET["activeTab"]);
        $this->display();
    }

  }
?>