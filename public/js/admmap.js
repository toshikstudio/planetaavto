class MsgBox {
    constructor() {
        this.msgBoxID='msgBoxModal';
        this.confirmBoxID='confirmModal';
    }
    openConfirm(params) {
        let modal=$('#confirmModal');
        modal.find('.msgbox').html(params.question);
        modal.find('.msgbox-confirm').html(params.confirm);
        modal.find('.msgbox-confirm').click(function (e) {
            $(this).parent().parent().parent().parent().modal('hide');
            params.action.call();
            $(this).unbind(e);
        });
        modal.find('.msgbox-cancel').html(params.cancel);
        modal.modal();
    }
    
    openMsgbox(params) {
        let modal=$('#msgboxModal');
        modal.find('.msgbox').html(params.message);
        modal.modal();
    }    
}

let msgbox=new MsgBox;

const imgsize=[30,30];
let yaMap;
let subsalons=[];
let tableSettings={
    selector: 'table.props',
    rows: 0,
    columns: [
        {title: 'Характеристика',
         fieldname: 'char',
         fieldtype: 'numeric',
         inputname: 'char',
         nomore: true,
         width: 'calc(100% - 40px)'
        },
        {fieldtype: '_del',
         width: '40px'
        }
    ]
};

function addPlaceMark(coordinates) {
    let myPlacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: coordinates
        },
        properties: {}
        },
        {
            iconLayout: "default#image",
            iconImageHref: location.origin+"/img/yalabel.png",
            iconImageSize: imgsize,
            iconImageOffset: [0,-30],
            draggable: true
        }
    );
	myPlacemark.events.add('dragend', function(e){
		let coord = e.get('target').geometry.getCoordinates();
        $('input[name="latitude"]').val(coord[0]);
        $('input[name="longitude"]').val(coord[1]);
	});    
    yaMap.geoObjects.removeAll();
    yaMap.geoObjects.add(myPlacemark);
    yaMap.panTo(coordinates);
}

function addressProcessing(addr) {
    ymaps.geocode(addr).then(
        function (res) {
            let mapCenter = res.geoObjects.get(0).geometry.getCoordinates();
            addPlaceMark(mapCenter);
            $('input[name="latitude"]').val(mapCenter[0]);
            $('input[name="longitude"]').val(mapCenter[1]);

        }
    );
}

function setVisibility() {
    let val_field=$('.radio-group input[type="hidden"]');
    if (parseInt(val_field.val())==1) {
        $('.coords-wrapper').css('display','block');
        $('.photos-block').css('display','none');
        $('.features-block').css('display','block');
        $('.video-wrapper').css('display','none');
        $('.salon-map-wrapper').css('display','block');
        $('.select-group').css('display','none');
    }else if (parseInt(val_field.val())==2) {
        $('.coords-wrapper').css('display','none');
        $('.photos-block').css('display','block');
        $('.features-block').css('display','none');
        $('.video-wrapper').css('display','block');
        $('.salon-map-wrapper').css('display','none');
        $('.select-group').css('display','block');
    }

}

function validation() {
    let good=true;
    let validUsual= (selector)=>{
        inp=$(selector);
        if (inp.val()=="") {
            inp.closest('fieldset').addClass('is-invalid');
            good=false;
        }
    }
    validUsual('input[name="name"]');
    validUsual('input[name="address"]');
    validUsual('input[name="worktime"]');
    validUsual('input[name="phone"]');
    radio_group=$('fieldset.radio-group');
    inp_type=radio_group.find('input[name="type"]');
    if (inp_type.val()!="1" && inp_type.val()!="2") {
        radio_group.addClass('is-invalid');
        good=false
    }
    if (parseInt(inp_type.val())==2) {
        sel=$('select[name="parent_id"]');
        if (parseInt(sel.val())==0) {
            sel.closest('fieldset').addClass('is-invalid');
            good=false;
        }
    }
    if (!good) {
        msgbox.openMsgbox({
            message: 'Не все обязательные поля заполнены'
        })
    }
    return good;
}

function afterValidation() {
    let handleUsualEvent=(e)=>{
        if ($(e.target).val()!="") {
            $(e.target).closest('fieldset').removeClass('is-invalid');
        }
    }
    $('input[name="name"]').change(handleUsualEvent);
    $('input[name="address"]').change(handleUsualEvent)
    $('input[name="worktime"]').change(handleUsualEvent)
    $('input[name="phone"]').change(handleUsualEvent)
    $('input[type="radio"]').change(function () {
        $(this).closest('fieldset').removeClass('is-invalid');
    })
    $('select[name="parent_id"]').change(function () {
        $(this).closest('fieldset').removeClass('is-invalid');
    })
}

ymaps.ready().then(function () {
	var suggestView = new ymaps.SuggestView('address');    
    let div_map=document.querySelector("#adm_yamap");
    let coords=[55.159897, 61.402554];
    yaMap = new ymaps.Map(div_map, {center: coords, zoom: 13, controls: ["zoomControl","fullscreenControl","typeSelector","rulerControl"]});
	let latitude =parseFloat($('input[name="latitude"]').val());
	let longitude=parseFloat($('input[name="longitude"]').val());
	if (latitude>0 && longitude>0) {
		coords=[latitude,longitude];
        addPlaceMark(coords);
	}
})

