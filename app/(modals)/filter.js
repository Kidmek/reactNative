import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '../../components/common/styles/Styles'
import { useRouter } from 'expo-router'
import { FONT } from '../../constants'

const Filter = () => {
  const router = useRouter()
  return (
    <BlurView style={styles.container} intensity={70} tint='light'>
      {/* Footer */}
      <Animated.View style={defaultStyles.footer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ height: '100%', justifyContent: 'center' }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: FONT.medium,
                textDecorationLine: 'underline',
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <Ionicons
              name='search-outline'
              size={24}
              style={defaultStyles.btnIcon}
              color={'#fff'}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Filter
