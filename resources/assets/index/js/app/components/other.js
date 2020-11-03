$(document).on('click', '.js_other', other)

function other() {
    let $this = $(this);
    $this.addClass('spinner');
    let $content = $this.closest('.js_other__wrap').find('.js_other__content');
    let url = $this.attr('href');
    $.post(url, (response) => {
        if ($('.carousel_projects').length) $('.carousel_projects').fotorama().data('fotorama').destroy();
        $content.html(response.view)
        if ($content.find('.carousel_projects').length) window.fotorama()
        $this.removeClass('spinner');
    })
    return false;
}