import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

const styles = StyleSheet.create({
  container: {
    background: 'light',
    borderRadius: 10,
  },
  textWrapper: {
    backgroundColor: COLORS.tertiary,
    padding: 5,
  },
  text: {
    color: 'white',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 5,
  },
  yesBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  noBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
})

export default styles
