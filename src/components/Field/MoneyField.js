import React from 'react'
import { TextInput } from 'react-native'
import styles from './Field.scss'

const MoneyField = props => {
    return (
        <TextInput
            keyboardType="numeric"
            style={[styles.input, styles.input__field]}
            value={props.value}
            placeholderTextColor="#848484"
            onChangeText={props.onChangeText}
        />
    )
}
export default MoneyField
