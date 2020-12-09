let stickTableSettings={
    selector: 'table.stick__brands-table',
    rows: 0,
    columns: [
        {title: 'Бренд',
         fieldname: 'brand',
         fieldtype: 'numeric',
         inputname: 'brand',
         nomore: true,
         width: 'calc(100% - 40px)'
        },
        {fieldtype: '_del',
         width: '40px'
        }
    ]
}

const initialColor='#07405b';

const radio_arr=[
    {title: 'право верх',name: 'pv',transformStyle: "rotate(85deg) translate(0px,-108px)"},
];
if (window.matchMedia("(max-width: 520px)").matches) {
    radio_arr.push(
        {title: 'право низ',name: 'pn',transformStyle: "rotate(-50deg) translate(42px,30px)"}
        )
    radio_arr.push(
    {title: 'лево низ',name: 'ln',transformStyle: "rotate(-96deg) translate(8px,-5px)"}
    )
    radio_arr.push(
    {title: 'лево верх',name: 'lv',transformStyle: "rotate(125deg) translate(10px,-4px)"},
    )
}else{
    radio_arr.push(
    {title: 'лево верх',name: 'lv',transformStyle: "rotate(125deg) translate(0px,0px)"},
    )
    radio_arr.push(
    {title: 'право низ',name: 'pn',transformStyle: "rotate(-50deg) translate(60px,65px)"}
    )
    radio_arr.push(
    {title: 'лево низ',name: 'ln',transformStyle: "rotate(-96deg) translate(-5px,-5px)"}
    )
}


