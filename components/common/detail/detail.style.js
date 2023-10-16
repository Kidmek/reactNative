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
})

export default styles
