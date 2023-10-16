import React from 'react'
import { Stack } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='warehouse'
        options={{
          headerTitle: 'Add Warehouse',
        }}
      />
      <Stack.Screen
        name='order'
        options={{
          headerTitle: 'Add Order',
        }}
      />
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
        name='shipment'
        options={{
          headerTitle: 'Add Shipment',
        }}
      />
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
    </Stack>
  )
}

export default _layout
