import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        // modalFunc : (state, action) => {
        modalFunc: (state) => {
            state.modal = !state.modal

        }
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { modalFunc } = modalSlice.actions

export default modalSlice.reducer