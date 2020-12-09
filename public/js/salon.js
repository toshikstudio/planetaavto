let coords=[];
let user_coords=[];
const imgsize=[30,30];

// добавление одной метки
function addPlacemark(coords,pict,iconLayout) {
    // создаем метку
    let usualContentLayout = ymaps.templateLayoutFactory.createClass(iconLayout);
    let myPlacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: coords
        },
        properties: {
            balloonPanelMaxMapArea: 0
        }},
        {
            iconLayout: "default#image",
            iconImageHref: location.origin+"/img/"+pict,
            iconImageSize: imgsize,
            iconImageOffset: [0,-30],
            balloonLayout: usualContentLayout,
            hideIconOnBalloonOpen: false,
            zIndex: 5,
            zIndexHover: 8,
            draggable: false
        }
    );
    yaMap.geoObjects.add(myPlacemark);
}

function fillUserPlace() {
    let location = ymaps.geolocation.get({
        provider: 'yandex'
    });

    location.then(
      function(result) {
        user_coords=result.geoObjects.position;
        iconLayout=document.querySelector('.navigator-container').innerHTML;
        addPlacemark(user_coords,'navigator.png',iconLayout);
      },
      function(err) {
        console.log('Ошибка: ' + err)
      }
    );
}
$(document).ready(function(){
    $(".slide-big").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        items: 1
    });
    $(".slide-small").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        items: 3
    });
    // $('#build_route').click(function() {
    //     let div_map=document.querySelector("#modal_yamap");
    //     div_map.innerHTML='';
    //     yaMap = new ymaps.Map(div_map, {center: coords, zoom: 12, controls: ["zoomControl","fullscreenControl","typeSelector","rulerControl"]});
    //     addPlacemark(coords,'yalabel.png','');
    //     fillUserPlace();
    //     let multiRoute = new ymaps.multiRouter.MultiRoute({   
    //         referencePoints: [
    //             [user_coords],
    //             [coords]
    //         ]
    //     }, {
    //           boundsAutoApply: false
    //     });
    //     yaMap.geoObjects.add(multiRoute);        

    //     $('#yamapModal').modal();
    // })
    $('#yataxi').click(function() {
        
    })
    $.ajax({
      url: location.origin+"/api?func=getcoords&id="+$('.right-title').data('id'),
      cache: false
    })
      .done(function( data1 ) {
        coords=JSON.parse(data1);
      })
});

ymaps.ready().then(function () {
    let location = ymaps.geolocation.get({
        provider: 'yandex'
        });

    location.then(
      function(result) {
        user_coords=result.geoObjects.position;
      },
      function(err) {
        console.log('Ошибка: ' + err)
      }
    );
})

