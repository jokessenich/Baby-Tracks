import React from 'react'
import { NavLink } from 'react-router-dom'
import './CSS/Dashboard.css'

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h1>Baby Tracks App Dashboard</h1>
                <section className="dashboard-links">
                    <div className="link-button">
                        <NavLink to='/nursing' className="link-text">Nursing</NavLink><br />
                    </div>
                    <div className="link-button">
                    <NavLink to='/diapers' className="link-text">Diapers</NavLink><br />
                    </div>
                    <div className="link-button">
                    <NavLink to='/sleep' className="link-text">Sleep</NavLink><br />
                    </div>
                </section>
            </div>
        )
    }
}