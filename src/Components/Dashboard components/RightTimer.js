import React from 'react'
import '../CSS/Nursing.css'
import moment from 'moment'

export default class RightTimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            right: {time: 0, isOn: false, start: 0},
            
            total: {time: 0, isOn: false, start: 0},
        }
    }


    startRightTimer = () => {

        let startTime = moment()

            if (!this.state.right.isOn && !this.state.left.isOn) {

                this.setState({
                    right: {
                        isOn: true,
                        time: this.state.right.time,
                        start: startTime.subtract(this.state.right.time, 'milliseconds')
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
                            start: 0
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

    render(){

        const right = (!this.state.right.isOn) ?
                <button 
                    onClick={this.startRightTimer} 
                    className="nursing-timer-button">
                    Right
                    </button> 
                    :
                <button 
                    onClick={this.stopRightTimer}  
                    className="nursing-timer-button">
                    Pause
                    </button>
                    
        return(
            <div>
                {right}
            </div>
        )}
}