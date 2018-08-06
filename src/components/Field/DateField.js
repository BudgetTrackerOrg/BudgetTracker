import React from 'react'
import styles from './Field.scss'
import DatePicker from 'react-native-datepicker'

const DateField = props => {
    return (
        <DatePicker
            style={styles.input}
            date={new Date()}
            mode="date"
            placeholder="Select Date"
            format="MM-DD-YYYY"
            minDate={new Date()}
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
            }}
            onDateChange={date => this.setState({ date })}
        />
    )
}

export default DateField
