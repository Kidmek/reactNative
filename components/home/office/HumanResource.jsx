import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import Info from '../../common/cards/info/Info'
import Checkbox from 'expo-checkbox'
import { COLORS, SIZES } from '../../../constants'
import SingleCard from '../../common/cards/single/SingleCard'
import Input from '../../common/input/Input'
import { NUMBER } from '../../../constants/strings'

const HumanResource = ({
  checked,
  setChecked,
  groups,
  values,
  setValues,
  reqHR,
  setHRReq,
}) => {
  return (
    <View>
      {groups ? (
        groups?.results?.map((item) => {
          return (
            <SingleCard
              key={item?.id}
              onClick={() => {
                if (setChecked) {
                  const price = { id: item?.group, price: item?.group }
                  if (!checked?.includes(item?.group)) {
                    setChecked([...checked, item?.group], price)
                  } else {
                    setChecked(checked?.filter((c) => c != item?.group))
                  }
                }
              }}
              isOnlyText
            >
              <View
                style={{ ...styles.onlyTextContainer, alignItems: 'stretch' }}
              >
                <View style={styles.wizCheckerHeader}>
                  <Text style={styles.wizTitle}>{item?.groupdetail?.name}</Text>
                  <Checkbox
                    color={COLORS.primary}
                    value={checked?.includes(item?.group)}
                    onValueChange={(value) => {
                      const price = { id: item?.group, price: item?.group }
                      if (setChecked) {
                        if (value) {
                          setChecked([...checked, item?.group], price)
                        } else {
                          setChecked(checked?.filter((c) => c != item?.group))
                        }
                      }
                    }}
                  />
                </View>
                {checked?.includes(item?.group) && (
                  <View>
                    <Input
                      state={values?.[item?.group]}
                      setState={(value) => {
                        let prev = values
                        prev[item?.group] = value
                        setValues({ ...prev })
                      }}
                      type={NUMBER}
                      label={'Quantity'}
                    />
                  </View>
                )}
              </View>
            </SingleCard>
          )
        })
      ) : (
        <Info
          switchTitle={'Request Human Resource'}
          state={reqHR}
          setState={setHRReq}
          hasSwitch={true}
          text={
            " Currently this warehouse dosen't have assigned human resources yet !"
          }
        />
      )}
    </View>
  )
}

export default HumanResource
