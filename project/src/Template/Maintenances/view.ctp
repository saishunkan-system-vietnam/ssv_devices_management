<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Maintenance $maintenance
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Maintenance'), ['action' => 'edit', $maintenance->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Maintenance'), ['action' => 'delete', $maintenance->id], ['confirm' => __('Are you sure you want to delete # {0}?', $maintenance->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Maintenances'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Maintenance'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Devices'), ['controller' => 'Devices', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Device'), ['controller' => 'Devices', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="maintenances view large-9 medium-8 columns content">
    <h3><?= h($maintenance->id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('Device') ?></th>
            <td><?= $maintenance->has('device') ? $this->Html->link($maintenance->device->name, ['controller' => 'Devices', 'action' => 'view', $maintenance->device->id]) : '' ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Create User') ?></th>
            <td><?= h($maintenance->create_user) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Update User') ?></th>
            <td><?= h($maintenance->update_user) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Id') ?></th>
            <td><?= $this->Number->format($maintenance->id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Status') ?></th>
            <td><?= $this->Number->format($maintenance->status) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Notificationer Broken') ?></th>
            <td><?= $this->Number->format($maintenance->notificationer_broken) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Total Payment') ?></th>
            <td><?= $this->Number->format($maintenance->total_payment) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Broken Date') ?></th>
            <td><?= h($maintenance->broken_date) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Maintenance Start Date') ?></th>
            <td><?= h($maintenance->maintenance_start_date) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Maintenances End Date') ?></th>
            <td><?= h($maintenance->maintenances_end_date) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Create Time') ?></th>
            <td><?= h($maintenance->create_time) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Update Time') ?></th>
            <td><?= h($maintenance->update_time) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Is Deleted') ?></th>
            <td><?= $maintenance->is_deleted ? __('Yes') : __('No'); ?></td>
        </tr>
    </table>
    <div class="row">
        <h4><?= __('Note') ?></h4>
        <?= $this->Text->autoParagraph(h($maintenance->note)); ?>
    </div>
    <div class="row">
        <h4><?= __('Maintenances Address') ?></h4>
        <?= $this->Text->autoParagraph(h($maintenance->maintenances_address)); ?>
    </div>
</div>