$(document).ready(function () {
    // считываем подсалоны
    let salon_id=$('#salon_id').val();
    $.ajax({
      url: location.origin+"/api?func=getsubsalons&id="+salon_id,
      cache: false
    })
      .done(function( data1 ) {
        subsalons=JSON.parse(data1);
      });
    // обрабатываем смену адреса
	$('#address').change(function () {
		console.log($(this).val());
		addressProcessing($(this).val())
	});
    // инициализируем wisywig редактор
	ClassicEditor
		.create( document.querySelector( '#description' ), {
            heading: {
                options: [
                    { model: 'paragraph', title: 'Обычный текст', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'ck-heading_heading2' }
                ]
            },
            height: '300px',
            removePlugins: [ 'Link' ],
            } )	
		.then( editor => {
			window.editor = editor;
			window.editor.setData()
		} )
		.catch( err => {
			console.error( err.stack );
        } );
    // инициализируем таблицу фичей
    if ($('#features_input').val()!='') {
        let tbl=JSON.parse($('#features_input').val());
        tableSettings.content=tbl;
    }
    smartTableInit(tableSettings);
    $('.props-btn-add').click(function () {
        addString($('table.props tbody'),tableSettings,{});
    });
    $('.btn-submit').click(function () {
        if (!validation()) {
            return;
        }
        let features=saveTable(tableSettings);
        $('input[name="features"]').val(JSON.stringify(features));
        saveSticks();
        $("form.form-horizontal").submit();
    });
    $('input[name="mapfile"]').change(function () {
        $('.map-image').html('');
        $('.map-buttons').html('');
        addMapButtons();
        let img=appendElem($('.map-image'),'img');
        img.css('width','100%');
        rect=img[0].getBoundingClientRect();
        showPhoto(img,$(this),rect.width);
        // повторно вычисляем размеры фотографии
        setTimeout(()=>{
            rect=img[0].getBoundingClientRect();
            $('input[name="map_sizex"]').val(parseInt(img.css('width')));
            $('input[name="map_sizey"]').val(parseInt(img.css('height')));
        },200);
    });
    templ=document.querySelector('.stick-template');
    labels=document.querySelector('input[name="labels"]');
    if (labels.value!="") {
        sticks=JSON.parse(labels.value);
        console.log(sticks);
        addSticks(sticks,".map-image",1);    
    }
    if ($('.map-image').html()!='') {
        addMapButtons();
    }
    $('.video-add').click(function () {
        let new_video_number=$('input.video-ref').length;
        let video_block=appendElem($('.video-container'),'div');
        video_block.addClass('video-block');
        video_block.html($('.video-template').html());
        video_block.find('iframe').css('display','none');
        video_block.find('input').attr('name','video'+new_video_number);
        video_block.find('input').change(function () {
            let iframe=video_block.find('iframe')
            let ref=$(this).val();
            ref=ref.replace('watch?v=','embed/');
            iframe.attr('src',ref);
            iframe.css('display','block');
        })
    })
    $('.video-block').each((i,elem)=>{
        let iframe=$(elem).find('iframe');
        let ref=iframe.attr('src').replace('watch?v=','embed/');
        iframe.attr('src',ref);
    })
    $('.video-del').click(function () {
        $(this).closest('.video-block').remove();
    })

    $('.radio-group').each((i,elem)=>{
        let val_field=$(elem).find($('input[type="hidden"]'));
        $(elem).find('input[type="radio"]').each((i,radio_elem)=>{
            if ($(radio_elem).data('value')==val_field.val()) {
                $(radio_elem).prop("checked",true);
            }else{
                $(radio_elem).prop("checked",false);
            }
        })
        $(elem).find('input[type="radio"]').click(function () {
            $(elem).find('input[type="radio"]').each((i,radio_elem)=>{
                $(radio_elem).prop("checked",false);
            })
            $(this).prop("checked",true);
            val_field.val($(this).data('value'));
            setVisibility();
        })        
    })
    $('select[name="parent_id"]').change(function () {
        let salon_id=$(this).val();
        $.ajax({
          url: location.origin+"/api?func=getcoords&id="+salon_id,
          cache: false
        })
          .done(function( data1 ) {
            coords=JSON.parse(data1);
            $('input[name="latitude"]').val(coords[0])
            $('input[name="longitude"]').val(coords[1])
            coords1=[parseFloat(coords[0]),parseFloat(coords[1])]
            yaMap.geoObjects.removeAll();
            addPlaceMark(coords1);
            yaMap.panTo(coords1);
        });
        $.ajax({
          url: location.origin+"/api?func=getaddress&id="+salon_id,
          cache: false
        })
          .done(function( data1 ) {
            $('input[name="address"]').val(data1)
          });
    })
    afterValidation();
    setVisibility();
})