import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as helpers from '../helpers'

class HeaderCart extends Component {
    render() {
        let { products } = this.props
        let count = helpers.totalCount(products)
        return (
            <div className="cart__side">
                <svg className="cart__icon icon icon_cart">
                    <use xlinkHref="#icon_cart"/>
                </svg>
                {count ? <div className="cart__count">{ count }</div> : null}
            </div>
        )
    }
}

let mapStateToProps = state => ({
    products : state.toJS(),
})

export default connect(mapStateToProps)(HeaderCart)
