import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import { ContentViewer, CategoryViewer } from '../../components'
import styles from './CategoryScreen.scss'
import { colors } from '../../globals'
import { deleteTransaction, editTransaction } from '../../store/actions'

class CategoryScreen extends Component {
    render() {
        const category = this.props.navigation.getParam('category', 'all')
        const expenses = _.filter(
            this.props.navigation.getParam('expenses', []),
            expense => expense.category === category
        )
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={colors.backgroundGradient}
                style={styles.container}
            >
                <ContentViewer backButton={true}>
                    <CategoryViewer
                        category={category}
                        expenses={expenses}
                        onlyExpenses={true}
                        showBackButton={true}
                        deleteTransactionCallback={this.props.deleteTransaction}
                        editTransactionCallback={this.props.editTransaction}
                    />
                </ContentViewer>
            </LinearGradient>
        )
    }
}

// mapDispatchToProps is what allows the component to fire off an action
const mapDispatchToProps = dispatch => {
    // Pass the name of the action inside object as first argument of bindActionCreators
    return bindActionCreators({ deleteTransaction, editTransaction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(CategoryScreen)
