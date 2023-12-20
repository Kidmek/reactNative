import { StyleSheet } from 'react-native'

import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    paddingTop: SIZES.xLarge,
    backgroundColor: COLORS.pureWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  headerBtn: {
    fontFamily: FONT.regular,
    flexDirection: 'row',
    marginBottom: SIZES.xSmall,
    gap: SIZES.small,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.xxSmall,
    paddingHorizontal: SIZES.xSmall,
    width: 'fit-content',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  carousel: {
    paddingHorizontal: SIZES.small,
    gap: 1,
  },
  image: {
    flex: 1,
    width: '90%',
    height: '100%',
    borderRadius: SIZES.small,
    alignSelf: 'center',
  },
  warehouseContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    alignSelf: 'flex-start',
  },
  onlyTextContainer: {
    flex: 1,
    width: '100%',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // texts
  name: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  type: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.grey,
    marginTop: 3,
    textTransform: 'capitalize',
  },
  middle: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.black,
    marginTop: 3,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
  },
  welcomeContainer: {
    width: '100%',
    paddingTop: SIZES.medium,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.pureWhite,
  },
  shipmentHeader: {
    marginVertical: SIZES.small,
    alignSelf: 'center',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
  },
  shipmentHeaderWrapper: {
    flexDirection: 'row',
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.small,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: SIZES.small,
  },
  shelveBtn: {
    borderRadius: SIZES.small,
    backgroundColor: '#fff',
    ...SHADOWS.large,
    alignSelf: 'center',
    marginBottom: SIZES.xLarge,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.xSmall,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: COLORS.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  activityIndicator: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: (color) => {
    return {
      paddingVertical: SIZES.xxSmall,
      paddingHorizontal: SIZES.xSmall,
      backgroundColor: color,
      borderRadius: SIZES.medium,
    }
  },
  wizTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    textAlign: 'center',
    marginBottom: SIZES.medium,
  },
  wizCheckerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginVertical: 16,
  },
})

export default styles