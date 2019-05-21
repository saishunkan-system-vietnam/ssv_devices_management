<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;

class CategoriesController extends ApiController
{

    private $login;
    private $Categories;

    public function initialize()
    {
        parent::initialize();
        $this->Categories = TableRegistry::getTableLocator()->get('Categories');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
    }

    public function index()
    {
        $categories = $this->Categories
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();
        // Set return response (response code, api response)       
        $this->returnResponse(200, $categories);
    }

    //function view category
    public function view($id = null)
    {
        $category = $this->Categories
                ->find('all')
                ->where(['is_deleted' => 0, 'id' => $id])
                ->toArray();

        if (!empty($category)) {
            // Set return response (response code, api response)       
            $this->returnResponse(200, $category);
        } else {
            // Set return response (response code, api response)       
            $this->returnResponse(903, 'There is no data, please check again.');
        }
    }

    //function add category
    public function add()
    {
        if ($this->getRequest()->is('post')) {
            $categoryNewEntity = $this->Categories->newEntity();
            $validate = $this->Categories->newEntity($this->getRequest()->getData());
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                // Set return response (response code, api response)       
                $this->returnResponse(901, $validateError);
                return;
            }
            $category = $this->Categories->patchEntity($categoryNewEntity, $this->getRequest()->getData());
            $category->created_user = $this->login['user_name'];
            $category->is_deleted = 0;
            if ($this->Categories->save($category)) {
                // Set return response (response code, api response)       
                $this->returnResponse(200, 'Save category success.');
            } else {
                // Set return response (response code, api response)       
                $this->returnResponse(901, 'Save category no success, please check again');
            }
        } else {
            // Set return response (response code, api response)       
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

    //function update category
    public function edit()
    {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                // Set return response (response code, api response)       
                $this->returnResponse(903, 'No found id');
                return;
            }
            $category = $this->Categories
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (empty($category)) {
                // Set return response (response code, api response)       
                $this->returnResponse(903, 'No found category, please check again.');
                return;
            }
            $validate = $this->Categories->newEntity($this->getRequest()->getData());
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                // Set return response (response code, api response)       
                $this->returnResponse(901, $validateError);
                return;
            }
            $categoryUpdate = $this->Categories->patchEntity($category, $this->request->getData());
            $categoryUpdate->update_user = $this->login['user_name'];
            $categoryUpdate->update_time = $this->dateNow;
            if ($this->Categories->save($categoryUpdate)) {
                // Set return response (response code, api response)       
                $this->returnResponse(200, 'Update category success');
            } else {
                // Set return response (response code, api response)       
                $this->returnResponse(901, 'Update category no success, please check again.');
            }
        } else {
            // Set return response (response code, api response)       
            $this->returnResponse(200, 'Method type is not correct.');
        }
    }

//function delete category
    public function delete()
    {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) or empty($request['id'])) {
                // Set return response (response code, api response)       
                $this->returnResponse(903, 'No found id');
                return;
            }
            $category = $this->Categories
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (empty($category)) {
                // Set return response (response code, api response)       
                $this->returnResponse(903, 'There is no data, please check again');
                return;
            }
            $category->is_deleted = 1;
            $category->update_user = $this->login['user_name'];
            $category->update_time = $this->dateNow;
            if ($this->Categories->save($category)) {
                // Set return response (response code, api response)       
                $this->returnResponse(200, 'The category has been deleted.');
            } else {
                // Set return response (response code, api response)       
                $this->returnResponse(901, 'The category could not be deleted. Please, try again.');
            }
        } else {
            // Set return response (response code, api response)       
            $this->returnResponse(904, 'Method type is not correct.');
        }
    }

}
