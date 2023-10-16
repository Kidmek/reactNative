import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { store } from '../../store'
import { useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { selectIsFetching } from '../../features/data/dataSlice'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getOfficeDetail } from '../../api/office/office'
import { OFFICE } from '../../constants/strings'

const office = () => {
  const params = useLocalSearchParams()
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [office, setOffice] = useState()

  useEffect(() => {
    getOfficeDetail(params?.id, dispatch, setOffice, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Office Information</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('new', {
              screen: 'resource',
              params: {
                id: params?.id,
                name: params?.name,
                type: OFFICE,
              },
            })
          }}
          style={styles.headerBtn}
        >
          <AntDesign name='plus' size={20} color={'white'} />
          <Text style={styles.btnText}>New Office Resource</Text>
        </TouchableOpacity>
      </View>
      {office && office.resource && (
        <View style={styles.resourcesContainer}>
          <View style={styles.resourcesHeader}>
            <Text style={styles.headerTitle}>Equipment</Text>
            <Text style={styles.headerTitle}>Reception</Text>
          </View>
          {office.resource?.map((resource, index) => {
            return (
              <View key={index} style={styles.resContainer}>
                {/* Equipment */}
                <TouchableOpacity style={styles.officeContainer}>
                  <View style={styles.textContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: resource.resOfficeEquip?.image,
                      }}
                    />
                    <Text style={styles.name}>
                      {resource.resOfficeEquip?.name}
                    </Text>
                    <Text style={styles.subName}>
                      Type: {resource.resOfficeEquip?.equipment_type}
                    </Text>
                    <Text style={styles.type}>
                      {resource.resOfficeEquip?.price} Birr
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* Reception */}
                <TouchableOpacity style={styles.officeContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>
                      {resource.resReception?.first_name}
                    </Text>
                    <Text style={styles.subName}>
                      {resource.resReception?.email}
                    </Text>
                    <Text style={styles.type}>
                      {resource.resReception?.price + ' Birr'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      )}
    </ScrollView>
  )
}

export default office
