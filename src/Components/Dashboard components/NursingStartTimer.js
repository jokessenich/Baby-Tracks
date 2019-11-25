import React from 'react'
import moment from 'moment'

export default class NursingStartTimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            change: false
        }
    }

    handleClick = () => {
        this.setState({
            change: true
        })
    }


    render() {

        return (
            <div>
                <form onSubmit={this.props.changeStart}>
        <label htmlFor="startTime">Change Start Time {<br />}</label>
                    <input type="time" id="startTime" defaultValue={this.props.startTime.format('HH:mm')}></input>
                    <button type="submit" className = "save-button">Change</button>
                </form>

            </div>
        )
    }
}