<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;

class MaintenancesController extends ApiController
{

    private $login;
    private $conn;
    private $Maintenances;

    public function initialize()
    {
        parent::initialize();
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->Maintenances = TableRegistry::getTableLocator()->get('Maintenances');
        $this->conn = ConnectionManager::get('default');
        $this->loadComponent('Maintenance');
        $this->loadComponent('User');
        $this->loadComponent('Mail');
        $this->loadComponent('Device');
    }

    //function get list maintenances
    public function index()
    {
        $maintenances = $this->Maintenance->getList(['is_deleted' => 0]);
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
    public function view($id = null)
    {
        $maintenance = $this->Maintenance->first(['id' => $id]);
        if (!empty($maintenance)) {
            $maintenance['note'] = html_entity_decode($maintenance['note']);
            $maintenance['maintenances_address'] = html_entity_decode($maintenance['maintenances_address']);
            $args = ['maintenance' => $maintenance];
            //set return response ( response code, api response )
            $this->returnResponse(200, $args);
        } else {
            $this->returnResponse(903, ['message' => 'There is no data. Please, try again.']);
        }
    }

    //function add new  maintenances
    public function add()
    {
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
                $maintenance->status = 1;
                if (!empty($maintenance->note)) {
                    $maintenance->note = htmlentities($maintenance->note);
                }
                if (!empty($maintenance->maintenances_address)) {
                    $maintenance->maintenances_address = htmlentities($maintenance->maintenances_address);
                }
                $result = $this->Maintenances->save($maintenance);
                if ($result) {
                    $device = $this->Device->first(['id' => $result['devices_id']]);
                    $device->status = 2;
                    $this->Device->save($device);
                }
                $this->conn->commit();
                $this->returnResponse(200, ['message' => 'The maintenance has been saved.']);
            } catch (Exception $ex) {
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //function edit maintenance
    public function edit()
    {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => 'ID could not be found. Please, try again.']);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => 'There is no data. Please, try again.']);
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
                if ($result && $result['status'] == 5) {
                    $this->setStatusDevice(['id' => $result['device_id']], 0);
                }
                $this->conn->commit();
                $this->returnResponse(200, ['message' => 'The maintenance has been saved.']);
            } catch (Exception $ex) {
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //status: 0-báo hỏng, 1- đợi bảo trì, 2-đang bảo trì, 3-đã bảo trì, 4-đã bảo trì nhưng vẫn hỏng, 5 bình thường
    //function delete maintenance
    public function delete()
    {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => 'ID could not be found. Please, try again.']);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => 'There is no data. Please, try again.']);
                return;
            }
            $maintenance->update_time = $this->dateNow;
            $maintenance->update_user = $this->login['user_name'];
            $maintenance->is_deleted = 1;
            if ($this->Maintenances->save($maintenance)) {
                $this->returnResponse(200, ['message' => 'The maintenance has been deleted.']);
            } else {
                $this->returnResponse(901, ['message' => 'The maintenance could not be deleted. Please, try again.']);
            }
        } else {
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //function notification broken
    public function notificationBroken()
    {
        if ($this->request->is('post')) {
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
                if (isset($request['note']) && !empty($request['note'])) {
                    $maintenance->note = htmlentities($request['note']);
                }
                $result = $this->Maintenances->save($maintenance);
                if ($result) {
                   $this->setStatusDevice(['id' => $result['device_id']], 2);
                }
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
                $this->returnResponse(200, ['message' => 'The maintenance has been notification broken.']);
            } catch (Exception $ex) {
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //status: 0-báo hỏng, 1- đợi bảo trì, 2-đang bảo trì, 3-đã bảo trì, 4-đã bảo trì nhưng vẫn hỏng, 5-bình thường
    //function comfirm notification broken
    public function comfirmNotificationBroken()
    {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response ( response code, api response )
                $this->returnResponse(903, ['message' => 'ID could not be found. Please, try again.']);
                return;
            }
            $maintenance = $this->Maintenance->first(['id' => $request['id']]);
            if (empty($maintenance)) {
                $this->returnResponse(903, ['message' => 'There is no data. Please, try again.']);
                return;
            }
            if ($maintenance['status'] > 0) {
                $this->returnResponse(905, ['message' => 'This notification broken comfirmed.']);
                return;
            }
            $validate = $this->Maintenances->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response ( response code, api response )
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $maintenance->update_time = $this->dateNow;
            $maintenance->update_user = $this->login['user_name'];
            $maintenance->status = 1;
            if ($this->Maintenances->save($maintenance)) {

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

                $this->returnResponse(200, ['message' => 'The notification broken has been comfirmed.']);
            } else {
                $this->returnResponse(901, ['message' => 'The notification broken could not be comfirmed. Please, try again.']);
            }
        } else {
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }
    
     //function notification broken
    public function noComfirmNotificationBroken()
    {
        if ($this->request->is('post')) {
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
                if (isset($request['note']) && !empty($request['note'])) {
                    $maintenance->note = htmlentities($request['note']);
                }
                $result = $this->Maintenances->save($maintenance);
                if ($result) {
                   $this->setStatusDevice(['id' => $result['device_id']], 5);
                }
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
                $this->returnResponse(200, ['message' => 'The maintenance has been notification broken.']);
            } catch (Exception $ex) {
                $this->returnResponse(901, ['message' => $ex]);
            }
        } else {
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    private function setStatusDevice(array $condition, $status)
    {
        $device = $this->Device->first($condition);
        $device->status = $status;
        return $this->Device->save($device);
    }

}
