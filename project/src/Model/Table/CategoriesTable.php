<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Categories Model
 *
 * @method \App\Model\Entity\Category get($primaryKey, $options = [])
 * @method \App\Model\Entity\Category newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Category[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Category|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Category saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Category patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Category[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Category findOrCreate($search, callable $callback = null, $options = [])
 */
class CategoriesTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('categories');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');
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
                ->integer('brands_id', 'Hãng sản xuất không hợp lệ.')
                ->requirePresence('brands_id', 'create', 'Chọn hãng sản xuất để tiếp tục.')
                ->allowEmptyString('brands_id', false, 'Chọn hãng sản xuất để tiếp tục.');

        $validator
                ->integer('id_parent')
                ->requirePresence('id_parent', 'Chọn Loại bố để tiếp tục.')
                ->allowEmptyString('id_parent', false, 'Chọn Loại bố để tiếp tục.');

        $validator
                ->scalar('category_name')
                ->maxLength('category_name', 100,'Tên loại thiết bị không được phép vượt quá 100 ký tự.')
                ->requirePresence('category_name', 'create','Nhập tên loại để tiếp tục.')
                ->allowEmptyString('category_name', false,'Nhập tên loại đẻ tiếp tục.');

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
