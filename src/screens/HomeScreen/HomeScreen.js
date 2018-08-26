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
import { GoogleSignin, statusCodes } from 'react-native-google-signin'

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

        //set up google AUTH
        GoogleSignin.configure({
            ...Platform.select({
                ios: {
                    iosClientId:
                        '496467650392-p8ci0mvhmnp4j6kf0lgd3rb3fk7a90q8.apps.googleusercontent.com'
                },
                android: {}
            }),
            webClientId:
                '496467650392-u18865o2mjs0nilsr1shm7d3b1b6gcaf.apps.googleusercontent.com',
            offlineAccess: false
        })
    }

    signIn = async () => {
        console.log('starting login...')
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            this.setState({ userInfo })
            console.log(this.state.userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('SIGN_IN_CANCELLED')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('IN_PROGRESS')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('PLAY_SERVICES_NOT_AVAILABLE')
            } else {
                console.log('OTHER')
                console.log(error)
                console.log({ error })
                console.log(error.code)
            }
        }
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
                                title: 'Sign In',
                                onPress: this.closeSidePanel,
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
