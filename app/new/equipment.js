import { View, Text, ScrollView, Button, Image } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/common/input/Input'
import { COLORS } from '../../constants'
import styles from './styles/warehouse.style'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { NUMBER } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useNavigation } from 'expo-router'
import { addOfficeEquipment } from '../../api/office/office'
import * as FileSystem from 'expo-file-system'

const equipments = () => {
  const [name, setName] = useState()
  const [type, setType] = useState()
  const [price, setPrice] = useState()
  const [images, setImages] = useState([])
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
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
      setImages([result.assets[0].uri])
    }
  }

  const onAdd = async () => {
    if (images) {
      const base64 = await FileSystem.readAsStringAsync(images[0], {
        encoding: 'base64',
      })
      let filename = images[0].split('/').pop()

      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`
      addOfficeEquipment(
        {
          name,
          equipment_type: type,
          price,
          image_url: base64,
          image: 'data:' + type + ';base64,' + base64,
        },
        dispatch,
        toast,
        () => navigate.goBack(),
        {}
      )
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Equipment Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input label={'Equipment Name'} state={name} setState={setName} />
        <Input label={'Equipment Type'} state={type} setState={setType} />
        <Input
          label={'Equipment Price'}
          state={price}
          setState={setPrice}
          type={NUMBER}
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
      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default equipments
