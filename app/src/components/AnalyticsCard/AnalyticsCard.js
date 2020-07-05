import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useColorScheme } from 'react-native-appearance'

import Container from '../Container/Container'
import ChartBar from '../ChartBar/ChartBar'
import Text from '../Text/Text'
import CardHeader from '../CardHeader/CardHeader'

const getRelativeWidth = (sessionCount, otherSessionCount) => {
  return sessionCount < otherSessionCount
    ? (sessionCount * 100) / otherSessionCount
    : 100
}

const AnalyticsCard = ({
  title,
  qtyLabel,
  currQty,
  pastQty,
  currLabel,
  pastLabel,
  color,
  cardColor = 'elevated',
}) => {
  const { colors } = useTheme()
  const isDarkTheme = useColorScheme() === 'dark'

  return (
    <Container color={cardColor}>
      <CardHeader icon="flame" title={title} />
      <View style={{ marginTop: 6, marginBottom: 6 }}>
        <Text size="medium" weight="bold">
          {currQty > pastQty
            ? `You're averaging fewer reps a day last week than the week before.`
            : currQty < pastQty
            ? `On average, you've made more reps this week than you did the month before.`
            : 'Your reps are consistent on average between this week and the week before.'}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          flex: 1,
          display: 'flex',
          backgroundColor: colors.grey,
        }}
      />

      <View style={{ marginBottom: 12 }}>
        <ChartBar
          position="horizontal"
          qtyLabel={qtyLabel}
          qty={currQty}
          width={getRelativeWidth(currQty, pastQty) < 30 ? 30 : getRelativeWidth(currQty, pastQty)}
          color={color}
          fontColor="white"
          label={currLabel}
        />
        <ChartBar
          position="horizontal"
          qtyLabel={qtyLabel}
          qty={pastQty}
          width={getRelativeWidth(pastQty, currQty)}
          label={pastLabel}
          color={isDarkTheme ? 'grey4' : 'grey'}
        />
      </View>
    </Container>
  )
}

AnalyticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  qtyLabel: PropTypes.string.isRequired,
  currQty: PropTypes.number.isRequired,
  pastQty: PropTypes.number.isRequired,
  currLabel: PropTypes.string.isRequired,
  pastLabel: PropTypes.string.isRequired,
  cardColor: PropTypes.oneOf(['base', 'elevated', 'light']),
  color: PropTypes.oneOf([
    'blue',
    'white',
    'green',
    'indigo',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'yellow',
    'grey',
    'grey2',
    'grey3',
    'grey4',
  ]),
}

export default AnalyticsCard
