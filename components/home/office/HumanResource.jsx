import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import Info from '../../common/cards/info/Info'
import Checkbox from 'expo-checkbox'
import { COLORS, SIZES } from '../../../constants'
import CardDetail from '../../common/detail/CardDetail'

const HumanResource = ({ warehouse, checked, setChecked }) => {
  return (
    <View>
      {warehouse?.HumanResources && warehouse?.HumanResources?.length ? (
        warehouse?.HumanResources?.map((item) => {
          return (
            <TouchableOpacity
              key={item?.id}
              onPress={() => {
                if (setChecked) {
                  setChecked(item?.id)
                }
              }}
            >
              <View
                style={{ ...styles.onlyTextContainer, alignItems: 'stretch' }}
              >
                <View style={styles.wizCheckerHeader}>
                  <Text style={styles.wizTitle}>
                    {item?.officeDetail?.name}
                  </Text>
                  <Checkbox
                    color={COLORS.primary}
                    value={checked === item?.id}
                    onValueChange={(value) => {
                      if (value) {
                        if (setChecked) {
                          setChecked(item?.id)
                        }
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: SIZES.medium,
                    marginTop: SIZES.small,
                  }}
                >
                  <CardDetail
                    label={'Office Space'}
                    value={item?.officeDetail?.space}
                    isSpace
                  />
                  <CardDetail
                    label={'Office Price'}
                    value={item?.officeDetail?.price + ' Birr / Day'}
                  />
                  <View style={styles.divider} />
                </View>
                <Text style={styles.wizTitle}>
                  {item?.officeDetail?.name + ' Equipments'}
                </Text>
                {item?.officeDetail?.equipments?.map((equipment) => {
                  return (
                    <View key={equipment.id}>
                      <View style={{ alignItems: 'center' }}>
                        <Image
                          height={SIZES.smallPicture}
                          width={Dimensions.get('window').width * 0.9}
                          source={{ uri: equipment?.image }}
                        />
                        <Text style={styles.name}>
                          Name : {equipment?.name}
                        </Text>
                        <Text style={styles.middle}>
                          Equipment Type : {equipment?.equipment_type}
                        </Text>
                        <Text style={styles.type}>
                          Price / Day : {equipment?.price} Birr
                        </Text>
                      </View>

                      <View style={styles.divider} />
                    </View>
                  )
                })}
              </View>
            </TouchableOpacity>
          )
        })
      ) : (
        <Info
          text={
            " Currently this warehouse dosen't have assigned human resources yet !"
          }
        />
      )}
    </View>
  )
}

export default HumanResource
