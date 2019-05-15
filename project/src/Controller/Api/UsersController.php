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
use Cake\Datasource\ConnectionManager;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends ApiController
{
    private $login;
    protected $connection;

    public function initialize()
    {
        parent::initialize();

        $this->login = $this->getRequest()->getSession()->read('Auth.User');
        $this->connection = ConnectionManager::get('default');

        $this->loadComponent('User');
        $this->loadModel('Users');
    }

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
            $session = $this->getRequest()->getSession();
            $url = Configure::read('User.Url_AccessUser');
            $username = $request['username'];
            $pwd = $request['passwd'];
            if(empty($username) || empty($pwd)){
                $this->responseCode = 903;
                // Set the response
                $this->apiResponse['message'] = 'Username or Password can not empty!';
            }
            $http = new Client();
            $results = $http->get($url.$username.'&passwd='.$pwd.'&session=Chat&format=cookie');
            $data = json_decode($results->body);
            if(!empty($data->success) && $data->success == true) {
                $userdata = $this->Users->find()
                    ->where(['is_deleted' => 0, 'user_name' => $username])
                    ->first();
                if (!empty($userdata)) {
                    if ($userdata->id) {
                        $this->responseCode = 200;
                        // Set the response
                        $payload = ['email' => $userdata->email, 'name' => $userdata->user_name];

                        $this->apiResponse['token'] = JwtToken::generateToken($payload);
                        $this->apiResponse['message'] = 'Logged in successfully.';
                        // redirect to dashboard
                    } else {
                        $session->write('User.username', $userdata);
                        $this->responseCode = 902;
                        // Set the response
                        $this->apiResponse['message'] = 'New user';
                    }
                } else {
                    $this->responseCode = 901;
                    // Set the response
                    $this->apiResponse['message'] = 'Wrong user name or password';
                }
            }
        }

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
        if(empty($id)){
            $this->responseCode = 903;
            // Set the response
            $this->apiResponse['message'] = 'Not found data.';
        }
        $user = $this->Users->find()
            ->where(['is_deleted' => 0, 'id' => $id])
            ->first();
        if (!empty($user)) {
            $this->responseCode = 200;
            // Set the response
            $this->apiResponse['lstUser'] = $user;
        } else {
            $this->responseCode = 901;
            // Set the response
            $this->apiResponse['message'] = 'There is no data, please check again.';
        }
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
        if ($this->getRequest()->isPost()) {
            $id = $this->getRequest()->getData('id');
            $result = $this->User->deleteUser($id);
            if ($result) {
                $this->responseCode = 200;
                // Set the response
                $this->apiResponse['message'] = 'The user has been deleted';
            } else {
                $this->responseCode = 901;
                // Set the response
                $this->apiResponse['message'] = 'The user could not be deleted. Please, try again.';
            }
        }
    }

    public function updateProfile(){
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            $session = $this->getRequest()->getSession();
            $user_name = $request['user_name'];
            if(empty($user_name) || empty($request['full_name']) || empty($request['email'])) {
                $this->responseCode = 903;
                // Set the response
                return $this->apiResponse['message'] = 'Data can not empty!';

            }
            if ($session->check('User.username')) {
                $user_name = $session->read('User.username');
            } else {
                //$this->Flash->error(__('The user could not empty'));
            }
            $user = $this->Users->newEntity();
            $user->user_name = $user_name;
            $user->full_name = $request['full_name'];
            $user->email = $request['email'];
            $user->position = 'Programmer';
            $user->level = (int)1;
            $user->created_time = date('Y-m-d H:i:s');
            $user->update_time = date('Y-m-d H:i:s');
            $user->is_deleted = (int)0;
            if($this->Users->save($user)){
                $this->responseCode = 200;
                // Set the response
                $payload = ['email' => $user->email, 'name' => $user->user_name];

                $this->apiResponse['token'] = JwtToken::generateToken($payload);
                // Set the response
                $this->apiResponse['message'] = 'The user has been saved.';
            } else {
                $this->responseCode = 901;
                // Set the response
                $this->apiResponse['message'] = 'The user could not be saved. Please, try again.';
            }
        }
    }
}
