<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Core\Configure;

class MaintenancesController extends ApiController {

    private $login;
    private $conn;
    private $Maintenances;
    private $message;
    private $messageMaintenance;

    public function initialize() {
        parent::initialize();
//        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->login = ['id' => 61, 'user_name' => 'Test', 'full_name' => "Nguyễn Thị test", 'position' => 'Programmer', 'email' => 'hoangnguyenit98@gmail.com'];
        $this->Maintenances = TableRegistry::getTableLocator()->get('Maintenances');
        $this->conn = ConnectionManager::get('default');
        $this->loadComponent('Maintenance');
        $this->loadComponent('User');
        $this->loadComponent('Mail');
        $this->loadComponent('Device');
        $this->loadComponent('Borrow');
        $this->message = Configure::read('Message');
        $this->messageMaintenance = Configure::read('Maintenance');
    }

    //function get list maintenances
    public function index() {
        $maintenances = $this->Maintenance->ListMaintenancesWhere(['Maintenances.is_deleted' => 0]);
        if (!empty($maintenances)) {
            foreach ($maintenances as $row) {
                $row['note'] = html_entity_decode($row['note']);
                $row['maintenances_address'] = html_entity_decode($row['maintenances_address']);
            }
        }
        $args = ['lstMaintenances' => $maintenances];
        //set return response ( response code, api response )
        $this->returnResponse(200, $args);
    }

    //function view maintenances
    public function view($id = null) {
        $maintenance = $this->Maintenance->view(['Maintenances.id' => $id]);
        if (!empty($maintenance)) {
            $maintenance['note'] = html_entity_decode($maintenance['note']);
            $maintenance['maintenances_address'] = html_entity_decode($maintenance['maintenances_address']);
            $args = ['maintenance' => $maintenance];
            //set return response ( response code, api response )
            $this->returnResponse(200, $args);
        } else {
            $this->returnResponse(903, ['message' => $this->message['no_data']]);
        }
    }

