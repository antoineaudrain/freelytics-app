import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Title = ({ children, size = 'large', weight = 'bold', color = 'grey4' }) => {
  const { font } = useTheme()

  return (
    <Text
      style={{
        fontSize: font.size.title[size],
        fontWeight: font.weight[weight],
        color: color.includes('grey')
          ? font.colors.primary[color]
          : font.colors.variant[color],
      }}
    >
      {children}
    </Text>
  )
}

Title.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  weight: PropTypes.oneOf([
    'thin',
    'extraLight',
    'light',
    'normal',
    'medium',
    'semiBold',
    'bold',
    'extraBold',
    'ultraBold',
  ]),
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
    'grey',
    'grey2',
    'grey3',
    'grey4',
  ]),
}

export default Title
