<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;

class BorrowComponent extends Component
{

    private $BorrowDevicesDetail;
    private $BorrowDevices;

    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
    }

    public function first(array $condition)
    {
        $borrow = $this->BorrowDevices
                        ->find('all')
                        ->where($condition)
                        ->select($this->BorrowDevices)
                        ->select($this->BorrowDevicesDetail)
                        ->join([
                            'BorrowDevicesDetail' => [
                                'table' => 'borrow_devices_detail',
                                'type' => 'INNER',
                                'conditions' => 'BorrowDevicesDetail.borrow_device_id = BorrowDevices.id'
                            ]
                        ])->first();
        return $borrow;
    }

    public function firstBorrowDevicesDetail(array $condition)
    {
        $borrow = $this->BorrowDevicesDetail
                ->find('all')
                ->where($condition)
                ->first();
        return $borrow;
    }

    public function saveBorrowDevicesDetail($borrowDevicesDetail)
    {
        return $this->BorrowDevicesDetail->save($borrowDevicesDetail);
    }

}
