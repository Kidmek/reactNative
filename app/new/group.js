import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import Input from '../../components/common/input/Input'
import styles from './styles/warehouse.style'
import { MULTI, NUMBER } from '../../constants/strings'
import Footer from '../../components/common/footer/Footer'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import CustomDropdown from '../../components/common/dropdown/CustomDropdown'
import { addGroups, addStaff, getAllPermissions } from '../../api/users'
import { COLORS } from '../../constants'

const shipment_method = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
  const [name, setName] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [salary, setSalary] = useState()
  const [password, setPassword] = useState()
  const [passwordC, setPasswordC] = useState()
  const [permissions, setPermissions] = useState()
  const [selectedPermissions, setSelectedPermissions] = useState([])

  const onAdd = () => {
    if (!params.name) {
      addGroups(
        {
          name,
          permissions: selectedPermissions,
        },
        dispatch,
        toast,
        () => {
          navigate.goBack()
        }
      )
    } else {
      addStaff(
        {
          email,
          first_name: firstName,
          last_name: lastName,
          group: params?.id,
          phone,
          username: firstName,
          salary: parseFloat(salary),
          password,
          password_confirmation: passwordC,
        },
        dispatch,
        toast,
        () => {
          navigate.goBack()
        }
      )
    }
  }

  useEffect(() => {
    getAllPermissions(null, dispatch, setPermissions, toast)
  }, [])

  useLayoutEffect(() => {
    if (!params.name)
      navigation.setOptions({
        headerTitle: !params.name ? 'Add User Group' : `Add  ${params.name}`,
      })
  }, [])

  return !permissions ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {!params.name ? 'User Group' : params.name + ' Information'}
        </Text>
      </View>
      {!params.name ? (
        <View style={styles.inputContainer}>
          <Input label={'Group Name'} state={name} setState={setName} />

          <CustomDropdown
            isMulti={true}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Pick Permissions'}
            options={permissions?.results}
            label={'Permissions'}
            state={selectedPermissions}
            setState={setSelectedPermissions}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Input
            label={'First Name'}
            state={firstName}
            setState={setFirstName}
          />
          <Input label={'Last Name'} state={lastName} setState={setLastName} />
          <Input label={'Email Address'} state={email} setState={setEmail} />
          <Input label={'Phone Number'} state={phone} setState={setPhone} />
          <Input
            label={'Salary'}
            state={salary}
            setState={setSalary}
            type={NUMBER}
          />
          <Input label={'Password'} state={password} setState={setPassword} />
          <Input
            label={'Password Confirmation'}
            state={passwordC}
            setState={setPasswordC}
          />
        </View>
      )}

      <Footer onSave={onAdd} />
    </ScrollView>
  )
}

export default shipment_method
