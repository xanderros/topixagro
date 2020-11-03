$(document).on('click', '*[data-popup]', popupShow);
$(document).on('click touchend', '.js-popup__close, .popup_show', popupClose);

// Popup show
function popupShow(event) {

    event.preventDefault();

    var $popup = $('#' + $(this).data('popup'));

    $popup.addClass('popup_show');

    $('body').addClass('overlayed');

    return false;
}

// popup close on click
function popupCheckCount() {
    if (($('.popup_show').length) < 1) {
        $('body').removeClass('overlayed');
    }
}

function popupClose(e) {
    if ($(this).is('.js-popup__close')) {
        e.preventDefault();

        var $popup = $(this).closest('.popup_show');

        $popup.removeClass('popup_show');

        popupCheckCount();
    }
    else if ($(this).is('.popup_show')) {
        var $popup = $(this),
            $popupBox = $popup.find('.popup__box');

        if ($popupBox.has(e.target).length === 0) {

            $popup.removeClass('popup_show');

            popupCheckCount();
        }
    }
}