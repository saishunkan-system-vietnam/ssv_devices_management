<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Maintenance[]|\Cake\Collection\CollectionInterface $maintenances
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('New Maintenance'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Devices'), ['controller' => 'Devices', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Device'), ['controller' => 'Devices', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="maintenances index large-9 medium-8 columns content">
    <h3><?= __('Maintenances') ?></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><?= $this->Paginator->sort('id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('devices_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('status') ?></th>
                <th scope="col"><?= $this->Paginator->sort('broken_date') ?></th>
                <th scope="col"><?= $this->Paginator->sort('maintenance_start_date') ?></th>
                <th scope="col"><?= $this->Paginator->sort('maintenances_end_date') ?></th>
                <th scope="col"><?= $this->Paginator->sort('notificationer_broken') ?></th>
                <th scope="col"><?= $this->Paginator->sort('create_user') ?></th>
                <th scope="col"><?= $this->Paginator->sort('update_user') ?></th>
                <th scope="col"><?= $this->Paginator->sort('create_time') ?></th>
                <th scope="col"><?= $this->Paginator->sort('update_time') ?></th>
                <th scope="col"><?= $this->Paginator->sort('is_deleted') ?></th>
                <th scope="col"><?= $this->Paginator->sort('total_payment') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($maintenances as $maintenance): ?>
            <tr>
                <td><?= $this->Number->format($maintenance->id) ?></td>
                <td><?= $maintenance->has('device') ? $this->Html->link($maintenance->device->name, ['controller' => 'Devices', 'action' => 'view', $maintenance->device->id]) : '' ?></td>
                <td><?= $this->Number->format($maintenance->status) ?></td>
                <td><?= h($maintenance->broken_date) ?></td>
                <td><?= h($maintenance->maintenance_start_date) ?></td>
                <td><?= h($maintenance->maintenances_end_date) ?></td>
                <td><?= $this->Number->format($maintenance->notificationer_broken) ?></td>
                <td><?= h($maintenance->create_user) ?></td>
                <td><?= h($maintenance->update_user) ?></td>
                <td><?= h($maintenance->create_time) ?></td>
                <td><?= h($maintenance->update_time) ?></td>
                <td><?= h($maintenance->is_deleted) ?></td>
                <td><?= $this->Number->format($maintenance->total_payment) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['action' => 'view', $maintenance->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['action' => 'edit', $maintenance->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $maintenance->id], ['confirm' => __('Are you sure you want to delete # {0}?', $maintenance->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('first')) ?>
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
            <?= $this->Paginator->last(__('last') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(['format' => __('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')]) ?></p>
    </div>
</div>
