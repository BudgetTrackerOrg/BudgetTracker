import React from 'react'
import { Picker } from 'react-native-picker-dropdown'
import styles from './Field.scss'

const CategoryField = props => {
    return (
        <Picker
            style={[styles.input, styles.input__field]}
            selectedValue={props.selectedValue}
            onValueChange={props.onValueChange}
            mode="dropdown"
            prompt="Select Category"
        >
            {props.categories.map(category => {
                return (
                    <Picker.Item
                        key={category}
                        label={category}
                        value={category}
                    />
                )
            })}
        </Picker>
    )
}

export default CategoryField
