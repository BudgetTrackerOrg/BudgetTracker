import 'react-native'
import React from 'react'
import CategoriesPage from '../../src/components/CategoriesPage/CategoriesPage'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<CategoriesPage />).toJSON()
    expect(tree).toMatchSnapshot()
})
