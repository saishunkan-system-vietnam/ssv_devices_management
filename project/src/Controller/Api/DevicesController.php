<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;
use Cake\Routing\Router;

/**
 * Devices Controller
 *
 * @property \App\Model\Table\DevicesTable $Devices
 *
 * @method \App\Model\Entity\Device[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class DevicesController extends ApiController
{

    private $Brands;
    private $Devices;
    private $login;
    private $nameController;
    private $baseUrl;

    public function initialize()
    {
        parent::initialize();
        $this->Brands = TableRegistry::getTableLocator()->get('Brands');
        $this->Devices = TableRegistry::getTableLocator()->get('Devices');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->nameController = $this->getRequest()->controller;
        $this->baseUrl = Router::url('/', true);
    }

    //function get list brands
    public function getLstBrand()
    {
        $brands = $this->Brands
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();
        $agrs = array(
            'lstBrands' => $brands
        );
        //set return response (response code, api response)
        $this->returnResponse(200, $agrs);
    }

    //function view brand
    public function viewBrand($id = null)
    {
        $brand = $this->getBrand(['id' => $id]);
        if (!empty($brand)) {
            $agrs = array(
                'brand' => $brand
            );
            //set return response (response code, api response)
            $this->returnResponse(200, $agrs);
        } else {
            //set return response (response code, api response)
            $this->returnResponse(903, ['message' => 'There are no data, please check again']);
        }
    }

    //function add brand
    public function addBrand()
    {
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
                //set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The brand has been saved.']);
            } else {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The brand could not be saved. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function edit brand
    public function editBrand()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'ID could not be found']);
                return;
            }
            $brand = $this->getBrand(['id' => $request['id']]);
            if (empty($brand)) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'There are no data, please check again']);
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
                //set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The brand has been saved change.']);
            } else {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The brand could not be saved change. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function delete brand
    public function deleteBrand()
    {

        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'ID could not be found']);
                return;
            }
            $brand = $this->getBrand(['id' => $request['id']]);
            if (empty($brand)) {
                $this->returnResponse(903, ['message' => 'There are no data, please check again']);
                return;
            }
            $brand->is_deleted = 1;
            $brand->update_user = $this->login['user_name'];
            $brand->update_time = $this->dateNow;
            if ($this->Brands->save($brand)) {
                //set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The brand has been deleted.']);
            } else {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The brand could not be deleted. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function get list devices
    public function getLstDevices()
    {
        $devices = $this->Devices
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();
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
    public function view($id = null)
    {
        $devices = $this->getDevice(['id' => $id]);
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
            $this->returnResponse(903, ['message' => 'There are no data, please check again']);
        }
    }

    //function add devices
    public function add()
    {
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
                $this->returnResponse(901, ['message' => 'Please select a image before add device.']);
                return;
            }

            $fileName = $_FILES['file']['name'];
            $file_ext = substr($fileName, strripos($fileName, '.')); // get file name
            $filesize = $_FILES["file"]["size"];
            $allowed_file_types = array('.png', '.jpg', '.gif', '.jpeg');
            if ($filesize > 200000) {
                $this->returnResponse(903, ['message' => 'The file you are trying to upload is too large.']);
                return;
            }
            if (!in_array($file_ext, $allowed_file_types)) {
                $this->returnResponse(903, ['message' => "Only these file typs are allowed for upload: " . implode(', ', $allowed_file_types)]);
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
                //set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The device has been saved.']);
            } else {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The device could not be saved. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function edit devices
    public function edit()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();

            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'ID could not be found']);
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
                $this->returnResponse(903, ['message' => 'The is no data. Please, try again.']);
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
                    $this->returnResponse(903, ['message' => 'The file you are trying to upload is too large.']);
                    return;
                }
                if (!in_array($file_ext, $allowed_file_types)) {
                    $this->returnResponse(903, ['message' => "Only these file typs are allowed for upload: " . implode(', ', $allowed_file_types)]);
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
                $this->returnResponse(200, ['message' => 'The device has been saved.']);
            } else {
                $this->returnResponse(901, ['message' => 'The device could not be saved. Please, try again.']);
            }
        } else {
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    //function delete device
    public function delete()
    {
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'ID could not be found']);
                return;
            }
            $device = $this->getDevice(['id' => $request['id']]);
            if (empty($device)) {
                //set return response (response code, api response)
                $this->returnResponse(903, ['message' => 'There are no data, please check again']);
                return;
            }
            $device->update_user = $this->login['user_name'];
            $device->update_time = $this->dateNow;
            $device->is_deleted = 1;
            if ($this->Devices->save($device)) {
                //set return response (response code, api response)
                $this->returnResponse(200, ['message' => 'The device has been deleted.']);
            } else {
                //set return response (response code, api response)
                $this->returnResponse(901, ['message' => 'The device could not be deleted. Please, try again.']);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => 'Method type is not correct.']);
        }
    }

    function getDevice(array $condition)
    {
        $device = $this->Devices
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $device;
    }

    function getBrand(array $condition)
    {
        $brands = $this->Brands
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $brands;
    }

}
