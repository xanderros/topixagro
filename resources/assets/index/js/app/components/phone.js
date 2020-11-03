import phoneCodes from './phone-codes'
import 'inputmask-multi'
let maskList = $.masksSort(phoneCodes, ['#'], /[0-9]|#/, "mask");
let maskOpts = {
    inputmask: {
        definitions: {
            '#': {
                validator: "[0-9]",
                cardinality: 1
            }
        },
        //clearIncomplete: true,
        showMaskOnHover: false,
        autoUnmask: true
    },
    match: /[0-9]/,
    replace: '#',
    list: maskList,
    listKey: "mask"
}
$('.js-input-phone input').inputmasks(maskOpts)

$(document).on('click', '.js_phone__retry', phoneRetry)

function phoneRetry() {
    let url = $(this).data('url')
    let phone = $('.js-input-phone input').val()

    $.post(url, {
        phone: phone,
    }, (response) => {
        if (response.result == 'success') {
            toastr.success(response.message);
        }
    })

    return false;
}
