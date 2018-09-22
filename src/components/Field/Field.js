import React from 'react'
import { TextInput } from 'react-native'
import styles from './Field.scss'

const Field = props => {
    return (
        <TextInput
            value={props.value}
            style={[styles.input, styles.input__field, props.invalidStyles]}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor="#848484"
            underlineColorAndroid="transparent"
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={props.onSubmitEditing}
        />
    )
}
export default Field
