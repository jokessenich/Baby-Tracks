import React from 'react'
import './CSS/Header.css'
import config from '../config'
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        fetch(`${config.API_BASE_URL}/nursing/${localStorage.getItem('token')}`)
            .then(res => {
                if (res.ok) {
                    this.setState({ loggedIn: true })

                }
            })
    }
    handleLogout=()=> {
        localStorage.removeItem('token')
        this.setState({
            loggedIn: false
        })
    }

    render() {
        const loggedIn = this.state.loggedIn ? <Link to='/user/login' className ="nav-bar-header log" onClick={this.handleLogout}>Logout</Link> :
            <Link to='/user/login' className="nav-bar-header log">Login</Link>
        return (
            <div className = "header-page">
                <h3>Baby Tracks </h3><img src="https://img.icons8.com/metro/26/000000/baby-feet.png"></img>
                <div className = "header-links">
                {loggedIn}
                <Link to='/dashboard' className="nav-bar-header dash">Dashboard</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);