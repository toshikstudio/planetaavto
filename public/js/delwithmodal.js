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

$(document).ready(function() {
    $('.del-button').click(function (e) {
        e.stopPropagation();
        let id=$(this).data('id');
        let name=$(this).closest('tr').data('name');
        msgbox.openConfirm({
            question: 'Вы действительно хотите удлить элемент '+name+'?',
            confirm: 'Удалить',
            action: function () {
                let dform=$('#deleteform');
                let new_act=dform.data('action');
                new_act=new_act.replace('aaa',id);
                dform.attr('action',new_act);
                dform.submit();
            }
        })
    })
})