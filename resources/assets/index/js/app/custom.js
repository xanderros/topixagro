$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).on('submit', '.js_ajax-form', submitAjaxForm);

window.processAjaxSubmit = ($form, onSuccess, onError) => response => {
    $form.find('.form__error').removeClass('form__error');
    let $submitButton = $form.find('button[type="submit"]');
    if (response.result == 'success') {
        $form.trigger('form-ajax-success', [response]);

        if (response.message) toastr.success(response.message);
        if (response.text) $form.html(response.text);
        if ($form.hasClass('js-ajax-redirect')) {
            if (response.redirect) {
                setTimeout(() => window.location.href = response.redirect, 0);
            }
        }
        $submitButton.attr('disabled', false);
        if (onSuccess) onSuccess(response);
    } else {
        $submitButton.attr('disabled', false);
        if (response.msg) toastr.error(response.msg);
        let i = 0;
        $.each(response.errors, function (input, errors) {
            let inputArray = input.split('.');
            let $input = $form.find(':input[name="' + input + '"]');
            if (!$input.length && inputArray.length > 1) {
                $input = $form.find(':input[name="' + inputArray[0] + '[' + inputArray[1] + ']"]');
            }
            let errorText = errors[0];
            if ($input.length) {
                let $wrapper = $input.closest('.form__row');
                $wrapper.find('.form__error-message').html(errorText);
                $wrapper.addClass('form__error');
            }
            i++;
        });
        onError && onError()
    }
}

function submitAjaxForm() {
    let $form = $(this);
    let $submitButton = $form.find('button[type="submit"]');
    $submitButton.attr('disabled', true);

    const addLoader = $btn => $submitButton.addClass('btn_loading').prepend('<span class="loader"></span>')
    const removeLoader = $btn => $submitButton.removeClass('btn_loading').find('.loader').remove()

    addLoader($submitButton)

    $form.ajaxSubmit({
        data: {'is_ajax': 1},
        success: window.processAjaxSubmit(
            $form,
            () => removeLoader($submitButton),
            () => removeLoader($submitButton),
        )
    });
    return false;
}

