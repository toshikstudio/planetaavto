function appendElem(parent,tag,text='') {
    if (tag=='input') {
        parent.append('<'+tag+'>');
    }else{
        parent.append('<'+tag+'>'+text+'</'+tag+'>');
    };
    return parent.find(tag+':last-child');
}

function showPhoto(img_tag,file_tag,max_pixels) {
    let reader = new FileReader();
    let img=new Image();
    img.onload=function() {
        let ratio=this.width/this.height;
        if (this.width>this.height) {
            img_tag.css('width',max_pixels+'px');
            img_tag.css('height',(max_pixels/ratio)+'px');
        }else{
            img_tag.css('height',max_pixels+'px');
            img_tag.css('width',(max_pixels*ratio)+'px');
        }
        reader.onload = function (e) {
            img_tag.attr('src',e.target.result);
            };
        reader.readAsDataURL(file_tag[0].files[0]);
    }
    img.src=window.URL.createObjectURL(file_tag[0].files[0]);
}

function getNextInpNumber(files) {
    let counter=0;
    files.each((i,elem)=>{
        let priv_id=elem.getAttribute('id');
        priv_id=priv_id.replace('file','');
        let curr_value=parseInt(priv_id);
        if (curr_value>counter) {
            counter=curr_value;
        }
    })
    return counter+1;
}

function del_photo(btn) {
    let curr_div=btn.closest('div.photo-div');
    let del_str=$('input[name="deletedphotos"]');
    if (del_str!='') {
        del_str.val(del_str.val()+',')
    }
    del_str.val(del_str.val()+curr_div.data('id'));
    $('#file'+curr_div.data('id')).remove();
    curr_div.css('transform','scale(0.01)');
    setTimeout(()=>curr_div.remove(),300);
    $('input[name="offer"]').val('');
}

function inputFileChange(elem) {
    if (elem.attr('name').substring(0,4)!="file") {
        return;
    }
    var value = elem.val();
    value=value.replace('fakepath','');
    value=value.replace('C:','');
    value=value.replace('c:','');
    value=value.replace('D:','');
    value=value.replace('d:','');
    value=value.replace('e:','');
    value=value.replace('E:','');
    value=value.replace('F:','');
    value=value.replace('f:','');
    value=value.replace('\\\\','');

    let photo_block=$('.uploaded-photos');
    let input_block=$('label.filupp');
    let files=$('label.filupp input[type="file"]');

    let curr_inp_number=elem.attr('id').replace('file','');

    let div_photo=appendElem(photo_block,'div');
    div_photo.attr('id','photo'+curr_inp_number);
    div_photo.data('id',curr_inp_number);
    div_photo.addClass('photo-div')
    let div_title=appendElem(div_photo,'div');
        div_title.addClass('title-div')
            let p=appendElem(div_title,'p',value);
            p.addClass('photo-title');
            p.attr('id','title'+curr_inp_number);
        let btn=appendElem(div_photo,'button','X');
        btn.addClass('close-btn');
        btn.attr('type','button');
        btn.click(function(e) {
            del_photo($(this));
        })
        let img=appendElem(div_photo,'img');
        img.click(function() {
            let photomodal=$('#photoModal');
            photomodal.find('img').attr('src',$(this).attr('src'));
            photomodal.modal();
        });
        showPhoto(img,elem,125);
    let newname="file"+getNextInpNumber(files);
    let newinput=appendElem(input_block,'input');
    div_photo.css('transform','scale(1)');
    newinput.attr('type','file');
    newinput.attr('name',newname);
    newinput.attr('accept','image/*');
    newinput.attr('id',newname);
    input_block.attr('for',newname);

    newinput.change(function() {
        inputFileChange($(this));
    })
}

function fileInputsInit() {
    $('input[type="file"]').change(function(){
        inputFileChange($(this));
    });
    $('.uploaded-photos button.close-btn').click(function () {
        del_photo($(this));
    })
}

$(document).ready(function () {
    fileInputsInit();
})