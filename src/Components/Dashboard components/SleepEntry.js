import React from 'react'
import moment from 'moment'
const ms = require('pretty-ms')


export default class SleepEntry extends React.Component {


    render() {

        const sleep = this.props.sleepProp
        const handleDelete = this.props.handleDelete

        return (

            <div className="diaper-entry">

                <p >
                    Date: {moment(sleep.starttime, ('YYYY-MM-DDhh:mm')).format('L')},
    
                    Start Time: {moment(sleep.starttime, ('YYYY-MM-DDhh:mm')).format('LT')},
    
                    End Time: {moment(sleep.endtime, ('YYYY-MM-DDhh:mm')).format('LT')}<br />
                    
                    {ms(Math.abs(sleep.duration))}
                </p>

                <button 
                    type="button" 
                    id={sleep.id} 
                    className="delete-button" 
                    onClick={handleDelete}>
                    Delete Button
                    </button>
                    </div>
                    )
    }
}