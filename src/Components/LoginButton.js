import React from 'react'
import {Link} from 'react-router-dom'

export default class LoginButton extends React.Component{
    render(){
        return(
            <div>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}