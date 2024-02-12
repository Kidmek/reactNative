import { View } from 'react-native'
import React from 'react'
import { AGENT, COMPANY, DRIVERS, TRANSITOR } from '../../../constants/strings'
import TransitWelcome from '../../transits/welcome/TransitWelcome'
import ShipmentWelcome from '../../shipments/welcome/ShipmentWelcome'
import InsuranceWelcome from '../../insurances/welcome/InsuranceWelcome'

const GroupWelcome = ({ group }) => {
  if (group === TRANSITOR) return <TransitWelcome />
  if (group === DRIVERS) return <ShipmentWelcome />
  if (group === AGENT) return <InsuranceWelcome />

  return <View></View>
}

export default GroupWelcome
