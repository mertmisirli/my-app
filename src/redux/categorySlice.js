import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tüm topic'leri çekme
export const fetchTopics = createAsyncThunk(
  'topic/fetchTopics',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Topics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Veriler alınamadı!');
      }

      const data = await response.json();
      return data; // Topic listesini döndürüyoruz
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Bir topic'e ait makaleleri çekme
export const getArticlesByTopic = createAsyncThunk(
  'topic/getArticlesByTopic',
  async ({ id }, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Blogs/topic/${id}`);
      if (!response.ok) throw new Error('Veri alınamadı!');
      const data = await response.json();
      return data; // Topic'e ait makaleler
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Başlangıç state
const initialState = {
  topics: [],
  articlesByTopic: [],
  loading: false,
  error: null,
};

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    // İstersen burada local topic ekleme gibi işlemler ekleyebiliriz
  },
  extraReducers: (builder) => {
    builder
      // fetchTopics işlemleri
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getArticlesByTopic işlemleri
      .addCase(getArticlesByTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticlesByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.articlesByTopic = action.payload; // Topic'e ait makaleleri buraya kaydettik
      })
      .addCase(getArticlesByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topicSlice.reducer;
