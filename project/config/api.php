<?php
/**
 * Created by HungHT.
 * Email: hunght@saisystem.vn
 * Date: 5/8/2019
 * Time: 3:49 PM
 */


return [
    'ApiRequest' => [
        'debug' => false,
        'responseType' => 'json',
        'xmlResponseRootNode' => 'response',
        'responseFormat' => [
            'statusKey' => 'status',
            'statusOkText' => 'OK',
            'statusCode' => 'code',
            'statusNokText' => 'NOK',
            'resultKey' => 'payload',
            'messageKey' => 'message',
            'defaultMessageText' => 'Empty response!',
            'errorKey' => 'error',
            'defaultErrorText' => 'Unknown request!'
        ],
        'log' => true,
        'logOnlyErrors' => true,
        'logOnlyErrorCodes' => [404, 500],
        'jwtAuth' => [
            'enabled' => true,
            'cypherKey' => 'R1a#2%dY2fX@3g8r5&s4Kf6*sd(5dHs!5gD4s',
            'tokenAlgorithm' => 'HS256'
        ],
        'cors' => [
            'enabled' => true,
            'origin' => '*',
            'allowedMethods' => ['GET', 'POST', 'OPTIONS'],
            'allowedHeaders' => ['Content-Type, Authorization, Accept, Origin'],
            'maxAge' => 2628000
        ]
    ]
];