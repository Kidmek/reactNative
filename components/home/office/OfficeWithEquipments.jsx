import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import styles from '../../common/styles/common.style'
import Info from '../../common/cards/info/Info'
import Checkbox from 'expo-checkbox'
import { COLORS, SIZES } from '../../../constants'
import CardDetail from '../../common/detail/CardDetail'
import SingleCard from '../../common/cards/single/SingleCard'
import Carousel from 'react-native-reanimated-carousel'

const OfficeWithEquipments = ({
  warehouse,
  checked,
  setChecked,
  checkedMulti,
  reqOffice,
  setOfficeReq,
  reqEquipment,
  setEquipmentReq,
}) => {
  const [office, setOffice] = useState()
  const width = Dimensions.get('window').width
  return (
    <View>
      {warehouse?.warehouseRecources &&
      warehouse?.warehouseRecources?.length ? (
        <View>
          {warehouse?.warehouseRecources?.map((item) => {
            return (
              <SingleCard
                isOnlyText
                key={item?.id}
                navigate={false}
                onClick={() => {
                  setOffice(item)
                  if (setChecked) {
                    if (checkedMulti) {
                      if (!checked?.officeId?.includes(item?.office)) {
                        setChecked({
                          ...checked,
                          officeId: [...checked?.officeId, item?.office],
                        })
                      } else {
                        setChecked({
                          ...checked,
                          officeId: checked?.officeId?.filter(
                            (c) => c != item?.office
                          ),
                          equipmentId: checked?.equipmentId?.filter((e) => {
                            let ret = true
                            item.officeDetail?.equipments?.map((eq) => {
                              if (eq?.id === e) {
                                ret = false
                              }
                            })
                            return ret
                          }),
                        })
                      }
                    } else {
                      setChecked(item?.office)
                    }
                  }
                }}
              >
                <View style={{ ...styles.textContainer, alignSelf: 'stretch' }}>
                  <View style={styles.wizCheckerHeader}>
                    <Text style={styles.wizTitle}>
                      {item?.officeDetail?.name}
                    </Text>
                    <Checkbox
                      color={COLORS.primary}
                      value={
                        checkedMulti
                          ? checked?.officeId?.includes(item?.office)
                          : checked === item?.office
                      }
                      onValueChange={(value) => {
                        setOffice(item)

                        if (setChecked) {
                          if (checkedMulti) {
                            if (!checked?.officeId?.includes(item?.office)) {
                              setChecked({
                                ...checked,
                                officeId: [...checked?.officeId, item?.office],
                              })
                            } else {
                              setChecked({
                                ...checked,
                                officeId: checked?.officeId?.filter(
                                  (c) => c != item?.office
                                ),
                              })
                            }
                          } else {
                            setChecked(item?.office)
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
                  </View>
                </View>
              </SingleCard>
            )
          })}
          {checked?.officeId?.length > 0 &&
            office &&
            (office?.officeDetail?.equipments?.length > 0 ? (
              <View>
                <View style={styles.divider} />

                <Text style={styles.wizTitle}>
                  {office?.officeDetail?.name + ' Equipments'}
                </Text>
                {office?.officeDetail?.equipments?.map((equipment) => {
                  return (
                    <SingleCard
                      key={equipment.id}
                      navigate={false}
                      onClick={() => {
                        if (setChecked) {
                          if (checkedMulti) {
                            if (
                              !checked?.equipmentId?.includes(equipment?.id)
                            ) {
                              setChecked({
                                ...checked,
                                equipmentId: [
                                  ...checked?.equipmentId,
                                  equipment?.id,
                                ],
                              })
                            } else {
                              setChecked({
                                ...checked,
                                equipmentId: checked?.equipmentId?.filter(
                                  (c) => c != equipment?.id
                                ),
                              })
                            }
                          } else {
                            setChecked(equipment?.id)
                          }
                        }
                      }}
                    >
                      <Carousel
                        loop={false}
                        height={width / 2}
                        width={width}
                        pagingEnabled={true}
                        data={[equipment?.image]}
                        onSnapToItem={(index) => {}}
                        scrollAnimationDuration={1000}
                        renderItem={({ item: image }) => (
                          <Image
                            style={{ ...styles.image, alignSelf: 'center' }}
                            source={{ uri: image }}
                          />
                        )}
                        panGestureHandlerProps={{
                          activeOffsetX: [-10, 10],
                        }}
                      />
                      <View style={{ ...styles.wizCheckerHeader }}>
                        <View style={styles.textContainer}>
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
                        <Checkbox
                          color={COLORS.primary}
                          value={checked?.equipmentId.includes(equipment?.id)}
                          onValueChange={() => {
                            if (setChecked) {
                              if (checkedMulti) {
                                if (
                                  !checked?.equipmentId?.includes(equipment?.id)
                                ) {
                                  setChecked({
                                    ...checked,
                                    equipmentId: [
                                      ...checked?.equipmentId,
                                      equipment?.id,
                                    ],
                                  })
                                } else {
                                  setChecked({
                                    ...checked,
                                    equipmentId: checked?.equipmentId?.filter(
                                      (c) => c != equipment?.id
                                    ),
                                  })
                                }
                              } else {
                                setChecked(equipment?.id)
                              }
                            }
                          }}
                        />
                      </View>
                    </SingleCard>
                  )
                })}
              </View>
            ) : (
              <Info
                noIcon
                switchTitle={'Request Equipment For Office'}
                state={reqEquipment}
                setState={setEquipmentReq}
                hasSwitch={true}
                text={
                  " Currently this office dosen't have assigned equipments yet !"
                }
              />
            ))}
        </View>
      ) : (
        <Info
          noIcon
          switchTitle={'Request Office'}
          state={reqOffice}
          setState={setOfficeReq}
          hasSwitch={true}
          text={
            " Currently this warehouse dosen't have assigned office resources yet !"
          }
        />
      )}
    </View>
  )
}

export default OfficeWithEquipments
