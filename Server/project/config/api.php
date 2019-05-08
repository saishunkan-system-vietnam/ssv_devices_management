<?php
/**
 * Created by HungHT.
 * Email: hunght@saisystem.vn
 * Date: 5/8/2019
 * Time: 3:49 PM
 */


return [
    'ApiRequest' => [
        'cors' => [
            'enabled' => true,
            'origin' => '*',
            'allowedMethods' => ['GET', 'POST', 'OPTIONS'],
            'allowedHeaders' => ['Content-Type, Authorization, Accept, Origin'],
            'maxAge' => 2628000
        ],
        'log' => true,
    ]
];