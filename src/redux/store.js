import { configureStore } from '@reduxjs/toolkit'
import  dataSlice  from './dataSlice'
import  modalSlice  from './modalSlice'
import  newsSlice  from './newsSlice'

export const store = configureStore({
  reducer: {
    data : dataSlice,
    modal : modalSlice,
    news : newsSlice
  },
})