import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import { Dropdown } from 'react-native-element-dropdown'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { getWarehouses } from '../../api/warehouse/warehouse'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { getStorages } from '../../api/storage/storage'
import MapView from 'react-native-maps'
import Input from '../../components/common/input/Input'
import { MULTI, NUMBER } from '../../constants/strings'

const warehouse = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const [warehouses, setWarehouses] = useState()
  const [storage, setStorage] = useState()
  const [storages, setStorages] = useState([])
  const [warehouse, setWarehouse] = useState()
  const [name, setName] = useState()
  const [region, setRegion] = useState()
  const [city, setCity] = useState()
  const [subCity, setSubCity] = useState()
  const [zone, setZone] = useState()
  const [wereda, setWereda] = useState()
  const [space, setSpace] = useState()
  const [pricePer, setPricePer] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [images, setImages] = useState([])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 6,
    })
    if (!result.canceled && result.assets.length) {
      setImages([...images, result.assets[0].uri])
    }
  }

  useEffect(() => {
    if (params?.type == 'Managed') {
      getWarehouses(null, dispatch, setWarehouses, toast)
      getStorages(null, dispatch, setStorages, toast)
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {params?.type == 'Managed'
            ? 'Manage Warehouse'
            : 'Warehouse Information'}
        </Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {params?.type == 'Unmanaged' ? (
          <>
            <MapView style={styles.map} />
            <Input label={'Warehouse Name'} state={name} setState={setName} />
            <Input label={'Region'} state={region} setState={setRegion} />
            <Input label={'City'} state={city} setState={setCity} />
            <Input label={'Sub City'} state={subCity} setState={setSubCity} />
            <Input label={'Zone'} state={zone} setState={setZone} />
            <Input label={'Wereda'} state={wereda} setState={setWereda} />
            <Input
              label={'Warehouse Space'}
              state={space}
              type={NUMBER}
              setState={setSpace}
            />
            <Input
              label={'Warehouse Price / ' + 'm\u00B2'}
              state={pricePer}
              type={NUMBER}
              setState={setPricePer}
            />
            <Input
              label={'Warehouse Price'}
              state={price}
              type={NUMBER}
              setState={setPrice}
            />

            <Input
              label={'Warehouse Description'}
              state={description}
              setState={setDescription}
              type={MULTI}
            />
          </>
        ) : (
          params?.type == 'Managed' && (
            <>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Choose Warehouse</Text>
                <Dropdown
                  style={styles.input}
                  data={warehouses?.data || []}
                  placeholder='Select Warehouse'
                  value={warehouse}
                  labelField='warehouse_name'
                  valueField='warehouse_name'
                  onChange={(item) => {
                    setWarehouse(item.warehouse_name)
                  }}
                  renderItem={(item) => {
                    return (
                      <View style={styles.dropDownItemContainer}>
                        <Text style={styles.dropDownText}>
                          {item.warehouse_name}
                        </Text>
                      </View>
                    )
                  }}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Choose Warehouse Storage Type
                </Text>
                <Dropdown
                  style={styles.input}
                  data={storages?.data || []}
                  placeholder='Select Storage'
                  value={storage}
                  labelField='storage_name'
                  valueField='storage_name'
                  onChange={(item) => {
                    setStorage(item.storage_name)
                  }}
                  renderItem={(item) => {
                    return (
                      <View style={styles.dropDownItemContainer}>
                        <Text style={styles.dropDownText}>
                          {item.storage_name}
                        </Text>
                      </View>
                    )
                  }}
                />
              </View>
            </>
          )
        )}

        <View style={styles.inputWrapper}>
          <ScrollView horizontal>
            {images.map((image, index) => (
              <View key={index} style={styles.imagesWrapper}>
                <Image style={styles.image} source={{ uri: image }} />
                <TouchableOpacity
                  style={styles.minusIcon}
                  onPress={() => {
                    setImages((prev) =>
                      prev.filter((prevImage) => prevImage !== image)
                    )
                  }}
                >
                  <AntDesign name='minuscircle' size={15} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Button
            title='Add Image'
            color={COLORS.secondary}
            onPress={pickImage}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title='Cancel'
          style={styles.btn}
          color={COLORS.gray}
          onPress={() => {}}
        />
        <Button
          title='Save'
          style={styles.btn}
          color={COLORS.primary}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  )
}

export default warehouse
