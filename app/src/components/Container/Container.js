import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Container = ({ children, color = 'elevated', onClick }) => {
  const { colors, border } = useTheme()

  if (onClick) {
    return (
      <TouchableOpacity
        onPress={() => onClick()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors[color],
          borderRadius: border.radius.normal,

          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors[color],
        borderRadius: border.radius.normal,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {children}
    </View>
  )
}

Container.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['base', 'elevated', 'light']),
}

export default Container
