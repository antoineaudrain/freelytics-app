import React, { useState, useEffect } from 'react'
import {
  Text as CustomText,
  View,
  Button,
  TouchableOpacity,
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { Header, Text } from '../components'
import { addSessions } from '../store/actions'
import addExercise from '../api/addExercise'

export default ({ route: { params: { exerciseName } } }) => {
  const { colors, font, border } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [running, setRunning] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [count, setCount] = useState(0)
  const startedAt = moment().format('x')

  useEffect(() => {
    const add = async () => {
      if (!running) {
        const addedExercise = await addExercise({
          exerciseName,
          startedAt,
          endedAt: moment().format('x'),
          qty: count,
        })
        if (addedExercise) {
          dispatch(addSessions([addedExercise]))
          await navigation.navigate('Home')
        }
      }
    }
    add()
  }, [running])

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds])

  return (
    <View
      style={{
        height: '100%',
        paddingTop: 44,
        backgroundColor: colors.base,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Header title={exerciseName.toLowerCase().replace('_', ' ')} />

      <TouchableOpacity
        onPress={() => setCount(count + 1)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 91,
        }}
      >
        <CustomText
          style={{
            fontSize: 80,
            color: font.colors.primary.grey4,
            fontWeight: '600',
          }}
        >
          {count}
        </CustomText>
      </TouchableOpacity>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',

          bottom: 52,
          right: 24,
          left: 24,

          marginLeft: 20,
        }}
      >
        <Button title="Cancel" onPress={() => navigation.navigate('Home')} />

        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 57,

            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: colors.blue,
            borderRadius: border.radius.normal,
          }}
          onPress={() => setRunning(false)}
        >
          <Text size="medium">Stop Workout</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 250,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 32,
        }}
      >
        <Text weight="normal">
          {String(Math.floor(seconds / 60)).padStart(2, '0')}
          :
          {String(seconds - Math.floor(seconds / 60) * 60).padStart(2, '0')}
        </Text>
      </View>
    </View>
  )
}
