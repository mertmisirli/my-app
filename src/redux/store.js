import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import modalSlice from './modalSlice'
import newsSlice from './newsSlice'
import workoutSlice from './workoutSlice'
import workoutPlansSlice from './workoutPlansSlice'
import questionsSlice from './faqSlice'

export const store = configureStore({
  reducer: {
    data: dataSlice,
    modal: modalSlice,
    news: newsSlice,
    workout: workoutSlice,
    plans: workoutPlansSlice,
    questions: questionsSlice
  },
})