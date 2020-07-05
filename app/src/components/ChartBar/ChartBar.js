import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'

import Title from '../Title/Title'
import Text from '../Text/Text'

const ChartBar = ({
  position,
  qty,
  qtyLabel,
  label,
  color = 'grey4',
  fontColor = 'grey4',
  width,
}) => {
  const { colors, border } = useTheme()

  if (position === 'horizontal') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          <Title>{qty}</Title>
          <View style={{ marginLeft: 2, marginBottom: 4 }}>
            <Text color="grey3" weight="medium">
              {qtyLabel}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 2,
            paddingBottom: 2,
            width: `${width}%`,
            borderRadius: border.radius.small,
            backgroundColor: colors[color],
          }}
        >
          <Text weight="semiBold" color={fontColor}>{label}</Text>
        </View>
      </View>
    )
  }
  return <></>
}

ChartBar.propTypes = {
  position: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  qty: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  qtyLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
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
  fontColor: PropTypes.oneOf([
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

export default ChartBar
