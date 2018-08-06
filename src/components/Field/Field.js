import React from 'react'
import { TextInput } from 'react-native'
import styles from './Field.scss'

const Field = props => {
    return <TextInput style={styles.input} placeholder={props.placeholder} />
}

export default Field
