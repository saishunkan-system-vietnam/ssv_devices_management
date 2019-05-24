<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Maintenance Entity
 *
 * @property int $id
 * @property int $devices_id
 * @property int|null $status
 * @property \Cake\I18n\FrozenTime|null $broken_date
 * @property \Cake\I18n\FrozenTime|null $maintenance_start_date
 * @property \Cake\I18n\FrozenTime|null $maintenances_end_date
 * @property int $notificationer_broken
 * @property string $create_user
 * @property string|null $update_user
 * @property \Cake\I18n\FrozenTime $create_time
 * @property \Cake\I18n\FrozenTime|null $update_time
 * @property bool $is_deleted
 * @property string|null $note
 * @property string|null $maintenances_address
 * @property int|null $total_payment
 *
 * @property \App\Model\Entity\Device $device
 */
class Maintenance extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'devices_id' => true,
        'status' => true,
        'broken_date' => true,
        'maintenance_start_date' => true,
        'maintenances_end_date' => true,
        'notificationer_broken' => true,
        'create_user' => true,
        'update_user' => true,
        'create_time' => true,
        'update_time' => true,
        'is_deleted' => true,
        'note' => true,
        'maintenances_address' => true,
        'total_payment' => true,
        'device' => true
    ];
}
