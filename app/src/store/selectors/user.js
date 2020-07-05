import { createSelector } from 'reselect'

import {
  exercisesFilter,
  mergeExercises,
  exercises2StepsEvolution,
} from '../../utils'

const userSessionsSelector = (state) => state.user.sessions

export const currSessionsSelectorPUSHUPS = createSelector(
  userSessionsSelector,
  (exercises) => {
    const currExercises = exercisesFilter({
      exercises,
      name: 'PUSH_UPS',
      formatOption: 'MM-DD-YYYY',
    })
    return mergeExercises(currExercises)
  }
)

export const currSessionsSelectorSQUATS = createSelector(
  userSessionsSelector,
  (exercises) => {
    const currExercises = exercisesFilter({
      exercises,
      name: 'SQUATS',
      formatOption: 'MM-DD-YYYY',
    })
    return mergeExercises(currExercises)
  }
)

export const weeklySessionsSelectorPUSHUPS = createSelector(
  userSessionsSelector,
  (exercises) =>
    exercises2StepsEvolution({
      exercises,
      name: 'PUSH_UPS',
      formatOption: 'W',
      amount: 7,
      unit: 'days',
    })
)

export const weeklySessionsSelectorSQUATS = createSelector(
  userSessionsSelector,
  (exercises) =>
    exercises2StepsEvolution({
      exercises,
      name: 'SQUATS',
      formatOption: 'W',
      amount: 7,
      unit: 'days',
    })
)

export const monthlySessionsSelectorPUSHUPS = createSelector(
  userSessionsSelector,
  (exercises) =>
    exercises2StepsEvolution({
      exercises,
      name: 'PUSH_UPS',
      formatOption: 'M',
      amount: 1,
      unit: 'months',
    })
)

export const monthlySessionsSelectorSQUATS = createSelector(
  userSessionsSelector,
  (exercises) =>
    exercises2StepsEvolution({
      exercises,
      name: 'SQUATS',
      formatOption: 'M',
      amount: 1,
      unit: 'months',
    })
)

export const yearlySessionsSelectorPUSHUPS = createSelector(
  userSessionsSelector,
  (exercises) =>
    exercises2StepsEvolution({
      exercises,
      name: 'PUSH_UPS',
      formatOption: 'Y',
      amount: 1,
      unit: 'years',
    })
)

export const yearlySessionsSelectorSQUATS = createSelector(
  userSessionsSelector,
  (exercises) =>
    exercises2StepsEvolution({
      exercises,
      name: 'SQUATS',
      formatOption: 'Y',
      amount: 1,
      unit: 'years',
    })
)
