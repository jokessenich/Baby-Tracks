import React from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import './CSS/Login.css'
const queryString = require('query-string');


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
                const params = queryString.parse(document.location.search);
                const redirect = params.redirect; // this would be "abcdefg" if the query was "?redirect=abcdefg"
                if (document.location.pathname === '/' && redirect) {
                    document.location.assign(`${document.location.origin}/${redirect}`);
                }
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
            <div className="login-page">
                <h1 className="log-header">Login</h1>
                <p>Baby Tracks is an app that allows users to track the nursing, diapers and sleeping habits of their babies. The nursing timer can be for the left or right side and the start time can be edited as needed.</p>
                <form onSubmit={this.onSubmit}>
                    <fieldset className="login-field">
                        <label htmlFor="email">Email</label><br />
                        <input
                            className="login-input"
                            type="text"
                            name="email">
                        </input><br />

                        <label htmlFor="password">Password</label><br />
                        <input
                            className="login-input"
                            type="password"
                            name="userpassword"></input><br />
                        {error}<br />
                        Demo Account Email: Demo {<br />}
                        Demo Account Password: 1234{<br />}
                        <button className="save-button" type="submit">Login</button>
                    </fieldset>
                </form>

                <section className="register">
                    <span>Not a Member?  </span>
                    <Link to="/user/register" className="register-link">Register</Link>
                </section>
            </div>
        )
    }
}