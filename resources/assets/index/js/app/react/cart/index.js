import React from 'react'
import HeaderCart from './components/header-cart'
import ProductCounter from './components/product-counter'
import OrderCart from './components/order-cart'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import * as actinos from './actions'
import {Map, List} from 'immutable'

$(document).on('click', '.js_add-to-cart', addToCart)
$(document).on('click', '.js_add-to-cart-spare', addToCartSpare)

function addToCart() {
    let count = Number($('.js_product-count').val()) || 1
    let services = new List($('.js-product-service').val())
    toastr.success('Товар добавлен в корзину!')
    store.dispatch(actinos.addToCart(new Map({ ...$(this).data(), count, services })))
    return false;
}

function addToCartSpare() {
    let count = Number($(this).closest('.cart-btn').find('.js_product-count-spare').val()) || 1
    let services = new List()
    toastr.success('Товар добавлен в корзину!')
    store.dispatch(actinos.addToCart(new Map({ ...$(this).data(), count, services })))
    return false;
}

let $boxHeaderCart = $('.js_react-header-cart');
let $boxOrder = $('.js_react-order');
let $boxProductCounter = $('.js_react-product-counter');

if ($boxHeaderCart.length) {
    render(
        <Provider store={store}>
            <HeaderCart/>
        </Provider>,
        $boxHeaderCart[0]
    )
}

if ($boxOrder.length) {
    render(
        <Provider store={store}>
            <OrderCart/>
        </Provider>,
        $boxOrder[0]
    )
}

if ($boxProductCounter.length) {
    render(
        <Provider store={store}>
            <ProductCounter unit={ $boxProductCounter.data('unit') }/>
        </Provider>,
        $boxProductCounter[0]
    )
}