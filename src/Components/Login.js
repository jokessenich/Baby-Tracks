import React from 'react'
import {Link} from 'react-router-dom'

export default class Login extends React.Component{

    render(){
        return(
        <div>
            <h1>Baby Tracks App Login</h1>
            <form>
                <label for="username">Username</label>
                <input type="text"></input><br />
                <label for="password">Password</label>
                <input type="text"></input><br />
                <button type="submit">Login</button>
            </form>
            <section className = "register">
                <span>Not a Member?  </span>
                <Link to="/register">Register</Link>
            </section>
        </div>
        )}
}