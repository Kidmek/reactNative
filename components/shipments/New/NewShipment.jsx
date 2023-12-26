import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/warehouse.style'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllProducts } from '../../../api/product/product'
import { store } from '../../../store'
import {
  addShipment,
  getPorts,
  getTransportationCompanies,
  getTransportationMethods,
  getVehicles,
} from '../../../api/shipment/shipment'
import CustomDropdown from '../../../components/common/dropdown/CustomDropdown'
import Info from '../../../components/common/cards/info/Info'
import Input from '../../../components/common/input/Input'
import { NUMBER } from '../../../constants/strings'
import DocumentPicker from '../../../components/common/input/DocumentPicker'
import Footer from '../../../components/common/footer/Footer'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router'

const NewShipment = ({
  params,
  wizard,
  data,
  shipment,
  setShipment,
  wizProduct,
}) => {
  const fetching = useSelector(selectIsFetching)
  const [location, setLocation] = useState(null)
  const [dropOff, setDropOff] = useState()
  const [pickUp, setPickUp] = useState()
  const [product, setProduct] = useState()
  const toast = useToast()
  const [products, setProducts] = useState()
  const [quantity, setQuantity] = useState()
  const [ports, setPorts] = useState()
  const [types, setTypes] = useState()
  const [vehicle, setVehicle] = useState()
  const [vehicles, setVehicles] = useState()
  const [companies, setCompanies] = useState()
  const [company, setCompany] = useState()
  const [port, setPort] = useState()
  const [transitor, setTransitor] = useState()
  const [sysInsur, setSysInsur] = useState(false)
  const [sysclear, setSysclear] = useState(false)
  const navigate = useNavigation()
  const [file, setFile] = useState({
    insurance: {},
    clearance: {},
  })
  const dispatch = store.dispatch
  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      toast.show('Permission to access location was denied')
      return
    }

    let location = await Location.getLastKnownPositionAsync({})
    setLocation(location)
  }
  const onAdd = () => {
    addShipment(
      {
        shipmenttype: params?.typeId,
        product: product?.id,
        productqty: quantity,
        destination: '',
        initialqty: product?.available,
        lat: dropOff.latitude,
        lng: dropOff.longitude,
        originlat: pickUp.latitude,
        originlng: pickUp.longitude,
        reason: '',
        fraight_price: null,
        invoice: '',
        port: port?.id,
        company: company,
        vehicle: '',
        transitor: transitor,
        insurance: null,
        buy_clearance: sysclear,
        buy_insurance: sysInsur,
        agent: '',
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }
  useEffect(() => {
    fetchCurrentLocation()
    if (!wizard) {
      getAllProducts(null, dispatch, setProducts, toast)
    }
    if (params?.type?.includes('Local')) {
      getVehicles(null, dispatch, setVehicles, toast)
    } else {
      getTransportationMethods(null, dispatch, setTypes, toast)
      getTransportationCompanies(null, dispatch, setCompanies, toast)
      getPorts(null, dispatch, setPorts, toast)
    }
  }, [])

  console.log(vehicles + '..')

  useEffect(() => {
    if (wizard) {
      setProduct(data)
    }
  }, [data])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shipment Information</Text>
      </View>
      <View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Pick Up Location</Text>
          {location && (
            <MapView
              style={styles.map}
              onPress={(e) => {
                if (shipment) {
                  setShipment({ ...shipment, pickUp: e.nativeEvent.coordinate })
                } else {
                  setPickUp(e.nativeEvent.coordinate)
                }
              }}
              initialRegion={{
                latitude: location.coords?.latitude,
                longitude: location.coords?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {(pickUp || shipment?.pickUp) && (
                <Marker
                  pinColor='red'
                  coordinate={{
                    latitude: shipment
                      ? shipment?.pickUp?.latitude
                      : pickUp?.latitude,
                    longitude: shipment
                      ? shipment?.pickUp?.longitude
                      : pickUp?.longitude,
                  }}
                />
              )}
            </MapView>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Drop Off Location</Text>
          {location && (
            <MapView
              onPress={(e) => {
                if (shipment) {
                  setShipment({
                    ...shipment,
                    dropOff: e.nativeEvent.coordinate,
                  })
                } else {
                  setDropOff(e.nativeEvent.coordinate)
                }
              }}
              style={styles.map}
              initialRegion={{
                latitude: location.coords?.latitude,
                longitude: location.coords?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {(dropOff || shipment?.dropOff) && (
                <Marker
                  pinColor='red'
                  coordinate={{
                    latitude: shipment
                      ? shipment?.dropOff?.latitude
                      : dropOff?.latitude,
                    longitude: shipment
                      ? shipment?.dropOff?.longitude
                      : dropOff?.longitude,
                  }}
                />
              )}
            </MapView>
          )}
        </View>
        {!wizard && (
          <CustomDropdown
            label={'Choose Product'}
            options={products?.results}
            placeholder={'Select A Product'}
            state={product?.id}
            labelField={'product_name'}
            valueField={'id'}
            setOtherState={setProduct}
          />
        )}
        <Info
          text={wizProduct ? wizProduct?.qty : product?.available}
          withoutIcon={true}
          title={'Total Product Qty On Storage '}
        />
        <Info
          text={
            wizProduct
              ? wizProduct?.weight * wizProduct?.qty + ' ' + ' KG'
              : product?.weight + ' ' + product?.weightingUnit
          }
          withoutIcon={true}
          title={'Total product weight '}
        />
        <Input
          label={'Product Qty to ship'}
          state={shipment ? shipment?.quantity : quantity}
          setState={
            shipment
              ? (value) => setShipment({ ...shipment, quantity: value })
              : setQuantity
          }
          type={NUMBER}
        />
        {!params?.type?.includes('Local') ? (
          <View>
            <CustomDropdown
              label={'Shipping Companies'}
              options={companies?.results}
              placeholder={'Select A Company'}
              state={shipment ? shipment?.company : company}
              setState={
                shipment
                  ? (value) => setShipment({ ...shipment, company: value })
                  : setCompany
              }
              labelField={'first_name'}
              valueField={'id'}
            />
            <CustomDropdown
              label={'Port'}
              options={ports?.results}
              placeholder={'Select A Port'}
              state={shipment ? shipment?.port?.id : port?.id}
              setOtherState={
                shipment
                  ? (value) => setShipment({ ...shipment, port: value })
                  : setPort
              }
              labelField={'name'}
              valueField={'id'}
            />
            <CustomDropdown
              label={'Transitor'}
              options={
                shipment ? shipment?.port?.transitorlist : port?.transitorlist
              }
              placeholder={'Select A Transitor'}
              state={shipment ? shipment?.transitor : transitor}
              setState={
                shipment
                  ? (value) => setShipment({ ...shipment, transitor: value })
                  : setTransitor
              }
              labelField={'first_name'}
              valueField={'id'}
            />
            <DocumentPicker
              title={'Upload Product Insurance'}
              name={
                shipment
                  ? shipment?.file?.insurance?.name
                  : file?.insurance?.name
              }
              setState={(asset) => {
                if (shipment) {
                  setShipment({
                    ...shipment,
                    file: {
                      ...shipment?.file,
                      insurance: asset,
                    },
                  })
                } else {
                  setFile({ ...file, insurance: asset })
                }
              }}
            />
            <Info
              title={`If this product ${
                product?.product_name ?? ''
              } doesn't have insurance`}
              setState={
                shipment
                  ? (value) => setShipment({ ...shipment, sysInsur: value })
                  : setSysInsur
              }
              state={shipment ? shipment?.sysInsur : sysInsur}
              hasSwitch={true}
              withoutIcon={true}
              switchTitle={'Use System Insurance'}
            />
            {!wizard && (
              <View>
                <DocumentPicker
                  title={'Upload Product Clearance'}
                  name={file.clearance.name}
                  setState={(asset) => setFile({ ...file, clearance: asset })}
                />
                <Info
                  title={`If this product ${
                    product?.product_name ?? ''
                  } doesn't have clearance`}
                  setState={setSysclear}
                  state={sysclear}
                  hasSwitch={true}
                  withoutIcon={true}
                  switchTitle={'Use System Clearance'}
                />
              </View>
            )}
          </View>
        ) : (
          <CustomDropdown
            label={'Vehicle'}
            options={vehicles?.results}
            placeholder={'Select A Vehicle'}
            state={shipment ? shipment?.vehicle : vehicle}
            setState={
              shipment
                ? (value) => setShipment({ ...shipment, vehicle: value })
                : setVehicle
            }
            labelField={'type'}
            valueField={'id'}
          />
        )}
      </View>
      {!wizard && <Footer onSave={onAdd} />}
    </ScrollView>
  )
}

export default NewShipment
