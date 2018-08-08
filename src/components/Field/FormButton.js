import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './Field.scss'

const FormButton = props => {
    return (
        <TouchableHighlight
            onPress={props.onPress}
            style={[styles.input, styles.input__field, styles.input__button]}
        >
            <Text style={styles.input__button_text}>{props.buttonText}</Text>
        </TouchableHighlight>
    )
}
export default FormButton
