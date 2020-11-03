export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_PRODUCT_COUNT = 'CHANGE_PRODUCT_COUNT'

export function addToCart(product) {
    return {
        type: ADD_TO_CART,
        product: product
    }
}

export function removeFromCart(product) {
    return {
        type: REMOVE_FROM_CART,
        product: product
    }
}

export function changeProductCount(product, count:number) {
    return {
        type: CHANGE_PRODUCT_COUNT,
        product: product,
        count: count
    }
}