import React from 'react'
import '../CSS/Nursing.css'
export default class Nursing extends React.Component {

    render() {
        return (
            <div>
                <h1>Nursing Page</h1>
                <h2>Average Nursing Time: 10:07</h2>
                <h3>R: 5:07    L: 5:00</h3>
                <section className="timer">
                    <h2>5:26</h2>
                    <button type="toggle" className="nursing-timer-button">Left</button>
                    <button type="toggle" className="nursing-timer-button">Right</button><br />
                    <span>L  0:00</span><br />
                    <span>R 5:26</span><br />
                    <button type="submit" className="nursing-timer-button">Save</button>
                </section>

                <section>
                    <h2>Past Nursing Entries</h2>
                    <p className="nursing-entry">From 1:05 pm to 2:30 pm{<br />} 1.5 hours</p>
                    <p className="nursing-entry">From 11:05 pm to 2:30 am{<br />} 3.5 hours</p>

                </section>
            </div>
        )
    }
}