function closest(el, selector) {
    if (Element.prototype.closest) {
      return el.closest(selector);
    }
    let parent = el;
    while (parent) {
      if (parent.matches(selector)) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
}

// let sticks=[
//     {id: 1, title: 'Сервис',brands: ['Jaguar','LandRover'],coords: [10,10], color: '#07405b'}
// ]

const elemMove=(e)=> {
    let elem=e.target;
    let elem1=closest(elem,'.stick-env');
    elem1.style.top=parseInt(elem1.style.top)+e.movementY+'px';
    elem1.style.left=parseInt(elem1.style.left)+e.movementX+'px';
}

let templ;

function stickDel(e) {
    let elem1=closest(e.target,'.stick-env');
    sticks=sticks.filter(elem=>elem.id!=elem1.getAttribute('data-id'))
    elem1.remove();
}

function addEventsToEditButtons(new_stick) {
    let new_stick_stick=new_stick.querySelector('.stick');
    new_stick_stick.querySelector('.stick__del').addEventListener('click',stickDel)
    new_stick_stick.querySelector('.stick__edit').addEventListener('click',function(e) {
        let elem1=closest(e.target,'.stick-env');
        if (elem1.getAttribute('data-mode')=='edit') {
            e.target.innerHTML='e';
        }else{
            e.target.innerHTML='s';
        }
        editStick(elem1);
    });
}

function createStick(show=false,withref=false,salon_id=0) {
    let new_stick;
    if (withref) {
        new_stick=document.createElement('a');
        new_stick.setAttribute('href','/salons/'+salon_id);
        new_stick.setAttribute('target','_blank');
    }else{
        new_stick=document.createElement('div');
    }
    new_stick.classList.add('stick-env');
    new_stick.setAttribute('data-tail','pn')
    new_stick.innerHTML=templ.innerHTML;
    let new_stick_texts=new_stick.querySelector('.stick');
    let p_arr=new_stick_texts.querySelectorAll('p');
    p_arr.forEach((elem)=>elem.remove());
    new_stick.style.left='0px';
    new_stick.style.top='40px';
    if (!show) {
        new_stick.addEventListener("mousedown", function(e) {
            let elem1=closest(e.target,'.stick-env');
            elem1.style.cursor="move";
            elem1.addEventListener('mousemove',elemMove);
        })
        new_stick.addEventListener("mouseup", function(e) {
            let elem1=closest(e.target,'.stick-env');
            elem1.style.cursor="pointer";
            elem1.removeEventListener('mousemove',elemMove);
        })
        new_stick.addEventListener("mouseleave", function(e) {
            let elem1=closest(e.target,'.stick-env');
            elem1.style.cursor="pointer";
            elem1.removeEventListener('mousemove',elemMove);
        })
        addEventsToEditButtons(new_stick,radio_arr);
    }else{

    }
    return new_stick;
}

function changeStickColor(e) {
    let val=e.target.value;
    let new_stick_env=closest(e.target,".stick-env");
    let new_stick=closest(e.target,".stick");
    new_stick.style.backgroundColor=val;
    let handler_color=new_stick_env.querySelector('.handler__color');
    handler_color.style.backgroundColor=val;
    let handler_up_color=new_stick_env.querySelector('.handler_up__color');
    handler_up_color.style.backgroundColor=val;
}

function initTailElem(elem) {
    let new_rad=radio_arr.filter((elem1)=>elem1.name==elem.getAttribute('data-tail'));
    if (elem.getAttribute('data-tail')=='pn' || elem.getAttribute('data-tail')=='ln') {
        elem.querySelector('.handler').style.display="block";
        elem.querySelector('.handler_up').style.display="none";
        elem.querySelector('.handler').style.transform=new_rad[0].transformStyle;
    }else if (elem.getAttribute('data-tail')=='pv' || elem.getAttribute('data-tail')=='lv') {
        elem.querySelector('.handler').style.display="none";
        elem.querySelector('.handler_up').style.display="block";
        elem.querySelector('.handler_up').style.transform=new_rad[0].transformStyle;
    }
    
}

function changeStickTail(elem,radios_arr) {
    elem.addEventListener('change',function(e){

        radios_arr.forEach((elem)=>elem.checked=false);
        e.target.checked=true;
        radios_arr.forEach((elem)=>{
            if (elem.checked) {
                let new_rad=radio_arr.filter((elem1)=>elem1.name==elem.getAttribute('name'));
                let stick_env=e.target.closest('.stick-env');
                stick_env.setAttribute('data-tail',elem.getAttribute('name'));
                if (elem.getAttribute('name')=='pn' || elem.getAttribute('name')=='ln') {
                    stick_env.querySelector('.handler').style.display="block";
                    stick_env.querySelector('.handler_up').style.display="none";
                    stick_env.querySelector('.handler').style.transform=new_rad[0].transformStyle;
                }else if (elem.getAttribute('name')=='pv' || elem.getAttribute('name')=='lv') {
                    stick_env.querySelector('.handler').style.display="none";
                    stick_env.querySelector('.handler_up').style.display="block";
                    stick_env.querySelector('.handler_up').style.transform=new_rad[0].transformStyle;
                }
            }
        });
    })
}


function editStick(elem1) {
    let obj=saveSticktoObj(elem1,0);
    let stick_block=elem1.querySelector('.stick');
    let tableObj=[];
    if (elem1.getAttribute('data-mode')=='edit') {
        tableObj=saveTable(stickTableSettings);
    }
    if (stick_block) {
        let brand_elems=stick_block.querySelectorAll('.stick__brand');
        brand_elems.forEach(brand_elem=>tableObj.push({brand: brand_elem.innerHTML}));
        stickTableSettings.content=tableObj;
        elem1.querySelector('.stick').innerHTML=templ.querySelector('.stick').innerHTML;
        let p_arr=elem1.querySelector('.stick').querySelectorAll('p');
        p_arr.forEach((elem)=>elem.remove());
        addEventsToEditButtons(elem1);
    }else{
        stick_block=document.createElement('div');
        stick_block.classList.add('stick');
        elem1.append(stick_block);
    }
    if (elem1.getAttribute('data-mode')!='edit') {
        let sel;
        let inp=document.createElement('input');
        inp.setAttribute('type','checkbox');
        inp.setAttribute('name','isLabel');
        inp.setAttribute('id','isLabel');
        if (elem1.getAttribute('data-islabel')=='true') {
            inp.checked=true;
        }
        stick_block.append(inp);
        let label=document.createElement('label');
        label.classList.add('stick__is-label');
        label.setAttribute('for','isLabel');
        label.innerHTML="просто надпись";
        stick_block.append(label);
        inp=document.createElement('input');        
        inp.classList.add('stick__title-input');
        inp.setAttribute('placeholder','Заголовок');
        inp.value=obj.title;
        stick_block.append(inp);
        lab=document.createElement('label')
        lab.innerHTML="Выберите подсалон";
        lab.classList.add('stick__select-label')
        stick_block.append(lab);
        sel=document.createElement('select');
        sel.classList.add('stick__select-input');
        opt=document.createElement('option');
        opt.value=0;
        opt.innerHTML="Не выбран";
        sel.append(opt);
        subsalons.forEach((elem)=>{

            opt=document.createElement('option');
            opt.value=elem.id;
            if (elem.id==obj.subsalon) {
                opt.selected=true;
            }
            opt.innerHTML=elem.name;
            sel.append(opt);
        })
        stick_block.append(sel);
        inp=document.createElement('input');
        inp.classList.add('stick__color-input');
        inp.setAttribute('placeholder','Цвет');
        if (obj.color) {
            inp.value=obj.color;
        }
        inp.addEventListener('change',function(e) {
            changeStickColor(e);
        })
        stick_block.append(inp);

        let span=document.createElement('span');
        span.innerHTML="положение хвоста";
        span.style.display='block';
        stick_block.append(span);
        let div_radio_group=document.createElement('div');
        div_radio_group.classList.add('stick__radio-group-all');
        stick_block.append(div_radio_group);
        radio_arr.forEach((elem)=>{
            let div_radio=document.createElement('div');
            div_radio.classList.add('stick__radio-group');
            div_radio_group.append(div_radio);

            inp=document.createElement('input');
            inp.setAttribute('type','radio');
            inp.setAttribute('name',elem.name);
            inp.checked=(elem.name==elem1.getAttribute('data-tail'));
            inp.style.display='block';
            div_radio.append(inp);
            label=document.createElement('label');
            label.innerHTML=elem.title;
            div_radio.append(label);
        })
        let radios_arr=div_radio_group.querySelectorAll('input[type="radio"]');
        radios_arr.forEach((elem)=>{
            changeStickTail(elem,radios_arr);
        })
        let btn=document.createElement('button');
        btn.classList.add('stick__brands-button-add');
        btn.classList.add('smarttable-btn-add');
        btn.innerHTML='Добавить бренд';
        btn.setAttribute('type','button');
        stick_block.append(btn);
        let tabl=document.createElement('table');
        tabl.classList.add('stick__brands-table');
        tabl.setAttribute('cellspacing','0');
        stick_block.append(tabl);
        smartTableInit(stickTableSettings);
        elem1.setAttribute('data-mode','edit');
        elem1.querySelector('.stick__edit').innerHTML='s';
    }else{
        obj.brands=[];
        tableObj.forEach(str=>{
            obj.brands.push(str.brand);
        })
        fillStickTextBlock(elem1,obj)
        elem1.querySelector('.stick__edit').innerHTML='e';
        elem1.setAttribute('data-mode','look');
        elem1.setAttribute('data-islabel',obj.islabel);
        elem1.setAttribute('data-subsalon',obj.subsalon);
    }
}

function saveSticktoObj(elem,id) {
    let mode=elem.getAttribute('data-mode');
    let stick_block=elem.querySelector('.stick');
    let obj={};
    obj.id=id;
    obj.coords=[parseInt(elem.style.left),parseInt(elem.style.top)];
    obj.title='';
    obj.islabel=false;
    obj.tail=elem.getAttribute('data-tail');
    if (stick_block) {
        if (mode=='edit') {
            if (stick_block.querySelector('.stick__title-input')) {
                obj.title=stick_block.querySelector('.stick__title-input').value;
                obj.color=stick_block.querySelector('.stick__color-input').value;
                obj.islabel=stick_block.querySelector('input[name="isLabel"]').checked;
                obj.subsalon=stick_block.querySelector('.stick__select-input').value;
            }
        }else{
            if (stick_block.querySelector('.stick__title')) {
                obj.title=stick_block.querySelector('.stick__title').innerHTML;
            }else if (stick_block.querySelector('.stick__big-title')) {
                obj.title=stick_block.querySelector('.stick__big-title').innerHTML;
            }
            obj.color=stick_block.style.backgroundColor;
            if (elem.getAttribute('data-islabel')=='true') {
                obj.islabel=true;
            }
            if (elem.getAttribute('data-subsalon')!=undefined) {
                obj.subsalon=elem.getAttribute('data-subsalon');
            }
        }
    }
    obj.brands=[];
    if (stick_block) {
        brand_elems=stick_block.querySelectorAll('.stick__brand');
        if (brand_elems) {
            brand_elems.forEach(brand_elem=>{
                obj.brands.push(brand_elem.innerHTML);
            });
        };
    };
    return obj;
}
function saveSticks() {
    let stick_elems=document.querySelector('.map-image').querySelectorAll('.stick-env');
    sticks=[];
    let max_id=0;
    // прописываем элементы с id
    stick_elems.forEach(elem=>{
        if (elem.getAttribute('data-id')!=undefined) {
            let new_id=parseInt(elem.getAttribute('data-id'));
            if (new_id>max_id) {
                max_id=new_id;
            }
            let obj=saveSticktoObj(elem,new_id);
            sticks.push(obj);
        }
    })
    let new_id=max_id+1;
    // прописываем элементы без id
    stick_elems.forEach(elem=>{
        if (elem.getAttribute('data-id')==undefined) {
            let obj=saveSticktoObj(elem,new_id);
            new_id++;
            sticks.push(obj);
        }
    })
    let json_sticks=JSON.stringify(sticks);
    $('input[name="labels"]').val(json_sticks);
}

function fillStickTextBlock(new_stick,elem) {
    let p_title=document.createElement('p');
    if (elem.islabel) {
        p_title.classList.add('stick__big-title');
    }else{
        p_title.classList.add('stick__title');
    }
    p_title.innerHTML=elem.title;
    new_stick.querySelector('.stick').append(p_title);
    if (elem.brands!=undefined) {
        elem.brands.forEach(function(brand) {
            let p_brand=document.createElement('p');
            p_brand.classList.add('stick__brand');
            p_brand.innerHTML=brand;
            new_stick.querySelector('.stick').append(p_brand);
        })
    }
    if (elem.color) {
        new_stick.querySelector('.stick').style.backgroundColor=elem.color;
        new_stick.querySelector('.handler__color').style.backgroundColor=elem.color;
        new_stick.querySelector('.handler_up__color').style.backgroundColor=elem.color;
    }else{
        new_stick.querySelector('.stick').style.backgroundColor=initialColor;
        new_stick.querySelector('.handler__color').style.backgroundColor=initialColor;
        new_stick.querySelector('.handler_up__color').style.backgroundColor=initialColor;
    }
}

function addSticks(sticks,selector,ratio,show=false) {
    // добавляем стики из массива
    sticks.forEach(function(elem) {
        let new_stick;
        if (elem.islabel) {
            new_stick=createStick(show);
        }else{
            if (!show) {
                new_stick=createStick(false);
            }else{
                if (elem.subsalon_id) {
                    new_stick=createStick(show,true,elem.subsalon_id);
                }else{
                    new_stick=createStick(show,true,elem.salon_id);
                }
            }
        }
        new_stick.setAttribute('data-id',elem.id);
        new_stick.setAttribute('data-tail',elem.tail);
        new_stick.setAttribute('data-subsalon',elem.subsalon);
        fillStickTextBlock(new_stick,elem)
        document.querySelector(selector).append(new_stick);
        initTailElem(new_stick);
        if (elem.coords!=undefined) {
            new_stick.style.left=elem.coords[0]*ratio+'px';
            new_stick.style.top=elem.coords[1]*ratio+'px';
        }
    })
}

function addStick() {
    elem=createStick();
    elem.querySelector('.stick').style.backgroundColor=initialColor;
    elem.querySelector('.handler__color').style.backgroundColor=initialColor;
    elem.querySelector('.handler_up__color').style.backgroundColor=initialColor;
    document.querySelector('.map-image').append(elem);
}

function delAllSticks() {
    let sticks=document.querySelector('.map-image').querySelectorAll('.stick-env');
    sticks.forEach(elem=>elem.remove());
}

function addMapButtons() {
    let btn=appendElem($('.map-buttons'),'button');
    btn.html('Добавить метку');
    btn.addClass('btn-planeta')
    btn.attr('type','button')
    btn.attr('id','add_stick')
    btn.click(addStick);
    btn=appendElem($('.map-buttons'),'button');
    btn.html('Удалить все метки');
    btn.attr('type','button')
    btn.attr('id','del_all_sticks')
    btn.addClass('btn-planeta')
    btn.click(delAllSticks);
}

