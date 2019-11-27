import React from 'react'
import '../CSS/Diapers.css'
import moment from 'moment'
import DiaperEntry from './DiaperEntry'
import { dummyDiapers } from './dummyDiapers'
import config from '../../config.js'

export default class Diapers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diaper: 'Pees',
            log: [],
            error: null
        }
    }

    componentDidMount() {
        fetch(`${config.API_BASE_URL}/diapers/${localStorage.getItem('token')}`)
            .then(res => {
                if (!res.ok){
                    this.props.history.push('/error')
                }
                        
                return res.json()
            })
            .then(diapers => {
                this.setState({
                    log: diapers.reverse()
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            diaper: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newDiaper = {
            diaperdate: e.target['date'].value,
            diapertime: e.target['time'].value,
            diapertype: this.state.diaper,
        }

        fetch(`${config.API_BASE_URL}/diapers/${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDiaper)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(error => {
                            throw error
                        })
                }
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })

        if (moment().diff(moment(newDiaper.diaperdate + newDiaper.diapertime, ('YYYY-MM-DDhh:mm')))<0){
            this.setState({
                error: "Date cannot be in the future"
            })
        }
        else{
        this.setState({
            log: [newDiaper, ...this.state.log]
        })
        window.location.reload()
    }
    }

    handleDelete = (e) => {

        const id = e.target.id

        fetch(`${config.API_BASE_URL}/diapers/${localStorage.getItem('token')}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res=>{
            if(!res.ok){
                return res.json()
                .then(error=>{
                throw error
            })}
        })
        .catch(error=> {
            this.setState({
                error: error.message
            })
        })
        
        const diapers = this.state.log.filter(diapers => diapers.id != id)
        this.setState({
            log: diapers
        })
    }

    render() {
        const pastDiapers = this.state.log.map(diaper => <DiaperEntry diaperProp={diaper} handleDelete={this.handleDelete}></DiaperEntry>)
        const error= this.state.error
        const dayDiapers = this.state.log.filter(diaper => moment().diff(moment(diaper.diaperdate + diaper.diapertime, ('YYYY-MM-DDhh:mm')), 'hours') < 24)
        return (
            <div className="diaper-page">
                <h1>Diapers</h1>
                <h2>Total Diapers in the last 24 hours: {dayDiapers.length}</h2>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        {error} <br />
                        <label htmlFor="Date">Date</label>
                        <input type="date" defaultValue={"2019-11-10"} id="date"></input><br /><br />
                        <label htmlFor="Time" >Time</label>
                        <input type="time" required defaultValue={"12:00"} id="time"></input><br /><br />
                    </fieldset>

                    <fieldset>
                        <input type="radio" id="poos" value="Poos" checked={this.state.diaper === 'Poos'} onChange={this.handleChange}></input>
                        <label htmlFor="poos">Poos</label>
                        <input type="radio" id="pees" value="Pees" checked={this.state.diaper === 'Pees'} onChange={this.handleChange}></input>
                        <label htmlFor="pees">Pees</label>
                        <input type="radio" id="mixed" value="Mixed" checked={this.state.diaper === 'Mixed'} onChange={this.handleChange}></input>
                        <label htmlFor="mixed">Mixed</label><br />

                    <button type="submit" className = "save-button">Save</button>
                    </fieldset>
                </form>

                <section>
                    <h2>Past Diaper Entries</h2>
                    {pastDiapers}

                    <p></p>
                </section>
            </div>
        )
    }
}