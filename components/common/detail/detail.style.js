import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.small,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
    marginVertical: SIZES.small,
  },
  detailLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  detailValue: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall,
  },

  cardDetailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xSmall,
  },
  cardDetailLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  cardDetailValue: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    flex: 1,
    color: COLORS.gray,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginVertical: 16,
  },
})

export default styles
