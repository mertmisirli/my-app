import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk ile veriyi çekiyoruz
export const getWorkoutBanners = createAsyncThunk(
  'workout/getWorkoutBanners', // Action türü
  async () => {
    // API'den veriyi çekiyoruz
    const response = await fetch('https://localhost:7048/api/Workout/GetBodyParts');
    
    if (!response.ok) {
      throw new Error('Veri çekilemedi');
    }

    const data = await response.json(); // Veriyi JSON formatında alıyoruz
    
    console.log("Data : ", data);
    
    return data; // Veriyi geri döndürüyoruz
  }
);

const initialState = {
  workoutBanners: [], // Başlangıçta boş bir dizi
  workoutCategories: [
    { "id": 1, "name": "Cardio" },
    { "id": 2, "name": "Strength Training" },
    { "id": 3, "name": "Flexibility" },
    { "id": 4, "name": "Balance" },
    { "id": 5, "name": "Endurance" },
    { "id": 6, "name": "HIIT" },
    { "id": 7, "name": "Yoga" },
    { "id": 8, "name": "Pilates" }
  ],
  status: 'idle', // 'loading', 'succeeded', 'failed'
  error: null // Hata mesajı
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    orderFunc: (state, action) => {
      state.orderOption = action.payload;
      console.log("Order Option : ", state.orderOption);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutBanners.pending, (state) => {
        state.status = 'loading'; // Yükleniyor durumu
      })
      .addCase(getWorkoutBanners.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Başarılı veri çekildi
        state.workoutCategories = action.payload; // Veriyi state'e atıyoruz
      })
      .addCase(getWorkoutBanners.rejected, (state, action) => {
        state.status = 'failed'; // Hata durumu
        state.error = action.error.message; // Hata mesajını state'e kaydediyoruz
      });
  }
});

export const { orderFunc } = workoutSlice.actions;

export default workoutSlice.reducer;
