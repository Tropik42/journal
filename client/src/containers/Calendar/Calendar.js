import React, {Component} from 'react'
// import axios from '../../axios/axios'
import './Calendar.css'

import Month from '../../components/Calendar/Month/Month'
export default class Calendar extends Component {

    state = {
        months: [
            {month: 'Janyary',
            days: 31
            },
            {month: 'February',
            days: 28
            },
            {month: 'March',
            days: 31
            },
            {month: 'April',
            days: 30
            },
            {month: 'May',
            days: 31
            },
            {month: 'June',
            days: 30
            },
            {month: 'Jule',
            days: 31
            },
            {month: 'August',
            days: 31
            },
            {month: 'September',
            days: 30
            },
            {month: 'October',
            days: 31
            },
            {month: 'November',
            days: 30
            },
            {month: 'December',
            days: 31
            },

        ]
    }

    render() {
        return(
            <div>
                {this.state.months.map(month => (
                    <Month
                        month = {month.month}
                        key = {month.month}
                    />
                )                    
                )}
                
            </div>
        )
    }
}