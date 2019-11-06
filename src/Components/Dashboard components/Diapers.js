import React from 'react'
import '../CSS/Diapers.css'
export default class Diapers extends React.Component {

    render() {
        return (
            <div>
                <h1>Diapers Page</h1>
                <h2>Total Diapers in the last 24 hours: 2</h2>
                <form>
                    <fieldset>
                        <label for="Date">Date</label>
                        <input type="date"></input><br /><br />
                        <label for="Time">Time</label>
                        <input type="time"></input><br /><br />
                    </fieldset>

                    <fieldset>
                        <input type="radio" id="poos" value="0"></input>
                        <label for="poos">Poos</label>
                        <input type="radio" id="pees" value="1"></input>
                        <label for="pees">Pees</label>

                    </fieldset>

                </form>

                <section>
                    <h2>Past Diaper Entries</h2>
                    <p  className="diaper-entry">2:30 pm{<br />} Poos</p>
                    <p  className="diaper-entry">2:30 am{<br />} Pees</p>

                </section>
            </div>
        )
    }
}