import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import CategoriesPage from '../CategoriesPage/CategoriesPage'
import MultiViewSwitch from '../MultiViewSwitch/MultiViewSwitch'
import OverviewPage from '../OverviewPage/OverviewPage'

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
        this.props.onRef(null)
    }

    render() {
        return (
            <MultiViewSwitch
                filterChangedCallback={this.props.filterChangedCallback}
                currentPage={this.state.pageDisplayed}
                pages={[
                    <CategoriesPage
                        expenses={this.props.expenses}
                        income={this.props.income}
                    />,
                    <OverviewPage
                        expenses={this.props.expenses}
                        income={this.props.income}
                    />
                ]}
            />
        )
    }
}

export default withNavigation(MainPage)
