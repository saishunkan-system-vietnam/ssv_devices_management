<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;
use Cake\Routing\Router;
use Cake\Core\Configure;

class DevicesController extends ApiController {

    private $Brands;
    private $Devices;
    private $Categories;
    private $login;
    private $nameController;
    private $baseUrl;
    private $message;

    public function initialize() {
        parent::initialize();
        $this->Brands = TableRegistry::getTableLocator()->get('Brands');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');
        $this->Categories = TableRegistry::getTableLocator()->get('Categories');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->nameController = $this->getRequest()->controller;
        $this->baseUrl = Router::url('/', true);
        $this->message = Configure::read('Message');
    }

    //function get list brands
    public function getLstBrand() {
        $brands = $this->LstBrandsWhere(['is_deleted' => 0]);
        $agrs = array(
            'lstBrands' => $brands
        );
        //set return response (response code, api response)
        $this->returnResponse(200, $agrs);
    }

    //function view brand
    public function viewBrand($id = null) {
        $brand = $this->getBrand(['id' => $id]);
        if (!empty($brand)) {
            $agrs = array(
                'brand' => $brand
            );
            //set return response (response code, api response)
            $this->returnResponse(200, $agrs);
        } else {
            //set return response (response code, api response)
            $this->returnResponse(903, ['message' => $this->message['no_data']]);
        }
    }

    //function add brand
    public function addBrand() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $brandNewEntity = $this->Brands->newEntity();

