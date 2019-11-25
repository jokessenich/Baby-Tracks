import React from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import './CSS/Login.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log('login attempt')
        let email = e.target.email.value.toLowerCase()
        let userpassword = e.target.userpassword.value
        let user = { email, userpassword }

        fetch(`${config.API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(error => {
                            throw error
                        })
                }
                return res.json()
            })
            .then(token => {
                localStorage.setItem('token', token)
                this.props.history.push('/dashboard')
                window.location.reload()
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }

    render() {
        const error = this.state.error
        return (
            <div className = "login-page">
                <h1 className="log-header">Login</h1>
                <form onSubmit={this.onSubmit}>
                    <fieldset className = "login-field">
                    <label htmlFor="email">Email</label><br />
                    <input
                        className="login-input"
                        type="text"
                        name="email">
                    </input><br />

                    <label htmlFor="password">Password</label><br />
                    <input
                        className="login-input"
                        type="text"
                        name="userpassword"></input><br />
                    {error}<br />
                    <button className = "save-button" type="submit">Login</button>
                    </fieldset>
                </form>

                <section className="register">
                    <span>Not a Member?  </span>
                    <Link to="/user/register" className = "register-link">Register</Link>
                </section>
            </div>
        )
    }
}