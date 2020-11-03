import React, { Component } from 'react'

class InputText extends Component {
    render () {
        let { title, name, type } = this.props
        return (
            <div className="form__row form__required">
                <label className="form__label">{ title }</label>
                <div className="form__control">
                    <input name={ name } className="form__input" type={ type } />
                    <div className="form__error-message"/>
                </div>
            </div>
        )
    }
}

export default InputText