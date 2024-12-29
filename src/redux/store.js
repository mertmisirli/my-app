import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'  // Tarayıcıda localStorage kullanmak için
import dataSlice from './dataSlice'
import modalSlice from './modalSlice'
import newsSlice from './newsSlice'
import workoutSlice from './workoutSlice'
import workoutPlansSlice from './workoutPlansSlice'
import questionsSlice from './faqSlice'
import sidebarSlice from './sidebarSlice'
import authSlice from './authSlice'

// Persist konfigürasyonu
const persistConfig = {
  key: 'root', // Ana anahtar
  storage,     // Storage olarak localStorage kullanılacak
  whitelist: ['sidebar'], // Sadece sidebar slice'ını persist edeceğiz (dilerseniz diğerlerini de ekleyebilirsiniz)
}

// Sidebar slice'ını persist ile sarıyoruz
const persistedSidebarReducer = persistReducer(persistConfig, sidebarSlice)

// Store yapılandırması
export const store = configureStore({
  reducer: {
    data: dataSlice,
    modal: modalSlice,
    news: newsSlice,
    workout: workoutSlice,
    plans: workoutPlansSlice,
    questions: questionsSlice,
    sidebar: persistedSidebarReducer, // Persisted reducer'ı burada kullanıyoruz
    auth: authSlice
  },
})

// Persistor'ı oluşturuyoruz
export const persistor = persistStore(store)
