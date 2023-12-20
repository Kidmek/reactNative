import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'

const _layout = () => {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name='warehouse'
        options={{
          headerTitle: 'Add Warehouse',
        }}
      />
      <Stack.Screen
        name='storage_type'
        options={{
          headerTitle: 'Add Storage Type',
        }}
      />
      {/* Order */}
      <Stack.Screen
        name='order'
        options={{
          headerTitle: 'Add Order',
        }}
      />
      <Stack.Screen
        name='choose_for_order'
        options={{
          headerTitle: 'Choose',
        }}
      />
      <Stack.Screen
        name='order_type'
        options={{
          headerTitle: 'Add Order Type',
        }}
      />
      {/*  */}
      <Stack.Screen
        name='customer'
        options={{
          headerTitle: 'Add Customer',
        }}
      />
      <Stack.Screen
        name='storage'
        options={{
          headerTitle: 'Add Storage',
        }}
      />
      <Stack.Screen
        name='insurance_option'
        options={{
          headerTitle: 'Add Insurance Option',
        }}
      />
      <Stack.Screen
        name='insurance'
        options={{
          headerTitle: 'Add Insurance',
        }}
      />
      {/* Shipment */}
      <Stack.Screen
        name='shipment'
        options={{
          headerTitle: 'Add Shipment',
        }}
      />
      <Stack.Screen
        name='transportation'
        options={{
          headerTitle: 'Add Transportation',
        }}
      />
      <Stack.Screen
        name='shipment_method'
        options={{
          headerTitle: 'Add Transportation Method',
        }}
      />
      <Stack.Screen
        name='shipment_type'
        options={{
          headerTitle: 'Add Shipment Type',
        }}
      />
      <Stack.Screen
        name='port'
        options={{
          headerTitle: 'Add Port',
        }}
      />
      <Stack.Screen
        name='transit'
        options={{
          headerTitle: 'Add Transit',
        }}
      />
      {/*  */}
      <Stack.Screen
        name='office'
        options={{
          headerTitle: 'Add Office',
        }}
      />
      <Stack.Screen
        name='equipment'
        options={{
          headerTitle: 'Add Equipment',
        }}
      />
      <Stack.Screen
        name='resource'
        options={{
          headerTitle: 'Add Resource',
        }}
      />
      <Stack.Screen
        name='shelve_type'
        options={{
          headerTitle: 'Add Shelve Type',
        }}
      />

      {/* Proucts */}

      <Stack.Screen
        name='product'
        options={{
          headerTitle: 'Add Product',
        }}
      />
      <Stack.Screen
        name='returned_product'
        options={{
          headerTitle: 'Add Returned Product',
        }}
      />
      <Stack.Screen
        name='damaged_product'
        options={{
          headerTitle: 'Add Damanged Product',
        }}
      />
      <Stack.Screen
        name='product_category'
        options={{
          headerTitle: 'Add Product Category',
        }}
      />

      <Stack.Screen
        name='product_type'
        options={{
          headerTitle: 'Add Product Type',
        }}
      />

      {/*  */}

      <Stack.Screen
        name='group'
        options={{
          headerTitle: 'Add Group',
        }}
      />

      {/* Wizard */}
      <Stack.Screen
        name='steps'
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          headerShown: true,
          headerTitle: 'Wizard',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: '#fff',
                borderColor: COLORS.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name='close-outline' size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}

export default _layout
