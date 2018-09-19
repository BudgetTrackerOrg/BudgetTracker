import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View, TouchableHighlight, Text } from 'react-native'

export class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = { currentPage: 0, filterSelected: 'all' }
    }

    componentWillReceiveProps(nextProps) {
        // this check prevents an unneeded render
        if (nextProps.currentPage !== this.state.currentPage) {
            this.setState({ currentPage: nextProps.currentPage })
        }
    }

    filterChanged(filter) {
        this.setState({ ...this.state, filterSelected: filter })
        this.props.filterChangedCallback(filter)
    }

    render() {
        return (
            <View>
                <View style={styles.filterButtonContainer}>
                    <TouchableHighlight
                        onPress={() => {
                            this.filterChanged('today')
                        }}
                        style={{
                            ...styles.filterButton,
                            ...(this.state.filterSelected === 'today'
                                ? styles.selected
                                : {})
                        }}
                    >
                        <Text style={styles.filterText}>Today</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            ...styles.filterButton,
                            ...(this.state.filterSelected === 'month'
                                ? styles.selected
                                : {})
                        }}
                        onPress={() => {
                            this.filterChanged('month')
                        }}
                    >
                        <Text style={styles.filterText}>This Month</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            ...styles.filterButton,
                            ...(this.state.filterSelected === 'year'
                                ? styles.selected
                                : {})
                        }}
                        onPress={() => {
                            this.filterChanged('year')
                        }}
                    >
                        <Text style={styles.filterText}>This Year</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            ...styles.filterButton,
                            ...(this.state.filterSelected === 'all'
                                ? styles.selected
                                : {})
                        }}
                        onPress={() => {
                            this.filterChanged('all')
                        }}
                    >
                        <Text style={styles.filterText}>All Time</Text>
                    </TouchableHighlight>
                </View>
                <View>{this.props.pages[this.state.currentPage]}</View>
            </View>
        )
    }
}

const styles = {
    filterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    filterButton: {
        padding: 5
    },
    filterText: { color: 'white' },
    selected: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        borderRadius: 5
    }
}
export default withNavigation(MainPage)
