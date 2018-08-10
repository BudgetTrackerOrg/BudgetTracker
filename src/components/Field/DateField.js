import React from 'react'
import styles from './Field.scss'
import DatePicker from 'react-native-datepicker'

const DateField = props => {
    return (
        <DatePicker
            style={[styles.input, styles.input__field]}
            date={props.date}
            mode="date"
            placeholder="Select Date"
            format="MM-DD-YYYY"
            minDate="01-01-2000"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    right: 0,
                    top: 4,
                    marginRight: 0
                },
                dateInput: {
                    alignItems: 'flex-start',
                    marginHorizontal: 'auto',
                    borderColor: 'transparent'
                }
            }}
            onDateChange={props.onDateChange}
        />
    )
}

export default DateField
