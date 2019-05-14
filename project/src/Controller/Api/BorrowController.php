<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use \Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;

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

    public function initialize() {
        parent::initialize();
        $this->BorrowDevices = TableRegistry::getTableLocator()->get('BorrowDevices');
        $this->BorrowDevicesDetail = TableRegistry::getTableLocator()->get('BorrowDevicesDetail');
    }

    //get list BorrowDevices
    public function index() {
        $borrowDevices = $this->BorrowDevices->find('all')->toArray();
        $this->apiResponse['lstBorrowDevices'] = $borrowDevices;
    }

    /**
     * View method
     *
     * @param string|null $id Borrow id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null) {

        $borrowDevices = $this->BorrowDevices->get($id);
        $borrowDevicesDetail = $this->BorrowDevicesDetail->find('all')->where(['borrow_device_id' => $id])->toArray();
        $this->apiResponse['lstBorrowDevices'] = $borrowDevices;
        $this->apiResponse['lstBorrowDevicesDetail'] = $borrowDevicesDetail;
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add() {
        
       $connection=  ConnectionManager::get('default');
       try{
           
       } catch (Exception $ex) {
           
       }
       
        
        $borrow = $this->Borrow->newEntity();
        if ($this->request->is('post')) {
            $borrow = $this->Borrow->patchEntity($borrow, $this->request->getData());
            if ($this->Borrow->save($borrow)) {
                $this->Flash->success(__('The borrow has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The borrow could not be saved. Please, try again.'));
        }
        $this->set(compact('borrow'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Borrow id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null) {
        $borrow = $this->Borrow->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $borrow = $this->Borrow->patchEntity($borrow, $this->request->getData());
            if ($this->Borrow->save($borrow)) {
                $this->Flash->success(__('The borrow has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The borrow could not be saved. Please, try again.'));
        }
        $this->set(compact('borrow'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Borrow id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null) {
        $this->request->allowMethod(['post', 'delete']);
        $borrow = $this->Borrow->get($id);
        if ($this->Borrow->delete($borrow)) {
            $this->Flash->success(__('The borrow has been deleted.'));
        } else {
            $this->Flash->error(__('The borrow could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

}
