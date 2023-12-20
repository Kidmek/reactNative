import { COLORS, FONT } from '../../../constants'
import { StyleSheet } from 'react-native'

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image(IMG_HEIGHT, width) {
    return {
      height: IMG_HEIGHT,
      width: width,
    }
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: FONT.medium,
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: FONT.medium,
  },
  rooms: {
    fontSize: 16,
    color: COLORS.grey,
    marginVertical: 4,
    fontFamily: FONT.regular,
  },
  ratings: {
    fontSize: 16,
    fontFamily: FONT.medium,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: FONT.regular,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: FONT.regular,
  },
})
export default innerStyles
