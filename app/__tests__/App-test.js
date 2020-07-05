import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../src'

// eslint-disable-next-line
it('renders correctly', () => {
  renderer.create(<App />)
})
