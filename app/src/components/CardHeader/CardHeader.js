import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Title from '../Title/Title'

const CardHeader = ({ title, icon, color = 'orange' }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Title size="small" color={color}>
        {title}
      </Title>
    </View>
  )
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'blue',
    'green',
    'indigo',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'yellow',
  ]),
}

export default CardHeader
