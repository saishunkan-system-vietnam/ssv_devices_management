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
class BorrowController extends ApiController {

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    private $BorrowDevices;
    private $BorrowDevicesDetail;
    private $dateNow;
    private $login;

    public function initialize() {
        parent::initialize();
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $this->dateNow = date('Y-m-d H-i:s');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
    }

    //get list BorrowDevices
    public function index() {

        var_dump($this->login);
        die('a');
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
    public function view($id = null) {

        if (empty($id)) {
            $this->responseCode = 903;
            // Set the response
            $this->apiResponse['message'] = 'Not found data.';
            return;
        }

        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['id' => $id])
                ->toArray();

        if (!empty($borrowDevices)) {

            // Set the HTTP status code. By default, it is set to 200
            $this->responseCode = 200;
            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $id, 'is_deleted' => 0])
                    ->toArray();

            //set the response   
            $this->apiResponse['lstBorrowDevices'] = $borrowDevices;
            $this->apiResponse['lstBorrowDevicesDetail'] = $borrowDevicesDetail;
        } else {
            $this->responseCode = 901;

            //set the response   
            $this->apiResponse['message'] = 'There is no data, please check again.';
        }
    }

    //function add borrow devices
    // status: 0- mượn; 1- đang mượn; 2-trả; 3-xác nhận đã trả
    public function add() {
        $conn = ConnectionManager::get('default');
        try {
            $conn->begin();

            if ($this->getRequest()->is('post')) {
                $request = $this->getRequest()->getData();

                $borrowDevices = $this->BorrowDevices->newEntity();

                $validateBorrowDevices = $this->BorrowDevices->newEntity($this->getRequest()->getData());
                $validateBorrowDevicesError = $validateBorrowDevices->errors();

                $validateBorrowDevicesDetail = $this->BorrowDevicesDetail->newEntity($this->getRequest()->getData());
                $validateBorrowDevicesDetailError = $validateBorrowDevicesDetail->getErrors();
                if ($validateBorrowDevicesDetailError or $validateBorrowDevicesError) {
                    $this->responseCode = 901;

                    //set the response   
                    $this->apiResponse['message']['BorrowDevices'] = $validateBorrowDevicesError;
                    $this->apiResponse['message']['BorrowDevicesDetail'] = $validateBorrowDevicesDetailError;
                    return;
                }

                $borrowDevices->borrower_id = (isset($request['borrower_id'])) ? $request['borrower_id'] : '';
                $borrowDevices->approved_id = (isset($request['approved_id'])) ? $request['approved_id'] : '';
                $borrowDevices->handover_id = (isset($request['handover_id'])) ? $request['handover_id'] : '';
                $borrowDevices->borrow_reason = (isset($request['borrow_reason'])) ? $request['borrow_reason'] : '';
                $borrowDevices->return_reason = (isset($request['return_reason'])) ? $request['return_reason'] : '';
                //$borrowDevices->status = (isset($request['status'])) ? $request['status'] : '';
                $borrowDevices->status = 0;
                $borrowDevices->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevices->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevices->delivery_date = (isset($request['delivery_date'])) ? $request['delivery_date'] : '';
                $borrowDevices->return_date = (isset($request['return_date'])) ? $request['return_date'] : '';
                $borrowDevices->created_user = 1;
                $borrowDevices->update_user = 1;
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
                $borrowDevicesDetail->return_reason = (isset($request['return_reason'])) ? $request['return_reason'] : '';
                //$borrowDevicesDetail->status = (isset($request['status'])) ? $request['status'] : '';
                $borrowDevicesDetail->status = 0;
                $borrowDevicesDetail->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevicesDetail->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevicesDetail->delivery_date = (isset($request['delivery_date'])) ? $request['delivery_date'] : '';
                $borrowDevicesDetail->return_date = (isset($request['return_date'])) ? $request['return_date'] : '';
                $borrowDevicesDetail->created_user = 1;
                $borrowDevicesDetail->update_user = 1;
                $borrowDevicesDetail->is_deleted = 0;
                $this->BorrowDevicesDetail->save($borrowDevicesDetail);

                $conn->commit();

                // Set the HTTP status code. By default, it is set to 200
                $this->responseCode = 200;

                //set the response  
                $this->apiResponse['message'] = 'The Borrow device has been saved.';
            }
        } catch (Exception $ex) {
            $conn->rollback();
            $this->responseCode = 901;

            //set the response   
            $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
        }
    }

    //function edit borrow devices
    public function edit($id = null) {
        $email = new Email();
        $email->setFrom('hoangnguyen03091998@gmail.com')
                ->addTo(['hoangnguyenit98@gmail.com' => 'My Website'])
                ->setSubject('Contact')
                ->setSender('hoangnguyen03091998@gmail.com', 'Notification export report!')
                ->setEmailFormat('html')
                ->setTemplate('report')
                ->setViewVars(['key' => 'value'])
                ->send();
        die('a');
        
         if (empty($id)) {
            $this->responseCode = 903;
            // Set the response
            $this->apiResponse['message'] = 'Not found data.';
            return;
        }
        
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['id' => $id])
                ->first();

        $borrowDevicesDetail = $this->BorrowDevicesDetail
                ->find('all')
                ->where(['borrow_device_id' => $id])
                ->first();

        if (!empty($borrowDevices)) {
            if ($this->getRequest()->is(['patch', 'post', 'put'])) {
                $conn = ConnectionManager::get('default');
                try {
                    $conn->begin();
                    $borrowDevices = $this->BorrowDevices->patchEntity($borrowDevices, $this->getRequest()->getData());
                    $borrowDevices->update_time = $this->dateNow;
                    $this->BorrowDevices->save($borrowDevices);
                    $borrowDevicesDetail = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
                    $borrowDevicesDetail->update_time = $this->dateNow;
                    $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                    $conn->commit();

                    // Set the HTTP status code. By default, it is set to 200
                    $this->responseCode = 200;

                    //set the response  
                    $this->apiResponse['message'] = 'The borrow devices has been saved.';
                } catch (Exception $ex) {
                    $conn->rollback();
                    $this->responseCode = 901;

                    //set the response   
                    $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
                }
            }
        } else {
            $this->responseCode = 901;

            //set the response   
            $this->apiResponse['message'] = 'borrow devices could not be found. Please, try again.';
        }
    }

    //function delete devices
    public function delete($id = null) {
        
         if (empty($id)) {
            $this->responseCode = 903;
            // Set the response
            $this->apiResponse['message'] = 'Not found data.';
            return;
        }
        
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['id' => $id])
                ->first();

        $borrowDevicesDetail = $this->BorrowDevicesDetail
                ->find('all')
                ->where(['borrow_device_id' => $id, 'is_deleted' => 0])
                ->first();

        if (!empty($borrowDevices)) {
            if ($this->getRequest()->is(['patch', 'post', 'put'])) {
                $conn = ConnectionManager::get('default');
                try {
                    $conn->begin();
                    $borrowDevices = $this->BorrowDevices->patchEntity($borrowDevices, $this->getRequest()->getData());
                    $borrowDevices->update_time = $this->dateNow;
                    $borrowDevices->is_deleted = 1;
                    $this->BorrowDevices->save($borrowDevices);
                    $borrowDevicesDetail = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
                    $borrowDevicesDetail->update_time = $this->dateNow;
                    $borrowDevicesDetail->is_deleted = 1;
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
                    $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
                }
            }
        } else {
            $this->responseCode = 901;

            //set the response   
            $this->apiResponse['message'] = 'borrow devices could not be found. Please, try again.';
        }
    }

    //function return devices
    public function returnDevices($id){
        
         if (empty($id)) {
            $this->responseCode = 903;
            // Set the response
            $this->apiResponse['message'] = 'Not found data.';
            return;
        }
        
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['id' => $id])
                ->first();

        $borrowDevicesDetail = $this->BorrowDevicesDetail
                ->find('all')
                ->where(['borrow_device_id' => $id, 'is_deleted' => 0])
                ->first();

        if (!empty($borrowDevices)) {
            if ($this->getRequest()->is(['patch', 'post', 'put'])) {
                $conn = ConnectionManager::get('default');
                try {
                    $conn->begin();
                    $borrowDevices = $this->BorrowDevices->patchEntity($borrowDevices, $this->getRequest()->getData());
                    $borrowDevices->update_time = $this->dateNow;
                    $borrowDevices->status = 2;
                    $this->BorrowDevices->save($borrowDevices);
                    $borrowDevicesDetail = $this->BorrowDevicesDetail->patchEntity($borrowDevicesDetail, $this->getRequest()->getData());
                    $borrowDevicesDetail->update_time = $this->dateNow;
                    $borrowDevicesDetail->status = 2;
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
                    $this->apiResponse['message'] = 'The Borrow device could not be saved. Please, try again.';
                }
            }
        } else {
            $this->responseCode = 901;

            //set the response   
            $this->apiResponse['message'] = 'borrow devices could not be found. Please, try again.';
        }
    }
}
