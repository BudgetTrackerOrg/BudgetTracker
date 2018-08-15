import React from 'react'
import { Footer, ContentViewer, FooterButton, MainPage } from '../../components'
import Popup from '../../components/Popup/Popup'
import AddTransactionScreen from '../AddTransactionScreen/AddTransactionScreen'
import styles from './HomeScreen.scss'
import LinearGradient from 'react-native-linear-gradient'
import { bindActionCreators } from 'redux'
import { colors } from '../../globals'
import { connect } from 'react-redux'
import { addTransaction, deleteTransaction } from '../../store/actions'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentPage: 0 }
    }

    gotoCategoryScreen() {
        return () => {
            this.props.navigation.navigate('Category')
        }
    }

    // This allows the function toggleForm from <Popup /> to be called in this file
    popup = React.createRef()
    mainPage = React.createRef()

    render() {
        let style = {
            footerButton: {
                color: this.state.currentPage === 1 ? '#212121' : '#EEE'
            }
        }
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={colors.backgroundGradient}
                style={styles.container}
            >
                <ContentViewer>
                    <MainPage
                        onRef={ref => (this.mainPage = ref)}
                        expenses={this.props.expenses}
                        deleteTransactionCallback={this.props.deleteTransaction}
                    />
                </ContentViewer>
                <Popup
                    display={
                        <AddTransactionScreen
                            heading="Add Purchase"
                            titlePlaceholder="What did you buy?"
                            submitBtnText="Add"
                            closeForm={() => this.popup.current.toggleForm()}
                        />
                    }
                    ref={this.popup}
                />
                <Footer
                    style={{
                        backgroundColor:
                            this.state.currentPage === 1
                                ? 'white'
                                : 'rgba(0,0,0,0)'
                    }}
                >
                    <FooterButton
                        focused={this.state.currentPage === 0}
                        onPress={() => {
                            this.setState(
                                { ...this.state, currentPage: 0 },
                                () => {
                                    this.mainPage.gotoPage(
                                        this.state.currentPage
                                    )
                                }
                            )
                        }}
                        iconStyle={style.footerButton}
                        title="Categories"
                        icon="md-keypad"
                    />
                    <FooterButton
                        onPress={() => this.popup.current.toggleForm()}
                        title="Add"
                        icon="md-add"
                        iconStyle={style.footerButton}
                    />
                    <FooterButton
                        focused={this.state.currentPage === 1}
                        onPress={() => {
                            this.setState(
                                { ...this.state, currentPage: 1 },
                                () => {
                                    this.mainPage.gotoPage(
                                        this.state.currentPage
                                    )
                                }
                            )
                        }}
                        iconStyle={style.footerButton}
                        title="Transactions"
                        icon="md-list"
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
    return bindActionCreators({ addTransaction, deleteTransaction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
