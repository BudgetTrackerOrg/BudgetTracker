import React from 'react'
import { Footer, ContentViewer, FooterButton, MainPage } from '../../components'
import Popup from '../../components/Popup/Popup'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import styles from './HomeScreen.scss'
import LinearGradient from 'react-native-linear-gradient'
import { bindActionCreators } from 'redux'
import { colors } from '../../globals'
import { connect } from 'react-redux'
import { addTransaction } from '../../store/actions'

class HomeScreen extends React.Component {
    gotoCategoryScreen() {
        return () => {
            this.props.navigation.navigate('Category')
        }
    }

    // This allows the function openForm from <Popup /> to be called in this file
    popup = React.createRef()

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={colors.backgroundGradient}
                style={styles.container}
            >
                <ContentViewer>
                    <MainPage expenses={this.props.expenses} />
                </ContentViewer>
                <Popup
                    display={
                        <TransactionForm
                            heading="Add Purchase"
                            cancelForm={() => this.popup.current.openForm()}
                        />
                    }
                    ref={this.popup}
                />
                <Footer>
                    <FooterButton
                        onPress={() => this.popup.current.openForm()}
                        //this.props.addTransaction(this.props.userID) // Actions are referenced with -> this.props.actionName
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
        userID: state.main.id,
        expenses: state.transaction.expenses
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
)(HomeScreen)
