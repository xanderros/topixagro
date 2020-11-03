$(document).on('click', '.js-tabs .tabs__link', tabsToggle);
$(document).on('click', '.js-sub__btn', subToggle);
$(document).on('click', '.js-sub__content .submenu__link', clickSubLink);
$(document).on('click', '.js-sub .tags__item_submenu .tags__arrow', tagsSubmenuToggle);
$(document).on('click', '.js-details', detailsExpand);
$(document).on('click', '.js-expand__btn', expandToggle);
$(document).on('click', '.js-exp__btn', expToggle);
$(document).on('click', '.js-covering__btn', coveringToggle);
$(document).on('click', '.js-filter__item-toggle', filterToggle);

// detect touch devices
function is_touch_device() {
    return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}

if (!is_touch_device()) {
    $('body').addClass('touch-no');
}
else {
    $('body').addClass('touch-yes');
}

// zoom images
$('.certificate, .review__link, .js_magnific').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
        verticalFit: true
    },
    zoom: {
        enabled: true
    }
});

$('.content-gallery__link').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery:{
       enabled: true,
       tCounter: '%curr% из %total%'
     },
    image: {
        verticalFit: true
    },
    zoom: {
        enabled: true,
        duration: 300
    }
});

// multiple select
    $(".js-select-multiple.js-select-services").select2();

// responsive content tables
$('.content table').wrap("<div class='table-wrap'></div>");

// Tabs
function tabsToggle(e) {
    e.preventDefault();

    var $tabs = $(this).closest('.js-tabs');

    $tabs.find('.tabs__box').hide();
    $tabs.find('.tabs__item_active').removeClass('tabs__item_active');
    $(this).closest('.tabs__item').addClass('tabs__item_active');

    var tabsClicked = $(this).attr('href');
    $(tabsClicked).fadeIn(100);

    $(this).closest('.tabs__item').eq(0).addClass('tabs__item_active');
}

function clickSubLink() {
    var activeClass = 'submenu__item_active';
    var text = $(this).text();
    var $wrap = $(this).closest('.js-sub');
    $wrap.find('.' + activeClass).removeClass(activeClass);
    $(this).parent().addClass(activeClass);
    $wrap.find('.js-sub__btn').text(text);
}

// Tags all-categories dropdown
function subToggle(e) {
    e.preventDefault();

    var $subWrap = $(this).closest('.js-sub');
    var $subContainer = $subWrap.find('.js-sub__content');

    if ($subContainer.is(':visible')) {
        $subContainer.slideUp(300);
        $subWrap.removeClass('js-sub_opened');
    }
    else {
        $subContainer.slideDown(300);
        $subWrap.addClass('js-sub_opened');
    }
}

// Tags submenu dropdown
function tagsSubmenuToggle(e) {
    e.preventDefault();

    var $tagsItem = $(this).closest('.tags__item_submenu');
    var $tagsContent = $tagsItem.find('.tags__submenu');

    if ($tagsContent.is(':visible')) {
        $tagsContent.slideUp(300);
        $tagsItem.removeClass('tags__item_opened');
    }
    else {
        $tagsContent.slideDown(300);
        $tagsItem.addClass('tags__item_opened');
    }
}

// Panel parallax
$(window).on('scroll', parallax);

$(window).resize(parallaxHeight);

function parallaxHeight(){
    if ( $('body').width() < 1423 ) {
        $('.panel__box').css('height', '');
    }
}

var panelHeight = $('.panel_parallax').css('height');
var panelHeightParse = parseInt(panelHeight, 10);

function parallax(){
    if ($('.panel_parallax').length > 0) {
        if ( $('body').width() > 1422 ) {
            var $panelBox = $('.panel__box');
            var $panelContainer = $('.panel__container');
            var scrolledTop = $(window).scrollTop();
            var scrolledInvert = (1 - (scrolledTop * 0.001)) * panelHeightParse;

            $panelContainer.css('top', -(scrolledTop * -0.005) + 'rem');
            $panelContainer.css('opacity', 1 - (scrolledTop * .00175));
            $panelBox.css('height', scrolledInvert);
        }
    }
}

// Details dropdown
function detailsExpand(e) {
    e.preventDefault();

    var $detailsBox = $(this).closest('.details');
    var $detailsContent = $detailsBox.find('.details__hidden');

    if ($detailsContent.is(':visible')) {
        $detailsContent.slideUp(300);
        $detailsBox.removeClass('details_opened');
    }
    else {
        $detailsContent.slideDown(300);
        $detailsBox.addClass('details_opened');
    }
}

// Details dropdown
function filterToggle(e) {
    e.preventDefault();

    var $filterBox = $(this).closest('.filter__controls');
    var $filterContent = $filterBox.find('.checkbox__item_hidden');

    if ($filterContent.is(':visible')) {
        $filterContent.slideUp(300);
        $filterBox.removeClass('filter__controls_opened');
    }
    else {
        $filterContent.slideDown(300);
        $filterBox.addClass('filter__controls_opened');
    }
}

// Select dropdown
function expandToggle(e) {
    e.preventDefault();

    var $expandItem = $(this).closest('.js-expand');
    var $expandItemOthers = $('.js-expand').not($expandItem);
    var $expandContent = $expandItem.find('.js-expand__content');

    if ($expandContent.is(':visible')) {
        $expandContent.slideUp(200);
        $expandItem.removeClass('js-expand_opened');
    }
    else {
        $expandItemOthers.find('.js-expand__content').slideUp(200);
        $expandItemOthers.removeClass('js-expand_opened');
        $expandContent.slideDown(200);
        $expandItem.addClass('js-expand_opened');
    }
}

