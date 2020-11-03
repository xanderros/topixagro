import React, {Component} from 'react'
import * as helpers from '../helpers'

class ProductCounter extends Component {
    constructor(props) {
        super(props)
        this.state = {count: 1}

        this.updateCount = this.updateCount.bind(this);
    }

    changeCount(dt) {
        let newCount = this.state.count + dt
        if (newCount > 0) this.setState({ count : newCount })
    }

    updateCount(event) {
        let newCount = helpers.matchNumeric(event.target.value)
        if (newCount) this.setState({ count : newCount })
    }

    render() {
        let { unit } = this.props
        return (
            <div className="counter">
                <div className="counter__btn counter__btn_minus" onClick={ () => this.changeCount(-1) }>
                    <span className="counter__icon icon icon_minus">
                      <svg className="icon__item">
                        <use xlinkHref="#icon_minus"/>
                      </svg>
                    </span>
                </div>
                <div className="counter__result">
                    <input
                        className="counter__number js_product-count"
                        type="tel"
                        value={ this.state.count }
                        onChange={ this.updateCount }
                    />
                    <div className="counter__unit">{ unit }</div>
                </div>
                <div className="counter__btn counter__btn_plus" onClick={ () => this.changeCount(+1) }>
                    <span className="counter__icon icon icon_plus">
                      <svg className="icon__item">
                        <use xlinkHref="#icon_plus"/>
                      </svg>
                    </span>
                </div>
            </div>
        )
    }
}

export default ProductCounter