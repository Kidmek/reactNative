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
import { getShipmentTypes } from '../../../api/shipment/shipment'
import NewShipment from '../../shipments/New/NewShipment'
import Info from '../../common/cards/info/Info'
import { useRouter } from 'expo-router'
import SingleWarehouse from '../../home/warehouse/SingleWarehouse'
import OfficeWithEquipments from '../../home/office/OfficeWithEquipments'
import HumanResource from '../../home/office/HumanResource'
import WantStorage from '../../home/storageTypes/WantStorage'
import SingleStorageType from '../../home/storageTypes/SingleStorageType'
import { getAllProducts, getProductDetails } from '../../../api/product/product'

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
  const [product, setProduct] = useState()
  const [products, setProducts] = useState()
  const [transitQns, setTransitQns] = useState(false)
  const [rentQns, setRentQns] = useState()
  const [shipQns, setShipQns] = useState()
  const [officeQns, setOfficeQns] = useState()
  const [HRQns, setHRQns] = useState()
  const [portid, setPortid] = useState()
  const [agentId, setAgentId] = useState()
  const [type, setType] = useState()
  const [shipmentType, setShipmentType] = useState()
  const [warehouseId, setWarehouseId] = useState()
  const [officeId, setOfficeId] = useState()
  const [warehouse, setWarehouse] = useState()
  const [typeQns, setTypeQns] = useState()
  const [storage, setStorage] = useState()
  const [storageId, setStorageId] = useState()
  const [productId, setProductId] = useState()
  const [storageSpace, setStorageSpace] = useState()
  const [selectedStroage, setSelectedStroage] = useState([])

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
            title={'Would You Like To Transit Product?'}
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

              <NewShipment params={shipmentType} wizard />
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
            setState={(value) => setOfficeQns(value)}
          />
          {officeQns && (
            <View>
              <View style={common.divider} />
              <OfficeWithEquipments
                warehouse={warehouse}
                checked={officeId}
                setChecked={setOfficeId}
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
            setState={(value) => setHRQns(value)}
          />
          {HRQns && (
            <View>
              <View style={common.divider} />
              <HumanResource
                warehouse={warehouse}
                checked={HRQns}
                setChecked={setHRQns}
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
            setState={(value) => setTypeQns(value)}
          />
          {typeQns && (
            <View>
              <View style={common.divider} />
              {warehouse?.warehousestoragemappings &&
              warehouse?.warehousestoragemappings.length ? (
                <WantStorage
                  storages={warehouse?.warehousestoragemappings}
                  storageSpace={storageSpace}
                  setStorageSpace={setStorageSpace}
                  checkIfExists={checkIfExists}
                  setSelectedStroage={setSelectedStroage}
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
              <NewShipment params={shipmentType} wizard data={product} />
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
    return selectedStroage.includes(id)
  }

  useEffect(() => {
    if (steps[page.current - 1] && steps[page.current - 1].skip) {
      setPage({
        current:
          page.current < page.previous ? page.current - 1 : page.current + 1,
        previous: page.current,
      })
    }
  }, [page])

  useEffect(() => {
    if (shipmentType?.type && product?.id !== productId) {
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
    if ((params?.type === SHIPMNET || params?.type === CUSTOMS) && !products) {
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
        onFinish={() => router.back()}
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
