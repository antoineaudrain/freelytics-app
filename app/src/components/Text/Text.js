import React from 'react'
import PropTypes from 'prop-types'
import { Text as Paragraph } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Text = ({ children, size = 'medium', weight = 'bold', color = 'grey4' }) => {
  const { font } = useTheme()

  return (
    <Paragraph
      style={{
        fontSize: font.size.content[size],
        fontWeight: font.weight[weight],
        color: color.includes('grey')
          ? font.colors.primary[color]
          : font.colors.variant[color],
      }}
    >
      {children}
    </Paragraph>
  )
}

Text.propTypes = {
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
    'white',
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

export default Text
