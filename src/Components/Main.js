import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import Nursing from './Dashboard components/Nursing'
import Sleep from './Dashboard components/Sleep'
import Diapers from './Dashboard components/Diapers'
import ErrorPage from './ErrorPage'


export default class Main extends React.Component{

    render() {
        return (

            <div>
                

                <Switch>


                    <Route exact path='/' component={Login}></Route>

                    <Route path='/user/register' component={Register}></Route>

                    <Route path='/user/login' component={Login}></Route>

                    <Route path='/dashboard' component={Dashboard}></Route>

                    <Route path = '/error' component = {ErrorPage}></Route>

                    <Route path='/nursing' component={Nursing}></Route>
                    <Route path='/sleep' component={Sleep}></Route>
                    <Route path='/diapers' component={Diapers}></Route>
                    

                </Switch>
            </div>
        )
    }
}