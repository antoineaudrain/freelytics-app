import moment from 'moment'

export const exercisesSubtotal = (exercises) =>
  exercises.reduce((acc, curr) => acc + curr.qty, 0)

export const exercisesFilter = ({
  exercises,
  name,
  formatOption,
  controlDate,
}) =>
  exercises.filter(({ exerciseName, endedAt }) => {
    if (exerciseName !== name) {
      return false
    }
    const formattedControlDate = controlDate
      ? moment()
          .utc()
          .subtract(controlDate.amount, controlDate.unit)
          .format(formatOption)
      : moment().utc().format(formatOption)
    const formattedSampleDate = moment(+endedAt)
      .utc()
      .format(formatOption)
    return formattedControlDate === formattedSampleDate
  })

export const exercises2StepsEvolution = ({
  exercises,
  name,
  formatOption,
  amount,
  unit,
}) => {
  let currDivider = 0
  let prevDivider = 0
  if (formatOption === 'W') {
    currDivider = 7
    prevDivider = 7
  } else if (formatOption === 'M') {
    const currDate = moment().utc()
    const prevDate = moment().utc().subtract(1, 'months')
    currDivider = new Date(
      currDate.format('YYYY'),
      currDate.format('MM'),
      0
    ).getDate()
    prevDivider = new Date(
      prevDate.format('YYYY'),
      prevDate.format('MM'),
      0
    ).getDate()
  } else if (formatOption === 'Y') {
    currDivider = 365
    prevDivider = 365
  }
  const currTotal = exercisesSubtotal(
    exercisesFilter({
      exercises,
      name,
      formatOption,
    })
  )
  const prevTotal = exercisesSubtotal(
    exercisesFilter({
      exercises,
      name,
      formatOption,
      controlDate: {
        amount,
        unit,
      },
    })
  )
  if (currTotal && prevTotal) {
    return [
      +String(currTotal / currDivider).slice(0, 5),
      +String(prevTotal / prevDivider).slice(0, 5),
    ]
  }
  return []
}

export const mergeExercises = (exercises) =>
  exercises.reduce((acc, curr) => {
    const index = acc.findIndex(
      ({ exerciseName }) => exerciseName === curr.exerciseName
    )
    if (index >= 0) {
      acc[index] = {
        ...acc[index],
        startedAt:
          acc[index].startedAt < curr.startedAt
            ? curr.startedAt
            : acc[index].startedAt,
        endedAt:
          acc[index].endedAt < curr.endedAt ? curr.endedAt : acc[index].endedAt,
        qty: acc[index].qty + curr.qty,
      }
      return acc
    }
    return [...acc, curr]
  }, [])
