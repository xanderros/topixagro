import React, {Component} from 'react'
import Product from './order/product'
import Form from './order/form'
import serialize from 'form-serialize'
import {connect} from 'react-redux'
import * as helpers from '../helpers'

class OrderCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        // $('.mask-phone').inputmask('+375 (99) 999-99-99')
    }

    _handleOrder(e) {
        this.setState({ loading : true })
        e.preventDefault();
        let {products} = this.props
        let $form = $('.js_form-order')
        let formData = serialize($form[0], {hash: true})
        formData.products = products
        $.post(
            $form.data('action'),
            formData,
            window.processAjaxSubmit(
                $form,
                result => {
                    this.setState({ loading : false })
                    localStorage.removeItem('state')
                    setTimeout(() => window.location.href = result.redirect, 0);
                },
                () => this.setState({ loading : false })
            )
        )
        return false;
    }

    render() {
        let {products} = this.props
        let count = helpers.totalCount(products)
        if (!count) return (
            <div>
                <p>В корзине ничего нету.</p>
            </div>
        )
        return (
            <div>
                <div className="backet mb-big">
                    <div className="basket__table">
                        <div className="basket__box basket__box_header">
                            <div className="basket__base">Наименование</div>
                            <div className="basket__side">
                                <div className="basket__counter">Количество</div>
                                <div className="basket__information">
                                    <div className="basket__period">Срок поставки</div>
                                    <div className="basket__price">Стоимость</div>
                                </div>
                                <div className="basket__del"/>
                            </div>
                        </div>
                        <div className="basket__box basket__box_content">
                            { products.map(product => <Product product={product}/>) }
                        </div>
                    </div>
                </div>

                <div className="form mb-big">

                    <Form/>

                    <div className="cover cover_dark">
                        <div className="cover__side">
                            <button
                                className={`btn btn_type_bright ${this.state.loading ? 'btn_loading' : ''}`}
                                type="submit"
                                onClick={(e) => this._handleOrder(e)}
                            >
                                Отправить заявку
                                {this.state.loading && <span className="loader" />}
                            </button>
                        </div>
                    </div>
                </div>

                <h2 className="subtitle">Самовывоз</h2>
                <div className="content mb-xlarge">
                    <p>Вы можете самостоятельно забрать приобретённое оборудование с нашего склада в рабочее время, если
                        это вам удобно.</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Время работы склада:</th>
                            <td>Понедельник — Четверг<br/>c 9:00 до 18:00</td>
                            <td>Пятница<br/>с 9:00 до 17:00</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>Всю информацию о доставке Вы можете посмотреть в разделе <a href="/shipping-and-payment">доставка</a>.</p>
                </div>

            </div>
        )
    }
}

let mapStateToProps = state => ({
    products: state.toJS(),
})

export default connect(mapStateToProps)(OrderCart)