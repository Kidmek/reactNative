import { View, Text, Button, Image, Dimensions, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import styles from '../../../app/new/styles/warehouse.style'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../../constants'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import {
  addWarehouse,
  editWarehouse,
  getWarehouseDetails,
  getWarehouses,
} from '../../../api/warehouse/warehouse'
import { useToast } from 'react-native-toast-notifications'
import { getStorages } from '../../../api/storage/storage'
import MapView, { Marker } from 'react-native-maps'
import Input from '../../../components/common/input/Input'
import { MULTI, NUMBER, mSQUARE } from '../../../constants/strings'
import Footer from '../../../components/common/footer/Footer'
import * as Location from 'expo-location'
import * as FileSystem from 'expo-file-system'
import { store } from '../../../store'
import AddNew from '../../common/header/AddNew'
import MapInput from '../../common/input/MapInput'

const NewWarehouse = ({ params }) => {
  const mapRef = useRef(null)
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
  const [fields, setFields] = useState([])
  const onAdd = async (edit) => {
    var resolved
    // Validation
    if (images && images.length) {
      const pictures = images.map(async (image) => {
        const base64 = await FileSystem.readAsStringAsync(image?.uri, {
          encoding: 'base64',
        })
        return 'data:' + image?.mimeType + ';base64,' + base64
      })
      resolved = await Promise.all(pictures)
    }
    if (edit) {
      editWarehouse(
        params?.id,
        {
          ...warehouse,
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
        },
        dispatch,
        toast,
        () => {
          navigate.goBack()
        }
      )
      return
    }
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
        image: resolved,
        images_url: [resolved[0]],
        dynamicInputs: fields,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
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
      setImages([...images, result.assets[0]])
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
    if (params?.id) {
      getWarehouseDetails(
        params?.id,
        dispatch,
        (value) => {
          setWarehouse(value)
          setCity(value?.city?.toString())
          setWereda(value?.wereda?.toString())
          setRegion(value?.region?.toString())
          setSpace(value?.storage_space?.toString())
          setZone(value?.zone?.toString())
          setPricePer(value?.price_m2?.toString())
          setSubCity(value?.sub_city?.toString())
          setPickedLoction({
            latitude: value?.lat,
            longitude: value?.lng,
          })
          setName(value?.warehouse_name?.toString())
          setDescription(value?.warehouse_meta?.toString())
          setPrice(value?.full_price?.toString())
        },
        toast
      )
    }
  }, [])
  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.pureWhite,
      }}
      keyboardShouldPersistTaps='always'
    >
      <View style={{ ...styles.header, ...styles.container }}>
        <Text style={styles.headerTitle}>
          {params?.type == 'Managed'
            ? 'Manage Warehouse'
            : 'Warehouse Information'}
        </Text>
      </View>
      <View style={{ ...styles.inputContainer, ...styles.container }}>
        {/* {params?.type == 'Unmanaged' ? (
          <> */}

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
        {fields?.map((field, index) => {
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
                  const prev = fields

                  prev[index] = { ...field, label: value }
                  setFields([...prev])
                }}
                state={field?.value}
                setState={(value) => {
                  const prev = fields

                  prev[index] = { ...field, value: value }
                  setFields([...prev])
                }}
              />
              <Pressable
                onPress={() => {
                  let prev = fields
                  prev = prev.filter((_, prevIndex) => {
                    return prevIndex !== index
                  })
                  setFields([...prev])
                }}
              >
                <Feather name='trash' color={'red'} size={SIZES.xxLarge} />
              </Pressable>
            </View>
          )
        })}
        <AddNew
          title={'Add Additional Fields'}
          onPress={() => {
            setFields([
              ...fields,
              {
                label: 'Label ' + parseInt(fields.length),
                value: '',
                type: 'text',
              },
            ])
          }}
        />

        <View style={styles.inputWrapper}>
          <ScrollView horizontal>
            {images.map((image, index) => (
              <View key={index} style={styles.imagesWrapper}>
                <Image style={styles.image} source={{ uri: image?.uri }} />
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
      <View style={styles.divider} />
      {location && (
        <View
          style={{
            marginTop: SIZES.medium,
          }}
        >
          <Text
            style={{
              ...styles.inputLabel,
              textAlign: 'center',
              marginBottom: SIZES.small,
              ...styles.container,
            }}
          >
            Warehouse Location
          </Text>
          <View>
            <MapView
              style={{
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height * 0.5,
              }}
              ref={mapRef}
              onPress={(e) => setPickedLoction(e.nativeEvent.coordinate)}
              initialRegion={{
                latitude: pickedLoction?.latitude ?? location.coords?.latitude,
                longitude:
                  pickedLoction?.longitude ?? location.coords?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
            >
              {pickedLoction &&
                pickedLoction?.latitude &&
                pickedLoction?.longitude && (
                  <Marker
                    pinColor='red'
                    coordinate={{
                      latitude: pickedLoction?.latitude,
                      longitude: pickedLoction?.longitude,
                    }}
                  />
                )}
            </MapView>
            <View
              style={{
                position: 'absolute',
                top: 10,
                width: '100%',
                paddingHorizontal: SIZES.small,
              }}
            >
              <MapInput
                notifyChange={(e) => {
                  setPickedLoction({
                    latitude: e?.lat,
                    longitude: e?.lng,
                  })
                  if (mapRef.current) {
                    mapRef.current.animateCamera({
                      center: {
                        latitude: e?.lat,
                        longitude: e?.lng,
                      },
                    })
                  }
                }}
              />
            </View>
          </View>
        </View>
      )}
      <View style={styles.container}>
        <Footer
          onSave={() => {
            onAdd(params?.id)
          }}
          saveText={params?.id ? 'Edit' : 'Save'}
        />
      </View>
    </ScrollView>
  )
}

export default NewWarehouse
