import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from '../../../../constants'

const newOrderStyles = StyleSheet.create({
  infoContainer: (row) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: row ? 'row' : 'column',
    borderRadius: SIZES.small,
    backgroundColor: COLORS.azure,
    ...SHADOWS.medium,
    shadowColor: 'blue',
    borderWidth: 1,
    borderColor: COLORS.blue,
    padding: SIZES.small,
    marginVertical: SIZES.small,
  }),
  typeTitle: (selected) => ({
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: selected ? COLORS.blue : COLORS.gray,
  }),

  typeDesc: (selected) => ({
    flexWrap: 'wrap',
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: selected ? COLORS.blue : COLORS.gray,
  }),
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default newOrderStyles
