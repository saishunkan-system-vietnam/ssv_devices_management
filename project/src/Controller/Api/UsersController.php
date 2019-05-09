<?php
namespace App\Controller\Api;

use App\Controller\AppController;
use Cake\Http\Client\Request;
use RestApi\Controller\ApiController;
use App\Controller\Api\ApisController;
use RestApi\Utility\JwtToken;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends ApiController
{

//    public function beforeFilter(Event $event)
//    {
//        parent::beforeFilter($event);
//        // Allow users to register and logout.
//        // You should not add the "login" action to allow list. Doing so would
//        // cause problems with normal functioning of AuthComponent.
//        $this->Auth->allow(['add', 'logout']);
//    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        // Set the HTTP status code. By default, it is set to 200
        $this->httpStatusCode = 200;
        $users = $this->Users
            ->find('all')
            ->toArray();

        // Set the response
        $this->apiResponse['lstUser'] = $users;
    }

    /**
     * Login method
     *
     * Returns a token on successful authentication
     *
     * @return void|\Cake\Network\Response
     */
    public function login()
    {
        //if ($this->getRequest()->is(['post'])) {

//            $user = $this->Auth->identify();
//            if ($user) {
//                $this->Auth->setUser($user);
//                return $this->redirect($this->Auth->redirectUrl());
//            }
//            $this->Flash->error(__('Invalid username or password, try again'));

            /**
             * process your data and validate it against database table
             */

            // generate token if valid user
            $payload = ['email' => 'hunght1188@gmail', 'name' => 'hunght'];

            $this->apiResponse['token'] = JwtToken::generateToken($payload);
            $this->apiResponse['message'] = 'Logged in successfully.';

            //$this->Flash->error(__('Invalid username or password, try again'));
        //}

    }

    public function logout()
    {
        return $this->redirect($this->Auth->logout());
    }

    /**
     * View method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);

        $this->set('user', $user);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $user = $this->Users->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $user = $this->Users->get($id);
        if ($this->Users->delete($user)) {
            $this->Flash->success(__('The user has been deleted.'));
        } else {
            $this->Flash->error(__('The user could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
