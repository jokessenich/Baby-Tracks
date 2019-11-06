import React from 'react'
import '../CSS/Sleep.css'

export default class Sleep extends React.Component {

    render() {
        return (
            <div>
                <h1>Sleep Page</h1>
                <h2>Input Sleep</h2>
                <form>
                    <fieldset>
                        <label for="Date">Date</label>
                        <input type="date"></input><br /><br />
                        <label for="Time">Time Started</label>
                        <input type="time"></input><br /><br />
                        <label for="Time">Time Stopped</label>
                        <input type="time"></input><br /><br />
                        <button type="submit">Save</button>
                    </fieldset>
                </form>
                <section>
                    <h2>Past Sleep Entries</h2>
                    <p className="diaper-entry">From 1:05 pm to 2:30 pm{<br />} 1.5 hours</p>
                    <p className="diaper-entry">From 11:05 pm to 2:30 am{<br />} 3.5 hours</p>

                </section>
            </div>
        )
    }
}