import React from 'react'
import styles from './Field.scss'
import DatePicker from 'react-native-datepicker'

const DateField = props => {
    let year = new Date().getFullYear().toString()
    let month = new Date().getMonth().toString()
    let day = new Date().getDay().toString()

    return (
        <DatePicker
            style={{ width: 200 }}
            date={month + '-' + day + '-' + year}
            mode="date"
            placeholder="Select Date"
            format="MM-DD-YYYY"
            minDate="01-01-1970"
            maxDate="01-01-1970"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
                this.setState({ date: date })
            }}
        />
    )
}

export default DateField
