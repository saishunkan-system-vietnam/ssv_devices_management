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
    public function deleteUser(?int $id = null)
    {
        $query = $this->Controller->Users->query();
        $result = $query->update()
            ->set(['status' => 1])
            ->where(['id' => $id])
            ->execute();
        if ($result->rowCount() == 0) {
            return false;
        }
        return true;
    }
}