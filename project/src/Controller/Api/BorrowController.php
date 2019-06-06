<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use \Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Mailer\Email;

class BorrowController extends ApiController {

    private $Devices;
    private $BorrowDevices;
    private $BorrowDevicesDetail;
    private $login;
    private $Users;
    private $conn;

    public function initialize() {
        parent::initialize();
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');
        $this->Users = TableRegistry::getTableLocator()->get('Users');
//        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->login = ["id" => 61, "user_name" => "Test", "level" => 1, "email" => "hoangnguyenit98@gmail.com"];
        $this->conn = ConnectionManager::get('default');
    }

    //get list BorrowDevices
    public function borrowDevices() {

        $borrowDevices = $this->where_list(['BorrowDevices.is_deleted' => 0]);
        $args = array(
            'lstBorrowDevices' => $borrowDevices
        );

        // Set return response (response code, api response)
        $this->returnResponse(200, $args);
    }

    //function view borrow devices
    public function view($id = null) {
        if (empty($id)) {
            // Set return response (response code, api response)
            $this->returnResponse(903, ['message' => 'Id could not be found.']);
            return;
        }
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['BorrowDevices.id' => $id])
                ->select($this->BorrowDevices)
                ->select($this->BorrowDevicesDetail)
                ->select($this->Users)
                ->select($this->Devices)
                ->join([
                    'BorrowDevicesDetail' => [
                        'table' => 'borrow_devices_detail',
                        'type' => 'INNER',
                        'conditions' => 'BorrowDevicesDetail.borrow_device_id = BorrowDevices.id'
                    ]
                ])
                ->join([
                    'Users' => [
                        'table' => 'users',
                        'type' => 'Left',
                        'conditions' => 'Users.id = BorrowDevices.borrower_id'
                    ]
                ])
                ->join([
                    'Devices' => [
                        'table' => 'devices',
                        'type' => 'INNER',
                        'conditions' => 'Devices.id = BorrowDevicesDetail.device_id'
                    ]
                ])
                ->first();
        if (!empty($borrowDevices)) {
            // Set return response (response code, api response)
            $borrowDevices['BorrowDevicesDetail']['borrow_reason'] = html_entity_decode($borrowDevices['BorrowDevicesDetail']['borrow_reason']);
            $borrowDevices['BorrowDevicesDetail']['return_reason'] = html_entity_decode($borrowDevices['BorrowDevicesDetail']['return_reason']);
            $borrowDevices['BorrowDevicesDetail']['note_admin'] = html_entity_decode($borrowDevices['BorrowDevicesDetail']['note_admin']);
            $args = array(
                'borrowDevices' => $borrowDevices
            );
            $this->returnResponse(200, $args);
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(903, ['message' => 'There is no data, please check again.']);
        }
    }

    //function add borrow devices
    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    public function add() {
        if ($this->getRequest()->is('post')) {
            try {
                $this->conn->begin();
                $request = $this->getRequest()->getData();
                $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($request);
                $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
                if ($validateBorrowDevicesDetailError) {
                    // Set return response (response code, api response)
                    $this->returnResponse(901, ['message' => $validateBorrowDevicesDetailError]);
                    return;
                }
                $borrowDevices = $this->BorrowDevices->newEntity();
                $borrowDevices->borrower_id = $this->login['id'];
                $borrowDevices->is_deleted = 0;
                $result = $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetail = $this->BorrowDevicesDetail->newEntity();
                $borrowDevicesDetail->borrow_device_id = $result->id;
                $borrowDevicesDetail->device_id = (isset($request['device_id'])) ? $request['device_id'] : '';
                $borrowDevicesDetail->borrow_reason = (isset($request['borrow_reason'])) ? $request['borrow_reason'] : '';
                $borrowDevicesDetail->status = 0;
                $borrowDevicesDetail->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevicesDetail->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevicesDetail->return_date_expected = (isset($request['return_date_expected'])) ? $request['return_date_expected'] : '';
                $borrowDevicesDetail->return_date = (isset($request['return_date'])) ? $request['return_date'] : '';
                $borrowDevicesDetail->created_user = $this->login['user_name'];
                $borrowDevicesDetail->is_deleted = 0;
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                //send mail
                $admin = $this->getUser(['level' => 5]);
                $toEmail = $admin['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'request_borrow';
                $this->sendMail($toEmail, $borrowInfo, $template);
                $this->conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The Borrow device has been saved.']);
            } catch (Exception $e) {
                $this->conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $e]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function edit borrow devices
    public function edit() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Id could not be found.']);
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Not found data. Please, try again.']);
                return;
            }
            $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($request);
            $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
            if ($validateBorrowDevicesDetailError) {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateBorrowDevicesDetailError]);
                return;
            }
            $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $request);
            $borrowDevicesDetailUpdate->update_time = $this->dateNow;
            $borrowDevicesDetailUpdate->update_user = $this->login['user_name'];
            if ($this->BorrowDevicesDetail->save($borrowDevicesDetailUpdate)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The borrow devices has been saved.']);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The category could not be saved. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function delete devices
    public function delete() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Id could not be found.']);
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Not found data. Please, try again.']);
                return;
            }
            try {
                $this->conn->begin();
                $borrowDevices->is_deleted = 1;
                $this->BorrowDevices->save($borrowDevices);
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->is_deleted = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                $this->conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The borrow devices has been deleted.']);
            } catch (Exception $ex) {
                $this->conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function comfirm borrow devices
    public function approve() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Id could not be found.']);
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $getBorrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($getBorrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Not found data. Please, try again.']);
                return;
            }

            //check borrowing
            $borrowing = $this->Devices->find('all')->where(['id' => $getBorrowDevicesDetail['device_id'], 'status' => 1])->toArray();
            if (count($borrowing) > 0) {
                $this->returnResponse(903, ['message' => 'This device was borrowed. Please, choose device other']);
                return;
            }

            try {
                $this->conn->begin();
                $borrowDevices->approved_id = $this->login['id'];
                $borrowDevices->handover_id = $this->login['id'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetail = $this->BorrowDevicesDetail->patchEntity($getBorrowDevicesDetail, $request);
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->approved_date = $this->dateNow;
                $borrowDevicesDetail->status = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $result = $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                //change status -> 1
                $this->changeStatusDevice($result->device_id, 1);

                //send mail
                $user = $this->getUser(['id' => $borrowDevices['borrower_id']]);
                $toEmail = $user['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'approved';
                $this->sendMail($toEmail, $borrowInfo, $template);
                $this->conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The borrow devices has been approve.']);
            } catch (Exception $ex) {
                $this->conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function comfirm borrow devices
    public function noApprove() {

        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Id could not be found.']);
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Not found data. Please, try again.']);
                return;
            }
            try {
                $this->conn->begin();
                $borrowDevices->approved_id = $this->login['id'];
                $borrowDevices->handover_id = $this->login['id'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $request);
                $borrowDevicesDetailUpdate->update_time = $this->dateNow;
                $borrowDevicesDetailUpdate->status = 2;
                $borrowDevicesDetailUpdate->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetailUpdate);

                //send mail
                $user = $this->getUser(['id' => $borrowDevices['borrower_id']]);
                $toEmail = $user['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'approved';
                $this->sendMail($toEmail, $borrowInfo, $template);
                $this->conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The borrow devices has been no approve.']);
            } catch (Exception $ex) {
                $this->conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function return devices
    public function returnDevice() {

        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Id could not be found.']);
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Not found data. Please, try again.']);
                return;
            }
            $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $request);
            $borrowDevicesDetailUpdate->update_time = $this->dateNow;
            $borrowDevicesDetailUpdate->return_date = $this->dateNow;
            $borrowDevicesDetailUpdate->status = 3;
            $borrowDevicesDetailUpdate->update_user = $this->login['user_name'];

            if ($this->BorrowDevicesDetail->save($borrowDevicesDetailUpdate)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The borrow devices has been return device.']);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The borrow devices could not be return. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function confirm return devices
    public function confirmReturnDevice() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Id could not be found.']);
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'Not found data. Please, try again.']);
                return;
            }
            try {
                $this->conn->begin();
                $borrowDevicesDetail->status = 4;
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->return_date = $this->dateNow;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $result = $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                //change status -> 0
                $this->changeStatusDevice($result->device_id, 0);

                $this->conn->commit();
                if ($result) {
                    // Set return response (response code, api response)
                    $this->returnResponse(200, ['message' => 'The borrow devices has been confirm return.']);
                } else {
                    // Set return response (response code, api response)
                    $this->returnResponse(901, ['message' => 'The borrow devices could not be confirm return. Please, try again.']);
                }
            } catch (Exception $ex) {
                $this->conn->rollback();
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    public function filter() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $condition = ['BorrowDevices.is_deleted' => 0];            
            if (isset($request['status']) && !empty($request['status'])) {
                switch ($request['status']) {
                    case 'borrow_request':
                        $condition = array_merge($condition, ["BorrowDevicesDetail.status" => 0]);     
                         break;
                    case "borrowing":
                        $condition = array_merge($condition, ["BorrowDevicesDetail.status" => 1]);
                        break;
                    case "no_borrow":
                        $condition = array_merge($condition, ["BorrowDevicesDetail.status" => 2]);
                        break;
                    case "return_request":
                        $condition = array_merge($condition, ["BorrowDevicesDetail.status" => 3]);
                        break;
                    case "returned":
                        $condition = array_merge($condition, ["BorrowDevicesDetail.status" => 4]);
                        break;
                    default : break;
                }
            }
           
            $borrowDevices = $this->where_list($condition);
            $count = $this->countLstBorrowDevice();
            $args = array(
                'lstCount'=>$count,
                'lstBorrowDevices' => $borrowDevices
            );

            // Set return response (response code, api response)
            $this->returnResponse(200, $args);
        }
    }

    private function countLstBorrowDevice() {
        $borrowDevices = $this->where_list(['BorrowDevices.is_deleted' => 0]);
        $count['borrow_request'] = 0;
        $count['borrowing'] = 0;
        $count['no_borrow'] = 0;
        $count['return_request'] = 0;
        $count['returned'] = 0;
        foreach ($borrowDevices as $row) {
            switch ($row['BorrowDevicesDetail']['status']) {
                case 0:
                    $count['borrow_request'] ++;
                    break;
                case 1:
                    $count['borrowing'] ++;
                    break;
                case 2:
                    $count['no_borrow'] ++;
                    break;
                case 3:
                    $count['return_request'] ++;
                    break;
                case 4:
                    $count['returned'] ++;
                    break;
                default : break;
            }
        }
        return $count;
    }

    private function changeStatusDevice($id, $status) {
        $device = $this->Devices->get($id);
        $device->status = $status;
        $this->Devices->save($device);
    }

    private function getBorrowDeviceInfo($borrower_id, $borrowDevicesDetail) {
        $user = $this->getUser(['id' => $borrower_id]);
        $device = $this->Devices->get($borrowDevicesDetail->device_id);
        $borrowInfo = array(
            'user' => $user,
            "borrowDetail" => $borrowDevicesDetail,
            'device' => $device
        );
        return $borrowInfo;
    }

    private function sendMail($toEmail, $viewVars, $template) {
        $email = new Email('default');
        $email->setFrom('hoanghung888@gmail.com')
                ->setTo($toEmail)
                ->setSubject('Borrow devices')
                ->setEmailFormat('html')
                ->setViewVars($viewVars)
                ->viewBuilder()
                ->setTemplate($template);
        $email->send();
    }

    private function getUser($condition) {
        $user = $this->Users
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $user;
    }

    private function getBorrowDevicesDetail($condition) {
        $borrowDevicesDetail = $this->BorrowDevicesDetail
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $borrowDevicesDetail;
    }

    private function getBorrowDevices($condition) {
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $borrowDevices;
    }

    private function where_list(array $condition) {
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where($condition)
                ->select($this->BorrowDevices)
                ->select($this->BorrowDevicesDetail)
                ->select($this->Users)
                ->select($this->Devices)
                ->join([
                    'BorrowDevicesDetail' => [
                        'table' => 'borrow_devices_detail',
                        'type' => 'INNER',
                        'conditions' => 'BorrowDevicesDetail.borrow_device_id = BorrowDevices.id'
                    ]
                ])
                ->join([
                    'Users' => [
                        'table' => 'users',
                        'type' => 'Left',
                        'conditions' => 'Users.id = BorrowDevices.borrower_id'
                    ]
                ])
                ->join([
                    'Devices' => [
                        'table' => 'devices',
                        'type' => 'INNER',
                        'conditions' => 'Devices.id = BorrowDevicesDetail.device_id'
                    ]
                ])
                ->toArray();

        if (count($borrowDevices) > 0) {
            foreach ($borrowDevices as $row) {
                $row['BorrowDevicesDetail']['borrow_reason'] = html_entity_decode($row['BorrowDevicesDetail']['borrow_reason']);
                $row['BorrowDevicesDetail']['return_reason'] = html_entity_decode($row['BorrowDevicesDetail']['return_reason']);
                $row['BorrowDevicesDetail']['note_admin'] = html_entity_decode($row['BorrowDevicesDetail']['note_admin']);
            }
        }
        return $borrowDevices;
    }

}
