import React, { useState } from 'react'
import {
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'

import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import styles from '../../common/styles/common.style'
import Search from '../../common/search/Search'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getAllCustomers } from '../../../api/users'
import { COLORS, SIZES } from '../../../constants'
import { Entypo } from '@expo/vector-icons'
import SingleCard from '../../common/cards/single/SingleCard'
import { customerStyles } from './customers.style'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState()
  const dispatch = store.dispatch
  const toast = useToast()
  const [customers, setCustomers] = useState()
  const fetching = useSelector(selectIsFetching)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!customers) getAllCustomers(null, dispatch, setCustomers, toast)
  }, [refresh])
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
      <View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </View>
      {
        <View style={styles.container}>
          {customers?.results?.map((item, index) => {
            return (
              <SingleCard key={index} isOnlyText={true}>
                <View style={customerStyles.container}>
                  <Image
                    source={
                      item.ProfilePicture
                        ? {
                            uri: item.ProfilePicture,
                          }
                        : require('../../../assets/images/avatar.png')
                    }
                    style={{ width: 70, height: 70, borderRadius: 400 / 2 }}
                  />
                  <View style={customerStyles.textContainer}>
                    <Text style={styles.name}>
                      {item.first_name + item.last_name}
                    </Text>
                    <Text style={styles.middle}>{item.phone}</Text>
                    <Text style={styles.type}>{item.email}</Text>
                    <Text
                      style={customerStyles.popUpText(
                        item.is_active ? COLORS.green : COLORS.gray2
                      )}
                    >
                      {item.is_active ? 'Online' : 'Offline'}
                    </Text>
                  </View>
                  <Menu style={customerStyles.popUpButton}>
                    <MenuTrigger>
                      <View style={styles.btn}>
                        <Entypo
                          name='dots-three-vertical'
                          size={24}
                          color='black'
                        />
                      </View>
                    </MenuTrigger>
                    <MenuOptions
                      optionsContainerStyle={{
                        justifyContent: 'flex-end',
                        textAlign: 'flex-end',
                        color: 'red',
                        width: 'min-content',
                        paddingHorizontal: SIZES.medium,
                        paddingVertical: SIZES.small,
                      }}
                    >
                      <MenuOption>
                        <TouchableOpacity>
                          <Text style={customerStyles.popUpText(COLORS.green)}>
                            Details
                          </Text>
                        </TouchableOpacity>
                      </MenuOption>
                      <View style={styles.divider} />
                      <MenuOption>
                        <TouchableOpacity>
                          <Text
                            style={customerStyles.popUpText(COLORS.primary)}
                          >
                            Edit
                          </Text>
                        </TouchableOpacity>
                      </MenuOption>
                      <View style={styles.divider} />

                      <MenuOption>
                        <TouchableOpacity>
                          <Text style={customerStyles.popUpText(COLORS.red)}>
                            Remove
                          </Text>
                        </TouchableOpacity>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </SingleCard>
            )
          })}
        </View>
      }
    </ScrollView>
  )
}

export default Customers
