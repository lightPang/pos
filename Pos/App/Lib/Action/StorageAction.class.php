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
        $this->display();
    }

    public function machineStorage(){
        $this->doAuth();
        $this->display();
    }

    public function machineDispatch(){
        $this->doAuth();
        $this->display();
    }

  }
?>