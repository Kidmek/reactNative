import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './steps.style'
import { AntDesign } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '../../../constants'
import { currencyFormat } from '../../common/utils'
import InfoSVG from '../../../assets/icons/info'

const StepFooter = ({
  setCurrent,
  current,
  length,
  onFinish,
  price,
  nextDisabled,
  checkError,
  agree,
}) => {
  const iconSize = 20
  const previous = () => {
    setCurrent(current <= 1 ? current : current - 1)
  }
  const next = () => {
    setCurrent(current >= length ? current : current + 1)
  }
  return (
    <View style={{ flexDirection: 'column' }}>
      {nextDisabled && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: COLORS.pureWhite,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: COLORS.red + 'CF',
              paddingHorizontal: SIZES.medium,
              paddingVertical: SIZES.small,
              borderTopRightRadius: SIZES.xxLarge,
              borderTopLeftRadius: SIZES.xxLarge,
              gap: SIZES.small,
            }}
          >
            <InfoSVG size={25} color={COLORS.white} />
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.medium,
                color: COLORS.white,
                textAlign: 'center',
              }}
            >
              {nextDisabled}
            </Text>
          </View>
        </View>
      )}
      {parseFloat(price) > 0 && !nextDisabled && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.medium,
            paddingVertical: SIZES.small,
          }}
        >
          {!nextDisabled && (
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.xLarge,
                color: COLORS.secondary,
              }}
            >
              Total
            </Text>
          )}
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: SIZES.large,
              color: COLORS.secondary,
            }}
          >
            {currencyFormat(price) + ' Birr'}
          </Text>
        </View>
      )}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={previous}
          style={styles.footerItems}
          disabled={current === 1}
        >
          <AntDesign
            name='arrowleft'
            size={iconSize}
            color={current === 1 ? COLORS.gray : COLORS.primary}
          />
          <Text style={styles.buttonTitle(current === 1)}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            current === length
              ? onFinish
              : () => {
                  checkError() ? next() : null
                }
          }
          style={{ ...styles.footerItems, justifyContent: 'flex-end' }}
          // disabled={current === length ? !agree : nextDisabled}
        >
          <Text
            style={styles.buttonTitle(
              current === length ? !agree : nextDisabled
            )}
          >
            {current === length ? 'Finish' : 'Next'}
          </Text>
          <AntDesign
            name={current === length ? 'check' : 'arrowright'}
            size={iconSize}
            color={
              current === length && !agree
                ? COLORS.gray
                : nextDisabled
                ? COLORS.gray
                : COLORS.primary
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StepFooter
