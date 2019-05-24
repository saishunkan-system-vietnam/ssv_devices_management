<?php

namespace RestApi\Controller;

use Cake\Controller\Controller;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\Log\Log;

/**
 * Application Controller
 *
 */
class AppController extends Controller
{

    /**
     * HTTP Status Code
     *
     * @var int
     */
    public $httpStatusCode = 200;

    /**
     * Code value in API response
     *
     * @var string
     */
    private $responseCode = "";

    /**
     * Status value in API response
     *
     * @var string
     */
    public $responseStatus = "";

    /**
     * Response format configuration
     *
     * @var array
     */
    public $responseFormat = [];

    /**
     * API response data
     *
     * @var array
     */
    private $apiResponse = [];

    /**
     * payload value from JWT token
     *
     * @var mixed
     */
    public $jwtPayload = null;

    /**
     * JWT token for current request
     *
     * @var string
     */
    public $jwtToken = "";
    
    /**
     * url log api
     *
     * @var string
     */
    public $url;

    /**
     * date now system
     *
     * @var string
     */
    public $dateNow;

    /**
     * Initialization hook method.
     *
     * @return void
     */
    public function initialize()
    {
        parent::initialize();

        $this->responseFormat = [
            'statusKey' => (null !== Configure::read('ApiRequest.responseFormat.statusKey')) ? Configure::read('ApiRequest.responseFormat.statusKey') : 'status',
            'statusOkText' => (null !== Configure::read('ApiRequest.responseFormat.statusOkText')) ? Configure::read('ApiRequest.responseFormat.statusOkText') : 'OK',
            'statusNokText' => (null !== Configure::read('ApiRequest.responseFormat.statusNokText')) ? Configure::read('ApiRequest.responseFormat.statusNokText') : 'NOK',
            'resultKey' => (null !== Configure::read('ApiRequest.responseFormat.resultKey')) ? Configure::read('ApiRequest.responseFormat.resultKey') : 'result',
            'messageKey' => (null !== Configure::read('ApiRequest.responseFormat.messageKey')) ? Configure::read('ApiRequest.responseFormat.messageKey') : 'message',
            'defaultMessageText' => (null !== Configure::read('ApiRequest.responseFormat.defaultMessageText')) ? Configure::read('ApiRequest.responseFormat.defaultMessageText') : 'Empty response!',
            'errorKey' => (null !== Configure::read('ApiRequest.responseFormat.errorKey')) ? Configure::read('ApiRequest.responseFormat.errorKey') : 'error',
            'defaultErrorText' => (null !== Configure::read('ApiRequest.responseFormat.defaultErrorText')) ? Configure::read('ApiRequest.responseFormat.defaultErrorText') : 'Unknown request!',
            'statusCode' => (null !== Configure::read('ApiRequest.responseFormat.statusCode')) ? Configure::read('ApiRequest.responseFormat.statusCode') : 'code'
        ];

        $this->responseStatus = $this->responseFormat['statusOkText'];
        $this->responseCode = $this->responseFormat['statusCode'];
        
        $this->url = $this->getRequest()->getPath();
        $this->dateNow = date('Y-m-d H:i:s');

        $this->loadComponent('RequestHandler');
        $this->loadComponent('RestApi.AccessControl');
    }

    /**
     * Before render callback.
     *
     * @param Event $event The beforeRender event.
     * @return \Cake\Network\Response|null
     */
    public function beforeRender(Event $event)
    {
        parent::beforeRender($event);

        $this->response->getStatusCode($this->httpStatusCode);

        if (200 != $this->httpStatusCode) {
            $this->responseStatus = $this->responseFormat['statusNokText'];
        }

        $response = [
            $this->responseFormat['statusKey'] => $this->responseStatus,
            $this->responseFormat['statusCode'] = $this->responseCode
        ];

        if (!empty($this->apiResponse)) {
            $response[$this->responseFormat['resultKey']] = $this->apiResponse;
        }

        $this->set('response', $response);
        $this->set('responseFormat', $this->responseFormat);

        return null;
    }

    public function argLog($url, $formdata = null, $message){
        $argsLog = array(
            'url' => $url,
            'formdata' => $formdata,
            'message' => $message
        );
        return $argsLog;
    }
    
    public function returnResponse( $responseCode, $apiResponse)
    {
        $leveLog='error';
        if($responseCode == 200) {
            $leveLog = 'info' ;
        }
        $this->responseCode = $responseCode;
        $this->apiResponse = $apiResponse;
        Log::write($leveLog, $this->argLog($this->url,'', $apiResponse));
       
    }

    public function uploadFile($controllerName){
        $fileName = $_FILES['file']['name'];
        $file_basename = substr($fileName, 0, strripos($fileName, '.')); // get file extention
        $file_ext = substr($fileName, strripos($fileName, '.')); // get file name
        $filesize = $_FILES["file"]["size"];
        $allowed_file_types = array('.png','.jpg','.gif','.jpeg');
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $newfilename = $this->rand_string(50) . $file_ext;
        $uploadPath = WWW_ROOT . 'uploads/files/' . strtolower($controllerName) . DS;
        $uploadFile = $uploadPath . $newfilename;
        move_uploaded_file($_FILES["file"]["tmp_name"], $uploadFile);
        return $newfilename;
    }

    public function deleteImg($filename, $controllerName){
        $uploadPath = WWW_ROOT . 'uploads/files/' . strtolower($controllerName) . DS;
        if (file_exists($uploadPath . $filename))
        {
            unlink($uploadPath . $filename);
        }
    }

    function rand_string( $length ) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $size = strlen( $chars );
        $str = '';
        for( $i = 0; $i < $length; $i++ ) {
            $str .= $chars[ rand( 0, $size - 1 ) ];
        }
        return $str;
    }
}
