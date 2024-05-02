import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants'

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.pureWhite },
  editContainer: {
    marginHorizontal: SIZES.small,
    flexDirection: 'row',
    gap: SIZES.xxSmall,
    alignItems: 'center',
  },
  headerEdit: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  contentContainer: {
    padding: SIZES.medium,
  },
  singleContainer: {
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.medium,
    gap: SIZES.large,
  },
  mapContainer: {
    marginTop: SIZES.large,
    gap: SIZES.small,
  },
  locationTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  profileEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
    paddingBottom: SIZES.large,
  },
})

export default style
