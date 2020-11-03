$(document).on('click', '.js_tabs-btn', tabs)

function tabs() {

    if (!$(this).hasClass('js_tabs-btn--active')) {
        let $wrap = $(this).closest('.js_tabs-wrap')

        $wrap.find('.submenu__item')
            .removeClass('submenu__item_active')
            .find('.js_tabs-btn')
            .removeClass('js_tabs-btn--active')

        $(this).addClass('js_tabs-btn--active')
            .closest('.submenu__item')
            .addClass('submenu__item_active')

        $wrap.find('.js_tabs-item')
            .hide()
            .eq($(this).parent().index())
            .show()
    }

    return false;
}