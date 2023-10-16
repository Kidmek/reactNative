import { StyleSheet } from 'react-native'

import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    paddingHorizontal: SIZES.small,
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
  image: {
    flex: 1,
    width: SIZES.smallPicture,
    height: SIZES.smallPicture,
    resizeMode: 'center',
  },
  listContainer: {
    flexWrap: 'wrap',
    gap: SIZES.small,
    flexDirection: 'row',
  },
  officeContainer: {
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
  },
  name: {
    fontSize: SIZES.medium,
    fontFamily: 'DMBold',
    color: COLORS.primary,
  },
  type: {
    fontSize: SIZES.small + 2,
    fontFamily: 'DMRegular',
    color: COLORS.gray,
    marginTop: 3,
    textTransform: 'capitalize',
  },
})

export default styles
