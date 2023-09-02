import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectConfirm, showConfirm } from '../../../features/modal/modalSlice'
import Logout from '../(logout)'

const logout = () => {
  const dispatch = useDispatch()
  const showModal = useSelector(selectConfirm)

  return <>{<Logout />}</>
}

export default logout
