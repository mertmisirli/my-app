import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showSidebar: true,
    topics: [
        { id: 1, name: 'Teknoloji', key: 'teknoloji' },
        { id: 2, name: 'Sağlık', key: 'saglik' },
        { id: 3, name: 'Eğitim', key: 'egitim' },
        { id: 4, name: 'Spor', key: 'spor' },
        { id: 5, name: 'Sanat', key: 'sanat' },
        { id: 6, name: 'Ekonomi', key: 'ekonomi' },
        { id: 7, name: 'Yazılım', key: 'yazilim' },
        { id: 8, name: 'Tasarım', key: 'tasarim' },
        { id: 9, name: 'Bilim', key: 'bilim' },
        { id: 10, name: 'Kültür', key: 'kultur' },
        { id: 11, name: 'Seyahat', key: 'seyahat' },
        { id: 12, name: 'Müzik', key: 'muzik' },
        { id: 13, name: 'Kitap', key: 'kitap' },
        { id: 14, name: 'Moda', key: 'moda' }
    ]
}

export const topicSlice = createSlice({
    name: 'topicSlice',
    initialState,
    reducers: {

        toggleSidebar: (state, action) => {
            state.showSidebar = action.payload;
        }
    }
})

export const { toggleSidebar } = topicSlice.actions

export default topicSlice.reducer