	
let sizePin,
    blockMap = document.querySelector('#map'),
    nameTheme = document.querySelector('#map').dataset.theme;

if (window.innerWidth > 1024) {
sizePin = [71, 71];
} else {
sizePin = [46, 46];
}
const listenerScroll = () => {
if (window.scrollY > 500) {
    console.log("Загрузка API Яндекс.Карт...");
    document.removeEventListener('scroll', listenerScroll);

    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.src = '//api-maps.yandex.ru/2.1/?apikey=1e19dd7d-c3f6-4ded-b4b9-472398a1c919&lang=ru_RU';
    
    elem.onload = function () {
        console.log("API загружено, инициализация карты...");
        ymaps.ready(getYaMap);
    };

    document.body.appendChild(elem);
}
};

document.addEventListener('scroll', listenerScroll);

function getYaMap() {
if (typeof ymaps === "undefined") {
    console.error("Ошибка: API Яндекс.Карт не загрузилось!");
    return;
}
console.log("Инициализация карты...");
var myMap = new ymaps.Map("map", { center: [55.628937, 37.469853], zoom: 17 });

ymaps.geocode("МКАД, 44-й километр, 1Вс2").then(function (res) {
    if (res.geoObjects.getLength() === 0) {
        console.error("Ошибка: не удалось найти координаты!");
        return;
    }
    var coord = res.geoObjects.get(0).geometry.getCoordinates();

    var myPlacemark = new ymaps.Placemark(coord, null, {
        iconLayout: 'default#image',
        // iconImageHref: `../themes/${nameTheme}/assets/images/logo-5.svg`,
        iconImageHref: `/assets/img/svg/map-pin.svg`,
        iconImageSize: sizePin,
        iconImageOffset: [-30, -70],
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.setCenter(coord);
}).catch(error => console.error("Ошибка geocode:", error));
}
