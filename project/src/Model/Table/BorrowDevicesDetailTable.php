<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * BorrowDevicesDetail Model
 *
 * @property \App\Model\Table\BorrowDevicesTable|\Cake\ORM\Association\BelongsTo $BorrowDevices
 * @property \App\Model\Table\DevicesTable|\Cake\ORM\Association\BelongsTo $Devices
 *
 * @method \App\Model\Entity\BorrowDevicesDetail get($primaryKey, $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\BorrowDevicesDetail findOrCreate($search, callable $callback = null, $options = [])
 */
class BorrowDevicesDetailTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('borrow_devices_detail');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('BorrowDevices', [
            'foreignKey' => 'borrow_device_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Devices', [
            'foreignKey' => 'device_id',
            'joinType' => 'INNER'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator) {
        $validator
                ->allowEmptyString('id', 'create');

        $validator
                ->integer('device_id')
                ->requirePresence('device_id', 'create')
                ->allowEmptyString('device_id', false);

        $validator
                ->scalar('borrow_reason')
                ->allowEmptyString('borrow_reason');

        $validator
                ->scalar('return_reason')
                ->allowEmptyString('return_reason');

        $validator
                ->integer('status')
                ->allowEmptyString('status');

        $validator
                ->date('borrow_date')
                ->requirePresence('borrow_date', 'create')
                ->allowEmptyDateTime('borrow_date', false);

        $validator
                ->date('approved_date')
                ->allowEmptyDateTime('approved_date');

        $validator
                ->date('return_date_expected')
                ->requirePresence('return_date_expected', 'create')
                ->allowEmptyDateTime('return_date_expected', false);

//        $validator
//            ->date('return_date')
//            ->requirePresence('return_date', 'create')
//            ->allowEmptyDateTime('return_date', false);

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

        return $validator;
    }

}
