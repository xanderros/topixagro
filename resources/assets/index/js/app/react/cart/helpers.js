export function productsPrice (products) {
    return products.reduce((acc, product) => acc + (product.count * product.price), 0)
}

export function totalCount(products) {
    return products.reduce((acc, product) => acc + product.count, 0)
}

function numberWithSpaces(x) {
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',');
}

function numberWithSpacesOld(x) {
    return x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function prettyPrice (price) {
    return `${numberWithSpaces(Number(price))} руб.`
}

export function prettyPriceOld (price) {
    return `${numberWithSpacesOld(Number(price) * 10000)} руб.`
}

export function matchNumeric (str) {
    return str.match( /^\d+$/ )
}