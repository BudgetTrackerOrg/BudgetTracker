import 'react-native'
import React from 'react'
import Card from '../../src/components/Card/Card'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<Card />).toJSON()
    expect(tree).toMatchSnapshot()
})
