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

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    
    //function get list category
    public function index() {
        $categories = $this->Categories->find('all')->where(['is_deleted' => 0])->toArray();
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
        $category = $this->Categories->find('all')->where(['is_deleted' => 0, 'id' => $id])->toArray();
        $this->apiResponse['lstCategories'] = $category;
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    
    //function add category
    public function add() {    
        $result = [];
        $category = $this->Categories->newEntity();
        if ($this->getRequest()->is('post')) {
            $category = $this->Categories->patchEntity($category, $this->getRequest()->getData());
            $validate = $this->Categories->newEntity($this->getRequest()->getData());
            $validateError = $validate->getErrors();
            if (empty($validateError)) {
                if ($this->Categories->save($category)) {
                    $result['add'] = 1;
                } else {
                    $result['add'] = 0;
                }
            } else {
                $result["validate"] = $validateError;
            }
        }
        $this->apiResponse['result'] = $result;
    }

    /**
     * Edit method
     *
     * @param string|null $id Category id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    
    //function update category
    public function edit($id = null) {
        $result = [];
        $category = $this->Categories->get($id);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $validate = $this->Categories->newEntity($this->getRequest()->getData());
            $validateError = $validate->getErrors();
            if (empty($validateError)) {
                $category = $this->Categories->patchEntity($category, $this->request->getData());
                if ($this->Categories->save($category)) {
                    $result['update'] = 1;
                } else {
                    $result['update'] = 0;
                }
            } else {
                $result["validate"] = $validateError;
            }
        }
        $this->apiResponse['result'] = $result;
    }

    /**
     * Delete method
     *
     * @param string|null $id Category id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    
    //function delete category
    public function delete($id = null) {
        $result = [];
        $category = $this->Categories->get($id);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $category->is_deleted=1;
            if ($this->Categories->save($category)) {
                $result['delete'] = 1;
            } else {
                $result['delete'] = 0;
            }
        }
        $this->apiResponse['result'] = $result;
    }

}
