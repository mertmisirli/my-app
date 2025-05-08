import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import slugify from '../utils/slugifyUtils';

// Makaleleri listeleme
export const fetchArticles = createAsyncThunk(
  'article/fetchArticles',
  async ({ page, size }, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Blogs?Page=${page}&Size=${size}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Makale ekleme
export const saveArticleThunk = createAsyncThunk(
  'article/saveArticle',
  async ({ articleName, articleContent, selectedTopicsIds }, thunkAPI) => {
    try {
      console.log("Slugify : ", slugify(articleName));
      
      const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: articleName,
          slug: slugify(articleName),
          author: 'mert', // Burayı dinamik yapabilirsin istersen
          content: articleContent,
          topicIds: selectedTopicsIds,
        }),
      });

      if (!response.ok) throw new Error('Veri gönderilemedi!');
      
      // Başarılı olunca makaleleri yeniden fetch edelim
      //thunkAPI.dispatch(fetchArticles({ page: 1, size: 10 }));
      //return await response.json();
    } catch (error) {
      console.log("Error : ", error);
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Makale silme
export const deleteArticleThunk = createAsyncThunk(
  'article/deleteArticle',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Veri silinemedi!');

      // Başarılı olunca makaleleri yeniden fetch edelim
      thunkAPI.dispatch(fetchArticles({ page: 1, size: 10 }));
      return id; // Silinen makale id'sini döndür
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// State
const initialState = {
  articles: [],
  count: 0,
  loading: false,
  error: null,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // Buraya ekstra reducerlar ekleyebilirsin
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.count = action.payload.count;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveArticleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveArticleThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveArticleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteArticleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticleThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteArticleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
