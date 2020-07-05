import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useColorScheme } from 'react-native-appearance'

import { Header, Title, AnalyticsCard, Container, Text } from '../components'
import { addSessions } from '../store/actions'
import {
  weeklySessionsSelectorPUSHUPS,
  weeklySessionsSelectorSQUATS,
  monthlySessionsSelectorPUSHUPS,
  monthlySessionsSelectorSQUATS,
} from '../store/selectors'
import getUserExercisesByName from '../api/getUserExercisesByName'

const pushUpsAbout =
  'Push Ups primarily work the large chest muscles as well as the triceps. But, keep in mind that there are many more muscles involved, making the pushup a great total body exercise.'
const squatsAbout =
  'Squats are a pretty badass exercise. Done correctly, they can considerably improve lower body and core strength, muscular endurance and even balance. But, as with any exercise, it\'s worth taking time to hone your technique so as to avoid injury.'

export default ({ route: { params: { exerciseName } } }) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const isDarkTheme = useColorScheme() === 'dark'
  const weekPushUpsAvg = useSelector(weeklySessionsSelectorPUSHUPS)
  const weekSquatsAvg = useSelector(weeklySessionsSelectorSQUATS)
  const monthPushUpsAvg = useSelector(monthlySessionsSelectorPUSHUPS)
  const monthSquatsAvg = useSelector(monthlySessionsSelectorSQUATS)

  useEffect(() => {
    const getExercises = async () => {
      const exercises = await getUserExercisesByName(exerciseName)
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
        backgroundColor: colors.elevated,
      }}
    >
      <ScrollView>
        <Header title={exerciseName.toLowerCase().replace('_', ' ')} goBack />
        <View
          style={{
            paddingBottom: 34,
            paddingLeft: 16,
            paddingRight: 16,
            height: '1000%',
            backgroundColor: isDarkTheme ? colors.elevated : colors.base,
          }}
        >
          {!!weekPushUpsAvg.length && exerciseName === 'PUSH_UPS' && (
            <>
              <View style={{ marginTop: 24 }}>
                <Title size="medium">Highlight</Title>
              </View>
              <View style={{ marginTop: 6 }}>
                <AnalyticsCard
                  cardColor="light"
                  title={exerciseName.toLowerCase().replace('_', ' ')}
                  qtyLabel="reps/day"
                  currQty={weekPushUpsAvg[0]}
                  pastQty={weekPushUpsAvg[1]}
                  currLabel="This Week"
                  pastLabel="Last Week"
                  color="orange"
                />
              </View>
            </>
          )}

          {!!weekSquatsAvg.length && exerciseName === 'SQUATS' && (
            <>
              <View style={{ marginTop: 24 }}>
                <Title size="medium">Highlight</Title>
              </View>
              <View style={{ marginTop: 6 }}>
                <AnalyticsCard
                  cardColor="light"
                  title={exerciseName.toLowerCase().replace('_', ' ')}
                  qtyLabel="reps/day"
                  currQty={weekSquatsAvg[0]}
                  pastQty={weekSquatsAvg[1]}
                  currLabel="This Week"
                  pastLabel="Last Week"
                  color="orange"
                />
              </View>
            </>
          )}

          {!!monthPushUpsAvg.length && exerciseName === 'PUSH_UPS' && (
            <>
              <View style={{ marginTop: 24 }}>
                <Title size="medium">Highlight</Title>
              </View>
              <View style={{ marginTop: 6 }}>
                <AnalyticsCard
                  cardColor="light"
                  title={exerciseName.toLowerCase().replace('_', ' ')}
                  qtyLabel="reps/day"
                  currQty={monthPushUpsAvg[0]}
                  pastQty={monthPushUpsAvg[1]}
                  currLabel="This Week"
                  pastLabel="Last Week"
                  color="orange"
                />
              </View>
            </>
          )}

          {!!monthSquatsAvg.length && exerciseName === 'SQUATS' && (
            <>
              <View style={{ marginTop: 24 }}>
                <Title size="medium">Highlight</Title>
              </View>
              <View style={{ marginTop: 6 }}>
                <AnalyticsCard
                  cardColor="light"
                  title={exerciseName.toLowerCase().replace('_', ' ')}
                  qtyLabel="reps/day"
                  currQty={monthSquatsAvg[0]}
                  pastQty={monthSquatsAvg[1]}
                  currLabel="This Week"
                  pastLabel="Last Week"
                  color="orange"
                />
              </View>
            </>
          )}

          <View style={{ marginTop: 24 }}>
            <Title size="medium">
              About
              {` ${exerciseName.toLowerCase().replace('_', ' ')}`}
            </Title>
          </View>
          <View style={{ marginTop: 6 }}>
            <Container color="light">
              <Text size="medium" weight="medium">
                {exerciseName === 'SQUATS' ? squatsAbout : pushUpsAbout}
              </Text>
            </Container>
          </View>

          {/*<View style={{ marginTop: 24 }}>*/}
          {/*  <Title size="medium">Options</Title>*/}
          {/*</View>*/}
          {/*<View style={{ marginTop: 6 }}>*/}
          {/*  <Container color="light">*/}
          {/*    <Text size="medium" weight="medium" color="blue">*/}
          {/*      Show All Data*/}
          {/*    </Text>*/}
          {/*  </Container>*/}
          {/*</View>*/}

          <View style={{ marginTop: 24 }}>
            <Container
              color="light"
              onClick={() => navigate('Counter', { exerciseName })}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 6,
                  marginBottom: 6,
                }}
              >
                <Text size="medium" color="orange">
                  Start Workout
                </Text>
              </View>
            </Container>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
