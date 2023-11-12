import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native'
import styles from './styles/warehouse.style'
import { COLORS } from '../../constants'
import Input from '../../components/common/input/Input'
import { NUMBER, mSQUARE } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'

const storage = () => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const [name, setName] = useState()
  const [height, setHeight] = useState()
  const [terminal, setTerminal] = useState()
  const [space, setSpace] = useState()
  const [pricePer, setPricePer] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [images, setImages] = useState([])

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
      setImages([...images, result.assets[0].uri])
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Warehouse Storage Type</Text>
        <Text style={styles.headerMsg}>
          Use a permanent address where you can receive mail.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Storage Type Name'} state={name} setState={setName} />
        <Input
          label={'Storage Space'}
          state={space}
          setState={setSpace}
          type={NUMBER}
        />
        <Input
          label={'Storage Height'}
          state={height}
          setState={setHeight}
          type={NUMBER}
        />
        <Input
          label={'Price / ' + mSQUARE}
          state={pricePer}
          setState={setPricePer}
          type={NUMBER}
        />
        <Input
          label={'Total Price'}
          state={price}
          setState={setPrice}
          type={NUMBER}
        />
        <Input label={'Terminal'} state={terminal} setState={setTerminal} />

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Storage Type Description</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            value={description}
            onChangeText={(e) => {
              setDescription(e)
            }}
          />
        </View>

        <View style={styles.inputWrapper}>
          <ScrollView horizontal>
            {images.map((image, index) => (
              <View key={index} style={styles.imagesWrapper}>
                <Image style={styles.image} source={{ uri: image }} />
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
      <Footer onCancel={() => {}} onSave={() => {}} />
    </ScrollView>
  )
}

export default storage
