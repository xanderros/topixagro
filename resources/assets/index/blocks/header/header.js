if ($('.header').length > 0) {
    var $window = $(window);
    var lastScrollTop = 0;

    function stickyHeader (e) {
        var top = $window.scrollTop();

        if (top > 250) {
            $('body').addClass('sticky sticky_hide');
        }
        else {
            $('body').removeClass('sticky sticky_hide sticky_transition sticky_show');
        }

        if (top > 350) {
            $('body').addClass('sticky_transition');
        }

        if (lastScrollTop > top) {
            if (top > 350) {
                $('body').addClass('sticky_show');
            }
            else {
                $('body').removeClass('sticky_show');
            }
        } else if (lastScrollTop < top) {
            $('body').removeClass('sticky_show');
        }
        lastScrollTop = top;
    }

    $window.on('scroll', stickyHeader);
}
