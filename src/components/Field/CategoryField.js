import React, { Component } from 'react'
import { Picker } from 'react-native'
import styles from './Field.scss'

class CategoryField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }
    render() {
        return (
            <Picker
                selectedValue={this.state.selected}
                onValueChange={selected => this.setState({ selected })}
            >
                <Picker.Item
                    label={this.props.firstCat}
                    value={this.props.firstCat}
                />
                <Picker.Item
                    label={this.props.secondCat}
                    value={this.props.secondCat}
                />
                <Picker.Item
                    label={this.props.thirdCat}
                    value={this.props.thirdCat}
                />
                <Picker.Item
                    label={this.props.fourthCat}
                    value={this.props.fourthCat}
                />
                <Picker.Item
                    label={this.props.fifthCat}
                    value={this.props.fifthCat}
                />
                <Picker.Item
                    label={this.props.sixthCat}
                    value={this.props.sixthCat}
                />
            </Picker>
        )
    }
}

export default CategoryField
