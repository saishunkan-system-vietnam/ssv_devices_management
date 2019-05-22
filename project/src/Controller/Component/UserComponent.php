<?php
namespace App\Controller\Component;

use Cake\Controller\Component;

/**
 * Class UserComponent
 *
 * @package App\Controller\Component
 */
class UserComponent extends Component
{
    /**
     * @var \Cake\Controller\Controller
     */
    private $Controller;

    private $login;

    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->Controller = $this->_registry->getController();
        //$this->login = $this->Controller->getRequest()->getSession()->read('Auth.User');
    }

    /**
     * deleteDebtor method
     *
     * @param int|null $id
     * @return bool
     */
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