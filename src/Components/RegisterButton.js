import React from 'react'
import {Link} from 'react-router-dom'

export default class RegisterButton extends React.Component{
    render(){
        return(
            <div>
                <Link to="/register">Register</Link>
            </div>
        )
    }
}