            $validate = $this->Brands->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $brand = $this->Brands->patchEntity($brandNewEntity, $request);
            $brand->created_user = $this->login['user_name'];
            if ($this->Brands->save($brand)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["add_success"], "thương hiệu")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["add_error"], "thương hiệu")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function edit brand
    public function editBrand() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $brand = $this->getBrand(['id' => $request['id']]);
            if (empty($brand)) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }

            $validate = $this->Brands->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }

            $brandUpdate = $this->Brands->patchEntity($brand, $request);
            $brandUpdate->update_user = $this->login['user_name'];
            $brandUpdate->update_time = $this->dateNow;
            if ($this->Brands->save($brandUpdate)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["edit_success"], "thương hiệu")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["edit_error"], "thương hiệu")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function delete brand
    public function deleteBrand() {

        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $brand = $this->getBrand(['id' => $request['id']]);
            if (empty($brand)) {
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            $brand->is_deleted = 1;
            $brand->update_user = $this->login['user_name'];
            $brand->update_time = $this->dateNow;
            if ($this->Brands->save($brand)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["delete_success"], "thương hiệu")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["delete_error"], "thương hiệu")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function get list devices
    public function getLstDevices() {

        $devices = $this->lstDevicesWhere(['Devices.is_deleted' => 0]);

        if (count($devices) > 0) {
            foreach ($devices as $row) {
                $row['specifications'] = html_entity_decode($row['specifications']);
            }
        }
        $args = array(
            'lstDevices' => $devices,
            'baseUrl' => $this->baseUrl . 'uploads/files/' . strtolower($this->nameController)
        );
        //set return response (response code, api response)
        $this->returnResponse(200, $args);
    }

    //function view devices
    public function view($id = null) {
        $devices = $this->Devices
                ->find('all')
                ->select($this->Devices)
                ->select($this->Categories)
                ->select($this->Brands)
                ->join([
                    'Categories' => [
                        'table' => 'categories',
                        'type' => 'LEFT',
                        'conditions' => 'Categories.id = Devices.Categories_id'
                    ]
                ])
                ->join([
                    'Brands' => [
                        'table' => 'brands',
                        'type' => 'LEFT',
                        'conditions' => 'Brands.id = Devices.brand_id'
                    ]
                ])
                ->where(['Devices.id' => $id])
                ->first();
        if (!empty($devices)) {
            $devices['specifications'] = html_entity_decode($devices['specifications']);
            $args = array(
                'device' => $devices,
                'baseUrl' => $this->baseUrl . 'uploads/files/' . strtolower($this->nameController)
            );
            //set return response (response code, api response)
            $this->returnResponse(200, $args);
        } else {
            //set return response (response code, api response)
            $this->returnResponse(903, ['message' => $this->message['no_data']]);
        }
    }

    //function add devices
    public function add() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $validate = $this->Devices->newEntity($request, ['validate' => 'serialnumber']);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $deviceNewEntity = $this->Devices->newEntity();
            if (!isset($_FILES) || empty($_FILES)) {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["no_img"])]);
                return;
            }

            $fileName = $_FILES['file']['name'];
            $file_ext = substr($fileName, strripos($fileName, '.')); // get file name
            $filesize = $_FILES["file"]["size"];
            $allowed_file_types = array('.png', '.jpg', '.gif', '.jpeg');
            if ($filesize > 200000) {
                $this->returnResponse(903, ['message' => sprintf($this->message["img_large"])]);
                return;
            }
            if (!in_array($file_ext, $allowed_file_types)) {
                $this->returnResponse(903, ['message' => sprintf($this->message["img_invaild"], implode(', ', $allowed_file_types))]);
                return;
            }
            $newfilename = $this->rand_string(50) . $file_ext;

            $device = $this->Devices->patchEntity($deviceNewEntity, $request);
            $this->uploadFile($this->nameController, $newfilename);
            $device->image = $newfilename;
            if (!empty($device->specifications)) {
                $device->specifications = htmlentities($device->specifications);
            }
            $device->created_user = $this->login['user_name'];
            if ($this->Devices->save($device)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["add_success"], "thiết bị")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["add_error"], "thiết bị")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function edit devices
    public function edit() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => $this->message['no_id']]);
                return;
            }

            $validate = $this->Devices->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $device = $this->getDevice(['id' => $request['id']]);
            //chech null devices ?
            if (empty($device)) {
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            //if request serial_number different serial_number of device then check unique
            if ($request['serial_number'] !== $device['serial_number']) {
                $validateSerialnumber = $this->Devices->newEntity($request, ['validate' => 'serialnumber']);
                $validateSerialnumberError = $validateSerialnumber->getErrors();
                if (!empty($validateSerialnumberError)) {
                    //set return response (response code, api response)
                    $this->returnResponse(901, ['message' => $validateSerialnumberError]);
                    return;
                }
            }
            $deviceUpdate = $this->Devices->patchEntity($device, $request);
            // if is exist $_FILES then upload new image
            $imageOld = null;
            if (isset($_FILES) && !empty($_FILES)) {
                $fileName = $_FILES['file']['name'];
                $file_ext = substr($fileName, strripos($fileName, '.')); // get file name
                $filesize = $_FILES["file"]["size"];
                $allowed_file_types = array('.png', '.jpg', '.gif', '.jpeg');
                if ($filesize > 200000) {
                    $this->returnResponse(903, ['message' => sprintf($this->message["img_large"])]);
                    return;
                }
                if (!in_array($file_ext, $allowed_file_types)) {
                    $this->returnResponse(903, ['message' => sprintf($this->message["img_invaild"], implode(', ', $allowed_file_types))]);
                    return;
                }
                $newfilename = $this->rand_string(50) . $file_ext;
                $imageOld = $deviceUpdate->image;
                $this->uploadFile($this->nameController, $newfilename);
                $deviceUpdate->image = $newfilename;
            }

            //if specification khac null ma hoa code
            if (!empty($device->specifications)) {
                $deviceUpdate->specifications = htmlentities($device->specifications);
            }
            $deviceUpdate->update_user = $this->login['user_name'];
            $deviceUpdate->update_time = $this->dateNow;          
            if ($this->Devices->save($deviceUpdate)) {
                if (!empty($imageOld)) {
                    $this->deleteImg($imageOld, $this->nameController);
                }
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["edit_success"], "thiết bị")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["edit_error"], "thiết bị")]);
            }
        } else {
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function delete device
    public function delete() {
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $device = $this->getDevice(['id' => $request['id']]);
            if (empty($device)) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            $device->update_user = $this->login['user_name'];
            $device->update_time = $this->dateNow;
            $device->is_deleted = 1;
            if ($this->Devices->save($device)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["delete_success"], "thiết bị")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["delete_error"], "thiết bị")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    public function filterBrand() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $condition = ['is_deleted' => 0];
            if (isset($request['brand_name']) && !empty($request['brand_name'])) {
                $condition = array_merge($condition, ['brand_name LIKE' => '%' . $request['brand_name'] . '%']);
            }
            $brands = $this->LstBrandsWhere($condition);
            $agrs = array(
                'lstBrands' => $brands
            );
            //set return response (response code, api response)
            $this->returnResponse(200, $agrs);
        }
    }

    public function filterDevices() {

        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $condition = ['Devices.is_deleted' => 0];
            if (isset($request['name']) && !empty($request['name'])) {
                $condition = array_merge($condition, ['Devices.name LIKE' => '%' . $request['name'] . '%']);
            }
            if (isset($request['status']) && !empty($request['status']) && $request['status'] > -1) {
                $condition = array_merge($condition, ['Devices.status' => ($request['status'] - 1)]);
            }
            if (isset($request['brand_id']) && !empty($request['brand_id']) && $request['brand_id'] > -1) {
                $condition = array_merge($condition, ['Devices.brand_id' => $request['brand_id']]);
            }
            if (isset($request['categories_id']) && !empty($request['categories_id']) && $request['categories_id'] > -1) {
                $condition = array_merge($condition, ['Devices.categories_id' => $request['categories_id']]);
            }
            $devices = $this->lstDevicesWhere($condition);
            if (count($devices) > 0) {
                foreach ($devices as $row) {
                    $row['specifications'] = html_entity_decode($row['specifications']);
                }
            }
            $args = array(
                'lstDevices' => $devices,
                'baseUrl' => $this->baseUrl . 'uploads/files/' . strtolower($this->nameController)
            );
            //set return response (response code, api response)
            $this->returnResponse(200, $args);
        }
    }

    private function lstDevicesWhere(array $condition) {
        $devices = $this->Devices
                ->find('all')
                ->select($this->Devices)
                ->select($this->Categories)
                ->select($this->Brands)
                ->join([
                    'Categories' => [
                        'table' => 'categories',
                        'type' => 'LEFT',
                        'conditions' => 'Categories.id = Devices.Categories_id'
                    ]
                ])
                ->join([
                    'Brands' => [
                        'table' => 'brands',
                        'type' => 'LEFT',
                        'conditions' => 'Brands.id = Devices.brand_id'
                    ]
                ])
                ->where($condition)
                ->toArray();
        return $devices;
    }

    private function LstBrandsWhere(array $condition) {
        $brands = $this->Brands
                ->find('all')
                ->where($condition)
                ->toArray();
        return $brands;
    }

    function getDevice(array $condition) {
        $device = $this->Devices
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $device;
    }

    function getBrand(array $condition) {
        $brands = $this->Brands
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $brands;
    }

}
