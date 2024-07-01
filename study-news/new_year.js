// Парсит общее кол-во секунд и возвращает объект с кол-вом дней, часов, минут, секунд ------------
function getTimer( count ){
    var timer = new Object();
    timer.seconds = count % 60;
    count = (count - timer.seconds) / 60;
    timer.minutes = count % 60;
    count = (count - timer.minutes) / 60;
    timer.hours = count % 24;
    timer.days = (count - timer.hours) / 24;
    return timer;
}

// Выводит таймер на страницу ---------------------------------------------------------------------
function showTimer( timer ){
    $('#new_year').html(
        '<div class="timer days">' + timer.days.toString() +
        '</div> : <div class="timer hours">' +
        (timer.hours < 10 ? '0' : '') +
        timer.hours.toString() +
        '</div> : <div class="timer minutes">' +
        (timer.minutes < 10 ? '0' : '') +
        timer.minutes.toString() +
        '</div> : <div class="timer seconds">' +
        (timer.seconds < 10 ? '0' : '') +
        timer.seconds.toString() + '</div>'
    );
}

// GO-GO-GO ---------------------------------------------------------------------------------------
$(document).ready( function(){
    var now =     new Date();                                        // Здесь нужно получить точное время
    var newyear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0); // 01.01.2011 00:00:00
    //var newyear =     new Date();                                  // Конец таймера для настроек
    
    var counter = newyear.getTime() - now.getTime();                 // Кол-во милисекунд до Нового Года
    var timeout = counter % 1000;                                    // Милисекунды до синхронного вывода целых секунд
    counter = (counter - timeout) / 1000;                            // Кол-во секунд до Нового Года
    
    showTimer(getTimer(counter + 1));                                // Вывод ближайшей целой секунды
    setTimeout(function(){
        showTimer(getTimer(counter));                                // Синхронный вывод 1-й целой секунды
        var intervalID = setInterval(function(){
            counter--;
            if( counter > 0 ){
                showTimer(getTimer(counter));                        // Синхронный вывод n-й целой секунды
            }else{
                $('#new_year').text("Ура!");
                clearInterval(intervalID);
            }
        }, 1000);
    }, timeout);
    
});
