<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use Cake\ORM\TableRegistry;
use Cake\Core\Configure;

class CategoriesController extends ApiController {

    private $login;
    private $Categories;
    private $Brands;
    private $message;

    public function initialize() {
        parent::initialize();
        $this->Categories = TableRegistry::getTableLocator()->get('Categories');
        $this->Brands = TableRegistry::getTableLocator()->get('Brands');
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->message = Configure::read('Message');
    }

    public function index() {
        $categories = $this->Categories([['Categories.is_deleted' => 0]]);
        $args = array(
            'lstCategories' => $categories
        );
        // Set return response (response code, api response)
        $this->returnResponse(200, $args);
    }

    //function view category
    public function view($id = null) {
        $category = $this->firstCategory($id);
        if (!empty($category)) {
            $args = array(
                'category' => $category
            );
            // Set return response (response code, api response)
            $this->returnResponse(200, $args);
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(903, ['message' => $this->message['no_data']]);
        }
    }

    //function add category
    public function add() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $categoryNewEntity = $this->Categories->newEntity();
            $validate = $this->Categories->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $category = $this->Categories->patchEntity($categoryNewEntity, $request);
            $category->created_user = $this->login['user_name'];
            $category->is_deleted = 0;
            if ($this->Categories->save($category)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["add_success"], "loại thiết bị")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["add_error"], "loại thiết bị")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    //function update category
    public function edit() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $category = $this->getCategory(['id' => $request['id']]);
            if (empty($category)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            $validate = $this->Categories->newEntity($request);
            $validateError = $validate->getErrors();
            if (!empty($validateError)) {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => $validateError]);
                return;
            }
            $categoryUpdate = $this->Categories->patchEntity($category, $request);
            $categoryUpdate->update_user = $this->login['user_name'];
            $categoryUpdate->update_time = $this->dateNow;
            if ($this->Categories->save($categoryUpdate)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["edit_success"], "loại thiết bị")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["edit_error"], "loại thiết bị")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

//function delete category
    public function delete() {
        if ($this->request->is('post')) {
            $request = $this->getRequest()->getData();
            if (!isset($request['id']) || empty($request['id'])) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_id']]);
                return;
            }
            $category = $this->getCategory(['id' => $request['id']]);
            if (empty($category)) {
                // Set return response (response code, api response)
                $this->returnResponse(903, ['message' => $this->message['no_data']]);
                return;
            }
            $category->is_deleted = 1;
            $category->update_user = $this->login['user_name'];
            $category->update_time = $this->dateNow;
            if ($this->Categories->save($category)) {
                // Set return response (response code, api response)
                $this->returnResponse(200, ['message' => sprintf($this->message["delete_success"], "loại thiết bị")]);
            } else {
                // Set return response (response code, api response)
                $this->returnResponse(901, ['message' => sprintf($this->message["delete_error"], "loại thiết bị")]);
            }
        } else {
            // Set return response (response code, api response)
            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

    function getCategory(array $condition) {
        $category = $this->Categories
                ->find('all')
                ->where([key($condition) => current($condition)])
                ->first();
        return $category;
    }

    function Categories($condition) {
        $categories = $this->Categories
                ->find('all')
                ->select($this->Categories)
                ->select($this->Brands)
                ->select('Category_parent.category_name')
                ->join([
                    'Brands' => [
                        'table' => 'brands',
                        'type' => 'INNER',
                        'conditions' => 'Brands.id = Categories.brands_id'
                    ]
                ])
                ->join([
                    "Category_parent" => [
                        'table' => 'categories',
                        'type' => 'LEFT',
                        'conditions' => 'Category_parent.id=Categories.id_parent'
                    ]
                ])
                ->where($condition)
                ->toArray();
        return $categories;
    }

    private function firstCategory($id) {
        $category = $this->Categories
                ->find('all')
                ->select($this->Categories)
                ->select($this->Brands)
                ->select('Category_parent.category_name')
                ->join([
                    'Brands' => [
                        'table' => 'brands',
                        'type' => 'INNER',
                        'conditions' => 'Brands.id = Categories.brands_id'
                    ]
                ])
                ->join([
                    "Category_parent" => [
                        'table' => 'categories',
                        'type' => 'LEFT',
                        'conditions' => 'Category_parent.id=Categories.id_parent'
                    ]
                ])
                ->where(['Categories.id' => $id])
                ->first();
        return $category;
    }

    public function filter() {
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $condition = ['Categories.is_deleted' => 0];
            if (isset($request['id_parent']) && !empty($request['id_parent'] && $request['id_parent'] != -1)) {
                if ($request['id_parent'] == 1) {
                    $condition = array_merge($condition, ['Categories.id_parent' => 0]);
                } else if ($request['id_parent'] == 2) {
                    $condition = array_merge($condition, ['Categories.id_parent <>' => 0]);
                }
            }
            if (isset($request['brands_id']) && !empty($request['brands_id'] && $request['brands_id'] != -1)) {
                $condition = array_merge($condition, ['Categories.brands_id' => $request['brands_id']]);
            }
            if (isset($request['category_name']) && !empty($request['category_name'])) {
                $condition = array_merge($condition, ['Categories.category_name LIKE' => '%' . $request['category_name'] . '%']);
            }

            $categories = $this->Categories($condition);
            $args = array(
                'lstFilter' => $categories
            );
            // Set return response (response code, api response)
            $this->returnResponse(200, $args);
        } else {

            $this->returnResponse(904, ['message' => $this->message['method_error']]);
        }
    }

}
