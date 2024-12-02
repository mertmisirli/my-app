import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  news: [],
  filteredNews: [],
  inputText: ''
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFetchedNews: (state, action) => {
      console.log("Set Fetched News ");
      console.log("Action ", action);
      state.news = action.payload;
    },
    setInputText: (state, action) => {
      state.inputText = action.payload;
      // inputText değiştiğinde filteredNews'i güncelle
      if (action.payload.length === 0) {
        state.filteredNews = state.news; // inputText boşsa tüm haberleri göster
      } else {
        // inputText varsa filtreleme yap
        state.filteredNews = state.news.filter(item =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    updateCompleted: (state, action) => {
      console.log("Update Completed ..");
      const { id } = action.payload;
      console.log("ID : ", id);
      const newsItem = state.news.find(news => news.id === id);
      if (newsItem) {
        newsItem.completed = !newsItem.completed;
      }
    },
    orderNews: (state, action) => {
      console.log("Order News: ", action.payload);
      const orderType = action.payload;
      const sortedNews = orderType === 'asc'
        ? [...state.news].sort((a, b) => a.id - b.id)
        : orderType === 'desc'
        ? [...state.news].sort((a, b) => b.id - a.id)
        : state.news;
      console.log("First: ", sortedNews[0]?.title);
      state.news = sortedNews;
    },
    filterNews: (state, action) => {
      const filterText = action.payload;
      if (filterText.length > 0) {
        console.log("Filter Text : ", filterText);
        state.filteredNews = state.news.filter(item =>
          item.title.toLowerCase().includes(filterText.toLowerCase())
        );
      } else {
        state.filteredNews = state.news; // Eğer filtreleme boşsa, tüm haberleri göster
      }
    }
  }
});

export const { setFetchedNews, setInputText, updateCompleted, orderNews, filterNews } = newsSlice.actions;

export default newsSlice.reducer;
