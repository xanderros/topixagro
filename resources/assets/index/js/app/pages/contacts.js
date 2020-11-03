$(document).ready(function() {

    $(document).on('change', '.js_region-select', regionSelect)

    function regionSelect() {
        $.post($(this).find(':selected').data('url'), (response) => $('.js_region-content').html(response.view))
    }

    ymaps.ready(function () {

        $(document).on('change', '.js_contacts-country-select', updateCities)
        $(document).on('click', '.js_contacts-office-type', contactsOfficeTypes)
        $(document).on('submit', '.js_form-cords', formCords)
        $(document).on('change', '.js_map-update', changeFormCords)

        let map = null;

        let myCollection = new ymaps.GeoObjectCollection();

        function formCords() {
            let $form = $('.js_form-cords');

            $form.ajaxSubmit({
                data: {'is_ajax': 1},
                success: window.processAjaxSubmit($form, (response) => {
                    let a = response.offices;
                    console.log(response);
                    ymaps.ready(function () {

                        if (map === null) {
                            map = new ymaps.Map('map', {
                                center: [53.901717, 27.553576],
                                zoom: 9,
                                controls: ['zoomControl'],
                                behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]
                            }, {
                                searchControlProvider: 'yandex#search'
                            });
                        }
                        myCollection.removeAll();
                        let coords = [];
                        for (let i = 0; i < a.length; i++) {
                            let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                a[i].balloon, {}
                            );
                            let myPlacemark = new ymaps.Placemark([a[i].longitude, a[i].latitude], {}, {
                                balloonContentLayout: BalloonContentLayout,
                                balloonPanelMaxMapArea: 0,
                                balloonImageOffset: [-265, -89]
                            });
                            myCollection.add(myPlacemark);
                            coords = [a[i].longitude, a[i].latitude]
                        }
                        map.geoObjects.add(myCollection);
                        if (myCollection.getLength() > 1) {
                            map.setBounds(myCollection.getBounds());
                        } else {
                            map.setCenter(coords)
                        }
                            //     map.setBounds(myCollection.getBounds(), {checkZoomRange: true});
                    });
                })
            });
            return false;
        }



        function updateCities() {
            $.post($(this).find(':selected').data('url'), (response) => {
                $('.js_contacts-cities-content').html(response.view)
                changeFormCords()
            })
        }

        function contactsOfficeTypes() {
            let activeClass = 'submenu__item_active';
            $('.js_contacts-office-type-wrap').find(`.${activeClass}`).removeClass(activeClass)
            $(this).parent().addClass(activeClass)
            $('[name=office_type_id]').val($(this).data('id'))
            changeFormCords();
            return false;
        }

        function changeFormCords() {
            $('.js_form-cords').submit()
        }

        formCords();
    })
});