<?php

namespace App\Controller\Api;


use RestApi\Controller\ApiController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 *
 * @method \App\Model\Entity\Category[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class CategoriesController extends ApiController {

    private $login;

    public function initialize() {
        parent::initialize();
        $this->login = $this->getRequest()->getSession()->read('Auth.User');
    }

    public function index() {
        // Set the HTTP status code. By default, it is set to 200
        $this->responseCode = 200;

        $categories = $this->Categories
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();

        // Set the response
        $this->apiResponse['lstCategories'] = $categories;
    }

    /**
     * View method
     *
     * @param string|null $id Category id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    //function view category
    public function view($id = null) {
        $category = $this->Categories
                ->find('all')
                ->where(['is_deleted' => 0, 'id' => $id])
                ->toArray();

        if (!empty($category)) {
            $this->responseCode = 200;
            $this->apiResponse['Category'] = $category;
        } else {
            $this->responseCode = 903;
            $this->apiResponse['message'] = 'There is no data, please check again.';
        }
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    //function add category
    public function add() {
        if ($this->getRequest()->is('post')) {
            $category = $this->Categories->newEntity();
            $validate = $this->Categories->newEntity($this->getRequest()->getData());
            $validateError = $validate->getErrors();
            if (empty($validateError)) {
                $category = $this->Categories->patchEntity($category, $this->getRequest()->getData());
                $category->created_user = $this->login['user_name'];
                $category->is_deleted = 0;
                if ($this->Categories->save($category)) {
                    $this->httpStatusCode = 200;
                    $this->apiResponse['message'] = 'Save category success.';
                } else {
                    $this->httpStatusCode = 901;
                    $this->apiResponse['message'] = 'Save category no success, please check again';
                }
            } else {
                $this->httpStatusCode = 901;
                $this->apiResponse['validate'] = $validateError;
            }
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Category id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    //function update category
    public function edit() {

        $request = $this->getRequest()->getData();
        if (!isset($request['id']) or empty($request['id'])) {
            $this->responseCode = 903;
            $this->apiResponse['message'] = 'No found id';
            return;
        }

        if ($this->getRequest()->is(['patch', 'post', 'put'])) {
            $category = $this->Categories
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (!empty($category)) {
                $category = $this->Categories->patchEntity($category, $this->request->getData());
                $category->update_user = $this->login['user_name'];
                if ($this->Categories->save($category)) {
                    $this->responseCode = 200;
                    $this->apiResponse['message'] = 'update category success';
                } else {
                    $this->responseCode = 901;
                    $this->apiResponse['message'] = 'update category no success, please check again';
                }
            }
        } else {
            $this->responseCode = 903;
            $this->apiResponse['message'] = 'No found category, please check again';
        }
    }

    /**
     * Delete method
     *
     * @param string|null $id Category id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
//function delete category
    public function delete() {

        $request = $this->getRequest()->getData();
        if (!isset($request['id']) or empty($request['id'])) {
            $this->httpStatusCode = 903;
            $this->apiResponse['message'] = 'No found id';
            return;
        }

        if ($this->request->is(['patch', 'post', 'put'])) {
            $category = $this->Categories
                    ->find('all')
                    ->where(['id' => $request['id']])
                    ->first();
            if (!empty($category)) {
                $category->is_deleted = 1;
                if ($this->Categories->save($category)) {
                    $this->httpStatusCode = 200;
                    $this->apiResponse['message'] = 'delete category success';
                } else {
                    $this->httpStatusCode = 901;
                    $this->apiResponse['message'] = 'delete category no success, please check again';
                }
            } else {
                $this->httpStatusCode = 903;
                $this->apiResponse['message'] = 'There is no data, please check again';
            }
        }
    }

}
