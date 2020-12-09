let yaMap;
const imgsize=[30,30];
let usualIconLayout;
let sidebarmovable=false;

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

function baloonClick(id) {
    let elem=document.querySelector('.sidebar');
    let wwidth=window.innerWidth;
    let wheight=window.innerHeight;
    $.ajax({
      url: location.origin+"/api?func=getsalondata&id="+id,
      cache: false
    })
      .done(function( data1 ) {
        let sidebar_margin=30;
        if (window.innerWidth<=768) {
            sidebar_margin=0;
        }
        console.log(sidebar_margin);
        let salon=JSON.parse(data1);
        let x=salon.map_sizex;
        let y=salon.map_sizey;
        let ratio=1;
        if (y>wheight) {
            ratio=(wheight-sidebar_margin)/y;
        }
        x=Math.round(x*ratio,0);
        y=Math.round(y*ratio,0);
        $('.sidebar img').css('width',x)
        .css('height',y)
        .attr('src',salon.map_path);
        // здесь нарисуем метки
        let sticks=salon.labels
        addSticks(sticks,'.sidebar-big',ratio,true);        
        if (x<(wwidth-sidebar_margin)) {
            elem.style.left=(wwidth-x)+'px';
        }else{
            elem.style.left=sidebar_margin+'px';
        }
      })
    // прочитаем данные салона по аяксу
    // определим ширину картинки
    // если она превышает innerwidth тогда обожмем ее получим ratio
    // по этому ratio пересчитаем все координаты меток
    // отрисуем метки
    // по картинке определим ширину плана
    // добавим саму картинку
    // нарисуем метки
    // определим левые координаты сайдбара
    // и выкатим его
}

function closeSidebar() {
    let elem=document.querySelector('.sidebar');
    let cont=elem.querySelector('.sidebar-content');
    let sticks=cont.querySelectorAll('.stick-env');
    sticks.forEach((elem1)=>elem1.remove());
    elem.style.left='100vw'
}

function fillMap() {
    $.ajax({
      url: location.origin+"/api?func=getsalons",
      cache: false
    })
      .done(function( data1 ) {
        let salons=JSON.parse(data1);
        salons.forEach((elem,i,arr)=>{
            let bal_cont=document.querySelector('.baloon-container');
            let bal_text=bal_cont.querySelector('.baloon-text');
            bal_text.innerHTML='';
            elem.features.forEach((feature,j,arr)=>{
                let p = document.createElement("p");
                p.classList.add('baloon-features');
                p.innerHTML=feature;
                bal_text.append(p);
            })
            let p = document.createElement("p");
            p.classList.add('baloon-address');
            p.innerHTML=elem.address;
            bal_text.append(p);

            let bal_footer=bal_cont.querySelector('.baloon-footer');
            bal_footer.innerHTML=elem.name;
            bal_footer.setAttribute('onclick','baloonClick('+elem.id+')');
            //bal_footer.setAttribute('href',elem.href);
            bal_footer.setAttribute('data-id',elem.id);
            usualIconLayout=bal_cont.innerHTML;
            addPlacemark(elem.coords,'yalabel.png',usualIconLayout);
        })
      });

}

function fillUserPlace() {
    let location = ymaps.geolocation.get({
        provider: 'browser'
    });

    location.then(
      function(result) {
        coords=result.geoObjects.position;
        iconLayout=document.querySelector('.navigator-container').innerHTML;
        addPlacemark(coords,'navigator.png',iconLayout);
      },
      function(err) {
        console.log('Ошибка: ')
        console.log(err);
      }
    );
}

ymaps.ready().then(function () {
    let div_map=document.querySelector("#yamap");
    let coords=[55.159897, 61.402554]; // Челябинск

    let map_level;
    if (window.matchMedia("(max-width: 520px)").matches) {
        map_level=11;
    }else{
        map_level=12;
    }
    yaMap = new ymaps.Map(div_map, {center: coords, zoom: map_level, controls: ["zoomControl","fullscreenControl","typeSelector","rulerControl"]});

    // убираем балун при клике в другое место карты
    yaMap.events.add('balloonopen', function (e) {
        yaMap.events.add('click', function (e) {
            if(e.get('target') === yaMap) {
                yaMap.balloon.close();
            }
        });

    });
    fillMap();
    fillUserPlace();
    if (location.search!="") {
        let long=0,lat=0;
        let param_str=location.search.replace('?',"");
        params=param_str.split(',');
        params.forEach((elem)=>{
            keyvalue=elem.split('=');
            if (keyvalue.length>1) {
                key=keyvalue[0];
                value=keyvalue[1];
                if (key=='lat') {
                    lat=parseFloat(value);
                }
                if (key=='long') {
                    long=parseFloat(value);
                }
            }
        })
        if (long>0 && lat>0) {
            coords=[lat,long];
            let location = ymaps.geolocation.get({
                provider: 'browser'
                });

            location.then(
              function(result) {
                user_coords=result.geoObjects.position;
                addPlacemark(coords,'yalabel.png','');
                let multiRoute = new ymaps.multiRouter.MultiRoute({   
                    referencePoints: [
                        [user_coords],
                        [coords]
                    ]
                }, {
                      boundsAutoApply: false
                });
                console.log(user_coords);
                yaMap.geoObjects.add(multiRoute);        

              },
              function(err) {
                console.log('Ошибка: ' + err)
              }
            );
        }
    }


})

$(document).ready(function () {
    $('.sidebar-close').click(function () {
        closeSidebar();
    });
    let globalX=0;
    let big=document.querySelector('.sidebar-big')
    big.style.left="0px";
    big.addEventListener('mousedown',function (e) {
        sidebarmovable=true;
    })
    big.addEventListener('mouseup',function () {
        sidebarmovable=false;
    })
    big.addEventListener('touchstart',function (e) {
        if (e.target.tagName=="IMG") {
            e.preventDefault();
            sidebarmovable=true;
            globalX=e.touches[0].pageX;
        }
    })
    big.addEventListener('touchend',function (e) {
        if (e.target.tagName=="IMG") {
            e.preventDefault();
            sidebarmovable=false;
        }
    })
    big.addEventListener('touchmove',function(e) {
        if (sidebarmovable) {
            let currentX=e.touches[0].pageX;
            let movementX=currentX-globalX;
            globalX=currentX;
            let rect=document.querySelector('.sidebar-content').getBoundingClientRect();
            let rectbig=document.querySelector('.sidebar-big').getBoundingClientRect();
            let coordX=parseInt(big.style.left);
            if (coordX==NaN) {
                coordX=0;
            }
            coordX=coordX+movementX;
            if (coordX>0) {
                coordX=0;
            }
            if (rect.width-coordX>rectbig.width) {
                coordX=rect.width-rectbig.width;
            }
            big.style.left=coordX+'px';
        }
    })
    big.addEventListener('mousemove',function (e) {
        if (sidebarmovable) {
            let rect=document.querySelector('.sidebar-content').getBoundingClientRect();
            let rectbig=document.querySelector('.sidebar-big').getBoundingClientRect();
            let coordX=parseInt(big.style.left);
            if (coordX==NaN) {
                coordX=0;
            }
            coordX=coordX+e.movementX;
            if (coordX>0) {
                coordX=0;
            }
            if (rect.width-coordX>rectbig.width) {
                coordX=rect.width-rectbig.width;
            }
            big.style.left=coordX+'px';
        }
    })
    document.querySelector('.sidebar-big').ondragstart=function(e) {
        return false;
    }

    templ=document.querySelector('.stick-template');
})