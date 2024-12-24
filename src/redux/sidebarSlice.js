import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showSidebar: true,  
}

export const sidebarSlice = createSlice({
    name: 'sidebarSlice',
    initialState,
    reducers: {

        toggleSidebar: (state, action) => {
            state.showSidebar = action.payload;
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer