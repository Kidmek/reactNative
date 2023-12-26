import { View, Text, Switch } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import styles from './info.style'
import { COLORS } from '../../../../constants'
import Checkbox from 'expo-checkbox'
import InfoSVG from '../../../../assets/icons/info'

const Info = ({
  text,
  withoutIcon,
  title,
  hasSwitch,
  setState,
  state,
  switchTitle,
  success,
}) => {
  return success ? (
    <View style={styles.infoContainer(false, success)}>
      <View style={styles.header}>
        <InfoSVG size={25} color={COLORS.green} />
        <Text style={styles.typeTitle(true, success)}>{title}</Text>
      </View>
      <Text style={styles.typeDesc(true, success)}>{text}</Text>
      <View style={styles.header}>
        <Checkbox
          value={state}
          color={COLORS.primary}
          onValueChange={(value) => {
            setState(value)
          }}
        />
        <Text style={styles.termsContainer}>
          I Agree With The{' '}
          <Text style={styles.terms}>Terms and Conditions.</Text>
        </Text>
      </View>
    </View>
  ) : (
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
