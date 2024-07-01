var data = {
	'custom': false,
	'title': 'Имена внешних носителей информации',
	'description': '',
	'tag': '2.3',
	'text': `
		<p>Диски, на которых хранится информация в компьютере, имеют свои имена – каждый диск назван буквой латинского алфавита, а затем ставится двоеточие. Так, для дискет всегда отводятся буквы A: и B:. Логические диски винчестера именуются, начиная с буквы C:. После всех имен логических дисков следуют имена дисководов для компакт-дисков. Например, установлены: дисковод для дискет, винчестер, разбитый на 3 логических диска и дисковод для компакт-дисков. Определить буквы всех носителей информации. A: – дисковод для дискет;
		</p><ul line>
		<li>C:, D:, E: – логические диски винчестера;</li>
		<li>F: – дисковод для компакт-дисков.</li>
		</ul>
		<p>Полное имя файла. Уникальность имени файла обеспечивается тем, что полным именем файла считается собственное имя файла вместе с путем доступа к нему. Понятно, что в этом случае на одном носителе не может быть двух файлов с тождественными полными именами.
		</p><span class="decoration"></span><p>Пример записи полного имени файла:
		</p><ul line>
		<li><имя носителя>/<имя каталога-1>/…/<имя каталога-М>/<собственное имя файла></li>
		<li>Вот пример записи двух файлов, имеющих одинаковое собственное имя и размещенных на одном носителе, но отличающихся путем доступа, то есть полным именем. Для наглядности имена каталогов (папок) напечатаны прописными буквами.</li>
		<li>D: Документы/Сведения о студентах/2004—05 учебный год/Результаты аттестации. doc</li>
		<li>D: Деканат/Аттестация студентов/Результаты аттестации. doc</li>
		</ul>
		<div class="img" style="background-image: url(image/img2.png);"></div>
	`
}
var isScriptLoad = true;