<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * MaintenancesFixture
 */
class MaintenancesFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'devices_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => 'thiết bị bảo trì', 'precision' => null, 'autoIncrement' => null],
        'status' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => '0', 'comment' => '0- đợi bảo trì, 1-đang bảo trì, 2-đã bảo trì, 3-đã bảo trì nhưng vẫn hỏng', 'precision' => null, 'autoIncrement' => null],
        'broken_date' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => 'ngày bị hỏng', 'precision' => null],
        'maintenance_start_date' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => 'ngày bắt đầu bảo trì', 'precision' => null],
        'maintenances_end_date' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => 'ngày bảo trì xong', 'precision' => null],
        'notificationer_broken' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => 'người báo hỏng', 'precision' => null, 'autoIncrement' => null],
        'create_user' => ['type' => 'string', 'length' => 100, 'null' => false, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'update_user' => ['type' => 'string', 'length' => 100, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'create_time' => ['type' => 'datetime', 'length' => null, 'null' => false, 'default' => 'CURRENT_TIMESTAMP', 'comment' => '', 'precision' => null],
        'update_time' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'is_deleted' => ['type' => 'boolean', 'length' => null, 'null' => false, 'default' => '0', 'comment' => '0- bình thường, 1- đã xóa', 'precision' => null],
        'note' => ['type' => 'text', 'length' => null, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => 'ghi chú tình trạng hỏng', 'precision' => null],
        'maintenances_address' => ['type' => 'text', 'length' => null, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => 'địa chỉ nơi bảo trì', 'precision' => null],
        'total_payment' => ['type' => 'biginteger', 'length' => 20, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => 'tổng tiền sửa chữa', 'precision' => null, 'autoIncrement' => null],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
        ],
        '_options' => [
            'engine' => 'InnoDB',
            'collation' => 'utf8_general_ci'
        ],
    ];
    // @codingStandardsIgnoreEnd
    /**
     * Init method
     *
     * @return void
     */
    public function init()
    {
        $this->records = [
            [
                'id' => 1,
                'devices_id' => 1,
                'status' => 1,
                'broken_date' => '2019-05-23 02:23:08',
                'maintenance_start_date' => '2019-05-23 02:23:08',
                'maintenances_end_date' => '2019-05-23 02:23:08',
                'notificationer_broken' => 1,
                'create_user' => 'Lorem ipsum dolor sit amet',
                'update_user' => 'Lorem ipsum dolor sit amet',
                'create_time' => '2019-05-23 02:23:08',
                'update_time' => '2019-05-23 02:23:08',
                'is_deleted' => 1,
                'note' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
                'maintenances_address' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
                'total_payment' => 1
            ],
        ];
        parent::init();
    }
}
