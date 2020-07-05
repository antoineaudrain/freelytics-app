import React, { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Button, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { setToken } from '../store/actions'
import { Title } from '../components'
import { login, createUser } from '../api'

export default () => {
  const { colors, font, border } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoginPage, setIsLoginPage] = useState(true)
  const dispatch = useDispatch()

  const handleLogin = async () => {
    const jwt = await login({ email, password })
    if (jwt) {
      await AsyncStorage.setItem('userToken', jwt)
      await dispatch(setToken(jwt))
    }
  }

  const handleRegister = async () => {
    await createUser({ firstName, lastName, email, password })
    setIsLoginPage(true)
  }

  return (
    <View
      style={{
        height: '100%',
        paddingTop: 44,
        backgroundColor: colors.base,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
      }}
    >
      <View style={{ marginTop: 128 }}>
        <Title weight="semiBold">Welcome,</Title>
        <Title weight="semiBold" color="grey2">
          sign in to continue
        </Title>
      </View>

      {isLoginPage && (
        <>
          <View style={{ marginTop: 48 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                backgroundColor: colors.elevated,
                borderRadius: border.radius.small,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                color: font.colors.primary.grey4,
                marginBottom: 12,
                fontSize: 16,
              }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                backgroundColor: colors.elevated,
                borderRadius: border.radius.small,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                color: font.colors.primary.grey4,
                marginBottom: 12,
                fontSize: 16,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              title="Don't have an account?"
              onPress={() => setIsLoginPage(false)}
            />
          </View>
        </>
      )}

      {!isLoginPage && (
        <>
          <View style={{ marginTop: 48 }}>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={{
                backgroundColor: colors.elevated,
                borderRadius: border.radius.small,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                color: font.colors.primary.grey4,
                marginBottom: 12,
                fontSize: 16,
              }}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={{
                backgroundColor: colors.elevated,
                borderRadius: border.radius.small,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                color: font.colors.primary.grey4,
                marginBottom: 12,
                fontSize: 16,
              }}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                backgroundColor: colors.elevated,
                borderRadius: border.radius.small,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                color: font.colors.primary.grey4,
                marginBottom: 12,
                fontSize: 16,
              }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                backgroundColor: colors.elevated,
                borderRadius: border.radius.small,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                color: font.colors.primary.grey4,
                marginBottom: 12,
                fontSize: 16,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              title="I already have an account"
              onPress={() => setIsLoginPage(true)}
            />
          </View>
        </>
      )}

      <View
        style={{
          position: 'absolute',
          display: 'flex',
          width: '100%',
          marginLeft: 16,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 100,
        }}
      >
        {(isLoginPage && (
          <Button title="Log in" onPress={() => handleLogin()} />
        )) || (
          <Button title="Sign up" onPress={() => handleRegister()} />
        )}
      </View>
    </View>
  )
}
