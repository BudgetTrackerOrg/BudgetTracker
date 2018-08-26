import React from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import {
    Footer,
    ContentViewer,
    FooterButton,
    MainPage,
    SidePanel
} from '../../components'
import Popup from '../../components/Popup/Popup'
import AddTransactionScreen from '../AddTransactionScreen/AddTransactionScreen'
import styles from './HomeScreen.scss'
import LinearGradient from 'react-native-linear-gradient'
import { bindActionCreators } from 'redux'
import { colors } from '../../globals'
import { connect } from 'react-redux'
import {
    addTransaction,
    deleteTransaction,
    firstTimeOpened
} from '../../store/actions'
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Connections from '../../Connections'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentPage: 0, userInfo: null }
    }

    componentDidMount() {
        if (this.props.isFirstTimeOpened || true) {
            this.props.firstTimeOpened()
            this.props.navigation.navigate('Onboarding', {
                signInCallback: this.signIn
            })
        }

        Connections.init()
    }

    signIn = async () => {
        let userInfo = await Connections.signIn()
        this.setState({ ...this.state, userInfo }, () => {
            console.log('Login Successful')
        })
    }

    signOut = async () => {
        await Connections.signOut()
        this.setState({ ...this.state, userInfo: null }, () => {
            console.log('Logout Successful')
        })
    }

    gotoCategoryScreen() {
        return () => {
            this.props.navigation.navigate('Category')
        }
    }

    closeSidePanel = () => {
        this.drawer.close()
    }
    openSidePanel = () => {
        this.drawer.open()
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
            <Drawer
                ref={ref => (this.drawer = ref)}
                content={
                    <SidePanel
                        selectableOptions={[
                            {
                                title: this.state.userInfo
                                    ? 'Sign out'
                                    : 'Sign In',
                                onPress: () => {
                                    if (this.state.userInfo) {
                                        this.signOut()
                                    } else {
                                        this.signIn()
                                    }
                                    this.closeSidePanel()
                                },
                                icon: 'google'
                            },
                            {
                                title: 'Settings',
                                onPress: this.closeSidePanel,
                                icon: 'cog'
                            }
                        ]}
                    />
                }
                captureGestures={true}
                openDrawerOffset={0.5}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1.0 }}
                    colors={colors.backgroundGradient}
                    style={styles.container}
                >
                    <TouchableOpacity
                        onPress={this.openSidePanel}
                        style={{ margin: 20 }}
                    >
                        <Icon name="bars" size={20} color="white" />
                    </TouchableOpacity>

                    <ContentViewer>
                        <MainPage
                            onRef={ref => (this.mainPage = ref)}
                            expenses={this.props.expenses}
                            deleteTransactionCallback={
                                this.props.deleteTransaction
                            }
                        />
                    </ContentViewer>

                    <Popup
                        display={
                            <AddTransactionScreen
                                heading="Add Purchase"
                                titlePlaceholder="What did you buy?"
                                submitBtnText="Add"
                                closeForm={() =>
                                    this.popup.current.toggleForm()
                                }
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
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        // Keys referenced in this file as -> this.props.userID
        userID: state.main.id,
        isFirstTimeOpened: state.main.isFirstTimeOpened,
        expenses: state.transaction.expenses
    }
}

// mapDispatchToProps is what allows the component to fire off an action
const mapDispatchToProps = dispatch => {
    // Pass the name of the action inside object as first argument of bindActionCreators
    return bindActionCreators(
        { addTransaction, deleteTransaction, firstTimeOpened },
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
