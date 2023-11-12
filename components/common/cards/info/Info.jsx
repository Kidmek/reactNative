import { View, Text, Switch } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import styles from './info.style'
import { COLORS } from '../../../../constants'

const Info = ({
  text,
  withoutIcon,
  title,
  hasSwitch,
  setState,
  state,
  switchTitle,
}) => {
  return (
    <View style={styles.infoContainer(!hasSwitch)}>
      {!withoutIcon && (
        <AntDesign name='infocirlceo' size={15} color={COLORS.blue} />
      )}
      <Text>
        <Text style={styles.typeTitle(true)}>
          {!withoutIcon ? 'Info alert!' : title}
        </Text>
        <Text style={styles.typeDesc(true)}> {text}</Text>
      </Text>
      {hasSwitch && (
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{
              false: '#767577',
              true: '#81b0ff',
            }}
            thumbColor={state ? COLORS.blue : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={() => setState(!state)}
            value={state}
          />
          <Text style={styles.typeTitle(false)}>{switchTitle}</Text>
        </View>
      )}
    </View>
  )
}

export default Info
