import React, { Component } from 'react'
import styles from './Field.scss'
import DatePicker from 'react-native-datepicker'

export default class DateField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }
    render() {
        return (
            <DatePicker
                style={styles.input}
                date={this.state.date}
                mode="date"
                placeholder="Select Date"
                format="MM-DD-YYYY"
                minDate={this.state.date}
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
                        marginHorizontal: 'auto',
                        borderColor: 'transparent'
                    }
                }}
                onDateChange={date => this.setState({ date })}
            />
        )
    }
}
