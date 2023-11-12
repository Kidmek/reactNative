import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StaffWelcome from '../../components/staffs/welcome/StaffWelcome'

const staffs = () => {
  return (
    <SafeAreaView>
      <StaffWelcome />
    </SafeAreaView>
  )
}

export default staffs
