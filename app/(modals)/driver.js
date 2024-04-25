import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '../../components/common/styles/Styles'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import Input from '../../components/common/input/Input'
import DocumentPicker from '../../components/common/input/DocumentPicker'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../../components/common/styles/warehouse.style'
import { SIZES } from '../../constants'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import {
  addDriverTrans,
  addVehicles,
  registerTransport,
} from '../../api/shipment/shipment'
import * as Location from 'expo-location'
import * as FileSystem from 'expo-file-system'
import { selectData } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { NUMBER } from '../../constants/strings'
const Driver = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  //
  const [vehicleType, setVehicleType] = useState()
  const [vehicleLength, setVehicleLength] = useState()
  const [vehicleHeight, setVehicleHeight] = useState()
  const [vehicleWidth, setVehicleWidth] = useState()
  const [licensePlate, setlicensePlate] = useState()
  const [insurance, setInsurance] = useState()

  //
  const [licenseId, setLicenseId] = useState()
  const [freight, setFreight] = useState()
  const [transFee, setTransFee] = useState()
  const [licenceFile, setLicenceFile] = useState()
  const [location, setLocation] = useState(null)
  //
  const user = useSelector(selectData)
  const [step, setStep] = useState(1)
  const onAdd = async () => {
    setStep(2)
    if (licenceFile && transFee && freight && licenseId) {
      const toBeConvered = step === 1 ? licenceFile : insurance
      const files = toBeConvered?.map(async (file) => {
        const base64 = await FileSystem.readAsStringAsync(file?.uri, {
          encoding: 'base64',
        })
        return 'data:' + file?.mimeType + ';base64,' + base64
      })
      const resolved = await Promise.all(files)
      if (step === 1) {
        addDriverTrans(
          {
            id: user?.id,
            currentLocation: {
              lat: location.coords?.latitude,
              lng: location.coords?.longitude,
            },
            licenseid: licenseId,
            licenses: resolved,
            price_kg: freight,
            price_km: transFee,
          },
          user?.id,
          dispatch,
          toast,
          () => {
            setStep(2)
          }
        )
      } else {
        addVehicles(
          {
            driver: user?.id,
            height: vehicleHeight,
            length: vehicleLength,
            type: vehicleType,
            licenseplate: licensePlate,
            insurance: resolved,
          },
          dispatch,
          toast,
          () => {
            router.back()
          }
        )
      }
    } else {
      toast.show('All Fields Required', {
        type: 'danger',
      })
    }
  }

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      toast.show('Permission to access location was denied')
      return
    }

    let location = await Location.getLastKnownPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    fetchCurrentLocation()
  }, [])

  useEffect(() => {
    if (params.step) {
      // console.log('Params', params.step)
      setStep(params.step)
    }
  }, [params])
  return (
    <BlurView style={{ flex: 1 }} intensity={100} tint='light'>
      <ScrollView>
        <Text style={defaultStyles.additionalTitle}>
          {step == 1
            ? 'Additional Required Informations'
            : 'Register Your Vehicle'}
        </Text>
        <View style={styles.divider} />
        {step === 1 ? (
          <View style={{ paddingHorizontal: SIZES.medium }}>
            <Input
              label={'License Id'}
              state={licenseId}
              setState={setLicenseId}
            />
            <Input
              label={'Transportation Fee'}
              state={transFee}
              setState={setTransFee}
              type={NUMBER}
            />
            <Input
              label={'Freight Fee'}
              state={freight}
              setState={setFreight}
              type={NUMBER}
            />
            <DocumentPicker
              title={'Upload Driving License'}
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
        ) : (
          <View style={{ paddingHorizontal: SIZES.medium }}>
            <Input
              label={'Vehicle Type'}
              state={vehicleType}
              setState={setVehicleType}
            />
            <Input
              label={'Vehicle Length'}
              state={vehicleLength}
              setState={setVehicleLength}
              type={NUMBER}
            />
            <Input
              label={'Vehicle Height'}
              state={vehicleHeight}
              setState={setVehicleHeight}
              type={NUMBER}
            />
            <Input
              label={'Vehicle Width'}
              state={vehicleWidth}
              setState={setVehicleWidth}
              type={NUMBER}
            />
            <Input
              label={'License Plate'}
              state={licensePlate}
              setState={setlicensePlate}
            />
            <DocumentPicker
              title={'Upload Vehicle Insurance'}
              name={insurance
                ?.map((file) => file?.name + ',\n\n')
                ?.toString()
                ?.trim()}
              setState={(asset) => {
                setInsurance(asset)
              }}
              multi
            />
          </View>
        )}
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

export default Driver
