import React, {Component} from 'react'
import axios from '../../../axios/axios'
import './Month.css'
import EditMonthTodo from '../EditMonthTodo/EditMonthTodo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Month extends Component {  

    // updateMonthTodos = async (id) => {
    //     try {
    //         await axios.put(`/calendar/${id}`)
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    render() {

        const days = Array(this.props.days).fill(1).map((x, i) => x+i)

        return(
            <div>
                <div className="month">     
                <div className="row month-head">
                    <div className="col-lg-4 row">
                        <ul>
                            <li> 
                            {this.props.month}/
                            <span style={{"fontSize": "18 px"}}>2021</span>                            
                            </li>
                        </ul>
                        <EditMonthTodo
                            id = {this.props.id}
                            todo = {this.props.todo}
                            onCalendarUpdate = {this.props.onCalendarUpdate}
                        />
                    </div>
                    <div className="col-lg-8"><pre>{this.props.todo}</pre></div> 
                </div>
                </div>

                <ul className="weekdays">
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                    <li>Su</li>
                </ul>

                <ul className="days">  
                    {days.map(day => <li key={day}>{day}</li>)}                    
                </ul>
            </div>
        )
    }
}
