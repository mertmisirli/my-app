import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderOption: '',  
}

export const orderOptSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {

        orderFunc: (state, action) => {
            state.orderOption = action.payload;

            console.log("Order Option : ", state.orderOption);
            
        }
    }
})

export const { orderFunc } = orderOptSlice.actions

export default orderOptSlice.reducer