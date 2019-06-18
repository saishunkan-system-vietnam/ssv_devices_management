<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Brands Model
 *
 * @property \App\Model\Table\DevicesTable|\Cake\ORM\Association\HasMany $Devices
 *
 * @method \App\Model\Entity\Brand get($primaryKey, $options = [])
 * @method \App\Model\Entity\Brand newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Brand[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Brand|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Brand saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Brand patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Brand[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Brand findOrCreate($search, callable $callback = null, $options = [])
 */
class BrandsTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('brands');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('Devices', [
            'foreignKey' => 'brand_id'
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
                ->nonNegativeInteger('id')
                ->allowEmptyString('id', 'create');

        $validator
                ->scalar('brand_name')
                ->maxLength('brand_name', 100, 'Tên thương hiệu không thể nhập quá 100 ký tự.')
                ->requirePresence('brand_name', 'create', 'Nhập tên thương hiệu để tiếp tục.')
                ->allowEmptyString('brand_name', false, 'Tên thương hiệu không được bỏ trống.');

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
