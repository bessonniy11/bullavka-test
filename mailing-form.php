<?php
$email = $_POST['email'];


$token = "1550791921:AAGdAtiCKyRdwMaCavWM9LkPbXRLEzyxZ2k";
$chat_id = "-385590912";
$sitename = "http://bul-lavka/";
$null = "";

$arr = array(
    'Пользователь с сайта: ' => $sitename,
    'хочет подписаться на рассылку новинок акций и новостей' => $null,
    'email: ' => $email
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>