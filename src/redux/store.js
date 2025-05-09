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
import  topicSlice  from './topicSlice'
import  articleSlice  from './articleSlice'
import  categorySlice  from './categorySlice'

// Persist konfigürasyonu
const persistConfig = {
  key: 'root', // Ana anahtar
  storage,     // Storage olarak localStorage kullanılacak
  whitelist: ['sidebar', 'auth'], // Sadece sidebar slice'ını persist edeceğiz (dilerseniz diğerlerini de ekleyebilirsiniz)
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
    auth: authSlice,
    topic : topicSlice,
    article : articleSlice,
    category : categorySlice
  },
})

// Persistor'ı oluşturuyoruz
export const persistor = persistStore(store)
