<?php
namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\ORM\TableRegistry;

class UserComponent extends Component
{
  
    private $Controller;
    private $login;
    private $Users;

    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->Controller = $this->_registry->getController();
        $this->Users= TableRegistry::getTableLocator()->get('Users');
        //$this->login = $this->Controller->getRequest()->getSession()->read('Auth.User');       
    }

    //function get first user
     public function first(array $condition)
    {
        $user = $this->Users
                ->find('all')
                ->where($condition)
                ->first();
        return $user;
    }
    
    public function deleteUser(?int $id = null, $user_name)
    {
        $query = $this->Controller->Users->query();
        $result = $query->update()
            ->set([
                'status' => (int)1,
                'update_user' => $user_name,
                'update_time' => date('Y-m-d H:i:s'),
                ])
            ->where(['id' => $id])
            ->execute();
        if ($result->rowCount() == 0) {
            return false;
        }
        return true;
    }
}