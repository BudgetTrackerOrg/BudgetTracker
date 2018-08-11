import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View } from 'react-native'

export class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = { currentPage: 0 }
    }

    componentWillReceiveProps(nextProps) {
        // this check prevents an unneeded render
        if (nextProps.currentPage !== this.state.currentPage) {
            this.setState({ currentPage: nextProps.currentPage })
        }
    }

    render() {
        return <View>{this.props.pages[this.state.currentPage]}</View>
    }
}

export default withNavigation(MainPage)
