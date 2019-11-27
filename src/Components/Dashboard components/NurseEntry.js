import React from 'react'
import moment from 'moment'
import '../CSS/Nursing.css'
import config from '../../config'
const ms = require('pretty-ms')

export default class NurseEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            starttime: this.props.nurseProp.starttime,
            endtime: this.props.nurseProp.endtime,
            duration: this.props.nurseProp.duration,
            rightside: this.props.nurseProp.rightside,
            leftside: this.props.nurseProp.leftside,
            target: ""
        }
    }

    toggleUpdate = () => {
        this.setState({
            update: !this.state.update
        })
    }

    handleChange = (e) => {
        let target = e.target.id;
        let value = e.target.value;
        this.setState({
            [target]: value
        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        let rightmin = e.target['update-right-minutes'].value
        let rightsec = e.target['update-right-seconds'].value
        let leftmin = e.target['update-left-minutes'].value
        let leftsec = e.target['update-left-seconds'].value
        let totalmin = e.target['update-duration-minutes'].value
        let totalsec = e.target['update-duration-seconds'].value
        let right = (rightmin*60000) + (rightsec*1000)
        let left = (leftmin*60000) + (leftsec*1000)
        let duration = (totalmin*60000) + (totalsec*1000)

        let startTime = moment(e.target['update-date'].value + e.target['update-start-time'].value, ('YYYY-MM-DDHH:mm'))
        let end = moment(startTime, ('YYYY-MM-DDHH:mm')).add(duration, 'milliseconds')
        const newNurse = {
            starttime: startTime,
            endtime: end,
            duration: duration,
            rightside: right,
            leftside: left
        }

        fetch(`${config.API_BASE_URL}/nursing/${localStorage.getItem('token')}/${this.props.nurseProp.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNurse)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(error => {
                            throw error
                        })
                }
            })
            .then(
                this.setState({
                    update: false
                })
            )
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
            window.location.reload()


    }



    render() {

        const nurse = this.props.nurseProp
        const handleDelete = this.props.handleDelete
        const entry = this.state.update ? <div className="nursing-entry" key={nurse.id}>

            <form onSubmit={this.handleUpdate}>
                <label htmlFor="Date">Date:</label>
                <input
                    type="date"
                    id="update-date"
                    defaultValue={moment(nurse.starttime, ('YYYY-MM-DDhh:mm')).format('YYYY-MM-DD')}
                    onChange={this.handleChange}>
                </input>

                <label htmlFor="start-time">Start Time:</label>
                <input
                    type="time"
                    id="update-start-time"
                    defaultValue={moment(nurse.starttime, ('YYYY-MM-DDhh:mm a')).format('HH:mm')}
                    onChange={this.handleChange}>
                </input><br />

                <label htmlFor="end-time">End Time:</label>
                <input
                    type="time"
                    id="update-end-time"
                    defaultValue={moment(nurse.endtime, ('YYYY-MM-DDhh:mm a')).format('HH:mm')}
                    onChange={this.handleChange}>
                </input><br />

                <label htmlFor="left"> Left :</label>
                <input
                    type="text"
                    className = "minutes-seconds"
                    id="update-left-minutes"
                    defaultValue={(nurse.leftside/60000).toFixed(0)}
                    onChange={this.handleChange}>
                </input>min
                <input
                    type="text"
                    className = "minutes-seconds"
                    id="update-left-seconds"
                    defaultValue={((nurse.leftside%60000)/1000).toFixed(0)}
                    onChange={this.handleChange}>
                </input>s<br />

                <label htmlFor="right">Right:</label>
                <input
                    type="text"
                    className = "minutes-seconds"
                    id="update-right-minutes"
                    defaultValue={(nurse.rightside/60000).toFixed(0)}
                    onChange={this.handleChange}>
                </input> min
                <label htmlFor="right"></label>
                <input
                    type="text"
                    id="update-right-seconds"
                    className = "minutes-seconds"
                    defaultValue={((nurse.rightside%60000)/1000).toFixed(0)}
                    onChange={this.handleChange}>
                </input>s<br />

                <label htmlFor="total">Total:</label>
                <input
                    type="text"
                    id="update-duration-minutes"
                    className = "minutes-seconds"
                    defaultValue={(nurse.duration/60000).toFixed(0)}
                    onChange={this.handleChange}>
                </input>min
                <label htmlFor="total"></label>
                <input
                    type="text"
                    className = "minutes-seconds"
                    id="update-duration-seconds"
                    defaultValue={((nurse.rightside%60000)/1000).toFixed(0)}
                    onChange={this.handleChange}>
                </input>s<br />


                <button
                    type="submit"
                    className="update-button"
                    id={nurse.id}>
                    Update
                </button>

                <button
                    type="button"
                    className="update-button"
                    id={nurse.id}
                    onClick={this.toggleUpdate}>
                    Cancel
                </button>

                <button
                    type="button"
                    className="delete-button"
                    id={nurse.id}
                    onClick={handleDelete}>
                    Delete
                </button>
            </form>
        </div> :

            <div className="nursing-entry">
                <p> Date: {moment(nurse.starttime, ('YYYY-MM-DDhh:mm a')).format('L')} <br />
                    Start Time: {moment(nurse.starttime, ('YYYY-MM-DDhh:mm a')).format('hh:mm a')}<br />
                        End Time: {moment(nurse.endtime, ('YYYY-MM-DDhh:mm a')).format('hh:mm a')}<br />
                    Left: {ms(nurse.leftside)}<br /> Right: {ms(nurse.rightside)}<br />
                    Total: {ms(Math.abs(nurse.duration))}
                </p>

                <button
                    type="button"
                    className="delete-button"
                    id={nurse.id}
                    onClick={handleDelete}>
                    Delete
                    </button>

                <button
                    type="button"
                    className="update-button"
                    id={nurse.id}
                    onClick={this.toggleUpdate}>
                    Update
                    </button>
            </div>

        return (
            <div>
                {entry}
            </div>
        )
    }

}