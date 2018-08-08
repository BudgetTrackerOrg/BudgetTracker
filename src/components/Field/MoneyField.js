import React from 'react'
import { TextInputMask } from 'react-native-masked-text'
import styles from './Field.scss'

const MoneyField = props => {
    return (
        <TextInputMask
            style={[styles.input, styles.input__field]}
            placeholder="$0.00"
            placeholderTextColor="#000"
            type={'money'}
            options={{
                precision: 2,
                separator: '.',
                unit: '$',
                delimiter: ','
            }}
            onChangeText={amount => props.onChangeText}
        />
    )
}
export default MoneyField
