import {ADD_TO_CART, REMOVE_FROM_CART, CHANGE_PRODUCT_COUNT} from './actions'
import Immutable, {List, Map} from 'immutable'

function productsEquals(product1, product2) {
    if (!Map.isMap(product1)) product1 = Immutable.fromJS(product1)
    if (!Map.isMap(product2)) product2 = Immutable.fromJS(product2)

    return product1.delete('count').equals(product2.delete('count'))
}

function cartApp(state = new List(), action) {
    switch (action.type) {
        case ADD_TO_CART:
            let addedProductIndex = state.findIndex(product => productsEquals(product, action.product))

            if (addedProductIndex == -1) {
                return state.push(action.product)
            } else {
                return state.update(
                    addedProductIndex,
                    product => product.set('count', product.get('count') + action.product.get('count'))
                )
            }
        case REMOVE_FROM_CART:
            return state.filter(product => !productsEquals(product, action.product))
        case CHANGE_PRODUCT_COUNT:
            return state.map(
                product => {
                    if (productsEquals(product, action.product)) {
                        return product.set('count', Math.max(1, action.count))
                    }
                    return product
                }
            )
        default:
            return state
    }
}

export default cartApp