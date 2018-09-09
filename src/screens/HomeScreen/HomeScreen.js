import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalSelector from 'react-native-modal-selector'
import Entities from 'html-entities/lib/html5-entities'
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
import { colors, currencies } from '../../globals'
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    firstTimeOpened,
    setCurrency
} from '../../store/actions'
import Connections from '../../Connections'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            userInfo: null
        }
    }

    // This allows the decoding of Entity characters for currency symbols
    entities = new Entities()

    componentWillMount() {
        // If no currency is selected by the user,
        // it will have a default value of USD, due to
        // the action setCurrency's default value
        this.props.setCurrency(this.props.selectedCurrency)
    }

    componentDidMount() {
        if (this.props.isFirstTimeOpened) {
            this.props.firstTimeOpened()
            this.props.navigation.navigate('Onboarding', {
                signInCallback: this.signIn
            })
        }

        Connections.init()
    }

    signIn = () => {
        console.log('SignIn Clicked')
        Connections.signIn()
    }

    signOut = () => {
        console.log('SignOut Clicked')
        Connections.signOut()
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
                tapToClose
                ref={ref => (this.drawer = ref)}
                elevation={4}
                content={
                    <SidePanel
                        selectableOptions={[
                            {
                                title: this.props.userID
                                    ? 'Sign out'
                                    : 'Sign In',
                                onPress: () => {
                                    if (this.props.userID) {
                                        this.signOut()
                                    } else {
                                        this.signIn()
                                    }
                                    this.closeSidePanel()
                                },
                                icon: 'google'
                            }
                        ]}
                    >
                        {
                            <ModalSelector
                                onModalOpen={() => {
                                    this.closeSidePanel()
                                }}
                                backdropPressToClose
                                data={currencies}
                                initValue={`${
                                    this.props.selectedCurrency.code
                                } (${this.entities.decode(
                                    this.props.selectedCurrency.symbol
                                )})`}
                                onChange={val =>
                                    this.props.setCurrency({
                                        selectedCurrency: val
                                    })
                                }
                                animationType="fade"
                            >
                                <View
                                    style={{
                                        padding: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: 500
                                    }}
                                >
                                    <Icon
                                        name="money"
                                        size={20}
                                        color="white"
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text style={{ color: '#fff' }}>
                                        {`${
                                            this.props.selectedCurrency.code
                                        } (${this.entities.decode(
                                            this.props.selectedCurrency.symbol
                                        )})`}
                                    </Text>
                                </View>
                            </ModalSelector>
                        }
                    </SidePanel>
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
                            income={this.props.income}
                            deleteTransactionCallback={
                                this.props.deleteTransaction
                            }
                            editTransactionCallback={this.props.editTransaction}
                        />
                    </ContentViewer>

                    <Popup
                        display={
                            <AddTransactionScreen
                                currencyType={
                                    this.props.selectedCurrency.symbol
                                }
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
        userID: state.main.userInfo ? state.main.userInfo.uid : null,
        isFirstTimeOpened: state.main.isFirstTimeOpened,
        expenses: state.transaction.expenses,
        selectedCurrency: state.main.selectedCurrency,
        income: state.transaction.income
    }
}

// mapDispatchToProps is what allows the component to fire off an action
const mapDispatchToProps = dispatch => {
    // Pass the name of the action inside object as first argument of bindActionCreators
    return bindActionCreators(
        {
            addTransaction,
            deleteTransaction,
            editTransaction,
            firstTimeOpened,
            setCurrency
        },
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
