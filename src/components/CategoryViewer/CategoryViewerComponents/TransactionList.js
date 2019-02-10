import React, { Component } from 'react'
import { ScrollView, Platform, FlatList, Text } from 'react-native'
import _ from 'lodash'

class TransactionList extends Component {
    render() {
        let data = []

        if (this.props.onlyExpenses) {
            data = [...this.props.expenses]
        } else {
            // loop through each array adding them to data object
            Object.keys(this.props.expenses).forEach(key => {
                data.unshift(this.props.expenses[key])
            })

            Object.keys(this.props.income).forEach(key => {
                data.unshift(this.props.income[key])
            })
        }

        let content = (
            <Text style={{ textAlign: 'center' }}>No transactions yet</Text>
        )

        if (data.length > 0) {
            content = (
                <FlatList
                    data={data}
                    renderItem={this.props.renderItem}
                    extraData={this.props.extraData}
                    keyExtractor={this.props.keyExtractor}
                />
            )
        }
        return (
            <ScrollView style={styles.main} bounces={false}>
                {content}
            </ScrollView>
        )
    }
}
const styles = {
    main: {
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: 0.5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 2
            }
        })
    }
}

export default TransactionList