    //function add new  maintenances
    public function add() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $validate = $this->Maintenances->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response ( response code, api response )
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            try {
                $this->conn->begin();
                $maintenanceNewEntity = $this->Maintenances->newEntity();
                $maintenance = $this->Maintenances->patchEntity($maintenanceNewEntity, $request);
                $maintenance->create_user = $this->login['user_name'];
                $maintenance->notificationer_broken = $this->login['id'];
                if (!empty($maintenance->note)) {
                    $maintenance->note = htmlentities($maintenance->note);
                }
                if (!empty($maintenance->maintenances_address)) {
                    $maintenance->maintenances_address = htmlentities($maintenance->maintenances_address);
                }

                $result = $this->Maintenances->save($maintenance);
                if ($result && $result->status != 5) {
                    $devices = $this->setStatusDevice(['id' => $result->devices_id], 2);
                    if ($devices === FALSE) {
                        $this->conn->rollback();
                        $this->returnResponse(901, ['message' => sprintf($this->message["add_error"], "thiết bị bảo trì")]);
                        return;
                    }
                }
                $this->conn->commit();
                $this->returnResponse(200, ['message' => sprintf($this->message["add_success"], "thiết bị bảo trì")]);
            } catch (Exception $ex) {
                $this->conn->rollback();
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function edit maintenance
    public function edit() {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            $validate = $this->Maintenances->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response ( response code, api response )
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            try {
                $this->conn->begin();
                $maintenanceUpdate = $this->Maintenances->patchEntity($maintenance, $request);
                $maintenanceUpdate->update_time = $this->dateNow;
                $maintenanceUpdate->update_user = $this->login['user_name'];
                if (isset($request['note']) && !empty($request['note'])) {
                    $maintenanceUpdate->note = htmlentities($request['note']);
                }
                if (isset($request['maintenances_address']) && !empty($request['maintenances_address'])) {
                    $maintenanceUpdate->maintenances_address = htmlentities($request['maintenances_address']);
                }
                $result = $this->Maintenances->save($maintenanceUpdate);
                if ($result && $result->status == 5 or $result->status==3) {
                    $devices = $this->setStatusDevice(['id' => $result->devices_id], 0);
                    if ($devices === FALSE) {
                        $this->conn->rollback();
                        $this->returnResponse(901, ['message' => sprintf($this->message["edit_error"], "thiết bị bảo trì")]);
                        return;
                    }
                }
                $this->conn->commit();
                $this->returnResponse(200, ['message' => sprintf($this->message["edit_success"], "thiết bị bảo trì")]);
            } catch (Exception $ex) {
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->conn->rollback();
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //status: 0-báo hỏng, 1- đợi bảo trì, 2-đang bảo trì, 3-đã bảo trì, 4-đã bảo trì nhưng vẫn hỏng, 5 bình thường
    //function delete maintenance
    public function delete() {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            $maintenance->update_time = $this->dateNow;
            $maintenance->update_user = $this->login['user_name'];
            $maintenance->is_deleted = 1;
            if ($this->Maintenances->save($maintenance)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["delete_success"], "thiết bị bảo trì")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["delete_error"], "thiết bị bảo trì")]);
            }
        } else {
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function notification broken
    public function notificationBroken() {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();
            $validate = $this->Maintenances->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response ( response code, api response )
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $exitDevice = $this->Maintenances->find('all')->where(['devices_id' => $request['devices_id'], 'status' => 0])->toArray();
            if (count($exitDevice) > 0) {
                $this->returnResponse(901, ['message' => $this->messageMaintenance['notificationBrokened_error']]);
                return;
            }
            try {
                $this->conn->begin();
                $maintenanceNewEntity = $this->Maintenances->newEntity();
                $maintenance = $this->Maintenances->patchEntity($maintenanceNewEntity, $request);
                $maintenance->create_user = $this->login['user_name'];
                $maintenance->notificationer_broken = $this->login['id'];
                if (isset($request['note']) && !empty($request['note'])) {
                    $maintenance->note = htmlentities($request['note']);
                }
                $this->Maintenances->save($maintenance);

                //send mail
                $admin = $this->User->first(['level' => 5]);
                $setTo = $admin['email'];
                $device = $this->Device->first(['id' => $maintenance['devices_id']]);
                $setSubject = 'Notification device broken';
                $setViewVars = array(
                    'user' => $this->login,
                    'device' => $device
                );
                $setTemplate = 'notificationBroken';
                $this->Mail->sendMail($setTo, $setSubject, $setViewVars, $setTemplate);
                $this->conn->commit();
                $this->returnResponse(200, $this->messageMaintenance['notificationBroken_success']);
            } catch (Exception $ex) {
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //status: 0-báo hỏng, 1- đợi bảo trì, 2-đang bảo trì, 3-đã bảo trì, 4-đã bảo trì nhưng vẫn hỏng, 5-bình thường
    //function comfirm notification broken
    public function comfirmNotificationBroken() {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            if ($maintenance['status'] > 0) {
                $this->returnResponse(905, ['message' => 'This notification broken comfirmed.']);
                return;
            }
            try {
                $this->conn->begin();
                $maintenance->update_time = $this->dateNow;
                $maintenance->update_user = $this->login['user_name'];
                $maintenance->status = 1;
                $result = $this->Maintenances->save($maintenance);
                if ($result) {
                    $devices = $this->setStatusDevice(['id' => $result->devices_id], 2);
                    $update = true;
                    if ($devices === FALSE) {
                        $update = FALSE;
                    }
                    $borrow = $this->Borrow->first([
                        'BorrowDevices.borrower_id' => $result->notificationer_broken,
                        'BorrowDevicesDetail.status' => 1,
                        'BorrowDevicesDetail.device_id' => $result->devices_id
                    ]);
                    if (!empty($borrow)) {
                        $borrowDetail = $this->Borrow->firstBorrowDevicesDetail(['id' => $borrow['BorrowDevicesDetail']['id']]);
                        $borrowDetail->status = 4;
                        $borrowDetail->update_user = $this->login['user_name'];
                        $borrowDetail->update_time = $this->dateNow;
                        $borrowDetail->return_date = $this->dateNow;
                        $borrowDetail->return_reason = $result->note;
                        $result = $this->Borrow->saveBorrowDevicesDetail($borrowDetail);
                        if ($result == FALSE) {
                            $update = False;
                        }
                    }
                    if ($update == FALSE) {
                        $this->conn->rollback();
                        $this->returnResponse(901, ['message' => $this->messageMaintenance['comfirmNotificationBroken_error']]);
                        return;
                    }
                }
                //send mail
                $user = $this->User->first(['id' => $maintenance['notificationer_broken']]);
                $setTo = $user['email'];
                $device = $this->Device->first(['id' => $maintenance['devices_id']]);
                $setSubject = 'Notification device broken';
                $setViewVars = array(
                    'user' => $user,
                    'device' => $device
                );
                $setTemplate = 'confirmNotificationBroken';
                $this->Mail->sendMail($setTo, $setSubject, $setViewVars, $setTemplate);
                $this->conn->commit();
                $this->returnResponse(200, ['message' => $this->messageMaintenance['comfirmNotificationBroken_success']]);
            } catch (Exception $ex) {
                $this->conn->rollback();
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function notification broken
    public function noComfirmNotificationBroken() {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }

            $maintenance->update_user = $this->login['user_name'];
            $maintenance->update_time = $this->dateNow;
            $maintenance->status = 5;
            if ($this->Maintenances->save($maintenance)) {
                $this->returnResponse(200, ['message' => $this->messageMaintenance['noComfirmNotificationBroken_success']]);
            } else {
                $this->returnResponse(901, ['message' => $this->messageMaintenance['noComfirmNotificationBroken_error']]);
            }
        } else {
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    public function filter() {
        if ($this->getRequest()->is('post')) {
            $request = $this->request->getData();
            $condition = ['Maintenances.is_deleted' => 0];
            if (isset($request['notification_broken']) && !empty($request['notification_broken'])) {
                $condition = array_merge($condition, ['Maintenances.status' => $request['notification_broken'] - 1]);
            }
            if (isset($request['waiting_for_repair']) && !empty($request['waiting_for_repair'])) {
                $condition = array_merge($condition, ['Maintenances.status' => $request['waiting_for_repair'] - 1]);
            }
            if (isset($request['repairing']) && !empty($request['repairing'])) {
                $condition = array_merge($condition, ['Maintenances.status' => $request['repairing'] - 1]);
            }
            if (isset($request['repaired']) && !empty($request['repaired'])) {
                $condition = array_merge($condition, ['Maintenances.status' => $request['repaired'] - 1]);
            }
            if (isset($request['repair_fail']) && !empty($request['repair_fail'])) {
                $condition = array_merge($condition, ['Maintenances.status' => $request['repair_fail'] - 1]);
            }
            if (isset($request['no_confirm_notification']) && !empty($request['no_confirm_notification'])) {
                $condition = array_merge($condition, ['Maintenances.status' => $request['no_confirm_notification'] - 1]);
            }

            $maintenances = $this->Maintenance->ListMaintenancesWhere($condition);
            if (!empty($maintenances)) {
                foreach ($maintenances as $row) {
                    $row['note'] = html_entity_decode($row['note']);
                    $row['maintenances_address'] = html_entity_decode($row['maintenances_address']);
                }
            }
            $args = [
                'lstMaintenances' => $maintenances,
                'lstCount' => $this->getListCountStatus()
            ];
            //set return response ( response code, api response )
            $this->returnResponse(200, $args);
        }
    }

    private function getListCountStatus() {
        $maintenances = $this->Maintenance->ListMaintenancesWhere(['Maintenances.is_deleted' => 0]);
        $arrCount['notification_broken'] = 0;
        $arrCount['waiting_for_repair'] = 0;
        $arrCount['repairing'] = 0;
        $arrCount['repaired'] = 0;
        $arrCount['repair_fail'] = 0;
        $arrCount['no_confirm_notification'] = 0;
        foreach ($maintenances as $row) {
            if ($row['status'] == 0) {
                $arrCount['notification_broken'] ++;
            } elseif ($row['status'] == 1) {
                $arrCount['waiting_for_repair'] ++;
            } elseif ($row['status'] == 2) {
                $arrCount['repairing'] ++;
            } elseif ($row['status'] == 3) {
                $arrCount['repaired'] ++;
            } elseif ($row['status'] == 4) {
                $arrCount['repair_fail'] ++;
            } elseif ($row['status'] == 5) {
                $arrCount['no_confirm_notification'] ++;
            }
        }
        return $arrCount;
    }

    private function setStatusDevice(array $condition, $status) {
        $device = $this->Device->first($condition);
        if (!empty($device)) {
            $device->status = $status;
            $device->update_user = $this->login['user_name'];
            $device->update_time = $this->dateNow;
            return $this->Device->save($device);
        } else {
            return FALSE;
        }
    }

}
