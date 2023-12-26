import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { React, useEffect, useState } from 'react'
import styles from '../../common/styles/common.style'
import ServiceOrders from '../All/ServiceOrders'
import { getServiceOrders } from '../../../api/dashboard/wizard'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS, SIZES } from '../../../constants'
import { useNavigation } from 'expo-router'
import dashboardStyles from '../../dashboard/dashboard.style'

import ShipmentSVG from '../../../assets/icons/shipment'
import ServicesSVG from '../../../assets/icons/services'
import SpaceSVG from '../../../assets/icons/space'
import CustomsSVG from '../../../assets/icons/customs'
import { ALL, CUSTOMS, SHIPMNET, SPACE } from '../../../constants/strings'

const WizardWelcome = () => {
  const iconSize = 30

  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [refresh, setRefresh] = useState(false)
  const [serviceOrders, setServiceOrders] = useState()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    getServiceOrders(null, dispatch, setServiceOrders, toast)
  }, [refresh])

  useEffect(() => {
    if (serviceOrders?.count) {
      setTotal(serviceOrders?.count)
    }
  }, [serviceOrders])

  const singleCard = ({ icon, title, to }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'steps',
            params: { type: to },
          })
        }}
        style={{
          ...dashboardStyles.singleContainer,
          ...dashboardStyles.textContainer,
          paddingVertical: SIZES.large,
          marginBottom: SIZES.small,
        }}
      >
        <View style={styles.icon}>{icon}</View>
        <View style={dashboardStyles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView
      style={styles.welcomeContainer}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => setRefresh(!refresh)}
        />
      }
    >
      {singleCard({
        icon: <ServicesSVG color={COLORS.primary} size={iconSize} />,
        title: 'All Services',
        to: ALL,
      })}
      {singleCard({
        icon: <SpaceSVG color={COLORS.primary} size={iconSize} />,
        title: 'Space Management',
        to: SPACE,
      })}
      {singleCard({
        icon: <ShipmentSVG color={COLORS.primary} size={iconSize} />,
        title: 'Shipment',
        to: SHIPMNET,
      })}
      {singleCard({
        icon: <CustomsSVG color={COLORS.primary} size={iconSize} />,
        title: 'Customs Transit',
        to: CUSTOMS,
      })}

      {
        <ServiceOrders
          refresh={refresh}
          setRefresh={setRefresh}
          data={serviceOrders?.results?.slice((page - 1) * 10, page * 10 - 1)}
          page={page}
          setPage={setPage}
          total={total}
        />
      }
    </ScrollView>
  )
}

export default WizardWelcome