$( window ).resize(function() {
    $('.js-covering')
        .removeClass('js-covering_opened')
        .css('style', '');
});

function coveringToggle(e) {
    e.preventDefault();
    var $coveringItem = $(this).closest('.js-covering');
    var $coveringContent = $coveringItem.find('.js-covering__content');
    var expContentHeight = $coveringContent.outerHeight();

    $coveringItem.css('maxHeight', expContentHeight);

    if ($coveringItem.hasClass('js-covering_opened')) {
        $coveringItem.removeClass('js-covering_opened');
    }
    else {
        $coveringItem.addClass('js-covering_opened');
    }
}

// Team dropdown
function expToggle(e) {
    e.preventDefault();
    var $expItem = $(this).closest('.js-exp');
    var $expContent = $expItem.find('.content');
    var expContentHeight = $expContent.outerHeight();

    $expItem.css('maxHeight', expContentHeight);

    if ($expItem.hasClass('js-exp_opened')) {
        $expItem.removeClass('js-exp_opened');
    }
    else {
        $expItem.addClass('js-exp_opened');
    }
}

// close Dropdowns on click
$(document).on('click', function (e) {
    if ( $('body').width() > 480 ) {
        if (!$(e.target).closest('.js-sub .tags__arrow, .js-sub .tags__submenu').length) {
            $('.js-sub .tags__item').removeClass('tags__item_opened');
            $('.js-sub .tags__submenu').slideUp(200);
        }
    }
    if (!$(e.target).closest('.js-expand__btn, .js-expand__content').length) {
        $('.js-expand').removeClass('js-expand_opened');
        $('.js-expand__content').slideUp(200);
    }
});

// Slider of product
$('.carousel_product').fotorama({
    width: '100%',
    height: 360,
    nav: 'thumbs',
    thumbwidth: 97,
    thumbheight: 97,
    thumbborderwidth: 1,
    thumbmargin: 0,
    fit: 'scaledown',
    allowfullscreen: true
});

// Slider of projects
window.fotorama = function initFotorama() {
    var $fotoramaDiv = $('.carousel_projects').fotorama({
        height: 476,
        nav: 'thumbs',
        thumbwidth: 80,
        thumbheight: 85,
        thumbborderwidth: 4,
        thumbmargin: 20,
        fit: 'scaledown',
        allowfullscreen: true,
        arrows: false,
        click: false,
        swipe: false
    });

    var fotorama = $fotoramaDiv.data('fotorama');


    $('.carousel_projects:not(.fotorama--fullscreen) .fotorama__nav__frame--thumb:nth-child(5)').click(function(){
        fotorama.show(3)
            .requestFullScreen();
    });
};

window.fotorama();

// Slider line
$('.slider_line .slider__box').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    infinite: true,
    prevArrow: '<button class="slick-prev" type="button"><span class="slick__icon icon icon_arrow-left"><svg class="icon__item"><use xlink:href="#icon_arrow-left"></use></svg></span></button>',
    nextArrow: '<button class="slick-next" type="button"><span class="slick__icon icon icon_arrow-right"><svg class="icon__item"><use xlink:href="#icon_arrow-right"></use></svg></span></button>',
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 570,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
});

// Slider in content
$('.slider_simple .slider__box_content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: true,
    respondTo: 'slider',
    asNavFor: '.slider_simple .slider__box_nav',
    accessibility: false
});
$('.slider_simple .slider__box_nav').slick({
    accessibility: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider_simple .slider__box_content',
    focusOnSelect: true,
    prevArrow: '<button class="slick-prev" type="button"><span class="slick__icon icon icon_arrow-left"><svg class="icon__item"><use xlink:href="#icon_arrow-left"></use></svg></span></button>',
    nextArrow: '<button class="slick-next" type="button"><span class="slick__icon icon icon_arrow-right"><svg class="icon__item"><use xlink:href="#icon_arrow-right"></use></svg></span></button>',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }]
});

// Video image
// Search
// $(document).on('focus', '.js-search .form__input_search', searchToggle);
// $(document).on('input', '.js-search .form__input_search', searchChange);
$(document).on('click', '.js-search__mob', searchDrop);
$(document).on('click touchend', '.js-search__close', searchClose);
$(document).on('keydown', function(e) {
    if (e.keyCode == 27) {
        searchHide(function(){
            $('.js-search .form__input_search').blur();
        });
    }
});

function searchToggle() {
    if (!($(this).val()=='')) {
        searchShow();
    }
}
function searchChange() {
    searchShow();
}
function searchDrop(e) {
    e.preventDefault();
    searchShow();
}

function searchShow() {
    var searchTop = $(window).scrollTop();

    $('body').addClass('search-opened');
}
function searchClose(e) {
    e.preventDefault();
    searchHide();
}
function searchHide() {
    $('body').removeClass('search-opened');

    if (is_touch_device()) {
        $("html, body").animate({
            scrollTop: searchTop
        }, 50);
    }
}

$(document).on('click touchend', '.search-opened', function(e){
    if (!$(e.target).closest('.search_popup .search__box').length){
        searchHide();
    }
});


// truncated titles

if ($('.product__title.js-dotdotdot').length) {
    $('.product__title.js-dotdotdot').dotdotdot({
      watch:         true,
      tolerance :    5,
    });
}

// datepicker
if ($('.datepicker__input').length) {
    flatpickr.localize(flatpickr.l10ns.ru);
    flatpickr(".datepicker__input", {
        dateFormat: 'd.m.y'
    });
}