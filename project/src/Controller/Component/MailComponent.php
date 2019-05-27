<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\Mailer\Email;

class MailComponent extends Component
{

    public function sendMail($setTo, $setSubject, $setViewVars, $setTemplate)
    {
        $email = new Email('default');
        $email->setFrom('hoanghung888@gmail.com')
                ->setTo($setTo)
                ->setSubject($setSubject)
                ->setEmailFormat('html')
                ->setViewVars($setViewVars)
                ->viewBuilder()
                ->setTemplate($setTemplate);
        $email->send();
    }

}
