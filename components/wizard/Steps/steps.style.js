import { StyleSheet, Dimensions, Platform } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.pureWhite,
  },
  stepContainer: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  titleCircle: {
    marginTop: 10,
    fontSize: 12,
    paddingBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#2E81D3',
    justifyContent: 'center',
    width: '85%',
    position: 'absolute',
    top: 35,
    marginHorizontal: 20,
    zIndex: 1,
  },
  circle: {
    borderWidth: 1,
    borderColor: '#2E81D3',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  circleTitle: {
    fontSize: 12,
    color: '#fff',
  },
  selectedcircleTitle: {
    fontSize: 12,
    color: '#2E81D3',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Platform.OS == 'android' ? SIZES.small : SIZES.large,
    alignSelf: 'flex-end',
  },
  buttonTitle: (disabled) => {
    return {
      paddingVertical: SIZES.large,
      color: disabled ? COLORS.gray : COLORS.primary,
      fontFamily: FONT.bold,
      fontSize: SIZES.medium,
    }
  },
  footerItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
    flex: 1,
  },
})

export default styles
