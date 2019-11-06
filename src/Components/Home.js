import React from 'react'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'


export default class Register extends React.Component{

    render(){
        return(
        <div>
            <h1>Baby Tracks App Home</h1>
            <LoginButton></LoginButton>
            <RegisterButton></RegisterButton>
        </div>
        )}
}