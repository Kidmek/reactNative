import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from '../../../../constants'

const newOrderStyles = StyleSheet.create({
  infoContainer: (row, success) => ({
    justifyContent: 'space-between',
    alignItems: success ? '' : 'center',
    flexDirection: row ? 'row' : 'column',
    borderRadius: SIZES.small,
    backgroundColor: COLORS.azure,
    ...SHADOWS.medium,
    shadowColor: 'blue',
    borderWidth: 1,
    borderColor: success ? COLORS.green : COLORS.circleAndInfo,
    padding: SIZES.small,
    marginVertical: SIZES.small,
  }),
  header: {
    flexDirection: 'row',
    gap: SIZES.small,
    alignItems: 'center',
    marginVertical: SIZES.small,
  },
  typeTitle: (selected, success) => ({
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: success ? COLORS.green : selected ? COLORS.primary : COLORS.gray,
  }),

  typeDesc: (selected, success) => ({
    flexWrap: 'wrap',
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: success ? COLORS.green : selected ? COLORS.primary : COLORS.gray,
    lineHeight: SIZES.large,
  }),
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsContainer: {
    fontFamily: FONT.bold,
  },
  terms: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
})

export default newOrderStyles
