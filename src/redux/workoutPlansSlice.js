import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    plans: [
        { id: 1, name: 'Plan 1', description: 'Workout for beginners' },
        { id: 2, name: 'Plan 2', description: 'Advanced workout' },
        { id: 3, name: 'Plan 3', description: 'Strength training for athletes' },
        { id: 4, name: 'Plan 4', description: 'Cardio focused workout for weight loss' },
        { id: 5, name: 'Plan 5', description: 'Full body strength and conditioning' },
        { id: 6, name: 'Plan 6', description: 'HIIT workout for endurance' },
        { id: 7, name: 'Plan 7', description: 'Yoga for flexibility and relaxation' },
        { id: 8, name: 'Plan 8', description: 'Pilates for core strength' },
        { id: 9, name: 'Plan 9', description: 'CrossFit style workout for strength and conditioning' },
        { id: 10, name: 'Plan 10', description: 'Bodyweight workout for beginners' },
        { id: 11, name: 'Plan 11', description: 'Strength training with dumbbells' },
        { id: 12, name: 'Plan 12', description: 'HIIT workout for fat burning' },
        { id: 13, name: 'Plan 13', description: 'Powerlifting program for strength gains' },
        { id: 14, name: 'Plan 14', description: 'Kettlebell workout for strength and conditioning' },
        { id: 15, name: 'Plan 15', description: 'Boxing workout for cardio and agility' }
    ]
}

export const workoutPlansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {

        // setInputText: (state, action) => {
        //   state.inputText = action.payload;
        //   // inputText değiştiğinde filteredNews'i güncelle
        //   if (action.payload.length === 0) {
        //     state.filteredNews = state.news; // inputText boşsa tüm haberleri göster
        //   } else {
        //     // inputText varsa filtreleme yap
        //     state.filteredNews = state.news.filter(item =>
        //       item.title.toLowerCase().includes(action.payload.toLowerCase())
        //     );
        //   }
        // },

    }
});

export const { setInputText } = workoutPlansSlice.actions;

export default workoutPlansSlice.reducer;
