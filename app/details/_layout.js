import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='warehouse'
        options={{
          headerTitle: 'Warehouse',
        }}
      />
      <Stack.Screen
        name='order'
        options={{
          headerTitle: 'Order',
        }}
      />
      <Stack.Screen
        name='customer'
        options={{
          headerTitle: 'Customer',
        }}
      />
      <Stack.Screen
        name='storage'
        options={{
          headerTitle: 'Storage',
        }}
      />
      <Stack.Screen
        name='shipment'
        options={{
          headerTitle: 'Shipment',
        }}
      />
      <Stack.Screen
        name='office'
        options={{
          headerTitle: 'Office',
        }}
      />
      <Stack.Screen
        name='equipment'
        options={{
          headerTitle: 'Equipment',
        }}
      />
      <Stack.Screen
        name='transportations'
        options={{
          headerTitle: 'Transportations',
        }}
      />
      <Stack.Screen
        name='transportation_methods'
        options={{
          headerTitle: 'Transportation Methods',
        }}
      />
      <Stack.Screen
        name='shipment_terms'
        options={{
          headerTitle: 'Shipment Terms',
        }}
      />
      <Stack.Screen
        name='shelve_type'
        options={{
          headerTitle: 'Shelve Type',
        }}
      />
      <Stack.Screen
        name='order_type'
        options={{
          headerTitle: 'Order Type',
        }}
      />
    </Stack>
  )
}

export default _layout
