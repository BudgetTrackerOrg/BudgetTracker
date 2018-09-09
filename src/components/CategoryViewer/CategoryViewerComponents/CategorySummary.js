import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text } from 'react-native'
import { functions } from '../../../globals'
import CancelButton from '../../Field/CancelButton'

class CategorySummary extends React.Component {
    render() {
        return (
            <View style={styles.main}>
                {this.props.showBackButton && (
                    <CancelButton onPress={this.props.backButtonOnPress} />
                )}
                <Text style={styles.categoryTitle}>
                    {this.props.categoryTitle}
                </Text>
                <Text style={styles.totalAmount}>
                    {functions.formatCurrency(
                        this.props.totalAmount,
                        this.props.selectedCurrency.symbol
                    )}
                </Text>
            </View>
        )
    }
}

var { height, width } = Dimensions.get('window')

const styles = {
    main: {
        flex: 1,
        width,
        height,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    totalAmount: {
        fontSize: 35,
        textAlign: 'center',
        color: 'white'
    },
    categoryTitle: {
        fontSize: 15,
        textAlign: 'center',
        color: '#ffd031'
    }
}

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default connect(mapStateToProps)(CategorySummary)
