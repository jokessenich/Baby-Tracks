import React from 'react'
import config from '../config'


export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            email: "",
            error: null,
            repeatPassword: ""
        }
    }

    onChange = (e) => {
        let value = e.target.value;

        this.setState({
            [e.target.name]: value

        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let userpassword = this.state.password
        let email = this.state.email.toLowerCase()
        debugger;
        let newUser = { userpassword, email }

        fetch(`${config.API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(error => {
                            console.log(error)
                            throw error
                        })
                }
                return res.json()
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
        this.props.history.push('/user/login')

    }
    render() {
        const error = this.state.error
        const pError = this.state.repeatPassword !== this.state.password ? "Passwords must match" : ""
        return (
            <div className = "login-page">
                <h1 className="log-header">Registration</h1>
                <form onSubmit={this.onSubmit}>
                <fieldset className = "login-field">
                    <label htmlFor="email">Email</label><br />
                    <input
                        className="login-input"
                        onChange={this.onChange}
                        type="text"
                        name="email">
                    </input><br />

                    <label htmlFor="password">Password</label><br />
                    <input
                        className="login-input"
                        onChange={this.onChange}
                        type="password"
                        name="password">
                    </input><br />

                    <label htmlFor="password">Repeat Password</label><br />
                    <input
                        className="login-input"
                        onChange={this.onChange}
                        type="password"
                        name="repeatPassword">
                    </input><br />

                    {error}
                    {pError}<br />
                    <button type="submit" className = "save-button" disabled={this.state.repeatPassword !== this.state.password} >Register</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}