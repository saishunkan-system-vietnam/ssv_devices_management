<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Auth Controller
 *
 *
 * @method \App\Model\Entity\Auth[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AuthController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $auth = $this->paginate($this->Auth);

        $this->set(compact('auth'));
    }

    /**
     * View method
     *
     * @param string|null $id Auth id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $auth = $this->Auth->get($id, [
            'contain' => []
        ]);

        $this->set('auth', $auth);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $auth = $this->Auth->newEntity();
        if ($this->request->is('post')) {
            $auth = $this->Auth->patchEntity($auth, $this->request->getData());
            if ($this->Auth->save($auth)) {
                $this->Flash->success(__('The auth has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The auth could not be saved. Please, try again.'));
        }
        $this->set(compact('auth'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Auth id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $auth = $this->Auth->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $auth = $this->Auth->patchEntity($auth, $this->request->getData());
            if ($this->Auth->save($auth)) {
                $this->Flash->success(__('The auth has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The auth could not be saved. Please, try again.'));
        }
        $this->set(compact('auth'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Auth id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $auth = $this->Auth->get($id);
        if ($this->Auth->delete($auth)) {
            $this->Flash->success(__('The auth has been deleted.'));
        } else {
            $this->Flash->error(__('The auth could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

    public function login()
    {
        if ($this->getRequest()->is('post')) {
            $user = $this->Auth->identify();
            if ($user && $user['role'] != 'Disabled') { // Don't allow "Disabled" users to log in
                $this->Auth->setUser($user);
                return $this->redirect($this->Auth->redirectUrl());
            }
            $this->Flash->error('Your username or password is incorrect.');
        }
    }
}
