const tbl=[
    {propvalue: 'd30',price: 330,comment: 'с 1 июня'},
    {propvalue: 'd40',price: 390,comment: 'с 1 июля'}
];

function appendElem(parent,tag,text='') {
    if (tag=='input') {
        parent.append('<'+tag+'>');
    }else{
        parent.append('<'+tag+'>'+text+'</'+tag+'>');
    };
    return parent.find(tag+':last-child');
}

function changeFocus(settings,e,elem,direction) {
    if (elem.inputname) {
        let tr=$(e.target).closest('tr')[0];
        let trs=$(settings.selector).find('tr');
        let ind=undefined;
        trs.each((i,elem)=>{
            if (elem==tr) {
                ind=i;
            }
        });
        if (direction<0) {
            if (ind>0) {
                let newtr=trs[ind+direction];
                $(newtr).find('input[name="'+elem.inputname+'"]').focus();
            }
        }else {
            if (ind<trs.length-1) {
                let newtr=trs[ind+direction];
                $(newtr).find('input[name="'+elem.inputname+'"]').focus();
            }
        }
    }

}

function addString(tbody,settings,values={}) {
    let tr=appendElem(tbody,'tr');
    if (typeof values.id!='undefined') {
        tr.data('id',values.id);
    }
    settings.columns.forEach(function (elem) {
        let td=appendElem(tr,'td');
        if (elem.fieldtype=='numeric') {
            td.addClass('center');
        }
        if (typeof elem.width!='undefined') {
            td.css('width',elem.width);
        }
        if (elem.fieldtype=='select') {
            let select=appendElem(td,'select');
            select.attr('name',elem.fieldname);
            if (typeof elem.selectvalues!='undefined') {
                elem.selectvalues.forEach(function (optelem) {
                    let option=appendElem(select,'option',optelem.title);
                    option.attr('value',optelem.id);
                    if (typeof values[elem.fieldname]!='undefined')  {
                        if (optelem.id==values[elem.fieldname]) {
                            option.attr('selected','');
                        }
                    }
                });
            }
        }
        if (elem.fieldtype=='text' || elem.fieldtype=='numeric') {
            let inp=appendElem(td,'input');
            inp.css('border','0');
            inp.css('padding','3px');
            inp.attr('type',elem.fieldtype);
            if (elem.inputname) {
                inp.attr('name',elem.inputname);
            }
            if (typeof values[elem.fieldname]!='undefined')  {
                inp.attr('value',values[elem.fieldname]);
            }
            if (elem.nomore==true) {
                inp.keypress(function (e) {
                    if (e.keyCode==13) {
                        e.preventDefault();
                    }
                })
            }
            inp.keydown(function (e) {
                if (e.keyCode==38) {
                    changeFocus(settings,e,elem,-1);
                }
                if (e.keyCode==40) {
                    changeFocus(settings,e,elem,1);
                }
                if (e.keyCode==46) {
                    // let tr=$(e.target).closest('tr');
                    // tr.remove();
                }
            })
        }
        if (elem.fieldtype=='checkbox') {
            
        }
        if (elem.fieldtype=='_del') {
            let btn=appendElem(td,'button','X');
            btn.css('display','block');
            btn.css('margin','0 auto');
            td.css('background-color',btn.css('background-color'));
            btn.click(function () {
                tr.remove();
            });
        }
    });
}

function saveTable(settings) {
    let saveObj=[];
    let strobj={};
    let i=0;
    $(settings.selector+' tr').each((j,elem)=>{
        strobj={};
        if ($(elem).data('id')) {
            strobj.id=$(elem).data('id');
        }
        let i=0;
        let tfields=$(elem).find('td');
        settings.columns.forEach(elem=>{
            if (elem.fieldtype=='text' || elem.fieldtype=='numeric') {
                let inp=$(tfields[i]).find('input');
                strobj[elem.fieldname]=inp[0].value;
            }
            if (elem.fieldtype=='select') {
                let select=$(tfields[i]).find('select');
                strobj[elem.fieldname]=select[0].value;
            }
            i++;
        })
        saveObj.push(strobj);
    })
    return saveObj;
}

function clearTable(settings) {
    $(settings.selector+' tbody').html('');
}

function smartTableInit(settings,primary=true) {
    if (typeof settings.selector=='undefined') {
        console.error('SmartTable: Selector not passed');
        return;
    }
    if (typeof settings.columns!='undefined') {
        let table=$(settings.selector);
        if (table.length==0) {
            console.error('SmartTable: No table TAG with selector '+settings.selector);
            return;
        }
        table.innerHTML='';
        // строим thead
        table.append('<thead></thead>');
        let thead=$(settings.selector+' thead');
        settings.columns.forEach(function (elem) {
            let th=appendElem(thead,'th',elem.title);
            if (typeof elem.width!='undefined') {
                th.css('width',elem.width);
            }
        })
        // строим tbody
        let tbody=appendElem(table,'tbody');
        if (typeof settings.content!='undefined') {
            settings.content.forEach(function (elem) {
                addString(tbody,settings,elem);
            });
        }else {
            for (let i=0;i<settings.rows;i++) {
                addString(tbody,settings)
            }
        }

    }
    if (primary) {
        $('.smarttable-btn-add').click(function () {
            let tbody=$(settings.selector+' tbody');
            addString(tbody,settings)
        })
        $('.smarttable-btn-del').click(function () {
            let tbody=$(settings.selector+' tbody').html('');
        })
        $('.smarttable-btn-save').click(function () {
            saveTable(settings);
        })
    }
}

