<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use \Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Mailer\Email;

/**
 * Borrow Controller
 *
 *
 * @method \App\Model\Entity\Borrow[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class BorrowController extends ApiController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    private $Devices;
    private $BorrowDevices;
    private $BorrowDevicesDetail;
    private $dateNow;
    private $login;
    private $Users;

    public function initialize()
    {
        parent::initialize();
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');
        $this->Users = TableRegistry::getTableLocator()->get('Users');

        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $this->dateNow = date('Y-m-d H-i:s');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
    }

    //get list BorrowDevices
    public function borrowDevices()
    {
        // Set the HTTP status code. By default, it is set to 200
        $this->responseCode = 200;
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();

        // Set the response
        $this->apiResponse['lstBorrowDevices'] = $borrowDevices;
    }

    //function view borrow devices
    public function view($id = null)
    {
        if (empty($id)) {
            $this->responseCode = 903;
            // Set the response
            $this->apiResponse['message'] = 'id could not be found.';
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
            // Set the HTTP status code. By default, it is set to 200
            $this->responseCode = 200;

            $this->apiResponse['lstBorrowDevices'] = $borrowDevices;
        } else {
            $this->responseCode = 903;

            //set the response   
            $this->apiResponse['message'] = 'There is no data, please check again.';
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
                $validateBorrowDevices = $this->BorrowDevices->newEntity($request);
                $validateBorrowDevicesError = $validateBorrowDevices->getErrors();

                $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($request);
                $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
                if ($validateBorrowDevicesDetailError || $validateBorrowDevicesError) {
                    $this->responseCode = 901;
                    //set the response   
                    $this->apiResponse['message'] = array_merge($validateBorrowDevicesError, $validateBorrowDevicesDetailError);
                    return;
                }
                $borrowDevices = $this->BorrowDevices->newEntity();
                $borrowDevices->borrower_id = $this->login['id'];
                $borrowDevices->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevices->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevices->delivery_date = (isset($request['delivery_date'])) ? $request['delivery_date'] : '';
                $borrowDevices->return_date = (isset($request['return_date'])) ? $request['return_date'] : '';
                $borrowDevices->created_user = $this->login['user_name'];
                $borrowDevices->is_deleted = 0;
                $this->BorrowDevices->save($borrowDevices);

                //get id of borrow devices new
                $borrowDevicesNew = $this->BorrowDevices
                        ->find('all')
                        ->max('id');
                $borrowDevicesDetail = $this->BorrowDevicesDetail->newEntity();
                $borrowDevicesDetail->borrow_device_id = $borrowDevicesNew['id'];
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
                $user = $this->Users
                        ->find('all')
                        ->where(['level' => 5])
                        ->first();
                $toEmail = $user['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'request_borrow';
                $this->sendMail($toEmail, $borrowInfo, $template);
                $conn->commit();
                // Set the HTTP status code. By default, it is set to 200
                $this->responseCode = 200;

                //set the response  
                $this->apiResponse['message'] = 'The Borrow device has been saved.';
            } catch (Exception $e) {
                $conn->rollback();
                $this->responseCode = 901;

                //set the response   
                $this->apiResponse['message'] = $e;
            }
        }
    }

    //function edit borrow devices
    public function edit()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'id could not be found.';
                return;
            }

            $borrowDevices = $this->BorrowDevices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $request['id']])
                    ->first();

            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                $this->responseCode = 903;
                //set the response   
                $this->apiResponse['message'] = 'Not found data. Please, try again.';
            } else {
                $conn = ConnectionManager::get('default');
                try {
                    $conn->begin();
                    $validateBorrowDevices = $this->BorrowDevices->newEntity($this->getRequest()->getData());
                    $validateBorrowDevicesError = $validateBorrowDevices->getErrors();

                    $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($this->getRequest()->getData());
                    $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
                    if ($validateBorrowDevicesDetailError || $validateBorrowDevicesError) {
                        $this->responseCode = 901;
                        //set the response   
                        $this->apiResponse['message'] = array_merge($validateBorrowDevicesError, $validateBorrowDevicesDetailError);
                        return;
                    }
                    $borrowDevicesUpdate = $this->BorrowDevices->patchEntity($borrowDevices, $this->getRequest()->getData());
                    $borrowDevicesUpdate->update_time = $this->dateNow;
                    $borrowDevicesUpdate->update_user = $this->login['user_name'];
                    $this->BorrowDevices->save($borrowDevicesUpdate);
                    $borrowDevicesDetailUpdate = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
                    $borrowDevicesDetailUpdate->update_time = $this->dateNow;
                    $borrowDevicesDetailUpdate->update_user = $this->login['user_name'];
                    $this->BorrowDevicesDetail->save($borrowDevicesDetailUpdate);
                    $conn->commit();
                    // Set the HTTP status code. By default, it is set to 200
                    $this->responseCode = 200;
                    //set the response  
                    $this->apiResponse['message'] = 'The borrow devices has been saved.';
                } catch (Exception $ex) {
                    $conn->rollback();
                    $this->responseCode = 901;
                    //set the response   
                    $this->apiResponse['message'] = $ex;
                }
            }
        }
    }

    //function delete devices
    public function delete()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'id could not be found.';
                return;
            }
            $borrowDevices = $this->BorrowDevices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $request['id']])
                    ->first();
        }

        if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
            $this->responseCode = 903;
            //set the response   
            $this->apiResponse['message'] = 'Not found data. Please, try again.';
        } else {
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->update_time = $this->dateNow;
                $borrowDevices->is_deleted = 1;
                $borrowDevices->update_user = $this->login['user_name'];
                $this->BorrowDevices->save($borrowDevices);
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->is_deleted = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                $conn->commit();
                // Set the HTTP status code. By default, it is set to 200
                $this->responseCode = 200;
                //set the response  
                $this->apiResponse['message'] = 'The borrow devices has been deleted.';
            } catch (Exception $ex) {
                $conn->rollback();
                $this->responseCode = 901;
                //set the response   
                $this->apiResponse['message'] = $ex;
            }
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function comfirm borrow devices
    public function approve()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'id could not be found.';
                return;
            }
            $borrowDevices = $this->BorrowDevices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $request['id']])
                    ->first();
        }

        if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
            $this->responseCode = 903;
            //set the response   
            $this->apiResponse['message'] = 'Not found data. Please, try again.';
        } else {
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->update_time = $this->dateNow;
                $borrowDevices->approved_id = $this->login['id'];
                $borrowDevices->handover_id = $this->login['id'];
                $borrowDevices->update_user = $this->login['user_name'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->status = 1;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                //send mail
                $user = $this->Users
                        ->find('all')
                        ->where(['id' => $borrowDevices['borrower_id']])
                        ->first();
                $toEmail = $user['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'approved';
                $this->sendMail($toEmail, $borrowInfo, $template);
                $conn->commit();
                // Set the HTTP status code. By default, it is set to 200
                $this->responseCode = 200;

                //set the response  
                $this->apiResponse['message'] = 'The borrow devices has been approve.';
            } catch (Exception $ex) {
                $conn->rollback();
                $this->responseCode = 901;

                //set the response   
                $this->apiResponse['message'] = $ex;
            }
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function comfirm borrow devices
    public function noApprove()
    {

        if ($this->getRequest()->is(['patch', 'post', 'put'])) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'id could not be found.';
                return;
            }
            $borrowDevices = $this->BorrowDevices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $request['id']])
                    ->first();
        }

        if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
            $this->responseCode = 903;

            //set the response   
            $this->apiResponse['message'] = 'Not found data. Please, try again.';
        } else {
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->update_time = $this->dateNow;
                $borrowDevices->update_user = $this->login['user_name'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetail = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->status = 2;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                //send mail
                $user = $this->Users
                        ->find('all')
                        ->where(['id' => $borrowDevices['borrower_id']])
                        ->first();
                $toEmail = $user['email'];
                $borrowInfo = $this->getBorrowDeviceInfo($borrowDevices->borrower_id, $borrowDevicesDetail);
                $template = 'approved';
                $this->sendMail($toEmail, $borrowInfo, $template);

                $conn->commit();
                // Set the HTTP status code. By default, it is set to 200
                $this->responseCode = 200;
                //set the response
                $this->apiResponse['message'] = 'The borrow devices has been no approve.';
            } catch (Exception $ex) {
                $conn->rollback();
                $this->responseCode = 901;

                //set the response   
                $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
            }
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function return devices
    public function returnDevice()
    {

        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'id could not be found.';
                return;
            }
            $borrowDevices = $this->BorrowDevices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $request['id']])
                    ->first();

            if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
                $this->responseCode = 903;

                //set the response
                $this->apiResponse['message'] = 'Not found data. Please, try again.';
            } else {
                $conn = ConnectionManager::get('default');
                try {
                    $conn->begin();
                    $borrowDevices->update_time = $this->dateNow;
                    $borrowDevices->update_user = $this->login['user_name'];
                    // $this->BorrowDevices->save($borrowDevices);

                    $borrowDevicesDetail->update_time = $this->dateNow;
                    $borrowDevicesDetail->status = 3;
                    $borrowDevicesDetail->update_user = $this->login['user_name'];
                    $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                    $conn->commit();

                    // Set the HTTP status code. By default, it is set to 200
                    $this->responseCode = 200;

                    //set the response
                    $this->apiResponse['message'] = 'The borrow devices has been return device.';
                } catch (Exception $ex) {
                    $conn->rollback();
                    $this->responseCode = 901;

                    //set the response
                    $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
                }
            }
        } else {
            // Set the HTTP status code. By default, it is set to 200
            $this->responseCode = 904;

            //set the response
            $this->apiResponse['message'] = 'Method is not correct.';
        }
    }

    // status: 0- borrow; 1- confirm borrow; 2- no confirm borrow; 3- return device; 4- confirm return device
    //function confirm return devices
    public function confirmReturnDevice()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'id could not be found.';
                return;
            }
            $borrowDevices = $this->BorrowDevices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $request['id']])
                    ->first();
        }

        if (empty($borrowDevices) || empty($borrowDevicesDetail)) {
            $this->responseCode = 903;

            //set the response   
            $this->apiResponse['message'] = 'Not found data. Please, try again.';
        } else {
            $conn = ConnectionManager::get('default');
            try {
                $conn->begin();
                $borrowDevices->update_time = $this->dateNow;
                $borrowDevices->update_user = $this->login['user_name'];
                $this->BorrowDevices->save($borrowDevices);

                $borrowDevicesDetail->update_time = $this->dateNow;
                $borrowDevicesDetail->status = 4;
                $borrowDevicesDetail->update_user = $this->login['user_name'];
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                $conn->commit();

                // Set the HTTP status code. By default, it is set to 200
                $this->responseCode = 200;

                //set the response  
                $this->apiResponse['message'] = 'The borrow devices has been confirm return device.';
            } catch (Exception $ex) {
                $conn->rollback();
                $this->responseCode = 901;

                //set the response   
                $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
            }
        }
    }

    private function getBorrowDeviceInfo($borrower_id, $borrowDevicesDetail)
    {
        $user = $this->Users
                ->find('all')
                ->where(['id' => $borrower_id])
                ->first();
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

}
