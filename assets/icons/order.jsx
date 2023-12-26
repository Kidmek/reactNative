import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const OrderSVG = ({ color, size }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    aria-hidden='true'
    className='w-6 h-6 text-blue-500 dark:text-white'
    viewBox='0 0 18 20'
    height={size}
    width={size}
  >
    <Path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1'
    />
  </Svg>
)
export default OrderSVG
