<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;

class MaintenanceComponent extends Component
{

    private $Maintenances;
    private  $Users;
    private  $Devices;

    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->Maintenances = TableRegistry::getTableLocator()->get('Maintenances');
        $this->Devices= TableRegistry::getTableLocator()->get("Devices");
        $this->Users= TableRegistry::getTableLocator()->get("Users");
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
    
    //function view maintenance
    public function view(array $condition){
         $maintenance = $this->Maintenances
                ->find('all')
                ->select($this->Maintenances)
                ->select($this->Users)
                ->select($this->Devices)
                ->join([
                    'Users'=>[
                        'table'=>'users',
                        'type'=>'LEFT',
                        'conditions'=>'Users.id = Maintenances.notificationer_broken'
                    ]
                ])
                ->join([
                    'Devices'=>[
                        'table'=>'devices',
                        'type'=>'INNER',
                        'conditions'=>'Devices.id = Maintenances.devices_id'
                    ]
                ])
                ->where($condition)
                ->first();
        return $maintenance;
    }

    //function get list maintenance
    public function ListMaintenancesWhere(array $condition)
    {
        $lstMaintenance = $this->Maintenances
                ->find('all')
                ->select($this->Maintenances)
                ->select($this->Users)
                ->select($this->Devices)
                ->join([
                    'Users'=>[
                        'table'=>'users',
                        'type'=>'LEFT',
                        'conditions'=>'Users.id = Maintenances.notificationer_broken'
                    ]
                ])
                ->join([
                    'Devices'=>[
                        'table'=>'devices',
                        'type'=>'INNER',
                        'conditions'=>'Devices.id = Maintenances.devices_id'
                    ]
                ])
                ->where($condition)
                ->toArray();
        return $lstMaintenance;
    }

}
