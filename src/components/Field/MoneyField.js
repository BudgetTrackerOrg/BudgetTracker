import React from 'react'
import { TextInputMask } from 'react-native-masked-text'
import styles from './Field.scss'

const MoneyField = () => {
    return (
        <TextInputMask
            style={styles.input}
            placeholder="$0.00"
            type={'money'}
            options={{
                precision: 2,
                separator: '.',
                unit: '$',
                delimiter: ','
            }}
        />
    )
}

export default MoneyField
