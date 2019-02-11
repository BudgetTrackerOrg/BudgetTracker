import 'react-native'
import React from 'react'
import CategoryBox from '../../src/components/Categories/CategoryBox'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<CategoryBox />).toJSON()
    expect(tree).toMatchSnapshot()
})
