import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pureWhite,
  },
  headerText: {
    marginTop: -50,
    marginBottom: SIZES.smallPicture,
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.gray,
  },
  singleCard: {
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.secondary,
    width: '100%',
    borderRadius: SIZES.xxSmall,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: SIZES.smallPicture,
    gap: SIZES.medium,
  },
  cardText: {
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  btmRightBox: {
    bottom: 0,
    right: 0,
    width: SIZES.small,
    height: SIZES.small,
    position: 'absolute',
    backgroundColor: COLORS.pureWhite,
    borderTopStartRadius: SIZES.small,
  },
  btmLeftBox: {
    bottom: 0,
    left: 0,
    width: SIZES.small,
    height: SIZES.small,
    position: 'absolute',
    backgroundColor: COLORS.pureWhite,
    borderTopEndRadius: SIZES.small,
  },
  topLeftBox: {
    left: 0,
    top: 0,
    width: SIZES.small,
    height: SIZES.small,
    position: 'absolute',
    backgroundColor: COLORS.pureWhite,
    borderBottomEndRadius: SIZES.small,
  },
  topRightBox: {
    right: 0,
    top: 0,
    width: SIZES.small,
    height: SIZES.small,
    position: 'absolute',
    backgroundColor: COLORS.pureWhite,
    borderBottomStartRadius: SIZES.small,
  },
})

export default styles
