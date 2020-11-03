$(document).on('change', '.js_catalog-filter', submitFilter);
$(document).on('click', '.js_form-btn', submitFilter);
$(document).on('click', '.js_catalog .js_paginator-link', paginate)
$(document).on('click', '.js_form-clear', clearFilter)

let updateWrapper = url => {
    history.pushState({}, '', decodeURIComponent(url));

    if (url.indexOf('?') == -1) {
        url += '?';
    }

    $.getJSON(`${url}&is_ajax=1`, function (data) {
        $('.js_wrapper').html(data.view);
        $('.js_wrapper-paginator').html(data.view_paginator);
    });
}

function clearFilter () {
    $('.js_form-filter .checkbox_filter input').prop('checked', false)
    submitFilter()
    return false;
}

function paginate () {
    updateWrapper($(this).attr('href'));
    $.scrollTo($('.title'), 400);
    return false;
}

function submitFilter() {
    let $form = $('.js_form-filter');
    let $default = $form.find('[data-default]');
    $default.each(function () {
        if ($(this).data('default') == $(this).val()) $(this).prop('disabled', true)
    })

    $form.find(':input[name="view"]').prop('disabled', true);

    let newUrl = location.pathname;
    if ($form.serialize().length) {
        newUrl = `${location.pathname}?${$form.serialize()}`;
    }

    $form.find(':input[name="view"]').prop('disabled', false);

    $default.each(function () {
        if ($(this).data('default') == $(this).val()) $(this).prop('disabled', false)
    })

    updateWrapper(newUrl)
    return false;
}

window.submitFilter = submitFilter;