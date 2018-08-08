import React from 'react'
import { Picker } from 'react-native-picker-dropdown'
import styles from './Field.scss'

const CategoryField = props => {
    return (
        <Picker
            style={[styles.input, styles.input__field]}
            selectedValue={props.firstCat}
            onValueChange={category => props.onValueChange}
            mode="dropdown"
        >
            <Picker.Item label={props.firstCat} value={props.firstCat} />
            <Picker.Item label={props.secondCat} value={props.secondCat} />
            <Picker.Item label={props.thirdCat} value={props.thirdCat} />
            <Picker.Item label={props.fourthCat} value={props.fourthCat} />
            <Picker.Item label={props.fifthCat} value={props.fifthCat} />
            <Picker.Item label={props.sixthCat} value={props.sixthCat} />
        </Picker>
    )
}

export default CategoryField
