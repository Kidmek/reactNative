import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import common from '../../common/styles/common.style'
import StepHeader from './StepsHeader'
import StepFooter from './StepFooter'
import NewProduct from '../../products/New/NewProduct'
import Products from '../../products/all/All'
import CheckQuestion from '../../common/checkQuestion/CheckQuestion'
import All from '../../ports/All/All'
import { ScrollView } from 'react-native-gesture-handler'
import { SIZES } from '../../../constants'
import Agent from '../../transits/Agent/Agent'
import OrderTypes from '../../orders/orderTypes/OrderTypes'
import {
  ALL,
  CUSTOMS,
  INITIALIZED,
  SHIPMNET,
  SPACE,
  STORAGE,
  WAREHOUSE,
} from '../../../constants/strings'
import Warehouse from '../../home/warehouse/Warehouse'
import StorageType from '../../home/storageTypes/StorageTypes'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { store } from '../../../store'
import { getMappedStorages } from '../../../api/storage/storage'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { useToast } from 'react-native-toast-notifications'
import { getOrderTypes } from '../../../api/order/order'
import NewOrder from '../../orders/New/NewOrder'
import ShipmentType from '../../shipments/type/ShipmentType'
import {
  addShipment,
  addTransits,
  getShipmentTypes,
} from '../../../api/shipment/shipment'
import NewShipment from '../../shipments/New/NewShipment'
import Info from '../../common/cards/info/Info'
import { useRouter } from 'expo-router'
import SingleWarehouse from '../../home/warehouse/SingleWarehouse'
import OfficeWithEquipments from '../../home/office/OfficeWithEquipments'
import HumanResource from '../../home/office/HumanResource'
import WantStorage from '../../home/storageTypes/WantStorage'
import SingleStorageType from '../../home/storageTypes/SingleStorageType'
import { getAllProducts, getProductDetails } from '../../../api/product/product'
import { addServiceOrders, addWizOrder } from '../../../api/dashboard/wizard'
import * as FileSystem from 'expo-file-system'
import { getDayDifference } from '../../common/utils'

