<?php
// Сообщение

$message = "test php mail";

// На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()

$receiver = 'dev.div0@gmail.com';

$message = wordwrap($message, 70);

// Отправляем

if(mail($receiver, 'My Subject', $message)){
    echo 'message sent to '.$receiver;
}
else{
    echo 'error sending message';
}

?>