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
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e) {
        let fields = this.state.fields;
        const name = e.target.name;
        fields[name] = name === 'newsletter' ? e.target.checked : e.target.value;
        this.setState({ fields });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            };
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            fetch(proxyUrl + 'https://postman-echo.com/post', requestOptions)
                .then(response => console.log(response))
        }
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.fields.name) {
            formIsValid = false;
            errors.name = "Cannot be empty";
        }

        if (!this.state.fields.password) {
            formIsValid = false;
            errors.password = "Cannot be empty";
        }

        if (this.state.fields.password && this.state.fields.password.length < 4) {
            formIsValid = false;
            errors.password = "Password should have at least 4 symbols";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input type="text" name="name" onChange={this.onChange} />
                    <span style={{ color: "red" }}>{this.state.errors.name}</span>
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" name="password" onChange={this.onChange} />
                    <span style={{ color: "red" }}>{this.state.errors.password}</span>
                </div>
                <div>
                    <input type="radio" value="basic" name="plan" checked={this.state.fields.plan === "basic"} onChange={this.onChange} />Базовый тариф
                </div>
                <div>
                    <input type="radio" value="premium" name="plan" checked={this.state.fields.plan === "premium"} onChange={this.onChange} />Премиум тариф
                </div>
                <div>
                    <input type="checkbox" name="newsletter" checked={this.state.fields.newsletter} onChange={this.onChange} />Присылайте мне новости на почту
                </div>
                <button type="submit">Купить</button>
            </form>
        )
    }
}
export default Form;