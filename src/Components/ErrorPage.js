import React from 'react'
import {Link} from 'react-router-dom'

export default class ErrorPage extends React.Component{
    render(){
        return(
        <div>
            <h1>Sorry something went wrong :/ </h1>
            <Link to = 'user/login' className = "register-link">Log In</Link>
        </div>
        )
    }
}

