import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import styles from './styles/warehouse.style'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import { Dropdown } from 'react-native-element-dropdown'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { addWarehouse, getWarehouses } from '../../api/warehouse/warehouse'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { getStorages } from '../../api/storage/storage'
import MapView, { Marker } from 'react-native-maps'
import Input from '../../components/common/input/Input'
import { MULTI, NUMBER, mSQUARE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import * as Location from 'expo-location'
import * as FileSystem from 'expo-file-system'

const warehouse = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const navigate = useNavigation()
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
  const [location, setLocation] = useState(null)
  const [pickedLoction, setPickedLoction] = useState()

  const onAdd = async () => {
    // Validation
    if (images && images.length) {
      const pictures = images.map(async (image) => {
        let filename = image.split('/').pop()

        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`
        const base64 = await FileSystem.readAsStringAsync(images[0], {
          encoding: 'base64',
        })
        return 'data:' + type + ';base64,' + base64
      })
      const resolved = await Promise.all(pictures)
      console.log({
        lat: pickedLoction?.latitude,
        lng: pickedLoction?.longitude,
        price_m2: pricePer,
        region,
        sub_city: subCity,
        warehouse_name: name,
        warehouse_meta: description,
        wereda,
        zone,
        space,
        region,
        storage_space: space,
        available_space: space,
        city,
        full_price: price,
        resolved: resolved[0].slice(0, 10),
      })
      addWarehouse(
        {
          lat: parseFloat(pickedLoction?.latitude),
          lng: parseFloat(pickedLoction?.longitude),
          price_m2: pricePer,
          region,
          sub_city: subCity,
          warehouse_name: name,
          warehouse_meta: description,
          wereda,
          zone,
          space,
          region,
          storage_space: space,
          available_space: space,
          city,
          full_price: parseFloat(price),
          images_url: resolved,
          image: [resolved[0]],
        },
        dispatch,
        toast,
        () => {
          navigate.goBack()
        }
      )
    }
  }
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

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      toast.show('Permission to access location was denied')
      return
    }

    let location = await Location.getLastKnownPositionAsync({})
    setLocation(location)
  }

  useEffect(() => {
    fetchCurrentLocation()
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
      </View>
      <View style={styles.inputContainer}>
        {params?.type == 'Unmanaged' ? (
          <>
            {location && (
              <MapView
                style={styles.map}
                onPress={(e) => setPickedLoction(e.nativeEvent.coordinate)}
                initialRegion={{
                  latitude: location.coords?.latitude,
                  longitude: location.coords?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {pickedLoction && (
                  <Marker
                    pinColor='red'
                    coordinate={{
                      latitude: pickedLoction?.latitude,
                      longitude: pickedLoction?.longitude,
                    }}
                  />
                )}
              </MapView>
            )}
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
              label={'Warehouse Price / ' + mSQUARE}
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
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default warehouse
