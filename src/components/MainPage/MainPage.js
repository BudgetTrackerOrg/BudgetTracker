import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import CategoriesPage from '../CategoriesPage/CategoriesPage'

export class MainPage extends Component {
    render() {
        return <CategoriesPage expenses={this.props.expenses} />
    }
}

export default withNavigation(MainPage)
