<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;

class DeviceComponent extends Component
{
    private $Devices;
    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->Devices=  TableRegistry::getTableLocator()->get('Devices');
    }
    
    //get first device
    public function first(array $condition){
        $device=  $this->Devices
                ->find('all')
                ->where($condition)
                ->first();
        return $device;
    }
}
