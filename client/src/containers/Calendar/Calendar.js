import React, {Component} from 'react'
import axios from '../../axios/axios'
import './Calendar.css'

import Month from '../../components/Calendar/Month/Month'
export default class Calendar extends Component {

    state = {
        calendar: []
    }

    onCalendarUpdate = (id, todo) => {
       
        const newCalendar = [];
        const calendar = this.state.calendar;
        let newMonth = {};
        calendar.forEach(month => {
            if (month.calendar_id !== id) {
                newCalendar.push(month)
            } else {
                newMonth = {
                    ...month,
                    todo: todo
                };
                newCalendar.push(newMonth)
            }
        })        
        this.setState({calendar: newCalendar})
    }

    getCalendar = async () => {
        try {
            const calendar = await axios.get('/calendar')
            this.setState({calendar: calendar.data})
        } catch (err) {
            console.error(err.message)
        }
    }

    componentDidMount() {this.getCalendar()}    

    render() {
        return(
            <div>
                {this.state.calendar.map(month => (
                    <Month
                        month = {month.month}
                        key = {month.calendar_id}
                        id = {month.calendar_id}
                        days = {month.days}
                        todo = {month.todo}
                        onCalendarUpdate = {this.onCalendarUpdate}
                    />
                )                    
                )}
                
            </div>
        )
    }
}