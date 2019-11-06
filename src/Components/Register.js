import React from 'react'

export default class Register extends React.Component{

    render(){
        return(
        <div>
            <h1>Baby Tracks App Registration</h1>
            <form>
                <label for="username">Username</label>
                <input type="text"></input><br />
                <label for="password">Password</label>
                <input type="text"></input><br />
                <button type = "submit">Register</button>
            </form>
        </div>
        )}
}