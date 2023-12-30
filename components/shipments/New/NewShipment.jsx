import { View, Text, ScrollView, ActivityIndicator, Switch } from 'react-native'
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
  getVehicleByRange,
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
import { getAllInsuranceAgents } from '../../../api/product/insurance'
import * as FileSystem from 'expo-file-system'
import newOrderStyles from '../../common/styles/order.style'

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
  const [agents, setAgents] = useState()
  const [agent, setAgent] = useState()
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
  const checkIfExists = (id, shipment) => {
    if (shipment) return shipment?.vehicle?.includes(id)
    else return vehicle?.includes(id)
  }
  const onGetVehicles = () => {
    const amount = shipment ? shipment?.quantity : quantity
    getVehicleByRange(product?.id + '/' + amount, dispatch, setVehicles, toast)
  }

  const onAdd = async () => {
    let insurances = ''
    let clearances = ''
    if (file?.clearance && file?.clearance.length) {
      let promises = file?.clearance.map(async (c) => {
        if (c.uri) {
          base64 = await FileSystem.readAsStringAsync(c.uri, {
            encoding: 'base64',
          })
          return 'data:' + c?.mimeType + ';base64,' + base64
        }
      })
      clearances = await Promise.all(promises)
    }
    if (file?.insurance && file?.insurance.length) {
      promises = file?.insurance.map(async (c) => {
        if (c.uri) {
          base64 = await FileSystem.readAsStringAsync(c.uri, {
            encoding: 'base64',
          })
          return 'data:' + c?.mimeType + ';base64,' + base64
        }
      })
      insurances = await Promise.all(promises)
    }
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
        insurances,
        clearances,
        agent,
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
    getAllInsuranceAgents(null, dispatch, setAgents, toast)
    if (!wizard) {
      getAllProducts(null, dispatch, setProducts, toast)
    }
    if (params?.type?.includes('Local')) {
      // getVehicles(null, dispatch, setVehicles, toast)
    } else {
      getTransportationMethods(null, dispatch, setTypes, toast)
      getTransportationCompanies(null, dispatch, setCompanies, toast)
      getPorts(null, dispatch, setPorts, toast)
    }
  }, [])
  useEffect(() => {
    if (wizard) {
      setProduct(data)
    }
  }, [data])

  return fetching ||
    !product?.id ||
    (!params?.type?.includes('Local') && (!companies || !ports)) ||
    !agents ? (
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
              : product?.weight
              ? product?.weight + ' ' + product?.weightingUnit
              : ''
          }
          withoutIcon={true}
          title={'Total product weight '}
        />
        <Input
          outOfFocus={
            params?.type?.includes('Local') ? onGetVehicles() : () => {}
          }
          label={'Product Qty to ship'}
          state={shipment ? shipment?.quantity : quantity}
          setState={
            shipment
              ? (value) => setShipment({ ...shipment, quantity: value })
              : setQuantity
          }
          type={NUMBER}
        />
        {params?.type?.includes('Local') && (
          <Info
            text={
              'Vehicles that are capable of transporting the quantity will appear once you input quantity.'
            }
            withoutIcon={true}
            title={'Choose Vehicles Below'}
          />
        )}
        {vehicles?.map((item, index) => {
          return (
            <View key={item?.id} style={newOrderStyles.resourceContainer}>
              <Text style={styles.name}>{item?.type}</Text>
              <Text style={styles.type}>
                <Text style={styles.label}>License Plate: </Text>
                {item?.licenseplate}
              </Text>
              <Text style={styles.type}>
                <Text style={styles.label}>
                  Width : {item?.height} , Length : {item?.length}, Width :
                  {item?.width}
                </Text>
              </Text>

              <View style={newOrderStyles.switchContainer}>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={
                    (
                      shipment
                        ? item?.id === shipment?.vehicle
                        : item?.id === vehicle
                    )
                      ? COLORS.blue
                      : '#f4f3f4'
                  }
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={() => {
                    if (shipment) {
                      setShipment({
                        ...shipment,
                        vehicle: item?.id,
                      })
                    }
                    {
                      setVehicle(item?.id)
                    }
                  }}
                  value={
                    shipment
                      ? item?.id === shipment?.vehicle
                      : item?.id === vehicle
                  }
                />
                <Text style={newOrderStyles.typeTitle(false)}>
                  Add {item?.warehouse_storage_type?.storage_name}
                </Text>
              </View>
            </View>
          )
        })}
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
                shipment?.port?.transitorlist
                  ? shipment?.port?.transitorlist
                  : port?.transitorlist
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

            {wizard && (
              <View>
                {shipment?.sysInsur === true && (
                  <CustomDropdown
                    label={'Insurance Agents'}
                    options={agents?.results}
                    placeholder={'Select An Agent'}
                    state={shipment ? shipment?.agent : agent}
                    setState={
                      shipment
                        ? (value) => setShipment({ ...shipment, agent: value })
                        : setAgent
                    }
                    labelField={'first_name'}
                    valueField={'id'}
                  />
                )}
                {shipment?.sysInsur !== true && (
                  <DocumentPicker
                    multi
                    title={'Upload Product Insurance'}
                    name={
                      shipment
                        ? shipment?.file?.insurance
                            ?.map((file) => file?.name + ',\n\n')
                            ?.toString()
                            ?.trim()
                        : file?.insurance
                            ?.map((file) => file?.name + ',\n\n')
                            ?.toString()
                            ?.trim()
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
                        setFile({
                          ...file,
                          insurance: asset,
                        })
                      }
                    }}
                  />
                )}
                <Info
                  title={`If this product ${
                    product?.product_name ?? ''
                  } doesn't have insurance`}
                  setState={(value) => {
                    if (shipment) {
                      if (!value) {
                        setShipment({ ...shipment, agent: null })
                      }
                      setShipment({ ...shipment, sysInsur: value })
                    } else {
                      if (!value) {
                        setAgent(null)
                      }
                      setSysInsur(value)
                    }
                  }}
                  state={shipment ? shipment?.sysInsur : sysInsur}
                  hasSwitch={true}
                  withoutIcon={true}
                  switchTitle={'Use System Insurance'}
                />
                <View>
                  {shipment?.sysclear !== true && (
                    <DocumentPicker
                      title={'Upload Product Clearance'}
                      name={
                        shipment
                          ? shipment?.file?.clearance
                              ?.map((file) => file?.name + ',\n\n')
                              ?.toString()
                              ?.trim()
                          : file?.clearance
                              ?.map((file) => file?.name + ',\n\n')
                              ?.toString()
                              ?.trim()
                      }
                      setState={(asset) => {
                        if (shipment) {
                          setShipment({
                            ...shipment,
                            file: {
                              ...shipment?.file,
                              clearance: asset,
                            },
                          })
                        } else {
                          setFile({
                            ...file,
                            clearance: asset,
                          })
                        }
                      }}
                      multi
                    />
                  )}
                  <Info
                    title={`If this product ${
                      product?.product_name ?? ''
                    } doesn't have clearance`}
                    setState={
                      shipment
                        ? (value) =>
                            setShipment({ ...shipment, sysclear: value })
                        : setSysclear
                    }
                    state={shipment ? shipment?.sysclear : sysclear}
                    hasSwitch={true}
                    withoutIcon={true}
                    switchTitle={'Use System Clearance'}
                  />
                </View>
              </View>
            )}
          </View>
        ) : (
          wizard && (
            <View>
              {shipment?.sysInsur === true && (
                <CustomDropdown
                  label={'Insurance Agents'}
                  options={agents?.results}
                  placeholder={'Select An Agent'}
                  state={shipment ? shipment?.agent : agent}
                  setState={
                    shipment
                      ? (value) => setShipment({ ...shipment, agent: value })
                      : setAgent
                  }
                  labelField={'first_name'}
                  valueField={'id'}
                />
              )}
              {shipment?.sysInsur !== true && (
                <DocumentPicker
                  multi
                  title={'Upload Product Insurance'}
                  name={
                    shipment
                      ? shipment?.file?.insurance
                          ?.map((file) => file?.name + ',\n\n')
                          ?.toString()
                          ?.trim()
                      : file?.insurance
                          ?.map((file) => file?.name + ',\n\n')
                          ?.toString()
                          ?.trim()
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
                      setFile({
                        ...file,
                        insurance: asset,
                      })
                    }
                  }}
                />
              )}
              <Info
                title={`If this product ${
                  product?.product_name ?? ''
                } doesn't have insurance`}
                setState={(value) => {
                  if (shipment) {
                    if (!value) {
                      setShipment({ ...shipment, agent: null })
                    }
                    setShipment({ ...shipment, sysInsur: value })
                  } else {
                    if (!value) {
                      setAgent(null)
                    }
                    setSysInsur(value)
                  }
                }}
                state={shipment ? shipment?.sysInsur : sysInsur}
                hasSwitch={true}
                withoutIcon={true}
                switchTitle={'Use System Insurance'}
              />
            </View>
            // <CustomDropdown
            //   label={'Vehicle'}
            //   options={vehicles?.results}
            //   placeholder={'Select A Vehicle'}
            //   state={shipment ? shipment?.vehicle : vehicle}
            //   setState={
            //     shipment
            //       ? (value) => setShipment({ ...shipment, vehicle: value })
            //       : setVehicle
            //   }
            //   labelField={'type'}
            //   valueField={'id'}
            // />
          )
        )}
      </View>
      {!wizard && <Footer onSave={onAdd} />}
    </ScrollView>
  )
}

export default NewShipment
