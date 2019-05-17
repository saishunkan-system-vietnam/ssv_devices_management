<?php

/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */
use Cake\Http\Middleware\CsrfProtectionMiddleware;
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;
use Cake\Routing\Route\DashedRoute;

/**
 * The default class to use for all routes
 *
 * The following route classes are supplied with CakePHP and are appropriate
 * to set as the default:
 *
 * - Route
 * - InflectedRoute
 * - DashedRoute
 *
 * If no call is made to `Router::defaultRouteClass()`, the class used is
 * `Route` (`Cake\Routing\Route\Route`)
 *
 * Note that `Route` does not do any inflections on URLs which will result in
 * inconsistently cased URLs when used with `:plugin`, `:controller` and
 * `:action` markers.
 *
 * Cache: Routes are cached to improve performance, check the RoutingMiddleware
 * constructor in your `src/Application.php` file to change this behavior.
 *
 */
Router::defaultRouteClass(DashedRoute::class);
Router::extensions(['json', 'xml']);

Router::scope('/api/v1/', ['prefix' => 'Api'], function (RouteBuilder $routes) {
    /**
     * Here, we are connecting '/' (base path) to a controller called 'Pages',
     * its action called 'display', and we pass a param to select the view file
     * to use (in this case, src/Template/Pages/home.ctp)...
     */

    // Users
    $routes->connect('user', ['controller' => 'Users', 'action' => 'index', 'allowWithoutToken' => false]);
    $routes->connect('user/profile', ['controller' => 'Users', 'action' => 'updateProfile', 'allowWithoutToken' => true]);
    $routes->connect('user/login', ['controller' => 'Users', 'action' => 'login', 'allowWithoutToken' => true]);
    $routes->connect('user/delete', ['controller' => 'Users', 'action' => 'delete', 'allowWithoutToken' => false]);
    $routes->connect('user/show/:id', ['controller' => 'Users', 'action' => 'view', 'allowWithoutToken' => false], ['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('user/update', ['controller' => 'Users', 'action' => 'edit', 'allowWithoutToken' => false]);

    // $routes->connect('/schedules/', ['controller' => 'Admin/Schedules', 'action' => 'index']);
    
    //Borrow
    $routes->connect('borrow', ['controller' => 'Borrow', 'action' => 'borrowDevices', 'allowWithoutToken' => true]);
    $routes->connect('borrow/view/:id', ['controller' => 'Borrow', 'action' => 'view', 'allowWithoutToken' => true], ['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('borrow/add', ['controller' => 'Borrow', 'action' => 'add', 'allowWithoutToken' => true]);
    $routes->connect('borrow/edit', ['controller' => 'Borrow', 'action' => 'edit', 'allowWithoutToken' => true]);
    $routes->connect('borrow/delete', ['controller' => 'Borrow', 'action' => 'delete', 'allowWithoutToken' => true], ['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('borrow/approve', ['controller' => 'Borrow', 'action' => 'approve', 'allowWithoutToken' => true], ['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('borrow/noapprove', ['controller' => 'Borrow', 'action' => 'noApprove', 'allowWithoutToken' => true], ['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('borrow/returndevice', ['controller' => 'Borrow', 'action' => 'returnDevice', 'allowWithoutToken' => true], ['id' => '\d+', 'pass' => ['id']]);
    $routes->connect('borrow/confirmreturndevice', ['controller' => 'Borrow', 'action' => 'confirmReturnDevice', 'allowWithoutToken' => true], ['id' => '\d+', 'pass' => ['id']]);
    
});