import { View, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import CardDetail from '../../common/detail/CardDetail'
import { COLORS, SIZES } from '../../../constants'
import styles from '../../common/styles/warehouse.style'
import { useSelector } from 'react-redux'
import { selectIsFetching, selectUser } from '../../../features/data/dataSlice'
import innerStyles from '../../common/styles/withImages.style'
import {
  deleteSingleInsurance,
  getSingleInsurance,
  updateSingleInsurance,
} from '../../../api/product/insurance'
import Input from '../../common/input/Input'
import { NUMBER } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import { Feather } from '@expo/vector-icons'
import Footer from '../../common/footer/Footer'
import { router } from 'expo-router'
import CustomModal from '../../common/modal/CustomModal'
const SingleInsurance = ({ params }) => {
  const user = useSelector(selectUser)
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [cost, setCost] = useState()
  const [insurance, setInsurance] = useState()
  const [deleteVisible, setdeleteVisible] = useState(false)
  const [fields, setFields] = useState([])
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState()

  const onAdd = (accept) => {
    updateSingleInsurance(
      params?.id,
      {
        cost: cost ?? '',
        paid: false,
        accepted: accept,
        declined: !accept,
        completed: false,
        confirmed: false,
        declined_reason: !accept ? reason : '',
        dynamicInputs: fields,
        id: params?.id,
      },
      dispatch,
      () => {
        router.back()
      },
      toast
    )
  }
  const onDelete = () => {
    deleteSingleInsurance(
      params?.id,

      dispatch,
      () => {
        router.back()
      },
      toast
    )
  }
  useEffect(() => {
    getSingleInsurance(params?.id, dispatch, setInsurance, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={SIZES.xxLarge}
      color={COLORS.primary}
    />
  ) : (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.pureWhite,
      }}
      contentContainerStyle={{
        ...innerStyles.infoContainer,
        padding: 0,
      }}
    >
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        input={reason}
        setInput={setReason}
        onSuccess={() => {
          onAdd(false)
        }}
      />
      <CustomModal
        visible={deleteVisible}
        setVisible={setdeleteVisible}
        onSuccess={() => {
          onDelete(false)
        }}
      />
      <View
        style={{
          padding: SIZES.medium,
        }}
      >
        <View>
          <View
            style={{
              gap: SIZES.small,
              display: 'flex',
            }}
          >
            <CardDetail
              label={'Status'}
              value={insurance?.status}
              status={COLORS.green}
            />

            <CardDetail
              label={'Product Name'}
              value={insurance?.productdetail?.product_name}
            />
            <CardDetail
              label={'Product Unit Dimensions'}
              value={
                '  Height : ' +
                insurance?.productdetail?.height +
                '\n Length :' +
                insurance?.productdetail?.length +
                '\n Width :' +
                insurance?.productdetail?.width
              }
            />
            <CardDetail
              label={'Product Total Weight'}
              value={
                insurance?.productdetail?.weight +
                ' ' +
                insurance?.productdetail?.weightingUnit
              }
            />
            <CardDetail
              label={'Product Weight / Unit'}
              value={
                insurance?.productdetail?.weight_unit +
                ' ' +
                insurance?.productdetail?.weightingUnit
              }
            />
            <CardDetail
              label={'Insurance agent'}
              value={insurance?.agentdetail?.first_name}
            />
            <CardDetail
              label={'Agent License'}
              value={insurance?.agentdetail?.license}
              download
              onlyPreview
            />

            <CardDetail
              label={'Product Expirey Date'}
              value={insurance?.productdetail?.expire_date}
              isDate
            />
            <CardDetail
              label={'Product Total Quantity'}
              value={insurance?.productdetail?.quantity}
              isPrice
            />
            <CardDetail
              label={'Product Price / Unit'}
              value={insurance?.productdetail?.price_unit}
              isPrice
            />
            <CardDetail
              label={'Total Product Price'}
              value={insurance?.productdetail?.price}
              isPrice
            />
            <CardDetail
              label={'Product SKU'}
              value={insurance?.productdetail?.sku}
            />
            {user?.groups?.length > 0 &&
            insurance?.status?.toLowerCase() === 'created' ? (
              <View>
                <View style={innerStyles.divider} />

                <Input
                  label={'Insurance Cost'}
                  placeholder='Input Insurance Cost'
                  state={cost}
                  setState={setCost}
                  type={NUMBER}
                />
                <View style={innerStyles.divider} />

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
                    setFields([
                      ...fields,
                      {
                        label: 'Label ' + parseInt(fields.length),
                        value: '',
                        type: '',
                      },
                    ])
                  }}
                />
                <View style={innerStyles.divider} />
                <Footer
                  onSave={() => {
                    onAdd(true)
                  }}
                  onCancel={() => {
                    setVisible(true)
                  }}
                  saveText={'Accept'}
                  cancelText={'Decline'}
                />
              </View>
            ) : (
              <>
                <CardDetail
                  label={'Insurance Cost'}
                  value={insurance?.cost ?? 'Not Calculated Yet...'}
                />
                {insurance?.status?.toLowerCase() === 'created' && (
                  <Footer
                    onCancel={() => {
                      setdeleteVisible(true)
                    }}
                    onlyCancel
                    cancelText={'Remove'}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default SingleInsurance
