import React from 'react'
import '../CSS/Nursing.css'
import { dummyNurse } from './dummyNurse'
import moment from 'moment'
import RightTimer from './RightTimer'
import NursingStartTimer from './NursingStartTimer'
import NurseEntry from './NurseEntry'
const ms = require('pretty-ms')


export default class Nursing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            log: [],
            left: {
                time: 0,
                isOn: false,
                start: 0
            },
            right: {
                time: 0,
                isOn: false,
                start: 0
            },
            total: {
                time: 0,
                isOn: false,
                start: 0
            },
            rightSideFirst: true,
            error: null
        }

    }

    componentDidMount() {
        fetch(`http://localhost:8000/nursing/${localStorage.getItem('token')}`)

            .then(res => {
                if (!res.ok) {
                    this.props.history.push('/error')
                    throw res
                }
                return res.json()
            })
            .then(res => {

                this.setState({
                    log: res.reverse()
                })
            })
    }

    startLeftTimer = () => {
        let startTime = moment()
        if (this.state.right.start === 0 && this.state.left.start === 0) {
            this.setState({
                total: {
                    isOn: false,
                    time: 0,
                    start: startTime
                },
                rightSideFirst: false
            })
        }

        if (!this.state.right.isOn && !this.state.left.isOn) {
            this.setState({
                left: {
                    isOn: true,
                    time: this.state.left.time,
                    start: startTime.subtract(this.state.left.time, 'milliseconds')
                }
            })
            this.timer = setInterval(() =>
                this.setState({
                    left: {
                        isOn: true,
                        time: moment().diff(this.state.left.start, 'milliseconds'),
                        start: this.state.left.start
                    },
                    total: {
                        isOn: true,
                        time: this.state.left.time + this.state.right.time + 1000,
                        start: this.state.total.start
                    }
                }), 1000);
        }
    }

    stopLeftTimer = () => {
        this.setState({
            left: {
                isOn: false,
                time: this.state.left.time,
                start: this.state.left.start
            }
        })
        clearInterval(this.timer)


    }

    startRightTimer = () => {
        let rightNow = moment()
        if (this.state.right.start === 0 && this.state.left.start === 0) {
            this.setState({
                total: {
                    isOn: false,
                    time: 0,
                    start: rightNow
                },
                rightSideFirst: true
            })
        }

        if (!this.state.right.isOn && !this.state.left.isOn) {
            this.setState({
                right: {
                    isOn: true,
                    time: this.state.right.time,
                    start: rightNow.subtract(this.state.right.time, 'milliseconds')
                }
            })
            this.timer = setInterval(() =>
                this.setState({
                    right: {
                        isOn: true,
                        time: moment().diff(this.state.right.start, 'milliseconds'),
                        start: this.state.right.start
                    },
                    total: {
                        isOn: true,
                        time: this.state.left.time + this.state.right.time + 1000,
                        start: this.state.total.start
                    }
                }), 1000);
        }
    }

    stopRightTimer = () => {
        this.setState({
            right: {
                isOn: false,
                time: this.state.right.time,
                start: this.state.right.start
            }
        })
        clearInterval(this.timer)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let right = this.state.right.time
        let left = this.state.left.time
        let total = this.state.total.time
        let startTime = this.state.total.start.format('YYYY-MM-DDhh:mm a')
        let end = this.state.total.start.add(total, 'milliseconds').format('YYYY-MM-DDhh:mm a')
        const newNurse = {
            starttime: startTime,
            endtime: end,
            duration: total,
            rightside: right,
            leftside: left
        }

        fetch(`http://localhost:8000/nursing/${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNurse)
        })
            .then(res => {
                if (!res.ok) {
                    this.setState({
                        error: "Something went wrong :/. Please try again."
                    })
                }
            })


        this.setState({
            log: [newNurse, ...this.state.log],
            left: {
                time: 0,
                isOn: false,
                start: 0
            },
            right: {
                time: 0,
                isOn: false,
                start: 0
            },
            total: {
                time: 0,
                isOn: false,
                start: 0
            },
        })

        window.location.reload()

    }

    handleDelete = (e) => {
        const id = e.target.id
        fetch(`http://localhost:8000/nursing/${localStorage.getItem('token')}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        const nursings = this.state.log.filter(nurse => nurse.id != id)
        this.setState({
            log: nursings
        })

    }

    changeStart = (e) => {

        const newStart = moment(e.target.startTime.value, ('hh:mm a'))
        const timeDiff = this.state.total.start.diff(newStart, 'minutes')
        const timeDiffInMs = timeDiff * 60000
        e.preventDefault();

        if (this.state.rightSideFirst && this.state.right.isOn) {
            this.setState({
                right: {
                    start: this.state.right.start.subtract(timeDiff, 'minutes'),
                    time: this.state.right.time,
                    isOn: this.state.right.isOn
                }
            })
        }
        else if (this.state.rightSideFirst) {
            this.setState({
                right: {
                    start: this.state.right.start.subtract(timeDiff, 'minutes'),
                    time: this.state.right.time + timeDiffInMs,
                    isOn: this.state.right.isOn
                },
                total: {
                    start: newStart,
                    time: this.state.total.time + timeDiffInMs,
                    isOn: this.state.total.isOn
                }
            })

        }

        else if (!this.state.rightSideFirst && this.state.left.isOn) {
            this.setState({
                left: {
                    start: this.state.left.start.subtract(timeDiff, 'minutes'),
                    time: this.state.left.time,
                    isOn: this.state.left.isOn
                }
            })
        }
        else if (this.state.rightSideFirst) {
            this.setState({
                left: {
                    start: this.state.left.start.subtract(timeDiff, 'minutes'),
                    time: this.state.left.time + timeDiffInMs,
                    isOn: this.state.left.isOn
                },
                total: {
                    start: newStart,
                    time: this.state.total.time + timeDiffInMs,
                    isOn: this.state.total.isOn
                }
            })
        }
    }


    render() {
        const left = (!this.state.left.isOn) ?
            <button onClick={this.startLeftTimer} className="nursing-timer-button">L</button> :
            <button
                onClick={this.stopLeftTimer}
                className="nursing-timer-button">
                <i class="material-icons">pause</i>
            </button>

        const right = (!this.state.right.isOn) ?
            <button onClick={this.startRightTimer} className="nursing-timer-button">R</button> :
            <button onClick={this.stopRightTimer} className="nursing-timer-button"><i class="material-icons">pause</i>
            </button>

        const pastNurse = this.state.log.map(nurse => <NurseEntry nurseProp={nurse} handleDelete={this.handleDelete} key={nurse.id}></NurseEntry>)

        const nursingStartTime = this.state.total.isOn ? <NursingStartTimer changeStart={this.changeStart} startTime={moment().subtract((this.state.total.time) / 1000, 'seconds')}></NursingStartTimer> : ""

        const average = (this.state.log.length > 0) ? (this.state.log.reduce((total, next) => total + next.duration, 0) / this.state.log.length) : 0;
        const avgRight = (this.state.log.filter(nurse => nurse.rightside !== 0).length > 0) ? (this.state.log.reduce((total, next) => total + next.rightside, 0) / this.state.log.filter(nurse => nurse.rightside !== 0).length) : 0;
        const avgLeft = (this.state.log.filter(nurse => nurse.leftside !== 0).length > 0) ? (this.state.log.reduce((total, next) => total + next.leftside, 0) / this.state.log.filter(nurse => nurse.leftside !== 0).length) : 0;

        const error = this.state.error

        return (
            <div className="nursing-page">
                <h1>Nursing {<br />}</h1>
                {error}
                <section className="timer">
                    <h2 className="current-time">{ms(this.state.total.time)}</h2>
                    <br />
                    {nursingStartTime}
                    {left}
                    {right}<br />
                    <span>L: {ms(this.state.left.time)}</span><br />
                    <span>R: {ms(this.state.right.time)}</span><br />
                    <button type="submit" className="save-button" onClick={this.handleSubmit}>Save</button>
                </section>

                <h2 className="avg time">Averages : </h2>
                <h3 className="right-left avg">Total: {ms(average)} {<br />} R:  {ms(avgRight)} {<br />}   L:  {ms(avgLeft)}</h3>


                <section>
                    <h2 className="nursing-entry-header">Past Nursing Entries</h2>
                    {pastNurse}

                </section>
            </div >
        )
    }
}
