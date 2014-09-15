<?php
  class StorageAction extends Action{
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

    public function addSupplier(){
        doAuth();
        $this->assign("activeTab", $_GET["activeTab"]);
    	$this->display();
    }

    public function machineType(){
        $this->assign("activeTab", $_GET["activeTab"]);
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