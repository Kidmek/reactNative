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
        name='shelve_type'
        options={{
          headerTitle: 'Storage Type',
        }}
      />

      {/* Shipment */}
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
        name='shipment_type'
        options={{
          headerTitle: 'Shipment Types',
        }}
      />
      <Stack.Screen
        name='shipment_terms'
        options={{
          headerTitle: 'Shipment Terms',
        }}
      />

      {/*  */}

      {/* Order */}
      <Stack.Screen
        name='order_type'
        options={{
          headerTitle: 'Order Type',
        }}
      />
      <Stack.Screen
        name='order'
        options={{
          headerTitle: 'Order',
        }}
      />

      <Stack.Screen
        name='payment'
        options={{
          headerTitle: 'Invoice',
        }}
      />
      {/*  */}

      <Stack.Screen
        name='insurance'
        options={{
          headerTitle: 'Insurance',
        }}
      />
      <Stack.Screen
        name='transit'
        options={{
          headerTitle: 'Transit',
        }}
      />
      <Stack.Screen
        name='insurance_options'
        options={{
          headerTitle: 'Insurance Options',
        }}
      />
      <Stack.Screen
        name='group'
        options={{
          headerTitle: 'User Group',
        }}
      />

      <Stack.Screen
        name='product'
        options={{
          headerTitle: 'Product',
        }}
      />
      <Stack.Screen
        name='wizard'
        options={{
          headerTitle: 'All Service Order',
        }}
      />
    </Stack>
  )
}

export default _layout
