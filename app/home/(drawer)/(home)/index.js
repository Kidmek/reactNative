import React, { useEffect } from 'react'

import Welcome from '../../../../components/home/welcome/Welcome'
import { useSelector } from 'react-redux'
import { selectUser, setLoading } from '../../../../features/data/dataSlice'
import { getCurrentUser } from '../../../../api/auth/auth'
import { store } from '../../../../store'
import { useToast } from 'react-native-toast-notifications'
import {
  AGENT,
  COMPANY,
  DRIVERS,
  RENTER,
  TRANSITOR,
} from '../../../../constants/strings'
import { useNavigation } from 'expo-router/src/useNavigation'
import Choose from '../../../../components/home/Choose/Choose'
import GroupWelcome from '../../../../components/home/welcome/GroupWelcome'

const index = () => {
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()

  const user = useSelector(selectUser)
  const login = useSelector(selectUser)
  useEffect(() => {
    dispatch(setLoading(true))

    getCurrentUser(() => dispatch(setLoading(false)), toast)
  }, [])

  useEffect(() => {
    if (
      user?.groupdetail?.name?.toLowerCase() === DRIVERS &&
      (!user?.license || !user?.vehicledetail)
    ) {
      navigate.navigate('(modals)/driver', {
        step: !user?.licenseid ? 1 : 2,
      })
    } else if (
      user?.groupdetail?.name?.toLowerCase() === AGENT &&
      !user?.license
    ) {
      navigate.navigate('(modals)/agent')
    } else if (
      user?.groupdetail?.name?.toLowerCase() === COMPANY &&
      !user?.companyname
    ) {
      navigate.navigate('(modals)/company')
    } else if (
      user?.groupdetail?.name?.toLowerCase() === TRANSITOR &&
      !user?.port
    ) {
      navigate.navigate('(modals)/transitor')
    }
  }, [user])
  if (
    login?.groups?.length > 0 &&
    user?.groupdetail?.name?.toLowerCase() !== RENTER
  ) {
    return <GroupWelcome group={user?.groupdetail?.name?.toLowerCase()} />
  } else {
    return login?.groups?.length || login?.is_superuser ? (
      <Welcome user={user} />
    ) : (
      <Choose />
    )
  }
}

export default index
