import { View, Text, Switch, TextInput, Pressable } from 'react-native'
import React from 'react'
import inputStyles from '../../common/input/input.style'
import { NUMBER, STORAGE, mSQUARE } from '../../../constants/strings'
import { COLORS, SIZES } from '../../../constants'
import Input from '../../common/input/Input'
import styles from '../../common/styles/common.style'
import SingleCard from '../../common/cards/single/SingleCard'
import Checkbox from 'expo-checkbox'
import AddNew from '../../common/header/AddNew'
import { Feather } from '@expo/vector-icons'

const WizStorage = ({
  storages,
  storageSpace,
  setStorageSpace,
  checkIfExists,
  selectedStorage,
  setSelectedStorage,
}) => {
  return (
    <View>
      {storages?.map((item) => {
        return (
          <SingleCard
            key={item?.id}
            onClick={() => {
              if (setSelectedStorage) {
                if (!checkIfExists(item?.id, STORAGE)) {
                  setSelectedStorage(
                    selectedStorage
                      ? [...selectedStorage, item?.id]
                      : [item?.id]
                  )
                } else {
                  setSelectedStorage(
                    selectedStorage?.filter((id) => id != item?.id)
                  )
                  const prev = storageSpace
                  delete prev[item?.id]
                  setStorageSpace({ ...prev })
                }
              }
            }}
            isOnlyText
          >
            <View
              style={{ ...styles.onlyTextContainer, alignItems: 'stretch' }}
            >
              <View style={styles.wizCheckerHeader}>
                <Text
                  style={{
                    ...styles.wizTitle,
                    fontSize: SIZES.xLarge,
                  }}
                >
                  {item?.storage_name}
                </Text>
                <Checkbox
                  color={COLORS.primary}
                  value={checkIfExists(item?.id, STORAGE)}
                  onValueChange={(value) => {
                    if (setSelectedStorage) {
                      if (!checkIfExists(item?.id, STORAGE)) {
                        setSelectedStorage(
                          selectedStorage
                            ? [...selectedStorage, item?.id]
                            : [item?.id]
                        )
                      } else {
                        setSelectedStorage(
                          selectedStorage?.filter((id) => id != item?.id)
                        )
                      }
                    }
                  }}
                />
              </View>
              {checkIfExists(item?.id, STORAGE) && (
                <View style={{ paddingRight: SIZES.xLarge }}>
                  <Input
                    type={NUMBER}
                    label={'Space To Set Up'}
                    state={storageSpace[item?.id]?.space}
                    setState={(value) => {
                      const prev = storageSpace
                      prev[item?.id] = prev[item?.id]
                        ? { ...prev[item?.id], space: value }
                        : { space: value }
                      setStorageSpace({ ...prev })
                    }}
                  />
                  <Input
                    label={'Storage Terminal'}
                    state={storageSpace[item?.id]?.terminal}
                    setState={(value) => {
                      const prev = storageSpace
                      prev[item?.id] = prev[item?.id]
                        ? { ...prev[item?.id], terminal: value }
                        : { terminal: value }
                      setStorageSpace({ ...prev })
                    }}
                  />
                  <View>
                    <Text style={inputStyles?.inputLabel}>Temperature</Text>
                    <View
                      style={{
                        marginVertical: SIZES.medium,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <TextInput
                        style={{
                          ...inputStyles.input(false),
                          marginBottom: 0,
                          flex: 1,
                        }}
                        value={storageSpace[item?.id]?.minTemp}
                        placeholder='Min'
                        onChangeText={(value) => {
                          const prev = storageSpace
                          prev[item?.id] = prev[item?.id]
                            ? { ...prev[item?.id], minTemp: value }
                            : { minTemp: value }
                          setStorageSpace({ ...prev })
                        }}
                        inputMode={'numeric'}
                      />
                      <Text
                        style={{
                          marginHorizontal: SIZES.xLarge,
                        }}
                      >
                        -
                      </Text>
                      <TextInput
                        style={{
                          ...inputStyles.input(false),
                          marginBottom: 0,
                          flex: 1,
                        }}
                        value={storageSpace[item?.id]?.maxTemp}
                        onChangeText={(value) => {
                          const prev = storageSpace
                          prev[item?.id] = prev[item?.id]
                            ? { ...prev[item?.id], maxTemp: value }
                            : { maxTemp: value }
                          setStorageSpace({ ...prev })
                        }}
                        inputMode={'numeric'}
                        placeholder='Max'
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <Text style={styles.name}>Celcius</Text>
                      <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={
                          storageSpace[item?.id]?.tempUnit ?? false
                            ? COLORS.blue
                            : '#f4f3f4'
                        }
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={(value) => {
                          const prev = storageSpace
                          let newMin
                          let newMax
                          if (storageSpace[item?.id]?.minTemp) {
                            newMin = value
                              ? (storageSpace[item?.id]?.minTemp * 9) / 5 + 32
                              : ((storageSpace[item?.id]?.minTemp - 32) * 5) / 9
                            newMin = newMin?.toFixed(2)
                          }
                          if (storageSpace[item?.id]?.maxTemp) {
                            newMax = value
                              ? (storageSpace[item?.id]?.maxTemp * 9) / 5 + 32
                              : ((storageSpace[item?.id]?.maxTemp - 32) * 5) / 9
                            newMax = newMax?.toFixed(2)
                          }
                          prev[item?.id] = prev[item?.id]
                            ? {
                                ...prev[item?.id],
                                tempUnit: value,
                                minTemp: newMin?.toString(),
                                maxTemp: newMax?.toString(),
                              }
                            : {
                                tempUnit: value,
                                minTemp: newMin?.toString(),
                                maxTemp: newMax?.toString(),
                              }

                          setStorageSpace({ ...prev })
                        }}
                        value={storageSpace[item?.id]?.tempUnit ?? false}
                      />
                      <Text style={styles.name}>Farenheit</Text>
                    </View>
                    <View style={styles.divider} />
                    {storageSpace[item?.id]?.fields?.map((field, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: SIZES.small,
                          }}
                        >
                          <Input
                            style={{
                              flex: 1,
                            }}
                            labelState={field?.label}
                            setLabelState={(value) => {
                              const prevStorage = storageSpace

                              const prev = prevStorage[item?.id]?.fields
                              prev[index] = { ...field, label: value }
                              prevStorage[item?.id].fields = prev
                              setStorageSpace({ ...prevStorage })
                            }}
                            state={field?.value}
                            setState={(value) => {
                              const prevStorage = storageSpace

                              const prev = prevStorage[item?.id]?.fields

                              prev[index] = { ...field, value: value }
                              prevStorage[item?.id].fields = prev
                              setStorageSpace({ ...prevStorage })
                            }}
                          />
                          <Pressable
                            onPress={() => {
                              const prevStorage = storageSpace

                              let prev = storageSpace[item?.id]?.fields
                              prev = prev.filter((_, prevIndex) => {
                                return prevIndex !== index
                              })
                              prevStorage[item?.id].fields = prev
                              setStorageSpace({ ...prevStorage })
                            }}
                          >
                            <Feather
                              name='trash'
                              color={'red'}
                              size={SIZES.xxLarge}
                            />
                          </Pressable>
                        </View>
                      )
                    })}
                    <AddNew
                      title={'Add Additional Fields'}
                      onPress={() => {
                        const prev = storageSpace
                        prev[item?.id] = prev[item?.id]
                          ? {
                              ...prev[item?.id],
                              fields: prev[item?.id]?.fields
                                ? [
                                    ...prev[item?.id]?.fields,
                                    {
                                      label:
                                        'Label ' +
                                        parseInt(prev[item?.id]?.fields.length),
                                      value: '',
                                      type: '',
                                    },
                                  ]
                                : [
                                    {
                                      label: 'Label ' + 0,
                                      value: '',
                                      type: '',
                                    },
                                  ],
                            }
                          : {
                              fields: [
                                {
                                  label: 'Label ' + 0,
                                  value: '',
                                  type: '',
                                },
                              ],
                            }
                        setStorageSpace({ ...prev })
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default WizStorage
