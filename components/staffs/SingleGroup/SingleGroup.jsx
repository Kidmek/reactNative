import React, { useState } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'

import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import styles from '../../common/styles/common.style'
import Search from '../../common/search/Search'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getAllFromGroup } from '../../../api/users'
import { COLORS } from '../../../constants'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const SingleGroup = ({ id, name }) => {
  const [searchQuery, setSearchQuery] = useState()
  const dispatch = store.dispatch
  const toast = useToast()
  const [staffs, setStaffs] = useState()

  const fetching = useSelector(selectIsFetching)
  useEffect(() => {
    getAllFromGroup(id, dispatch, setStaffs, toast)
  }, [])
  return (
    <ScrollView style={styles.welcomeContainer}>
      <View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </View>
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        <View style={styles.container}>
          <AddNew
            title={'New ' + name}
            page={{
              name: 'new',
              screen: 'group',
              params: {
                name,
                id,
              },
            }}
          />

          {staffs?.userslist?.map((item, index) => {
            return (
              <SingleCard key={index} isOnlyText={true}>
                <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
                  <CardDetail label={'User Name'} value={item?.first_name} />
                  <CardDetail label={'Email'} value={item?.email} />
                  <CardDetail label={'Phone'} value={item?.phone} />
                  <CardDetail label={'Salary'} value={'0 Birr/Month'} />
                  <CardDetail
                    label={'Created Date'}
                    value={item?.created_at}
                    isDate={true}
                  />
                </View>
              </SingleCard>
            )
          })}
        </View>
      )}
    </ScrollView>
  )
}

export default SingleGroup
