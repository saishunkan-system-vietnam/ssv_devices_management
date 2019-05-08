<?php
namespace App\Controller\Api;

use App\Controller\AppController;

/**
 * Borrow Controller
 *
 *
 * @method \App\Model\Entity\Borrow[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class BorrowController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $borrow = $this->paginate($this->Borrow);

        $this->set(compact('borrow'));
    }

    /**
     * View method
     *
     * @param string|null $id Borrow id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $borrow = $this->Borrow->get($id, [
            'contain' => []
        ]);

        $this->set('borrow', $borrow);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
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
    public function edit($id = null)
    {
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
    public function delete($id = null)
    {
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
