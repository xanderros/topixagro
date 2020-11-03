$(document).ready(() => {

    $(document).on('click', '.js_register-country__link', registerTab)
    $(document).on('change', '.js_register-company__type input', changeCompany)
    $(document).on('keyup', '.js_register-company__type input', keyupCompany)

    function keyupCompany() {
        let $wrap = $(this).closest('.js_register-company__type')
        $wrap.removeClass('form__error')
    }

    function changeCompany() {
        let $wrap = $(this).closest('.js_register-company__type')
        let url = $wrap.data('url')
        let type = $wrap.data('type')
        let val = $(this).val()
        let $company = $('.js_register-company__input input')
        let classLoading = 'form__control_loading'
        let classCheck = 'form__control_check'
        let classError = 'form__error'

        $wrap.removeClass(classError).removeClass(classCheck).addClass(classLoading)

        $.post(url, {
            val: val,
            type: type,
        }, (response) => {
            if (response.result == 'success') {
                $company.val(response.val)
                $wrap.removeClass(classLoading).addClass(classCheck)
                $('[name=full_name]').focus()
            } else {
                $wrap.removeClass(classLoading).addClass(classError)
                $wrap.find('.form__error-message').text(response.error)
                $company.val('')
            }
        })
    }

    function registerTab(e) {
        e.preventDefault();

        let tabClass = 'js_register-country__tab'
        let type = $(this).data('type')

        $(`.${tabClass}`).addClass('hidden').find('input').attr('disabled', true)
        $(`.${tabClass}[data-type=${type}]`).removeClass('hidden').find('input').attr('disabled', false)
    }

});