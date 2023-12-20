import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native'
import styles from './styles/warehouse.style'
import { COLORS } from '../../constants'
import Input from '../../components/common/input/Input'
import { MULTI } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { addStorageType } from '../../api/storage/storage'
import * as FileSystem from 'expo-file-system'

const storage = () => {
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [images, setImages] = useState([])
  const dispatch = store.dispatch
  const toast = useToast()
  const [errors, setErrors] = useState({
    name: null,
    description: null,
  })
  const navigate = useNavigation()

  const onAdd = async () => {
    if (!name) {
      setErrors({ ...errors, name: true })
      toast.show('Storage Type Name Required', { type: 'danger' })
      return
    }
    if (!description) {
      setErrors({ ...errors, description: true })
      toast.show('Storage Type Description Required', { type: 'danger' })
      return
    }
    setErrors({ name: null, description: null })
    const pictures = images.map(async (image) => {
      let filename = image.split('/').pop()

      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`
      const base64 = await FileSystem.readAsStringAsync(images[0], {
        encoding: 'base64',
      })
      return 'data:' + type + ';base64,' + base64
    })
    const resolved = await Promise.all(pictures)
    addStorageType(
      {
        image: resolved,
        status: 'initialized',
        storage_name: name,
        storage_type_meta: description,
        layout_image: resolved,
      },
      dispatch,
      toast,
      () => {
        navigate.goBack()
      }
    )
  }

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
      </View>
      <View style={styles.inputContainer}>
        <Input
          label={'Storage Type Name'}
          state={name}
          setState={setName}
          error={errors.name}
        />
        <Input
          label={'Storage Type Description'}
          state={description}
          setState={setDescription}
          type={MULTI}
          error={errors.description}
        />

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
      <Footer
        onCancel={() => {
          navigate.goBack()
        }}
        onSave={onAdd}
      />
    </ScrollView>
  )
}

export default storage
