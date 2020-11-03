import React, {Component} from 'react'
import * as helpers from '../../helpers'
import * as actions from '../../actions'
import store from '../../store'

class Product extends Component {
    constructor(props) {
        super(props);

        this.updateCount = this.updateCount.bind(this);
    }

    updateCount(event) {
        let newCount = helpers.matchNumeric(event.target.value)
        if (newCount) store.dispatch(actions.changeProductCount(this.props.product, newCount))
    }

    render() {
        let {product} = this.props
        return (
            <div className="basket__item">
                <div className="basket__base">
                    <div className="basket__product">
                        { product.img ?
                            <a className="basket__figure" href={ product.url }>
                                <img className="basket__img"
                                     src={ product.img }
                                     alt={ product.title }/>
                            </a> : ''
                        }

                        <div className="basket__wrap">
                            <div className="basket__title"><a className="link-dark" href={ product.url }><span
                                className="link-dark__text">{ product.title }</span></a></div>
                            <div className="basket__code">{ product.vendor_code }</div>
                        </div>
                    </div>
                </div>
                <div className="basket__side">
                    <div className="basket__counter">
                        <div className="counter">
                            <div className="counter__btn counter__btn_minus" onClick={
                                () => store.dispatch(actions.changeProductCount(product, product.count - 1))}
                            >
                                <span className="counter__icon icon icon_minus">
                                  <svg className="icon__item">
                                    <use xlinkHref="#icon_minus"/>
                                  </svg>
                                </span>
                            </div>
                            <div className="counter__result">
                                <input className="counter__number"
                                       type="tel"
                                       value={product.count}
                                       onChange={this.updateCount}
                                />
                                <div className="counter__unit">{ product.unit }</div>
                            </div>
                            <div className="counter__btn counter__btn_plus" onClick={
                                () => store.dispatch(actions.changeProductCount(product, product.count + 1))}
                            >
                                <span className="counter__icon icon icon_plus">
                                  <svg className="icon__item">
                                    <use xlinkHref="#icon_plus"/>
                                  </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="basket__information">
                        <div className="basket__period">7 дней</div>
                        <div className="basket__price">
                            <div className="basket__value">Цена по запросу</div>
                        </div>
                    </div>
                    <div className="basket__del">
                        <a className="basket__del-btn" href="javascript:void(0)"
                           onClick={ () => store.dispatch(actions.removeFromCart(product)) }
                        >
                            <span className="basket__unit icon icon_close">
                                <svg className="icon__item">
                                  <use xlinkHref="#icon_close"/>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product