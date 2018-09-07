import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import CategoriesPage from '../CategoriesPage/CategoriesPage'
import MultiViewSwitch from '../MultiViewSwitch/MultiViewSwitch'
import CategoryViewer from '../CategoryViewer/CategoryViewer'
import ContentViewer from '../ContentViewer/ContentViewer'

export class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = { pageDisplayed: 0 }
    }

    gotoPage(pageNum) {
        this.setState({ pageDisplayed: pageNum })
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        return (
            <MultiViewSwitch
                currentPage={this.state.pageDisplayed}
                pages={[
                    <CategoriesPage
                        expenses={this.props.expenses}
                        income={this.props.income}
                    />,
                    <ContentViewer backButton={false}>
                        <CategoryViewer
                            expenses={this.props.expenses}
                            income={this.props.income}
                            deleteTransactionCallback={
                                this.props.deleteTransactionCallback
                            }
                            editTransactionCallback={
                                this.props.editTransactionCallback
                            }
                            showCategory={true}
                        />
                    </ContentViewer>
                ]}
            />
        )
    }
}

export default withNavigation(MainPage)
