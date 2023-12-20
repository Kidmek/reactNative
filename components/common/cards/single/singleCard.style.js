import { StyleSheet } from 'react-native'

import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants'

const styles = StyleSheet.create({
  warehouseContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    borderRadius: SIZES.small,
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
  },
  onlyTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    backgroundColor: COLORS.pureWhite,
  },
})

export default styles
