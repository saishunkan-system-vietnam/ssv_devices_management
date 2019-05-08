<?php

Router::scope('/api/v1/', ['prefix' => 'Api'], function (RouteBuilder $routes) {
    /**
     * Here, we are connecting '/' (base path) to a controller called 'Pages',
     * its action called 'display', and we pass a param to select the view file
     * to use (in this case, src/Template/Pages/home.ctp)...
     */

    // Users
    $routes->connect('user', ['controller' => 'Users', 'action' => 'index']);
    $routes->connect('user/login', ['controller' => 'Users', 'action' => 'login']);

    // $routes->connect('/schedules/', ['controller' => 'Admin/Schedules', 'action' => 'index']);
});