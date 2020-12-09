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
    inp_pass=$('input[name="password"]');
    if (inp_pass.val()) {
    	if (inp_pass.val()!=$('input[name="confirm_password"]').val()) {
            inp_pass.closest('fieldset').addClass('is-invalid');
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


$(document).ready(function () {
    $('.btn-submit').click(function () {
        if (!validation()) {
            return;
        }
        $("form.form-horizontal").submit();
    });

})