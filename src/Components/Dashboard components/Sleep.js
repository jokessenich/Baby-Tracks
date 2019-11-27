import React from 'react'
import '../CSS/Sleep.css'
import moment from 'moment'
import SleepEntry from './SleepEntry'
import config from '../../config.js'


export default class Sleep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            log: [],
            error: ""
        }
    }

    componentDidMount() {
        fetch(`${config.API_BASE_URL}/sleep/${localStorage.getItem('token')}`)
            .then(res => {
                if(!res.ok){
                    this.props.history.push('/error')
                    return res.json()
                    .then(error=>{
                        throw error
                    })
                }
                return res.json()
            })
            .then(res=>{           
                this.setState({
                    log: res.reverse()
                })
                
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let startTime = moment(e.target['date-started'].value + e.target['time-started'].value, ('YYYY-MM-DDhh:mm'))
        let endTime = moment(e.target['date-ended'].value + e.target['time-ended'].value, ('YYYY-MM-DDhh:mm'))
        let duration = endTime.diff(startTime)
        const newSleep = {
            starttime: startTime._i,
            endtime: endTime._i,
            duration: duration
        }

        fetch(`${config.API_BASE_URL}/sleep/${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSleep)
        })
            .then(res => {
                if (!res.ok) {
                    this.setState({
                        error: "Something went wrong :/. Please try again."
                    })
                }
            })

        if (duration < 0) {
            this.setState({
                error: 'End time must be after start time'
            })
        }
        else if (moment().diff(startTime) < 0 || moment().diff(endTime) < 0) {
            this.setState({
                error: 'Dates cannot be in the future'
            })
        }

        else {

            this.setState({
                log: [newSleep, ...this.state.log]
            })
        window.location.reload()
        }
    }

    handleDelete = (e) => {
        const id = parseInt(e.target.id)
        fetch(`${config.API_BASE_URL}/sleep/${localStorage.getItem('token')}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        const sleeps = this.state.log.filter(sleep => sleep.id !== id)
        this.setState({
            log: sleeps
        })
    }

    render() {
        const pastSleep = this.state.log.map(sleep => <SleepEntry sleepProp={sleep} handleDelete={this.handleDelete} key = {"sleep" + sleep.id}></SleepEntry>)
        const error = this.state.error
        return (
            <div className="sleep-page">
                <h1>Sleep</h1>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        {error}<br />
                        <label htmlFor="Date">Date Started</label>
                        <input type="date" id="date-started" defaultValue={moment().format('YYYY-MM-DD')} required></input><br /><br />
                        <label htmlFor="Time">Time Started</label>
                        <input type="time" id="time-started" defaultValue={"12:00"} required></input><br /><br />
                        <label htmlFor="Date">Date Stopped</label>
                        <input type="date" id="date-ended" defaultValue={moment().format('YYYY-MM-DD')} required></input><br /><br />
                        <label htmlFor="Time">Time Stopped</label>
                        <input type="time" id="time-ended" defaultValue={"12:30"} required></input><br /><br />
                        <button className = "save-button" type="submit">Save</button>
                    </fieldset>
                </form>
                <section>
                    <h2>Past Sleep Entries</h2>
                    {pastSleep}

                </section>
            </div>
        )
    }
}