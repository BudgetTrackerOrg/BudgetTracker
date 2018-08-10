import React from 'react'
import { TextInput } from 'react-native'
import styles from './Field.scss'

const Field = props => {
    return (
        <TextInput
            style={[styles.input, styles.input__field]}
            placeholder={props.placeholder}
            placeholderTextColor="#000"
            underlineColorAndroid="transparent"
            onChangeText={props.onChangeText}
            placeholderTextColor="#848484"
        />
    )
}
export default Field
