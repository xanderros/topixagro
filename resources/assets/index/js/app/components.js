$(document).on('click', '.js_all-show__btn', allShow);
$(document).on('click', '.js_diploma-tab', diplomaTab);
$(document).on('change', '.switcher input', productTemplateView);
$(document).on('click', '.js_select-option', superSelect);

function superSelect() {
    let $wrap = $(this).closest('.js_select-wrap');
    let $current = $wrap.find('.js_select-current');
    let $input = $wrap.find('.js_select-input');
    $wrap.find('.hidden').removeClass('hidden');
    $(this).addClass('hidden');
    $current.text($(this).find('.js_select-option-text').text());
    $input.val($(this).data('val'));

    setTimeout(() => $input.data('default', $(this).data('val')), 300);

    $(this).closest('.js-expand_opened').removeClass('js-expand_opened').find('.js-expand__content').hide()

    if ($wrap.hasClass('js_select-filter-submit')) window.submitFilter()

    return false;
}

function productTemplateView() {
    let url = $(this).data('url');
    $.post(url, (response) => $('.js_swither-products')
        .removeClass('grid_view_row')
        .removeClass('grid_view_table')
        .addClass(response.class)
    )
}

function diplomaTab() {
    let $wrap = $(this).closest('.js_diploma-wrap');
    let type = $(this).data('type-hidden');
    $('.js_diploma-item').show();
    $wrap.find('.submenu__item_active').removeClass('submenu__item_active');
    $(this).closest('.submenu__item').addClass('submenu__item_active');
    if (type) $(`[data-type=${type}`).hide();
    return false;
}

function allShow() {
    let $wrap = $(this).closest('.js_all-show__wrap');
    $wrap.find('.hidden').removeClass('hidden');
    $wrap.find('.js_all-show__remove').remove();
    return false;
}