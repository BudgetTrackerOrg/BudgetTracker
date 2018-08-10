import React from 'react'
import { ContentViewer, CategoryViewer } from '../../components'

import styles from './CategoryScreen.scss'
import { colors } from '../../globals'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
class CategoryScreen extends React.Component {
    render() {
        const category = this.props.navigation.getParam('category', 'all')
        const expenses = this.props.expenses.filter(expense => {
            return expense.category == category
        })
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={colors.backgroundGradient}
                style={styles.container}
            >
                <ContentViewer backButton={true}>
                    <CategoryViewer category={category} expenses={expenses} />
                </ContentViewer>
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => {
    return {
        expenses: state.transaction.expenses
    }
}

// mapDispatchToProps is what allows the component to fire off an action
const mapDispatchToProps = dispatch => {
    // Pass the name of the action inside object as first argument of bindActionCreators
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryScreen)
