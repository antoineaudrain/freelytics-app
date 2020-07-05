import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, Text, Button } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from '../components'
import { logout } from '../store/actions'

const styles = StyleSheet.create({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    height: 64,
    width: 64,

    marginTop: 12,
    marginBottom: 12,

    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 14,
    paddingRight: 14,
  },
})

export default () => {
  const { colors, font, border } = useTheme()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    AsyncStorage.setItem('userToken', '')
  }

  return (
    <View
      style={{
        height: '100%',
        paddingTop: 44,
        backgroundColor: colors.base,
      }}
    >
      <Header title="Profile" goBack />

      {user && user.firstName && user.lastName && (
        <View style={styles.avatarContainer}>
          <View
            style={{
              ...styles.avatar,
              backgroundColor: colors.lightBlue,
              borderRadius: border.radius.round,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: font.weight.bold,
                color: font.colors.variant.blue,
              }}
            >
              {`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}
            </Text>
          </View>
          <Text
            style={{
              fontSize: font.size.content.small,
              fontWeight: font.weight.bold,
              color: font.colors.primary.grey4,
            }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
      )}

      <Button title="Sign out" onPress={() => logoutHandler()} />
    </View>
  )
}
