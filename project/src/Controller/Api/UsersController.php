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
            ->where(['status' => 0])
            ->toArray();
        $args = array(
            'lstUser' => $users,
            'message' => 'Get list user success.'
        );
        // Set the response
        $this->returnResponse(903, $args);
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
                // Set the response
                $this->returnResponse(903, ['message' => 'Username or Password can not empty.']);
                return;
            }
            $http = new Client();
            $results = $http->get($url.$username.'&passwd='.$pwd.'&session=Chat&format=cookie');
            $data = json_decode($results->body);
            if(!empty($data->success) && $data->success == true) {
                $userdata = $this->Users->find()
                    ->where(['is_deleted' => 0, 'user_name' => $username])
                    ->first();
                if (!empty($userdata) && $userdata->id) {
                    // Set the response
                    $payload = ['email' => $userdata->email, 'name' => $userdata->user_name];
                    $args = array(
                        'token' => JwtToken::generateToken($payload),
                        'userName' => $request['username'],
                        'message' => 'Logged in successfully.'
                    );
                    $this->returnResponse(200, $args);
                    return;
                    // redirect to dashboard
                } else {
                    $session->write('User.username', $userdata);
                    // Set the response
                    $args = array(
                        'userName' => $request['username'],
                        'message' => 'New user'
                    );
                    $this->returnResponse(902, $args);
                    return;
                }
            } else {
                // Set the response
                $this->returnResponse(901, ['message' => 'Wrong user name or password.']);
                return;
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
    public function view($id)
    {
        if(empty($id)){
            // Set the response
            $this->returnResponse(903, ['message' => 'Not found data.']);
            return;
        }
        $user = $this->Users->find()
            ->where(['is_deleted' => 0, 'id' => $id, 'status' => 0])
            ->first();
        $args = array(
            'id' => $user->id,
            'user_name' => $user->user_name,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'address' => $user->address,
            'birthdate' => date('Y-m-d', strtotime($user->birthdate)),
            'join_date' => date('Y-m-d', strtotime($user->join_date)),
        );
        if (!empty($user)) {
            // Set the response
            $this->returnResponse(200, ['userData' => $args]);
            return;
        } else {
            // Set the response
            $this->returnResponse(901, ['message' => 'There is no data, please check again.']);
            return;
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
            $user_name = $this->login['user_name'];
            $result = $this->User->deleteUser($id, $user_name);
            if ($result) {
                $this->responseCode = 200;
                // Set the response
                $this->returnResponse(200, ['message' => 'The user has been deleted']);
                return;
            } else {
                // Set the response
                $this->returnResponse(901, ['message' => 'The user could not be deleted. Please, try again.']);
                return;
            }
        }
    }

    public function updateProfile(){
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            $session = $this->getRequest()->getSession();
            $id = $request['id'];
            $controllerName = $this->getRequest()->getParam('controller');

            if(!empty($_FILES['file'])){
                $upload = $this->uploadFile($controllerName);
            }
            $user_name = 'HungHT';
            if(empty($user_name) || empty($request['full_name']) || empty($request['email'])) {
                // Set the response
                $this->returnResponse(903, 'Data can not empty.');
                return;
            }
            if ($session->check('User.username')) {
                $user_name = $session->read('User.username');
            }
            if($id == null) {
                $user = $this->Users->newEntity();
                $user->user_name = $user_name;
                $user->full_name = $request['full_name'];
                $user->email = $request['email'];
                $user->address = $request['address'];
                $user->birthdate = date('Y-m-d', strtotime($request['dateofbirth']));
                $user->join_date = date('Y-m-d', strtotime($request['joindate']));
                $user->img = isset($upload) ? $upload : '';
                $user->position = 'Programmer';
                $user->level = (int)1;
                $user->created_user = $user_name;
                $user->update_user = $user_name;
                $user->created_time = date('Y-m-d H:i:s');
                $user->update_time = date('Y-m-d H:i:s');
                $user->is_deleted = (int)0;
                $user->status = $request['status'];
            } else {
                $user = $this->Users
                    ->find('all')
                    ->where(['id' => $id, 'status' => 0])
                    ->first();
                $user = $this->Users->patchEntity($user, $request);
                $user->user_name = $user_name;
                $user->full_name = $request['full_name'];
                $user->email = $request['email'];
                $user->address = $request['address'];
                $user->birthdate = date('Y-m-d', strtotime($request['dateofbirth']));
                $user->join_date = date('Y-m-d', strtotime($request['joindate']));
                $user->img = isset($upload) ? $upload : $user->img;
                if(!empty($request['position']) && !empty($request['level'])) {
                    $user->position = $request['position'];
                    $user->level = $request['level'];
                }
                $user->update_user = $user_name;
                $user->update_time = date('Y-m-d H:i:s');
            }

            if($this->Users->save($user)){
                $payload = ['email' => $user->email, 'name' => $user->user_name];
                $args = array(
                    'token' => JwtToken::generateToken($payload),
                    'userData' => $user,
                    'message' => 'The user has been update profile success.'
                );
                // Set the response
                $this->returnResponse(200, $args);
            } else {
                // Set the response
                $this->returnResponse(901, ['message' => 'The user could not be saved. Please, try again.']);
            }
        }
    }

    public function reStock(){
        if ($this->getRequest()->is(['post'])) {
            $request = $this->getRequest()->getData();
            $id = $request['id'];
            $user_name = $this->login['user_name'];
            if(empty($id)){
                // Set the response
                $this->returnResponse(903, ['message' => 'Id user can not empty.']);
                return;
            }
            $query = $this->Users->query();
            $query = $query->update()
                ->set([
                    'status' => (int)1,
                    'update_user' => $user_name,
                    'update_time' => date('Y-m-d H:i:s'),
                ])
                ->where(['id' => $id]);
            if($query->execute()){
                // Set the response
                $this->returnResponse(200, ['message' => 'The user has been restock.']);
            } else {
                // Set the response
                $this->returnResponse(901, ['message' => 'The user could not be restock. Please, try again.']);
            }
        } else {
            //set the response
            $this->returnResponse(904, ['message' => 'Method is not correct.']);
        }
    }
}
