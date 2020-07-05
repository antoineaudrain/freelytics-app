import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { NavigationContainer } from '@react-navigation/native'

import { DarkTheme, LightTheme } from './themes'
import { Auth, Home, Profile, Exercise, Counter } from './containers'
import { setToken, setUser } from './store/actions'
import { getUser } from './api'

const { Navigator, Screen } = createStackNavigator()

export default () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const theme = useColorScheme() === 'dark' ? DarkTheme : LightTheme

  useEffect(() => {
    const authHandler = async () => {
      if (token) {
        const userToken = await AsyncStorage.getItem('userToken')
        console.log('ROUTER with', userToken)
        const user = await getUser()
        dispatch(setUser(user))
      } else {
        const userToken = await AsyncStorage.getItem('userToken')
        dispatch(setToken(userToken))
      }
    }
    authHandler()
  }, [token])

  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <Navigator screenOptions={{ headerShown: false }}>
          {token == null && <Screen name="Auth" component={Auth} />}

          {token != null && (
            <>
              <Screen name="Home" component={Home} />
              <Screen name="Profile" component={Profile} />
              <Screen name="Exercise" component={Exercise} />
              <Screen name="Counter" component={Counter} />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
