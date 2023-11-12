import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native'
import styles from './styles/warehouse.style'
import storageStyles from './styles/storage.style'
import { COLORS } from '../../constants'
import { useEffect } from 'react'
import { getStorageDetail } from '../../api/storage/storage'
import { selectIsFetching } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Detail from '../../components/common/detail/Detail'
import { mSQUARE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

const storage = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [storage, setStorage] = useState()
  const [images, setImages] = useState([])

  useEffect(() => {
    getStorageDetail(params?.id, dispatch, setStorage, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{params?.name} Storage Type</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <AntDesign name='shoppingcart' size={20} color={'white'} />
          <Text style={styles.btnText}>Order {params?.name}</Text>
        </TouchableOpacity>
      </View>
      {storage && storage.data && (
        <View style={styles.inputContainer}>
          <Detail
            label={'Storage Type Name'}
            value={storage.data?.storage_name}
          />
          <Detail label={'Storage Space'} value={storage.data?.space} />
          {/* <Detail label={'Storage Height'}  value={storage.data} /> */}
          <Detail label={'Price / ' + mSQUARE} value={storage.data?.price_m2} />
          <Detail
            label={'Total Price'}
            s
            value={storage.data?.storage_type_price}
          />
          <Detail label={'Terminal'} value={storage.data?.terminal} />
          <Detail
            label={'Storage Type Description'}
            value={storage.data?.storage_type_meta}
          />
          {/* Layout   */}
          <View style={storageStyles.layoutContainer}>
            <Text style={styles.detailLabel}>Storage Layout</Text>
            <View style={storageStyles.layoutDetails}>
              <Image
                style={styles.mainImage}
                source={{ uri: storage?.data?.layout }}
              />
              <TouchableOpacity style={storageStyles.btn(false)}>
                <Text style={{ color: 'white' }}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* SHELVES */}
          <View>
            <Text style={styles.detailLabel}>Storage Shelves</Text>
            <View style={storageStyles.listContainer}>
              {storage.data?.storageShelfs.map((shelf, index) => (
                <View key={index} style={storageStyles.singleItem}>
                  <Text style={styles.name}>
                    {shelf.x_axis + ' , ' + shelf.y_axis + ' , ' + shelf.z_axis}
                  </Text>

                  <View style={storageStyles.singleBtnContainer}>
                    <TouchableOpacity style={storageStyles.btn(false)}>
                      <AntDesign name='plus' size={15} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={storageStyles.btn(false)}>
                      <AntDesign name='edit' size={15} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={storageStyles.btn(true)}>
                <AntDesign name='plus' size={20} color={'white'} />
                <Text style={{ color: 'white' }}>Add Shelves</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* RESOURCES */}
          {storage.resources && (
            <View>
              <Text style={styles.detailLabel}>Human Resources</Text>
              <View style={storageStyles.listContainer}>
                {storage?.resources?.map((resource, index) => (
                  <View key={index} style={storageStyles.singleItem}>
                    <Text style={styles.name}>
                      {resource.groupResource?.name}
                    </Text>
                    <Text style={styles.subName}>
                      {resource.userResource?.first_name}
                    </Text>

                    <View style={storageStyles.singleBtnContainer}>
                      <TouchableOpacity style={storageStyles.btn(false)}>
                        <AntDesign name='plus' size={15} color={'white'} />
                      </TouchableOpacity>
                      <TouchableOpacity style={storageStyles.btn(false)}>
                        <AntDesign name='edit' size={15} color={'white'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <TouchableOpacity style={storageStyles.btn(true)}>
                  <AntDesign name='plus' size={20} color={'white'} />
                  <Text style={{ color: 'white' }}>Add Resources</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* OFFICES */}
          {storage.officeResource && (
            <View>
              <Text style={styles.detailLabel}>Human Resources</Text>
              <View style={storageStyles.listContainer}>
                {storage?.officeResource?.map((office, index) => (
                  <View key={index} style={storageStyles.singleItem}>
                    <Text style={styles.name}>{office.officeStore?.name}</Text>
                    <Text style={styles.subName}>
                      Office Price: {office.officeStore?.price} Birr
                    </Text>
                    <Text>Reception: {office.officeReception?.first_name}</Text>

                    <View style={storageStyles.singleBtnContainer}>
                      <TouchableOpacity style={storageStyles.btn(false)}>
                        <AntDesign name='plus' size={15} color={'white'} />
                      </TouchableOpacity>
                      <TouchableOpacity style={storageStyles.btn(false)}>
                        <AntDesign name='edit' size={15} color={'white'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <TouchableOpacity style={storageStyles.btn(true)}>
                  <AntDesign name='plus' size={20} color={'white'} />
                  <Text style={{ color: 'white' }}>Add Office Resources</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Footer onCancel={() => {}} onSave={() => {}} />
        </View>
      )}
    </ScrollView>
  )
}

export default storage
