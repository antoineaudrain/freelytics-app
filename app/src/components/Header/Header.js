import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { useTheme, useNavigation } from '@react-navigation/native'

import Title from '../Title/Title'
import Text from '../Text/Text'

const Header = ({ title, goBack, user }) => {
  const navigation = useNavigation()
  const { colors, border } = useTheme()

  if (goBack) {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
          marginBottom: 24,
          marginLeft: 26,
          marginRight: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',

              width: 109,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text size="small" color="blue" weight="normal">
              Back
            </Text>
            {/*
              @TODO
              Name of previous screen instead of Back
            */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title size="small" weight="semiBold">
            {title}
          </Title>
        </View>

        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        />
      </View>
    )
  }
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 48,
        marginBottom: 18,
      }}
    >
      <Title size="large" weight="bold">
        {title}
      </Title>

      {user && user.firstName && user.lastName && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

            height: 36,
            width: 36,
            borderRadius: border.radius.round,
            backgroundColor: colors.lightBlue,
          }}
        >
          <Text size="small" color="blue" weight="semiBold">
            {`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  goBack: PropTypes.bool,
  user: PropTypes.object,
}

export default Header
