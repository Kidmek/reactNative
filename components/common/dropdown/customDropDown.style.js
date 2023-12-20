import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  inputWrapper: {
    gap: SIZES.small,
  },
  inputLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  input: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginBottom: SIZES.medium,
  },
  dropDownItemContainer: {
    padding: SIZES.small,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDownText: {
    flex: 1,
  },
})

export default styles
