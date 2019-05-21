<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;

/**
 * Devices Controller
 *
 * @property \App\Model\Table\DevicesTable $Devices
 *
 * @method \App\Model\Entity\Device[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class DevicesController extends ApiController {

    private $dateNow;
    private $Brands;
    private $Devices;
    private $login;

    public function initialize() {
        parent::initialize();
        $this->Brands = TableRegistry::getTableLocator()->get('Brands');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');

        $this->login = $this->getRequest()->getSession()->read('Auth.User');

        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $this->dateNow = date('Y-m-d H-i:s');
    }

    //function get list brands
    public function getLstBrand() {

        $this->responseCode = 200;
        $brands = $this->Brands
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();
        $this->apiResponse['lstBrands'] = $brands;
    }

    //function view brand
    public function viewBrand($id = null) {

        $brands = $this->Brands
                ->find('all')
                ->where(['id' => $id])
                ->toArray();

        if (!empty($brands)) {
            $this->responseCode = 200;
            $this->apiResponse['brand'] = $brands;
        } else {
            $this->responseCode = 903;
            $this->apiResponse['message'] = 'There are no data, please check again';
        }
    }

    //function add brand
    public function addBrand() {
        
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $brand = $this->Brands->newEntity();
            
            $validate = $this->Brands->newEntity($request);
            $validateError = $validate->getErrors();
            if (empty($validateError)) {
                $brand = $this->Brands->patchEntity($brand, $request);
                $brand->created_user = $this->login['user_name'];
                if ($this->Brands->save($brand)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'The brand has been saved.';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'The brand could not be saved. Please, try again.';
                }
            } else {
                $this->responseCode = 901;
                $this->apiResponse['message'] = $validateError;
            }
        }
    }

    //function edit brand
    public function editBrand() {

        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'id could not be found';
                return;
            }
            $brand = $this->Brands
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (!empty($brand)) {
                $brand = $this->Brands->patchEntity($brand, $request);
                $brand->update_user = $this->login['user_name'];
                $brand->update_time = $this->dateNow;
                if ($this->Brands->save($brand)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'The brand has been saved change.';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'The brand could not be saved change. Please, try again.';
                }
            } else {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'There are no data, please check again';
            }
        }
    }

    //function delete brand
    public function deleteBrand() {

        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'id could not be found';
                return;
            }
            $brand = $this->Brands
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (!empty($brand)) {
                $brand = $this->Brands->patchEntity($brand, $request);
                $brand->is_deleted = 1;
                $brand->update_time = $this->dateNow;
                if ($this->Brands->save($brand)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'The brand has been deleted.';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'The brand could not be deleted. Please, try again.';
                }
            } else {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'There are no data, please check again';
            }
        }
    }

    //function get list devices
    public function getLstDevices() {
        $this->responseCode = 200;
        $devices = $this->Devices
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();
        $this->apiResponse['lstDevices'] = $devices;
    }

    //function view devices
    public function view($id = null) {
        $devices = $this->Devices
                ->find('all')
                ->where(['id' => $id])
                ->toArray();

        if (!empty($devices)) {
            $this->responseCode = 200;
            $this->apiResponse['devices'] = $devices;
        } else {
            $this->responseCode = 903;
            $this->apiResponse['message'] = 'There are no data, please check again';
        }
    }

    //function add devices
    public function add() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $device = $this->Devices->newEntity();
            $validate = $this->Devices->newEntity($request, ['validate' => 'serialnumber']);
            $validateError = $validate->getErrors();
            if (empty($validateError)) {
                $device = $this->Devices->patchEntity($device, $request);
                $device->created_user = $this->login['user_name'];
                if ($this->Devices->save($device)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'The device has been saved.';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'The device could not be saved. Please, try again.';
                }
            } else {
                $this->responseCode = 901;
                $this->apiResponse['validate'] = $validateError;
            }
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Device id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit() {

        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) or empty($request['id'])) {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'id could not be found';
                return;
            }

            $device = $this->Devices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();

            $validate = $this->Devices->newEntity($request);
            $validateError = $validate->getErrors();
            if (empty($validateError)) {

                if ($request['serial_number'] !== $device['serial_number']) {
                    $validateSerialnumber = $this->Devices->newEntity($request, ['validate' => 'serialnumber']);
                    $validateSerialnumberError = $validateSerialnumber->getErrors();
                    if (!empty($validateSerialnumberError)) {
                        $this->responseCode = 901;
                        $this->apiResponse['message'] = $validateSerialnumberError;
                        return;
                    }
                }
                $device = $this->Devices->patchEntity($device, $request);
                $device->update_user = $this->login['user_name'];
                if ($this->Devices->save($device)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'The device has been saved.';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'The device could not be saved. Please, try again.';
                }
            } else {
                $this->responseCode = 901;
                $this->apiResponse['message'] = $validateError;
            }
        }
    }

    /**
     * Delete method
     *
     * @param string|null $id Device id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete() {
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'id could not be found';
                return;
            }
            $device = $this->Devices
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (!empty($device)) {
                $device->update_user = $this->login['user_name'];
                $device->update_time = $this->dateNow;
                $device->is_deleted = 1;
                if ($this->Devices->save($device)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'The device has been deleted.';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'The device could not be deleted. Please, try again.';
                }
            } else {
                $this->responseCode = 903;
                $this->apiResponse['message'] = 'There are no data, please check again';
            }
        }
    }

}
