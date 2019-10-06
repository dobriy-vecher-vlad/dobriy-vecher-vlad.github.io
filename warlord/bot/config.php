<?php
	$album = 'https://vk.com/album-113958919_252151167';
	$res = parse_url($album);
	$path = substr($res['path'], 6);
	$arr = explode('_', $path);
	$owner_id = $arr[0];
	$album_id = $arr[1];

	$standalone = 'fb97f583727f7c113ebe2140dfce39ee5819871e6c58fcb9827ccdeb5cf96786ccf5ebfc25d82a5aec9a4';
	$group_token = 'fc0d29c92ea2743eb77a7d8238f61c00ad9556fb047354022bef7c6d1ecf8a2262d9ef27ee619188a533c';
	$conf = [
		'standalone' => $standalone,
		'group_token' => $group_token,
		'contorm_token' => 'd50c1cd1',
		'mess' => 'Тест',
		'not_command' => 'Пошёл нахуй',
		'owner_id' => $owner_id,
		'album_id' => $album_id,
		'group_id' => '187299468',
		'apiurl' => 'https://api.vk.com/method/',
		'path' => substr($_SERVER['PHP_SELF'], 0, -2),
		'photos' => 'photos.txt',
		'temp_link' => 'temp_album.txt',
		'random_id' => mt_rand(0000000000, 999999999999),
		'v' => '5.50'
	];
?>