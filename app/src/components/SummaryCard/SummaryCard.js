import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Container from '../Container/Container'
import Text from '../Text/Text'
import CardHeader from '../CardHeader/CardHeader'

const SummaryCard = ({ navigateTo, title, qty, label }) => {
  const { navigate } = useNavigation()

  return (
    <Container onClick={() => navigate(...navigateTo)}>
      <CardHeader icon="flame" title={title} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',

          marginTop: 16,
        }}
      >
        {(qty && label && (
          <>
            <Text size="large">{qty}</Text>
            <View
              style={{
                marginBottom: 4,
                marginLeft: 2,
              }}
            >
              <Text size="small" color="grey2" weight="semiBold">
                {label}
              </Text>
            </View>
          </>
        )) || (
          <Text size="large" color="grey2">
            No Data
          </Text>
        )}
      </View>
    </Container>
  )
}

SummaryCard.propTypes = {
  navigateTo: PropTypes.array,
  title: PropTypes.string.isRequired,
  qty: PropTypes.number,
  label: PropTypes.string,
}

export default SummaryCard
