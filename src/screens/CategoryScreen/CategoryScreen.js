import React from 'react'
import { ContentViewer, CategoryViewer } from '../../components'

import styles from './CategoryScreen.scss'
import LinearGradient from 'react-native-linear-gradient'
import { addTransaction } from '../../store/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CategoryScreen extends React.Component {
    render() {
        const category = this.props.navigation.getParam('category', 'all')
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={['#5A33C9', '#923AD1']}
                style={styles.container}
            >
                <ContentViewer backButton={true}>
                    <CategoryViewer
                        category={category}
                        expenses={this.props.expenses}
                    />
                </ContentViewer>
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        // Keys referenced in this file as -> this.props.userID
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
