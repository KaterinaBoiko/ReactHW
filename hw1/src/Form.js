import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                name: '',
                password: '',
                plan: 'basic',
                newsletter: true
            },
            errors: {}
        };
    }

    onChange = ({ target }) => {
        let { fields } = this.state;
        const { name, checked, value } = target;
        fields[ name ] = name === 'newsletter' ? checked : value;

        this.setState({ fields });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.isValid()) {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const { fields } = this.state;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields)
            };

            fetch(proxyUrl + 'https://postman-echo.com/post', requestOptions)
                .then(response => console.log(response));
        }
    };

    isValid() {
        let errors = {};
        let formIsValid = true;
        const { name, password } = this.state.fields;

        if (!name) {
            formIsValid = false;
            errors.name = "Cannot be empty";
        }

        if (!password) {
            formIsValid = false;
            errors.password = "Cannot be empty";
        }

        if (password && password.length < 4) {
            formIsValid = false;
            errors.password = "Password should have at least 4 symbols";
        }

        this.setState({ errors });
        return formIsValid;
    }

    render() {
        const { fields, errors } = this.state;
        const planTypes = [
            {
                type: "basic",
                title: "Базовый тариф"
            },
            {
                type: "premium",
                title: "Премиум тариф"
            }
        ];

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input type="text" name="name" onChange={this.onChange} />
                    {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" name="password" onChange={this.onChange} />
                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                </div>
                {planTypes.map(item => {
                    const { type, title } = item;
                    return (
                        <div key={type}>
                            <input type="radio" value={type} name="plan" checked={fields.plan === type} onChange={this.onChange} />{title}
                        </div>
                    );
                })}
                <div>
                    <input type="checkbox" name="newsletter" checked={fields.newsletter} onChange={this.onChange} />Присылайте мне новости на почту
                </div>
                <button type="submit">Купить</button>
            </form>
        );
    }
}
export default Form;