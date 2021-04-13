$(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
        $('.menu-hide').addClass('menu-hide-show');
    } else {
        $('.menu-hide').removeClass('menu-hide-show');
    }
});

jQuery(document).ready(function () {
    jQuery("form").submit(function () {
        var form_data = jQuery(this).serialize();
        jQuery.ajax({
            type: "POST",
            url: "mailing-form.php",
            data: form_data,
            success: swal({
                title:"Спасибо за заявку!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })
        });
        // $('.order-call-popup').removeClass('order-call-show animate__fadeIn')
        // $('.order-call__icon').removeClass('order-call__icon__none animate__fadeIn')
        // $('.order-close').toggleClass('order-call__icon__none animate__fadeIn')
        // $('html').removeClass('body_fix')
        event.preventDefault();
    });
});
// MAP
// MAP2
//Переменная для включения/отключения индикатора загрузки
var spinner2 = $('.ymap-container2').children('.loader2');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load2 = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp2, myPlacemarkTemp2;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init2 () {
    var myMapTemp2 = new ymaps.Map("map-yandex2", {
        center: [55.542999, 37.485116], // координаты центра на карте
        zoom: 17, // коэффициент приближения карты
        controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp2 = new ymaps.Placemark([55.542999, 37.485116], {
        balloonContent: "Здесь может быть ваш адрес",
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: './img/logo4.png',
        // Размеры метки.
        iconImageSize: [50, 50],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-25, -50],
    });
    myMapTemp2.geoObjects.add(myPlacemarkTemp2); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp2.layers.get(0).get(0);

    // Решение по callback-у для определения полной загрузки карты
    waitForTilesLoad2(layer).then(function() {
        // Скрываем индикатор загрузки после полной загрузки карты
        spinner2.removeClass('is-active');
    });
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad2(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer2(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function() {
                resolve();
            });
        }
    });
}

function getTileContainer2(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript2(url, callback){
    var script = document.createElement("script");

    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Другие браузеры
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap2 = function() {
    $('.ymap-container2').mouseenter(function(){
            if (!check_if_load2) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load2 = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner2.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript2("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init2);
                });
            }
        }
    );
}

$(function() {

    //Запускаем основную функцию
    ymap2();

});