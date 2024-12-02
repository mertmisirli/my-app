import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    news: [],
    filteredNews: [],
    inputText: ''
}

export const newsSlice = createSlice(
    {
        name: 'news',
        initialState,
        reducers:
        {
            setFetchedNews: (state, action) => {
                console.log("Set Fetched News ");
                console.log("Action ", action);
                state.news = action.payload;
                // set news from action.payload 
            },
            setInputText: (state, action) => {
                state.inputText = action.payload;
            },

            updateCompleted: (state, action) => {
                console.log("Update Completed ..");
                const { id } = action.payload;
                // get id from action.payload 
                console.log("ID : ", id);
                const newsItem = state.news.find(news => news.id === id);
                // find news by id 
                if (newsItem) {
                    newsItem.completed = !newsItem.completed;
                    // toggle completed state 
                }
            },
            orderNews: (state, action) => {
                console.log("Order News: ",
                    action.payload);
                const orderType = action.payload;
                // get orderType from action.payload 
                const sortedNews = orderType === 'asc' ?
                    [...state.news].sort((a, b) => a.id - b.id)
                    : orderType === 'desc'
                        ? [...state.news].sort((a, b) => b.id - a.id)
                        : state.news;
                console.log("First: ", sortedNews[0]?.title);
                // optional chaining for safety 
                //sortedNews.filter(n => n.id < 10);
                state.news = sortedNews;
            },
            filterNews: (state, action) => {
                const filterText = action.payload;

                state.filteredNews = state.news.filter(item =>
                    item.title.toLowerCase().includes(filterText.toLowerCase())
                );
            }
        },
    })

export const { setFetchedNews,setInputText, updateCompleted, orderNews, filterNews } = newsSlice.actions

export default newsSlice.reducer