import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
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

const ServiceOrders = ({ data }) => {
  return (
    <View>
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
      <Search />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Order</DataTable.Title>
          <DataTable.Title>Created Date</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title numeric>Actions</DataTable.Title>
        </DataTable.Header>

        {data?.results?.map((single, index) => {
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
                <Text style={styles.tableNormalCells}>
                  {new Date(single.created_at).toDateString()}
                </Text>
              </DataTable.Cell>
              {/* <DataTable.Cell
                numeric
                numberOfLines={20}
                style={{
                  width: 2,
                  //   ...common.badge(COLORS.green),
                  //   flexWrap: 'wrap',
                }}
              > */}
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
                    customStyles={{
                      justifyContent: 'flex-end',
                      textAlign: 'flex-end',
                    }}
                  >
                    <MenuOption>
                      <TouchableOpacity>
                        <Text style={styles.detailsTextBtn}>Details</Text>
                      </TouchableOpacity>
                    </MenuOption>
                    <MenuOption>
                      <TouchableOpacity>
                        <Text style={styles.detailsTextBtn}>Edit</Text>
                      </TouchableOpacity>
                    </MenuOption>
                    <MenuOption>
                      <TouchableOpacity>
                        <Text style={styles.removeTextBtn}>Remove</Text>
                      </TouchableOpacity>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </DataTable.Cell>
            </DataTable.Row>
          )
        })}

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page)
          }}
          label='1-2 of 6'
        />
      </DataTable>
    </View>
  )
}
const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'green',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
}

export default ServiceOrders
