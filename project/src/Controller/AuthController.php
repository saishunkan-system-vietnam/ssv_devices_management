<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use App\Model\Entity\User;
use Cake\Http\Response;

/**
 * Auth Controller
 *
 *
 * @method \App\Model\Entity\Auth[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AuthController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadModel('Users');
    }
    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        if ($this->getRequest()->getParam('action') === 'signin') {
            $this->getEventManager()->off($this->Csrf);
        }
        if ($this->getRequest()->getParam('action') === 'signout') {
            $this->getEventManager()->off($this->Csrf);
        }
    }

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

    public function signin()
    {
        $this->layout = false;
        $this->autoRender = false;
        if ($this->getRequest()->is('post')) {
            $request = $this->getRequest()->getData();
            $user = $this->Users->find()
                ->where(['is_deleted' => 0, 'user_name' => $request['user_name']])
                ->first();
            //$user = $this->Auth->identify();
            if ($user) { // Don't allow "Disabled" users to log in
                $this->Auth->setUser($user);
                $args = [
                  '0' => 200,
                  'status' => 'OK',
                  'payload' => [
                      'message' => 'login success'
                  ]
                ];

                echo json_encode($args);
            } else {
                $args = [
                    '0' => 901,
                    'status' => 'OK',
                    'payload' => [
                        'message' => 'login error'
                    ]
                ];
                echo json_encode($args);
            }
        }
    }

    public function signout()
    {
        $this->autoRender = false;
        if($this->Auth->logout()){
            $args = [
                '0' => 200,
                'status' => 'OK',
                'payload' => [
                    'message' => 'logout success'
                ]
            ];

            echo json_encode($args);
        } else {
            $args = [
                '0' => 901,
                'status' => 'OK',
                'payload' => [
                    'message' => 'logout error'
                ]
            ];
            echo json_encode($args);
        }
    }
}