const Steps = ({ params }) => {
  const fetching = useSelector(selectIsFetching)
  const dispatch = store.dispatch
  const toast = useToast()
  const router = useRouter()
  const [storageTypes, setStorageTypes] = useState()
  const [warehouses, setWarehouses] = useState()
  const [orderTypes, setOrderTypes] = useState()
  const [shipmentTypes, setShipmentTypes] = useState()
  const [page, setPage] = useState({
    current: 1,
    previous: 1,
  })
  const [price, setPrice] = useState([])
  const [product, setProduct] = useState({ file: {} })
  const [shipmentData, setShipmentData] = useState({
    file: { clearance: [], insurance: [] },
    sysInsur: false,
    sysclear: false,
  })
  const [orderData, setOrderData] = useState({})
  const [products, setProducts] = useState()
  const [transitQns, setTransitQns] = useState(false)
  const [rentQns, setRentQns] = useState()
  const [shipQns, setShipQns] = useState()
  const [officeQns, setOfficeQns] = useState()
  const [HRQns, setHRQns] = useState()
  const [HRids, setHRids] = useState([])
  const [portid, setPortid] = useState()
  const [portName, setPortName] = useState()
  const [agentId, setAgentId] = useState()
  const [type, setType] = useState()
  const [shipmentType, setShipmentType] = useState()
  const [warehouseId, setWarehouseId] = useState()
  const [officeId, setOfficeId] = useState([])
  const [warehouse, setWarehouse] = useState()
  const [typeQns, setTypeQns] = useState()
  const [storage, setStorage] = useState()
  const [storageId, setStorageId] = useState()
  const [productId, setProductId] = useState()
  const [storageSpace, setStorageSpace] = useState({})
  const [selectedStorage, setSelectedStorage] = useState([])
  const [agree, setAgree] = useState(false)
  // All Services
  const allServices = [
    // 1
    {
      component: () => (
        <NewProduct wizard product={product} setProduct={setProduct} />
      ),
    },
    // 2
    {
      component: () => (
        <View>
          <CheckQuestion
            title={`Would You Like To Transit Product (${
              product?.name ?? ''
            })?`}
            state={transitQns}
            setState={(value) => setTransitQns(value)}
          />

          {transitQns && (
            <View>
              <View style={common.divider} />

              <All
                wizard
                checked={portid}
                setChecked={(value) => setPortid(value)}
                setPortName={setPortName}
              />
            </View>
          )}
          {transitQns && portid && (
            <View>
              <View style={common.divider} />

              <Agent
                portId={portid}
                wizard
                checked={agentId}
                setChecked={(value) => setAgentId(value)}
              />
            </View>
          )}
        </View>
      ),
    },
    // 3
    {
      component: () => (
        <View>
          <CheckQuestion
            title={'Would You Like To Rent Space For Your Product?'}
            state={rentQns}
            setState={(value) => setRentQns(value)}
          />
          {rentQns && (
            <View>
              <View style={common.divider} />
              <OrderTypes
                wizard
                checked={type}
                setChecked={(value) => {
                  setType(value)
                  setWarehouseId(null)
                  setStorageId(null)
                }}
                data={orderTypes}
              />
            </View>
          )}

          {type?.name && rentQns && (
            <View>
              <View style={common.divider} />
              {type?.name?.toLowerCase() === WAREHOUSE ? (
                <Warehouse
                  fetching={fetching}
                  wizard
                  checked={warehouseId}
                  setChecked={setWarehouseId}
                  data={warehouses}
                />
              ) : (
                <StorageType
                  fetching={fetching}
                  wizard
                  checked={storageId}
                  setChecked={setStorageId}
                  data={storageTypes}
                />
              )}
            </View>
          )}

          {(warehouseId || storageId) && type?.name && rentQns && (
            <View>
              <View style={common.divider} />
              <NewOrder
                order={orderData}
                setOrder={setOrderData}
                wizard
                params={{
                  id:
                    type?.name?.toLowerCase() === WAREHOUSE
                      ? warehouseId
                      : storageId,
                  type:
                    type?.name?.toLowerCase() === WAREHOUSE
                      ? WAREHOUSE
                      : STORAGE,
                }}
              />
            </View>
          )}
        </View>
      ),
    },
    // 4
    {
      component: () => (
        <View>
          <CheckQuestion
            title={'Would You Like To Ship Your Product?'}
            state={shipQns}
            setState={(value) => setShipQns(value)}
          />
          {shipQns && (
            <View>
              <View style={common.divider} />

              <ShipmentType
                wizard
                checked={shipmentType}
                setChecked={(value) => {
                  console.log(value)
                  setShipmentType(value)
                }}
                data={shipmentTypes}
              />
            </View>
          )}
          {shipmentType?.type && shipQns && (
            <View>
              <View style={common.divider} />

              <NewShipment
                wizProduct={product}
                shipment={shipmentData}
                setShipment={setShipmentData}
                params={shipmentType}
                wizard
              />
            </View>
          )}
        </View>
      ),
    },
    // 5
    {
      component: () => (
        <View>
          <Info
            state={agree}
            setState={setAgree}
            title={'This Is A Success Alert'}
            text={
              "You've completed your steps now you can finish your order once you agreed to our terms and conditions."
            }
            success
          />
        </View>
      ),
    },
  ]
  //

  // Space Management

  const spaceManagement = [
    // 1
    {
      component: () => (
        <OrderTypes
          wizard
          checked={type}
          setChecked={(value) => {
            setType(value)
            setWarehouseId(null)
            setStorageId(null)
          }}
          data={orderTypes}
        />
      ),
    },
    // 2
    {
      component: () =>
        type?.name && (
          <View>
            {type?.name?.toLowerCase() === WAREHOUSE ? (
              <Warehouse
                fetching={fetching}
                wizard
                checked={warehouseId}
                setChecked={setWarehouseId}
                data={warehouses}
              />
            ) : (
              <StorageType
                fetching={fetching}
                wizard
                checked={storageId}
                setChecked={setStorageId}
                data={storageTypes}
              />
            )}
          </View>
        ),
    },
    // 3
    {
      component: () => (
        <View>
          {(warehouseId || storageId) && type?.name && (
            <View>
              {type?.name?.toLowerCase() === WAREHOUSE ? (
                <SingleWarehouse
                  wizard={SPACE}
                  params={{ type: 'Unmanaged', id: warehouseId }}
                  setData={setWarehouse}
                />
              ) : (
                <SingleStorageType
                  wizard={SPACE}
                  params={{ type: 'Unmanaged', id: storageId }}
                  setData={setStorage}
                />
              )}
              <View style={common.divider} />
              <NewOrder
                order={orderData}
                setOrder={(data) => {
                  setOrderData(data)
                  if (
                    data?.startDate &&
                    data?.endDate &&
                    data?.space &&
                    data?.rate
                  ) {
                    const diff = getDayDifference(
                      data?.startDate,
                      data?.endDate
                    )
                    setPrice([0, 0, diff * data?.space * data?.rate])
                  }
                }}
                data={
                  type?.name?.toLowerCase() === WAREHOUSE ? warehouse : storage
                }
                wizard={SPACE}
                params={{
                  id:
                    type?.name?.toLowerCase() === WAREHOUSE
                      ? warehouseId
                      : storageId,
                  type:
                    type?.name?.toLowerCase() === WAREHOUSE
                      ? WAREHOUSE
                      : STORAGE,
                }}
              />
            </View>
          )}
        </View>
      ),
    },
    // 4
    {
      component: () => (
        <View>
          <CheckQuestion
            title={'Would You Like To Have An Office In Your Warehouse?'}
            state={officeQns}
            setState={(value) => {
              if (!value) {
                const prev = price
                prev[page.current - 1] = prev[page.current - 2]
                setPrice([...prev])
                setOfficeId([])
              }
              setOfficeQns(value)
            }}
          />
          {officeQns && (
            <View>
              <View style={common.divider} />
              <OfficeWithEquipments
                warehouse={warehouse}
                checked={officeId}
                setChecked={(data) => {
                  if (data && orderData?.startDate && orderData?.endDate) {
                    let total = 0
                    const diff = getDayDifference(
                      orderData?.startDate,
                      orderData?.endDate
                    )
                    warehouse?.warehouseRecources?.map((item) => {
                      if (data?.includes(item?.id)) {
                        total += item?.officeDetail?.price
                      }
                    })

                    total = total * diff + price[page.current - 2]
                    const prev = price
                    prev[page.current - 1] = total
                    setPrice([...prev])
                  }
                  setOfficeId(data)
                }}
                checkedMulti
              />
            </View>
          )}
        </View>
      ),
      skip: type?.name?.toLowerCase() !== WAREHOUSE,
    },
    // 5
    {
      component: () => (
        <View>
          <CheckQuestion
            title={'Would You Like To Have Human Resources For Your Warehouse?'}
            state={HRQns}
            setState={(value) => {
              if (!value) {
                const prev = price
                prev[page.current - 1] = prev[page.current - 2]
                setPrice([...prev])
                setHRids([])
              }
              setHRQns(value)
            }}
          />
          {HRQns && (
            <View>
              <View style={common.divider} />
              <HumanResource
                warehouse={warehouse}
                checked={HRQns}
                setChecked={(data) => {
                  if (data && orderData?.startDate && orderData?.endDate) {
                    let total = 0
                    const diff = getDayDifference(
                      orderData?.startDate,
                      orderData?.endDate
                    )
                    warehouse?.HumanResources?.map((item) => {
                      if (data?.includes(item?.id)) {
                        total += item?.officeDetail?.price
                      }
                    })
                    total = total * diff + price[page.current - 2]
                    const prev = price
                    prev[page.current - 1] = total
                    setPrice([...prev])
                  }
                  setHRids(data)
                }}
                checkedMulti
              />
            </View>
          )}
        </View>
      ),
      skip: type?.name?.toLowerCase() !== WAREHOUSE,
    },
    // 6
    {
      component: () => (
        <View>
          <CheckQuestion
            title={
              'Would You Like To Have Add Storage Types To Your Warehouse?'
            }
            state={typeQns}
            setState={(value) => {
              if (!value) {
                const prev = price
                prev[page.current - 1] = prev[page.current - 2]
                setPrice([...prev])
                setSelectedStorage([])
                setStorageSpace({})
              }
              setTypeQns(value)
            }}
          />
          {typeQns && (
            <View>
              <View style={common.divider} />
              {warehouse?.warehousestoragemappings &&
              warehouse?.warehousestoragemappings.length ? (
                <WantStorage
                  storages={warehouse?.warehousestoragemappings}
                  storageSpace={storageSpace}
                  setStorageSpace={(data) => {
                    if (data && orderData?.startDate && orderData?.endDate) {
                      const diff = getDayDifference(
                        orderData?.startDate,
                        orderData?.endDate
                      )
                      let total = 0
                      warehouse?.warehousestoragemappings?.map((item) => {
                        if (
                          selectedStorage?.includes(item?.id) &&
                          data?.[item?.id]
                        ) {
                          total += item?.price_m2 * data?.[item?.id]
                        }
                      })
                      total = total * diff + price[page.current - 2]
                      const prev = price
                      prev[page.current - 1] = total
                      setPrice([...prev])
                    }

                    setStorageSpace(data)
                  }}
                  checkIfExists={checkIfExists}
                  setSelectedStorage={(data) => {
                    if (data && orderData?.startDate && orderData?.endDate) {
                      const diff = getDayDifference(
                        orderData?.startDate,
                        orderData?.endDate
                      )
                      let total = 0
                      warehouse?.warehousestoragemappings?.map((item) => {
                        if (
                          data?.includes(item?.id) &&
                          storageSpace?.[item?.id]
                        ) {
                          total += item?.price_m2 * storageSpace?.[item?.id]
                        }
                      })
                      total = total * diff + price[page.current - 2]
                      const prev = price
                      prev[page.current - 1] = total
                      setPrice([...prev])
                    }

                    setSelectedStorage(data)
                  }}
                  selectedStorage={selectedStorage}
                  wizard
                />
              ) : (
                <Info
                  text={
                    " Currently this warehouse dosen't have assigned storage type yet !"
                  }
                />
              )}
            </View>
          )}
        </View>
      ),
      skip: type?.name?.toLowerCase() !== WAREHOUSE,
    },
    //7
    {
      component: () => (
        <View>
          <Info
            state={agree}
            setState={setAgree}
            title={'This Is A Success Alert'}
            text={
              "You've completed your steps now you can finish your order once you agreed to our terms and conditions."
            }
            success
          />
        </View>
      ),
    },
  ]
  //
  // Shipment
  const shipment = [
    // 1
    {
      component: () => (
        <View>
          <Text style={common.wizTitle}>Select A Product You Want To Ship</Text>
          <Products
            wizard
            checked={productId}
            setChecked={setProductId}
            data={products}
          />
        </View>
      ),
    },
    // 2
    {
      component: () => (
        <View>
          <ShipmentType
            wizard
            checked={shipmentType}
            setChecked={(value) => {
              setShipmentType(value)
            }}
            data={shipmentTypes}
          />
        </View>
      ),
    },
    // 3
    {
      component: () => (
        <View>
          {shipmentType?.type && (
            <View>
              <NewShipment
                order={orderData}
                setOrder={setOrderData}
                params={shipmentType}
                wizard
                data={product}
                shipment={shipmentData}
                setShipment={(data) => {
                  setShipmentData(data)
                }}
              />
            </View>
          )}
        </View>
      ),
    },
    // 4
    {
      component: () => (
        <View>
          <Info
            state={agree}
            setState={setAgree}
            title={'This Is A Success Alert'}
            text={
              "You've completed your steps now you can finish your order once you agreed to our terms and conditions."
            }
            success
          />
        </View>
      ),
    },
  ]
  //

  // Customs
  const customs = [
    // 1
    {
      component: () => (
        <View>
          <Text style={common.wizTitle}>
            Select A Product You Want To Transit
          </Text>
          <Products
            wizard
            checked={productId}
            setChecked={setProductId}
            data={products}
          />
        </View>
      ),
    },
    // 2
    {
      component: () => (
        <View>
          <All
            wizard
            checked={portid}
            setChecked={(value) => setPortid(value)}
          />
        </View>
      ),
    },
    // 3
    {
      component: () => (
        <View>
          {portid && (
            <Agent
              portId={portid}
              wizard
              checked={agentId}
              setChecked={(value) => setAgentId(value)}
            />
          )}
        </View>
      ),
    },

    // 4
    {
      component: () => (
        <View>
          <Info
            state={agree}
            setState={setAgree}
            title={'This Is A Success Alert'}
            text={
              "You've completed your steps now you can finish your order once you agreed to our terms and conditions."
            }
            success
          />
        </View>
      ),
    },
  ]
  //

  let steps = []
  switch (params?.type) {
    case ALL:
      steps = allServices
      break
    case SPACE:
      steps = spaceManagement
      break
    case SHIPMNET:
      steps = shipment
      break
    case CUSTOMS:
      steps = customs
      break
    default:
      steps = allServices
      break
  }

  const checkIfExists = (id) => {
    return selectedStorage.includes(id)
  }

  const addWizard = async () => {
    const newEndDate = new Date(orderData?.startDate)
    const newStartDate = new Date(orderData?.endDate)
    // To calculate the time difference of two dates
    let Difference_In_Time = newEndDate?.getTime() - newStartDate?.getTime()

    // To calculate the no. of days between two dates
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))

    let base64 = null
    let performa = ''
    let bol = ''
    let product_insurance = ''
    let product_clearance = ''
    let other_files = ''
    let insurances = ''
    let clearances = ''
    let storage_spaces = [null, null, null, null, null]
    if (product?.file?.performa?.uri) {
      base64 = await FileSystem.readAsStringAsync(
        product?.file?.performa?.uri,
        {
          encoding: 'base64',
        }
      )
      performa = [
        'data:' + product?.file?.performa?.mimeType + ';base64,' + base64,
      ]
    }
    if (product?.file?.bill?.uri) {
      base64 = await FileSystem.readAsStringAsync(product?.file?.bill?.uri, {
        encoding: 'base64',
      })
      bol = ['data:' + product?.file?.bill?.mimeType + ';base64,' + base64]
    }
    if (product?.file?.insurance?.uri) {
      base64 = await FileSystem.readAsStringAsync(
        product?.file?.insurance?.uri,
        {
          encoding: 'base64',
        }
      )
      product_insurance = [
        'data:' + product?.file?.insurance?.mimeType + ';base64,' + base64,
      ]
    }
    if (product?.file?.clearance?.uri) {
      base64 = await FileSystem.readAsStringAsync(
        product?.file?.clearance?.uri,
        {
          encoding: 'base64',
        }
      )
      product_clearance = [
        'data:' + product?.file?.clearance?.mimeType + ';base64,' + base64,
      ]
    }
    if (product?.file?.other?.uri) {
      base64 = await FileSystem.readAsStringAsync(product?.file?.other?.uri, {
        encoding: 'base64',
      })
      other_files = [
        'data:' + product?.file?.other?.mimeType + ';base64,' + base64,
      ]
    }
    if (storageSpace) {
      let index = storage_spaces.length - 1

      Object.entries(storageSpace)?.map(([key, value]) => {
        if (selectedStorage?.includes(parseInt(key)) && index >= 0) {
          console.log(index)
          storage_spaces[index] = value
          index--
        }
      })
    }
    addWizOrder(
      {
        customer: '',
        space_to_rent: orderData?.space,
        starting_date: newStartDate.getFullYear()
          ? newStartDate?.toISOString()?.split('T')[0]
          : '',
        end_date: newEndDate.getFullYear()
          ? newEndDate?.toISOString()?.split('T')[0]
          : '',
        remaining_date: Difference_In_Days,
        order_type: type?.id,
        status: INITIALIZED,
        storage:
          type?.name?.toLowerCase() === WAREHOUSE
            ? selectedStorage?.length
              ? selectedStorage
              : []
            : '',
        office: [],
        resource: [],
        storage_spaces:
          type?.name?.toLowerCase() === WAREHOUSE
            ? [null, null, null, '5', '5']
            : '',
        equipments: [],
        mapped_warehouse:
          type?.name?.toLowerCase() === STORAGE ? storageId : '',
        warehouse: type?.name?.toLowerCase() === WAREHOUSE ? warehouseId : '',
      },
      dispatch,
      () => {
        router.back()
      },
      toast
    )

    return
  }

  const addWizShip = async () => {
    let insurances = ''
    let clearances = ''
    if (shipmentData?.file?.clearance && shipmentData?.file?.clearance.length) {
      let promises = shipmentData?.file?.clearance.map(async (c) => {
        if (c.uri) {
          base64 = await FileSystem.readAsStringAsync(c.uri, {
            encoding: 'base64',
          })
          return 'data:' + c?.mimeType + ';base64,' + base64
        }
      })
      clearances = await Promise.all(promises)
    }
    if (shipmentData?.file?.insurance && shipmentData?.file?.insurance.length) {
      promises = shipmentData?.file?.insurance.map(async (c) => {
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
        shipmenttype: shipmentType?.id,
        product: product?.id,
        productqty: shipmentData?.quantity,
        destination: '',
        initialqty: product?.available,
        lat: shipmentData?.dropOff?.latitude,
        lng: shipmentData?.dropOff?.longitude,
        originlat: shipmentData?.pickUp?.latitude,
        originlng: shipmentData?.pickUp?.longitude,
        reason: '',
        fraight_price: null,
        port: shipmentData?.port?.id,
        company: shipmentData?.company,
        vehicle: shipmentData?.vehicle ?? '',
        transitor: shipmentData?.transitor,
        insurances,
        clearances,
        buy_clearance: shipmentData?.sysclear,
        buy_insurance: shipmentData?.sysInsur,
        agent: shipmentData?.agent ?? '',
      },
      dispatch,
      toast,
      () => {
        router.back()
      }
    )
  }
  const addWizTransit = async () => {
    addTransits(
      {
        product: productId,
        port: portid,
        transitor: agentId,
        request_transitor: '',
      },
      dispatch,
      toast,
      () => {
        router.back()
      }
    )
  }

  useEffect(() => {
    if (price[page.current - 1] === undefined && price[page.current - 2]) {
      const prev = price
      prev[page.current - 1] = price[page.current - 2]
      setPrice([...prev])
    }
    if (steps[page.current - 1] && steps[page.current - 1].skip) {
      setPage({
        current:
          page.current < page.previous ? page.current - 1 : page.current + 1,
        previous: page.current,
      })
    }
  }, [page])

  useEffect(() => {
    if (productId) {
      getProductDetails(productId, dispatch, setProduct, toast)
    }
  }, [productId])
  useEffect(() => {
    if (
      !storageTypes &&
      params?.type !== SHIPMNET &&
      params?.type !== CUSTOMS
    ) {
      getMappedStorages(null, dispatch, setStorageTypes, toast)
    }
    if (!warehouses && params?.type !== SHIPMNET && params?.type !== CUSTOMS) {
      getWarehouses(null, dispatch, setWarehouses, toast)
    }
    if (!orderTypes && params?.type !== SHIPMNET && params?.type !== CUSTOMS) {
      getOrderTypes(null, dispatch, setOrderTypes, toast)
    }
    if (!shipmentTypes && params?.type !== CUSTOMS) {
      getShipmentTypes(null, dispatch, setShipmentTypes, toast)
    }
    if (params?.type === SHIPMNET || params?.type === CUSTOMS) {
      getAllProducts(null, dispatch, setProducts, toast)
    }
  }, [])

  return (
    <View style={styles.container}>
      <StepHeader length={steps.length} current={page.current} />
      {steps[page.current - 1] && (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: SIZES.large,
          }}
          style={{
            ...common.container,
            marginTop: 0,
            paddingHorizontal: SIZES.medium,
          }}
        >
          {steps[page.current - 1].component()}
        </ScrollView>
      )}
      <StepFooter
        length={steps.length}
        current={page?.current}
        setCurrent={(value) => {
          setPage({
            current: value,
            previous: page.current,
          })
        }}
        price={price[page.current - 1]}
        onFinish={() => {
          if (params?.type === SPACE) {
            addWizard()
          } else if (params?.type === SHIPMNET) {
            addWizShip()
          } else if (params?.type === CUSTOMS) {
            addWizTransit()
          }
        }}
      />
    </View>
  )
}

export default Steps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})
