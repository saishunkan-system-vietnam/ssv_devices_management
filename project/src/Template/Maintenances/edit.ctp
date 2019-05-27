<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Maintenance $maintenance
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $maintenance->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $maintenance->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Maintenances'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Devices'), ['controller' => 'Devices', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Device'), ['controller' => 'Devices', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="maintenances form large-9 medium-8 columns content">
    <?= $this->Form->create($maintenance) ?>
    <fieldset>
        <legend><?= __('Edit Maintenance') ?></legend>
        <?php
            echo $this->Form->control('devices_id', ['options' => $devices]);
            echo $this->Form->control('status');
            echo $this->Form->control('broken_date', ['empty' => true]);
            echo $this->Form->control('maintenance_start_date', ['empty' => true]);
            echo $this->Form->control('maintenances_end_date', ['empty' => true]);
            echo $this->Form->control('notificationer_broken');
            echo $this->Form->control('create_user');
            echo $this->Form->control('update_user');
            echo $this->Form->control('create_time');
            echo $this->Form->control('update_time', ['empty' => true]);
            echo $this->Form->control('is_deleted');
            echo $this->Form->control('note');
            echo $this->Form->control('maintenances_address');
            echo $this->Form->control('total_payment');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
