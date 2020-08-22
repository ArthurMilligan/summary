<?php
$json = file_get_contents('../goods.json');
$json=json_decode($json,true);

$message='';
$message.='<h1>Закаказ</h1>';
$message.='<p>Телефон:'.$_POST['ephone'].'</p>';
$message.='<p>Адресс:'.$_POST['edress'].'</p>';
$message.='<p>Клиент:'.$_POST['ename'].'</p>';
$cart=$_POST['cart'];
$sum=0;
foreach ($cart as $id => $count) {
	$message.=$json[$id]['name'].' ---- ';
	$message.=$count.'шт. ---- ';
	$message.=$count*$json[$id]['cost'].'рублей';
	$message.='<br>';
	$sum=$sum+$count*$json[$id]['cost'];
}
$message.='Всего:'.$sum;
print_r($message);
$to='cafe.obedov@mail.ru';
$spectext='<!DOCTYPE HTML><HTML><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$m=mail($to,'Заказ в магазине',$spectext.$message.'</body></html>',$headers);
if($m){echo 'z';}
else{echo 0;}
?>
