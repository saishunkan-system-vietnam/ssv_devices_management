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

    public function initialize()
    {
        parent::initialize();
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');
        $this->Users = TableRegistry::getTableLocator()->get('Users');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
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
        // Set return response (response code, api response)
        $this->returnResponse(200, $borrowDevices);
    }

    //function view borrow devices
    public function view($id = null)
    {
        if (empty($id)) {
            // Set return response (response code, api response)
            $this->returnResponse(903, 'Id could not be found.');
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
                        ])->toArray();
        if (!empty($borrowDevices)) {
            // Set return response (response code, api response)
            $this->returnResponse(200, $borrowDevices);
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(903, 'There is no data, please check again.');
        }
    }

    //function add borrow devices
    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    public function add()
    {
        if ($this->getRequest()->is('post')) {
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $request = $this->getRequest()->getData();
                $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($request);
                $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
                if ($validateBorrowDevicesDetailError) {
                    // Set return response (response code, api response)
                    $this->returnResponse(901, $validateBorrowDevicesDetailError);
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
                $conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The Borrow device has been saved.');
            } catch (Exception $e) {
                $conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, $e);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //function edit borrow devices
    public function edit()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Id could not be found.');
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Not found data. Please, try again.');
                return;
            }
            $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($this->getRequest()->getData());
            $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
            if ($validateBorrowDevicesDetailError) {
                // Set return response (response code, api response)
                $this->returnResponse(901, $validateBorrowDevicesDetailError);
                return;
            }
            $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
            $borrowDevicesDetailUpdate->update_time = $this->dateNow;
            $borrowDevicesDetailUpdate->update_user = $this->login['user_name'];
            if ($this->BorrowDevicesDetail->save($borrowDevicesDetailUpdate)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The borrow devices has been saved.');
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, 'The category could not be saved. Please, try again.');
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //function delete devices
    public function delete()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Id could not be found.');
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Not found data. Please, try again.');
                return;
            }
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->is_deleted = 1;
                $this->BorrowDevices->save($borrowDevices);
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->is_deleted = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                $conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The borrow devices has been deleted.');
            } catch (Exception $ex) {
                $conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, $ex);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
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
                $this->returnResponse(903, 'Id could not be found.');
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Not found data. Please, try again.');
                return;
            }
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->approved_id = $this->login['id'];
                $borrowDevices->handover_id = $this->login['id'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->status = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                //send mail
                $user = $this->getUser(['id' => $borrowDevices['borrower_id']]);
                $toEmail = $user['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'approved';
                $this->sendMail($toEmail, $borrowInfo, $template);
                $conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The borrow devices has been approve.');
            } catch (Exception $ex) {
                $conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, $ex);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
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
                $this->returnResponse(903, 'Id could not be found.');
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Not found data. Please, try again.');
                return;
            }
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->approved_id = $this->login['id'];
                $borrowDevices->handover_id = $this->login['id'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
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
                $conn->commit();
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The borrow devices has been no approve.');
            } catch (Exception $ex) {
                $conn->rollback();
                // Set return response (response code, api response)
                $this->returnResponse(901, $ex);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
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
                $this->returnResponse(903, 'Id could not be found.');
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Not found data. Please, try again.');
                return;
            }
            $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
            $borrowDevicesDetailUpdate->update_time = $this->dateNow;
            $borrowDevicesDetailUpdate->status = 3;
            $borrowDevicesDetailUpdate->update_user = $this->login['user_name'];

            if ($this->BorrowDevicesDetail->save($borrowDevicesDetailUpdate)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The borrow devices has been return device.');
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, 'The borrow devices could not be return. Please, try again.');
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function confirm return devices
    public function confirmReturnDevice()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Id could not be found.');
                return;
            }
            $borrowDevices = $this->getBorrowDevices(['id' => $request['id']]);
            $borrowDevicesDetail = $this->getBorrowDevicesDetail(['borrow_device_id' => $request['id']]);
            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, 'Not found data. Please, try again.');
                return;
            }
            $borrowDevicesDetail->update_time = $this->dateNow;
            $borrowDevicesDetail->status = 4;
            $borrowDevicesDetail->update_user = $this->login['user_name'];
            if ($this->BorrowDevicesDetail->save($borrowDevicesDetail)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, 'The borrow devices has been confirm return.');
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, 'The borrow devices could not be confirm return. Please, try again.');
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, 'Method type is not correct.');
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
        $conditionEach = each($condition);
        $user = $this->Users
                ->find('all')
                ->where([$conditionEach['key'] => $conditionEach['value']])
                ->first();
        return $user;
    }

    private function getBorrowDevicesDetail($condition)
    {
        $conditionEach = each($condition);
        $borrowDevicesDetail = $this->BorrowDevicesDetail
                ->find('all')
                ->where([$conditionEach['key'] => $conditionEach['value']])
                ->first();
        return $borrowDevicesDetail;
    }

    private function getBorrowDevices($condition)
    {
        $conditionEach = each($condition);
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where([$conditionEach['key'] => $conditionEach['value']])
                ->first();
        return $borrowDevices;
    }

}
