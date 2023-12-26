import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const PaymentSVG = ({ color, size }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill={color}
    aria-hidden='true'
    className='w-6 h-6 text-blue-500 dark:text-white'
    height={size}
    width={size}
  >
    <Path d='M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z' />
    <Path d='M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z' />
  </Svg>
)
export default PaymentSVG
