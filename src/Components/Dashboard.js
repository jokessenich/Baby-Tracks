import React from 'react'
import { NavLink } from 'react-router-dom'
import config from '../config'
import './CSS/Dashboard.css'

export default class Dashboard extends React.Component {

    componentDidMount() {
        fetch(`${config.API_BASE_URL}/nursing/${localStorage.getItem('token')}`)
            .then(res => {
                if (!res.ok) {
                    this.props.history.push('/error')

                }
            })
    }

    render() {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <section className="dashboard-links">
                    <NavLink to='/nursing' className="link-text">
                        <div className="link-button">
                            Nursing</div></NavLink>

                    <NavLink to='/diapers' className="link-text">
                        <div className="link-button">
                            Diapers</div></NavLink>


                    <NavLink to='/sleep' className="link-text">
                        <div className="link-button">
                            Sleep</div></NavLink><br />

                </section>
            </div >
        )
    }
}