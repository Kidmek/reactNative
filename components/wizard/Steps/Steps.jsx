import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import common from '../../common/styles/common.style'
import StepHeader from './StepsHeader'
import StepFooter from './StepFooter'
import NewProduct from '../../products/New/NewProduct'
import Products from '../../products/all/All'
import commonStyles from '../../common/styles/common.style'
import CheckQuestion from '../../common/checkQuestion/CheckQuestion'
import All from '../../ports/All/All'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, SIZES } from '../../../constants'
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
import { getMappedStorages, getStorages } from '../../../api/storage/storage'
import {
  getStorageSpaces,
  getWarehouses,
} from '../../../api/warehouse/warehouse'
import { useToast } from 'react-native-toast-notifications'
import { getOrderTypes } from '../../../api/order/order'
import NewOrder from '../../orders/New/NewOrder'
import ShipmentType from '../../shipments/type/ShipmentType'
import {
  addShipment,
  addTransits,
  getShipmentTypes,
  getTransportationMethods,
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
import { getAllGroups } from '../../../api/users'
import WizStorage from '../../home/storageTypes/WizStorage'
import SingleCard from '../../common/cards/single/SingleCard'
import Checkbox from 'expo-checkbox'
import Vehicles from '../../shipments/transportations/Vehicles'

const Steps = ({ params }) => {
  const fetching = useSelector(selectIsFetching)
  const dispatch = store.dispatch
  const toast = useToast()
  const router = useRouter()
  const [storageTypes, setStorageTypes] = useState()
  const [warehouses, setWarehouses] = useState()
  const [orderTypes, setOrderTypes] = useState()
  const [shipmentTypes, setShipmentTypes] = useState()
  const [transTypes, setTransTypes] = useState()
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
  const [requests, setRequests] = useState({
    request_equipment: false,
    request_hr: false,
    request_office: false,
    request_storage: false,
  })
  const [products, setProducts] = useState()
  const [transitQns, setTransitQns] = useState(false)
  const [rentQns, setRentQns] = useState()
  const [shipQns, setShipQns] = useState()
  const [officeQns, setOfficeQns] = useState()
  const [HRQns, setHRQns] = useState()
  const [groups, setGroups] = useState()
  const [storages, setStorages] = useState()
  const [HRids, setHRids] = useState({
    ids: [],
    values: {},
  })
  const [portid, setPortid] = useState()
  const [portName, setPortName] = useState()
  const [agentId, setAgentId] = useState()
  const [type, setType] = useState()
  const [shipmentType, setShipmentType] = useState()
  const [warehouseId, setWarehouseId] = useState()
  const [office, setOffice] = useState({
    officeId: [],
    equipmentId: [],
  })
  const [warehouse, setWarehouse] = useState()
  const [typeQns, setTypeQns] = useState()
  const [storage, setStorage] = useState()
  const [storageId, setStorageId] = useState()
  const [productId, setProductId] = useState()
  const [storageSpace, setStorageSpace] = useState({})
  const [selectedStorage, setSelectedStorage] = useState([])
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState([])
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
            setPageError(null, null)
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
                setChecked={(value) => {
                  setWarehouseId(value)
                  setPageError(null, null)
                  reset()
                }}
                data={warehouses}
              />
            ) : (
              <StorageType
                fetching={fetching}
                wizard
                checked={storageId}
                setChecked={(value) => {
                  reset()
                  setStorageId(value)
                  setPageError(null, null)
                }}
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
                  console.log(type?.name?.toLowerCase() === STORAGE)
                  if (
                    type?.name?.toLowerCase() === STORAGE &&
                    !(data.space > 0)
                  ) {
                    setPageError('Specify space to rent', 'warning')
                  } else if (
                    parseFloat(data?.space) >
                    parseFloat(storage?.available_space)
                  ) {
                    setPageError('Exceeded Total Available Space', 'warning')
                  } else if (!data?.startDate || !data?.endDate) {
                    setPageError('Select Start And End Date', 'warning')
                  } else if (
                    data?.startDate &&
                    data?.endDate &&
                    ((type?.name?.toLowerCase() === WAREHOUSE &&
                      warehouse?.available_space &&
                      warehouse?.price_m2) ||
                      (data?.space && storage?.price_m2))
                  ) {
                    const diff = getDayDifference(
                      data?.startDate,
                      data?.endDate
                    )
                    const space =
                      type?.name?.toLowerCase() === WAREHOUSE
                        ? warehouse?.available_space
                        : data.space
                    const price =
                      type?.name?.toLowerCase() === WAREHOUSE
                        ? warehouse?.price_m2
                        : storage?.price_m2
                    setPrice([0, 0, space * price * diff])

                    setPageError(null, null)
                  } else {
                    setPrice([0, 0, 0])
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
                setOffice({
                  officeId: [],
                  equipmentId: [],
                })
              }
              setOfficeQns(value)
            }}
          />
          {officeQns && (
            <View>
              <View style={common.divider} />
              <OfficeWithEquipments
                reqOffice={requests.request_office}
                setOfficeReq={(value) => {
                  setRequests({ ...requests, request_office: value })
                }}
                reqEquipment={requests.request_equipment}
                setEquipmentReq={(value) => {
                  setRequests({ ...requests, request_equipment: value })
                }}
                warehouse={warehouse}
                checked={office}
                setChecked={(data) => {
                  if (data && orderData?.startDate && orderData?.endDate) {
                    let total = 0
                    const diff = getDayDifference(
                      orderData?.startDate,
                      orderData?.endDate
                    )
                    warehouse?.warehouseRecources?.map((item) => {
                      if (data?.officeId?.includes(item?.id)) {
                        total += item?.officeDetail?.price
                        item?.officeDetail?.equipments?.map((eq) => {
                          if (data?.equipmentId?.includes(eq?.id)) {
                            total += eq?.price
                          }
                        })
                      }
                    })

                    total = total * diff + price[page.current - 2]
                    const prev = price
                    prev[page.current - 1] = total
                    setPrice([...prev])
                  }
                  setOffice(data)
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
                setHRids({
                  ids: [],
                  values: {},
                })
              }
              setHRQns(value)
            }}
          />
          {HRQns && (
            <View>
              <View style={common.divider} />
              <HumanResource
                reqHR={requests.request_hr}
                setHRReq={(value) => {
                  setRequests({ ...requests, request_hr: value })
                }}
                checked={HRids?.ids}
                groups={groups}
                values={HRids?.values}
                setChecked={(data) => {
                  // if (data && orderData?.startDate && orderData?.endDate) {
                  //   let total = 0
                  //   const diff = getDayDifference(
                  //     orderData?.startDate,
                  //     orderData?.endDate
                  //   )
                  //   warehouse?.HumanResources?.map((item) => {
                  //     if (data?.includes(item?.id)) {
                  //       total += item?.officeDetail?.price
                  //     }
                  //   })
                  //   total = total * diff + price[page.current - 2]
                  //   const prev = price
                  //   prev[page.current - 1] = total
                  //   setPrice([...prev])
                  // }

                  if (
                    data?.filter((single) => !(HRids.values[single] > 0))
                      ?.length
                  ) {
                    setPageError('Enter a Quantity for selected HRs', 'warning')
                  } else {
                    setPageError(null, null)
                  }

                  setHRids({ ...HRids, ids: data })
                }}
                setValues={(data) => {
                  if (
                    HRids?.ids?.filter((single) => !(data[single] > 0))?.length
                  ) {
                    setPageError('Enter a Quantity for selected HRs', 'warning')
                  } else {
                    setPageError(null, null)
                  }
                  setHRids({ ...HRids, values: data })
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
              {storages && storages?.results.length ? (
                <WizStorage
                  storages={storages?.results}
                  storageSpace={storageSpace}
                  setStorageSpace={(data) => {
                    if (data && orderData?.startDate && orderData?.endDate) {
                      const diff = getDayDifference(
                        orderData?.startDate,
                        orderData?.endDate
                      )
                      let totalSpace = 0
                      let totalAvailableSpace =
                        type?.name?.toLowerCase() === WAREHOUSE
                          ? warehouse?.available_space
                          : orderData?.space

                      let total = 0
                      if (
                        Object.values(data)?.filter(
                          (single) => !(single?.space > 0)
                        )?.length
                      ) {
                        setPageError(
                          'Enter a Quantity for selected storage',
                          'warning'
                        )
                      } else {
                        Object.values(data).map((single) => {
                          let space = parseFloat(single.space)
                          if (!isNaN(space)) {
                            totalSpace += space
                          }
                        })
                        if (totalSpace > totalAvailableSpace) {
                          setPageError(
                            'Exceeded Total Available Space',
                            'warning'
                          )
                        } else {
                          setPageError(null, null)
                        }
                      }
                      storages?.results?.map((item) => {
                        if (
                          selectedStorage?.includes(item?.id) &&
                          data?.[item?.id]?.space
                        ) {
                          // total += item?.price_m2 * data?.[item?.id]?.space
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
                    if (
                      data?.filter((single) => !(storageSpace[single] > 0))
                        ?.length
                    ) {
                      setPageError(
                        'Enter a Quantity for selected storage',
                        'warning'
                      )
                    } else {
                      setPageError(null, null)
                    }
                    if (data && orderData?.startDate && orderData?.endDate) {
                      const diff = getDayDifference(
                        orderData?.startDate,
                        orderData?.endDate
                      )
                      let total = 0
                      storages?.results?.map((item) => {
                        if (
                          data?.includes(item?.id) &&
                          storageSpace?.[item?.id]
                        ) {
                          // total += item?.price_m2 * storageSpace?.[item?.id]
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
                  totalSpace={
                    type?.name?.toLowerCase() === WAREHOUSE
                      ? warehouse?.available_space
                      : orderData?.space
                  }
                />
              ) : (
                <Info
                  noIcon
                  switchTitle={'Request Storage'}
                  state={requests.request_storage}
                  setState={(value) => {
                    setRequests({
                      ...requests,
                      request_storage: value,
                    })
                  }}
                  hasSwitch={true}
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
            setChecked={(id) => {
              setProductId(id)
              setPageError(null, null)
            }}
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
              setPageError(null, null)
            }}
            data={shipmentTypes}
          />
        </View>
      ),
    },
    // 2
    {
      component: () => (
        <View>
          <Text style={common.wizTitle}>Select A Transportation Method</Text>
          {transTypes?.results?.map((method) => {
            return (
              <SingleCard
                key={method?.id}
                onClick={() => {
                  setShipmentData({
                    ...shipmentData,
                    method: method?.id,
                  })
                  setPageError(null, null)
                }}
                isOnlyText
              >
                <View style={commonStyles.textContainer}>
                  <View style={commonStyles.wizCheckerHeader}>
                    <Text style={commonStyles.name}>{method?.name}</Text>

                    <Checkbox
                      color={COLORS.primary}
                      value={shipmentData?.method === method?.id}
                      onValueChange={(value) => {
                        setShipmentData({
                          ...shipmentData,
                          method: method?.id,
                        })
                        setPageError(null, null)
                      }}
                    />
                  </View>
                  <Text style={commonStyles.type}>{method?.description}</Text>
                </View>
              </SingleCard>
            )
          })}
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
                setOrder={(data) => {
                  setOrderData(data)
                }}
                params={shipmentType}
                wizard
                data={product}
                shipment={shipmentData}
                setShipment={(data) => {
                  if (data?.quantity > product?.available) {
                    setPageError('Exceeded Available Quantity', 'danger')
                  } else if (!data?.company && shipmentType?.id === 1) {
                    setPageError('Select Company', 'danger')
                  } else if (
                    !data?.agent &&
                    data.sysInsur &&
                    shipmentType?.id === 2
                  ) {
                    setPageError('Select An Insurance Agent', 'danger')
                  } else if (
                    !data?.sysInsur &&
                    !data?.file?.insurance?.length &&
                    shipmentType?.id === 2
                  ) {
                    setPageError('Upload Insurance', 'danger')
                  } else if (
                    !data?.sysclear &&
                    !data?.file?.clearance?.length &&
                    shipmentType?.id === 1
                  ) {
                    setPageError('Upload Clearance', 'danger')
                  } else if (!data?.pickUp || !data.dropOff) {
                    setPageError(
                      'Select Pick Up and Dropoff Location ',
                      'danger'
                    )
                  } else {
                    setPageError(null, null)
                  }
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
          <Text style={common.wizTitle}>Select A Vehicle</Text>
          <Vehicles
            amount={shipmentData.quantity}
            product={product}
            setShipment={(data) => {
              setPageError(null, null)
              setShipmentData(data)
            }}
            shipment={shipmentData}
          />
        </View>
      ),
      skip: shipmentType?.id !== 2,
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
            setChecked={(id) => {
              setPageError(null, null)
              setProductId(id)
            }}
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
            setChecked={(value) => {
              setPageError(null, null)
              setPortid(value)
            }}
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
              setChecked={(value) => {
                setPageError(null, null)
                setAgentId(value)
              }}
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

  const checkError = () => {
    toast.hideAll()
    if (error[page.current - 1]?.msg) {
      toast.show(error[page.current - 1].msg, {
        type: error[page.current - 1].severity,
      })
      return false
    } else {
      return true
    }
  }
  const setPageError = (msg, severity) => {
    setError((prev) => {
      prev[page.current - 1] = {
        msg: msg,
        severity: severity,
      }
      return [...prev]
    })
  }

  const reset = () => {
    setOrderData({})
    setHRids({
      ids: [],
      values: {},
    })
    setOffice({
      officeId: [],
      equipmentId: [],
    })
    setRequests({
      request_equipment: false,
      request_hr: false,
      request_office: false,
      request_storage: false,
    })
    setStorageSpace([])
  }

  const addWizard = async () => {
    const newEndDate = new Date(orderData?.endDate)
    const newStartDate = new Date(orderData?.startDate)
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
    let storageSpacesValues = Object.values(storageSpace)
    let groupValues = groups?.results?.length ? new Array(14) : []
    let storage_spaces = storages?.results?.length
      ? new Array(storages?.results.length - selectedStorage?.length)
      : []

    storage_spaces?.fill(null)
    groupValues?.fill(null)
    console.log(groupValues)
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

    Object.entries(HRids.values)?.map(([key, value]) => {
      groupValues[key] = parseInt(value)
    })
    const warehouseData = {
      customer: '',
      dynamicInputs: [{ label: '', type: '', value: '' }],
      // [
      //   ...storage_spaces,
      //   ...storageSpacesValues?.map((s) => s?.fields ?? []),
      // ]
      space_to_rent: warehouse?.available_space,
      starting_date: newStartDate.getFullYear()
        ? newStartDate?.toISOString()?.split('T')[0]
        : '',
      end_date: newEndDate.getFullYear()
        ? newEndDate?.toISOString()?.split('T')[0]
        : '',
      remaining_date: Difference_In_Days,
      order_type: type?.id,
      // status: INITIALIZED,

      storage: selectedStorage?.length ? selectedStorage : [],
      office: office?.officeId,
      resource: HRids?.ids,
      // groupQty: [...groupValues, ...Object.values(HRids.values)],
      groupQty: groupValues,
      equipment: office?.equipmentId?.length ? office?.equipmentId : '',
      shelfs: [],
      mapped_warehouse: '',
      warehouse: warehouseId,
      maxtemps: [
        ...storage_spaces,
        ...storageSpacesValues?.map((s) => s?.maxTemp),
      ],
      mintemps: [
        ...storage_spaces,
        ...storageSpacesValues?.map((s) => s?.minTemp),
      ],
      tempunits: [
        ...storage_spaces,
        ...storageSpacesValues?.map((s) => {
          if (s?.tempUnit) {
            return 'F'
          } else {
            return 'C'
          }
        }),
      ],
      terminals: [
        ...storage_spaces,
        ...storageSpacesValues?.map((s) => s?.terminal),
      ],
      storage_spaces: [
        ...storage_spaces,
        ...storageSpacesValues?.map((s) => s?.space),
      ],
      request_equipment: requests.request_equipment,
      request_hr: requests.request_hr,
      request_office: requests.request_office,
      request_storage: requests.request_storage,
      heights: [],
      heightunits: [],
      price_m2s: [],
    }
    // console.log(groups)
    const storageData = {
      customer: '',
      dynamicInputs: [{ label: '', type: '', value: '' }],

      space_to_rent: orderData?.space,
      starting_date: newStartDate.getFullYear()
        ? newStartDate?.toISOString()?.split('T')[0]
        : '',
      end_date: newEndDate.getFullYear()
        ? newEndDate?.toISOString()?.split('T')[0]
        : '',
      remaining_date: Difference_In_Days,
      order_type: type?.id,
      storage: [],
      office: [],
      resource: [],
      equipment: [],
      mapped_warehouse: storageId,
      warehouse: null,
      maxtemps: [],
      mintemps: [],
      tempunits: [],
      terminals: [],
      storage_spaces: [],
      request_equipment: requests.request_equipment,
      request_hr: requests.request_hr,
      request_office: requests.request_office,
      request_storage: requests.request_storage,
      heights: [],
      heightunits: [],
      price_m2s: [],
    }
    addWizOrder(
      type?.name?.toLowerCase() === WAREHOUSE ? warehouseData : storageData,
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
        transportationtype: shipmentData?.method ?? '',
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

  // Error Effect
  // useEffect(() => {
  //   toast.hideAll()
  //   if (error[page.current]?.msg) {
  //     toast.show(error[page.current].msg, {
  //       type: error[page.current].severity,
  //     })
  //   }
  // }, [error])

  // Page and price  Effect
  useEffect(() => {
    if (page.current > error.length) {
      let err = {
        msg: null,
        severity: null,
      }
      // SPACE ERRORS
      if (page.current === 1 && params.type === SPACE) {
        err.msg = 'Select a Space Type'
        err.severity = 'danger'
      } else if (page.current === 2 && params.type === SPACE) {
        err.msg = `Select a ${
          type?.name?.toLowerCase() === WAREHOUSE ? 'Warehouse' : 'Storage'
        }`
        err.severity = 'danger'
      } else if (
        page.current === 3 &&
        params.type === SPACE &&
        type?.name?.toLowerCase() === WAREHOUSE
      ) {
        err.msg = 'Select Start And End Date'
        err.severity = 'danger'
      }
      //

      // SHIPMENT ERRORS
      if (page.current === 1 && params.type === SHIPMNET) {
        err.msg = 'Select a Product'
        err.severity = 'danger'
      } else if (page.current === 2 && params.type === SHIPMNET) {
        err.msg = `Select a shipment type`
        err.severity = 'danger'
      } else if (page.current === 3 && params.type === SHIPMNET) {
        err.msg = 'Select a method'
        err.severity = 'danger'
      } else if (
        page.current === 4 &&
        params.type === SHIPMNET &&
        shipmentType?.id === 1
      ) {
        err.msg = 'Fill Out All Fields'
        err.severity = 'danger'
      } else if (
        page.current === 5 &&
        params.type === SHIPMNET &&
        shipmentType?.id === 2
      ) {
        err.msg = 'Select A Vehicle'
        err.severity = 'danger'
      }
      //

      // TRANSIT ERRORS
      if (page.current === 1 && params.type === CUSTOMS) {
        err.msg = 'Select a Product'
        err.severity = 'danger'
      } else if (page.current === 2 && params.type === CUSTOMS) {
        err.msg = `Select a port`
        err.severity = 'danger'
      } else if (page.current === 3 && params.type === CUSTOMS) {
        err.msg = 'Select an agent'
        err.severity = 'danger'
      }
      //
      setError([...error, err])
    }
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

  // Data Fetching
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
    if (params?.type === SPACE) {
      getAllGroups(null, dispatch, setGroups, toast)
      getStorages(null, dispatch, setStorages, toast)
    }
    if (params?.type === SHIPMNET) {
      getTransportationMethods(null, dispatch, setTransTypes, toast)
    }
  }, [])
  return (
    <View style={styles.container}>
      <StepHeader
        length={
          type?.name?.toLowerCase() === STORAGE && params?.type === SPACE
            ? steps.length - 3
            : shipmentType?.id !== 2 && params?.type === SHIPMNET
            ? steps.length - 1
            : steps.length
        }
        current={page.current}
      />
      {steps[page.current - 1] && (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: SIZES.large,
          }}
          keyboardShouldPersistTaps='always'
          style={{
            ...common.container,
            marginTop: 0,
            paddingHorizontal:
              params.type === SHIPMNET && page.current == 4 ? 0 : SIZES.medium,
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
        nextDisabled={error[page.current - 1]?.msg}
        agree={agree}
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
        checkError={checkError}
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
