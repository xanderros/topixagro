import React, {Component} from 'react'
import * as consts from '../../consts'
import InputText from '../../elements/input-text'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delivery: '',
        }
    }

    onCheck(value, type = 'delivery') {
        if (type == 'delivery') {
            if (this.state.delivery == value) {
                value = ''
            }
            this.setState({delivery: value})
        }
    }

    render() {
        let {delivery} = this.state
        return (
            <div className="flex flex_form">
                <div className="flex__cell">
                    <div className="form__title">Данные покупателя</div>
                    <InputText title="ФИО контактного лица (обязательно)" name="full_name" type="text"/>
                    <InputText title="Электронная почта (обязательно)" name="email" type="text"/>
                    <InputText title="Номер телефона (обязательно)" name="phone" type="tel"/>
                    <InputText title="Компания" name="company" type="text"/>
                    <InputText title="ИНН (обязательно)" name="inn" type="text"/>
                </div>
                <div className="flex__cell">
                    <div className="form__title">Адрес доставки</div>
                    <div className="form__row form__required">
                        <div className="form__grid form__grid_field">
                            <div className="form__cell">
                                <InputText title="Регион (обязательно)" name="address[region]" type="text"/>
                            </div>
                            <div className="form__cell">
                                <InputText title="Город (обязательно)" name="address[city]" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="form__row">
                        <div className="checkbox form__item">
                            <div className="checkbox__item">
                                <input
                                    name="delivery"
                                    className="checkbox__input"
                                    type="checkbox"
                                    id="radio_delivery_1"
                                    value={ consts.DELIVERY_COURIER }
                                    checked={ delivery == consts.DELIVERY_COURIER ? true : false }
                                />
                                <label className="checkbox__label" htmlFor="radio_delivery_1" onClick={
                                    () => this.onCheck(consts.DELIVERY_COURIER)
                                }>Доставка до транспортной компании
                                </label>
                            </div>
                        </div>
                        {/*<div className="radio form__item">*/}
                            {/*<input*/}
                                {/*className="radio__input"*/}
                                {/*type="radio"*/}
                                {/*id="radio_delivery_1"*/}
                                {/*name="delivery"*/}
                                {/*value={ consts.DELIVERY_PICKUP }*/}
                                {/*checked={ delivery == consts.DELIVERY_PICKUP ? true : false }*/}
                            {/*/>*/}
                            {/*<label className="radio__label" htmlFor="radio_delivery_1" onClick={*/}
                                {/*() => this.onCheck(consts.DELIVERY_PICKUP)*/}
                            {/*}>Самовывоз</label>*/}
                        {/*</div>*/}
                    </div>
                    <div className="form__row form__required">
                        <div className="form__grid form__grid_field">
                            <div className="form__cell form__cell_street">
                                <label className="form__label">Адрес</label>
                                <div className="form__control">
                                    <input name="address[street]" className="form__input" type="text" placeholder="Улица"/>
                                </div>
                            </div>
                            <div className="form__cell form__cell_house">
                                <div className="form__control">
                                    <input name="address[house]" className="form__input" type="text" placeholder="Дом"/>
                                </div>
                            </div>
                            <div className="form__cell form__cell_block">
                                <div className="form__control">
                                    <input name="address[housing]" className="form__input" type="text" placeholder="Корпус"/>
                                </div>
                            </div>
                            <div className="form__cell form__cell_office">
                                <div className="form__control">
                                    <input name="address[office]" className="form__input" type="text" placeholder="Офис"/>
                                </div>
                            </div>
                        </div>
                        <div className="form__error-message">Необходимо указать адрес</div>
                    </div>
                    <div className="form__row">
                        <label className="form__label">Дополнительная информация к заказу</label>
                        <div className="form__control">
                            <textarea name="sub_info" className="form__textarea" rows="6"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form