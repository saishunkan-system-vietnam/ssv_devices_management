<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use \Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Mailer\Email;

class BorrowController extends ApiController
{

    private $Devices;
    private $BorrowDevices;
    private $BorrowDevicesDetail;
    private $login;
    private $Users;
    private $conn;

    public function initialize()
    {
        parent::initialize();
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');
        $this->Users = TableRegistry::getTableLocator()->get('Users');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->conn = ConnectionManager::get('default');
    }

    //get list BorrowDevices
    public function borrowDevices()
    {
        $borrowDevices = $this->BorrowDevices
                        ->find('all')
                        ->where(['BorrowDevices.is_deleted' => 0])
                        ->select($this->BorrowDevices)
                        ->select($this->BorrowDevicesDetail)
                        ->join([
                            'BorrowDevicesDetail' => [
                                'table' => 'borrow_devices_detail',
                                'type' => 'INNER',
                                'conditions' => 'BorrowDevicesDetail.borrow_device_id = BorrowDevices.id'
                            ]
                        ])->toArray();
        if (count($borrowDevices) > 0) {
            foreach ($borrowDevices as $row) {
                $row['BorrowDevicesDetail']['borrow_reason'] = html_entity_decode($row['BorrowDevicesDetail']['borrow_reason']);
                $row['BorrowDevicesDetail']['return_reason'] = html_entity_decode($row['BorrowDevicesDetail']['return_reason']);
                $row['BorrowDevicesDetail']['note_admin'] = html_entity_decode($row['BorrowDevicesDetail']['note_admin']);
            }
        }

        $args = array(
            'lstBorrowDevices' => $borrowDevices
        );

        // Set return response (response code, api response)
        $this->returnResponse(200, $args);
    }

    //function view borrow devices
    public function view($id = null)
    {
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
                        ->join([
                            'BorrowDevicesDetail' => [
                                'table' => 'borrow_devices_detail',
                                'type' => 'INNER',
                                'conditions' => 'BorrowDevicesDetail.borrow_device_id = BorrowDevices.id'
                            ]
                        ])->first();
        if (!empty($borrowDevices)) {
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
    public function add()
    {
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
                $borrowDevicesDetail->borrow_reason = (isset($request['borrow_reason'])) ? htmlentities($request['borrow_reason']) : '';
                $borrowDevicesDetail->status = 0;
                $borrowDevicesDetail->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevicesDetail->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevicesDetail->delivery_date = (isset($request['delivery_date'])) ? $request['delivery_date'] : '';
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
    public function edit()
    {
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
            if (isset($request['note_admin'])) {
                $request['note_admin'] = html_entity_decode($request['note_admin']);
            }
            if (isset($request['borrow_reason'])) {
                $request['borrow_reason'] = html_entity_decode($request['borrow_reason']);
            }
            if (isset($request['return_reason'])) {
                $request['return_reason'] = html_entity_decode($request['return_reason']);
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
    public function delete()
    {
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
    public function approve()
    {
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

                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->status = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $resultDetail = $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                $this->setStatusDevice(['id' => $resultDetail->device_id], 1);
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
    public function noApprove()
    {

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

                if (isset($request['note_admin'])) {
                    $request['note_admin'] = html_entity_decode($request['note_admin']);
                }
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
    public function returnDevice()
    {

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
             if (isset($request['return_reason'])) {
                $request['return_reason'] = html_entity_decode($request['return_reason']);
            }
            $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $request);
            $borrowDevicesDetailUpdate->update_time = $this->dateNow;
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
    public function confirmReturnDevice()
    {
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
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->status = 4;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $resultDetail = $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                If ($this->setStatusDevice(['id' => $resultDetail->device_id], 0) == FALSE) {
                    $this->returnResponse(901, ['message' => 'The borrow devices could not be confirm return. Please, try again.']);
                    $this->conn->rollback();
                    return;
                }
                $this->conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The borrow devices has been confirm return.']);
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

    private function getBorrowDeviceInfo($borrower_id, $borrowDevicesDetail)
    {
        $user = $this->getUser(['id' => $borrower_id]);
        $device = $this->Devices->get($borrowDevicesDetail->device_id);
        $borrowInfo = array(
            'user' => $user,
            "borrowDetail" => $borrowDevicesDetail,
            'device' => $device
        );
        return $borrowInfo;
    }

    private function sendMail($toEmail, $borrowInfo, $template)
    {
        $email = new Email('default');
        $email->setFrom('hoanghung888@gmail.com')
                ->setTo($toEmail)
                ->setSubject('Borrow devices')
                ->setEmailFormat('html')
                ->setViewVars($borrowInfo)
                ->viewBuilder()
                ->setTemplate($template);
        $email->send();
    }

    private function getUser($condition)
    {
        $user = $this->Users
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $user;
    }

    private function getBorrowDevicesDetail($condition)
    {
        $borrowDevicesDetail = $this->BorrowDevicesDetail
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $borrowDevicesDetail;
    }

    private function getBorrowDevices($condition)
    {
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $borrowDevices;
    }

    private function setStatusDevice(array $condition, $status)
    {
        $device = $this->Devices
                ->find('all')
                ->where($condition)
                ->first();
        $device->status = $status;
        return $this->Devices->save($device);
    }

}
