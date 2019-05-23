<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;

class MaintenanceComponent extends Component
{

    private $Maintenances;

    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->Maintenances = TableRegistry::getTableLocator()->get('Maintenances');
    }

    //function get first maintenance
    public function first(array $condition)
    {
        $maintenance = $this->Maintenances
                ->find('all')
                ->where($condition)
                ->first();
        return $maintenance;
    }

    //function get list maintenance
    public function getList(array $condition)
    {
        $lstMaintenance = $this->Maintenances
                ->find('all')
                ->where($condition)
                ->toArray();
        return $lstMaintenance;
    }   
}
