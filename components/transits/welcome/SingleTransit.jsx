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

import Input from '../../common/input/Input'
import { DATE, NUMBER } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import { Feather } from '@expo/vector-icons'
import Footer from '../../common/footer/Footer'
import { router } from 'expo-router'
import CustomModal from '../../common/modal/CustomModal'
import {
  deleteSingleTransit,
  getSingleTransit,
  updateSingleTransit,
} from '../../../api/shipment/shipment'
import DateTimePicker from '@react-native-community/datetimepicker'
const SingleTransit = ({ params }) => {
  const user = useSelector(selectUser)
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [agentCost, setAgentCost] = useState()
  const [withTax, setWithTax] = useState()
  const [customes, setCustomes] = useState()
  const [clearance, setClearance] = useState()
  const [taxCost, setTaxCost] = useState()
  const [vatCost, setVatCost] = useState()
  const [handOff, setHandOff] = useState()
  const [whichToShow, setWhichToShow] = useState()
  const [transit, setTransit] = useState()
  const [deleteVisible, setdeleteVisible] = useState(false)
  const [fields, setFields] = useState([])
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState()

  const onAdd = (accept, confirmed) => {
    updateSingleTransit(
      params?.id,
      {
        agent_cost: agentCost ?? '',
        cost: clearance ?? '',
        paid: false,
        accepted: accept,
        declined: !accept,
        completed: false,
        confirmed: confirmed == true,
        declined_reason: !accept ? reason : '',
        dynamicInputs: fields,
        hand_of_date: handOff
          ? new Date(handOff).toISOString().split('T')[0]
          : '',
        id: params?.id,
        product: transit?.productdetail?.id,
        status: '',
        transitor: transit?.transitordetail?.id,
        vat: vatCost ?? '',
        with_holding: withTax ?? '',
        tax: taxCost ?? '',
        customes_duty: customes ?? '',
      },
      dispatch,
      () => {
        router.back()
      },
      toast
    )
  }
  const onDelete = () => {
    deleteSingleTransit(
      params?.id,

      dispatch,
      () => {
        router.back()
      },
      toast
    )
  }
  useEffect(() => {
    getSingleTransit(params?.id, dispatch, setTransit, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
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
              value={transit?.status}
              status={COLORS.green}
            />

            <CardDetail
              label={'Product Name'}
              value={transit?.productdetail?.product_name}
            />
            <CardDetail
              label={'Product Unit Dimensions'}
              value={
                '  Height : ' +
                transit?.productdetail?.height +
                '\n Length :' +
                transit?.productdetail?.length +
                '\n Width :' +
                transit?.productdetail?.width
              }
            />
            <CardDetail
              label={'Product Total Weight'}
              value={
                transit?.productdetail?.weight +
                ' ' +
                transit?.productdetail?.weightingUnit
              }
            />
            <CardDetail
              label={'Product Weight / Unit'}
              value={
                transit?.productdetail?.weight_unit +
                ' ' +
                transit?.productdetail?.weightingUnit
              }
            />
            <CardDetail
              label={'Port'}
              value={transit?.transitordetail?.portdetail?.name}
            />
            <CardDetail
              label={'Transitor'}
              value={transit?.transitordetail?.first_name}
            />
            <CardDetail
              label={'Transitor Agent License'}
              value={transit?.transitordetail?.license}
              download
            />

            <CardDetail
              label={'Product Expirey Date'}
              value={transit?.productdetail?.expire_date}
              isDate
            />
            <CardDetail
              label={'Product Total Quantity'}
              value={transit?.productdetail?.quantity}
              isPrice
            />
            <CardDetail
              label={'Product Price / Unit'}
              value={transit?.productdetail?.price_unit}
              isPrice
            />
            <CardDetail
              label={'Total Product Price'}
              value={transit?.productdetail?.price}
              isPrice
            />
            <CardDetail
              label={'Product SKU'}
              value={transit?.productdetail?.sku}
            />

            {user?.groups?.length > 0 &&
            transit?.status?.toLowerCase() === 'created' ? (
              <View>
                <View style={innerStyles.divider} />

                <Input
                  label={'Transitor Agent Cost'}
                  placeholder='Input Transitor Agent'
                  state={agentCost}
                  setState={setAgentCost}
                  type={NUMBER}
                />
                <Input
                  label={'Witholding Tax'}
                  placeholder='Input Witholding Tax'
                  state={withTax}
                  setState={setWithTax}
                  type={NUMBER}
                />
                <Input
                  label={'Customes Duty'}
                  placeholder='Input Customes Duty'
                  state={customes}
                  setState={setCustomes}
                  type={NUMBER}
                />
                <Input
                  label={'Clearance Cost'}
                  placeholder='Input Clearance Cost'
                  state={clearance}
                  setState={setClearance}
                  type={NUMBER}
                />
                <Input
                  label={'Tax Cost'}
                  placeholder='Input Tax Cost'
                  state={taxCost}
                  setState={setTaxCost}
                  type={NUMBER}
                />
                <Input
                  label={'VAT Cost'}
                  placeholder='Input VAT Cost'
                  state={vatCost}
                  setState={setVatCost}
                  type={NUMBER}
                />
                <Input
                  label={'Clearance Handoff Date'}
                  placeholder='Input Clearance Handoff Date'
                  setWhichToShow={setWhichToShow}
                  id={'handOff'}
                  state={handOff}
                  type={DATE}
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
                        label: 'Label ' + parseInt(fields.length) + 1,
                        value: '',
                        type: '',
                      },
                    ])
                  }}
                />
                <View style={{ ...innerStyles.divider }} />
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
                  value={transit?.cost ?? 'Not Calculated Yet...'}
                />
                {transit?.status?.toLowerCase() === 'created' && (
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
            {user?.groups?.length < 1 &&
              transit?.status?.toLowerCase() === 'accepted' && (
                <Footer
                  onCancel={() => {
                    setdeleteVisible(true)
                  }}
                  onSave={() => {
                    onAdd(true, true)
                  }}
                  saveText={'Confirm & Pay'}
                  cancelText={'Decline'}
                />
              )}
          </View>
        </View>
        {whichToShow === 'handOff' && (
          <DateTimePicker
            value={handOff ? new Date(handOff) : new Date()}
            mode={'date'}
            is24Hour={true}
            dateFormat='longdate'
            onChange={(e, selectedDate) => {
              setWhichToShow(null)
              setHandOff(selectedDate.toDateString())
            }}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default SingleTransit
