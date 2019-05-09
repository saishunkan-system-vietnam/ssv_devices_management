<?php
namespace App\Controller\Api;

use App\Controller\AppController;
use App\Model\Entity\User;
use Cake\Http\Client\Request;
use RestApi\Controller\ApiController;
use App\Controller\Api\ApisController;
use RestApi\Utility\JwtToken;
use Cake\Http\Client;
use Cake\Core\Configure;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends ApiController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

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
            ->where(['is_deleted' => 0])
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
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            $url = Configure::read('User.Url_AccessUser');
            $username = $request['username'];
            $pwd = $request['password'];
            $http = new Client();
            $results = $http->get($url.$username.'&passwd='.$pwd.'&session=Chat&format=cookie');
            $data = json_decode($results->body);
            if(!empty($data->success) && $data->success == true){
                $user = $this->Auth->identify();
                if ($user) {
                    $this->Auth->setUser($user);
                }
                $userdata = $this->Users->find()
                    ->where(['is_deleted' => 0, 'user_name' => $username])
                    ->first();
                if($userdata->id) {
                    // generate token if valid user
                    $payload = ['email' => $userdata->email, 'name' => $userdata->user_name];
                    $this->apiResponse['token'] = JwtToken::generateToken($payload);
                    // redirect to dashboard
                } else {
                    // generate token if valid user
                    $payload = ['email' => $userdata->email, 'name' => $userdata->user_name];
                    $this->apiResponse['token'] = JwtToken::generateToken($payload);
                    //$this->redirect(array('controller' => 'Users', 'action' => 'updateProfile'), 301);
                }
            } else {
                // login error
            }
        }

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

    public function updateProfile(?int $id = null){
        
    }
}
