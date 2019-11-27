import React from 'react'
import moment from 'moment'


export default class DiaperEntry extends React.Component{


render(){
    const diaper = this.props.diaperProp
    const handleDelete = this.props.handleDelete

        return (
        <div className="diaper-entry">
            <p >{moment(diaper.diaperdate).format('L')}, 
            {moment(diaper.diapertime, 'hh:mm').format('LT')}, 
            <br />
            {diaper.diapertype}</p>

            <button className = "delete-button" type="button" id={diaper.id}  onClick={handleDelete}>Delete Button</button>
        </div>)

    }
}