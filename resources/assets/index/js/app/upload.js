$(document).ready(function () {
    $('.js_upload__input').change(uploadFiles)
    $('.js_files__remove').click(removeFile)

    window.upload = function($input, callback) {
        if ($input[0].files) {
            let classError = 'form__error'

            let url = $input.data('url')
            let data = new FormData()
            $.each($input[0].files, function (key, value) {
                data.append('files[]', value)
            })

            let return_array = new Object()

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function (data) {
                    return_array.result = data.result
                    return_array.files = data.files
                    $input.val('')
                    callback(return_array)
                },
                error: function (data) {
                    error()
                }
            })
        }

    }

    function removeFile() {
        $(this).closest('.js_files__row').remove()

        return false
    }

    function uploadFiles(){
        let classError = 'form__error'
        $('.js_upload__error').closest('.form__row').removeClass(classError).find('.js_upload__error').html('')

        $('.js_files').addClass('file_loading')
        let $list = $('.js_files__list')
        window.upload($(this), function (data) {
            if (data.result == 'success') {
                let loaded = 0
                let files = []
                if(data.files) {
                    $.each(data.files, function (i, file) {
                        let $col_clone = $list.find('.js_files__clone')
                        let $clone = $col_clone.clone(true)
                        let $fileName = $clone.find('.js_files__filename')
                        let $path = $clone.find('.js_files__path')
                        let $name = $clone.find('.js_files__name')
                        $path.val(file.path).prop('disabled', false)
                        $name.val(file.name).prop('disabled', false)
                        $fileName.text(file.name)
                        files.push($clone)
                        $('.js_files').removeClass('file_loading')
                        $clone.removeClass('js_files__clone')
                        $clone.removeClass('hidden')
                        $clone.insertBefore($col_clone)
                    });
                } else {
                    error()
                }
            } else {
                error()
            }
        })
    }

    function error() {
        let classError = 'form__error'
        let $wrapper = $('.js_files')
        $wrapper.removeClass('file_loading').addClass(classError).find('.form__error-message').text($('.js_upload__error').data('error'))
    }

})