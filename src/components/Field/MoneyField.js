import React, { Component } from 'react'
import { TextInput } from 'react-native'
import styles from './Field.scss'

class MoneyField extends Component {
    render() {
        return (
            <TextInput
                keyboardType="numeric"
                style={[
                    styles.input,
                    styles.input__field,
                    this.props.invalidStyles
                ]}
                value={this.props.value}
                placeholderTextColor="#848484"
                onChangeText={this.props.onChangeText}
            />
        )
    }
}
export default MoneyField
