import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import styles from '../../common/styles/warehouse.style'
import commonStyles from '../../common/styles/common.style'
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
import { MAP_KEY, NUMBER } from '../../../constants/strings'
import DocumentPicker from '../../../components/common/input/DocumentPicker'
import Footer from '../../../components/common/footer/Footer'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS, SIZES } from '../../../constants'
import { useNavigation } from 'expo-router'
import { getAllInsuranceAgents } from '../../../api/product/insurance'
import * as FileSystem from 'expo-file-system'
import newOrderStyles from '../../common/styles/order.style'
import SingleCard from '../../common/cards/single/SingleCard'
import Checkbox from 'expo-checkbox'
import MapInput from '../../common/input/MapInput'
import MapViewDirections from 'react-native-maps-directions'

const NewShipment = ({
  params,
  wizard,
  data,
  shipment,
  setShipment,
  wizProduct,
}) => {
  const mapRef = useRef(null)
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
  const [journey, setJourney] = useState()
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

  const onGetVehicles = () => {
    const amount = shipment ? shipment?.quantity : quantity
    if (amount && product) {
      getVehicleByRange(
        product?.id + '/' + amount,
        dispatch,
        setVehicles,
        toast
      )
    }
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
        company: company ?? '',
        vehicle: vehicle ?? '',
        transitor: transitor ?? '',
        buy_clearance: sysclear,
        buy_insurance: sysInsur,
        insurances,
        clearances,
        agent: agent ?? '',
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

  return (wizard && !product?.id) ||
    (!params?.type?.includes('Local') && (!companies || !ports)) ||
    !agents ? (
    <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
  ) : (
    <ScrollView
      keyboardShouldPersistTaps='always'
      style={{ backgroundColor: COLORS.pureWhite, paddingHorizontal: 0 }}
    >
      <View style={{ paddingHorizontal: SIZES.medium }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shipment Information</Text>
        </View>
        <View>
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
              params?.type?.includes('Local') ? () => onGetVehicles() : () => {}
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
          {/* {params?.type?.includes('Local') && (
            <Info
              text={
                'Vehicles that are capable of transporting the quantity will appear once you input quantity.'
              }
              withoutIcon={true}
              title={'Choose Vehicles Below'}
            />
          )} */}
          {/* {fetching ? (
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
          ) : (
            vehicles?.map((item) => {
              return (
                <SingleCard
                  key={item?.id}
                  isOnlyText
                  onClick={() => {
                    if (shipment) {
                      setShipment({
                        ...shipment,
                        vehicle: item?.id,
                      })
                    } else {
                      setVehicle(item?.id)
                    }
                  }}
                >
                  <View
                    style={{ ...styles.textContainer, alignSelf: 'stretch' }}
                  >
                    <View style={commonStyles.wizCheckerHeader}>
                      <Text style={styles.name}>{item?.type}</Text>
                      <Checkbox
                        color={COLORS.primary}
                        value={
                          shipment
                            ? item?.id === shipment?.vehicle
                            : item?.id === vehicle
                        }
                        onValueChange={() => {
                          if (shipment) {
                            setShipment({
                              ...shipment,
                              vehicle: item?.id,
                            })
                          } else {
                            setVehicle(item?.id)
                          }
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.type}>
                        <Text style={styles.label}>License Plate: </Text>
                        {item?.licenseplate}
                      </Text>
                      <Text style={styles.type}>
                        <Text style={styles.label}>
                          Height : {item?.height} , Length : {item?.length},
                          Width :{item?.width}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </SingleCard>
              )
            })
          )} */}
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
              {!wizard && (
                <View>
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
                        ? (value) =>
                            setShipment({ ...shipment, transitor: value })
                        : setTransitor
                    }
                    labelField={'first_name'}
                    valueField={'id'}
                  />
                </View>
              )}

              {wizard && (
                <View>
                  {/* {shipment?.sysInsur === true && (
                    <CustomDropdown
                      label={'Insurance Agents'}
                      options={agents?.results}
                      placeholder={'Select An Agent'}
                      state={shipment ? shipment?.agent : agent}
                      setState={
                        shipment
                          ? (value) =>
                              setShipment({ ...shipment, agent: value })
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
                  /> */}
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
      </View>
      <View style={styles.divider} />
      <View style={{ ...styles.inputWrapper }}>
        {location && (
          <View>
            <Text
              style={{
                ...styles.inputLabel,
                textAlign: 'center',
                fontSize: SIZES.large,
              }}
            >
              Pick Up And Drop Off Location
            </Text>

            <Text
              style={{
                ...styles.headerMsg,
                textAlign: 'center',
                marginBottom: 0,
              }}
            >
              {!shipment?.pickUp && !pickUp
                ? 'Pick a Starting Location'
                : !shipment?.dropOff && !dropOff
                ? 'Pick a Destination'
                : 'Drag And Drop To Edit'}
            </Text>
            <View style={styles.divider} />

            {(shipment?.dropOff || dropOff) && (
              <Text
                style={{
                  ...styles.headerMsg,
                  textAlign: 'center',
                }}
              >
                Distance: {journey?.distance + ' Km\n'}
                Duration: {journey?.duration}
              </Text>
            )}
            <View>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: location.coords?.latitude,
                  longitude: location.coords?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                onPress={(e) => {
                  if (shipment) {
                    if (!shipment?.pickUp) {
                      setShipment({
                        ...shipment,
                        pickUp: e.nativeEvent.coordinate,
                      })
                    } else if (!shipment?.dropOff) {
                      setShipment({
                        ...shipment,
                        dropOff: e.nativeEvent.coordinate,
                      })
                    }
                  } else {
                    if (!pickUp) {
                      setPickUp(e.nativeEvent.coordinate)
                    } else if (!dropOff) {
                      setDropOff(e.nativeEvent.coordinate)
                    }
                  }
                }}
              >
                {(dropOff || shipment?.dropOff) && (
                  <Marker
                    title='To'
                    description='Ending Point'
                    pinColor='green'
                    draggable
                    onDragEnd={(e) => {
                      if (shipment) {
                        setShipment({
                          ...shipment,
                          dropOff: e.nativeEvent.coordinate,
                        })
                      } else {
                        setDropOff(e.nativeEvent.coordinate)
                      }
                    }}
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
                {(pickUp || shipment?.pickUp) && (
                  <Marker
                    draggable
                    title='From'
                    description='Starting Point'
                    pinColor='blue'
                    onDragEnd={(e) => {
                      if (shipment) {
                        setShipment({
                          ...shipment,
                          pickUp: e.nativeEvent.coordinate,
                        })
                      } else {
                        setPickUp(e.nativeEvent.coordinate)
                      }
                    }}
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
                {((pickUp && dropOff) ||
                  (shipment?.pickUp && shipment?.dropOff)) && (
                  <MapViewDirections
                    origin={{
                      latitude: shipment
                        ? shipment?.pickUp?.latitude
                        : pickUp?.latitude,
                      longitude: shipment
                        ? shipment?.pickUp?.longitude
                        : pickUp?.longitude,
                    }}
                    destination={{
                      latitude: shipment
                        ? shipment?.dropOff?.latitude
                        : dropOff?.latitude,
                      longitude: shipment
                        ? shipment?.dropOff?.longitude
                        : dropOff?.longitude,
                    }}
                    apikey={MAP_KEY}
                    strokeWidth={2.5}
                    strokeColor='red'
                    onReady={(e) => {
                      let hour,
                        min,
                        duration = ''
                      if (e?.duration > 59) {
                        hour = Math.floor(e?.duration / 60)
                      }
                      min = Math.ceil(e?.duration % 60)
                      if (hour) {
                        duration += hour + ' Hour '
                      }
                      if (min) {
                        duration += min + ' Min'
                      }
                      setJourney({
                        distance: e?.distance,
                        duration,
                      })
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
                    if (shipment) {
                      if (!shipment?.pickUp) {
                        setShipment({
                          ...shipment,
                          pickUp: { latitude: e?.lat, longitude: e?.lng },
                        })
                      } else if (!shipment?.dropOff) {
                        setShipment({
                          ...shipment,
                          dropOff: { latitude: e?.lat, longitude: e?.lng },
                        })
                      }
                    } else {
                      if (!pickUp) {
                        setPickUp({ latitude: e?.lat, longitude: e?.lng })
                      } else if (!dropOff) {
                        setDropOff({ latitude: e?.lat, longitude: e?.lng })
                      }
                    }
                    if (mapRef.current) {
                      mapRef.current.animateCamera({
                        center: { latitude: e?.lat, longitude: e?.lng },
                      })
                    }
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={{ paddingHorizontal: SIZES.medium }}>
        {!wizard && <Footer onSave={onAdd} />}
      </View>
    </ScrollView>
  )
}

export default NewShipment
