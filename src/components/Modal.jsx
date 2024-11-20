import React from 'react'
import { GrClose } from 'react-icons/gr'
import { modalFunc } from '../redux/modalSlice';
import { useDispatch } from "react-redux";

const Modal = ({ title, content, btnText, btnFunc }) => {
  const dispatch = useDispatch();


  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-opacity-50 bg-black flex items-center justify-center'>
      <div className='w-1/3 bg-white shadow-lg rounded-md p-4' >
        <div className='flex items-center justify-between'>
          <div className='text-2xl'>
            {title}
          </div>
          <GrClose size={24} style={{ cursor: "pointer" }} onClick={() => dispatch(modalFunc())} />
          </div>

        <input type="text" placeholder='Ürün Adı' />
      </div>
    </div>
  )
}

export default Modal
