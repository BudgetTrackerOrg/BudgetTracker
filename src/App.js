import React from 'react'
import styles from './styles/App.scss'
import { Footer, ContentViewer, FooterButton } from './components'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addTransaction } from './store/actions'

// TransactionForm will only be here temporarily during testing
import TransactionForm from './components/TransactionForm/TransactionForm'

class App extends React.Component {
    render() {
        return (
            <LinearGradient
                colors={['#4F4366', '#676785']}
                style={styles.container}
            >

            {/* TESTING PURPOSES ONLY */}
            <TransactionForm heading="Record Spending" />

                <ContentViewer />
                <Footer>
                    <FooterButton
                        // Actions are referenced with -> this.props.actionName
                        onPress={() =>
                            this.props.addTransaction(this.props.userID)
                        }
                        title="Add"
                        icon="md-add"
                    />
                </Footer>
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => {
    return {
        // Keys referenced in this file as -> this.props.userID
        userID: state.main.id
    }
}

// mapDispatchToProps is what allows the component to fire off an action
const mapDispatchToProps = dispatch => {
    // Pass the name of the action inside object as first argument of bindActionCreators
    return bindActionCreators({ addTransaction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
