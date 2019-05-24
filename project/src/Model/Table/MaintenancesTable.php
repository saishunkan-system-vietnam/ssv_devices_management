<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Maintenances Model
 *
 * @property \App\Model\Table\DevicesTable|\Cake\ORM\Association\BelongsTo $Devices
 *
 * @method \App\Model\Entity\Maintenance get($primaryKey, $options = [])
 * @method \App\Model\Entity\Maintenance newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Maintenance[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Maintenance|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Maintenance saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Maintenance patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Maintenance[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Maintenance findOrCreate($search, callable $callback = null, $options = [])
 */
class MaintenancesTable extends Table
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

        $this->setTable('maintenances');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Devices', [
            'foreignKey' => 'devices_id',
            'joinType' => 'INNER'
        ]);
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
                ->integer('id')
                ->allowEmptyString('id', 'create');

        $validator
                ->integer('status')
                ->allowEmptyString('status');

        $validator
                ->integer('devices_id')
                ->allowEmptyString('devices_id', False)
                ->requirePresence('devices_id', 'create');

        $validator
                ->dateTime('broken_date')
                ->requirePresence('broken_date', 'create')
                ->allowEmptyDateTime('broken_date',FALSE);

        $validator
                ->dateTime('maintenance_start_date')
                ->allowEmptyDateTime('maintenance_start_date');

        $validator
                ->dateTime('maintenances_end_date')
                ->allowEmptyDateTime('maintenances_end_date');

        $validator
                ->scalar('update_user')
                ->maxLength('update_user', 100)
                ->allowEmptyString('update_user');

        $validator
                ->dateTime('create_time')
                ->allowEmptyDateTime('create_time', false);

        $validator
                ->dateTime('update_time')
                ->allowEmptyDateTime('update_time');

        $validator
                ->boolean('is_deleted')
                ->allowEmptyString('is_deleted', false);

        $validator
                ->scalar('note')
                ->allowEmptyString('note');

        $validator
                ->scalar('maintenances_address')
                ->allowEmptyString('maintenances_address');

        $validator
                ->allowEmptyString('total_payment');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */   

}
