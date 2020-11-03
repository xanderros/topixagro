$(document).on('form-ajax-success', '.js_ajax-form--sms', submitFormSms)
$(document).on('click', '.js_sms--rollback', smsRollback)

function submitFormSms(e, response) {
    let $form = $(this)
    let action = response.action
    let btn = response.btn

    $form.attr('action', action).find('button').text(btn)
    $form.find('[name=phone]').attr('readonly', true)
    $('.js_sms').removeClass('hidden')
    $('[name=code]').focus()
}

function smsRollback() {
    let $form = $(this).closest('form')
    let action = $(this).data('action')
    let btn = $(this).data('btn')

    $form.attr('action', action).find('button').text(btn)
    $form.find('[name=phone]').attr('readonly', false)

    $('.js_sms').addClass('hidden')
    $('[name=phone]').focus()

    return false;
}