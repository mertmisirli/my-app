// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan mevcut durumu alıyoruz
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // 'true' stringini kontrol ediyoruz
  
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action, email) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      
      // Kullanıcı giriş yaptıktan sonra localStorage'a kaydediyoruz
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('user', JSON.stringify(action.payload)); // user bilgisini JSON formatında kaydediyoruz
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;

      // Kullanıcı çıkış yaptıktan sonra localStorage'dan siliyoruz
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;

      // Durumu set ederken localStorage'ı güncelliyoruz
      localStorage.setItem('isLoggedIn', action.payload.isLoggedIn.toString());
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
  },
});

export const { login, logout, setLoginStatus } = authSlice.actions;
export default authSlice.reducer;
