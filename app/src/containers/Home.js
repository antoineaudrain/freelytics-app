import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { Header, Title, SummaryCard } from '../components'
import { addSessions } from '../store/actions'
import {
  currSessionsSelectorPUSHUPS,
  currSessionsSelectorSQUATS,
} from '../store/selectors'
import getUserCurrExercises from '../api/getUserCurrExercises'

export default () => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const pushUps = useSelector(currSessionsSelectorPUSHUPS)
  const squats = useSelector(currSessionsSelectorSQUATS)

  useEffect(() => {
    const getExercises = async () => {
      const exercises = await getUserCurrExercises()
      if (exercises.length) {
        dispatch(addSessions(exercises))
      }
    }
    getExercises()
  }, [])

  return (
    <View
      style={{
        height: '100%',
        paddingTop: 44,
        backgroundColor: colors.base,
      }}
    >
      <ScrollView
        style={{ paddingBottom: 34, paddingLeft: 16, paddingRight: 16 }}
      >
        <Header title="Summary" user={user} />
        <View style={{ marginBottom: 6 }}>
          <Title size="medium">Activity</Title>
        </View>

        <View style={{ marginBottom: 10 }}>
          <SummaryCard
            navigateTo={['Exercise', { exerciseName: 'PUSH_UPS' }]}
            title="Push Ups"
            qty={(!!pushUps.length && pushUps[0].qty) || null}
            label="reps"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <SummaryCard
            navigateTo={['Exercise', { exerciseName: 'SQUATS' }]}
            title="Squats"
            qty={(!!squats.length && squats[0].qty) || null}
            label="reps"
          />
        </View>
      </ScrollView>
    </View>
  )
}
