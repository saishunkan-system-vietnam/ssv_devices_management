<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Users Model
 *
 * @method \App\Model\Entity\User get($primaryKey, $options = [])
 * @method \App\Model\Entity\User newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\User[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\User|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\User saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\User patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\User[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\User findOrCreate($search, callable $callback = null, $options = [])
 */
class UsersTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('users');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->nonNegativeInteger('id')
            ->allowEmptyString('id', 'create');

        $validator
            ->scalar('user_name')
            ->maxLength('user_name', 100)
            ->requirePresence('user_name', 'create')
            ->allowEmptyString('user_name', false);

        $validator
            ->scalar('full_name')
            ->maxLength('full_name', 255)
            ->requirePresence('full_name', 'create')
            ->allowEmptyString('full_name', false);

        $validator
            ->scalar('position')
            ->maxLength('position', 100)
            ->requirePresence('position', 'create')
            ->allowEmptyString('position', false);

        $validator
            ->integer('level')
            ->allowEmptyString('level');

        $validator
            ->scalar('created_user')
            ->maxLength('created_user', 100)
            ->allowEmptyString('created_user');

        $validator
            ->scalar('update_user')
            ->maxLength('update_user', 100)
            ->allowEmptyString('update_user');

        $validator
            ->dateTime('created_time')
            ->allowEmptyDateTime('created_time');

        $validator
            ->dateTime('update_time')
            ->allowEmptyDateTime('update_time');

        $validator
            ->boolean('is_deleted')
            ->allowEmptyString('is_deleted', false);

        $validator
            ->email('email')
            ->requirePresence('email', 'create')
            ->allowEmptyString('email', false);

        $validator
            ->scalar('team')
            ->maxLength('team', 100)
            ->allowEmptyString('team');

        $validator
            ->scalar('address')
            ->maxLength('address', 250)
            ->allowEmptyString('address');

        $validator
            ->date('birthdate')
            ->allowEmptyDate('birthdate');

        $validator
            ->date('join_date')
            ->allowEmptyDate('join_date');

        $validator
            ->boolean('status')
            ->allowEmptyString('status');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->isUnique(['email']));

        return $rules;
    }
}
