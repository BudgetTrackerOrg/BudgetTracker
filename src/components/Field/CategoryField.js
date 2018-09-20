import React from 'react'
import { Picker } from 'react-native-picker-dropdown'
import styles from './Field.scss'

import { categories } from '../../globals'

const CategoryField = props => {
    return (
        <Picker
            style={[styles.input, styles.input__picker]}
            selectedValue={props.selectedValue}
            onValueChange={props.onValueChange}
            mode="dropdown"
            prompt="Select Category"
        >
            {Object.keys(categories).map(category => {
                return (
                    <Picker.Item
                        key={category}
                        label={categories[category].displayTitle}
                        value={category}
                    />
                )
            })}
        </Picker>
    )
}

export default CategoryField
