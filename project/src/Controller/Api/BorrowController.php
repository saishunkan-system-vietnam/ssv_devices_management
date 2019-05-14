<?php

namespace App\Controller\Api;

use RestApi\Controller\ApiController;
use \Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use App\Model\Entity\BorrowDevice;

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

        // Set the HTTP status code. By default, it is set to 200
        $this->httpStatusCode = 200;
        $borrowDevices = $this->BorrowDevices
                ->find('all')
                ->where(['is_deleted' => 0])
                ->toArray();

        // Set the response
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
        $borrowDevices = $this->get($id, [
            'contain' => []
        ]);
        if (!empty($borrowDevices)) {

            // Set the HTTP status code. By default, it is set to 200
            $this->httpStatusCode = 200;
            $borrowDevicesDetail = $this->BorrowDevicesDetail
                    ->find('all')
                    ->where(['borrow_device_id' => $id, 'is_deleted' => 0])
                    ->toArray();

            //set the response   
            $this->apiResponse['lstBorrowDevices'] = $borrowDevices;
            $this->apiResponse['lstBorrowDevicesDetail'] = $borrowDevicesDetail;
        } else {
            // Set the HTTP status code. By default, it is set to 200
            $this->httpStatusCode = 901;

            //set the response   
            $this->apiResponse['lstBorrowDevices'] = 'There is no data, please check again.';
        }
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add() {
        $checkUpdate = true;
        $conn = ConnectionManager::get('default');
        try {
            $conn->begin();
          
            if ($this->getRequest()->is('post')) {
                $request = $this->getRequest()->getData();
               
                $borrowDevices = $this->BorrowDevices->newEntity();
                $borrowDevices->borrower_id = (isset($request['borrower_id'])) ? $request['borrower_id'] : '';
                $borrowDevices->approved_id = (isset($request['approved_id'])) ? $request['approved_id'] : '';
                $borrowDevices->handover_id = (isset($request['handover_id'])) ? $request['handover_id'] : '';
                $borrowDevices->borrow_reason = (isset($request['borrow_reason'])) ? $request['borrow_reason'] : '';
                $borrowDevices->return_reason = (isset($request['return_reason'])) ? $request['return_reason'] : '';
                $borrowDevices->status = (isset($request['status'])) ? $request['status'] : '';
                $borrowDevices->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevices->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevices->delivery_date = (isset($request['delivery_date'])) ? $request['delivery_date'] : '';
                $borrowDevices->return_date = (isset($request['return_date'])) ? $request['return_date'] : '';
                $borrowDevices->created_user = (isset($request['created_user'])) ? $request['created_user'] : '';
                $borrowDevices->update_user = (isset($request['update_user'])) ? $request['update_user'] : '';
                $borrowDevices->created_time = (isset($request['created_time'])) ? $request['created_time'] : '';
                $borrowDevices->update_time = (isset($request['update_time'])) ? $request['update_time'] : '';
                $borrowDevices->is_deleted = 0;
                $this->BorrowDevices->save($borrowDevices);
                    
                //get id of borrow devices max
                $borrowDevicesId=  $this->BorrowDevices
                        ->find('all')
                        ->max('id');

                $borrowDevicesDetail = $this->BorrowDevicesDetail->newEntity();
                $borrowDevicesDetail->borrow_device_id = $borrowDevicesId;
                $borrowDevicesDetail->device_id = (isset($request['device_id'])) ? $request['device_id'] : '';
                $borrowDevicesDetail->borrow_reason = (isset($request['borrow_reason'])) ? $request['borrow_reason'] : '';
                $borrowDevicesDetail->return_reason = (isset($request['return_reason'])) ? $request['return_reason'] : '';
                $borrowDevicesDetail->status = (isset($request['status'])) ? $request['status'] : '';
                $borrowDevicesDetail->borrow_date = (isset($request['borrow_date'])) ? $request['borrow_date'] : '';
                $borrowDevicesDetail->approved_date = (isset($request['approved_date'])) ? $request['approved_date'] : '';
                $borrowDevicesDetail->delivery_date = (isset($request['delivery_date'])) ? $request['delivery_date'] : '';
                $borrowDevicesDetail->return_date = (isset($request['return_date'])) ? $request['return_date'] : '';
                $borrowDevicesDetail->created_user = (isset($request['created_user'])) ? $request['created_user'] : '';
                $borrowDevicesDetail->update_user = (isset($request['update_user'])) ? $request['update_user'] : '';
                $borrowDevicesDetail->created_time = (isset($request['created_time'])) ? $request['created_time'] : '';
                $borrowDevicesDetail->update_time = (isset($request['update_time'])) ? $request['update_time'] : '';
                $borrowDevicesDetail->is_deleted = 0;

                $this->BorrowDevicesDetail->save($borrowDevicesDetail);
                $conn->commit();
            } 
        } catch (Exception $ex) {
             $conn->rollback();
        }
        
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
