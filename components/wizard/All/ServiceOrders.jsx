import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { DataTable } from 'react-native-paper'
import styles from '../../../app/details/styles/warehouse.style'
import common from '../../common/styles/common.style'
import { COLORS, FONT, SIZES } from '../../../constants'
import Search from '../../common/search/Search'
import { Entypo } from '@expo/vector-icons'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useNavigation } from 'expo-router/src/useNavigation'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { deleteSingleServiceOrders } from '../../../api/dashboard/wizard'
import CustomModal from '../../common/modal/CustomModal'

const ServiceOrders = ({ data, page, setPage, total, refresh, setRefresh }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [visible, setVisible] = useState(false)
  const [selectedId, setSelectedId] = useState()
  const [searchQuery, setSearchQuery] = useState()

  const onDelete = () => {
    deleteSingleServiceOrders(selectedId, dispatch, toast, () => {
      setRefresh(!refresh)
    })
  }
  return (
    <View>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        onSuccess={onDelete}
      />
      <Text
        style={{
          fontFamily: FONT.medium,
          fontSize: SIZES.xLarge,
          textAlign: 'center',
          marginVertical: SIZES.small,
        }}
      >
        All Service Orders
      </Text>
      <Search
        onSearch={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Order</DataTable.Title>
          <DataTable.Title>Created Date</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title numeric>Actions</DataTable.Title>
        </DataTable.Header>

        {data?.map((single, index) => {
          return (
            <DataTable.Row
              key={index}
              style={{ paddingVertical: SIZES.medium }}
            >
              <DataTable.Cell>
                <Text style={{ ...styles.tableBoldCell }}>
                  {single.order?.product_name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                <Text style={styles.tableNormalCells}>{single.created_at}</Text>
              </DataTable.Cell>

              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    ...common.badge(COLORS.green),
                    flexWrap: 'wrap',
                  }}
                >
                  <Text
                    style={{
                      ...styles.tableNormalCells,
                      color: COLORS.pureWhite,
                    }}
                  >
                    {single.status}
                  </Text>
                </View>
              </View>
              {/* </DataTable.Cell> */}
              <DataTable.Cell numeric>
                <Menu>
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('details', {
                            screen: 'wizard',
                            params: {
                              id: single?.id,
                            },
                          })
                        }
                      >
                        <Text style={styles.detailsTextBtn}>Details</Text>
                      </TouchableOpacity>
                    </MenuOption>
                    <View style={common.divider} />

                    <MenuOption>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedId(single?.id)
                          setVisible(true)
                        }}
                      >
                        <Text style={styles.removeTextBtn}>Remove</Text>
                      </TouchableOpacity>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </DataTable.Cell>
            </DataTable.Row>
          )
        })}

        {page && total && (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(total / 10) + 1}
            onPageChange={(page) => {
              setPage(page)
            }}
            label={`${(page - 1) * 10 + 1} - ${
              page * 10 > total ? total : page * 10
            } of ${total}`}
          />
        )}
      </DataTable>
    </View>
  )
}

export default ServiceOrders
