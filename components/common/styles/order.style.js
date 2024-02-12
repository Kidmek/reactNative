import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants'

const newOrderStyles = StyleSheet.create({
  infoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: SIZES.small,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.circleAndInfo,
    ...SHADOWS.medium,
    shadowColor: COLORS.circleAndInfo,
    borderWidth: 1,
    borderColor: COLORS.circleAndInfo,
  },
  singleInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'space-between',
    width: '100%',
  },
  singleValue: {
    color: COLORS.pureWhite,
    fontFamily: FONT.regular,
  },
  singleLabel: {
    color: COLORS.pureWhite,
    fontFamily: FONT.bold,
  },
  typeContainer: {},
  singleType: (selected) => ({
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.medium,
    shadowColor: selected ? 'blue' : 'blue',
    marginBottom: SIZES.small,
    justifyContent: 'space-around',
    borderWidth: selected ? 1 : 0,
    borderColor: selected ? COLORS.blue : 'black',
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
  resourceContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: SIZES.medium,
    marginVertical: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  listContainer: {
    gap: SIZES.small,
    flexDirection: 'column',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
})

export default newOrderStyles
