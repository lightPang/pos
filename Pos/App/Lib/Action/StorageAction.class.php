<?php
  class StorageAction extends Action{
    public function index(){
      $this->assign("activeTab", $_GET["activeTab"]);
      $this->display();
    }

    public function addSupplier(){
    	$this->display();
    }

    public function machineType(){
    	$this->display();
    }

    public function machineStoring(){
    	$this->display();
    }

    public function machineStorage(){
    	$this->display();
    }

    public function machineDispatch(){
    	$this->display();
    }

  }
?>