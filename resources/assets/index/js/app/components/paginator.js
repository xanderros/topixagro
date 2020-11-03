$(document).on('click', 'body:not(.js_catalog) .js_paginator-link', paginator)

let updateWrapper = url => {
    history.pushState({}, '', decodeURIComponent(url));

    if (url.indexOf('?') == -1) {
        url += '?';
    }

    $.getJSON(`${url}&is_ajax=1`, function (data) {
        $('.js_wrapper').html(data.view);
    });
}

function paginator() {
    updateWrapper($(this).attr('href'));
    $.scrollTo($('.title'), 400);
    return false;
}