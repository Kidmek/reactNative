import { View, Text, Switch } from 'react-native'
import React from 'react'
import newOrderStyles from '../../common/styles/order.style'
import detailsStyles from '../../common/styles/common.style'
import { NUMBER, STORAGE, mSQUARE } from '../../../constants/strings'
import { COLORS } from '../../../constants'
import Input from '../../common/input/Input'
import styles from '../../common/styles/common.style'
import wizard from '../../../app/home/wizard'

const WantStorage = ({
  storages,
  storageSpace,
  setStorageSpace,
  checkIfExists,
  selectedStroage,
  setSelectedStroage,
}) => {
  return (
    <View style={newOrderStyles.listContainer}>
      {storages?.map((item) => {
        return (
          <View key={item?.id}>
            <View key={item?.id} style={newOrderStyles.resourceContainer}>
              <Text style={detailsStyles.name}>
                {item?.warehouse_storage_type?.storage_name}
              </Text>
              <Text style={detailsStyles.type}>
                <Text style={detailsStyles.label}>Space: </Text>
                {item?.available_space + mSQUARE}
              </Text>
              <Text style={detailsStyles.type}>
                <Text style={detailsStyles.label}>Height : </Text>
                {item?.height + '' + item?.heightunit}
              </Text>
              <Text style={detailsStyles.type}>
                <Text style={detailsStyles.label}>Temprature : </Text>
                {item?.mintemp + ' - ' + item?.maxtemp + ' ' + item?.tempunit}
              </Text>
              <Text style={detailsStyles.type}>
                <Text style={detailsStyles.label}>Shelving Layout : </Text>
                Empty
              </Text>
              <Text style={detailsStyles.type}>
                <Text style={detailsStyles.label}>Price/{mSQUARE}: </Text>
                {item?.totalprice + ' Birr'}
              </Text>
              <Input
                type={NUMBER}
                label={'How much space do you want to use ?'}
                state={storageSpace}
                setState={setStorageSpace}
              />
              <View style={newOrderStyles.switchContainer}>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={checkIfExists(item?.id) ? COLORS.blue : '#f4f3f4'}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={
                    !checkIfExists(item?.id, STORAGE)
                      ? () => setSelectedStroage([...selectedStroage, item?.id])
                      : () =>
                          setSelectedStroage((prev) =>
                            prev.filter((id) => id != item?.id)
                          )
                  }
                  value={checkIfExists(item?.id, STORAGE)}
                />
                <Text style={newOrderStyles.typeTitle(false)}>
                  Add {item?.warehouse_storage_type?.storage_name}
                </Text>
              </View>
            </View>
            {wizard && <View style={styles.divider} />}
          </View>
        )
      })}
    </View>
  )
}

export default WantStorage
