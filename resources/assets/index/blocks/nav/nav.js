$(document).on('click', '.nav__item_dropdown .nav__link', catToggle);
$(document).on('click', '.nav__link_menu', navToggle);
$(document).on('click', '.nav__inner-item_dropdown .nav__inner-link', navInnerToggle);
$(document).on('click', '.nav__inner-item_dropdown .back-btn', navInnerBack);

function navToggle(e) {
    e.preventDefault();

    if ($('.nav__wrapper').css('visibility') == 'visible') {
        $('body').removeClass('nav-opened');
    }
    else {
        var top = $window.scrollTop();
        var headerHeight = $('.header').outerHeight();
        var navPosition = headerHeight - top;

        if (top < 351) {
            $('.nav__wrapper').css('top',navPosition);
        }

        $('body').addClass('nav-opened');
    }
}

var resizeVar = false;

$(window).resize(function(){
    if ( $('body').width() < 1200) {
        if (resizeVar) {
            $('.nav__inner-item').removeClass('nav__inner-item_opened');
            resizeVar = false;
        }
    }
    else {
        if (!resizeVar) {
            navReset();
            resizeVar = true;
        }
    }
})

function navReset() {
    $('body').removeClass('nav-opened');
    $('.nav__dropdown, .nav__bar').attr('style','');
    $('.nav__item').removeClass('nav__item_opened');
    $('.nav__inner-item').removeClass('nav__inner-item_opened');
    $('.nav__dropdown').removeClass('nav__dropdown_closed');
}
// Nav Inner back
function navInnerBack(e) {
    e.preventDefault();

    var $navInnerItemDropdown = $(this).closest('.nav__inner-item_dropdown');
    var $navDropdown = $(this).closest('.nav__dropdown');

    $navDropdown.removeClass('nav__dropdown_closed');
    $navInnerItemDropdown.removeClass('nav__inner-item_opened');
}

// Nav Inner show/hide
function navInnerToggle(e) {
    e.preventDefault();

    var $navInnerItemDropdown = $(this).closest('.nav__inner-item_dropdown');
    var $navInnerItemDropdownOthers = $('.nav__inner-item_dropdown').not($navInnerItemDropdown);
    var $navDropdown = $(this).closest('.nav__dropdown');
    var $navBar = $navInnerItemDropdown.find('.nav__bar');
    var $navBarOthers = $('.nav__bar').not($navBar);

    if ( $('body').width() < 1200 ) {
        if ($navBar.is(':visible')) {
            $navBar.slideUp(200);
            $navInnerItemDropdown.removeClass('nav__inner-item_opened');
        }
        else {
            $navBarOthers.slideUp(200);
            $navInnerItemDropdownOthers.removeClass('nav__inner-item_opened');
            $navBar.slideDown(200);
            $navInnerItemDropdown.addClass('nav__inner-item_opened');
        }
    }
    else {
        $navDropdown.addClass('nav__dropdown_closed');
        $navInnerItemDropdown.addClass('nav__inner-item_opened');
    }
}

// Nav show/hide
function catToggle(e) {
    e.preventDefault();

    var $navItem = $(this).closest('.nav__item_dropdown');
    var $navItemOthers = $('.nav__item_dropdown').not($navItem);
    var $navContent = $navItem.find('.nav__dropdown');
    var $navContentOthers = $('.nav__dropdown').not($navContent);

    if ($navContent.is(':visible')) {
        $navContent.slideUp(200);
        $navItem.removeClass('nav__item_opened');
    }
    else {
        $navContentOthers.slideUp(200);
        $navItemOthers.removeClass('nav__item_opened');
        $navContent.slideDown(200);
        $navItem.addClass('nav__item_opened');
    }
}

// close Nav on click
$(document).on('click', function (e) {
    if ( $('body').width() > 1199 ) {
        if (!$(e.target).closest('.nav__link, .nav__dropdown').length) {
            $('.nav__dropdown').slideUp(200);
            $('.nav__item_dropdown').removeClass('nav__item_opened');
        }
        if (!$(e.target).closest('.nav__item_cat .nav__link, .nav__item_cat .nav__dropdown').length) {
            $('.nav__item_cat .nav__dropdown').slideUp(200);
            $('.nav__item_cat .nav__item_dropdown').removeClass('nav__item_opened');
        }
    }
    else {
        if (!$(e.target).closest('.nav__link_menu, .nav__wrapper').length) {
            $('body').removeClass('nav-opened');
        }
    }
});