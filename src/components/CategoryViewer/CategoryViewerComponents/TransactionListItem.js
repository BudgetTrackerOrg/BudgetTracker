import React from 'react'
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback
} from 'react-native'
import { functions, categories } from '../../../globals'

class TransactionListItem extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback
                onLongPress={() => this.props.onLongPress(this.props)}
                showCategory={this.props.showCategory}
            >
                <View style={styles.main}>
                    <View style={styles.left}>
                        <Text
                            style={{
                                display: this.props.showCategory
                                    ? 'flex'
                                    : 'none',
                                color: '#333'
                            }}
                        >
                            {categories[this.props.category].displayTitle}
                        </Text>
                        <Text style={styles.title}>
                            {functions.toTitleCase(this.props.title)}
                        </Text>
                        <Text style={styles.date}>
                            {functions.toSimpleDateString(
                                new Date(this.props.dateAdded)
                            )}
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.amount}>
                            {functions.formatCurrency(
                                this.props.amount,
                                this.props.selectedCurrency.symbol
                            )}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'flex-start',
        margin: 5,
        borderRadius: 10,
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
    },
    left: {
        flex: 2
    },
    right: {
        flex: 2,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    amount: {
        fontSize: 26,
        fontWeight: '200'
    }
}

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default connect(mapStateToProps)(TransactionListItem)
