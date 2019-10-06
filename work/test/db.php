<?php
    $count = trim(urldecode($_GET['count']));
	$tap = trim(urldecode($_GET['tap']));
	if (isset($_GET['count'])) {
		if ($count == '') $count = date('dmY');
		$f = fopen('base.txt', 'w+');
		fwrite($f, $count.'|'.$tap);
		fclose($f);
		echo 'Успешно сохранено!';
	} else {
		$f = file('base.txt');
		for ($i = 0; $i < 1; $i+=1) {
			$tmp = explode('|', $f[$i]);
			echo '{"count" : "'.$tmp[0].'", "tap" : "'.$tmp[1].'"}';
		}
	}
?>