import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    news: [],  // Başlangıçta haberler boş bir array
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        // Haberleri set etmek için
        setFetchedNews: (state, action) => {
            console.log("Set Fetched News ");
            console.log("Action ", action);
            
            state.news = action.payload;  // action.payload ile gelen haberleri state.news'e set et
        },

        // Bir haberin tamamlanma durumunu güncellemek için
        updateCompleted: (state, action) => {
            console.log("Update Completed ..");

            const { id } = action.payload; // Action'dan gelen id'yi al

            console.log("ID : ", id);
            
            const newsItem = state.news.find(news => news.id === id); // id'ye göre haber bul
            if (newsItem) {
                newsItem.completed = !newsItem.completed; // Haber tamamlandıysa, tam tersini yap
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setFetchedNews, updateCompleted } = newsSlice.actions

export default newsSlice.reducer
