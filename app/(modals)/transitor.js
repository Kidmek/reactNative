import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '../../components/common/styles/Styles'
import DocumentPicker from '../../components/common/input/DocumentPicker'
import styles from '../../components/common/styles/warehouse.style'
import { SIZES } from '../../constants'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { getPorts, registerTransitor } from '../../api/shipment/shipment'
import * as FileSystem from 'expo-file-system'
import { selectUser } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { router } from 'expo-router'
const Transitor = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  //

  //
  const [licenceFile, setLicenceFile] = useState()
  //
  const user = useSelector(selectUser)
  const [ports, setPorts] = useState()
  const [port, setPort] = useState()
  const onAdd = async () => {
    const files = licenceFile?.map(async (file) => {
      const base64 = await FileSystem.readAsStringAsync(file?.uri, {
        encoding: 'base64',
      })
      return 'data:' + file?.mimeType + ';base64,' + base64
    })
    const resolved = await Promise.all(files)

    registerTransitor(
      {
        transitor: user?.id,
        licenses: resolved,
        port: port?.id,
      },
      user?.id,
      dispatch,
      toast,
      () => {
        router.back()
      }
    )
  }

  useEffect(() => {
    getPorts(null, dispatch, setPorts, toast)
  }, [])

  return (
    <BlurView style={{ flex: 1 }} intensity={100} tint='light'>
      <ScrollView>
        <Text style={defaultStyles.additionalTitle}>
          {'Additional Required Informations'}
        </Text>
        <View style={styles.divider} />
        <View style={{ paddingHorizontal: SIZES.medium }}>
          <CustomDropdown
            label={'Port'}
            options={ports?.results}
            placeholder={'Select A Port'}
            state={port?.id}
            setOtherState={setPort}
            labelField={'name'}
            valueField={'id'}
          />
          <DocumentPicker
            title={'Upload License'}
            name={licenceFile
              ?.map((file) => file?.name + ',\n\n')
              ?.toString()
              ?.trim()}
            setState={(asset) => {
              setLicenceFile(asset)
            }}
            multi
          />
        </View>
      </ScrollView>
      {/* Footer */}
      <Animated.View style={defaultStyles.inputFooter}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[
              defaultStyles.btn,
              { paddingRight: 20, paddingLeft: 20, alignSelf: 'flex-end' },
            ]}
            onPress={() => onAdd()}
          >
            <Text style={defaultStyles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

export default Transitor
